var StorageDir = "./storage/";
var CurrentDB = StorageDir + "db.json";


function init(){
    console.log("init run"); 
    //console.log(ReadJSON(CurrentDB, false))
    const json = { "name": "John", "age": 30, "city": "New York" };
    WriteJSON("./storage/stortest.json", json);
}

  
