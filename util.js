function getRowIdColId(ele) {
    const rowId = Number(ele.getAttribute('rowid'));
    const colId = Number(ele.getAttribute('colid'));
    return {
        rowId,
        colId
    }
}

function getRowIdColIdFromAddress(address) {
    const colId = address.charCodeAt(0) - 65;
    const rowId = Number(address.substring(1)) - 1;
    return {
        rowId,
        colId
    }
}

function solveFormula(formula, childCellObject) {
    // formula = "A1 + B2 - 2 +C3"
    const components = formula.split(" ");
    // components = ["A1","+","B2","-","2","+",C3"]
    for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        if (comp[0] >= 'A' && comp[0] <= 'Z') {
            const { rowId, colId } = getRowIdColIdFromAddress(comp);
            const cellObject = db[rowId][colId];

            // pushing children to a cell
            if(childCellObject)
                cellObject.children.push(childCellObject.address);
            console.log(cellObject);

            const value = cellObject.value;
            formula = formula.replace(comp, value);
        }
    }

    const computedValue = eval(formula);
    return computedValue;
}

function updateChildren(cellObject){
    for(let i = 0; i<cellObject.children.length; i++){
        const childCellAddress = cellObject.children[i];
        const {rowId,colId} = getRowIdColIdFromAddress(childCellAddress);
        const childCellObject = db[rowId][colId];
        const newValue = solveFormula(childCellObject.formula);

        // update on db
        childCellObject.value = newValue;
        // update on ui
        const cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        cellUI.textContent = newValue;

        // recursively call on cellObject's childrens
        updateChildren(childCellObject);
    }
}

