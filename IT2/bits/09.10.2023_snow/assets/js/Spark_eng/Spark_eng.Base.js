var DEBUG = false; 

//This is an array which loads scripts. Paste your script file locations
//here instead of writing <script type="text/javascript" src="x.js"></script> in html
/*
const scriptFiles = ["./assets/js/Spark_eng/Spark_eng.HitBX.js", 
"./assets/js/Spark_eng/Spark_eng.Various.js",
"./assets/js/snow.js"
];
*/

//-------------------------------------------------------------------------------------------------------------
//------------------------------------VARS---------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
function game_loop(){
  CheckForVoid();
  SnowFall();
  
}
function second_game_loop(){
 // SnowFall();
}

function init(){
  console.info("Welcome to the world's worst game engine. Check for updates at github.com/ProtoSparky/SparkGameEngine");
  //LoadScripts(scriptFiles,1);
  console.info("init() successful");
  //
  SummonSnow(300);

   
}

//-------------------------------------------------------------------------------------------------------------
//------------------------------------Game loader--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

/*
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
      console.info(scripts[index] + " has been loaded.");
      LoadScripts(scripts, index + 1); // Load the next script
    });
  }
}
*/
/*

function Spark_eng_dependencies(func_name, func_loc) {
  if (typeof window[func_name]  === "function") {
    console.log("aaa");
  } 
  else{
    console.error(func_name + " not found. Did you forget to add " + func_loc + "?"); 
  }
}
*/

//-------------------------------------------------------------------------------------------------------------
//------------------------------------GAME LOOP---------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//This is the game interval. It runs a function named game_loop() every 10ms.
setInterval(game_loop,10);
setInterval(second_game_loop, 500);