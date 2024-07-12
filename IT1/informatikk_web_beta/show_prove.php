<?php
session_start();
function filter($input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $patterns[3] = '/\//';
    $replacements = array();
    $replacements[0] = ' ';
    $replacements[1] = ' ';
    $replacements[2] = ' ';
    $replacements[3] = ' ';      
    $output=preg_replace($patterns, $replacements, $input);
    return ($output);
}

function markdown($input) {
    //rep **, *** to <b>, <i><b>
    $input = preg_replace('/\*\*\*(.+?)\*\*\*/', '<i><b>$1</b></i>', $input);
    $input = preg_replace('/\*\*(.+?)\*\*/', '<b>$1</b>', $input);    
    // rep * to <i> tags
    $input = preg_replace('/\*(.+?)\*/', '<i>$1</i>', $input);
    
    return $input;
}


//changes login logout name in dropdown menu
if(empty($_SESSION["is_logged_in"])){
    $_SESSION["is_logged_in"]="0";
    //checks if session is empty, sets session to 0
}
else{
    //donothing
}

if($_SESSION["is_logged_in"]=="1" || $_SESSION["is_logged_in"]=="2" || $_SESSION["is_logged_in"]=="3"){
    $log_inf="Logout";
}
else{
    $log_inf="Login";  
}

//init

$w_top='
<html>
    <head>
        <link href="./index_files/css/index.css" rel="stylesheet">
    </head>
    <body>
';

//admin account logged in
$w_men_li='
<img src="./index_files/contentImg/background.png" id="bg">

<div id="menu">
    <div id="menu_text_align">
        <div class="menu_text" id="menu_text_1">
            <a href="index.php">
                <img src="./index_files/menuIcons/icon.png" id="menu_icon">
            </a>
        </div>
        <a href="prover.php">
            <div class="menu_text" id="menu_text_2">Prøver</div>
        </a>
        <a href="oppgaver.php">
            <div class="menu_text" id="menu_text_3">Oppgaver</div>
        </a>
        <a href="chat.php">
            <div class="menu_text" id="menu_text_4">Chat</div>
        </a>


        <div class="menu_text" id="ham_dropdown">

            <img src="./index_files/menuIcons/ham_menu.png" id="menu_ham">

            <div id="dropdown_menu_big">
                <a href="prover.php">
                    <button id="dropdown_menu_button_prove" class="dropdown_menu_button_text_lo">Prøver</button>
                </a>
                <a href="oppgaver.php">
                    <button id="dropdown_menu_button_oppgaver" class="dropdown_menu_button_text_lo">Oppgaver</button>
                </a>
                <a href="./index_files/pages/EnC_Adm/enc_fqs.php">
                    <button id="dropdown_menu_button_admin_lo" class="dropdown_menu_button_text_lo">Admin</button>                    
                </a>
                <a href="login.php">
                    <button id="dropdown_menu_button_login_lo" class="dropdown_menu_button_text_lo">'.$log_inf.'</button>
                </a>
                </div>
            </div>       
        </div>
</div>
';

//normal user
$w_men_lo='
<img src="./index_files/contentImg/background.png" id="bg">

<div id="menu">
    <div id="menu_text_align">
        <div class="menu_text" id="menu_text_1">
            <a href="index.php">
                <img src="./index_files/menuIcons/icon.png" id="menu_icon">
            </a>
        </div>
        <a href="prover.php">
            <div class="menu_text" id="menu_text_2">Prøver</div>
        </a>
        <a href="oppgaver.php">
            <div class="menu_text" id="menu_text_3">Oppgaver</div>
        </a>
        <a href="chat.php">
            <div class="menu_text" id="menu_text_4">Chat</div>
        </a>

        <div class="menu_text" id="ham_dropdown">

            <img src="./index_files/menuIcons/ham_menu.png" id="menu_ham">

            <div id="dropdown_menu">
                <a href="prover.php">
                    <button id="dropdown_menu_button_prove" class="dropdown_menu_button_text">Prøver</button>
                </a>

                <a href="prover.php">
                    <button id="dropdown_menu_button_oppgaver" class="dropdown_menu_button_text">Oppgaver</button>
                </a>

                <a href="login.php">
                    <button id="dropdown_menu_button_login" class="dropdown_menu_button_text">'.$log_inf.'</button>
                </a>
                </div>
            </div>       
    </div>
</div>
';


if($_SESSION["is_logged_in"]=="1"){
    $w_men=$w_men_li;
}
else{
    $w_men=$w_men_lo;
}





$w_bot='
</body>
</html>';

$w_con_top='<div id="content">';
$w_con_bot= '</div>';

//Menu+top
print $w_top;
print $w_men;
print $w_con_top;


//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------
$show_oppgave_dir='./index_files/pages/prover/';
/*print '
<form action="" method="GET">
    <input type="submit" name="web_request" value="bilskilt">
<form>

';*/



if ($_SERVER["REQUEST_METHOD"] == "GET"){
    if(empty($_GET['web_request'])){
        //

    }
    else{
        $show_oppg_web_req=trim(filter($_GET['web_request']));
        //print $show_oppg_web_req;

        print '<object id="object_data_f"data="'.$show_oppgave_dir.$show_oppg_web_req.'/index.php"></object>';
    }


}


//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------


print $w_con_bot;
//End of content



//Bottom
print $w_bot; 
//End of bottom






?>
