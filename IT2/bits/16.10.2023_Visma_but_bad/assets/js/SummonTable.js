function spawn_table2(Table_Data, TableID, Header){
const tbl_cell_Len = Table_Data[0].length;
const tbl_row_Len = Table_Data.length;
const TableArea = document.getElementById("TableArea");

//Summon multiple tables

const RootTable = document.createElement("table");
RootTable.id = "RootTableID_" + TableID;
RootTable.class = "Table";
TableArea.appendChild(RootTable);

const TableParent = document.getElementById("RootTableID_" + TableID);

//Header
const TableCaption = document.createElement("caption");
TableParent.appendChild(TableCaption); 
TableCaption.append(Header);
//Header

for(let TableRowPointer = 0; TableRowPointer < tbl_row_Len; TableRowPointer ++ ){
    const TableRow = document.createElement("tr");
    TableParent.appendChild(TableRow);

    //Summon <tr>
    if (TableRowPointer == 0){
        // summon Table Header
        for(let TableHeaderPointer = 0; TableHeaderPointer < tbl_cell_Len; TableHeaderPointer ++){                
            const TableHeader = document.createElement("th");
            TableRow.appendChild(TableHeader);
            TableHeader.append(Table_Data[TableRowPointer][TableHeaderPointer]);
        }
    }
    else{
        // summon Table Cell
        for(let TableHeaderPointer = 0; TableHeaderPointer < tbl_cell_Len; TableHeaderPointer ++){                
            const TableHeader = document.createElement("td");
            TableRow.appendChild(TableHeader);
            TableHeader.append(Table_Data[TableRowPointer][TableHeaderPointer]);
        }
    }
}

}
