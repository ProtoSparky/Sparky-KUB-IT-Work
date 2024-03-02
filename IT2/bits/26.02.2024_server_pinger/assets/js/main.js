const clientSettings = {
    "drop_shadow":{
        "open":false
    },
    "settings":{
        "open":false,
    },
    "add_server":{
        "open":false,
    },
    "pingerSettings":{
        "open":false
    },
    "update_speed":1, //minutes
    "ping_history":10,
    "pinger":{
        "pingers_open":false, //if a specific pinger has its settings open
        "open_pinger_name":null, //name of the open pinger
        "load_all_data":true, //load all or some data for pingers
        "specific_data":null, //if load some data, here's the name for said pinger
        "pingers_created":false, //becomes true once pinger elements are created after first cycle
        "pingers_onscreen":[], //this will be a list of pingers that are currently onscreen
        "style":{
            "spacing":{
                "multiplier":120,
                "adder":16
            },
            "pinger_ping":{
                "left":300,
            },
            "pinger_name":{
                "truncate_length":33,
            }
        }, 
        "pinger_ids":{
            "PingerPing":"ping", //pinger ping in ms text
            "PingerName":"name", //pinger nickname
            "PingerGraph":"graph", //pinger graph
            "pingerNameContainer":"ping_cont", //pinger nickname container
            "TopbarContainer":"server_topbar",
            "HoverMenuCont":"hover",

        }
    
    },
    "API":{
        "link":window.location + "api/index.php"
    },
    "assorted_ids":{
        "pinger_backdrop":"server_area",
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
    server_area.style.height = "610px";
    server_area.style.left  ="50%";
    server_area.id = clientSettings.assorted_ids.pinger_backdrop;  
    server_area.style.transform = "translate(-50%,-50%)";
    server_area.style.borderRadius = AccessCSSVar("--CornerRad")
    server_area.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    document.getElementById("content-fullscreen").appendChild(server_area);

    //add topbar
    const topbar = document.createElement("div");
    topbar.style.position = "absolute";
    topbar.style.left = "0px";
    topbar.style.top = "0px";
    topbar.style.width = "100%";
    topbar.style.height = "50px";
    topbar.id = clientSettings.pinger.pinger_ids.TopbarContainer;
    document.getElementById("content-fullscreen").appendChild(topbar);

    //add button container
    const add_server_btn = document.createElement("div");
    add_server_btn.style.position = "absolute";
    add_server_btn.style.top = "50%";   
    add_server_btn.style.left = AccessCSSVar("--ElementPadding");
    add_server_btn.style.transform = "translate(0,-50%)";
    add_server_btn.style.width = "150px";
    add_server_btn.style.height = "40px";
    add_server_btn.style.borderRadius = AccessCSSVar("--CornerRad");
    add_server_btn.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    add_server_btn.style.userSelect  ="none";
    add_server_btn.style.cursor = "pointer";
    add_server_btn.addEventListener("click",function(){
        console.warn("add server");
        //tester
    });    

    topbar.appendChild(add_server_btn);

    //add button text
    const add_server_btn_text = document.createElement("div");
    add_server_btn_text.style.position = "absolute";
    add_server_btn_text.style.top = "50%";
    add_server_btn_text.style.transform = "translate(0,-50%)";
    add_server_btn_text.className  ="text";
    add_server_btn_text.style.fontSize = "17";
    add_server_btn_text.style.right = "4px";
    add_server_btn_text.innerHTML = "Add Server";
    add_server_btn_text.style.color = AccessCSSVar("--col_bold_TXT");
    add_server_btn_text.style.fontWeight = "bold";
    add_server_btn.appendChild(add_server_btn_text);

    //add button icon
    const add_server_btn_icon = document.createElement("img");
    add_server_btn_icon.src = "./assets/img/plus-circle.svg";
    add_server_btn_icon.style.position = "absolute";
    add_server_btn_icon.style.top = "50%";
    add_server_btn_icon.style.left = "4px";
    add_server_btn_icon.style.transform = "translate(0,-50%)";
    add_server_btn_icon.style.height = "90%"; 
    add_server_btn_icon.style.filter = "invert(88%) sepia(0%) saturate(383%) hue-rotate(249deg) brightness(91%) contrast(88%)";
    add_server_btn.appendChild(add_server_btn_icon);


    //client settings button container
    const add_settings_btn = document.createElement("div");
    add_settings_btn.style.position = "absolute";
    add_settings_btn.style.top = "50%";   
    add_settings_btn.style.right = AccessCSSVar("--ElementPadding");
    add_settings_btn.style.transform = "translate(0,-50%)";
    add_settings_btn.style.width = "150px";
    add_settings_btn.style.height = "40px";
    add_settings_btn.style.borderRadius = AccessCSSVar("--CornerRad");
    add_settings_btn.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    add_settings_btn.style.userSelect  ="none";
    add_settings_btn.style.cursor = "pointer";
    add_settings_btn.addEventListener("click",function(){
        ManageSettings();
    }); 
    topbar.appendChild(add_settings_btn);

    //settings button text
    const add_settings_btn_text = document.createElement("div");
    add_settings_btn_text.style.position = "absolute";
    add_settings_btn_text.style.top = "50%";
    add_settings_btn_text.style.transform = "translate(0,-50%)";
    add_settings_btn_text.className  ="text";
    add_settings_btn_text.style.fontSize = "17";
    add_settings_btn_text.style.left = "4px";
    add_settings_btn_text.innerHTML = "Settings";
    add_settings_btn_text.style.color = AccessCSSVar("--col_bold_TXT");
    add_settings_btn_text.style.fontWeight = "bold";
    add_settings_btn.appendChild(add_settings_btn_text);
    
    //settings button icon
    const add_settings_btn_icon = document.createElement("img");
    add_settings_btn_icon.src = "./assets/img/cog.svg";
    add_settings_btn_icon.style.position = "absolute";
    add_settings_btn_icon.style.top = "50%";
    add_settings_btn_icon.style.right = "4px";
    add_settings_btn_icon.style.transform = "translate(0,-50%)";
    add_settings_btn_icon.style.height = "90%"; 
    add_settings_btn_icon.style.filter = "invert(88%) sepia(0%) saturate(383%) hue-rotate(249deg) brightness(91%) contrast(88%)";
    add_settings_btn.appendChild(add_settings_btn_icon);    


    //set background as background color
    document.body.style.backgroundColor = AccessCSSVar("--col_bg_content");

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
    .then(response => response.json())
    .then(data => Check4Db(data));
}
function Check4Db(data){
    if(data.is_data_present == 1){
        //read timing for selfupdating
        console.info("database present");
        const data_timing  = {
            "get":[
              "get_timing"
            ]
        };
    
        fetch(clientSettings.API.link, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_timing)
        })
        .then(response => response.json())
        .then(data => DataPreloader(data));

        //read ping history for settings

        const ping_history_query = {
            "get":[
              "get_ping_history"
            ]
        };
        
        fetch(clientSettings.API.link, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ping_history_query)
        })
        .then(response => response.json())
        .then(data => clientSettings.ping_history = data);


        LoadPreparedData(); //get data for pingers, and send that to pinger updater       
    }
    else if(data.is_data_present == 0 ){
        //create first setup form
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

        //add "server name" input box
        const servername_input = document.createElement("input");
        servername_input.id = "servername_input";
        servername_input.style.position = "absolute";
        servername_input.style.top = "200px";
        servername_input.style.transform = "translate(-50%,0)";
        servername_input.style.left = "50%";
        servername_input.style.width = "250px";
        servername_input.placeholder = "Server name";
        textbox.appendChild(servername_input);

        //add server hostname
        const serverhostname_input = document.createElement("input"); 
        serverhostname_input.id = "serverhostname_input";
        serverhostname_input.style.position = "absolute";
        serverhostname_input.style.top = "250px";
        serverhostname_input.style.transform = "translate(-50%,0)";
        serverhostname_input.style.left = "50%";
        serverhostname_input.style.width = "250px";
        serverhostname_input.placeholder = "Server hostname";
        textbox.appendChild(serverhostname_input);

        //add submit button
        
        const server_submit = document.createElement("button"); 
        server_submit.id = "server_submit";
        server_submit.innerHTML  ="Save Server";
        server_submit.style.position = "absolute";
        server_submit.style.top = "300px";
        server_submit.style.transform = "translate(-50%,0)";
        server_submit.style.left = "50%";
        server_submit.style.width = "250px";
        server_submit.addEventListener("click",function(){
            add_server(1); 
        });
        textbox.appendChild(server_submit);
    }
    else if(data.RETURN == "ERROR"){
        GenerateMessageBanner(2, "Could not make the DB");
        //add refresh
    }
}
function add_server(operation){
    //this function adds a server to the database
    if(operation == 1){
        //create first server
        const servername = document.getElementById("servername_input").value;
        const serverhostname = document.getElementById("serverhostname_input").value; 
        if(servername != undefined && serverhostname != undefined){
            //send request
            const add_server = {
                "post":{
                    "add_server":{
                        "servername":servername,
                        "domain":serverhostname,
                        "enabled":true,
                        "alive":false,
                        "ping":{}
                    }
                }
            };
        
            fetch(clientSettings.API.link, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(add_server)
            })
            //.then(response=> console.log(response)); 
            .then(response => response.json())
            .then(data => return_after_setup(data));
    
        }
        else{
            GenerateMessageBanner(1, "Input cannot be empty!");
        }
    }
    else if(operation == 0){
        //add any other server
    }
}
function return_after_setup(data){
    if(data.RETURN == "OK"){
        GenerateMessageBanner(0, "Server added!");
        DropShadow();
        //force reload of pingers
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
        .then(response => response.json())
        .then(data => Check4Db(data));

    }
    else{
        GenerateMessageBanner(2, "ERROR!");
    }
}

function DataPreloader(data){
    const regex = /[0-9]+/i;
    if(regex.test(data)){
        //save data
        clientSettings.update_speed = data;
    }
    //shoudld run LoadPreparedData and updata all things
    setInterval(LoadPreparedData,clientSettings.update_speed * 60000);
}

function LoadPreparedData(){
    //this function prepares data for the pingers
    const data_request_query = {
        "get":[
            "get_all_server_data"
        ]
    };
        
    fetch(clientSettings.API.link, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_request_query)
    })
    .then(response => response.json())
    .then(data => DisplayPingerData(data));
}


