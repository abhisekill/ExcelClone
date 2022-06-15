const bold = document.querySelector('.bold');
const italic = document.querySelector('.italic');
const underline = document.querySelector('.underline');

bold.addEventListener('click', () => {
    setFontStyle("bold", bold);
})

italic.addEventListener('click', () => {
    setFontStyle("italic", italic);
})

underline.addEventListener('click', () => {
    setFontStyle("underline", underline);
})

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
            element.classList.remove('active-font-style');
        } else {
            if (styleName == "bold") {
                lastSelectedCell.style.fontWeight = 'bold';
            } else if (styleName == "italic") {
                lastSelectedCell.style.fontStyle = 'italic';
            } else {
                lastSelectedCell.style.textDecoration = 'underline';
            }
            element.classList.add('active-font-style');
        }
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}