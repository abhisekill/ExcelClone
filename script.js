
const topRow = document.querySelector('.top-row');
const leftCol = document.querySelector('.left-col');
const topLeftCell = document.querySelector('.top-left-cell');
const allCells = document.querySelectorAll('.cell');
const addressBar = document.querySelector('#address-bar')
const formulaInput = document.querySelector("#formula-bar");

let lastSelectedCell;

cellContainerDiv.addEventListener('scroll', (e) => {
    const scrollFromTop = e.target.scrollTop;
    const scrollFromLeft = e.target.scrollLeft;
    // console.log(scrollFromTop);
    topRow.style.top = scrollFromTop + "px";
    leftCol.style.left = scrollFromLeft + "px";
    topLeftCell.style.top = scrollFromTop + "px";
    topLeftCell.style.left = scrollFromLeft + "px";
})

for (let i = 0; i < allCells.length; i++) {
    // whenever a cell is clicked , show its address in address bar 
    // and the formula associated with it in the formula bar
    allCells[i].addEventListener('click', (e) => {
        const { rowId, colId } = getRowIdColId(e.target);
        const address = String.fromCharCode(colId + 65) + (rowId + 1) + "";
        // console.log(address);
        addressBar.value = address;
        // show formula in the UI
        const cellObject = db[rowId][colId];
        formulaInput.value = cellObject.formula;
        // highlight the cell which is clicked
        const prevCell = document.querySelector('.active-cell');
        if (prevCell && prevCell != e.target) {
            prevCell.classList.remove('active-cell');
        }
        e.target.classList.add('active-cell');

        const prevTopAndLeftCell = document.querySelectorAll('.active-cell-header');
        if (prevTopAndLeftCell[0]) {
            prevTopAndLeftCell[0].classList.remove('active-cell-header');
            prevTopAndLeftCell[1].classList.remove('active-cell-header');
        }
        const topRowCell = document.querySelector(`div[topRowCellId = '${colId}']`);
        const leftColCell = document.querySelector(`div[leftColCellId = '${rowId}']`);
        if (topRowCell.classList.contains('active-cell-header')
            && leftColCell.classList.contains('active-cell-header')) {
            return;
        }
        topRowCell.classList.add('active-cell-header');
        leftColCell.classList.add('active-cell-header');

        // font style
        cellObject.fontStyle.bold ? document.querySelector('.bold').classList.add('active-menu-option') :
            document.querySelector('.bold').classList.remove('active-menu-option');
        cellObject.fontStyle.italic ? document.querySelector('.italic').classList.add('active-menu-option') :
            document.querySelector('.italic').classList.remove('active-menu-option');
        cellObject.fontStyle.underline ? document.querySelector('.underline').classList.add('active-menu-option') :
            document.querySelector('.underline').classList.remove('active-menu-option');
        // horizontal align
        const prevActiveAlignment = document.querySelector('.horizontal-align .active-menu-option');
        prevActiveAlignment.classList.remove('active-menu-option');
        const alignType = cellObject.horizontalAlign;
        document.querySelector(`.${alignType}`).classList.add('active-menu-option');
        
    })

    allCells[i].addEventListener('blur', (e) => {
        lastSelectedCell = e.target;
        const cellValue = e.target.textContent;
        const { rowId, colId } = getRowIdColId(e.target);
        const cellObj = db[rowId][colId];
        if (cellObj.value == cellValue)
            return;
        cellObj.value = cellValue;
        // console.log(cellObj);
        updateChildren(cellObj);
    })

    allCells[i].addEventListener('keydown', (e) => {
        if (e.key == 'Backspace') {
            const cell = e.target;
            const { rowId, colId } = getRowIdColId(cell);
            const cellObj = db[rowId][colId];
            if (cellObj.formula) {
                // update ui
                cell.textContent = "";
                formulaInput.value = "";
                // update db
                cellObj.value = "";
                cellObj.formula = "";
                removeFormula(cellObj);
                console.log(cellObj);
            }
        }
    })
}

formulaInput.addEventListener('blur', (e) => {
    const formula = e.target.value;
    if (formula) {
        const { rowId, colId } = getRowIdColId(lastSelectedCell);
        const cellObject = db[rowId][colId];

        // if formula is already there in a cell and it is then changed
        if (cellObject.formula) {
            removeFormula(cellObject);
        }

        const computedValue = solveFormula(formula, cellObject);
        // updatae db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        // update ui
        lastSelectedCell.textContent = computedValue;

        // update child value if formula is modified
        updateChildren(cellObject);
    }
})

