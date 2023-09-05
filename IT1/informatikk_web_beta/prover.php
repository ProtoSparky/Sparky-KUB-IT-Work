<?php
//top template
require './index_files/templates/top.php';


//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------
function remphp($input){
    $patterns = array();
    $patterns[0] = '/.php/';
    $patterns[1] = '/.pdf/';
    $replacements = array();
    $replacements[0] = '';
    $replacements[1] = '';
    $output = preg_replace($patterns, $replacements, $input);
    return $output; 
}

$prov_dir = 'index_files/pages/prover/';
$prov_sub_dir = scandir($prov_dir);
$prov_array_size = count($prov_sub_dir);
$prov_array_size_offset = count($prov_sub_dir)-1;
$prov_w_top='
<head>
    <link href="./index_files/css/oppgaver.css" rel="stylesheet">
</head>
<body>
';
$prov_w_bot='
</body>
</html>
';





print $prov_w_top;
print '<div id="oppg_marker">';
$prov_counter = 0;
$provaver_form_gen_top= '<form action="show_prove.php" method="GET">';
$provaver_form_gen_bot= '<form>'; 

print $provaver_form_gen_top;
for ($prov_pointer = 2; $prov_pointer <=$prov_array_size_offset; $prov_pointer++){
    $curr_oppg_sub_dir='./'.$prov_dir.$prov_sub_dir[$prov_pointer];
    $prov_counter ++;
    $prov_counter2= (60) * ($prov_counter)-(60);
    $prov_counter3= (60) * ($prov_counter)-(120);
    //button maker


    if ($prov_pointer % 2 == 0){
        print '
        <input style="top:'.$prov_counter2.'px;" class="oppg_button" id="oppg_button_R" type="submit" name="web_request" value="'.remphp($prov_sub_dir[$prov_pointer]).'">
        ';
    }
    else{
        print '
        <input style="top:'.$prov_counter3.'px;" class="oppg_button" id="oppg_button_L" type="submit" name="web_request" value="'.remphp($prov_sub_dir[$prov_pointer]).'">
        <br>
        ';
    }
     
}
print $provaver_form_gen_bot;
print '</div>';

//add icon to buttons for each dir

//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------

print $prov_w_bot; 

//bottom template
require './index_files/templates/bot.php';





?>
