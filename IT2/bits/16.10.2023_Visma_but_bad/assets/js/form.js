var CreateClass_Toggle = false; 
var EditClass_Toggle = false;
var DeleteClass_Toggle = false; 
const schoolHours = ["08:00 - 10:00", "10:00 - 12:00", "Lunch", "13:30 - 14-30", "14:30 - 16:00"]; 


function formINIT(){
    //  SpawnEditTable();    
    DataOP(0,true,"ButtonTable",ButtonTable);

    if(DataOP(1, true, "TableData") == null){
        DataOP(0, true, "TableData", []); 
        console.info("TableData = undefined");
        console.info("Created TableData!");

        UpdateUI(0, 1, "DB not found <br> Created table DB!", true);

    }
    
}
 

function CreateClass(){
    if (!CreateClass_Toggle){
        const ClassEditorCreate = document.getElementById("ClassEditorCreate");
        //Input        
        const ClassEditorCreate_input=document.createElement("input");
        ClassEditorCreate_input.id = "ClassEditorCreate_input";
        ClassEditorCreate_input.class = "input";    
        ClassEditorCreate_input.placeholder = "feks 1A";
        ClassEditorCreate.appendChild(ClassEditorCreate_input);

        //Input

        //Apply Button

        const ClassEditorCreate_apply = document.createElement("button");
        ClassEditorCreate_apply.id = "ClassEditorCreate_apply";
        ClassEditorCreate_apply.class = "input";
        ClassEditorCreate_apply.addEventListener("click", function(){
            //apply onclick() event
            ReadAndApply(0,ClassEditorCreate_input.value, null);
        });

        ClassEditorCreate_apply.innerHTML = "Apply Table name";
        ClassEditorCreate.appendChild(ClassEditorCreate_apply);
        //Apply Button
        CreateClass_Toggle= true;

        UpdateUI(0, 0, "Write the name of your new table and click 'apply table name' <br> A table will pop up, fill it out and click Save Table ", true);
    }
    else{
        //remove input
        const ClassEditorCreate_input = document.getElementById("ClassEditorCreate_input");
        const ClassEditorCreate_apply = document.getElementById("ClassEditorCreate_apply");
        ClassEditorCreate_input.remove();
        ClassEditorCreate_apply.remove();
        //set toggle back to false
        CreateClass_Toggle = false;
        UpdateUI(1, 0, "", true);
        
    }




    

}
function EditClass(){
    if(!EditClass_Toggle){
        const ClassEditorEdit = document.getElementById("ClassEditorEdit"); 

        //Old data input
        const ClassEditorEdit_OldName = document.createElement("input");
        ClassEditorEdit_OldName.id="ClassEditorEdit_OldName";
        ClassEditorEdit_OldName.class = "input";
        ClassEditorEdit_OldName.placeholder = "current class, feks 1A";
        ClassEditorEdit.appendChild(ClassEditorEdit_OldName);
        //Old data input

        //New data input
        const ClassEditorEdit_NewName = document.createElement("input");
        ClassEditorEdit_NewName.id = "ClassEditorEdit_NewName";
        ClassEditorEdit_NewName.class = "input";
        ClassEditorEdit_NewName.placeholder = "New class name, feks 1B";
        ClassEditorEdit.appendChild(ClassEditorEdit_NewName);
        //New data input

        //Apply button
        const ClassEditorEdit_apply = document.createElement("button");
        ClassEditorEdit_apply.id = "ClassEditorEdit_apply";
        ClassEditorEdit_apply.class = "input";
        ClassEditorEdit_apply.innerHTML = "Save changes"

        ClassEditorEdit_apply.addEventListener("click", function(){
            //apply onclick() element
            ReadAndApply(1,ClassEditorEdit_OldName.value,ClassEditorEdit_NewName.value);
        }) 
        ClassEditorEdit.appendChild(ClassEditorEdit_apply);
        //Apply button
        EditClass_Toggle= true;
        UpdateUI(0, 0, "Edit the name of the table caption. First input is the current name <br> 2nd input is new name. Click 'save changes' to save your changes ", true);
    }
    else{
        const ClassEditorEdit_OldName = document.getElementById("ClassEditorEdit_OldName");
        const ClassEditorEdit_NewName = document.getElementById("ClassEditorEdit_NewName");
        const ClassEditorEdit_apply = document.getElementById("ClassEditorEdit_apply");
        ClassEditorEdit_OldName.remove();
        ClassEditorEdit_NewName.remove();
        ClassEditorEdit_apply.remove();
        EditClass_Toggle= false;
        UpdateUI(1, 0, "", true);
    }

}
function DeleteClass(){
    
    if (!DeleteClass_Toggle){
        const ClassEditorDelete = document.getElementById("ClassEditorDelete");

        //Data input
        const ClassEditorDelete_ClassName = document.createElement("input");
        ClassEditorDelete_ClassName.id = "ClassEditorDelete_ClassName";
        ClassEditorDelete_ClassName.class = "input";
        ClassEditorDelete_ClassName.placeholder = "Class to be deleted";
        ClassEditorDelete.appendChild(ClassEditorDelete_ClassName);
        //Data input

        //Apply button
        const ClassEditorDelete_apply = document.createElement("button");
        ClassEditorDelete_apply.id = "ClassEditorDelete_apply";
        ClassEditorDelete_apply.class = "input"; 
        ClassEditorDelete_apply.addEventListener("click", function(){
            //add onclick() element
            ReadAndApply(2,ClassEditorDelete_ClassName.value, null);
        })
        ClassEditorDelete_apply.innerHTML = "Delete Table";
        ClassEditorDelete.appendChild(ClassEditorDelete_apply);
        //Apply button
        UpdateUI(0, 0, "Delete specific table. Type the name of said table in, and click Delete Table", true);
        DeleteClass_Toggle = true;        
    }
    else{
        const ClassEditorDelete_ClassName = document.getElementById("ClassEditorDelete_ClassName");
        const ClassEditorDelete_apply = document.getElementById("ClassEditorDelete_apply");
        ClassEditorDelete_ClassName.remove();
        ClassEditorDelete_apply.remove();
        DeleteClass_Toggle = false;
        UpdateUI(1, 0, "", true);
    }
}

function ReadAndApply(op, Data1, Data2){
    //0 Op to create
    //1 Op to edit
    //2 Op to delete

    if(op == 0 ){
        if(Data1 != ""){            
            //Create class
            SpawnTable(ButtonTable[0],["SettingTable","table00","table",]);
            const DataTable = document.getElementById("table00");
            const applyBTN = document.createElement("button");
            applyBTN.id="apply_table";
            applyBTN.class="input";
            applyBTN.innerHTML="Save Table";
            applyBTN.addEventListener("click", function(){
                SaveTable("table00", ButtonTable, Data1); 
            });
            DataTable.appendChild(applyBTN);
            const tableCaption = document.getElementById("caption_table00");
            tableCaption.innerHTML = tableCaption.innerHTML + " " + Data1;

        }
        else{
            UpdateUI(0, 1, "Input invalid. Name cannot be empty", false);
        }
        
        

    }
    else if(op == 1){
        //Edit class name
        if(Data1 != "" && Data2 != ""){
            EditTableName(Data1 , Data2); 
        }
        else{
            UpdateUI(0, 1, "Input invalid. New and or old name cannot be empty", false);
        }
       
    }
    else if(op == 2){
        //delete class name
        DeleteTable(Data1);
    }
}

function SaveTable(TableId,TableArray, tableName){
    const DataTable = document.getElementById(TableId);
    const TableArrayRowLength =TableArray[0].length; 
    //go trough all rows and cells


    //generate root array
    const SavedDataArray = [];

    SavedDataArray[0] = [
        "0",          //Table id
        "",           //Custom css for entire table
        tableName ,   //Table caption
    ]; 
    SavedDataArray[1] = [
        //Row0
        ["   "/*Data*/,"" /*Custom css*/],
        ["Monday"/*Data*/,"" /*Custom css*/],   
        ["Tuesday"/*Data*/,"" /*Custom css*/], 
        ["Wednesday"/*Data*/,"" /*Custom css*/], 
        ["Thursday"/*Data*/,"" /*Custom css*/], 
        ["Friday"/*Data*/,"" /*Custom css*/],  
    ]; 
    //generate root array

    for(let CurrentRowPointer = 2; CurrentRowPointer < TableArrayRowLength; CurrentRowPointer ++){
        const TableArrayCellLength = TableArray[0][CurrentRowPointer].length;

        //Generate new data array
        SavedDataArray[CurrentRowPointer] = [];  
        //Generate new data array



        for(let CurrentCellPointer = 1; CurrentCellPointer < TableArrayCellLength;CurrentCellPointer++){
            const CurrentCellId = GetStringBetween(TableArray[0][CurrentRowPointer][CurrentCellPointer][0], '<input id="', '" class="input0">');
            const CurrentCellObject = document.getElementById(CurrentCellId);
            //Get data from all cells   
            
            //Save Hours
            
            SavedDataArray[CurrentRowPointer][0] = [schoolHours[CurrentRowPointer - 2],""];
            
            
            //Generate new data array
            if (CurrentCellObject.value == "" || CurrentCellObject.value == null){
                //Saves empty input as string with space
                SavedDataArray[CurrentRowPointer][CurrentCellPointer] = [" ",""];
                console.info("SaveTable() | Saving empty input as string with space");
            }
            else{
                //Saves normal input as normal input
                SavedDataArray[CurrentRowPointer][CurrentCellPointer] = [CurrentCellObject.value,""];
            }

            
        }
    }

    const EntireSavedArrayInStorage = DataOP(1, true,"TableData"); 
    const EntireSavedArrayInStorageLength = EntireSavedArrayInStorage.length;
    EntireSavedArrayInStorage[EntireSavedArrayInStorageLength]  = SavedDataArray;    
    DataOP(0, true, "TableData",EntireSavedArrayInStorage);   
    UpdateUI(0, 1,"Table Created Successfully", true);
    setTimeout(location.reload(), 2000);


}
function EditTableName(Data1, Data2){
    //Edits table name
    const CurrentTableArray  = DataOP(1, true, "TableData");
    const AmountOfCurrentTables = CurrentTableArray.length;
    const NewArray = [];
    for(let CurrentTableIndex = 0; CurrentTableIndex <AmountOfCurrentTables; CurrentTableIndex++){
        const CurrentTable = CurrentTableArray[CurrentTableIndex];
        const CurrentTableName = CurrentTable[0][2];

        
        //Generate new table array because we have to write entire array at once

        if (Data1 == CurrentTableName){
            //Edit table name
            const CurrentRootTable = CurrentTableArray[CurrentTableIndex][0][2];
            NewArray[CurrentTableIndex] = CurrentTableArray[CurrentTableIndex];
            NewArray[CurrentTableIndex][0][2] = Data2;            

        }
        else{
            NewArray[CurrentTableIndex] = CurrentTableArray[CurrentTableIndex];
            //Write other tables to array if it doenst match
        }
        
        
    }
    if (AreArraysEqual(DataOP(1, true, "TableData"),NewArray)){
        //Send error if it coudnt find array
        UpdateUI(0, 1, "Table rename failed. Coudn't find table named: '" + Data1 + "'", false);
        
    }
    else{
        //Apply changes if there is any change
        DataOP(0, true, "TableData",NewArray);  
        UpdateUI(0, 1, "Table Name change succeeded", true);
        setTimeout(location.reload(), 2000);
    }
     

}

function DeleteTable(Data1){
    const CurrentTableArray  = DataOP(1, true, "TableData");
    const NewTableArray = DataOP(1, true, "TableData");
    const AmountOfCurrentTables = CurrentTableArray.length;
    const NewArray = [];
    for(let CurrentTableIndex = 0; CurrentTableIndex <AmountOfCurrentTables; CurrentTableIndex++){
        const CurrentTable = CurrentTableArray[CurrentTableIndex];
        const CurrentTableName = CurrentTable[0][2];
        if (CurrentTableName == Data1){
            //Delete array key for table selected
            NewTableArray.splice(CurrentTableIndex, 1);
            
        }
    }
    if(AreArraysEqual(CurrentTableArray, NewTableArray)){
        UpdateUI(0, 1, "Table name to be deleted could not be found", false);
    }
    else{
        //Apply changes if there is any change
        DataOP(0, true, "TableData",NewTableArray);  
        UpdateUI(0, 1, "Table Name change succeeded", true);
        setTimeout(location.reload(), 5000);

    }

}

function DataOP(operation,isArray,StorageName, Data){
    /*
    Operation = 0 | Put data in storagename 
    Operation = 1 | Get data from storagename
    Operation = 2 | Remove all data from storagename
    Operation = 3 | Delete everything
    */

    if(operation == 0){
        //put data in storageName
        if(isArray){
            localStorage.setItem(StorageName, JSON.stringify(Data));
        }
        else{
            localStorage.setItem(StorageName, Data);
            
        }
    }
    else if(operation == 1){
        //get data from StorageName
        if(isArray){
            //return JSON.parse(localStorage.getItem(StorageName));  
            
            //Error handling
            if (localStorage.getItem(StorageName) == null || localStorage.getItem(StorageName) == "undefined"){
                return null;
            }
            else{
                return JSON.parse(localStorage.getItem(StorageName));
            }
        }
        else{
            //Error handling
            if(localStorage.getItem(StorageName) == null || localStorage.getItem(StorageName) == "undefined"){
                return null; 
            }
            else{
                return localStorage.getItem(StorageName);
            }
        }
    
    }
    else if(operation == 2){
        //remove all data fom StorageName
        localStorage.RemoveItem(StorageName); 
        console.info("'" + StorageName + "' Storage cleared!");
    }
    else if(operation = 3){
        //Remove everything
        localStorage.clear();
        console.info("ALL LocalStorage cleared!");
    }
}

function clearTableData(){
    DataOP(3);
    UpdateUI(0, 1, "All tables deleted. Refreshing in 2s", true);
    setTimeout(location.reload(), 2500);
}


function UpdateUI(Op, tooltipORStat, text, succeded){
    //Op 0 = Add new tooltip or status
    //Op 1 = Remove status or tooltip
    //tooltipORStat 0 = Use tooltip
    //tooltipORStat 1 = Use stat
    //text string for tooltip or status
    //succeded true = if tooltip, changes css to green
    //succeded false = if tooltip, changes css to red

    const tooltipObject = document.getElementById("tooltip");
    const OperationStat = document.getElementById("OP_stat");
    const DefaultText = ["<b>Tooltip:</b> ", "<b>Operation status: </b>"];

    if(Op == 0){
        //Create tooltip or status

        if(tooltipORStat == 0){
            //Create new tooltip
            tooltipObject.innerHTML = DefaultText[0] + "<br><i>" + text + "</i>";

        }
        else if(tooltipORStat == 1){
            //Create status
            if(succeded){
                OperationStat.style.backgroundColor = "green";
                OperationStat.innerHTML = DefaultText[1] + "<br><i>" + text + "</i>";
            }
            else{
                OperationStat.innerHTML = DefaultText[1] + "<br><i>" + text + "</i>";
                OperationStat.style.backgroundColor = "#cc0000";
            }

        }
    }
    else if(Op == 1){
        //Delete tooltip or status      

        if(tooltipORStat == 0){
            //Delete tooltip
            tooltipObject.innerHTML = DefaultText[0];
        }
        else if(tooltipORStat == 1){
            //Delete status
            OperationStat.innerHTML = DefaultText[1];
            OperationStat.style.backgroundColor = "#333333";
        }
    }    
}  


function AreArraysEqual(arr1, arr2) {
    //Checks if arr 1 and arr2 are equal
    if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
        return true;
    } 
    else {
        return false;
    }
}



