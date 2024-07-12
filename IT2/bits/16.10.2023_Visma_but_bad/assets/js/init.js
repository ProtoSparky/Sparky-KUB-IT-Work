function init(){
    const TableLength = DataOP(1, true, "TableData").length;
    for(let CurrentTablePointer = 0; CurrentTablePointer <TableLength; CurrentTablePointer++){
        SpawnTable(DataOP(1, true, "TableData")[CurrentTablePointer],["TableArea","table0"+ CurrentTablePointer,"table",]);
    }   
   
    
}
