function SpawnTable2Arr(SpawnArea, TableID, HeaderArray, DataArray){
    const TableArea = document.getElementById(SpawnArea);
    const TableElement = document.createElement("table");
    TableElement.id = TableID;
    TableElement.className = "Table";
    TableArea.appendChild(TableElement);

    //Summon table header
    const TableHeaderTableRow = document.createElement("tr");
    TableElement.appendChild(TableHeaderTableRow);
    const HeaderArrayLength = HeaderArray.length;
    for(let HeaderArrayPointer = 0; HeaderArrayPointer < HeaderArrayLength; HeaderArrayPointer ++){
        //Summon every header in table
        const TableHeader = document.createElement("th");
        TableHeader.innerHTML = HeaderArray[HeaderArrayPointer];
        TableHeaderTableRow.appendChild(TableHeader);

    }

    //Add data
    const TableRowLength = DataArray.length;
    for(let TableRowArrayPointer = 0; TableRowArrayPointer <TableRowLength ; TableRowArrayPointer ++ ){
        const CurrentTableRow = document.createElement("tr");
        TableElement.appendChild(CurrentTableRow);
        // Read data from array and place in td
        const CurrentTableDataLength = DataArray[TableRowArrayPointer].length;
        for(let CurrentTableDataPointer = 0; CurrentTableDataPointer <CurrentTableDataLength; CurrentTableDataPointer ++ ){
            const CurrentTableData = document.createElement("td");
            CurrentTableData.innerHTML = DataArray[TableRowArrayPointer][CurrentTableDataPointer];
            CurrentTableRow.appendChild(CurrentTableData);   
            



            
        }

    }

}