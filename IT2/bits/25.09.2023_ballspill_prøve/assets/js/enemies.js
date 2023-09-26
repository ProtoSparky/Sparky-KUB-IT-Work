var summon_x_coordinate = 25;
var summon_y_coordinate = innerHeight;
var rand_y_coordinate = Math.floor(Math.random() * summon_y_coordinate)+10;

function place_ball(ball_id){
    const friction = 1;
    ball = document.getElementById(ball_id);    
    ball.style.top = rand_y_coordinate;
    ball.style.left = summon_x_coordinate;   
    summon_enemy(ball_id); 
}



function summon_enemy(ball_id){
    const max_iterations = 10; 
    const init_speed = 20;

    //Too many problems here. Need to rework this, but dont have time rn :(
    ball = document.getElementById(ball_id);
    const current_ball_X = parseInt(ball.style.left);
    const current_ball_Y = parseInt(ball.style.top);
    const ball_angle = 10 * RandomRangedIntiger(0,18);
    const angled_x = xFromAngle(ball_angle, current_ball_X);
    //console.log(ball_angle);
 
    //console.log(calculateMovement(current_ball_X, angled_x,current_ball_Y, current_ball_Y + init_speed, 4));


    
    for(let current_itr = 0; current_itr <= max_iterations; current_itr ++){
        const currentX = calculateMovement(current_ball_X, angled_x,current_ball_Y, current_ball_Y + init_speed, current_itr)[0];
        const currentY = calculateMovement(current_ball_X, angled_x,current_ball_Y, current_ball_Y + init_speed, current_itr)[1];


        //Check if ball hits wall
        if(!IScollided(currentX, 30, currentY,30, "col_mesh")[0] && !IScollided(currentX, 30, currentY,30, "col_mesh")[1] && !IScollided(currentX, 30, currentY,30, "col_mesh")[2] && !IScollided(currentX, 30, currentY,30, "col_mesh")[3] && !IScollided(currentX, 30, currentY,30, "col_mesh")[4]){


        setTimeout(function() {
            const current_angle_itr = AngleFromX2(currentX,currentY);
            const new_angle_itr =  180 - current_angle_itr; 
            const new_x_itr = xFromAngle(new_angle_itr,currentX);

            ball.style.top = currentY;
            ball.style.left = new_x_itr; 
            console.log(new_x_itr +" "+ currentX +" "+ currentY+" "+new_angle_itr); 
        }, 100);


        }
        else{
            ball.style.top = currentY;
            ball.style.left = currentX; 
        }

    }

    

        
}


function calculateMovement(valx0, valx1, valy0, valy1, itr) {
    const return_val=[]; 
    if (itr === 0) {
      return { x: valx0, y: valy0 };
    } else if (itr === 1) {
      return { x: valx1, y: valy1 };
    } else {
      // Calculate new values based on the previous ones
      const newX = (valx1 - valx0) * itr + valx0;
      const newY = (valy1 - valy0) * itr + valy0;
      return_val[0] = newX;
      return_val[1]= newY; 
      return return_val;

    }
}
  
  




// Convert x-coordinates to an angle
function AngleFromX(valx0, valx1) {
    const angle = Math.atan2(valx1 - valx0, 1); // The '1' represents the constant y-coordinate for the angle calculation
    return angle;
}

function AngleFromX2(valx,valy) {
    const angle = Math.atan2(valx, valy); // The '1' represents the constant y-coordinate for the angle calculation
    return angle;
}
  
// Convert an angle back to x-coordinate
function xFromAngle(angle, valx0) {
    const x = valx0 + Math.tan(angle);
    return x;
}

function RandomRangedIntiger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
