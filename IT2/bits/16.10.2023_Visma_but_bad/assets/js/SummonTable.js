var FormCurrentSelectedClass = null;
function spawn_table2(Table_Data, TableID, Header , AllowMultipleTables){
    
    const tbl_cell_Len = Table_Data[0].length;
    const tbl_row_Len = Table_Data.length;
    const TableArea = document.getElementById("TableArea");

    //Summon multiple tables

    const RootTable = document.createElement("table");
    const CurrentRootTableID = "RootTableID_" + TableID;
    RootTable.id = CurrentRootTableID;
    RootTable.className = "Table";

    
    
    // allow only one table with same id
    /*
    const RemovedTable = document.getElementById(CurrentRootTableID); 

    if(RemovedTable != null){
        console.info("spawn_table2(); Id= '" + CurrentRootTableID + "' Exists already");        
        RemovedTable.remove();        
    }

    const TableAmount = document.getElementsByClassName("Table");   
    if(TableAmount.length > 1){
        const RemoveLastTable = document.getElementById(ClassIndexToId("Table", 1, true));
        RemoveLastTable.remove();
    }
    */

    const RemovedTable = document.getElementById(CurrentRootTableID); 
    const TableClass = document.getElementsByClassName("table");

    if (Table_Data == 0 && TableID==0 && Header==0){
        //delete all tables
    }

    if(RemovedTable !=null){
        //Remove if same table wants to spawn
        console.log("is not null");
        RemovedTable.remove(); 
        FormCurrentSelectedClass = null;
    }
    else{
        if(AllowMultipleTables){
            //summon multiple tables within same element
            
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
        else{
            //prevent multiple tables from summoning
            if(TableClass.length > 0){
                TableClass[0].remove();
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
            else{
               
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

        }
    }


 /*
    TableArea.appendChild(RootTable);
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
    */

}
