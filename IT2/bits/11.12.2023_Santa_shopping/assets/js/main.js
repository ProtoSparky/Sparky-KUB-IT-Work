
var UsernamePrefix = "_usrNane";
var CurrentUserName = null; 
function init(){
    const SantaUsername = "santa"+ UsernamePrefix;
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

        const AccountWindowInputUserName = document.createElement("input");
        AccountWindowInputUserName.style.position = "absolute";
        AccountWindowInputUserName.style.top = "250px";
        AccountWindowInputUserName.style.left = "50%";
        AccountWindowInputUserName.style.transform = "translate(-50%)";
        AccountWindowInputUserName.placeholder = "Username";
        AccountWindowInputUserName.id = "AccountUserName";

        const AccountWindowInputUserAge = document.createElement("input");
        AccountWindowInputUserAge.style.position = "absolute";
        AccountWindowInputUserAge.style.top = "300px";
        AccountWindowInputUserAge.style.left = "50%";
        AccountWindowInputUserAge.style.transform = "translate(-50%)";
        AccountWindowInputUserAge.placeholder = "Age";
        AccountWindowInputUserAge.id = "AccountUserAge";
        AccountWindowInputUserAge.type = "number";        
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
        //TODO
    }

}
function CreateAccount(){
    const AccountUserName = document.getElementById("AccountUserName").value;
    const AccountUserAge = document.getElementById("AccountUserAge").value;
    //GenerateMessageBanner(0,"Wrong password");

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


function CheckWishList (username){
    const SiteData = DataOP(1,true,"Accounts");

    if(Object.keys(SiteData[username]["wish"]).length == 0){
        //user has no wishes, spawn wish menu
        console.log("User has no wishes"); 

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
        WishMenuWishType.style.top = "250px";
        WishMenuWishType.style.left = "50%";
        WishMenuWishType.style.transform = "translate(-50%)";
        WishMenuWishType.placeholder = "Wish type";
        WishMenuWishType.id = "WishType";

        const WishTypes = ["Abstract", "Material"]
        for(let WishPointer = 0; WishPointer < 2; WishPointer ++){
            const WishMenuWishTypeOption = document.createElement("option");
            WishMenuWishTypeOption.value = WishTypes[WishPointer];
            WishMenuWishTypeOption.innerHTML = WishTypes[WishPointer]; 
            WishMenuWishType.appendChild(WishMenuWishTypeOption);
            console.log(WishTypes[WishPointer]);
        }


        WishMenu.appendChild(WishMenuWishType); 
        WishMenu.appendChild(WishMenuHeader);
        document.body.appendChild(WishMenu);
    }
    else{
        //spawn list of wishes and wish menu
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