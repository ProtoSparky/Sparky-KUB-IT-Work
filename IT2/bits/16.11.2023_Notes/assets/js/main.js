var StorageDir = "./storage/";
var CurrentDB = StorageDir + "db.json";


function init(){
    console.log("init run"); 
    //console.log(ReadJSON(CurrentDB, false))
    const json = { "name": "John", "age": 30, "city": "New York" };
    WriteJSON("./storage/stortest.json", json);
}

  

function WriteJSON(file, json) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", file, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(json));
}

