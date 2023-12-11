var UsernamePrefix = "_usrNane";
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

    DataOP(3,true,"Accounts","null"); 

    if(DataOP(1,true,"Accounts","null") == undefined){
        console.info("Accounts empty, setting up new ones....")
        DataOP(0,true,"Accounts",SantaProfile); //set up santa's account
        console.log(DataOP(1,true,"Accounts","null"));
        
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

}
function CreateAccount(){
    const AccountUserName = document.getElementById("AccountUserName").value;
    const AccountUserAge = document.getElementById("AccountUserAge").value;
    GenerateMessageBanner(0,"test");

}
function GenerateMessageBanner(FeedBackState, FeedBackText){
    //Feedbackstate 0 == Green, good
    //FeedBackState 1 == yellow, warning
    //FeedbackState 2 == Red, Error
    const ColorOK = "#00d573";
    const ColorWarn = "#f39c12";
    const ColorErr = "#ff2225"; 
    const BannerTime  = 500; // ms * 10
    let CurrentBannerTime = 0; 

    const MessageBanner = document.createElement("div");
    MessageBanner.style.position = "absolute";
    MessageBanner.style.zIndex = "99999999";
    MessageBanner.style.top = "30px";
    MessageBanner.style.right = "-400px";
    MessageBanner.style.width = "200px"; 
    MessageBanner.id = "MessageBanner"; 


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
    MessageBanner.innerHTML = FeedBackText; 
    document.body.appendChild(MessageBanner);

    const intervalId = setInterval(AnimateBanner, 10);
    
    function AnimateBanner(){
        CurrentBannerTime += 1;
        if(CurrentBannerTime < BannerTime){
            let BannerPost = document.getElementById("MessageBanner");
            if(CurrentBannerTime < BannerTime / 5){
                if(parseInt(BannerPost.style.right) < 0){
                    BannerPost.style.right  = parseInt(BannerPost.style.right) + 10 + "px";
                }
            }
            else if(CurrentBannerTime < (BannerTime / 5) * 5){
                if(parseInt(BannerPost.style.right) > -400){
                    BannerPost.style.right  = parseInt(BannerPost.style.right) - 10 + "px";
                }
                
            }

        }
        else{
            document.getElementById("MessageBanner").remove();
            clearInterval(intervalId);
        }
    }

}