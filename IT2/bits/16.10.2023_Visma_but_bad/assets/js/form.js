var FormCurrentSelectedClass = null; 
var ClassEditorApply = false; 

var CreateClass_Toggle = false; 
var EditClass_Toggle = false;
var DeleteClass_Toggle = false; 


function formINIT(){
    SpawnEditTable();    
    DataOP(0,true,"ButtonTable",ButtonTable);

}

function SelectClass(SelectedClass){
    const currentTables = document.getElementsByClassName("table");
    const currentTableAmount = currentTables.length; 
    if(SelectedClass == "1A"){
        //Check if other tables are in <tablearea>
        if(currentTableAmount == 0){
            SpawnTable((DataOP(1,true, "ButtonTable", )[0]),["TableArea","table01","table",]);
        }
        else{
            currentTables[0].remove();
            SpawnTable(ButtonTable[0],["TableArea","table01","table",]);
        }      
        //Check if other tables are in <tablearea>

        FormCurrentSelectedClass = 0;
    }
    else if(SelectedClass == "1B"){
        //Check if other tables are in <tablearea>
        if(currentTableAmount == 0){
            SpawnTable(Table[1],["TableArea","table02","table",]);
        }
        else{
            currentTables[0].remove();
            SpawnTable(Table[1],["TableArea","table02","table",]);
        } 
        //Check if other tables are in <tablearea>

        FormCurrentSelectedClass = 1;
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

        ClassEditorCreate_apply.innerHTML = "Apply created element";
        ClassEditorCreate.appendChild(ClassEditorCreate_apply);
        //Apply Button
        CreateClass_Toggle= true;
    }
    else{
        //remove input
        const ClassEditorCreate_input = document.getElementById("ClassEditorCreate_input");
        const ClassEditorCreate_apply = document.getElementById("ClassEditorCreate_apply");
        ClassEditorCreate_input.remove();
        ClassEditorCreate_apply.remove();
        //set toggle back to false
        CreateClass_Toggle = false;
        
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
        ClassEditorEdit_apply.innerHTML = "Edit selected element"

        ClassEditorEdit_apply.addEventListener("click", function(){
            //apply onclick() element
            ReadAndApply(1,ClassEditorEdit_OldName.value,ClassEditorEdit_NewName.value);
        }) 
        ClassEditorEdit.appendChild(ClassEditorEdit_apply);
        //Apply button
        EditClass_Toggle= true;
    }
    else{
        const ClassEditorEdit_OldName = document.getElementById("ClassEditorEdit_OldName");
        const ClassEditorEdit_NewName = document.getElementById("ClassEditorEdit_NewName");
        const ClassEditorEdit_apply = document.getElementById("ClassEditorEdit_apply");
        ClassEditorEdit_OldName.remove();
        ClassEditorEdit_NewName.remove();
        ClassEditorEdit_apply.remove();
        EditClass_Toggle= false;
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
        ClassEditorDelete_apply.innerHTML = "Delete class";
        ClassEditorDelete.appendChild(ClassEditorDelete_apply);
        //Apply button

        DeleteClass_Toggle = true;        
    }
    else{
        const ClassEditorDelete_ClassName = document.getElementById("ClassEditorDelete_ClassName");
        const ClassEditorDelete_apply = document.getElementById("ClassEditorDelete_apply");
        ClassEditorDelete_ClassName.remove();
        ClassEditorDelete_apply.remove();
        DeleteClass_Toggle = false;
    }
}

function ReadAndApply(op, Data1, Data2){
    //0 Op to create
    //1 Op to edit
    //2 Op to delete
    console.log("Operation " + op + " Input " + Data1);
    
    console.log(Data1);

    if(op == 0){
        //Create class
    }
    else if(op == 1){
        //Edit class name
    }
    else if(op == 2){
        //delete class name
    }
}


function SpawnEditTable(coordinate){
    if(coordinate !== undefined && coordinate !== null){
        console.log(coordinate);
        console.log(Table2Array("table01"));
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
            return JSON.parse(localStorage.getItem(StorageName));            
        }
        else{
            return localStorage.getItem(StorageName);
        }
    
    }
    else if(operation == 2){
        //remove all data fom StorageName
        localStorage.RemoveItem(StorageName); 
    }
    else if(operation = 3){
        //Remove everything
        localStorage.clear();
    }
}