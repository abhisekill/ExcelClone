const cellContainerDiv = document.querySelector('.cell-cont');

function initGrid() {
    // top-left-cell
    let cellsContent = "<div class='top-left-cell'></div>";
    // top-row
    cellsContent += "<div class='top-row'>"
    for (let i = 0; i < 26; i++) {
        cellsContent += `<div class='top-row-cell' topRowCellId = '${i}'>${String.fromCharCode(65 + i)}</div>`
    }
    cellsContent += "</div>";

    // left-column
    cellsContent += "<div class='left-col'>"
    for (let i = 0; i < 100; i++) {
        cellsContent += `<div class='left-col-cell' leftColCellId = '${i}'>${1 + i}</div>`
    }
    cellsContent += "</div>"

    // remaining cells
    cellsContent += "<div class='cells'>"
    for (let i = 0; i < 100; i++) {
        cellsContent += "<div class='row'>"
        for (let j = 0; j < 26; j++) {
            cellsContent += `<div class='cell' rowid = '${i}' colid = '${j}'
                contentEditable spellcheck="false"></div>`
        }
        cellsContent += "</div>"
    }
    cellsContent += "</div>";
    cellContainerDiv.innerHTML = cellsContent;
}

initGrid();
let sheetsDB = [];
let db;
function intiDB() {
    let newSheetDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            const address = String.fromCharCode(65 + j) + (i + 1) + "";
            const cellObject = {
                address: address,
                value: "",
                formula: "",
                children: [],
                parent: [],
                fontStyle: {
                    bold: false,
                    italic: false,
                    underline: false
                }
            }
            row.push(cellObject);
        }
        newSheetDB.push(row);
    }
    db = newSheetDB;
    sheetsDB.push(newSheetDB);
    console.log(sheetsDB);
}

intiDB();