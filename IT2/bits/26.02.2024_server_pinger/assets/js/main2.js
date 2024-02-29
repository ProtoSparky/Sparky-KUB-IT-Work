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


function ManageSettings(){
    if(clientSettings.settings.open == false){
        //open settings

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
        SettingsHeader.innerHTML = "Settings";
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
            ManageSettings();
        });
        dropshadow_ui_container.appendChild(CloseBTN);


        // update timing container
        const UpdateTimingContainer = document.createElement("div");
        UpdateTimingContainer.style.position = "absolute";
        UpdateTimingContainer.style.top = "100px";
        UpdateTimingContainer.style.left = "50%";
        UpdateTimingContainer.style.transform = "translate(-50%,0)";
        UpdateTimingContainer.style.width = "484px";
        UpdateTimingContainer.style.height = "100px";
        UpdateTimingContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
        UpdateTimingContainer.style.borderRadius = AccessCSSVar("--CornerRad");
        dropshadow_ui_container.appendChild(UpdateTimingContainer);
        //update timing header
        const UpdateTimingHeader = document.createElement("div");
        UpdateTimingHeader.style.position = "absolute";
        UpdateTimingHeader.style.left = "50%";
        UpdateTimingHeader.style.top = AccessCSSVar("--CornerRad");
        UpdateTimingHeader.style.transform = "translate(-50%,0)";
        UpdateTimingHeader.innerHTML = "Ping Interval"
        UpdateTimingHeader.className = "text";
        UpdateTimingHeader.style.color =AccessCSSVar("--col_bold_TXT");
        UpdateTimingHeader.style.fontSize = "20";
        UpdateTimingHeader.style.fontWeight = "500";
        UpdateTimingContainer.appendChild(UpdateTimingHeader);
        //update timing tooltip
        const UpdateTimingTip = document.createElement("div");
        UpdateTimingTip.style.position = "absolute";
        UpdateTimingTip.style.left = "0px";
        UpdateTimingTip.style.textAlign = "center";
        UpdateTimingTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        UpdateTimingTip.style.width = "100%";
        UpdateTimingTip.innerHTML = "<i>Controls how often the client and backend refresh in minutes</i>";
        UpdateTimingTip.className = "text";
        UpdateTimingTip.style.color =AccessCSSVar("--col_bg_div1");
        UpdateTimingTip.style.fontSize = "12";
        UpdateTimingTip.style.fontWeight = "200";
        UpdateTimingContainer.appendChild(UpdateTimingTip);
        // update timing
        const UpdateTimingInput = document.createElement("input");
        UpdateTimingInput.style.position = "absolute";
        UpdateTimingInput.style.left = "170px";
        UpdateTimingInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        UpdateTimingInput.min = 1;
        UpdateTimingInput.max = 100;
        UpdateTimingInput.value = clientSettings.update_speed; 
        UpdateTimingInput.id = "UpdateTimingInput";
        UpdateTimingInput.style.width = "55px";
        UpdateTimingInput.type = "number";
        UpdateTimingContainer.appendChild(UpdateTimingInput);
        //update timing save button
        const UpdateTimingInputSave = document.createElement("button");
        UpdateTimingInputSave.style.position = "absolute";
        UpdateTimingInputSave.style.right  ="170px";
        UpdateTimingInputSave.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        UpdateTimingInputSave.innerHTML = "Save";
        UpdateTimingInputSave.addEventListener("click",function(){
            SaveUpdateTiming();
        });    
        UpdateTimingContainer.appendChild(UpdateTimingInputSave);
        function SaveUpdateTiming(){
            const Timing = document.getElementById("UpdateTimingInput").value;
            const Write2DB = {
                "post":{
                  "timing_control":parseInt(Timing),
                }
              };
        
            fetch(clientSettings.API.link, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Write2DB)
            })
            .then(response => response.json())
            .then(data => SaveData_update_speed(data));
        }
        function SaveData_update_speed(data){
            console.log(data);
            if(data["RETURN"] == "OK"){
                GenerateMessageBanner(0,"Timings sucessfully updated");
                ManageSettings();
                setTimeout(function() {location.reload()}, 3000);
            }
            else if(data["RETURN"] == "ERROR"){
                GenerateMessageBanner(2,"Error!");
                setTimeout(function() {
                    ManageSettings();
                    ManageSettings();// i hate that i have to do this
                    console.log("balls");
                }, 7000);
            }
        }



        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        const PingHistoryContainer = document.createElement("div");
        PingHistoryContainer.style.position = "absolute";
        PingHistoryContainer.style.top = 200 + removeLetters(AccessCSSVar("--ElementPadding")) + "px" ;
        PingHistoryContainer.style.left = "50%";
        PingHistoryContainer.style.transform = "translate(-50%,0)";
        PingHistoryContainer.style.width = "484px";
        PingHistoryContainer.style.height = "100px";
        PingHistoryContainer.style.backgroundColor = AccessCSSVar("--col_bg_content");
        PingHistoryContainer.style.borderRadius = AccessCSSVar("--CornerRad");
        dropshadow_ui_container.appendChild(PingHistoryContainer);
        //Ping history header
        const PingHistoryHeader = document.createElement("div");
        PingHistoryHeader.style.position = "absolute";
        PingHistoryHeader.style.left = "50%";
        PingHistoryHeader.style.top = AccessCSSVar("--CornerRad");
        PingHistoryHeader.style.transform = "translate(-50%,0)";
        PingHistoryHeader.innerHTML = "Ping History"
        PingHistoryHeader.className = "text";
        PingHistoryHeader.style.color =AccessCSSVar("--col_bold_TXT");
        PingHistoryHeader.style.fontSize = "20";
        PingHistoryHeader.style.fontWeight = "500";
        PingHistoryContainer.appendChild(PingHistoryHeader);
        //Ping history tooltip
        const PingHistoryTip = document.createElement("div");
        PingHistoryTip.style.position = "absolute";
        PingHistoryTip.style.left = "0px";
        PingHistoryTip.style.textAlign = "center";
        PingHistoryTip.style.top = (25 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        PingHistoryTip.style.width = "100%";
        PingHistoryTip.innerHTML = "<i>Controls how long the ping history is. Affects graphs, and other data</i>";
        PingHistoryTip.className = "text";
        PingHistoryTip.style.color =AccessCSSVar("--col_bg_div1");
        PingHistoryTip.style.fontSize = "12";
        PingHistoryTip.style.fontWeight = "200";
        PingHistoryContainer.appendChild(PingHistoryTip);
        // update tooltip
        const PingHistoryInput = document.createElement("input");
        PingHistoryInput.style.position = "absolute";
        PingHistoryInput.style.left = "170px";
        PingHistoryInput.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        PingHistoryInput.min = 3;
        PingHistoryInput.max = 400;
        PingHistoryInput.value = clientSettings.ping_history; 
        PingHistoryInput.id = "PingHistoryInput";
        PingHistoryInput.style.width = "80px";
        PingHistoryInput.type = "number";
        PingHistoryContainer.appendChild(PingHistoryInput);
        //update timing save button
        const PingHistoryInputSave = document.createElement("button");
        PingHistoryInputSave.style.position = "absolute";
        PingHistoryInputSave.style.right  ="170px";
        PingHistoryInputSave.style.top = (48 + removeLetters(AccessCSSVar("--CornerRad"))) + "px";
        PingHistoryInputSave.innerHTML = "Save";
        PingHistoryInputSave.addEventListener("click",function(){
            SavePingHistory();
        });    
        PingHistoryContainer.appendChild(PingHistoryInputSave);  
        //update 
        function SavePingHistory(){
            const Timing = document.getElementById("PingHistoryInput").value;
            const Write2DB = {
                "post":{
                  "ping_history":parseInt(Timing)
                }
            };
        
            fetch(clientSettings.API.link, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Write2DB)
            })
            .then(response => response.json())
            .then(data => SaveData_ping_history(data));
        }
        function SaveData_ping_history(data){
            console.log(data);
            if(data["RETURN"] == "OK"){
                GenerateMessageBanner(0,"Ping history sucessfully updated");
                ManageSettings();
                setTimeout(function() {location.reload()}, 3000);
            }
            else if(data["RETURN"] == "ERROR"){
                GenerateMessageBanner(2,"Error!");
                setTimeout(function() {
                    ManageSettings();
                    ManageSettings();// i hate that i have to do this
                }, 7000);
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


        
        clientSettings.settings.open = true;
        
    }
    else if(clientSettings.settings.open == true){
        //close settings
        const dropshadow_container = document.getElementById("settings_dropshadow_container");
        dropshadow_container.remove(); 
        clientSettings.settings.open = false;
        document.body.style.overflow = "auto";
    }
}