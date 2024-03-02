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
        PingerHoverEditBTN.style.left = "55%";
        PingerHoverEditBTN.style.transform = "translate(-50%,-50%)";
        PingerHoverEditBTN.src = "./assets/img/file-edit.svg";
        PingerHoverEditBTN.style.width = "100%";
        PingerHoverEditBTN.style.height = "auto";
        PingerHoverEditBTN.style.filter = "invert(88%) sepia(0%) saturate(383%) hue-rotate(249deg) brightness(91%) contrast(88%) opacity(70%)";
        PingerHoverEditBTN.style.cursor ="pointer";
        PingerHoverEditBTN.addEventListener("click",function(){
            //console.log("uwu")
            PingerSettings(pinger_id);
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
        const GetServerDATA = {
            "get":{
              "get_server_data":pinger_id
            }
        };
    
        fetch(clientSettings.API.link, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(GetServerDATA)
        })
        .then(response => response.json())
        .then(data => SpawnUI(data));

        function SpawnUI(data){
            //this function spawns the ui for the selected server with specific server data

            //create dropshadow
            const dropshadow_container = document.createElement("div");
            dropshadow_container.style.top = "0px";
            dropshadow_container.style.left = "0px";
            dropshadow_container.style.width = "100%";
            dropshadow_container.style.height = "100%";
            dropshadow_container.style.position = "absolute";
            dropshadow_container.id = "settings_dropshadow_container";
            dropshadow_container.style.zIndex = "9";
            document.getElementById("content-fullscreen").appendChild(dropshadow_container);
            document.body.style.overflow = "hidden";            

            //ui
            const dropshadow_ui_container = document.createElement("div");
            dropshadow_ui_container.style.position = "absolute";
            dropshadow_ui_container.style.top = "50%";
            dropshadow_ui_container.style.width = "500px";
            dropshadow_ui_container.style.height = "600px";
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
            SettingsHeader.style.left = "0px"
            SettingsHeader.style.width = "100%";
            SettingsHeader.style.textAlign = "center";
            SettingsHeader.innerHTML = 'Editing "' + data.nickname + '"';
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
                PingerSettings(pinger_id);
            });
            dropshadow_ui_container.appendChild(CloseBTN);

            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            // turn pinger on or off
            const UpdatePingerStateContainer = document.createElement("div");
            UpdatePingerStateContainer.style.position = "absolute";
            UpdatePingerStateContainer.style.top = "100px";
            UpdatePingerStateContainer.style.left = "50%";
            UpdatePingerStateContainer.style.transform = "translate(-50%,0)";
            UpdatePingerStateContainer.style.width = "484px";
            UpdatePingerStateContainer.style.height = "100px";
            UpdatePingerStateContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
            UpdatePingerStateContainer.style.borderRadius = AccessCSSVar("--CornerRad");
            dropshadow_ui_container.appendChild(UpdatePingerStateContainer);
            //update pinger state header
            const UUpdatePingerStateHeader = document.createElement("div");
            UUpdatePingerStateHeader.style.position = "absolute";
            UUpdatePingerStateHeader.style.left = "50%";
            UUpdatePingerStateHeader.style.top = AccessCSSVar("--CornerRad");
            UUpdatePingerStateHeader.style.transform = "translate(-50%,0)";
            UUpdatePingerStateHeader.innerHTML = "Turn Pinger on or off"
            UUpdatePingerStateHeader.className = "text";
            UUpdatePingerStateHeader.style.color =AccessCSSVar("--col_bold_TXT");
            UUpdatePingerStateHeader.style.fontSize = "20";
            UUpdatePingerStateHeader.style.fontWeight = "500";
            UpdatePingerStateContainer.appendChild(UUpdatePingerStateHeader);
            //update pinger state tooltip
            const UpdatePingerStateTip = document.createElement("div");
            UpdatePingerStateTip.style.position = "absolute";
            UpdatePingerStateTip.style.left = "0px";
            UpdatePingerStateTip.style.textAlign = "center";
            UpdatePingerStateTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            UpdatePingerStateTip.style.width = "100%";
            UpdatePingerStateTip.innerHTML = "<i>Turn pinger on or off. Backend will pause pinging if turned off</i>";
            UpdatePingerStateTip.className = "text";
            UpdatePingerStateTip.style.color =AccessCSSVar("--col_bg_div1");
            UpdatePingerStateTip.style.fontSize = "12";
            UpdatePingerStateTip.style.fontWeight = "200";
            UpdatePingerStateContainer.appendChild(UpdatePingerStateTip);
            //upodate timing switch
            const UpdatePingerStateInput = document.createElement("input");
            UpdatePingerStateInput.style.position = "absolute";
            UpdatePingerStateInput.style.left = "170px";
            UpdatePingerStateInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            UpdatePingerStateInput.min = 1;
            UpdatePingerStateInput.max = 100;
            if(data.enabled == true){
                UpdatePingerStateInput.value = 1;
            }
            else{
                UpdatePingerStateInput.value = 0;
            }
            UpdatePingerStateInput.id = "UpdatePingerStateInput";
            UpdatePingerStateInput.style.width = "25px";
            UpdatePingerStateInput.style.height = "25px";
            UpdatePingerStateInput.type = "checkbox";
            UpdatePingerStateContainer.appendChild(UpdatePingerStateInput);
            //save timing
            const UpdatePingerStateInputSave = document.createElement("button");
            UpdatePingerStateInputSave.style.position = "absolute";
            UpdatePingerStateInputSave.style.right  ="170px";
            UpdatePingerStateInputSave.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            UpdatePingerStateInputSave.innerHTML = "Save";
            UpdatePingerStateInputSave.addEventListener("click",function(){
                SavePingerState();
            });    
            UpdatePingerStateContainer.appendChild(UpdatePingerStateInputSave);
            function SavePingerState(){
                const value = document.getElementById("UpdatePingerStateInput").value;
                console.warn("not implemented" + value);
            }   

            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //rename server
            const RenamePingerContainer = document.createElement("div");
            RenamePingerContainer.style.position = "absolute";
            RenamePingerContainer.style.top = 200 + removeLetters(AccessCSSVar("--ElementPadding")) + "px" ;
            RenamePingerContainer.style.left = "50%";
            RenamePingerContainer.style.transform = "translate(-50%,0)";
            RenamePingerContainer.style.width = "484px";
            RenamePingerContainer.style.height = "100px";
            RenamePingerContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
            RenamePingerContainer.style.borderRadius = AccessCSSVar("--CornerRad");
            dropshadow_ui_container.appendChild(RenamePingerContainer);
            //Ping history header
            const RenamePingerHeader = document.createElement("div");
            RenamePingerHeader.style.position = "absolute";
            RenamePingerHeader.style.left = "50%";
            RenamePingerHeader.style.top = AccessCSSVar("--CornerRad");
            RenamePingerHeader.style.transform = "translate(-50%,0)";
            RenamePingerHeader.innerHTML = "Rename server"
            RenamePingerHeader.className = "text";
            RenamePingerHeader.style.color =AccessCSSVar("--col_bold_TXT");
            RenamePingerHeader.style.fontSize = "20";
            RenamePingerHeader.style.fontWeight = "500";
            RenamePingerContainer.appendChild(RenamePingerHeader);
            //Ping history tooltip
            const RenamePingerTip = document.createElement("div");
            RenamePingerTip.style.position = "absolute";
            RenamePingerTip.style.left = "0px";
            RenamePingerTip.style.textAlign = "center";
            RenamePingerTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            RenamePingerTip.style.width = "100%";
            RenamePingerTip.innerHTML = "<i>Renames the server to something else</i>";
            RenamePingerTip.className = "text";
            RenamePingerTip.style.color =AccessCSSVar("--col_bg_div1");
            RenamePingerTip.style.fontSize = "12";
            RenamePingerTip.style.fontWeight = "200";
            RenamePingerContainer.appendChild(RenamePingerTip);
            // update tooltip
            const RenamePingerNameInput = document.createElement("input");
            RenamePingerNameInput.style.position = "absolute";
            RenamePingerNameInput.style.left = "100px";
            RenamePingerNameInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            RenamePingerNameInput.min = 3;
            RenamePingerNameInput.max = 400;
            RenamePingerNameInput.placeholder = "some cool name";
            RenamePingerNameInput.id = "RenamePingerNameInput";
            RenamePingerNameInput.style.width = "150px";
            RenamePingerNameInput.type = "text";
            RenamePingerContainer.appendChild(RenamePingerNameInput);
            //update timing save button
            const RenamePingerNameInputSave = document.createElement("button");
            RenamePingerNameInputSave.style.position = "absolute";
            RenamePingerNameInputSave.style.right  ="170px";
            RenamePingerNameInputSave.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            RenamePingerNameInputSave.innerHTML = "Save";
            RenamePingerNameInputSave.addEventListener("click",function(){
                SavePingerName();
            });    
            RenamePingerContainer.appendChild(RenamePingerNameInputSave);  
            function SavePingerName(){
                submit_value = document.getElementById("RenamePingerNameInput").value;
                console.log("not implemented" + submit_value);
            }
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //edit domain
            const EditPingerDomainContainer = document.createElement("div");
            EditPingerDomainContainer.style.position = "absolute";
            EditPingerDomainContainer.style.top = 300 + (removeLetters(AccessCSSVar("--ElementPadding"))*2) + "px" ;
            EditPingerDomainContainer.style.left = "50%";
            EditPingerDomainContainer.style.transform = "translate(-50%,0)";
            EditPingerDomainContainer.style.width = "484px";
            EditPingerDomainContainer.style.height = "100px";
            EditPingerDomainContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
            EditPingerDomainContainer.style.borderRadius = AccessCSSVar("--CornerRad");
            dropshadow_ui_container.appendChild(EditPingerDomainContainer);
            //Ping domain header
            const EditPingerDomainHeader = document.createElement("div");
            EditPingerDomainHeader.style.position = "absolute";
            EditPingerDomainHeader.style.left = "50%";
            EditPingerDomainHeader.style.top = AccessCSSVar("--CornerRad");
            EditPingerDomainHeader.style.transform = "translate(-50%,0)";
            EditPingerDomainHeader.innerHTML = "Edit server domain"
            EditPingerDomainHeader.className = "text";
            EditPingerDomainHeader.style.color =AccessCSSVar("--col_bold_TXT");
            EditPingerDomainHeader.style.fontSize = "20";
            EditPingerDomainHeader.style.fontWeight = "500";
            EditPingerDomainContainer.appendChild(EditPingerDomainHeader);
            //Ping domain tooltip
            const EditPingerDomainTip = document.createElement("div");
            EditPingerDomainTip.style.position = "absolute";
            EditPingerDomainTip.style.left = "0px";
            EditPingerDomainTip.style.textAlign = "center";
            EditPingerDomainTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            EditPingerDomainTip.style.width = "100%";
            EditPingerDomainTip.innerHTML = "<i>Changes this servers domain to something else</i>";
            EditPingerDomainTip.className = "text";
            EditPingerDomainTip.style.color =AccessCSSVar("--col_bg_div1");
            EditPingerDomainTip.style.fontSize = "12";
            EditPingerDomainTip.style.fontWeight = "200";
            EditPingerDomainContainer.appendChild(EditPingerDomainTip);
            // ping  domain input
            const EditPingerDomainInput = document.createElement("input");
            EditPingerDomainInput.style.position = "absolute";
            EditPingerDomainInput.style.left = "100px";
            EditPingerDomainInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            EditPingerDomainInput.min = 3;
            EditPingerDomainInput.max = 400;
            EditPingerDomainInput.placeholder = "eg: google.com";
            EditPingerDomainInput.id = "EditPingerDomainInput";
            EditPingerDomainInput.style.width = "150px";
            EditPingerDomainInput.type = "text";
            EditPingerDomainContainer.appendChild(EditPingerDomainInput);
            //update domain button
            const EditPingerDomainInputSave = document.createElement("button");
            EditPingerDomainInputSave.style.position = "absolute";
            EditPingerDomainInputSave.style.right  ="170px";
            EditPingerDomainInputSave.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            EditPingerDomainInputSave.innerHTML = "Save";
            EditPingerDomainInputSave.addEventListener("click",function(){
                SaveNewPingerDomain();
            });  
            EditPingerDomainContainer.appendChild(EditPingerDomainInputSave);
            function SaveNewPingerDomain(){
                const Domain = document.getElementById("EditPingerDomainInput").value;

                console.log("not implemented uwu" + Domain)
            }
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //delete domain
            const DeletePingerContainer = document.createElement("div");
            DeletePingerContainer.style.position = "absolute";
            DeletePingerContainer.style.top = 400 + (removeLetters(AccessCSSVar("--ElementPadding"))*3) + "px" ;
            DeletePingerContainer.style.left = "50%";
            DeletePingerContainer.style.transform = "translate(-50%,0)";
            DeletePingerContainer.style.width = "484px";
            DeletePingerContainer.style.height = "100px";
            DeletePingerContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
            DeletePingerContainer.style.borderRadius = AccessCSSVar("--CornerRad");
            dropshadow_ui_container.appendChild(DeletePingerContainer);
            //Delete domain header
            const DeletePingerHeader = document.createElement("div");
            DeletePingerHeader.style.position = "absolute";
            DeletePingerHeader.style.left = "50%";
            DeletePingerHeader.style.top = AccessCSSVar("--CornerRad");
            DeletePingerHeader.style.transform = "translate(-50%,0)";
            DeletePingerHeader.innerHTML = "Delete server"
            DeletePingerHeader.className = "text";
            DeletePingerHeader.style.color =AccessCSSVar("--col_bold_TXT");
            DeletePingerHeader.style.fontSize = "20";
            DeletePingerHeader.style.fontWeight = "500";
            DeletePingerContainer.appendChild(DeletePingerHeader);     

            //Delete domain tooltip
            const DeletePingerTip = document.createElement("div");
            DeletePingerTip.style.position = "absolute";
            DeletePingerTip.style.left = "0px";
            DeletePingerTip.style.textAlign = "center";
            DeletePingerTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            DeletePingerTip.style.width = "100%";
            DeletePingerTip.innerHTML = "<i>Deletes this server and all data associated with it</i>";
            DeletePingerTip.className = "text";
            DeletePingerTip.style.color =AccessCSSVar("--col_bg_div1");
            DeletePingerTip.style.fontSize = "12";
            DeletePingerTip.style.fontWeight = "200";
            DeletePingerContainer.appendChild(DeletePingerTip);
            //update timing save button
            const DeletePinger = document.createElement("div");
            DeletePinger.style.position = "absolute";
            DeletePinger.style.left  ="50%";
            DeletePinger.style.transform = "translate(-50%,0%)";
            DeletePinger.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
            DeletePinger.innerHTML = "Delete";
            DeletePinger.style.padding = AccessCSSVar("--ElementPadding");
            DeletePinger.style.borderRadius = AccessCSSVar("--CornerRad");
            DeletePinger.style.color = AccessCSSVar("--col_normalTXT");
            DeletePinger.className = "text";
            DeletePinger.style.cursor = "pointer"; 
            DeletePinger.style.userSelect = "none";
            DeletePinger.style.backgroundColor = "Red";
            DeletePinger.addEventListener("click",function(){
                DeleteServer();
            });  
            DeletePingerContainer.appendChild(DeletePinger);
            function DeleteServer(){
                console.log("not implemented uwu")
            }
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////


            const dropshadow = document.createElement("div");
            dropshadow.style.top = "0px";
            dropshadow.style.left = "0px";
            dropshadow.style.width = "100%";
            dropshadow.style.height = "100%";
            dropshadow.style.position = "absolute";
            dropshadow.style.backgroundColor = AccessCSSVar("--col_bg_content");
            dropshadow.style.opacity = "0.7";
            dropshadow_container.appendChild(dropshadow);
            
        }
        




        clientSettings.pingerSettings.open = true;
    }
    else if(clientSettings.pingerSettings.open == true){
        //close menu
        const dropshadow_container = document.getElementById("settings_dropshadow_container");
        dropshadow_container.remove(); 
        clientSettings.settings.open = false;
        document.body.style.overflow = "auto";

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
