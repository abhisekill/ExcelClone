const addSheet = document.querySelector('.add-sheet');
const sheetList = document.querySelector('.sheet-list');
const firstSheet = document.querySelector('.sheet');
sheetListener(firstSheet);

let sheetId = 0;

addSheet.addEventListener('click',(e)=>{
    sheetId++;
    const prevActiveSheet = document.querySelector('.active-sheet');
    prevActiveSheet.classList.remove('active-sheet');
    const newSheet = document.createElement('div');
    newSheet.classList.add('sheet');
    newSheet.classList.add('active-sheet');
    newSheet.setAttribute('sheetId',sheetId);
    newSheet.innerText = `Sheet${sheetId+1}`;
    sheetList.append(newSheet);

    // add event listener to each newly created sheet
    sheetListener(newSheet);

    // add a newly created sheet to the DB
    initUI();
    intiDB();
})

function sheetListener(sheet){
    sheet.addEventListener('click',()=>{
        const prevActiveSheet = document.querySelector('.active-sheet');
        if(sheet == prevActiveSheet)
            return;
        prevActiveSheet.classList.remove('active-sheet');
        sheet.classList.add('active-sheet');
        let curSheetId = sheet.getAttribute('sheetId'); 
        db = sheetsDB[curSheetId];
        // now update the ui
        setUI();
    })
}

function setUI(){
    for(let i = 0; i<100; i++){
        for(let j = 0; j<26; j++){
            const cell = document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            const cellObj = db[i][j];
            cell.innerText = cellObj.value;
        }
    }
}

function initUI(){
    for(let i = 0; i<100; i++){
        for(let j = 0; j<26; j++){
            const cell = document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            cell.innerText = "";
        }
    }
}