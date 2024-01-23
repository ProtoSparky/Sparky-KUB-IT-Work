function RandomRangedIntiger(min, max, not) {
  //random number generator that can also skip some numbers in not array
  if(not == undefined){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  else{
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } 
    while (not.includes(num));
    return num;
  }
}

//px to angle
function calculateAngle(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let angle = Math.atan2(dy, dx);
  angle = angle * (180 / Math.PI);
  if ((dx >= 0 && dy < 0) || (dx < 0 && dy >= 0)) {
     angle += 360;
  }
  return angle;
 }


 
//px and angle to next coordinate

function calculateCoordinates(x1, y1, angle, distance) {
  let radian = angle * (Math.PI / 180); // Convert angle to radians
  let dx = distance * Math.cos(radian);
  let dy = distance * Math.sin(radian);
  let x2 = Math.round(x1 + dx);
  let y2 = Math.round(y1 + dy);
  return [x2, y2];
}


//look up class index from element id
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

//remove all capitalization
function removeCapitalization(inputString) {
  return inputString.toLowerCase();
}

/*
//Searches trough array, if input is found, returns new array
function search(input, Array) {
  const normalizedInput = input.replace(/\s/g, "").toLowerCase();
  //Blacklist of array keys
  const ignoredKeys = [1,2,3,4,5];
  //Blacklist of array keys

  const matchingRows = [];

  for (const row of Array) {
    let found = false;

    for (let i = 0; i < row.length; i++) {
      if (ignoredKeys.includes(i)) continue;
      const cell = row[i];
      const normalizedCell = cell.replace(/\s/g, "").toLowerCase();

      if (normalizedCell.includes(normalizedInput)) {
        found = true;
        break;
      }
    }  
    if (found) {
      matchingRows.push(row.slice()); // Copy the matching row to the new array
    }
  }

  return matchingRows;
}*/
function search(input, Array, includeBool) {
  const normalizedInput = input.replace(/\s/g, "").toLowerCase();
  const ignoredKeys = [1,2,3,4,5];
  const matchingRows = [];
 
  for (const row of Array) {
    let found = false;
 
    for (let i = 0; i < row.length; i++) {
      if (ignoredKeys.includes(i)) continue;
      const cell = row[i];
      const normalizedCell = cell.replace(/\s/g, "").toLowerCase();
 
      // Check if the cell is a boolean and includeBool is true
      if (includeBool && typeof cell === 'boolean') {
        if (cell === true || cell === false) {
          found = true;
          break;
        }
      }
 
      if (normalizedCell.includes(normalizedInput)) {
        found = true;
        break;
      }
    } 
    if (found) {
      matchingRows.push(row.slice()); // Copy the matching row to the new array
    }
  }
 
  return matchingRows;
 }

//Read json files, and return their data
function ReadJSON(file, IsAsync) {
  if(IsAsync){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", file, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
  }
  else{
      var xhr = new XMLHttpRequest();
      xhr.open("GET", file, false);
      xhr.send();
      return JSON.parse(xhr.responseText);
  }

  }
  function ReadAnything(file){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, false);
  xhr.send();
  return xhr.responseText;
  }

  function ParseCSV(csvString) {
  const lines = csvString.split('\n');
  const data = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (line === '') {
      continue;
    }
    const values = line.split(';');
    const trimmedValues = values.map((value) => value.trim());
    data.push(trimmedValues);
  }

  return data;
}

function RandCol() {
  return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function AccessCSSVar(VarName){
  return getComputedStyle(document.documentElement).getPropertyValue(VarName); 
}

function GenerateMessageBanner(FeedBackState, FeedBackText){
  //Feedbackstate 0 == Green, good
  //FeedBackState 1 == yellow, warning
  //FeedbackState 2 == Red, Error
  const ColorOK = "#00d573";
  const ColorWarn = "#f39c12";
  const ColorErr = "#ff2225"; 
  const ColorFall  ="#89a6a1"; 
  const BannerTime  = 4; // s
  let CurrentBannerTime = 0; 
  

  const MessageBanner = document.createElement("div");
  MessageBanner.style.position = "absolute";
  MessageBanner.style.zIndex = "99999999";
  MessageBanner.style.top = "30px";
  MessageBanner.style.height = "30px";
  MessageBanner.style.borderRadius = "var(--CornerRad)";
  MessageBanner.style.right = "-400px";
  if(FeedBackText.length < 25){
      MessageBanner.style.width = "200px";
  }
  else{
      MessageBanner.style.width = FeedBackText.length * 10 + "px"; 
  }
  MessageBanner.id = "MessageBanner";
  const MessageBannerText = document.createElement("div");
  MessageBannerText.style.position = "absolute";
  MessageBannerText.style.top = "50%";
  MessageBannerText.style.transform = "translate(0,-50%)";
  MessageBannerText.style.width = "100%";
  MessageBannerText.style.color = "white";
  MessageBannerText.style.fontFamily = "main_font";
  MessageBannerText.style.fontWeight  ="400";
  MessageBannerText.style.padding = "var(--ElementPadding)";


  if(FeedBackState == 0){
      //good message
      MessageBanner.style.backgroundColor = ColorOK;

  }
  else if(FeedBackState == 1){
      //Warning message
      MessageBanner.style.backgroundColor = ColorWarn;
  }
  else if(FeedBackState == 2){
      //Error message
      MessageBanner.style.backgroundColor = ColorErr; 
  }
  else{
      //fallback if
      MessageBanner.style.backgroundColor = ColorFall;
  }
  MessageBannerText.innerHTML = FeedBackText; 
  MessageBanner.appendChild(MessageBannerText);
  document.body.appendChild(MessageBanner);


  MessageBanner.style.animationName = "BarMove";
  MessageBanner.style.animationDuration = "5s";
  MessageBanner.style.animationTimingFunction = "ease-in-out"


  const intervalId = setInterval(AnimateBanner, 1000);
  document.body.style.overflow = "hidden";
  function AnimateBanner(){
      CurrentBannerTime += 1;
      if(CurrentBannerTime > BannerTime){
          document.getElementById("MessageBanner").remove();
          document.body.style.overflow = "visible";
          clearInterval(intervalId);
      }

  }

};
