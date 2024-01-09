var WindSpeedMock = 0;
var ActualWindSpeed = 0;
var SliderMaxRange =  33;
var WindStatePrefix = "Vind navn: "

function init(){
    console.info("init run");

    //create area for slider

    const SliderArea = document.createElement("div");
    SliderArea.id = "SliderArea";
    SliderArea.style.position = "absolute";
    SliderArea.style.left = "0px";
    SliderArea.style.top = "0px";
    SliderArea.style.width = "500px";
    SliderArea.style.height = "100%";
    SliderArea.style.backgroundColor  ="white";
    document.getElementById("topbar").appendChild(SliderArea);

    //slider
    const SliderAreaSlider = document.createElement("input");
    SliderAreaSlider.id = "slider";
    SliderAreaSlider.type = "range";
    SliderAreaSlider.min = "0";
    SliderAreaSlider.max = SliderMaxRange;
    SliderAreaSlider.step = "0.1";
    SliderAreaSlider.value = "0";
    SliderAreaSlider.style.position ="absolute";
    SliderAreaSlider.style.left = "0px";
    SliderAreaSlider.style.top = "50%";
    SliderAreaSlider.style.width = "50%";
    SliderAreaSlider.style.transform = "translate(0,-50%)";
    SliderAreaSlider.addEventListener("input",function(){
        UpdateWind();
    }); 
    
    
    SliderArea.appendChild(SliderAreaSlider);

    //slider number
    const SliderAreaSliderNunmber = document.createElement("div");
    SliderAreaSliderNunmber.style.position = "absolute";
    SliderAreaSliderNunmber.style.top = "50%";
    SliderAreaSliderNunmber.style.left = "51%";
    SliderAreaSliderNunmber.innerHTML = WindSpeedMock;
    SliderAreaSliderNunmber.id = "windspeed"; 
    SliderAreaSliderNunmber.style.transform = "translate(0,-50%)";
    SliderArea.appendChild(SliderAreaSliderNunmber);

    const WindState = document.createElement("div");
    WindState.style.position = "absolute";
    WindState.style.top = "50%";
    WindState.style.left = "320px";
    WindState.innerHTML =WindStatePrefix;
    WindState.id  ="WindState";
    WindState.style.transform ="translate(0,-50%)";
    SliderArea.appendChild(WindState);



    //spawn mast
    const WindMillMast = document.createElement("img");
    WindMillMast.style.left = "0px";
    WindMillMast.style.position = "absolute";
    WindMillMast.src = "./assets/img/mast.png";
    WindMillMast.style.width = "auto";
    WindMillMast.style.height = "200px";

    //spawn prop
    
    const WindMillProp = document.createElement("img");
    WindMillProp.style.position = "absolute";
    WindMillProp.style.left = "10px";
    WindMillProp.src = "./assets/img/prop.png";
    WindMillProp.id = "windmillprop";     
    WindMillProp.style.zIndex = 9999;
    WindMillProp.style.width = "auto";
    WindMillProp.style.height = "150px";
    WindMillProp.style.top = "-80px";
    WindMillProp.style.animationName  ="spin";
    WindMillProp.style.animationDuration = 0 + "s";
    WindMillProp.style.animationIterationCount = "infinite";
    WindMillProp.style.animationTimingFunction = "linear";

    //windmill div
    const WindMill = document.createElement("div");
    WindMill.id ="WindMill";
    WindMill.style.position = "absolute";
    WindMill.style.bottom = "50px";
    WindMill.style.width = "200px";
    WindMill.style.right = "100px";
    WindMill.style.height = "300px";
    WindMill.style.zIndex = 99;
    
    document.getElementById("content").appendChild(WindMill);
    WindMill.appendChild(WindMillProp);
    WindMill.appendChild(WindMillMast); 

    //set background transition
    const backgroundImage = document.createElement("img");
    backgroundImage.style.position = "absolute";
    backgroundImage.style.top = "-150px";
    backgroundImage.style.left = "0px";
    backgroundImage.style.width = "100%";
    backgroundImage.style.height = "auto";
    backgroundImage.src = "./assets/img/environment_states/0.png";
    backgroundImage.style.overflow = "hidden";
    backgroundImage.id = "bgimg";
    backgroundImage.style.transition = "2s";
    document.getElementById("content").appendChild(backgroundImage);
    document.getElementById("content").style.overflow = "hidden";
}

function UpdateWind(){
    const SliderValue = document.getElementById("slider").value;
    //clamp values so windmill doesnt stop at max speed;
    if(SliderValue < SliderMaxRange- 0.1){
        WindSpeedMock = (SliderMaxRange - SliderValue);
        //let scaledSliderValue = Math.pow(SliderValue, 0.5); // square root scaling
        //WindSpeedMock = (SliderMaxRange - scaledSliderValue);
    }
    else{
        WindSpeedMock = 0.1;
    }
    ActualWindSpeed = SliderValue;     
    document.getElementById("windspeed").innerHTML = ActualWindSpeed + " m/s";
    //update windmill speed
    const WindMillProp = document.getElementById("windmillprop");
    WindMillProp.style.animationDuration =  WindSpeedMock + "s";

    //im not happy how this looks, but whatever i guess
    if(ActualWindSpeed < 0.2){
        //windstill
        document.getElementById("WindState").innerHTML = WindStatePrefix + "stille";
        document.getElementById("bgimg").src = "./assets/img/environment_states/0.png";
    }
    else if(ActualWindSpeed > 0.3 && ActualWindSpeed < 1.5){
        //smoke moves in the wind direction
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Flau vind";
        document.getElementById("bgimg").src = "./assets/img/environment_states/1.png";
    }
    else if(ActualWindSpeed > 1.6 && ActualWindSpeed < 3.3){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Svak vind";
    }
    else if(ActualWindSpeed > 3.4 && ActualWindSpeed < 5.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Lett bris";
    }
    else if(ActualWindSpeed > 5.5 && ActualWindSpeed < 7.9){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Laber bris";
    }
    else if(ActualWindSpeed > 8 && ActualWindSpeed < 10.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Frisk bris";
        document.getElementById("bgimg").src = "./assets/img/environment_states/2.png";
    }
    else if(ActualWindSpeed > 10.8 && ActualWindSpeed < 13.8){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Liten kuling";
    }
    else if(ActualWindSpeed > 13.9 && ActualWindSpeed < 17.1){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Stiv kuling";
    }
    else if(ActualWindSpeed > 17.2 && ActualWindSpeed < 20.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Sterk kuling";
    }
    else if(ActualWindSpeed > 20.8 && ActualWindSpeed < 24.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Liten storm";
        document.getElementById("bgimg").src = "./assets/img/environment_states/3.png";
    }
    else if(ActualWindSpeed > 24.5 && ActualWindSpeed < 28.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Full storm";
    }
    else if(ActualWindSpeed > 28.5 && ActualWindSpeed < 32.6){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Sterk storm";
        document.getElementById("bgimg").src = "./assets/img/environment_states/4.png";
    }
    else if(ActualWindSpeed > 32.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Orkan";
    }


}