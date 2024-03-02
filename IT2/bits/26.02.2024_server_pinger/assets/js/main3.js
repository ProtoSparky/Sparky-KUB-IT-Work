/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
            
            //set element mouse is currently hovering on
            PingerBody.addEventListener("mouseover", function(event) {
                // Check if the event target is a descendant of PingerBody and
                // if the event is not triggered by moving from a child to the parent
                if (this.contains(event.target) && !this.contains(event.relatedTarget)) {
                    PingerHover(current_pinger_name,true); // Open hovering menu
                }
            });

            PingerBody.addEventListener("mouseout", function(event) {
                // Check if the event target is a descendant of PingerBody and
                // if the event is not triggered by moving from a child to the parent
                if (this.contains(event.target) && !this.contains(event.relatedTarget)) {
                    PingerHover(current_pinger_name,false); // close hovering menu
                }
            });


            document.getElementById("server_area").appendChild(PingerBody);

            //pinger name container
            const PingerNameContainer = document.createElement("div");
            PingerNameContainer.style.position = "absolute";
            PingerNameContainer.style.top = "0px";
            PingerNameContainer.style.left = "0px";
            PingerNameContainer.style.height = "100%";
            PingerNameContainer.style.width = clientSettings.pinger.style.pinger_ping.left;
            PingerNameContainer.id = current_pinger_name + clientSettings.pinger.pinger_ids.pingerNameContainer;
            PingerBody.appendChild(PingerNameContainer);


            //spawn pinger name
            const PingerName = document.createElement("div");
            PingerName.innerHTML  = truncateString(current_pinger_nickname, clientSettings.pinger.style.pinger_name.truncate_length); 
            PingerName.style.position = "absolute";
            PingerName.style.transform="translate(0,-50%)";
            PingerName.style.top = "50%";
            PingerName.className = "text";
            PingerName.id = current_pinger_name + clientSettings.pinger.pinger_ids.PingerName;
            PingerName.style.left = 1 + AccessCSSVar("--ElementPadding");
            PingerName.style.color = AccessCSSVar("--col_normalTXT");
            PingerName.style.fontSize = "30";
            PingerName.style.textOverflow = "break-word";
            PingerNameContainer.appendChild(PingerName);

            //spawn pinger ping            
            const PingerPing = document.createElement("div");
            if(current_server_object.alive == true){
                PingerPing.innerHTML = "Ping: "+ average(current_server_object.ping.history, 1);
            }
            else{
                PingerPing.innerHTML = "Ping: ----";
            }
            PingerPing.style.position = "absolute";
            PingerPing.className = "text";
            PingerPing.id = current_pinger_name + clientSettings.pinger.pinger_ids.PingerPing;
            PingerPing.style.transform = "translate(0,-50%)";
            PingerPing.style.top = "50%";
            PingerPing.style.left = clientSettings.pinger.style.pinger_ping.left;
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
            CurrentPingerName.innerHTML = truncateString(pinger_nickname, clientSettings.pinger.style.pinger_name.truncate_length); 

            //update pinger ping
            
            const CurrentPingerPing = document.getElementById(pinger_id + clientSettings.pinger.pinger_ids.PingerPing);
            if(current_pinger_object.alive == true){
                CurrentPingerPing.innerHTML = "Ping: "+ average(current_pinger_object.ping.history, 1);
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
            

        }

        //update pinger backdrop so it scales with amount of pingers
        const backdrop = document.getElementById(clientSettings.assorted_ids.pinger_backdrop);
        if(pinger_amount < 5 || pinger_amount == 5){
            backdrop.style.transform = "translate(-50%,-50%)";
            backdrop.style.top = "50%";
            backdrop.style.height = "610px";
        }
        else if(pinger_amount > 5){
            backdrop.style.height = (pinger_amount * clientSettings.pinger.style.spacing.multiplier) + clientSettings.pinger.style.spacing.adder; //im not going to question how this works
            backdrop.style.transform = "translate(-50%,0)";
            backdrop.style.top = "50px";
        }

    }
    
}

function PingerHover(pinger_id, entered){
    //this function creates a hover effect, and shows edit buttons for a specific pinger
    const CurrentPingerBody = document.getElementById(pinger_id);    
    if(entered){
        //create container with hover effect 
        const PingerHoverContainer = document.createElement("div");
        PingerHoverContainer.id = pinger_id + clientSettings.pinger.pinger_ids.HoverMenuCont;
        PingerHoverContainer.style.position = "absolute";
        PingerHoverContainer.style.top = "0px";
        PingerHoverContainer.style.left = "0px";
        PingerHoverContainer.style.width = "100%";
        PingerHoverContainer.style.height = "100%";
        PingerHoverContainer.style.borderRadius = AccessCSSVar("--CornerRad");
        PingerHoverContainer.style.boxShadow = "0px -1px 45px 3px" + ADDopacityToHex(AccessCSSVar("--col_bg_div1"), 0.2);         
        CurrentPingerBody.appendChild(PingerHoverContainer);

        //create edit are
        const PingerHoverEditContainer = document.createElement("div");
        PingerHoverEditContainer.style.position = "absolute";
        PingerHoverEditContainer.style.right = "0px";
        PingerHoverEditContainer.style.width = "50px";
        PingerHoverEditContainer.style.height = "100%";
        PingerHoverEditContainer.style.top = "0px";;
        PingerHoverContainer.appendChild(PingerHoverEditContainer);

        //create edit button
        const PingerHoverEditBTN = document.createElement("img");
        PingerHoverEditBTN.style.position = "absolute";
        PingerHoverEditBTN.style.top  = "50%";
        PingerHoverEditBTN.style.left = "50%";
        PingerHoverEditBTN.style.transform = "translate(-50%,-50%)";
        PingerHoverEditBTN.src = "./assets/img/file-edit.svg";
        PingerHoverEditBTN.style.width = "100%";
        PingerHoverEditBTN.style.height = "auto";
        PingerHoverEditBTN.style.filter = "invert(88%) sepia(0%) saturate(383%) hue-rotate(249deg) brightness(91%) contrast(88%) opacity(70%)";
        PingerHoverEditBTN.style.cursor ="pointer";
        PingerHoverEditBTN.addEventListener("click",function(){
            console.log("uwu")
        });
        PingerHoverEditContainer.appendChild(PingerHoverEditBTN);

    }
    else if(!entered){
        PingerHoverContainer = document.getElementById(pinger_id + clientSettings.pinger.pinger_ids.HoverMenuCont);
        PingerHoverContainer.remove();
    }
}
function PingerSettings(pinger_id){
    if(clientSettings.pingerSettings.open == false){
        //open settings
        clientSettings.pingerSettings.open = true;
    }
    else if(clientSettings.pingerSettings.open == true){
        //close settings
        clientSettings.pingerSettings.open = false; 
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
