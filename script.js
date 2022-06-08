
const topRow = document.querySelector('.top-row');
const leftCol = document.querySelector('.left-col');
const topLeftCell = document.querySelector('.top-left-cell');
const allCells = document.querySelectorAll('.cell');
const addressBar = document.querySelector('#address-bar')
const formulaInput = document.querySelector("#formula-bar");

let lastSelectedCell;

cellContainerDiv.addEventListener('scroll',(e)=>{
    const scrollFromTop = e.target.scrollTop;
    const scrollFromLeft = e.target.scrollLeft;
    // console.log(scrollFromTop);
    topRow.style.top = scrollFromTop + "px";
    leftCol.style.left = scrollFromLeft + "px";
    topLeftCell.style.top = scrollFromTop + "px";
    topLeftCell.style.left = scrollFromLeft + "px";
})

for(let i = 0; i<allCells.length; i++){
    allCells[i].addEventListener('click',(e)=>{
        const {rowId,colId} = getRowIdColId(e.target);
        const address = String.fromCharCode(colId+65) + (rowId+1) +"";
        // console.log(address);
        addressBar.value = address;
        // show formula in the UI
        const cellObject = db[rowId][colId];
        formulaInput.value = cellObject.formula;
    })

    allCells[i].addEventListener('blur',(e)=>{
        lastSelectedCell = e.target;
        const cellValue = e.target.textContent;
        const {rowId,colId} = getRowIdColId(e.target);
        const cellObj = db[rowId][colId];
        if(cellObj.value == cellValue)
            return;
        cellObj.value = cellValue;
        console.log(cellObj);
    })
}

formulaInput.addEventListener('blur',(e)=>{
    const formula = e.target.value;
    if(formula){
        const computedValue = solveFormula(formula);
        const {rowId,colId} = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];
        // updatae db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        // update ui
        lastSelectedCell.textContent = computedValue;
    }
})

