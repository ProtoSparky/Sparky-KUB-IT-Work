<?php
$cube_width_unfil=0;
$webpage_top='
<html>
<head>
<link rel="stylesheet" href="index.css">
</head>
<body>
';

$webpage_bottom='
</body>
</html>
';

$form=' 
<form action="" method="POST">
<label for="cube_width" class="text" id="cube_text">External width</label>
<input type="text" name="cube_width" id="cube_width" class="input_field"></input>
<label for="cube_thickness" class="text" id="cube_thickness_text">Wall thickness</label>
<input type="number" name="cube_thickness" id="cube_thickness" class="input_field">
<input type="submit" value="sumbit" name="submit" id="submit">
</form>
';



if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $cube_width_unfil = $_POST['cube_width'];
    $cube_thickness_unfil = $_POST['cube_thickness'];
}
else{
    $error="<div class='text'>How...!?</div>";
}

function filter($input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $replacements = array();
    $replacements[0] = ' ';
    $replacements[1] = ' ';
    $replacements[2] = ' ';
    $output=preg_replace($patterns, $replacements, $input);
    return ($output);

}

function power($pow_in,$pow_in_acc){

    if(strlen($pow_in)>$pow_in_acc){
        $pow_out='10^'.round((log10($pow_in)),3);
    }
    else{
        $pow_out=$pow_in;
    }
    return ($pow_out);
}

//checks if inputs are undefined
if (empty($cube_width_unfil&&$cube_thickness_unfil)){
    $error="<div class='text'>no input<div>";
    $cube_inner_width=0;
    $cube_outer_volume=0;
    $cube_inner_volume=0;
    $delta_cube=0;
    $cube_width=0;
    $cube_thickness=0;
}

else{

    if (strlen(filter($cube_width_unfil))<20){
        if (filter($cube_width_unfil)<(filter($cube_thickness_unfil)*2)){
            $error="<div class='text'>External width cannot be bigger than Wall thickness, because i said so</div>";
            $cube_inner_width=0;
            $cube_outer_volume=0;
            $cube_inner_volume=0;
            $delta_cube=0;
            $cube_width=0;
            $cube_thickness=0;
        }
        else{
            $cube_inner_width=(filter($cube_width_unfil)-(filter($cube_thickness_unfil)*2));
            //width from wall thickness and external cube width
            $cube_outer_volume=(filter($cube_width_unfil))*(filter($cube_width_unfil))*(filter($cube_width_unfil));
            //get volume from external cube
            $cube_inner_volume=($cube_inner_width)*($cube_inner_width)*($cube_inner_width);
            //delta cube
            $delta_cube=($cube_outer_volume-$cube_inner_volume);
            //
            $cube_width=filter($cube_width_unfil);
            //
            $cube_thickness=filter($cube_thickness_unfil);
    
        }
    }
    else{
        $error="<div class='text'>Can't crash my server that way :)</div>";
        $cube_inner_width=0;
        $cube_outer_volume=0;
        $cube_inner_volume=0;
        $delta_cube=0;
        $cube_width=0;
        $cube_thickness=0;
    }

}

$data_show='
<div id="div">
<img src="./faen.png" id="datashow">
<div id="outer_cube" class="main">'.power($cube_width,6).'</div>
<div id="outer_cube_volume" class="main">Ytre volum: '.power($cube_outer_volume,6).'</div>
<div id="outer_cube_rot" class="main">'.power($cube_width,6).'</div>
<div id="wall_thickness" class="main">Tykkelse: '.power($cube_thickness,6).' | Vegg volum: '.power($delta_cube,3).'</div>
<div id="inner_cube_volume" class="main">Indre volum: '.power($cube_inner_volume,6).'</div>
</div>
';




print($webpage_top);
print($form);
print($data_show);
if (empty($error)){
    //donothing
}
else {
    print ('<div id="error">'.$error.'</div>');
}
print($webpage_bottom);
?>