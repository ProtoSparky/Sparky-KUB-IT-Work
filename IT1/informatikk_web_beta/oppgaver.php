<?php
//top template
require './index_files/templates/top.php';

//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------
function remphp($input){
    $patterns = array();
    $patterns[0] = '/.php/';
    $replacements = array();
    $replacements[0] = '';
    $output = preg_replace($patterns, $replacements, $input);
    return $output; 
}

$oppg_dir = 'index_files/pages/oppgaver/';
$oppg_sub_dir = scandir($oppg_dir);
$oppg_array_size = count($oppg_sub_dir);
$oppg_array_size_offset = count($oppg_sub_dir)-1;
$oppg_w_top='
<head>
    <link href="./index_files/css/oppgaver.css" rel="stylesheet">
</head>
<body>
';
$oppg_w_bot='
</body>
</html>
';





print $oppg_w_top;
print '<div id="oppg_marker">';
$oppg_counter = 0;
$oppgaver_form_gen_top= '<form action="show_oppgave.php" method="GET">';
$oppgaver_form_gen_bot= '<form>'; 

print $oppgaver_form_gen_top;
for ($oppg_pointer = 2; $oppg_pointer <=$oppg_array_size_offset; $oppg_pointer++){
    $curr_oppg_sub_dir='./'.$oppg_dir.$oppg_sub_dir[$oppg_pointer];
    $oppg_counter ++;
    $oppg_counter2= (60) * ($oppg_counter)-(60);
    $oppg_counter3= (60) * ($oppg_counter)-(120);
    //button maker


    if ($oppg_pointer % 2 == 0){
        print '
        <input style="top:'.$oppg_counter2.'px;" class="oppg_button" id="oppg_button_R" type="submit" name="web_request" value="'.remphp($oppg_sub_dir[$oppg_pointer]).'">
        ';
    }
    else{
        print '
        <input style="top:'.$oppg_counter3.'px;" class="oppg_button" id="oppg_button_L" type="submit" name="web_request" value="'.remphp($oppg_sub_dir[$oppg_pointer]).'">
        <br>
        ';
    }
     
}
print $oppgaver_form_gen_bot;
print '</div>';

//add icon to buttons for each dir

//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------

//bottom template
require './index_files/templates/bot.php';





?>
