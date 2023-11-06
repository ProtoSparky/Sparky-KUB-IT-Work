var StorageDir = "./storage/";
var CurrentDB = StorageDir + "db.json";


function init(){
    console.log("init run"); 


}



function ReadJson(FileLoc) { 
    let test= "0";
    fetch(FileLoc) 
    .then((res) => { 
        return res.json(); 
      }) 
      .then((data) => test = data); 
      return test
  } 


async function populate(FileLoc) {
    const request = new Request(FileLoc);
    const response = await fetch(request);
    const superHeroes = await response.json();

    return superHeroes; 
}