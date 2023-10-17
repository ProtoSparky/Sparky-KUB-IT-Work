var tbl_data = [[
    //Table 0
        [" ",           "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"], //Row 0
        ["08:00 - 10:00", "Mon R1", "Tue R1", "Wed R1" , "Thur R1", "Frid R1"], //Row 1
        ["10:00 - 12:00", "Mon R2", "Tue R2", "Wed R2" , "Thur R2", "Frid R2"], //Row 2     
        ["Lunsj        ", "      ", "      ", "      " , "       ", "       "], //Row 3
        ["13:30 - 14-30", "Mon R4", "Tue R4", "Wed R4" , "Thur R4", "Frid R4"], //Row 4
        ["14:30 - 16:00", "Mon R5", "Tue R5", "Wed R5" , "Thur R5", "Frid R5"]  //Row 5

    ], 
    
    //Table 1
    [
        [" ",           "Monday", "Tuesday", "Wednsday", "Thursday", "Friday"], //Row 0
        ["08:00 - 10:00", "Mon R10", "Tue R10", "Wed R10" , "Thur R10", "Frid R1"], //Row 1
        ["10:00 - 12:00", "Mon R20", "Tue R20", "Wed R20" , "Thur R20", "Frid R2"], //Row 2     
        ["Lunsj        ", "      ", "      ", "      " , "       ", "       "], //Row 3
        ["13:30 - 14-30", "Mon R40", "Tue R40", "Wed R40" , "Thur R40", "Frid R4"], //Row 4
        ["14:30 - 16:00", "Mon R50", "Tue R50", "Wed R50" , "Thur R50", "Frid R50"]  //Row 5

    ]    


];
var FormCurrentSelectedClass = null; 
var ClassEditorApply = false; 

var CreateClass_Toggle = false; 
var EditClass_Toggle = false;
var DeleteClass_Toggle = false; 

function formINIT(){


}

function SelectClass(SelectedClass){
    if(SelectedClass == "1A"){
        //run for class a1
        spawn_table2(tbl_data[0], 1, SelectedClass, false);

        FormCurrentSelectedClass = 0;
    }
    else if(SelectedClass == "1B"){
        //run for b1
        spawn_table2(tbl_data[1], 0, SelectedClass, false);

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

function ReadAndApply(Op, Data1, Data2){
    //0 Op to create
    //1 Op to edit
    //2 Op to delete
    console.log("Operation " + Op + " Input " + Data1);
    
    console.log(Data1);
}
