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
        "pingers_onscreen":[], //this will be a list of pingers that are currently onscreen
        "style":{
            "spacing":{
                "multiplier":120,
                "adder":16
            }
        }, 
        "pinger_ids":{
            "PingerPing":"ping",
            "PingerName":"name",
            "PingerGraph":"graph",

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
    //check if amount of pingers match the ones in pingers_onscreen
    const current_pingers = Object.keys(data);
    const last_pingers = clientSettings.pinger.pingers_onscreen;
    const pinger_changes = compareArrays(last_pingers, current_pingers);
    AddPingers(data,pinger_changes); //create html structure for new pingers
    RemoveOldPingers(data,pinger_changes); //remove old pingers
    UpdatePingersOnScreen(data); //update client cashe of pingers
    UpdatePingerData(data); //update html for existing pingers


    //Add pingers from server
    function AddPingers(pinger_data,changes){
        //this function adds new pingers to the table
        const changes_added = changes.added; 
        const added_pingers = changes_added.length;
        console.info("pingers to be added : " + added_pingers);
        for(let added_pinger_pointer = 0; added_pinger_pointer < added_pingers; added_pinger_pointer ++){
            const current_pinger_name = changes_added[added_pinger_pointer];
            const pinger_position = ((clientSettings.pinger.pingers_onscreen.length + added_pinger_pointer) * clientSettings.pinger.style.spacing.multiplier) + clientSettings.pinger.style.spacing.adder; 
            const current_server_object = pinger_data[current_pinger_name];
            const current_pinger_nickname = current_server_object.nickname;
        

            //this loop spawns the boxes and pingers            
            const PingerBody = document.createElement("div");
            PingerBody.style.position = "absolute";
            PingerBody.id = current_pinger_name;
            PingerBody.style.transform = "translate(-50%)";
            PingerBody.style.left = "50%";
            PingerBody.style.width = "95%";
            PingerBody.style.height = "100px";
            PingerBody.style.top =  pinger_position; 
            PingerBody.style.borderRadius = AccessCSSVar("--CornerRad");
            PingerBody.style.backgroundColor = AccessCSSVar("--col_bg_content");
            document.getElementById("server_area").appendChild(PingerBody);

            //spawn pinger name
            const PingerName = document.createElement("div");
            PingerName.innerHTML  = current_pinger_nickname; 
            PingerName.style.position = "absolute";
            PingerName.style.transform="translate(0,-50%)";
            PingerName.style.top = "50%";
            PingerName.className = "text";
            PingerName.id = current_pinger_name + clientSettings.pinger.pinger_ids.PingerName;
            PingerName.style.left = 1 + AccessCSSVar("--ElementPadding");
            PingerName.style.color = AccessCSSVar("--col_normalTXT");
            PingerName.style.fontSize = "30";
            PingerBody.appendChild(PingerName);

            //spawn pinger ping            
            const PingerPing = document.createElement("div");
            if(current_server_object.alive == true){
                PingerPing.innerHTML = "Ping: "+ average(current_server_object.ping.history);
            }
            else{
                PingerPing.innerHTML = "Ping: ----";
            }
            PingerPing.style.position = "absolute";
            PingerPing.className = "text";
            PingerPing.id = current_pinger_name + clientSettings.pinger.pinger_ids.PingerPing;
            PingerPing.style.transform = "translate(0,-50%)";
            PingerPing.style.top = "50%";
            PingerPing.style.left = "300px";
            PingerPing.style.fontSize = "25";
            PingerPing.style.fontWeight = "250";
            PingerPing.style.color = AccessCSSVar("--col_bg_div1");
            PingerBody.appendChild(PingerPing);


            //spawn ping graph            
            const PingerGraph = document.createElement("canvas");
            PingerGraph.style.position = "absolute";
            PingerGraph.style.top = "50%";
            PingerGraph.style.height = "100%";
            PingerGraph.style.width = "50%";
            PingerGraph.style.transform = "translate(0,-50%)";
            PingerGraph.style.right = "0px";
            PingerGraph.style.backgroundColor = AccessCSSVar("--col_bg_content");
            PingerGraph.id = current_pinger_name + clientSettings.pinger.pinger_ids.PingerGraph;
            PingerBody.appendChild(PingerGraph);               

            const canvas_data = {
                "id":current_pinger_name + "graph",
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
            drawGraph(current_server_object.ping.history, canvas_data);      
            
        }

    }

    function RemoveOldPingers(pinger_data,changes){
        //this function removes old pingers from the table
        const changes_removed = changes.removed; 
        const removed_pingers = changes_removed.length;  
        console.info("pingers to be removed : " + removed_pingers);
        for(let removed_pinger_pointer = 0; removed_pinger_pointer < removed_pingers; removed_pinger_pointer ++){
            const current_pinger_name = changes_removed[removed_pinger_pointer];         
            const current_removed_pinger = document.getElementById(current_pinger_name);
            current_removed_pinger.remove();
        }             
    }

    function UpdatePingersOnScreen(pinger_data){      
        //set   clientSettings.pinger.pingers_onscreen to the new pingers
        const PingerNames = Object.keys(pinger_data);   
        clientSettings.pinger.pingers_onscreen = PingerNames; 
    }

    function UpdatePingerData(pinger_data){
        //update pinger data to latest
        const pinger_names = Object.keys(pinger_data);
        const pinger_amount = pinger_names.length;
        for(let pinger_pointer = 0; pinger_pointer < pinger_amount; pinger_pointer ++){
            const current_pinger_object = pinger_data[pinger_names[pinger_pointer]];
            const pinger_id = pinger_names[pinger_pointer];
            const pinger_nickname = current_pinger_object.nickname; 

            //update pinger location onframe
            const CurrentPinger = document.getElementById(pinger_id);
            CurrentPinger.style.top = ((pinger_pointer) * clientSettings.pinger.style.spacing.multiplier) + clientSettings.pinger.style.spacing.adder; 


            //update pinger name 
            const CurrentPingerName = document.getElementById(pinger_id + clientSettings.pinger.pinger_ids.PingerName);
            CurrentPingerName.innerHTML = pinger_nickname;

            //update pinger ping
            
            const CurrentPingerPing = document.getElementById(pinger_id + clientSettings.pinger.pinger_ids.PingerPing);
            if(current_pinger_object.alive == true){
                CurrentPingerPing.innerHTML = "Ping: "+ average(current_pinger_object.ping.history);
            }
            else{
                CurrentPingerPing.innerHTML = "Ping: ----";
            }

            //update graph
            
            const canvas_data = {
                "id":pinger_id + "graph",
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
            drawGraph(current_pinger_object.ping.history, canvas_data);   
            drawGraph(current_pinger_object.ping.history, canvas_data);   //i hate how cheezy this is



            //update pinger backdrop so it scales with amount of pingers
            const backdrop = document.getElementById(clientSettings.assorted_ids.pinger_backdrop);
            if(pinger_amount > 5){
                backdrop.style.height = (pinger_amount * clientSettings.pinger.style.spacing.multiplier) + clientSettings.pinger.style.spacing.adder; //im not going to question how this works
                backdrop.style.transform = "translate(-50%,0)";
                backdrop.style.top = "50px";
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

function drawGraphSVG(data, canvas_data) {
    // Create SVG element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 ' + canvas_data.width + ' ' + canvas_data.height);

    // Create gradient definition
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '100%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '0%');

    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', canvas_data.style.gradient.top.color);
    gradient.appendChild(stop1);

    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', canvas_data.style.gradient.bottom.color);
    gradient.appendChild(stop2);

    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create path element
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('fill', 'url(#gradient)');
    path.setAttribute('stroke', canvas_data.style.line.color);
    path.setAttribute('stroke-width', canvas_data.style.line.line_width);

    // Calculate path data
    var d = `M${canvas_data.padding},${data[0] * ySpacing} `;
    for (var i = 0; i < data.length - 1; i++) {
        var x1 = canvas_data.padding + i * xSpacing;
        var y1 = data[i] * ySpacing;
        var x2 = canvas_data.padding + (i + 1) * xSpacing;
        var y2 = data[i + 1] * ySpacing;
        var cx = (x1 + x2) / 2;
        var cy = (y1 + y2) / 2;

        d += `Q${x1},${y1} ${cx},${cy} `;
    }
    d += `Q${canvas_data.padding + (data.length - 1) * xSpacing},${data[data.length - 1] * ySpacing} ${canvas_data.padding + (data.length - 1) * xSpacing},${data[data.length - 1] * ySpacing} `;
    d += `L${canvas_data.padding + (data.length - 1) * xSpacing},${canvas_data.padding} L${canvas_data.padding},${canvas_data.padding} Z`;

    path.setAttribute('d', d);
    svg.appendChild(path);

    // Append SVG to the DOM
    var container = document.getElementById(canvas_data.id);
    container.appendChild(svg);
}
