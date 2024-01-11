var WindSpeedMock = 0;
var ActualWindSpeed = 0;
var SliderMaxRange =  33;
var WindStatePrefix = "Vind navn: "
var SoundState = 1;
var LastSoundState = 0; 
let audioPlayer = null;

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
    WindMillMast.style.zIndex = 100;

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

    //smoke on windmill
    const WindMillSmoke = document.createElement("img");
    WindMillSmoke.id = "WindMillSmoke";
    WindMillSmoke.src = "./assets/img/dynamic/smoke.png";
    WindMillSmoke.style.position = "absolute";
    WindMillSmoke.style.width = "400px";
    WindMillSmoke.style.height = "auto";
    WindMillSmoke.style.top = "-105px";
    WindMillSmoke.style.left = "-280px";
    WindMillSmoke.style.visibility = "hidden";
    WindMill.appendChild(WindMillSmoke);

    //spawn grass
    SpawnGrass(RandomRangedIntiger(5,25));

}

function UpdateWind(){
    const SliderValue = document.getElementById("slider").value;
    //clamp values so windmill doesnt stop at max speed;
    if(SliderValue == 0){
        //clamp speed to zero
        WindSpeedMock = 0;
    }
    
    else if(SliderValue < SliderMaxRange - 0.1 && SliderValue < SliderMaxRange -5){
        WindSpeedMock = (SliderMaxRange - SliderValue)/30;
        console.log("state1| " + SliderValue);
    }
    
    else if(SliderValue > (SliderMaxRange - 5) && SliderValue < (SliderMaxRange - 0.9)){
        WindSpeedMock = (SliderMaxRange - SliderValue)/7;
        console.log("state2| " + SliderValue);
    }
    else if(SliderValue > (SliderMaxRange - 0.9)){
        console.log("state3| " + SliderValue );
        WindSpeedMock = 0.2;
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
        SetGrassState(0,WindSpeedMock);
        SoundState = 0;
    }
    else if(ActualWindSpeed > 0.3 && ActualWindSpeed < 1.5){
        //smoke moves in the wind direction
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Flau vind";
        document.getElementById("bgimg").src = "./assets/img/environment_states/1.png";
        SetGrassState(0,WindSpeedMock);
        SoundState = 0;
    }
    else if(ActualWindSpeed > 1.6 && ActualWindSpeed < 3.3){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Svak vind";
        SetGrassState(0,WindSpeedMock);
    }
    else if(ActualWindSpeed > 3.4 && ActualWindSpeed < 5.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Lett bris";
        SetGrassState(0,WindSpeedMock);
        SoundState = 1; 
    }
    else if(ActualWindSpeed > 5.5 && ActualWindSpeed < 7.9){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Laber bris";
        SetGrassState(1,WindSpeedMock);
        SoundState = 1; 
    }
    else if(ActualWindSpeed > 8 && ActualWindSpeed < 10.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Frisk bris";
        document.getElementById("bgimg").src = "./assets/img/environment_states/2.png";
        SetGrassState(1,WindSpeedMock);
        SoundState = 2;
    }
    else if(ActualWindSpeed > 10.8 && ActualWindSpeed < 13.8){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Liten kuling";
        SetGrassState(1,WindSpeedMock);
        SoundState = 2;
    }
    else if(ActualWindSpeed > 13.9 && ActualWindSpeed < 17.1){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Stiv kuling";
        SetGrassState(1,WindSpeedMock);
        SoundState = 3; 
    }
    else if(ActualWindSpeed > 17.2 && ActualWindSpeed < 20.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Sterk kuling";
        SetGrassState(1,WindSpeedMock);
        SoundState = 3; 
    }
    else if(ActualWindSpeed > 20.8 && ActualWindSpeed < 24.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Liten storm";
        document.getElementById("bgimg").src = "./assets/img/environment_states/3.png";
        SetGrassState(2,WindSpeedMock);
        SoundState = 4;
    }
    else if(ActualWindSpeed > 24.5 && ActualWindSpeed < 28.4){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Full storm";    
        SetGrassState(2,WindSpeedMock);   
        SoundState = 4; 
    }
    else if(ActualWindSpeed > 28.5 && ActualWindSpeed < 32.6){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Sterk storm";
        document.getElementById("bgimg").src = "./assets/img/environment_states/4.png";
        SetGrassState(2,WindSpeedMock / 2);
        SoundState = 4;
    }
    else if(ActualWindSpeed > 32.7){
        document.getElementById("WindState").innerHTML = WindStatePrefix + "Orkan";
        SetGrassState(2,WindSpeedMock);
        SoundState = 5; 
    }


    //damage to windturbine 
    if(ActualWindSpeed > 28){
        document.getElementById("WindMillSmoke").style.visibility = "visible";
    }
    else{
        document.getElementById("WindMillSmoke").style.visibility = "hidden";
    }

}

function SetGrassState(state, speed){
    const GrassAmount = document.getElementsByClassName("grass").length;    
    //go trough all grass
    for(let GrassPointer = 0; GrassPointer < GrassAmount; GrassPointer ++){
        let GrassID = "grass"+GrassPointer;
        let CurrentGrassElement = document.getElementById(GrassID);
        if(state == 0){
            //still grass
            CurrentGrassElement.src = "./assets/img/foliage/1.png";
        }
        else if(state ==1 ){
            //smooshed grass
            CurrentGrassElement.src = "./assets/img/foliage/2.png";
        }
        else if(state == 2){
            //really smooshed grass
            CurrentGrassElement.src = "./assets/img/foliage/3.png";
        }
        CurrentGrassElement.style.animationDuration = speed + "s"; 
    }
}
function SpawnGrass(amount){

    //grass spawning
    let grassX =  [];
    let grassY =  [];
    let grassWidth =[];
    for(let CoordinatePointer = 0; CoordinatePointer < amount; CoordinatePointer ++){
        grassX[CoordinatePointer] = RandomRangedIntiger(100,screen.width - 100); 
        grassY[CoordinatePointer] = RandomRangedIntiger(350,500); 
        //grassWidth[CoordinatePointer] = RandomRangedIntiger(50,250); 
        grassWidth[CoordinatePointer] =  1.25 * grassY[CoordinatePointer] - 350;
        console.log("id: "+CoordinatePointer + " | x " + grassX[CoordinatePointer] + " | y"+ grassY[CoordinatePointer] + " | z " + grassWidth[CoordinatePointer]);
        
    }    

        //apply anymation
    const animation = document.createElement("style");
    animation.innerHTML = "@keyframes tilter {from {transform:rotate(0deg);}to {transform:rotate(10deg);}}";
    document.head.appendChild(animation); 

    for(let GrassPointer = 0; GrassPointer < grassX.length; GrassPointer ++){
        const CurrentGrass = document.createElement("img");
        CurrentGrass.className = "grass";
        CurrentGrass.id = "grass"+ GrassPointer;
        CurrentGrass.src = "./assets/img/foliage/1.png";
        CurrentGrass.style.position = "absolute";
        CurrentGrass.style.top = grassY[GrassPointer]+ "px";
        CurrentGrass.style.left = grassX[GrassPointer] + "px";
        CurrentGrass.style.width = grassWidth[GrassPointer]+ "px";
        CurrentGrass.style.animationName = "tilter";
        CurrentGrass.style.animationDuration = "0s";
        CurrentGrass.style.animationIterationCount = "infinite";
        CurrentGrass.style.animationTimingFunction = "ease-in-out";
        CurrentGrass.style.animationDirection = "alternate";
        CurrentGrass.style.zIndex = grassWidth[GrassPointer] * 20;
        CurrentGrass.style.animationDelay = RandomRangedFloat(0,0.2) + "s";
        document.getElementById("content").appendChild(CurrentGrass);
    }
}

//set background audio
function SetAudioState(){
   console.info("checking audio state");
   if(LastSoundState != SoundState){
       //change sound
       console.info("changing sound to " + SoundState);
       
       // Pause the current audio and reset the audio player
       if(audioPlayer !== null){
           audioPlayer.pause();
           audioPlayer.currentTime = 0;
       }
       
       // Create a new audio player
       audioPlayer = new Audio('./assets/audio/'+ SoundState + ".mp3");
       console.info("playing./assets/audio/"+ SoundState + ".mp3" )
       audioPlayer.play();
       LastSoundState = SoundState;
   }
}

setInterval(SetAudioState, 3000);