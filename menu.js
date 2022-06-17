const bold = document.querySelector('.bold');
const italic = document.querySelector('.italic');
const underline = document.querySelector('.underline');
const alignLeft = document.querySelector('.left');
const alignCenter = document.querySelector('.center');
const alignRight = document.querySelector('.right');
const select = document.querySelectorAll('select');
const inputColorOptions = document.querySelectorAll('input[type="color"]');

bold.addEventListener('click', () => {
    setFontStyle("bold", bold);
})

italic.addEventListener('click', () => {
    setFontStyle("italic", italic);
})

underline.addEventListener('click', () => {
    setFontStyle("underline", underline);
})

alignLeft.addEventListener('click',()=>{
    setHorizontalAlignment('left',alignLeft);
})

alignCenter.addEventListener('click',()=>{
    setHorizontalAlignment('center',alignCenter);
})

alignRight.addEventListener('click',()=>{
    setHorizontalAlignment('right',alignRight);
})

for(let i = 0; i<select.length; i++){
    select[i].addEventListener('change',(e)=>{
        console.log(e.target.value);
        setFontOption(e.target,e.target.value);
    })
}

for(let i = 0; i<inputColorOptions.length; i++){
    inputColorOptions[i].addEventListener('blur',(e)=>{
        console.log(e.target.value);
        setColorOption(e.target,e.target.value);
    })
}

function setFontOption(element,fontOption){
    if(lastSelectedCell){
        const {rowId,colId} = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];
        if(element.id == 'font-family'){
            lastSelectedCell.style.fontFamily = fontOption;
            cellObject.fontOption.fontFamily = fontOption;
        }else{
            lastSelectedCell.style.fontSize = fontOption + "px";
            cellObject.fontOption.fontSize = fontOption;
        }
    }
}

function setFontStyle(styleName, element) {
    if (lastSelectedCell) {
        const { rowId, colId } = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];
        if (cellObject.fontStyle[styleName]) {
            if (styleName == "bold") {
                lastSelectedCell.style.fontWeight = 'normal';
            } else if (styleName == "italic") {
                lastSelectedCell.style.fontStyle = 'normal';
            } else {
                lastSelectedCell.style.textDecoration = 'none';
            }
            element.classList.remove('active-menu-option');
        } else {
            if (styleName == "bold") {
                lastSelectedCell.style.fontWeight = 'bold';
            } else if (styleName == "italic") {
                lastSelectedCell.style.fontStyle = 'italic';
            } else {
                lastSelectedCell.style.textDecoration = 'underline';
            }
            element.classList.add('active-menu-option');
        }
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}

function setHorizontalAlignment(alignName,element){
    if(lastSelectedCell){
        const {rowId,colId} = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];
        const aligntype = cellObject.horizontalAlign;

        if(alignName == "left"){
            lastSelectedCell.style.textAlign = "left";
            cellObject.horizontalAlign = "left";
        }else if(alignName == "center"){
            lastSelectedCell.style.textAlign = "center";
            cellObject.horizontalAlign = "center";
        }else if(alignName == "right"){
            lastSelectedCell.style.textAlign = "right";
            cellObject.horizontalAlign = "right";
        }

        const prevActiveAlignment = document.querySelector('.horizontal-align .active-menu-option');
        prevActiveAlignment.classList.remove('active-menu-option');
        element.classList.add('active-menu-option');
    }
}

function setColorOption(element,colorOption){
    if(lastSelectedCell){
        const {rowId,colId} = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];
        if(element.id == 'text-color-palette'){
            lastSelectedCell.style.color = colorOption;
            cellObject.textColor = colorOption;
        }else{
            lastSelectedCell.style.backgroundColor = colorOption;
            cellObject.backgroundColor = colorOption;
        }
    }
}