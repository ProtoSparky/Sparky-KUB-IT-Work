var CSV_Processed = null; 
var ClientSettings ={
    "StarSigns":{

    },
    "UI":{
        "ids":{
            Main_box: "InputBox",
            content_fullscreen: "content-fullscreen",
            input: "datepicker",
        }
    }
}
function init(){
    const CSVLoc = "./SiteData/1.csv";
    const CSV = ReadAnything(CSVLoc);
    CSV_Processed = ParseCSV(CSV);

    for(let starsign_pointer = 1; starsign_pointer < CSV_Processed.length; starsign_pointer ++){
        //load all data to json file
        const current_data = CSV_Processed[starsign_pointer];
        const StartDate =  new Date(current_data[1]);   
        const EndDate = new Date(current_data[2]); 
        ClientSettings["StarSigns"][current_data[0]] = {
            StartDate:{
                Day:StartDate.getDate(),
                Month:StartDate.getMonth() + 1,
                Year:StartDate.getFullYear(),
            },
            EndDate:{
                Day:EndDate.getDate(),
                Month:EndDate.getMonth() + 1,
                Year:EndDate.getFullYear(),
            }, 
            SignInfo:current_data[3],
        };
    };

    const InputBox = document.createElement("div");
    InputBox.id = ClientSettings.UI.ids.Main_box;
    InputBox.style.position = "absolute";
    InputBox.style.top = "50%";
    InputBox.style.left = "50%";
    InputBox.style.transform = "translate(-50%,-50%)";
    InputBox.style.backgroundColor = AccessCSSVar("--col_bg_lighter");
    InputBox.style.width = "1000px";
    InputBox.style.height = "500px";
    InputBox.style.borderRadius = AccessCSSVar("--CornerRad");
    document.getElementById(ClientSettings.UI.ids.content_fullscreen).appendChild(InputBox);

    //spawn header
    InputBoxHeader = document.createElement("div");
    InputBoxHeader.style.position = "absolute";
    InputBoxHeader.style.left = "50%";
    InputBoxHeader.style.top = AccessCSSVar("--ElementPadding");
    InputBoxHeader.style.transform = "translate(-50%, 0%)";
    InputBoxHeader.innerHTML = "Input birthdate";
    InputBoxHeader.className = "text";
    InputBoxHeader.style.fontSize = "25";
    InputBoxHeader.style.color = AccessCSSVar("--col_bg_div1");
    InputBox.appendChild(InputBoxHeader);

    //spawn input
    const InputBoxInput  =document.createElement("input");
    InputBoxInput.style.position = "absolute";
    InputBoxInput.style.top = "150px";
    InputBoxInput.style.left = "50%";
    InputBoxInput.style.transform = "translate(-50%,0)";
    InputBoxInput.type = "date";
    InputBoxInput.id = ClientSettings.UI.ids.input; 
    InputBox.appendChild(InputBoxInput);

    //save btn
    const InputBoxInputSave = document.createElement("button");
    InputBoxInputSave.style.position = "absolute";
    InputBoxInputSave.style.left = "50%";
    InputBoxInputSave.style.top = "200px";
    InputBoxInputSave.style.transform = "translate(-50%, 0)";
    InputBoxInputSave.innerHTML = "Check starsign";
    InputBoxInputSave.addEventListener("click", function(){
        CheckInput();
    });
    InputBox.appendChild(InputBoxInputSave);

}
function CheckInput(){
    const InputValue = document.getElementById(ClientSettings.UI.ids.input).value;
    if(InputValue != ""){
        const inputDate = new Date(InputValue); 
        const Day = inputDate.getDate();
        const Month = inputDate.getMonth() + 1;
        let CorrectDate = null;
        
        const StarSigns = Object.keys(ClientSettings.StarSigns);
        const StarSignAmount = StarSigns.length;

        for(let StarSignPointer = 0;StarSignPointer < StarSignAmount; StarSignPointer++ ){
            const CurrentStarSign = StarSigns[StarSignPointer];
            const CurrentStarSignData = ClientSettings.StarSigns[CurrentStarSign];
            //check each sign
            
            if(CurrentStarSignData.StartDate.Month == Month){
                if(CurrentStarSignData.StartDate.Day >=Day){
                    SpawnMenu(CurrentStarSign);
                }
            }

        }

    }
    else{
        GenerateMessageBanner(2, "input cannot be empty");
    }

}
function SpawnMenu(data){
    const MenuBox = document.getElementById(ClientSettings.UI.ids.Main_box);
    MenuBox.innerHTML = "";
    
    const InputBoxHeader = document.createElement("div");
    InputBoxHeader.style.position = "absolute";
    InputBoxHeader.style.left = "50%";
    InputBoxHeader.style.top = AccessCSSVar("--ElementPadding");
    InputBoxHeader.style.transform = "translate(-50%, 0%)";
    InputBoxHeader.innerHTML = "Your Starsign is " + data;
    InputBoxHeader.className = "text";
    InputBoxHeader.style.fontSize = "25";
    InputBoxHeader.style.color = AccessCSSVar("--col_bg_div1");
    MenuBox.appendChild(InputBoxHeader);

    //Set up image
    const Image = document.createElement("img");
    Image.style.position = "absolute";
    Image.style.top = "150px";
    Image.style.left = "50%";
    Image.style.width = "200px";
    Image.style.transform = "translate(-50%, 0)";
    Image.src = "./SiteData/signs/" + data + ".png";
    Image.style.filter = "invert(66%) sepia(33%) saturate(164%) hue-rotate(120deg) brightness(91%) contrast(90%)";
    MenuBox.appendChild(Image);

    const Subtext = document.createElement("div");
    Subtext.className = "text";
    Subtext.style.position = "absolute";
    Subtext.style.top = "450px";
    Subtext.style.left = "50%";
    Subtext.style.transform = "translate(-50%, 0)";
    Subtext.innerHTML = ClientSettings.StarSigns[data].SignInfo;
    Subtext.style.color = AccessCSSVar("--col_normalTXT"); 
    MenuBox.appendChild(Subtext);

    //add close btn

    const CloseBTN = document.createElement("img");
    CloseBTN.style.position = "absolute";
    CloseBTN.style.top = "8px";
    CloseBTN.style.right = "8px";
    CloseBTN.style.width = "30px";
    CloseBTN.src = "./assets/img/icons/close.svg";
    CloseBTN.style.cursor  ="pointer";
    CloseBTN.style.filter = "invert(66%) sepia(33%) saturate(164%) hue-rotate(120deg) brightness(91%) contrast(90%)";
    CloseBTN.addEventListener("click",function(){
        location.reload();
    })
    MenuBox.appendChild(CloseBTN);

}