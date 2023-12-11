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
        AccountWindowInputUserName.style.top = "300px";
        AccountWindowInputUserName.style.left = "50%";
        AccountWindowInputUserName.style.transform = "translate(-50%)";
        AccountWindowInputUserName.placeholder = "Username";
        AccountWindowInputUserName.id = "AccountUserName";
        
    



        //get parent window and append login window
        const content_fullScreen = document.getElementById("content-fullScreen");
        content_fullScreen.appendChild(AccountWindow); 
        AccountWindow.appendChild(AccountWindowHeader); 
        AccountWindow.appendChild(AccountWindowInputUserName); 

    }

}