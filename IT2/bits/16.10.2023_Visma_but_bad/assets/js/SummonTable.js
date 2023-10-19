var FormCurrentSelectedClass = null;

//spawn_table2(tbl_data[1], 0, SelectedClass, false,["TableArea","RootTableID_","table"]);

function spawn_table2(Table_Data, TableID, Header , AllowMultipleTables,TableMetaData ){
    //Last input input
    /*
    [
        Table area       |TableMetaData[0]      // Div id table should spawn in
        table id         |TableMetaData[1]      //Id for table element
        table class name |TableMetaData[2]      //class name for table element


    ]


    */
    const tbl_cell_Len = Table_Data[0].length;
    const tbl_row_Len = Table_Data.length;
    const TableArea = document.getElementById(TableMetaData[0]);

    //Summon multiple tables

    const RootTable = document.createElement("table");
    const CurrentRootTableID = TableMetaData[1] + TableID;
    RootTable.id = CurrentRootTableID;
    RootTable.className = TableMetaData[2] ;

    const RemovedTable = document.getElementById(CurrentRootTableID); 
    const TableClass = document.getElementsByClassName(TableMetaData[2]);

    if (Table_Data == 0 && TableID==0 && Header==0){
        //delete all tables
    }

    if(RemovedTable !=null){
        //Remove if same table wants to spawn
        RemovedTable.remove(); 
        FormCurrentSelectedClass = null;
    }
    else{
        if(AllowMultipleTables){
            //summon multiple tables within same element
            
            TableArea.appendChild(RootTable);
            const TableParent = document.getElementById(TableMetaData[1] + TableID);

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

                const TableParent = document.getElementById(TableMetaData[1] + TableID);

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
            
                const TableParent = document.getElementById(TableMetaData[1] + TableID);
            
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

    const TableParent = document.getElementById(TableMetaData[1] + TableID);

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



