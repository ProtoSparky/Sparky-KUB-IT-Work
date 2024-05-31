function init(){
    console.info("init run");


    const btn = document.createElement("button");
    btn.innerHTML = "Kill all cells";
    btn.addEventListener("click", function(){
        change_disp(true);
    })
    btn.style.position = "absolute";
    btn.style.right = "10px";


    const btn_spawn = document.createElement("button")
    btn_spawn.addEventListener("click", function(){
        change_disp(false);
    });
    btn_spawn.innerHTML = "Replace all cells with alive ones"; 
    btn_spawn.style.position = "absolute";
    btn_spawn.style.right = "10px";
    btn_spawn.style.top = "50px";


    document.getElementById("content-fullscreen").appendChild(btn);
    document.getElementById("content-fullscreen").appendChild(btn_spawn)

    const cell_div = document.createElement("div");
    cell_div.id = "cellarea";
    document.getElementById("content-fullscreen").appendChild(cell_div);

    
    generate_cells(GameState.disp.x, GameState.disp.y); 
    display_grid(); 

    setInterval(constant_update, 1000);
    
}

function change_disp(kill){
    for(let y_pointer =0; y_pointer < GameState.disp.y; y_pointer ++){
        for(let x_pointer = 0; x_pointer < GameState.disp.x; x_pointer ++){
            if(kill == true){
                cellstate[y_pointer][x_pointer] = false;     
            }   
            else{
                cellstate[y_pointer][x_pointer] = true;     
            }
        }
    }
}

function constant_update(){
    //this will run once every 1 second
    console.log("update display");
    display_grid();
    sim();
}

function generate_cells(x,y){
    for(let y_pointer =0; y_pointer < y; y_pointer ++){
        cellstate[y_pointer] = [];
        for(let x_pointer = 0; x_pointer < x; x_pointer ++){
            if(RandomRangedIntiger(0,2) == 1){
                cellstate[y_pointer][x_pointer] = true;
            }
            else{
                cellstate[y_pointer][x_pointer] = false;
            }
        }
    }
}

function display_grid(){
    const width = GameState.disp.x_w;
    const height = GameState.disp.y_w;
    const doc = document.getElementById("cellarea");
    doc.innerHTML = ""; //clear display
    for(let y_pointer =0; y_pointer < GameState.disp.y; y_pointer ++){
        for(let x_pointer = 0; x_pointer < GameState.disp.x; x_pointer ++){
            const pixel = document.createElement("div"); 
            pixel.style.position = "absolute";
            pixel.style.left = width * x_pointer + "px";
            pixel.style.top = height *  y_pointer + "px";
            pixel.style.width = width + "px";
            pixel.style.height = height + "px";
            pixel_data = cellstate[y_pointer][x_pointer];
            if(pixel_data){
                pixel.style.backgroundColor = "black";
            }
            else{
                pixel.style.backgroundColor = "Grey";
            }
            pixel.id = x_pointer + "_" + y_pointer;
            pixel.addEventListener("click",function(){
                ChangeState(x_pointer, y_pointer);
            });
            pixel.style.cursor = "pointer";
            doc.appendChild(pixel); 


        }
    }
}
/*
Enhver levende celle med færre enn to levende naboer dør, som ved underpopulasjon.
Enhver levende celle med to eller tre naboer lever videre til neste generasjon.
Enhver levende celle med flere enn tre levende naboer dør, som ved overpopulasjon.
Enhver død celle med akkurat tre levende naboer blir vekket til live, som ved reproduksjon
*/

function sim(){
    
    for(let y_pointer =0; y_pointer < GameState.disp.y; y_pointer ++){
        for(let x_pointer = 0; x_pointer < GameState.disp.x; x_pointer ++){
            cellstate[y_pointer][x_pointer] = checkneoughbours(x_pointer, y_pointer);
        }
    }
}

function checkneoughbours(x,y){
   /*
    We want to check the neighbour cells:
    one to the right
    one to the left
    one on the top
    one on the bottom

   */
  //for the love of god i cannot understand why it doens't want me to define a var as as undefined
  
    let right_cell = true;
    if(cellstate[y][x+ 1] == undefined){
        right_cell = NaN; 
    }
    else{
        right_cell = cellstate[y][x+ 1];
    }
  

    let left_cell = true;
    if(cellstate[y][x - 1] == undefined){
        left_cell = NaN; 
    }
    else{
        left_cell = cellstate[y][x - 1]
    }
  

    //added for testing purposes
    let bottom_cell = true;
    let top_cell = true;
    //------------


  /*
    let bottom_cell = true;
    if(cellstate[y + 1][x] == undefined){
        bottom_cell = NaN; 
    }
    else{
        bottom_cell = cellstate[y + 1][x]
    }
  
  

    let top_cell = true;
    if(cellstate[y -1][x] == undefined){
        top_cell = NaN; 
    }
    else{
        top_cell = [y -1][x]; 
    }
    */
  //i was going to assign the arrays straight to this object
  //why the actual fff is it so pissy about being unfefined even though I AM CHECKING IF IT'S UNDEFINED
  
  const cellarea = {
    "right_cell":right_cell,
    "left_cell":left_cell,
    "bottom_cell":bottom_cell,
    "top_cell":top_cell
  };


  keys = Object.keys(cellarea);
  let counter = null;
  for(current_key in keys){
    let current_cell = cellarea[keys[current_key]];
    if(current_cell !=NaN ){
        if(current_cell == true){ //check if it's alive or not
            counter ++;
        }
        else if(current_cell == false){
            counter --; 
        }

    }
  }

  if(counter < 2){
    return false;
  }
  else if(counter > 2 && counter < 4){
    return true;
  }
  else if(counter > 3){
    return false;
  }
  else if(counter == 3){
    return true;
  }
  
}

function ChangeState(x,y){
    if(cellstate[y][x]){
        cellstate[y][x] = false;
    }
    else{
        cellstate[y][x] = true;
    }
}