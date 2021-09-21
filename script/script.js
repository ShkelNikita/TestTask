let table = {
///Объект таблицы
    localData : [],
    dataURL : 'https://raw.githubusercontent.com/ShkelNikita/TestTask/main/data.json',
    tableId : document.getElementById('infoTable'),

    drawTable(localData, tableId){
///Метод отрисовывющий таблицу по
///данным полученным через getData
///(сразу же навешиваем listener'ы на строки
///для их последующего редактирования)
        for(elementId = 0; elementId<localData.length; elementId++){
            newTr = tableId.insertRow(elementId+1);
            newTr.addEventListener('click', (event)=> {table.adjustTable(event.target)});
            id = 0;
            Object.keys(localData[elementId]).forEach(key =>{
                if (key !== 'id' && key!== 'phone'){
                    if (key === 'name'){
                        newTd = newTr.insertCell(id);
                        newTd.innerHTML = localData[elementId][key].firstName
                        id++;
                        newTd = newTr.insertCell(id);
                        newTd.innerHTML = localData[elementId][key].lastName
                        id++;
                    }else
                    {
                        newTd = newTr.insertCell(id);
                        newTd.innerHTML = localData[elementId][key]
                        id++;
                    }
                }
            })
        }
    },

    getData(URL){
///Метод получающий json объект из url и 
///передающий его в draw table для отрисовки
        const request = new XMLHttpRequest();
        request.open('GET', URL);
        request.responseType = 'json';
        request.send();
        request.onload = () =>{
            this.localData = request.response;            
            this.drawTable(this.localData, this.tableId);
        }
    },

    sortTable(key){
///Метод сортирующий таблицу в последствии нажатия 
///кнопки sort, путем сортировки таблицы по параметру 
///и полной перерисовки
        let keyTable = [];
        let newTableData = [];
        let dualChek = [];
        if (key === 'firstName' || key === 'lastName'){
            for(elementId = 0; elementId<this.localData.length; elementId++){
               keyTable.push(this.localData[elementId].name[key])
            }
            keyTable.sort();
            for(elementId = 0; elementId<keyTable.length; elementId++){
                   for(keyId = 0; keyId<this.localData.length; keyId++){
                       if (keyTable[elementId] === this.localData[keyId].name[key]){
                            newTableData.push(this.localData[keyId])
                       }
                    }
            }
        }else{
            for(elementId = 0; elementId<this.localData.length; elementId++){
                keyTable.push(this.localData[elementId][key])
             }
             keyTable.sort();
             for(elementId = 0; elementId<keyTable.length; elementId++){
                    for(keyId = 0; keyId<this.localData.length; keyId++){
                        if(key !== 'eyeColor' ){
                            if (keyTable[elementId] === this.localData[keyId][key]){
                                newTableData.push(this.localData[keyId])
                           }
                        }else{
                            if (keyTable[elementId] === this.localData[keyId][key] && !(elementId in dualChek)){
                                newTableData.push(this.localData[keyId])
                                dualChek.push(keyId);
                           }                            
                        }

                     }
             }
        }
        for(elementId = 0; elementId<newTableData.length; elementId++){
            id=0;
            Object.keys(newTableData[elementId]).forEach(key =>{
                if (key !== 'id' && key!== 'phone'){
                    if (key === 'name'){
                        this.tableId.childNodes[1].childNodes[elementId+2].childNodes[id].innerHTML = newTableData[elementId][key].firstName;
                        id++;
                        this.tableId.childNodes[1].childNodes[elementId+2].childNodes[id].innerHTML = newTableData[elementId][key].lastName;
                        id++;
                    }else{
                        this.tableId.childNodes[1].childNodes[elementId+2].childNodes[id].innerHTML = newTableData[elementId][key];
                        id++;
                    }
                }
            })
        }
    },

    adjustTable(tableRow){
///Метод позволяющий изменить строки таблицы
///через input'ы
        changingRow = tableRow.parentNode
        changeForm = document.getElementById('changeForm');
        changeForm.style.display = 'block';
        changeButton = document.getElementById('changeButton');
        changeButton.addEventListener('click', ()=>{
            values = Array.from(document.querySelectorAll('#changeForm input'))
            for(tableCell = 1; tableCell<=4 ; tableCell++){
                changingRow.childNodes[tableCell-1].innerHTML = values[tableCell-1].value;
            }
            changeForm.style.display = 'none'
        })
    },


}
///Далее вызываем конструктор таблицы, и навешиваем
///слушатели ивентов на кнопки сортировки,
///соответственно для сортировки
table.getData(table.dataURL);
const firstNameButton = document.getElementById('sortFirstName');
firstNameButton.addEventListener('click', ()=> {table.sortTable('firstName')});
const lastNameButton = document.getElementById('sortLastName');
lastNameButton.addEventListener('click', ()=> {table.sortTable('lastName')});
const aboutButton = document.getElementById('sortAbout');
aboutButton.addEventListener('click', ()=> {table.sortTable('about')});
const eyeColorButton = document.getElementById('sortEyeColor');
eyeColorButton.addEventListener('click', ()=> {table.sortTable('eyeColor')});
