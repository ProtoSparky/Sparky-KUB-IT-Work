function init(){
    const TableLength = Table.length;
    for(let CurrentTablePointer = 0; CurrentTablePointer <TableLength; CurrentTablePointer++){
        SpawnTable(Table[CurrentTablePointer],["TableArea","table0"+ CurrentTablePointer,"table",]);
    }
    
}