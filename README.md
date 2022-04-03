# Лабораторная работа № 3
## Работа с файлами и каталогами в приложении Node

### 1.1 Практическое задание
Рассмотрим пример поиска файлов с именем sales.json, который содержит сведения о продажах. Файлы упорядочиваются в папках по идентификатору точки продаж в заданной папке.
1. Клонируйте https://github.com/eleldar/Node/, выполнив следующую команду:  
     git clone https://github.com/eleldar/Node.git
2. Перейдите к файлам с помощью следующей команды:  
     cd Node/text-files
3. Откройте в редакторе файл index.js и строки с записью *ЗАПОЛНИТЬ* замените на программный код для реализации алгоритма поиска файлов в папке stores.
При возникновении трудностей воспользуйтесь файлом recursive.js для ре- ализации рекурсии.
4. Запустите в Node index.js:  
     node index.js  
При успешном выполнении задания должен быть получен следующий вывод:  
[  
'stores/201/sales.json',  
'stores/202/sales.json',  
'stores/203/sales.json',  
'stores/204/sales.json'  
]

### 1.2 Практическое задание
Рассмотрим пример использования модуля path для составления путей и определе- ния файлов JSON. В этом задании потребуется успешно выполненное предыдущее практическое задание и сохраненный файл index.js в каталоге stores.
1. Откройте в редакторе файл index.js 
2. В верхней части файла index.js добавьте модуль path:
  const path = require("path");
3. Метод main реализуйте следующим образом:
  async function main() {  
    const salesDir = path.join(__dirname, "stores");  
    const salesFiles = await findSalesFiles(salesDir);  
    console.log(salesFiles);  
  }  
Этот код изменен так, чтобы вместо передачи статического имени папки использовалось значение __dirname. Адрес вычислен с помощью path и был помещен в переменную salesDir.
4. Измените метод findFiles для реализации объединения путей:  
  await findFiles(path.join(folderName, item.name));
Теперь вместо того, чтобы сцеплять имена папок для формирования нового пути поиска используется метод join. Это позволит коду успешно работать в разных операционных системах.
5. В методе findFiles измените оператор if, чтобы проверять только расширение имени файла, а также используйте метод join, чтобы составить полный путь к файлу:  
  if (path.extname(item.name) === ".json") {  
    await salesFiles.push(path.join(folderName, item.name));  
}  
6. Сохраните файл index.js и закройте редактор.
7. Создайте в каталоге stores файл total.json.
8. Запустите в Node файл index.js. При успешном выполнении задания должен быть получен следующий вывод:  
[  
'/home/eldar/Node/text-files/stores/201/sales.json',  
'/home/eldar/Node/text-files/stores/202/sales.json',  
'/home/eldar/Node/text-files/stores/203/sales.json',  
'/home/eldar/Node/text-files/stores/204/sales.json',  
'/home/eldar/Node/text-files/stores/total.json'  
]. 

### 1.3 Практическое задание
Рассмотрим пример создания каталога и файла, сформированного в результате чтения вложенных файлов.
В этом задании потребуется успешно выполненное предыдущее практическое задание и сохраненный файл index.js в каталоге stores.
1. Откройте в редакторе файл index.js
2. Метод main реализуйте следующим образом:  
     async function main() {  
       const salesDir = path.join(__dirname, "stores");  
       const salesTotalsDir = path.join(__dirname, "salesTotals");  
       try {  
         await fs.mkdir(salesTotalsDir);  
       } catch {  
         console.log(`${salesTotalsDir} уже существует!`);  
}  
       const salesFiles = await findSalesFiles(salesDir);  
     }  
Этот код изменен так, чтобы создать каталог salesTotalsDir если его нет, и вывести сообщение в противном случае.
3. Добавьте в конец функции main следующую строку кода:  
     await fs.writeFile(path.join(salesTotalsDir, "totals.txt"), String());  
Этот код создаст пустой файл totals.txt в каталоге salesTotals.  
4. Сохраните файл index.js и закройте редактор.
5. Запустите в Node файл index.js. При успешном выполнении задания должен быть создан файл totals.txt в каталоге salesTotals:
     salesTotals/
      totals.txt
### 1.4 Практическое задание
Рассмотрим подход к реализации чтения файлов JSON, выполнение простых вы- числений и запись данных в итоговый файл.
В этом задании потребуется успешно выполненное предыдущее практическое задание и сохраненный файл index.js в каталоге stores.
1. Откройте в редакторе файл index.js

Технологии разработки web-приложений Болтачев Э.Ф.
 2. В начале файла index.js, сразу после оператора require("path"), реализуйте функцию (в строке с записью *ЗАПОЛНИТЬ*), которая будет вычислять суммарный объем продаж. Этот метод принимает массив путей к файлам, который он может перебирать:
async function calculateSalesTotal(salesFiles) { // *ЗАПОЛНИТЬ*
}
3. Метод main реализуйте следующим образом:  
  async function main() {  
    const salesDir = path.join(__dirname, "stores");  
    const salesTotalsDir = path.join(__dirname, "salesTotals");  
    try {  
      await fs.mkdir(salesTotalsDir);  
    } catch {  
      console.log(`${salesTotalsDir} уже существует!`);  
    }  
    const salesFiles = await findSalesFiles(salesDir);  
    const salesTotal = await calculateSalesTotal(salesFiles);  
    await fs.writeFile(  
      path.join(salesTotalsDir, "result.txt"),  
      `${salesTotal}\r\n`,  
      { flag: "a" }  
); }  
Здесь вызов функции calculateSalesTotals выполняется сразу перед вызо- вом fs.writeFile. Тем самым получаем вычисленное значение в переменную salesTotal.
4. Сохраните файл index.js и закройте редактор.
5. Запустите в Node файл index.js. При успешном выполнении задания в ката- логе salesTotals должен быть создан файл result.txt, содержащий значение 185933.76
