function getRowIdColId(ele){
    const rowId = Number(ele.getAttribute('rowid'));
    const colId = Number(ele.getAttribute('colid'));
    return {
        rowId,
        colId
    }
}

function getRowIdColIdFromAddress(address){
    const colId = address.charCodeAt(0)-65;
    const rowId = Number(address.substring(1))-1;
    return {
        rowId,
        colId
    }
}

function solveFormula(formula){
    // formula = "A1 + B2 - 2 +C3"
    const components = formula.split(" ");
    // components = ["A1","+","B2","-","2","+",C3"]
    for(let i = 0; i<components.length; i++){
        const comp = components[i];
        if(comp[0] >= 'A' && comp[0] <= 'Z'){
            const {rowId,colId} = getRowIdColIdFromAddress(comp);
            const cellObject = db[rowId][colId];
            const value = cellObject.value;
            formula = formula.replace(comp,value);
        }
    }

    const computedValue = eval(formula);
    return computedValue;
}

