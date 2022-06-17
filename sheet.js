const addSheet = document.querySelector('.add-sheet');
const sheetList = document.querySelector('.sheet-list');
const firstSheet = document.querySelector('.sheet');
sheetListener(firstSheet);

let sheetId = 0;

addSheet.addEventListener('click', (e) => {
    sheetId++;
    const prevActiveSheet = document.querySelector('.active-sheet');
    prevActiveSheet.classList.remove('active-sheet');
    const newSheet = document.createElement('div');
    newSheet.classList.add('sheet');
    newSheet.classList.add('active-sheet');
    newSheet.setAttribute('sheetId', sheetId);
    newSheet.innerText = `Sheet${sheetId + 1}`;
    sheetList.append(newSheet);

    // add event listener to each newly created sheet
    sheetListener(newSheet);
    // clean the ui
    initUI();
    // add a newly created sheet to the DB
    intiDB();
})

function sheetListener(sheet) {
    sheet.addEventListener('click', () => {
        const prevActiveSheet = document.querySelector('.active-sheet');
        if (sheet == prevActiveSheet)
            return;
        prevActiveSheet.classList.remove('active-sheet');
        sheet.classList.add('active-sheet');
        // clean the ui
        initUI();
        let curSheetId = sheet.getAttribute('sheetId');
        db = sheetsDB[curSheetId];
        // now update the ui
        setUI();
    })
}

function setUI() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            const cell = document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            const cellObj = db[i][j];
            cell.innerText = cellObj.value;
            cell.style.backgroundColor = cellObj.backgroundColor;
            cell.style.color = cellObj.textColor;
            cell.style.fontFamily = cellObj.fontOption.fontFamily;
            cell.style.fontSize = cellObj.fontOption.fontSize + "px";
            cell.style.textAlign = cellObj.horizontalAlign;

            if(cellObj.fontStyle.bold){
                cell.style.fontWeight = 'bold';
            }else{
                cell.style.fontWeight = 'normal';
            }
            if(cellObj.fontStyle.italic){
                cell.style.fontStyle = 'italic';
            }else{
                cell.style.fontStyle = 'normal';
            }
            if(cellObj.fontStyle.underline){
                cell.style.textDecoration = 'underline';
            }else{
                cell.style.textDecoration = 'none';
            }
        }
    }
}

function initUI() {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            const cell = document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            cell.innerText = "";
            cell.classList.remove('active-cell');
            cell.style.backgroundColor = "#ffffff";
            cell.style.color = "#000000";
        }
    }
    const prevTopAndLeftCell = document.querySelectorAll('.active-cell-header');
    if (prevTopAndLeftCell[0]) {
        prevTopAndLeftCell[0].classList.remove('active-cell-header');
        prevTopAndLeftCell[1].classList.remove('active-cell-header');
    }
    addressBar.value = "";
    formulaInput.value = "";


    document.querySelector('.bold').classList.remove('active-menu-option');
    document.querySelector('.italic').classList.remove('active-menu-option');
    document.querySelector('.underline').classList.remove('active-menu-option');
    const prevActiveAlignment = document.querySelector('.horizontal-align .active-menu-option');
    prevActiveAlignment.classList.remove('active-menu-option');
    document.querySelector('.left').classList.add('active-menu-option');
    fontFamily.value = "sans-serif";
    fontSize.value = "13";
    textColor.value = "#000000";
    backgroundColor.value = "#ffffff";
}