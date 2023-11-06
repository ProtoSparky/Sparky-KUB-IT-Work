var poengsum = 0; 
var farger = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]; 


let text = ""; 
for(let i = 0; i< farger.length; i++){
    //text += farger[i] + "<br>";
    text += '<option value="'+farger[i]+'">'+farger[i]+'</option>';
}


//document.getElementById("velgfarge").value = "test";


function fargegjetting(){
    //lokal variabel
    var maskinfarge = trekkfarge();
    console.log("maskinen valgte", maskinfarge); 
    var poengsum = document.getElementById("poeng").value;
    var valgtfarge = document.getElementById("velgfarge").value; 
    console.log("valgt farge ", valgtfarge); 

    var total_poengsum = document.getElementById("total_fail_counter").value;

    if (valgtfarge == maskinfarge){
        console.log("lik farge");
        console.log("---------------------");
        poengsum = parseInt(poengsum) + 1; 
        document.getElementById("poeng").value = poengsum;
        document.getElementById("tilbakemelding").value = "You chose: " + valgtfarge + ". You don't suck!"; 
    }
    else if (valgtfarge != maskinfarge){
        console.log("feil farge"); 
        console.log("---------------------");
        poengsum = parseInt(poengsum) - 1;
        document.getElementById("poeng").value = poengsum;
        document.getElementById("tilbakemelding").value = "Skill issue";

        total_poengsum = parseInt(total_poengsum) - 1;
        document.getElementById("total_fail_counter").value = total_poengsum;
    }
    
}

function clear_color(){
    console.log("clear_points"); 
    document.getElementById("poeng").value = "0"; 
    document.getElementById("tilbakemelding").value = 'test your "luck"'; 
}

function trekkfarge(){
    //rand color generator
    var nummer = Math.floor(Math.random()*farger.length);
    var fargevalg = farger[nummer];
    document.getElementById("randomfarge").style.backgroundColor = fargevalg;   
    return fargevalg;
    

}

function update_select(){
    document.getElementById("velgfarge").innerHTML = text;  
    console.log(text);
}

