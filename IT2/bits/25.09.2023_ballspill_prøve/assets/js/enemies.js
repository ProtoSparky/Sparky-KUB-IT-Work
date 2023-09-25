var summon_x_coordinate = 25;
var summon_y_coordinate = innerHeight;
var rand_y_coordinate = Math.floor(Math.random() * summon_y_coordinate)+10;
function place_ball(ball_id){
    const friction = 1;
    ball = document.getElementById(ball_id);    
    ball.style.top = rand_y_coordinate;
    ball.style.left = summon_x_coordinate;
    

}
function summon_enemy(ball_id){   

    //Too many problems here. Need to rework this, but dont have time rn :(
    console.log("summon_enemy() is broken.")
    console.log("ball_run");
    ball = document.getElementById(ball_id);
    const current_ball_X = parseInt(ball.style.left);
    const current_ball_Y = parseInt(ball.style.top);

    const new_ball_cX = Math.floor(Math.random() * current_ball_X + 10)+100;
    const new_ball_cY = Math.floor(Math.random() * 10)+10;
    const rand  = Math.floor(Math.random() * 2);
    if (new_ball_cX > current_ball_X){ 

        
        ball.style.left = new_ball_cX + 10;
        if(rand == 1){
            ball.style.top = new_ball_cY + 5 ;
            if (IScollided(new_ball_cX + 150, 30,  new_ball_cY + 150,30, "col_mesh")[1]){
                ball.style.top = new_ball_cY -10;
                console.log("colliding!");
            }
        }
        else{
            ball.style.top = new_ball_cY -10;
        }        


        
    }
}