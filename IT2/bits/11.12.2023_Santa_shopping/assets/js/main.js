
var UsernamePrefix = "_usrNane";
var SantaUsername = "santa"+ UsernamePrefix;
var CurrentUserName = null; 
function init(){
    const SantaAge = "1753"; 
    const SantaProfile = {
        [SantaUsername]:{
            "Age":SantaAge,
            "IsSanta":true,
            "wish":{
                0:{
                    "whs_type":"abstract",
                    "whs":"christmas"
                }
            }
        }
    }

    DataOP(3,true,"Accounts","null"); //Delete all site data

    if(DataOP(1,true,"Accounts","null") == undefined){
        console.info("Accounts empty, setting up new ones....")
        DataOP(0,true,"Accounts",SantaProfile); //set up santa's account
        //console.log(DataOP(1,true,"Accounts","null"));
        
    }
    else{
        console.info("Accounts populated, skipping setup..."); 
    }

    //check if other users exist
    //console.log(Object.keys(DataOP(1,true,"Accounts","null")));
    //console.log(Object.keys(DataOP(1,true,"Accounts","null")).length);
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
        AccountWindowInputSubmit.className = "text";
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
        //TODO
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
            "wish":{

            }
        }
        DataOP(0,true,"Accounts", OldUserData);
        console.log(DataOP(1,true,"Accounts"));
        document.getElementById("AccountWindow").remove(); 
        CurrentUserName = AccountUserName;        
        CheckWishList(CurrentUserName + UsernamePrefix);
    }
    else{
        GenerateMessageBanner(2,"Password and age cannot be empty!");
    }



}


function CheckWishList(username){
    const SiteData = DataOP(1,true,"Accounts");

    if(Object.keys(SiteData[username]["wish"]).length == 0){
        //user has no wishes, spawn wish menu
        console.info("User has no wishes"); 

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
            console.log(WishTypes[WishPointer]);
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
        WishMenuInputSubmit.className = "text";
        WishMenuInputSubmit.addEventListener("click",function(){
            SaveWish();
        }); 

        WishMenu.appendChild(WishMenuInputSubmit);
        WishMenu.appendChild(WishMenuWishText);
        WishMenu.appendChild(WishMenuWishWishHeader); 
        WishMenu.appendChild(WishMenuWishTypeHeader); 
        WishMenu.appendChild(WishMenuWishType); 
        WishMenu.appendChild(WishMenuHeader);
        document.body.appendChild(WishMenu);
    }
    else{
        //spawn list of wishes and wish menu
        console.log("User has wishes!");

        //Replace full screen content window with content window and top bar
        document.getElementById("content-fullScreen").remove();
        const Content = document.createElement("div");
        Content.id = "content";
        const TopBar = document.createElement("div");
        TopBar.id ="topbar";
        document.body.appendChild(Content);
        document.body.appendChild(TopBar);
        //
        if(CurrentUserName != SantaUsername){
            //Normal users
            
        }
        else{
            //Santa username
        }

        //Create table area
        const CurrentUserData = DataOP(1,true,"Accounts")[CurrentUserName + UsernamePrefix];
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

        






    }
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
        console.log(SiteData);  
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