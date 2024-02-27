const clientSettings = {
    "drop_shadow":{
        "open":false
    },
    "update_speed":10, //minutes
    "pinger":{
        "pingers_open":false, //if a specific pinger has its settings open
        "open_pinger_name":null, //name of the open pinger
        "load_all_data":true, //load all or some data for pingers
        "specific_data":null, //if load some data, here's the name for said pinger
        "pingers_created":false, //becomes true once pinger elements are created after first cycle
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
    server_area.id = "server_area"; 
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
    .then(response => response.json())
    .then(data => Check4Db(data));
}
function Check4Db(data){
    if(data.is_data_present == 1){
        //read timing for selfubtating
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
        LoadPreparedData();       
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

function DropShadow(){
    if(clientSettings.drop_shadow.open == false){
        //create dropshadow
        console.info("creating dropshadow");
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
        console.info("removing dropshadow");
        const dropshadow = document.getElementById("dropshadow");
        dropshadow.remove(); 
        clientSettings.drop_shadow.open  = false; 
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
    let data_request_query;
    if(clientSettings.pinger.load_all_data == true){
        //load all data for pingers
        data_request_query = {
            "get":[
              "get_all_server_data"
            ]
        };
    }
    else if(clientSettings.pinger.load_all_data == false){
        //load some data for specific pinger
        data_request_query = {
            "get":{
              "get_server_data":"some_server_name"
            }
        }; 
    }
    else{
        GenerateMessageBanner(2, "ERROR! Pinger cannot load data");
    }

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
function DisplayPingerData(data){
    //this function displays the pingers 
    if(clientSettings.pinger.pingers_open == false){
        if(clientSettings.pinger.pingers_created == false){
            //display all pingers
            const pinger_names = Object.keys(data); 
            const pinger_amount = pinger_names.length;
            for(let pinger_pointer = 0; pinger_pointer < pinger_amount; pinger_pointer ++){
                //this loop spawns the boxes and pingers
                const current_pinger_id = pinger_names[pinger_pointer];
                const current_server = data[current_pinger_id];
                const current_pinger_name = current_server.nickname;

                const pinger_body = document.createElement("div");
                pinger_body.style.position = "absolute";
                pinger_body.id = current_pinger_id;
                pinger_body.style.transform = "translate(-50%)";
                pinger_body.style.left = "50%";
                pinger_body.style.width = "95%";
                pinger_body.style.height = "100px";
                pinger_body.style.top =  (pinger_pointer * 120) + 16;
                pinger_body.style.borderRadius = AccessCSSVar("--CornerRad");
                pinger_body.style.backgroundColor = AccessCSSVar("--col_bg_content");
                document.getElementById("server_area").appendChild(pinger_body);

                //spawn pinger name
                const PingerName = document.createElement("div");
                PingerName.innerHTML  = current_pinger_name; 
                PingerName.style.position = "absolute";
                PingerName.style.transform="translate(0,-50%)";
                PingerName.style.top = "50%";
                PingerName.className = "text";
                PingerName.id = current_pinger_id + "name";
                PingerName.style.left = 1 + AccessCSSVar("--ElementPadding");
                PingerName.style.color = AccessCSSVar("--col_normalTXT");
                PingerName.style.fontSize = "20";
                pinger_body.appendChild(PingerName);


                //spawn graph
                const ping_graph = document.createElement("canvas");
                ping_graph.style.position = "absolute";
                ping_graph.style.top = "50%";
                ping_graph.style.height = "100%";
                ping_graph.style.width = "50%";
                ping_graph.style.transform = "translate(0,-50%)";
                ping_graph.style.right = "0px";
                ping_graph.style.backgroundColor = AccessCSSVar("--col_bg_content");
                ping_graph.id = current_pinger_id + "graph";
                pinger_body.appendChild(ping_graph);               

                const canvas_data = {
                    "id":current_pinger_id + "graph",
                    "style":{
                        "line":{
                            "line_width":5,
                            "color":AccessCSSVar("--col_bg_div1"),
                        },
                        "gradient":{
                            "top":{
                                "color":AccessCSSVar("--col_bg_lighter"),
                            },
                            "bottom":{
                                "color":AccessCSSVar("--col_bg_content"),
                            }
                        }
                        
                    }
                };
                drawGraph(current_server.ping.history, canvas_data);
                clientSettings.pinger.pingers_created = true;

            }
        }
        else{
            console.log("want to update pinger");

            //update all pingers
            const pinger_names = Object.keys(data); 
            const pinger_amount = pinger_names.length;
            for(let pinger_pointer = 0; pinger_pointer < pinger_amount; pinger_pointer ++){
                //this loop spawns the boxes and pingers
                const current_pinger_id = pinger_names[pinger_pointer];
                const current_server = data[current_pinger_id];
                const current_pinger_name = current_server.nickname;

                //pinger name
                const PingerName = document.getElementById(current_pinger_id +"name");
                if(PingerName == null){
                    //create new pinger
                    //this loop spawns the boxes and pingers
                    const current_pinger_id = pinger_names[pinger_pointer];
                    const current_server = data[current_pinger_id];
                    const current_pinger_name = current_server.nickname;

                    const pinger_body = document.createElement("div");
                    pinger_body.style.position = "absolute";
                    pinger_body.id = current_pinger_id;
                    pinger_body.style.transform = "translate(-50%)";
                    pinger_body.style.left = "50%";
                    pinger_body.style.width = "95%";
                    pinger_body.style.height = "100px";
                    pinger_body.style.top =  (pinger_pointer * 120) + 16;
                    pinger_body.style.borderRadius = AccessCSSVar("--CornerRad");
                    pinger_body.style.backgroundColor = AccessCSSVar("--col_bg_content");
                    document.getElementById("server_area").appendChild(pinger_body);

                    //spawn pinger name
                    const PingerName = document.createElement("div");
                    PingerName.innerHTML  = current_pinger_name; 
                    PingerName.style.position = "absolute";
                    PingerName.style.transform="translate(0,-50%)";
                    PingerName.style.top = "50%";
                    PingerName.className = "text";
                    PingerName.id = current_pinger_id + "name";
                    PingerName.style.left = 1 + AccessCSSVar("--ElementPadding");
                    PingerName.style.color = AccessCSSVar("--col_normalTXT");
                    PingerName.style.fontSize = "20";
                    pinger_body.appendChild(PingerName);


                    //spawn graph
                    const ping_graph = document.createElement("canvas");
                    ping_graph.style.position = "absolute";
                    ping_graph.style.top = "50%";
                    ping_graph.style.height = "100%";
                    ping_graph.style.width = "50%";
                    ping_graph.style.transform = "translate(0,-50%)";
                    ping_graph.style.right = "0px";
                    ping_graph.style.backgroundColor = AccessCSSVar("--col_bg_content");
                    ping_graph.id = current_pinger_id + "graph";
                    pinger_body.appendChild(ping_graph);               

                    const canvas_data = {
                        "id":current_pinger_id + "graph",
                        "style":{
                            "line":{
                                "line_width":5,
                                "color":AccessCSSVar("--col_bg_div1"),
                            },
                            "gradient":{
                                "top":{
                                    "color":AccessCSSVar("--col_bg_lighter"),
                                },
                                "bottom":{
                                    "color":AccessCSSVar("--col_bg_content"),
                                }
                            }
                            
                        }
                    };
                    drawGraph(current_server.ping.history, canvas_data);
                }
                PingerName.innerHTML  = current_pinger_name; 

                //pinger graph
                const canvas_data = {
                    "id":current_pinger_id + "graph",
                    "style":{
                        "line":{
                            "line_width":5,
                            "color":AccessCSSVar("--col_bg_div1"),
                        },
                        "gradient":{
                            "top":{
                                "color":AccessCSSVar("--col_bg_lighter"),
                            },
                            "bottom":{
                                "color":AccessCSSVar("--col_bg_content"),
                            }
                        }
                        
                    }
                };
                drawGraph(current_server.ping.history, canvas_data);
                drawGraph(current_server.ping.history, canvas_data); // i hate how cheezy this is. this will definitly cause bugs later!
            }

        }
    }
}
/*
function drawGraph(data, canvas_data) {
    var canvas = document.getElementById(canvas_data.id);
    var ctx = canvas.getContext("2d");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    var padding =   0;
    const top_line_width = canvas_data.style.line.line_width;
    const gradient_color_bottom = canvas_data.style.gradient.bottom.color ;
    const gradient_color_top = canvas_data.style.gradient.top.color; 

    var xSpacing = (width -   2 * padding) / (data.length -   1);
    var maxY = Math.max(...data);
    var ySpacing = (height -   2 * padding) / maxY;

    // Flip the y-axis and move the origin to the bottom of the canvas
    ctx.transform(1,   0,   0, -1,   0, canvas.height);

    ctx.strokeStyle = canvas_data.style.line.color;
    ctx.lineWidth =   top_line_width;
    ctx.clearRect(0,   0, width, height);
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Create a linear gradient for the fill style
    var gradient = ctx.createLinearGradient(0, height,   0,   0);
    gradient.addColorStop(1, gradient_color_bottom); // Start color at the bottom
    gradient.addColorStop(0, gradient_color_top); // End color at the top
    ctx.fillStyle = gradient;

    // Adjust the y-coordinate calculation
    ctx.moveTo(padding, data[0] * ySpacing);

    for (var i =   0; i < data.length -   1; i++) {
        var x1 = padding + i * xSpacing;
        var y1 = data[i] * ySpacing;
        var x2 = padding + (i +   1) * xSpacing;
        var y2 = data[i +   1] * ySpacing;
        var cx = (x1 + x2) /   2;
        var cy = (y1 + y2) /   2;

        ctx.quadraticCurveTo(x1, y1, cx, cy);
    }

    ctx.quadraticCurveTo(
        padding + (data.length -   1) * xSpacing,
        data[data.length -   1] * ySpacing,
        padding + (data.length -   1) * xSpacing,
        data[data.length -   1] * ySpacing
    );

    // Stroke the white line
    ctx.stroke();

    // Close the path to the bottom of the canvas
    ctx.lineTo(padding + (data.length -   1) * xSpacing, padding);
    ctx.lineTo(padding, padding);
    ctx.closePath();

    // Fill the path with the gradient
    ctx.fill();
}
*/
function drawGraph(data, canvas_data) {
    var canvas = document.getElementById(canvas_data.id);
    var ctx = canvas.getContext("2d");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    var padding =  0;
    const top_line_width = canvas_data.style.line.line_width;
    const gradient_color_bottom = canvas_data.style.gradient.bottom.color;
    const gradient_color_top = canvas_data.style.gradient.top.color;

    // Clear the entire canvas before drawing anything new
    ctx.clearRect(0,  0, width, height);

    var xSpacing = (width -  2 * padding) / (data.length -  1);
    var maxY = Math.max(...data);
    var ySpacing = (height -  2 * padding) / maxY;

    // Flip the y-axis and move the origin to the bottom of the canvas
    ctx.transform(1,  0,  0, -1,  0, canvas.height);

    ctx.strokeStyle = canvas_data.style.line.color;
    ctx.lineWidth = top_line_width;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Create a linear gradient for the fill style
    var gradient = ctx.createLinearGradient(0, height,  0,  0);
    gradient.addColorStop(1, gradient_color_bottom); // Start color at the bottom
    gradient.addColorStop(0, gradient_color_top); // End color at the top
    ctx.fillStyle = gradient;

    // Adjust the y-coordinate calculation
    ctx.moveTo(padding, data[0] * ySpacing);

    for (var i =  0; i < data.length -  1; i++) {
        var x1 = padding + i * xSpacing;
        var y1 = data[i] * ySpacing;
        var x2 = padding + (i +  1) * xSpacing;
        var y2 = data[i +  1] * ySpacing;
        var cx = (x1 + x2) /  2;
        var cy = (y1 + y2) /  2;

        ctx.quadraticCurveTo(x1, y1, cx, cy);
    }

    ctx.quadraticCurveTo(
        padding + (data.length -  1) * xSpacing,
        data[data.length -  1] * ySpacing,
        padding + (data.length -  1) * xSpacing,
        data[data.length -  1] * ySpacing
    );

    // Stroke the white line
    ctx.stroke();

    // Close the path to the bottom of the canvas
    ctx.lineTo(padding + (data.length -  1) * xSpacing, padding);
    ctx.lineTo(padding, padding);
    ctx.closePath();

    // Fill the path with the gradient
    ctx.fill();
}
