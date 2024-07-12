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
    "add_server":{
        "open":false,
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
            "PingerState":"state",

        }
    
    },
    "API":{
        "link":window.location + "api/index.php"
    },
    "assorted_ids":{
        "pinger_backdrop":"server_area",
        "last_run":"refresh_last_run", 
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
        AddServer();
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


    //add last pinged bar
    const LastRun_container = document.createElement("div");
    LastRun_container.style.position = "absolute";
    LastRun_container.style.top = "50%";
    LastRun_container.style.transform = "translate(-50%,-50%)";
    LastRun_container.style.left = "50%";
    LastRun_container.style.height = "100%";
    LastRun_container.style.borderRadius = AccessCSSVar("--CornerRad");
    LastRun_container.style.width = "200px";
    LastRun_container.style.cursor = "pointer";
    LastRun_container.addEventListener("click",function(){
        LoadPreparedData(); 
    });
    LastRun_container.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    LastRun_container.style.userSelect = "none";

    topbar.appendChild(LastRun_container);
    const LastRun_Text = document.createElement("div");
    LastRun_Text.className = "text";
    LastRun_Text.innerHTML = "";
    LastRun_Text.style.position = "absolute";
    LastRun_Text.style.transform = "translate(-50%,-50%)";
    LastRun_Text.style.top = "50%"; 
    LastRun_Text.style.left = "50%";
    LastRun_Text.style.fontSize = "15";
    LastRun_Text.style.color = AccessCSSVar("--col_bg_div1");
    LastRun_Text.id = clientSettings.assorted_ids.last_run;
    LastRun_container.appendChild(LastRun_Text);
 



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
function AddServer(){
    if(clientSettings.add_server.open == false){
        //create dropshadow
        const dropshadow_container = document.createElement("div");
        dropshadow_container.style.top = "0px";
        dropshadow_container.style.left = "0px";
        dropshadow_container.style.width = "100%";
        dropshadow_container.style.height = "100%";
        dropshadow_container.style.position = "absolute";
        dropshadow_container.id = "add_server_dropshadow_container";
        dropshadow_container.style.zIndex = "9";
        document.getElementById("content-fullscreen").appendChild(dropshadow_container);
        document.body.style.overflow = "hidden";

        //ui
        const dropshadow_ui_container = document.createElement("div");
        dropshadow_ui_container.style.position = "absolute";
        dropshadow_ui_container.style.top = "50%";
        dropshadow_ui_container.style.width = "500px";
        dropshadow_ui_container.style.height = "400px";
        dropshadow_ui_container.style.zIndex = "999";
        dropshadow_ui_container.style.left  ="50%";
        dropshadow_ui_container.id = clientSettings.assorted_ids.pinger_backdrop;  
        dropshadow_ui_container.style.transform = "translate(-50%,-50%)";
        dropshadow_ui_container.style.borderRadius = AccessCSSVar("--CornerRad")
        dropshadow_ui_container.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
        dropshadow_container.appendChild(dropshadow_ui_container);

        //heading
        const SettingsHeader = document.createElement("div");
        SettingsHeader.style.position = "absolute";
        SettingsHeader.style.top = AccessCSSVar("--ElementPadding");
        SettingsHeader.style.left = "50%";
        SettingsHeader.style.transform = "translate(-50%, 0)";
        SettingsHeader.innerHTML = "Add server";
        SettingsHeader.className = "text";
        SettingsHeader.style.color= AccessCSSVar("--col_normalTXT");
        SettingsHeader.style.fontSize  ="30";
        dropshadow_ui_container.appendChild(SettingsHeader);

        const CloseBTN = document.createElement("img");
        CloseBTN.style.position = "absolute";
        CloseBTN.style.top = AccessCSSVar("--ElementPadding");
        CloseBTN.style.right = AccessCSSVar("--ElementPadding");
        CloseBTN.src = "./assets/img/close.svg";
        CloseBTN.style.width = "40px";
        CloseBTN.style.filter = "invert(88%) sepia(0%) saturate(383%) hue-rotate(249deg) brightness(91%) contrast(88%)";
        CloseBTN.style.cursor = "pointer";
        CloseBTN.addEventListener("click",function(){
            AddServer();
        });
        dropshadow_ui_container.appendChild(CloseBTN);


        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        const AddPingerNameContainer = document.createElement("div");
        AddPingerNameContainer.style.position = "absolute";
        AddPingerNameContainer.style.top = 100 + removeLetters(AccessCSSVar("--ElementPadding")) + "px" ;
        AddPingerNameContainer.style.left = "50%";
        AddPingerNameContainer.style.transform = "translate(-50%,0)";
        AddPingerNameContainer.style.width = "484px";
        AddPingerNameContainer.style.height = "100px";
        AddPingerNameContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
        AddPingerNameContainer.style.borderRadius = AccessCSSVar("--CornerRad");
        dropshadow_ui_container.appendChild(AddPingerNameContainer);
        //add pinger
        const AddPingerNameHeader = document.createElement("div");
        AddPingerNameHeader.style.position = "absolute";
        AddPingerNameHeader.style.left = "50%";
        AddPingerNameHeader.style.top = AccessCSSVar("--CornerRad");
        AddPingerNameHeader.style.transform = "translate(-50%,0)";
        AddPingerNameHeader.innerHTML = "Server name"
        AddPingerNameHeader.className = "text";
        AddPingerNameHeader.style.color =AccessCSSVar("--col_bold_TXT");
        AddPingerNameHeader.style.fontSize = "20";
        AddPingerNameHeader.style.fontWeight = "500";
        AddPingerNameContainer.appendChild(AddPingerNameHeader);
        //add pinger tooltip 
        const AddPingerNameTip = document.createElement("div");
        AddPingerNameTip.style.position = "absolute";
        AddPingerNameTip.style.left = "0px";
        AddPingerNameTip.style.textAlign = "center";
        AddPingerNameTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        AddPingerNameTip.style.width = "100%";
        AddPingerNameTip.innerHTML = "<i>This is the header / name of your server pinger</i>";
        AddPingerNameTip.className = "text";
        AddPingerNameTip.style.color =AccessCSSVar("--col_bg_div1");
        AddPingerNameTip.style.fontSize = "12";
        AddPingerNameTip.style.fontWeight = "200";
        AddPingerNameContainer.appendChild(AddPingerNameTip);
        //server name input
        const AddPingerNameinput = document.createElement("input");
        AddPingerNameinput.style.position = "absolute";
        AddPingerNameinput.style.left = "50%";
        AddPingerNameinput.style.transform = "translate(-50%,0%)";
        AddPingerNameinput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        AddPingerNameinput.placeholder = "some cool name"
        AddPingerNameinput.id = "AddPingerNameinput";
        AddPingerNameinput.style.width = "200px";
        AddPingerNameinput.type = "text";
        AddPingerNameContainer.appendChild(AddPingerNameinput);
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        const AddPingerHostNameContainer = document.createElement("div");
        AddPingerHostNameContainer.style.position = "absolute";
        AddPingerHostNameContainer.style.top = 200 + removeLetters(AccessCSSVar("--ElementPadding")) * 2 + "px" ;
        AddPingerHostNameContainer.style.left = "50%";
        AddPingerHostNameContainer.style.transform = "translate(-50%,0)";
        AddPingerHostNameContainer.style.width = "484px";
        AddPingerHostNameContainer.style.height = "100px";
        AddPingerHostNameContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
        AddPingerHostNameContainer.style.borderRadius = AccessCSSVar("--CornerRad");
        dropshadow_ui_container.appendChild(AddPingerHostNameContainer);

        const AddPingerHostNameHeader = document.createElement("div");
        AddPingerHostNameHeader.style.position = "absolute";
        AddPingerHostNameHeader.style.left = "50%";
        AddPingerHostNameHeader.style.top = AccessCSSVar("--CornerRad");
        AddPingerHostNameHeader.style.transform = "translate(-50%,0)";
        AddPingerHostNameHeader.innerHTML = "Server Hostname"
        AddPingerHostNameHeader.className = "text";
        AddPingerHostNameHeader.style.color =AccessCSSVar("--col_bold_TXT");
        AddPingerHostNameHeader.style.fontSize = "20";
        AddPingerHostNameHeader.style.fontWeight = "500";
        AddPingerHostNameContainer.appendChild(AddPingerHostNameHeader);
        //add pinger tooltip 
        const AddPingerHostNameTip = document.createElement("div");
        AddPingerHostNameTip.style.position = "absolute";
        AddPingerHostNameTip.style.left = "0px";
        AddPingerHostNameTip.style.textAlign = "center";
        AddPingerHostNameTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        AddPingerHostNameTip.style.width = "100%";
        AddPingerHostNameTip.innerHTML = "<i>This is the address or hostname the backend will ping for</i>";
        AddPingerHostNameTip.className = "text";
        AddPingerHostNameTip.style.color =AccessCSSVar("--col_bg_div1");
        AddPingerHostNameTip.style.fontSize = "12";
        AddPingerHostNameTip.style.fontWeight = "200";
        AddPingerHostNameContainer.appendChild(AddPingerHostNameTip);
        //server name input
        const AddPingerHostNameInput = document.createElement("input");
        AddPingerHostNameInput.style.position = "absolute";
        AddPingerHostNameInput.style.left = "50%";
        AddPingerHostNameInput.style.transform = "translate(-50%,0%)";
        AddPingerHostNameInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        AddPingerHostNameInput.placeholder = 'eg: "google.com"'
        AddPingerHostNameInput.id = "AddPingerHostNameInput";
        AddPingerHostNameInput.style.width = "200px";
        AddPingerHostNameInput.type = "text";
        AddPingerHostNameContainer.appendChild(AddPingerHostNameInput);
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        
        const SaveServer = document.createElement("button");
        SaveServer.innerHTML = "Save Server";
        SaveServer.style.position = "absolute";
        SaveServer.style.left = "50%";
        SaveServer.style.transform = "translate(-50%, 0%)";
        SaveServer.style.top = 300 + removeLetters(AccessCSSVar("--ElementPadding")) * 3 + "px" ;
        SaveServer.addEventListener("click", function(){
            SaveData();
        })
        dropshadow_ui_container.appendChild(SaveServer);
        function SaveData(){
            const PingerHostname = document.getElementById("AddPingerHostNameInput").value;
            const PingerName = document.getElementById("AddPingerNameinput").value;
            if(PingerHostname != "" && PingerName != ""){
                //save data
                const ChangeServerData = {
                    "post":{
                        "add_server":{
                          "servername":PingerName,
                          "domain":PingerHostname,
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
                    body: JSON.stringify(ChangeServerData)
                })
                .then(response => response.json())
                .then(data => HandleData(data));
                function HandleData(data){
                    if(data.RETURN == "OK"){
                        GenerateMessageBanner(0, "Server added!");
                        LoadPreparedData();     
                        AddServer();                   
                    }
                }

            }
            else{
                GenerateMessageBanner(2,"Inputs cannot be empty!")
            }
        }



        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //dropshadow
        const dropshadow = document.createElement("div");
        dropshadow.style.top = "0px";
        dropshadow.style.left = "0px";
        dropshadow.style.width = "100%";
        dropshadow.style.height = "100%";
        dropshadow.style.position = "absolute";
        dropshadow.style.backgroundColor = AccessCSSVar("--col_bg_content");
        dropshadow.style.opacity = "0.7";
        dropshadow_container.appendChild(dropshadow);

        //open settings
        clientSettings.add_server.open = true; 
    }
    else if(clientSettings.add_server.open == true){
        //close settings
        const dropshadow_container = document.getElementById("add_server_dropshadow_container");
        dropshadow_container.remove(); 
        document.body.style.overflow = "auto";
        clientSettings.add_server.open = false;
    }
}



