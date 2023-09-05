<?php
$display_width = 300;
$display_height = 300;

for ($y=0; $y <= $display_height; $y++){
    for ($x=0; $x <= $display_width; $x++){
        $rand_shade=mt_rand(0,255);

        print '
    <div style="    
        position:absolute;
        top:'.$y.'px;
        left:'.$x.'px;
        padding:.5;
        background-color:rgb('.$rand_shade.','.$rand_shade.','.$rand_shade.');}
    "></div> '
    ;       
    
    }
    
}





?>