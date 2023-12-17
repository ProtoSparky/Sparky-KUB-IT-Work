
var UsernamePrefix = "_usrNane";
var SantaUsername = "santa"+ UsernamePrefix;
var CurrentUserName = null; 
var UserSettingsWindowOpen = false; 
var CSSVARS = getComputedStyle(document.documentElement);
var Music = new Audio('./assets/audio/All_I_Want_for_Christmas_Is_You.mp3');
var MusicPlaying = true; 

function init(){
    const SantaAge = "1753"; 
    const SantaProfile = {
        [SantaUsername]:{
            "Age":SantaAge,
            "IsSanta":true,
            "AutoPlayMusic":true,
            "wish":{
                0:{
                    "whs_type":"abstract",
                    "whs":"christmas"
                }
            }
        }
    }

    //DataOP(3,true,"Accounts","null"); //Delete all site data

    if(DataOP(1,true,"Accounts","null") == undefined){
        console.info("init(); | Accounts empty, setting up new ones....")
        DataOP(0,true,"Accounts",SantaProfile); //set up santa's account
        
    }
    else{
        console.info("init(); | Accounts populated, skipping setup..."); 
    }

    //check if other users exist
    if(Object.keys(DataOP(1,true,"Accounts","null")).length == 1){
        // check if other acconts exist, if not, propt account creation
        const AccountWindow = document.createElement("div");
        AccountWindow.id = "AccountWindow";
        AccountWindow.style.position = "absolute";
        AccountWindow.style.left = "50%";
        AccountWindow.style.top = "50%";
        AccountWindow.style.width = "500px";
        AccountWindow.style.height = "500px";
        AccountWindow.style.transform = "translate(-50%,-50%)";
        AccountWindow.style.backgroundColor = "var(--col_bg_lighter)";
        AccountWindow.style.borderRadius = "var(--CornerRad)";

        //header |  Create your first account
        const AccountWindowHeader = document.createElement("div");
        AccountWindowHeader.innerHTML = "Create your first account";
        AccountWindowHeader.style.position = "absolute";
        AccountWindowHeader.style.top = "30px";
        AccountWindowHeader.className = "text";
        AccountWindowHeader.style.fontSize = "35";
        AccountWindowHeader.style.width = "100%";
        AccountWindowHeader.style.left = "0px";
        AccountWindowHeader.style.textAlign = "center";
        AccountWindowHeader.style.fontWeight = "500";
        AccountWindowHeader.style.color = "#f39c12";
        AccountWindowHeader.className = "text";

        const AccountWindowInputUserName = document.createElement("input");
        AccountWindowInputUserName.style.position = "absolute";
        AccountWindowInputUserName.style.top = "250px";
        AccountWindowInputUserName.style.left = "50%";
        AccountWindowInputUserName.style.transform = "translate(-50%)";
        AccountWindowInputUserName.placeholder = "Username";
        AccountWindowInputUserName.id = "AccountUserName";
        AccountWindowInputUserName.className = "text";

        const AccountWindowInputUserAge = document.createElement("input");
        AccountWindowInputUserAge.style.position = "absolute";
        AccountWindowInputUserAge.style.top = "300px";
        AccountWindowInputUserAge.style.left = "50%";
        AccountWindowInputUserAge.style.transform = "translate(-50%)";
        AccountWindowInputUserAge.placeholder = "Age";
        AccountWindowInputUserAge.id = "AccountUserAge";
        AccountWindowInputUserAge.type = "number";  
        AccountWindowInputUserAge.className = "text";
        // Add an input event listener to handle non-numeric input
        AccountWindowInputUserAge.addEventListener("input", function () {
            // Remove non-numeric characters using a regular expression
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        AccountWindowInputUserAge.min = 3;
        AccountWindowInputUserAge.max = 100;

        const AccountWindowInputSubmit = document.createElement("button");
        AccountWindowInputSubmit.style.position = "absolute";
        AccountWindowInputSubmit.style.left = "50%";
        AccountWindowInputSubmit.style.top = "350px";
        AccountWindowInputSubmit.style.transform = "translate(-50%)";
        AccountWindowInputSubmit.innerHTML = "Create Account";
        AccountWindowInputSubmit.addEventListener("click",function(){
            CreateAccount();
        });    



        //get parent window and append login window
        const content_fullScreen = document.getElementById("content-fullScreen");
        content_fullScreen.appendChild(AccountWindow); 
        AccountWindow.appendChild(AccountWindowHeader); 
        AccountWindow.appendChild(AccountWindowInputUserName); 
        AccountWindow.appendChild(AccountWindowInputUserAge);
        AccountWindow.appendChild(AccountWindowInputSubmit);

    }
    else{
        //Spawn login menu
        Login();
    }

}
function CreateAccount(){
    const AccountUserName = document.getElementById("AccountUserName").value;
    const AccountUserAge = document.getElementById("AccountUserAge").value;
    //GenerateMessageBanner(0,"Wrong password");
    if(AccountUserName != "" && AccountUserName != ""){
        //create user profile 
        const NewUserName = AccountUserName + UsernamePrefix;
        let OldUserData = DataOP(1,true,"Accounts");
        OldUserData[NewUserName] = {
            "Age":AccountUserAge,
            "IsSanta":false,
            "AutoPlayMusic":true,
            "wish":{

            }
        }
        const AccountData = DataOP(1,true,"Accounts");
        if(AccountData[NewUserName] == undefined){
            DataOP(0,true,"Accounts", OldUserData);
            console.log(DataOP(1,true,"Accounts"));
            document.getElementById("AccountWindow").remove(); 
            CurrentUserName = AccountUserName;        
            CheckWishList(CurrentUserName + UsernamePrefix);
        }
        else{
            GenerateMessageBanner(2,"Username is already used!");
        }
    }
    else{
        GenerateMessageBanner(2,"Password and age cannot be empty!");
    }
}


function CheckWishList(username){
    const SiteData = DataOP(1,true,"Accounts");

    if(Object.keys(SiteData[username]["wish"]).length == 0){
        //user has no wishes, spawn wish menu
        console.info("CheckWishList(); | User has no wishes"); 

        const WishMenu = document.createElement("div");
        WishMenu.style.position = "absolute";
        WishMenu.style.transform  ="translate(-50%,-50%)";
        WishMenu.style.top = "50%";
        WishMenu.style.left = "50%";
        WishMenu.style.width = "500px";
        WishMenu.style.height = "500px";
        WishMenu.style.backgroundColor = "var(--col_bg_lighter)";
        WishMenu.style.borderRadius  = "var(--CornerRad)";
        WishMenu.id = "WishMenu"; 

        //Header
        const WishMenuHeader = document.createElement("div");
        WishMenuHeader.innerHTML = "Enter your first wish";
        WishMenuHeader.style.position = "absolute";
        WishMenuHeader.style.top = "30px";
        WishMenuHeader.className = "text";
        WishMenuHeader.style.fontSize = "35";
        WishMenuHeader.style.width = "100%";
        WishMenuHeader.style.left = "0px";
        WishMenuHeader.style.textAlign = "center";
        WishMenuHeader.style.fontWeight = "500";
        WishMenuHeader.style.color = "#f39c12";
        
        //Seletor
        const WishMenuWishType = document.createElement("select");
        WishMenuWishType.style.position = "absolute";
        WishMenuWishType.style.top = "180px";
        WishMenuWishType.style.left = "50%";
        WishMenuWishType.style.transform = "translate(-50%)";
        WishMenuWishType.placeholder = "Wish type";
        WishMenuWishType.id = "WishType";

        const WishTypes = ["Abstract", "Material"]; 
        for(let WishPointer = 0; WishPointer < 2; WishPointer ++){
            const WishMenuWishTypeOption = document.createElement("option");
            WishMenuWishTypeOption.value = WishTypes[WishPointer];
            WishMenuWishTypeOption.innerHTML = WishTypes[WishPointer]; 
            WishMenuWishType.appendChild(WishMenuWishTypeOption);
        }
        //Selector header
        const WishMenuWishTypeHeader = document.createElement("div");
        WishMenuWishTypeHeader.style.position = "absolute";
        WishMenuWishTypeHeader.style.left = "50%";
        WishMenuWishTypeHeader.style.transform = "translate(-50%)";        
        WishMenuWishTypeHeader.style.top = "150px";
        WishMenuWishTypeHeader.style.color = "var(--col_normalTXT)";
        WishMenuWishTypeHeader.style.Classname = "text";
        WishMenuWishTypeHeader.style.fontSize = "20";
        WishMenuWishTypeHeader.innerHTML = "Enter your wish type";
        
        //Wish header
        const WishMenuWishWishHeader = document.createElement("div");
        WishMenuWishWishHeader.style.position = "absolute";
        WishMenuWishWishHeader.style.left = "50%";
        WishMenuWishWishHeader.style.transform = "translate(-50%)";        
        WishMenuWishWishHeader.style.top = "250px";
        WishMenuWishWishHeader.style.color = "var(--col_normalTXT)";
        WishMenuWishWishHeader.style.Classname = "text";
        WishMenuWishWishHeader.style.fontSize = "20";
        WishMenuWishWishHeader.innerHTML = "Enter your wish";

        //Wish input menu
        const WishMenuWishText = document.createElement("textarea")
        WishMenuWishText.style.position = "absolute";
        WishMenuWishText.style.transform = "translate(-50%)";
        WishMenuWishText.style.top = "280px";
        WishMenuWishText.style.left = "50%";
        WishMenuWishText.style.ClassName ="text";
        WishMenuWishText.placeholder = "wish";
        WishMenuWishText.ClassName = "text";
        WishMenuWishText.id = "WishText";

        //Wish save button
        const WishMenuInputSubmit = document.createElement("button");
        WishMenuInputSubmit.style.position = "absolute";
        WishMenuInputSubmit.style.left = "50%";
        WishMenuInputSubmit.style.top = "400px";
        WishMenuInputSubmit.style.transform = "translate(-50%)";
        WishMenuInputSubmit.innerHTML = "Save wish";
        WishMenuInputSubmit.addEventListener("click",function(){
            SaveWish();
        }); 

        
        WishMenu.appendChild(WishMenuWishText);
        WishMenu.appendChild(WishMenuWishWishHeader); 
        WishMenu.appendChild(WishMenuWishTypeHeader); 
        WishMenu.appendChild(WishMenuWishType); 
        WishMenu.appendChild(WishMenuHeader);
        WishMenu.appendChild(WishMenuInputSubmit);
        document.body.appendChild(WishMenu);
        
    }
    else{
        //spawn list of wishes and wish menu

        //Replace full screen content window with content window and top bar
        document.getElementById("content-fullScreen").remove();
        const Content = document.createElement("div");
        Content.id = "content";
        const TopBar = document.createElement("div");
        TopBar.id ="topbar";
        document.body.appendChild(Content);
        document.body.appendChild(TopBar);
        const CurrentUserData = DataOP(1,true,"Accounts")[CurrentUserName + UsernamePrefix];
        if(CurrentUserName + UsernamePrefix != SantaUsername){
            //Normal users

            //Create table area        
            const WishTableArea = document.createElement("div");
            WishTableArea.style.position = "absolute";
            WishTableArea.style.transform  ="translate(-50%,-50%)";
            WishTableArea.style.top = "55%";
            WishTableArea.style.left = "50%";
            WishTableArea.style.width = "800px";
            WishTableArea.style.height = "500px";
            WishTableArea.style.backgroundColor = "var(--col_bg_lighter)";
            WishTableArea.style.borderRadius  = "var(--CornerRad)";
            WishTableArea.id = "WishTableArea"; 
            Content.appendChild(WishTableArea);

            //Create table with text
            const WishTable = document.createElement("table");
            WishTable.style.position = "absolute";
            WishTable.style.width = "100%";
            const CurrentUserWishes = CurrentUserData["wish"];
            const CurrentUserWishesAmount = Object.keys(CurrentUserWishes).length; 

            const TableHeader = document.createElement("tr");
            const TableHeaderWishType = document.createElement("th");
            TableHeaderWishType.innerHTML = "Wish type";
            const TableHeaderWish = document.createElement("th");
            TableHeaderWish.innerHTML = "Wish";
            TableHeader.appendChild(TableHeaderWishType);
            TableHeader.appendChild(TableHeaderWish);
            WishTable.appendChild(TableHeader);
            for(let WishPointer = 0; WishPointer < CurrentUserWishesAmount; WishPointer++){
                const CurrentDataName = Object.keys(CurrentUserWishes)[WishPointer];
                const CurrentData = CurrentUserData["wish"][CurrentDataName];  
                const TableRow = document.createElement("tr");
                const TableRowWishType = document.createElement("td");
                TableRowWishType.innerHTML = CurrentData["wishtype"];            
                const TableRowWish = document.createElement("td");
                TableRowWish.innerHTML =  CurrentData["wishname"];

                TableRow.appendChild(TableRowWishType);
                TableRow.appendChild(TableRowWish);
                WishTable.appendChild(TableRow); 

            }
            WishTableArea.appendChild(WishTable);

            //Extends table background to match table height. Changes body background color to same as content
            if(WishTableArea.offsetHeight < WishTable.offsetHeight){
                WishTableArea.style.height = WishTable.offsetHeight + "px";
                document.body.style.backgroundColor = "var(--col_bg_content)";
            }
            
        }
        else{
            //Santa username
            console.log("user logged in with santa account");
            const AllUserDataWithoutSanta = DataOP(1,true,"Accounts");
            delete AllUserDataWithoutSanta[SantaUsername];
            const UserAccountNames = Object.keys(AllUserDataWithoutSanta);
            const UserAccountAmount = UserAccountNames.length; 
            let Lastheightvalue = "20"; 
            for(let UserAccountArrayPointer = 0;UserAccountArrayPointer < UserAccountAmount;UserAccountArrayPointer ++ ){
                //loop iterates trough all accounts except
                const CurrentUserAccountname = UserAccountNames[UserAccountArrayPointer];

                //Create table area        
                const WishTableArea = document.createElement("div");
                WishTableArea.style.position = "absolute";
                WishTableArea.style.transform  ="translate(-50%,0)";
                WishTableArea.style.top = Lastheightvalue;
                WishTableArea.style.left = "50%";
                WishTableArea.style.width = "800px";
                WishTableArea.style.height = "500px";
                WishTableArea.style.backgroundColor = "var(--col_bg_lighter)";
                WishTableArea.style.borderRadius  = "var(--CornerRad)";
                WishTableArea.id = "WishTableArea" + UserAccountArrayPointer; 
                Content.appendChild(WishTableArea);

                //Create table with text
                const WishTable = document.createElement("table");
                WishTable.style.position = "absolute";
                WishTable.style.width = "100%";
                const CurrentUserWishes = AllUserDataWithoutSanta[CurrentUserAccountname]["wish"];
                const CurrentUserWishesAmount = Object.keys(CurrentUserWishes).length; 

                const TableHeader = document.createElement("tr");
                const TableHeaderWishType = document.createElement("th");
                TableHeaderWishType.innerHTML = "Wish type";
                const TableHeaderWish = document.createElement("th");
                TableHeaderWish.innerHTML = "Wish";
                TableHeader.appendChild(TableHeaderWishType);
                TableHeader.appendChild(TableHeaderWish);
                WishTable.appendChild(TableHeader);
                for(let WishPointer = 0; WishPointer < CurrentUserWishesAmount; WishPointer++){
                    const CurrentDataName = Object.keys(CurrentUserWishes)[WishPointer];
                    const CurrentData = AllUserDataWithoutSanta[CurrentUserAccountname]["wish"][CurrentDataName];  
                    const TableRow = document.createElement("tr");
                    const TableRowWishType = document.createElement("td");
                    TableRowWishType.innerHTML = CurrentData["wishtype"];            
                    const TableRowWish = document.createElement("td");
                    TableRowWish.innerHTML =  CurrentData["wishname"];

                    TableRow.appendChild(TableRowWishType);
                    TableRow.appendChild(TableRowWish);
                    WishTable.appendChild(TableRow); 

                }
                WishTableArea.appendChild(WishTable);

                //Create table caption for username

                const WishTableAreaCaption = document.createElement("caption");
                WishTableAreaCaption.style.color = "var(--col_bold_TXT)";
                WishTableAreaCaption.className = "text";
                WishTableAreaCaption.innerHTML = "Username: " + GetStringBetween(CurrentUserAccountname,"",UsernamePrefix) + " | Age: " + AllUserDataWithoutSanta[CurrentUserAccountname]["Age"];
                WishTable.appendChild(WishTableAreaCaption);


                //Extends table background to match table height. Changes body background color to same as content
                if(WishTableArea.offsetHeight < WishTable.offsetHeight){
                    WishTableArea.style.height = WishTable.offsetHeight + "px";
                }
                document.body.style.backgroundColor = "var(--col_bg_content)";
                //Sets next table to top + offset of last table so they dont stack ontop of eachother
                Lastheightvalue = parseInt(WishTableArea.offsetHeight) + parseInt(WishTableArea.offsetTop) + 20+  "px"; 
                
    

                             
            }


        }

        //Spawn new wish button
        const NewWishBTN = document.createElement("button");
        NewWishBTN.style.position = "absolute";
        NewWishBTN.style.top = "50%";
        NewWishBTN.style.transform = "translate(0,-50%)";
        NewWishBTN.style.width = "100px";
 
        NewWishBTN.style.right = "var(--ElementPadding)";
        NewWishBTN.innerHTML = "Add wish";

        NewWishBTN.addEventListener("click",function(){
            NewWishMenu();
        });
        TopBar.appendChild(NewWishBTN);

        //spawn account settings

        const AccountSettings = document.createElement("button");
        AccountSettings.style.position = "absolute";
        AccountSettings.style.transform = "translate(0,-50%)";
        AccountSettings.style.top = "50%";
        AccountSettings.style.left = "var(--ElementPadding)";
        AccountSettings.style.padding = "var(--ElementPadding)";
        AccountSettings.style.width = "120px";
        AccountSettings.style.height = "32px";
        AccountSettings.addEventListener("click", function(){
            ShowUserSettings(); 
        })

        //account settings img
        const AccountSettingsIMG = document.createElement("img")
        AccountSettingsIMG.src = "./assets/img/account.svg";
        AccountSettingsIMG.style.position = "absolute";
        AccountSettingsIMG.style.left = "var(--ElementPadding)";
        AccountSettingsIMG.style.top = "50%";
        AccountSettingsIMG.style.transform = "translate(0,-50%)";
        AccountSettingsIMG.style.height = "32px"; 
        AccountSettingsIMG.style.width = "auto";
        AccountSettingsIMG.style.filter = "invert()";


        //account settings text
        const AccountSettingsTXT = document.createElement("div");
        AccountSettingsTXT.style.position = "absolute";
        AccountSettingsTXT.style.left = "45px";
        AccountSettingsTXT.innerHTML = "Settings";
        AccountSettingsTXT.className = "text";
        AccountSettingsTXT.style.color = "var(--col_normalTXT)";
        AccountSettingsTXT.style.top = "50%";
        AccountSettingsTXT.style.transform = "translate(0,-50%)";

        TopBar.appendChild(AccountSettings);
        AccountSettings.appendChild(AccountSettingsIMG);
        AccountSettings.appendChild(AccountSettingsTXT); 


    }
}

function ShowUserSettings(){
    if(!UserSettingsWindowOpen){
        //Open User settings window
        UserSettingsWindowOpen = true; 

        //Window
        const UserSettingsWindow = document.createElement("div");
        UserSettingsWindow.id = "UserSettingsWindow";
        UserSettingsWindow.style.position = "absolute";
        UserSettingsWindow.style.top = "0px";
        UserSettingsWindow.style.left = "0px";
        UserSettingsWindow.style.width = "300px";
        UserSettingsWindow.style.height = "100%";
        UserSettingsWindow.style.backgroundColor = "var(--col_bg_lighter)";

        //Visual divider 
        const UserSettingsWindowDivider = document.createElement("div");
        UserSettingsWindowDivider.style.position = "absolute";
        UserSettingsWindowDivider.style.left = "0px";
        UserSettingsWindowDivider.style.width = "100%";
        UserSettingsWindowDivider.style.height = "1px";
        UserSettingsWindowDivider.style.backgroundColor = "var(--col_bg_div1)";
        UserSettingsWindowDivider.style.filter = "opacity(50%)";


        //Username and username icon
        const UserNameArea = document.createElement("div");
        UserNameArea.style.userSelect = "none";
        UserNameArea.style.position = "absolute";
        UserNameArea.style.padding = "var(--ElementPadding)";    
        UserNameArea.style.backgroundColor = "var(--col_bg_content)";
        UserNameArea.style.width = parseInt(UserSettingsWindow.style.width) - (20 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2))  + "px";
        UserNameArea.style.height = 32 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2) + "px";
        UserNameArea.style.left = "10px";
        UserNameArea.style.top = "30px"; 
        UserNameArea.style.borderRadius = "var(--CornerRad)";
        const UserNameAreaIcon = document.createElement("img");
        UserNameAreaIcon.style.position = "absolute";
        UserNameAreaIcon.style.top = "50%";
        UserNameAreaIcon.style.transform = "translate(0,-50%)";
        UserNameAreaIcon.style.left = "var(--ElementPadding)";
        UserNameAreaIcon.src = "./assets/img/account.svg";
        UserNameAreaIcon.style.height = "32px";
        UserNameAreaIcon.style.width = "auto";
        UserNameAreaIcon.style.filter = "invert()";
        const UserNameAreaName = document.createElement("div");
        UserNameAreaName.style.position = "absolute";
        UserNameAreaName.style.top = "50%";
        UserNameAreaName.style.transform = "translate(0,-50%)";
        UserNameAreaName.style.left = parseInt(CSSVARS.getPropertyValue('--ElementPadding')) + 32 + "px";
        UserNameAreaName.className = "text";
        UserNameAreaName.innerHTML = CurrentUserName;
        UserNameAreaName.style.color = "var(--col_normalTXT)";
        
        //user logout button
        const UserLogoutArea = document.createElement("div");
        UserLogoutArea.style.userSelect = "none";
        UserLogoutArea.style.position = "absolute";
        UserLogoutArea.style.padding = "var(--ElementPadding)";
        UserLogoutArea.style.width = parseInt(UserSettingsWindow.style.width) - (20 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2))  + "px";
        UserLogoutArea.style.height = 32 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2) + "px";
        UserLogoutArea.style.left = "10px";
        UserLogoutArea.style.borderRadius = "var(--CornerRad)";   
        UserLogoutArea.style.top = 30 + (32 + parseInt(AccessCSSVar("--ElementPadding"))) + parseInt(AccessCSSVar("--ElementPadding")) * 4 + "px"; 
        UserLogoutArea.style.cursor = "pointer";
        UserLogoutArea.addEventListener("click",function(){
            Login();
            UserSettingsWindowOpen = false; 
        });
        UserLogoutArea.id = "Fade2red";        
        
        const UserLogoutAreaIcon = document.createElement("img"); 
        UserLogoutAreaIcon.style.position = "absolute";
        UserLogoutAreaIcon.style.top = "50%";
        UserLogoutAreaIcon.style.transform = "translate(0,-50%)";
        UserLogoutAreaIcon.style.left = "var(--ElementPadding)";
        UserLogoutAreaIcon.src = "./assets/img/logout.svg";
        UserLogoutAreaIcon.style.height = "32px";
        UserLogoutAreaIcon.style.width = "auto";
        UserLogoutAreaIcon.style.filter = "invert()";
        const UserLogoutAreaText = document.createElement("div");
        UserLogoutAreaText.style.position = "absolute";
        UserLogoutAreaText.style.top = "50%";
        UserLogoutAreaText.style.transform = "translate(0,-50%)";
        UserLogoutAreaText.style.left = parseInt(CSSVARS.getPropertyValue('--ElementPadding')) + 32 + "px";
        UserLogoutAreaText.className = "text";
        UserLogoutAreaText.innerHTML = "Logout";
        UserLogoutAreaText.style.color = "var(--col_normalTXT)";

        //Delete user data
        const UserDeleteDataArea = document.createElement("div");
        UserDeleteDataArea.style.userSelect = "none";
        UserDeleteDataArea.style.position = "absolute";
        UserDeleteDataArea.style.padding = "var(--ElementPadding)";    
        UserDeleteDataArea.id = "Fade2red";
        UserDeleteDataArea.style.width = parseInt(UserSettingsWindow.style.width) - (20 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2))  + "px";
        UserDeleteDataArea.style.height = 32 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2) + "px";
        UserDeleteDataArea.style.left = "10px";
        UserDeleteDataArea.style.bottom = "102px"; 
        UserDeleteDataArea.style.borderRadius = "var(--CornerRad)"; 
        UserDeleteDataArea.style.cursor = "pointer";
        UserDeleteDataArea.addEventListener("click",function(){
            DeleteAccount(CurrentUserName + UsernamePrefix);
        });
        const UserDeleteDataIcon = document.createElement("img");
        UserDeleteDataIcon.style.position = "absolute";
        UserDeleteDataIcon.style.top = "50%";
        UserDeleteDataIcon.style.transform = "translate(0,-50%)";
        UserDeleteDataIcon.style.left = "var(--ElementPadding)";
        UserDeleteDataIcon.src = "./assets/img/delete-forever.svg";
        UserDeleteDataIcon.style.height = "32px";
        UserDeleteDataIcon.style.width = "auto";
        UserDeleteDataIcon.style.filter = "invert(47%) sepia(64%) saturate(7415%) hue-rotate(340deg) brightness(97%) contrast(127%)";        
        const UserDeleteDataText = document.createElement("div");
        UserDeleteDataText.style.position = "absolute";
        UserDeleteDataText.style.top = "50%";
        UserDeleteDataText.style.transform = "translate(0,-50%)";
        UserDeleteDataText.style.left = parseInt(CSSVARS.getPropertyValue('--ElementPadding')) + 32 + "px";
        UserDeleteDataText.className = "text";
        UserDeleteDataText.innerHTML = "Delete user account";
        UserDeleteDataText.style.color = "var(--col_normalTXT)";

        //Delete all site data
        const SiteDeleteDataArea = document.createElement("div");
        SiteDeleteDataArea.style.position = "absolute";
        SiteDeleteDataArea.style.padding = "var(--ElementPadding)";    
        SiteDeleteDataArea.style.width = parseInt(UserSettingsWindow.style.width) - (20 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2))  + "px";
        SiteDeleteDataArea.style.height = 32 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2) + "px";
        SiteDeleteDataArea.style.left = "10px";
        SiteDeleteDataArea.style.bottom = "30px"; 
        SiteDeleteDataArea.style.borderRadius = "var(--CornerRad)"; 
        SiteDeleteDataArea.id = "Fade2red";
        SiteDeleteDataArea.style.cursor = "pointer"
        SiteDeleteDataArea.style.userSelect = "none";
        SiteDeleteDataArea.addEventListener("click",function(){
            DataOP(3,true,"Accounts","null");
            GenerateMessageBanner(1,"All site data cleared! Reloading in 3s");
            setTimeout(function() {
                location.reload();
            }, 3000);            
        });       
        const SiteDeleteDataIcon = document.createElement("img");
        SiteDeleteDataIcon.style.position = "absolute";
        SiteDeleteDataIcon.style.top = "50%";
        SiteDeleteDataIcon.style.transform = "translate(0,-50%)";
        SiteDeleteDataIcon.style.left = "var(--ElementPadding)";
        SiteDeleteDataIcon.src = "./assets/img/delete-forever.svg";
        SiteDeleteDataIcon.style.height = "32px";
        SiteDeleteDataIcon.style.width = "auto";
        SiteDeleteDataIcon.style.filter = "invert(47%) sepia(64%) saturate(7415%) hue-rotate(340deg) brightness(97%) contrast(127%)";    
        const SiteDeleteDataText = document.createElement("div");
        SiteDeleteDataText.style.position = "absolute";
        SiteDeleteDataText.style.top = "50%";
        SiteDeleteDataText.style.transform = "translate(0,-50%)";
        SiteDeleteDataText.style.left = parseInt(CSSVARS.getPropertyValue('--ElementPadding')) + 32 + "px";
        SiteDeleteDataText.className = "text";
        SiteDeleteDataText.innerHTML = "Delete all site data";
        SiteDeleteDataText.style.color = "var(--col_normalTXT)";        


        //Music control
        const MusicControlArea = document.createElement("div");
        MusicControlArea.style.position = "absolute";
        MusicControlArea.style.padding = "var(--ElementPadding)";    
        MusicControlArea.style.width = parseInt(UserSettingsWindow.style.width) - (20 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2))  + "px";
        MusicControlArea.style.height = 32 + (parseInt(CSSVARS.getPropertyValue('--ElementPadding')) * 2) + "px";
        MusicControlArea.style.left = "10px";
        MusicControlArea.style.top = 30 + (32 + parseInt(AccessCSSVar("--ElementPadding"))) + parseInt(AccessCSSVar("--ElementPadding")) + (32 + parseInt(AccessCSSVar("--ElementPadding"))) + parseInt(AccessCSSVar("--ElementPadding"))* 7 + "px"; 
        MusicControlArea.style.borderRadius = "var(--CornerRad)"; 
        MusicControlArea.style.userSelect = "none";
        MusicControlArea.style.backgroundColor = "var(--col_bg_content)";
        MusicControlArea.style.cursor = "pointer";
        MusicControlArea.addEventListener("click",function(){
            MusicControl();    
            ShowUserSettings();
            ShowUserSettings();      
        });
        const MusicControlAreaIcon = document.createElement("img");
        MusicControlAreaIcon.style.position = "absolute";
        MusicControlAreaIcon.style.top = "50%";
        MusicControlAreaIcon.style.transform = "translate(0,-50%)";
        MusicControlAreaIcon.style.left = "var(--ElementPadding)";
        if(MusicPlaying){
            MusicControlAreaIcon.src = "./assets/img/music.svg";
        }
        else{
            MusicControlAreaIcon.src = "./assets/img/music-off.svg";
        }
        MusicControlAreaIcon.style.height = "32px";
        MusicControlAreaIcon.style.width = "auto";
        MusicControlAreaIcon.style.filter = "invert()";  
        const MusicControlAreaText = document.createElement("div");
        MusicControlAreaText.style.position = "absolute";
        MusicControlAreaText.style.top = "50%";
        MusicControlAreaText.style.transform = "translate(0,-50%)";
        MusicControlAreaText.style.left = parseInt(CSSVARS.getPropertyValue('--ElementPadding')) + 32 + "px";
        MusicControlAreaText.className = "text";
        if(MusicPlaying){
            MusicControlAreaText.innerHTML = "Start music playback";
        }
        else{
            MusicControlAreaText.innerHTML = "Stop music playback";
        }
        MusicControlAreaText.style.color = "var(--col_normalTXT)";  


        document.getElementById("content").appendChild(UserSettingsWindow);
        UserSettingsWindow.appendChild(UserSettingsWindowDivider);
        UserSettingsWindow.appendChild(UserNameArea);
        UserNameArea.appendChild(UserNameAreaIcon);
        UserNameArea.appendChild(UserNameAreaName); 
        UserSettingsWindow.appendChild(UserLogoutArea); 
        UserLogoutArea.appendChild(UserLogoutAreaIcon);
        UserLogoutArea.appendChild(UserLogoutAreaText);
        UserSettingsWindow.appendChild(UserDeleteDataArea);
        UserDeleteDataArea.appendChild(UserDeleteDataIcon);
        UserDeleteDataArea.appendChild(UserDeleteDataText);
        UserSettingsWindow.appendChild(SiteDeleteDataArea);
        SiteDeleteDataArea.appendChild(SiteDeleteDataIcon); 
        SiteDeleteDataArea.appendChild(SiteDeleteDataText);
        UserSettingsWindow.appendChild(MusicControlArea);
        MusicControlArea.appendChild(MusicControlAreaIcon);
        MusicControlArea.appendChild(MusicControlAreaText);
        
    }   
    else{
        //Close user settings window
        UserSettingsWindowOpen = false; 
        if(document.getElementById("UserSettingsWindow") != undefined){
            document.getElementById("UserSettingsWindow").remove();
        }
        else{
            console.error("ShowUserSettings | UserSettingsWindowOpen is for some reason true but element does not exist")
            document.getElementById("UserSettingsWindow").remove();
        }

    }
}


function DeleteAccount(UserName){
    const OldUserData = DataOP(1,true,"Accounts");
    delete OldUserData[UserName];
    console.log(OldUserData);
    DataOP(0,true,"Accounts",OldUserData);
    GenerateMessageBanner(1,"User deleted! Reloading in 3s");
    setTimeout(function() {
        location.reload();
    }, 3000);   
}

function Login(){

    const topbar = document.getElementById("topbar");
    const content = document.getElementById("content");
    const contentfullScreen = document.getElementById("content-fullScreen"); 
    if(topbar != undefined){
        topbar.remove();
    }
    if(content != undefined){
        content.remove();
    }
    if(contentfullScreen != undefined){
        contentfullScreen.remove();
    }
    const content_fullScreenWindow = document.createElement("div");
    content_fullScreenWindow.id = "content-fullScreen";
    document.body.appendChild(content_fullScreenWindow);
    CurrentUserName = null;     

    const AccountWindow = document.createElement("div");
    AccountWindow.id = "AccountWindow";
    AccountWindow.style.position = "absolute";
    AccountWindow.style.left = "50%";
    AccountWindow.style.top = "50%";
    AccountWindow.style.width = "500px";
    AccountWindow.style.height = "500px";
    AccountWindow.style.transform = "translate(-50%,-50%)";
    AccountWindow.style.backgroundColor = "var(--col_bg_lighter)";
    AccountWindow.style.borderRadius = "var(--CornerRad)";

    //header |  Create your first account
    const AccountWindowHeader = document.createElement("div");
    AccountWindowHeader.innerHTML = "Login";
    AccountWindowHeader.style.position = "absolute";
    AccountWindowHeader.style.top = "30px";
    AccountWindowHeader.className = "text";
    AccountWindowHeader.style.fontSize = "35";
    AccountWindowHeader.style.width = "100%";
    AccountWindowHeader.style.left = "0px";
    AccountWindowHeader.style.textAlign = "center";
    AccountWindowHeader.style.fontWeight = "500";
    AccountWindowHeader.style.color = "#f39c12";
    AccountWindowHeader.className = "text";

    const AccountWindowInputUserName = document.createElement("input");
    AccountWindowInputUserName.style.position = "absolute";
    AccountWindowInputUserName.style.top = "250px";
    AccountWindowInputUserName.style.left = "50%";
    AccountWindowInputUserName.style.transform = "translate(-50%)";
    AccountWindowInputUserName.placeholder = "Username";
    AccountWindowInputUserName.id = "AccountUserName";
    AccountWindowInputUserName.className = "text";

    const AccountWindowInputSubmit = document.createElement("button");
    AccountWindowInputSubmit.style.position = "absolute";
    AccountWindowInputSubmit.style.left = "50%";
    AccountWindowInputSubmit.style.top = "350px";
    AccountWindowInputSubmit.style.transform = "translate(-50%)";
    AccountWindowInputSubmit.innerHTML = "Login";
    AccountWindowInputSubmit.addEventListener("click",function(){
        CheckAccount();
    }); 

    //Add create account option
    const AccountWindowCreateAccountText = document.createElement("div");
    AccountWindowCreateAccountText.style.position = "absolute";
    AccountWindowCreateAccountText.style.bottom = "var(--ElementPadding)";
    AccountWindowCreateAccountText.style.color = "var(--col_btn)";
    AccountWindowCreateAccountText.style.left = "50%";
    AccountWindowCreateAccountText.style.transform = "translate(-50%)";
    AccountWindowCreateAccountText.className = "text";
    AccountWindowCreateAccountText.innerHTML = "<i>Create a new account</i>";
    AccountWindowCreateAccountText.style.cursor = "pointer";

    AccountWindowCreateAccountText.addEventListener("click",function(){
        CreateAnotherAccount();
    });

    //get parent window and append login window
    const content_fullScreen = document.getElementById("content-fullScreen");
    content_fullScreen.appendChild(AccountWindow); 
    AccountWindow.appendChild(AccountWindowHeader); 
    AccountWindow.appendChild(AccountWindowInputUserName); 
    AccountWindow.appendChild(AccountWindowInputSubmit);
    AccountWindow.appendChild(AccountWindowCreateAccountText);
}
function CheckAccount(){
    const UserInput = document.getElementById("AccountUserName").value;
    const UserData = DataOP(1,true,"Accounts");
    if(UserData[UserInput+UsernamePrefix] != undefined){
        CurrentUserName = UserInput;
        CheckWishList(CurrentUserName + UsernamePrefix);
    }
    else{
        GenerateMessageBanner(2,"User does not exit. Consider making an account");
    }
    
}
function CreateAnotherAccount(){
    //remove anything else that's on the window before showing other stuff
    const topbar = document.getElementById("topbar");
    const content = document.getElementById("content");
    const contentfullScreen = document.getElementById("content-fullScreen"); 
    if(topbar != undefined){
        topbar.remove();
    }
    if(content != undefined){
        content.remove();
    }
    if(contentfullScreen != undefined){
        contentfullScreen.remove();
    }
    const content_fullScreenWindow = document.createElement("div");
    content_fullScreenWindow.id = "content-fullScreen";
    document.body.appendChild(content_fullScreenWindow)
    //remove anything else that's on the window before showing other stuff

    const AccountWindow = document.createElement("div");
    AccountWindow.id = "AccountWindow";
    AccountWindow.style.position = "absolute";
    AccountWindow.style.left = "50%";
    AccountWindow.style.top = "50%";
    AccountWindow.style.width = "500px";
    AccountWindow.style.height = "500px";
    AccountWindow.style.transform = "translate(-50%,-50%)";
    AccountWindow.style.backgroundColor = "var(--col_bg_lighter)";
    AccountWindow.style.borderRadius = "var(--CornerRad)";

    //header |  Create your first account
    const AccountWindowHeader = document.createElement("div");
    AccountWindowHeader.innerHTML = "Create an account";
    AccountWindowHeader.style.position = "absolute";
    AccountWindowHeader.style.top = "30px";
    AccountWindowHeader.className = "text";
    AccountWindowHeader.style.fontSize = "35";
    AccountWindowHeader.style.width = "100%";
    AccountWindowHeader.style.left = "0px";
    AccountWindowHeader.style.textAlign = "center";
    AccountWindowHeader.style.fontWeight = "500";
    AccountWindowHeader.style.color = "#f39c12";
    AccountWindowHeader.className = "text";

    const AccountWindowInputUserName = document.createElement("input");
    AccountWindowInputUserName.style.position = "absolute";
    AccountWindowInputUserName.style.top = "250px";
    AccountWindowInputUserName.style.left = "50%";
    AccountWindowInputUserName.style.transform = "translate(-50%)";
    AccountWindowInputUserName.placeholder = "Username";
    AccountWindowInputUserName.id = "AccountUserName";
    AccountWindowInputUserName.className = "text";

    const AccountWindowInputUserAge = document.createElement("input");
    AccountWindowInputUserAge.style.position = "absolute";
    AccountWindowInputUserAge.style.top = "300px";
    AccountWindowInputUserAge.style.left = "50%";
    AccountWindowInputUserAge.style.transform = "translate(-50%)";
    AccountWindowInputUserAge.placeholder = "Age";
    AccountWindowInputUserAge.id = "AccountUserAge";
    AccountWindowInputUserAge.type = "number";  
    AccountWindowInputUserAge.className = "text";
    // Add an input event listener to handle non-numeric input
    AccountWindowInputUserAge.addEventListener("input", function () {
        // Remove non-numeric characters using a regular expression
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    AccountWindowInputUserAge.min = 3;
    AccountWindowInputUserAge.max = 100;

    const AccountWindowInputSubmit = document.createElement("button");
    AccountWindowInputSubmit.style.position = "absolute";
    AccountWindowInputSubmit.style.left = "50%";
    AccountWindowInputSubmit.style.top = "350px";
    AccountWindowInputSubmit.style.transform = "translate(-50%)";
    AccountWindowInputSubmit.innerHTML = "Create Account";
    AccountWindowInputSubmit.addEventListener("click",function(){
        CreateAccount();
    });   
    
    //Exit to login button
    const AccountWindowInputExit = document.createElement("img");
    AccountWindowInputExit.src = "./assets/img/close.svg";
    AccountWindowInputExit.style.width = "30px";
    AccountWindowInputExit.style.height = "auto";
    AccountWindowInputExit.style.position = "absolute";
    AccountWindowInputExit.style.top = "var(--ElementPadding)";
    AccountWindowInputExit.style.right = "var(--ElementPadding)";
    AccountWindowInputExit.style.filter = "invert()";
    AccountWindowInputExit.style.cursor="pointer";
    AccountWindowInputExit.addEventListener("click",function(){
        Login();
    });



    //get parent window and append login window
    const content_fullScreen = document.getElementById("content-fullScreen");
    content_fullScreen.appendChild(AccountWindow); 
    AccountWindow.appendChild(AccountWindowHeader); 
    AccountWindow.appendChild(AccountWindowInputUserName); 
    AccountWindow.appendChild(AccountWindowInputUserAge);
    AccountWindow.appendChild(AccountWindowInputSubmit);
    AccountWindow.appendChild(AccountWindowInputExit);
}



function NewWishMenu(){
    //Remove user's wish table
    document.getElementById("content").remove();
    document.getElementById("topbar").remove();
    const newBG = document.createElement("div");
    newBG.id = "content-fullScreen";
    document.body.appendChild(newBG);

    const WishMenu = document.createElement("div");
    WishMenu.style.position = "absolute";
    WishMenu.style.transform  ="translate(-50%,-50%)";
    WishMenu.style.top = "50%";
    WishMenu.style.left = "50%";
    WishMenu.style.width = "500px";
    WishMenu.style.height = "500px";
    WishMenu.style.backgroundColor = "var(--col_bg_lighter)";
    WishMenu.style.borderRadius  = "var(--CornerRad)";
    WishMenu.id = "WishMenu"; 

    //Header
    const WishMenuHeader = document.createElement("div");
    WishMenuHeader.innerHTML = "Enter your wish";
    WishMenuHeader.style.position = "absolute";
    WishMenuHeader.style.top = "30px";
    WishMenuHeader.className = "text";
    WishMenuHeader.style.fontSize = "35";
    WishMenuHeader.style.width = "100%";
    WishMenuHeader.style.left = "0px";
    WishMenuHeader.style.textAlign = "center";
    WishMenuHeader.style.fontWeight = "500";
    WishMenuHeader.style.color = "#f39c12";
    
    //Seletor
    const WishMenuWishType = document.createElement("select");
    WishMenuWishType.style.position = "absolute";
    WishMenuWishType.style.top = "180px";
    WishMenuWishType.style.left = "50%";
    WishMenuWishType.style.transform = "translate(-50%)";
    WishMenuWishType.placeholder = "Wish type";
    WishMenuWishType.id = "WishType";


    const WishTypes = ["Abstract", "Material"]; 
    for(let WishPointer = 0; WishPointer < 2; WishPointer ++){
        const WishMenuWishTypeOption = document.createElement("option");
        WishMenuWishTypeOption.value = WishTypes[WishPointer];
        WishMenuWishTypeOption.innerHTML = WishTypes[WishPointer]; 
        WishMenuWishType.appendChild(WishMenuWishTypeOption);
    }

    //Selector header
    const WishMenuWishTypeHeader = document.createElement("div");
    WishMenuWishTypeHeader.style.position = "absolute";
    WishMenuWishTypeHeader.style.left = "50%";
    WishMenuWishTypeHeader.style.transform = "translate(-50%)";        
    WishMenuWishTypeHeader.style.top = "150px";
    WishMenuWishTypeHeader.style.color = "var(--col_normalTXT)";
    WishMenuWishTypeHeader.style.Classname = "text";
    WishMenuWishTypeHeader.style.fontSize = "20";
    WishMenuWishTypeHeader.innerHTML = "Enter your wish type";
    
    //Wish header
    const WishMenuWishWishHeader = document.createElement("div");
    WishMenuWishWishHeader.style.position = "absolute";
    WishMenuWishWishHeader.style.left = "50%";
    WishMenuWishWishHeader.style.transform = "translate(-50%)";        
    WishMenuWishWishHeader.style.top = "250px";
    WishMenuWishWishHeader.style.color = "var(--col_normalTXT)";
    WishMenuWishWishHeader.style.Classname = "text";
    WishMenuWishWishHeader.style.fontSize = "20";
    WishMenuWishWishHeader.innerHTML = "Enter your wish";

    //Wish input menu
    const WishMenuWishText = document.createElement("textarea")
    WishMenuWishText.style.position = "absolute";
    WishMenuWishText.style.transform = "translate(-50%)";
    WishMenuWishText.style.top = "280px";
    WishMenuWishText.style.left = "50%";
    WishMenuWishText.style.ClassName ="text";
    WishMenuWishText.placeholder = "wish";
    WishMenuWishText.ClassName = "text";
    WishMenuWishText.id = "WishText";

    //Wish save button
    const WishMenuInputSubmit = document.createElement("button");
    WishMenuInputSubmit.style.position = "absolute";
    WishMenuInputSubmit.style.left = "50%";
    WishMenuInputSubmit.style.top = "400px";
    WishMenuInputSubmit.style.transform = "translate(-50%)";
    WishMenuInputSubmit.innerHTML = "Save wish";
    WishMenuInputSubmit.addEventListener("click",function(){
        SaveWish();

        //This fix is a stupid workaround, and will probably cause issues, but eh... it works now. 
        if(UserSettingsWindowOpen){
            UserSettingsWindowOpen = false;
            ShowUserSettings();
        }
    }); 

    //Exit button
    const WishMenuExit = document.createElement("img");
    WishMenuExit.src = "./assets/img/close.svg";
    WishMenuExit.style.width = "30px";
    WishMenuExit.style.height = "auto";
    WishMenuExit.style.position = "absolute";
    WishMenuExit.style.top = "var(--ElementPadding)";
    WishMenuExit.style.right = "var(--ElementPadding)";
    WishMenuExit.style.filter = "invert()";
    WishMenuExit.style.cursor="pointer";
    WishMenuExit.addEventListener("click",function(){
        document.getElementById("WishMenu").remove();
        CheckWishList(CurrentUserName + UsernamePrefix);

        //This fix is a stupid workaround, and will probably cause issues, but eh... it works now. 
        if(UserSettingsWindowOpen){
            UserSettingsWindowOpen = false;
            ShowUserSettings();
        }
    });


    WishMenu.appendChild(WishMenuInputSubmit);
    WishMenu.appendChild(WishMenuWishText);
    WishMenu.appendChild(WishMenuWishWishHeader); 
    WishMenu.appendChild(WishMenuWishTypeHeader); 
    WishMenu.appendChild(WishMenuWishType); 
    WishMenu.appendChild(WishMenuHeader);
    WishMenu.appendChild(WishMenuExit);
    document.body.appendChild(WishMenu);
}


function SaveWish(){
    const WishType = document.getElementById("WishType").value;
    const WishText = document.getElementById("WishText").value;
    if(WishText != ""){
        //save data
        let SiteData = DataOP(1,true,"Accounts");     
        let WishTemplate = {
            "wishname":WishText,
            "wishtype":WishType
        }
        SiteData[CurrentUserName + UsernamePrefix]["wish"][Object.keys(SiteData[CurrentUserName + UsernamePrefix]["wish"]).length] = WishTemplate;
        DataOP(0,true,"Accounts",SiteData);
        document.getElementById("WishMenu").remove();
        CheckWishList(CurrentUserName + UsernamePrefix);

    }
    else{
        GenerateMessageBanner(2,"Wish cannot be empty"); 
    }
}





function GenerateMessageBanner(FeedBackState, FeedBackText){
    //Feedbackstate 0 == Green, good
    //FeedBackState 1 == yellow, warning
    //FeedbackState 2 == Red, Error
    const ColorOK = "#00d573";
    const ColorWarn = "#f39c12";
    const ColorErr = "#ff2225"; 
    const ColorFall  ="#89a6a1"; 
    const BannerTime  = 4; // s
    let CurrentBannerTime = 0; 
    

    const MessageBanner = document.createElement("div");
    MessageBanner.style.position = "absolute";
    MessageBanner.style.zIndex = "99999999";
    MessageBanner.style.top = "30px";
    MessageBanner.style.height = "30px";
    MessageBanner.style.borderRadius = "var(--CornerRad)";
    MessageBanner.style.right = "-400px";
    if(FeedBackText.length < 25){
        MessageBanner.style.width = "200px";
    }
    else{
        MessageBanner.style.width = FeedBackText.length * 10 + "px"; 
    }
    MessageBanner.id = "MessageBanner";
    const MessageBannerText = document.createElement("div");
    MessageBannerText.style.position = "absolute";
    MessageBannerText.style.top = "50%";
    MessageBannerText.style.transform = "translate(0,-50%)";
    MessageBannerText.style.width = "100%";
    MessageBannerText.style.color = "white";
    MessageBannerText.style.fontFamily = "main_font";
    MessageBannerText.style.fontWeight  ="400";
    MessageBannerText.style.padding = "var(--ElementPadding)";


    if(FeedBackState == 0){
        //good message
        MessageBanner.style.backgroundColor = ColorOK;

    }
    else if(FeedBackState == 1){
        //Warning message
        MessageBanner.style.backgroundColor = ColorWarn;
    }
    else if(FeedBackState == 2){
        //Error message
        MessageBanner.style.backgroundColor = ColorErr; 
    }
    else{
        //fallback if
        MessageBanner.style.backgroundColor = ColorFall;
    }
    MessageBannerText.innerHTML = FeedBackText; 
    MessageBanner.appendChild(MessageBannerText);
    document.body.appendChild(MessageBanner);


    MessageBanner.style.animationName = "BarMove";
    MessageBanner.style.animationDuration = "5s";
    MessageBanner.style.animationTimingFunction = "ease-in-out"


    const intervalId = setInterval(AnimateBanner, 1000);
    document.body.style.overflow = "hidden";
    function AnimateBanner(){
        CurrentBannerTime += 1;
        if(CurrentBannerTime > BannerTime){
            document.getElementById("MessageBanner").remove();
            document.body.style.overflow = "visible";
            clearInterval(intervalId);
        }

    }

}

function MusicControl(){
    if(MusicPlaying){
        //play music
        Music.play();
        MusicPlaying = false; 
    }
    else{
        //Stop music
        Music.pause();
        MusicPlaying = true; 
    }
}