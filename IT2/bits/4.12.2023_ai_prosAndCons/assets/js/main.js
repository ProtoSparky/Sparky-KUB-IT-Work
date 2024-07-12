var DataLoc="./data/data.json";
var JsonObject = ReadJSON(DataLoc,0);
var JsonKeys = Object.keys(JsonObject);
var ChapterKey = 0;

function init(){
    console.info("init run");
    GeneratePagesFromJson(JsonObject,"Hva er KI?","ContentArea");
    SpawnNav();
    //MoveChapters(false)


}

function GeneratePagesFromJson(JsonObject,SelectedChapter,ParentID){
    //generates text in ParentID from a json file
    //example of usage
    /*
    header can be chonsen using SelectedChapter
    Can also chose tx for text or img for image. If you want text to be hyperlinked, use src:link
    If youre using img, use src for the image source. img label used for alt text on image
    "Header:{
        "0":{
            "tx":"some text",
            "class":"some class",
            "style":{
                "width":some width,
                "height":some height,
                "color":some color
            }
        },
    */
    const CurrentChapterObject = JsonObject[SelectedChapter];
    const CurrentChapterSentences = Object.keys(CurrentChapterObject);
    const CurrentChapterSentencesAmount = CurrentChapterSentences.length;
    let ParentElement = document.getElementById(ParentID);

    for(let ChapterSentencePointer = 0; ChapterSentencePointer <CurrentChapterSentencesAmount;ChapterSentencePointer++ ){
        const SelectedSentenceKey = CurrentChapterSentences[ChapterSentencePointer];
        const SelectedChapter = CurrentChapterObject[SelectedSentenceKey];

        if(SelectedChapter["img"] != undefined){
            //If element is image
            let CurrentElement = document.createElement("img");

            if(SelectedChapter["class"] != undefined){
                CurrentElement.className = SelectedChapter["class"]; 
                //Adds class to element
            }
            if(SelectedChapter["src"] != undefined){
                //Adds img source
                CurrentElement.src = SelectedChapter["src"];
            }
            if(SelectedChapter["id"] != undefined){
                CurrentElement.id = SelectedChapter["id"]; 
                //Adds id to element
            }
            if(SelectedChapter["img"] != undefined){
                CurrentElement.alt = SelectedChapter["img"]; 
                CurrentElement.title = SelectedChapter["img"]; 
                
            }
            if(SelectedChapter["style"] != undefined){
                //custom image style
                if(SelectedChapter["style"]["width"] != undefined){
                    CurrentElement.style.width = SelectedChapter["style"]["width"];
                }
                if(SelectedChapter["style"]["height"] != undefined){
                    CurrentElement.style.height = SelectedChapter["style"]["height"];
                }
                else{
                    CurrentElement.style.height = "auto";
                }                
            }
            ParentElement.appendChild(CurrentElement);
        }
        if(SelectedChapter["tx"] != undefined){
            //If element is text
            let CurrentElement = document.createElement("div");
            if(SelectedChapter["class"] != undefined){
                CurrentElement.className = SelectedChapter["class"]; 
                //Adds class to element
            }
            if(SelectedChapter["src"] != undefined){
                //Adds img source
                const CurrentElementHyperlink = document.createElement("a");
                CurrentElementHyperlink.href = SelectedChapter["src"];
                if(SelectedChapter["tx"] != undefined){
                    CurrentElementHyperlink.innerHTML = SelectedChapter["tx"]; 
                    //Adds class to element
                }
                CurrentElement.appendChild(CurrentElementHyperlink);
            }
            else{
                if(SelectedChapter["tx"] != undefined){
                    CurrentElement.innerHTML = SelectedChapter["tx"]; 
                    //Adds class to element
                }
            }
            if(SelectedChapter["id"] != undefined){
                CurrentElement.id = SelectedChapter["id"]; 
                //Adds class to element
            }
            if(SelectedChapter["style"] != undefined){
                //custom text style
                if(SelectedChapter["style"]["width"] != undefined){
                    CurrentElement.style.width = SelectedChapter["style"]["width"];
                }
                if(SelectedChapter["style"]["height"] != undefined){
                    CurrentElement.style.height = SelectedChapter["style"]["height"];
                }    
                if(SelectedChapter["style"]["color"] != undefined){
                    CurrentElement.style.color = SelectedChapter["style"]["color"]; 
                }
                if(SelectedChapter["style"]["fontsize"] != undefined){
                    CurrentElement.style.fontSize = SelectedChapter["style"]["fontsize"]; 
                }       

            }
            ParentElement.appendChild(CurrentElement);
        }

    }
    
}

function SpawnNav(){
    const NavArea = document.getElementById("topbar");
    const NavRight = document.createElement("button");
    NavRight.addEventListener("click",function(){
        MoveChapters(true);
    });
    NavRight.className="button";
    NavRight.id="RightNav";
    NavRight.innerHTML = "Next";

    const NavLeft = document.createElement("button");
    NavLeft.addEventListener("click",function(){
        MoveChapters(false);
    });
    NavLeft.innerHTML = "Back";
    NavLeft.className="button";
    NavLeft.id="LefttNav";
    NavArea.appendChild(NavLeft); 
    NavArea.appendChild(NavRight); 
}
function MoveChapters(Selector){
    if(Selector){
        if(ChapterKey < JsonKeys.length - 1){
            ChapterKey += 1;
            console.log(ChapterKey);
            const CurrentChapterNames = JsonKeys[ChapterKey]; 
            const PreviousContentArea = document.getElementById("ContentArea");
            PreviousContentArea.remove();
            const ContentArea = document.createElement("div");
            ContentArea.id="ContentArea";
            const ContentAreaParent = document.getElementById("content");
            ContentAreaParent.appendChild(ContentArea);      
            GeneratePagesFromJson(JsonObject,CurrentChapterNames,"ContentArea");
            
            //update header
            PageHeader = document.getElementById("PageHeader");
            PageHeader.innerHTML = CurrentChapterNames; 

        }
    }
    else{
        if(ChapterKey > 0){
            ChapterKey -= 1;
            console.log(ChapterKey);
            const CurrentChapterNames = JsonKeys[ChapterKey]; 
            const PreviousContentArea = document.getElementById("ContentArea");
            PreviousContentArea.remove();
            const ContentArea = document.createElement("div");
            ContentArea.id="ContentArea";
            const ContentAreaParent = document.getElementById("content");
            ContentAreaParent.appendChild(ContentArea);      
            GeneratePagesFromJson(JsonObject,CurrentChapterNames,"ContentArea");

            //update header
            PageHeader = document.getElementById("PageHeader");
            PageHeader.innerHTML = CurrentChapterNames; 
        }
    }
}