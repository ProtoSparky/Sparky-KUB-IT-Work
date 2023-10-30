//Random number generator
function RandomRangedIntiger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Kook up class index from element id
function ClassIndexLookup(id, class_name){
    const elements = document.getElementsByClassName(class_name);
    for(let arr_index = 0; arr_index <elements.length; arr_index ++){
        if(elements[arr_index].id === id){
            return arr_index; //return array index if id matches
        }
    }  
    console.error("ERROR: ClassIndexLookup() could not find arr key for class: '" + class_name + "' id: '" + id + "'");
    return -1; //return -1 if id not found  
}

function ClassIndexToId(class_name, index, DisableErrors) {
    const elements = document.getElementsByClassName(class_name);
    if (index >= 0 && index < elements.length) {
      return elements[index].id;
    } 
    else {
        if(!DisableErrors){
            console.error("ERROR: ClassIndexToId() could not find ID for class: '" + class_name + "' and index: '" + index + "'");
        }
      return null; // return null on faliure
    }
}


//This function checks if any of the two arrays have similar numbers
function ArraysCommon(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return true; // Found a common element
      }
    }
    return false; // No common elements found
}

//Returns the index length of a given class
function ClassIndexLength(class_id){
    object = document.getElementsByClassName(class_id);
    return object.length; 
}

// counts how many times funtion has been run, returns true after given amount
function Counter(ReturnAfterRuns) {
    let count = 0;  
    return function () {
        count++;

        if (count >= ReturnAfterRuns) {
        count = 0; 
        return true;
        }

        return false;
    };
}

// finds a string between 2 other strings. Aka where's waldo
//Str_full is the full string
//str1 is string on left side of string wanted
//str2 is string on right side of string wanted
//returns string in middle
function GetStringBetween(str_full, str1, str2) {
    const startIndex = str_full.indexOf(str1);
    if (startIndex === -1) {
      return '';
    }  
    const endIndex = str_full.indexOf(str2, startIndex + str1.length);
    if (endIndex === -1) {
      return '';
    }  
    return str_full.substring(startIndex + str1.length, endIndex);
}

//Converts html tables to arrays
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



//Save data to LocalStorage
function LocalStorageOP(op, Data1, Data2){
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
          console.error("Input invalid. Name cannot be empty");
      }
      
      

  }
  else if(op == 1){
      //Edit class name
      if(Data1 != "" && Data2 != ""){
          EditTableName(Data1 , Data2); 
      }
      else{
        console.error("Input invalid. New and or old name cannot be empty");
         
      }
     
  }
  else if(op == 2){
      //delete class name
      DeleteTable(Data1);
  }
}
  
