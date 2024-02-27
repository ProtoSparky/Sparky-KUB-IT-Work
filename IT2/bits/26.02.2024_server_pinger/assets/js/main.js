const clientSettings = {
    "drop_shadow":{
        "open":false
    },
    "API":{
        "link":window.location + "api/index.php"
    }
}
function init(){
    SpawnMenus();

}
function SpawnMenus(){

    const server_area = document.createElement("div");
    server_area.style.position = "absolute";
    server_area.style.top = "50%";
    server_area.style.width = "1000px";
    server_area.style.height = "600px";
    server_area.style.left  ="50%";
    server_area.style.transform = "translate(-50%,-50%)";
    server_area.style.borderRadius = AccessCSSVar("--CornerRad")
    server_area.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    document.getElementById("content-fullscreen").appendChild(server_area);

    //check for database, else load in pingers
    const check_for_db = {
        "get":[
          "is_data_present"
        ]
    };

    fetch(clientSettings.API.link, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(check_for_db)
    })
    //.then(response=> console.log(response)); 
    .then(response => response.json())
    .then(data => Check4Db(data));
}
function Check4Db(data){
    if(data.is_data_present == 1){
        //proceed to showing pingers
        console.info("database present");
    }
    else if(data.is_data_present == 0 ){
        //display
        console.info("database gone");
        DropShadow();
        const dropshadow = document.getElementById("dropshadow");
        const textbox = document.createElement("div");
        textbox.id = "textbox"; 
        textbox.style.position = "absolute";
        textbox.style.top = "50%";
        textbox.style.width = "1000px";
        textbox.style.height = "600px";
        textbox.style.left  ="50%";
        textbox.style.transform = "translate(-50%,-50%)";
        dropshadow.appendChild(textbox);

        //textbox text
        const header = document.createElement("div");
        header.className = "text";
        header.style.color = AccessCSSVar("--col_highlight_TXT");
        header.style.position = "absolute";
        header.style.left = "50%";
        header.style.top = "5%";
        header.style.transform = "translate(-50%, 0)";
        header.style.fontSize = "25";
        header.style.fontWeight = "800";
        header.innerHTML = "Let's set up the DB for ServerPinger";
        textbox.appendChild(header);

        //setup button
        const setup_db_btn = document.createElement("button");
        setup_db_btn.style.position = "absolute";
        setup_db_btn.innerHTML = "Setup Data storage"; 
        setup_db_btn.style.transform = "translate(-50%, 0)";
        setup_db_btn.style.left = "50%";
        setup_db_btn.style.top = "50%";
        setup_db_btn.style.fontSize = "20";        
        setup_db_btn.addEventListener("click",function(){
            setupfirstserver();
        });
        textbox.appendChild(setup_db_btn);

    }
}
function setupfirstserver(){
    //write database data
    const check_for_db = {
        "post":[
          "create_data_storage"
        ]
      };

    fetch(clientSettings.API.link, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(check_for_db)
    })
    //.then(response=> console.log(response)); 
    .then(response => response.json())
    .then(data => spawn_setup2ndphase(data));
}
function spawn_setup2ndphase(data){
    if(data.RETURN == "OK"){
        GenerateMessageBanner(0, "DB created successfully!");

        //clear display for creation of first server
        const textbox = document.getElementById("textbox");
        textbox.innerHTML = "";

        //spawn create new server menu
        //textbox header
        const header = document.createElement("div");
        header.className = "text";
        header.style.color = AccessCSSVar("--col_highlight_TXT");
        header.style.position = "absolute";
        header.style.left = "50%";
        header.style.top = "5%";
        header.style.transform = "translate(-50%, 0)";
        header.style.fontSize = "25";
        header.style.fontWeight = "800";
        header.innerHTML = "Let's add our first server";
        textbox.appendChild(header);

        
    }
    else if(data.RETURN == "ERROR"){
        GenerateMessageBanner(2, "Could not make the DB");
        //add refresh
    }
}


function DropShadow(){
    console.log("making dropshadow");
    if(clientSettings.drop_shadow.open == false){
        //create dropshadow
        const dropshadow = document.createElement("div");
        dropshadow.style.top = "0px";
        dropshadow.style.left = "0px";
        dropshadow.style.width = "100%";
        dropshadow.style.height = "100%";
        dropshadow.style.position = "absolute";
        dropshadow.style.backgroundColor = AccessCSSVar("--col_bg_content");
        dropshadow.style.opacity = "1";
        dropshadow.id = "dropshadow";
        dropshadow.style.zIndex = "9";
        document.getElementById("content-fullscreen").appendChild(dropshadow);
        clientSettings.drop_shadow.open  = true;
    }
    else if(clientSettings.drop_shadow.open  == true){
        //remove dropshadow
        clientSettings.drop_shadow.open  = false; 
    }
}
function checkErrors(data){
    console.log(data);
}