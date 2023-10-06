var DEBUG = false; 

//This is an array which loads scripts. Paste your script file locations
//here instead of writing <script type="text/javascript" src="x.js"></script> in html

const scriptFiles = ["./assets/js/player_ctrl.js", 
"script2.js", 
"script3.js"
];
//-------------------------------------------------------------------------------------------------------------
//------------------------------------VARS---------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
var second_loop_counter = 0;
function game_loop(){
    //This loop runs every 10ms. Us it for fast OPS
    check_player_input(); 
}
function second_game_loop(){
    
}

function init(){
    console.log("Welcome to the world's worst game engine. Check for updates at github.com/ProtoSparky/SparkGameEngine");
    LoadScripts(scriptFiles, 0);
    console.log("init() successful");
    // 
    player = document.getElementById("player1");
    player.style.top  =(innerHeight /5);
    player.style.left =(innerWidth /2);  
    
   
}

//-------------------------------------------------------------------------------------------------------------
//------------------------------------Game loader--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  script.onload = callback;
  document.head.appendChild(script);
}
function LoadScripts(scripts, index) {
  if (index < scripts.length) {
    loadScript(scripts[index], function () {
      // The callback function is called when the script is loaded
      console.log(scripts[index] + " has been loaded.");
      LoadScripts(scripts, index + 1); // Load the next script
    });
  }
}

/*
function loadScript(src, callback, errorCallback) {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
  
    script.onload = callback; // Callback when the script is successfully loaded
  
    // Handle script loading errors
    script.onerror = function () {
      if (errorCallback) {
        errorCallback(src); // Call the errorCallback with the source URL of the failed script
      } else {
        console.error("Error loading script:", src); // Log a default error message
      }
    };
  
    document.head.appendChild(script);
}

function handleScriptError(src) {
    console.error("Error loading script:", src);
}
  
  
  
function LoadScripts(scripts, index) {
    if (index < scripts.length) {
      loadScript(scripts[index], function () {
        console.log(scripts[index] + " has been loaded.");
        LoadScripts(scripts, index + 1);
      }, handleScriptError);
    }
}
  

*/


//-------------------------------------------------------------------------------------------------------------
//------------------------------------GAME LOOP---------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//This is the game interval. It runs a function named game_loop() every 10ms.
setInterval(game_loop,10);
setInterval(second_game_loop, 1000);