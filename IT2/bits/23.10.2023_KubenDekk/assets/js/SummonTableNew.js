/*var tableMetadata = [
    "TableArea", /* Summon table within this div id
    "table01", /*Summoned table ID
    "table",/*Summoned table Class
];
*/

function SpawnTable(TableData, TableMetaData ){
    /*
    !Table specific Metadata!
    TableData[0][0] | Table id. Can be used to locate table if pointers in for loop are offset
    TableData[0][1] | Load custom css on entire table
    TableData[0][2] | Spawn table with given caption
    !Table specific Metadata!

    !Data!
    TableData[1][0][0] | first key used to identify row. Row 0 used for table metadata
    TableData[0][1][0] | second key used to load specific column (["14:30 - 16:00" Datafalse, false Treat innerHTML,"" Custom css])
    TableData[0][0][1] | 3rd key used to select data within specifi column
    !Data!

    !Table spawn data!
    TableMetaData[0] | Div id for where table should be summoned
    TableMetaData[1] | Table div id
    TableMetaData[2] | Table div class
    !Table spawn data!
    */


    //Summon <table> element
    const RootTableElement = document.getElementById(TableMetaData[0]); 
    const TableElement = document.createElement("table");
    TableElement.id = TableMetaData[1];
    TableElement.className = TableMetaData[2];    
    RootTableElement.appendChild(TableElement);
    //TODO apply css to root table (TableData[0][1])
    //Summon <table> element

    //Summon caption for table
    const TableCaption = document.createElement("caption");
    TableCaption.id = "caption_" + TableMetaData[1];
    TableCaption.innerHTML =  TableData[0][2];
    TableElement.appendChild(TableCaption);
    //Summon Caption for table

    //Summon Row for table
        //Now the indexes have to start at 1 and not 0
    for(let CurrentTableRowIndex = 1; CurrentTableRowIndex < TableData.length; CurrentTableRowIndex++){
        //Summon tr
        const CurrentTableRow = document.createElement("tr");
        TableElement.appendChild(CurrentTableRow);
        //summon tr

        const CurrentTableRowIndexOffset = CurrentTableRowIndex - 1;
        if(CurrentTableRowIndexOffset == 0){
            //Summon Header for Table
            for(let CurrentHeaderIndex = 0; CurrentHeaderIndex < TableData[1].length; CurrentHeaderIndex++){
                const CurrentTableHeader = document.createElement("th");
                CurrentTableHeader.innerHTML = TableData[CurrentTableRowIndex][CurrentHeaderIndex][0];
                CurrentTableRow.appendChild(CurrentTableHeader);
            }
            //Summon Header for Table

        }
        else if(CurrentTableRowIndexOffset > 0){
            //Summon cells
            for(let CurrentCellIndex = 0; CurrentCellIndex < TableData[1].length; CurrentCellIndex++){
                const CurrentTableCell = document.createElement("td");                
                CurrentTableCell.innerHTML = TableData[CurrentTableRowIndex][CurrentCellIndex][0];
                CurrentTableRow.appendChild(CurrentTableCell);                
            }
            //Summon cells     
                   
        }       


    }

    //Summon Row for table




}

function Table2Array(tableID){
    const table = document.getElementById(tableID);
    const rows = table.querySelectorAll('tr');
    const tableData = [];

    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td, th');

        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });

        tableData.push(rowData);
    });

    return tableData;
}


