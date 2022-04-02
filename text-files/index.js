const fs = require("fs").promises;
const path = require("path");

async function findSalesFiles(folderName) {
  // массив будет содержать файлы продаж по мере их обнаружения 
  let salesFiles = [];

  async function findFiles(folderName) {
    // чтение всех элементов в текущей папке
    const items = await fs.readdir(folderName,{ withFileTypes: true });

    // перебор каждого найденного элемента
    for (item of items) {
      // если элемент является каталогом, в нем нужно будет искать файлы
      if (item.isDirectory()) {
        await findFiles(path.join(folderName, item.name));  
      } else {
        // Убедитесь, что обнаруженный файл является файлом sales.json
        if (path.extname(item.name) === ".json") {
          await salesFiles.push(path.join(folderName, item.name));
        } 
      }
    }
  }


  // найти файлы продаж
  await findFiles(folderName);

  // вернуть массив найденных путей к файлам
  return salesFiles;
}

async function main() {
       const salesDir = path.join(__dirname, "stores");
       const salesTotalsDir = path.join(__dirname, "salesTotals");
       try {
         await fs.mkdir(salesTotalsDir);
       } catch {
         console.log(`${salesTotalsDir} уже существует!`);
        }
       const salesFiles = await findSalesFiles(salesDir);
      console.log(salesFiles);
      await fs.writeFile(path.join(salesTotalsDir, "totals.txt"), String());

}

main();
