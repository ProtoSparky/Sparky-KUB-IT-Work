<?php

//auto scroll to bottom of page print "<script>$('#chat_textarea').scrollTop($('#chat_textarea')[0].scrollHeight);</script>";
//<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
session_start();
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

function max_length($input, $max_length) {
    if (strlen($input) > $max_length) {
        return substr($input, 0, $max_length);
    } else {
        return $input;
    }
}

function markdown_slim($input) {
    //rep **, *** to <b>, <i><b>
    $input = preg_replace('/\*\*\*(.+?)\*\*\*/', '<i><b>$1</b></i>', $input);
    $input = preg_replace('/\*\*(.+?)\*\*/', '<b>$1</b>', $input);    
    // rep * to <i> tags
    $input = preg_replace('/\*(.+?)\*/', '<i>$1</i>', $input);
    //creates a hyperlink
    $input = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a class="link" href="$2">$1</a>', $input);
    return $input;
}
$rand_num = mt_rand(1000,time());


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
        <script src="./index_files/js/jQuery.js">
        </script>
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
print "<script type='text/javascript' >$('#chat_textarea').scrollTop($('#chat_textarea')[0].scrollHeight);</script>"; //scroll to bottom Jquery
print $w_men;
print $w_con_top;


//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------

if($_SESSION["is_logged_in"]=="1" || $_SESSION["is_logged_in"]=="2" || $_SESSION["is_logged_in"]=="3"){
    if ($_SESSION["is_logged_in"]=="1"){
        $_SESSION['chat_is_logged_in'] = 1;
        $_SESSION['chat_email'] = "Kris";
    }
    elseif ($_SESSION["is_logged_in"]=="2"){
        $_SESSION['chat_is_logged_in'] = 1;
        $_SESSION['chat_email'] = "Seb";
    }
    elseif ($_SESSION["is_logged_in"]=="3"){
        $_SESSION['chat_is_logged_in'] = 1;
        $_SESSION['chat_email'] = "Peter";
    }
}

$chat_window_bg_div_top = '<div class = "window_center_large" id = "chat_window_bg">';
$chat_window_bg_div_bot = '</div>';
$chat_window_text_div_top = '<div class = "window_center_large" id = "chat_window_text"><div id="chat_textarea">';
$chat_window_text_div_bot = '</div></div>';
$chat_window_menu_div_top = '<div class = "window_center_large_noBG" id = "chat_window_menu">';
$chat_window_menu_div_bot = '</div>';

$chat_email_login_form = '<form action="" method="POST">
    <input type = "email" name = "email_verify" class = "chat_input" id = "chat_input_email" maxlength="100">
    <input type = "submit" name = "submit" class = "chat_submit">
</form>
';

$chat_input_menu = '<form action="" method="POST">
    <input type = "text" name = "chat" class = "chat_input" id = "chat_input" maxlength="100">
    <input type = "submit" name = "submit" class = "chat_submit" id="chat_submit"  value ="Send">
</form>
';

//mail
$chat_mail_verify = 'Your one time code is: '.$rand_num; 
//end of mail
//chat print
$chat_dir = './index_files/pages/chat/chat.txt';
$chat_array = file($chat_dir);  


print $chat_window_bg_div_top;
print $chat_window_text_div_top;

foreach ($chat_array as $chat_line) {
    print markdown_slim($chat_line);
    print '<br>';
}



//end of chat print
print $chat_window_text_div_bot;
print $chat_window_menu_div_top;
//menu

print "<script>$('#chat_textarea').scrollTop($('#chat_textarea')[0].scrollHeight);</script>"; //scroll to bottom Jquery

if (!isset($_SESSION['chat_is_logged_in'])) {
    $_SESSION['chat_is_logged_in'] = 0;
    header("Location: chat.php");
    //if undefined, define
} else {
    if ($_SESSION['chat_is_logged_in'] == 0) {
        // run if user is not logged in
       $chat_login= $chat_email_login_form;
       if ($_SERVER["REQUEST_METHOD"] == "POST"){
        //Checks for post
        if (!isset($_POST['email_verify'])){
            //runs if input is undefined
        }
        else{
            //checks if email is real
            if (preg_match('/[-A-Za-z0-9!#$%&\'*+\/=?^_`{|}~]+(?:\\.[-A-Za-z0-9!#$%&\'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i',max_length(filter($_POST['email_verify']),100))){
                //defines email
                //sends OTP mail
                //sets chat email to global variable
                //sets OTP code to global variable
                //sends user to verify page
                $chat_email = max_length(filter($_POST['email_verify']),100);
                mail($chat_email, "Noreply|Chat verify|kristupas.informatikk6.net",$chat_mail_verify);
                $_SESSION['chat_email'] = $chat_email;
                $_SESSION['chat_otp'] = $rand_num;
                header("Location: ./index_files/pages/chat/is_email_verified.php");    

            }
            else{
                //email is not real
                $chat_error='illegal_email';
            }
        }
        
       }








    } else {
        //Runs if user is logged in
        print $chat_input_menu;
        print '<div id="chat_login_info">You are logged in as: '.$_SESSION['chat_email'].'</div>';

       if($_SERVER["REQUEST_METHOD"]=="POST"){
        //checks if input is post
        if (!isset($_POST['chat'])) {
            // runs if empty
           // print "em";
        }
        else{
            if (empty($_POST['chat'])){

            }
            else{
                $chat_input = trim(filter(max_length($_POST['chat'],100))); 
                $curr_time = date("H:i");
                $chat_input_w_usr = $_SESSION['chat_email'].' | '.$curr_time.' | '.$chat_input; 
                //write to chat
                //file_put_contents($chat_dir, $chat_input);
                //header('refresh:0');
                file_put_contents($chat_dir, $chat_input_w_usr.PHP_EOL , FILE_APPEND | LOCK_EX);
                print '<meta http-equiv="refresh" content="0">';


                
                
                
             }
            }

       }



        


    }
}






print '<div class="divider" id="chat_divider"></div>';//divider

if (empty($chat_login)){
    //
}
else {
    print $chat_login;
}

if (empty($chat_error)){
    //
}
else{
    print $chat_error;
}
print $chat_window_menu_div_bot;     
print $chat_window_bg_div_bot; 






//-----------------------------------------------------------------------------------------
//---------------------------------------WEB-----------------------------------------------
//-----------------------------------------------------------------------------------------


print $w_con_bot;
//End of content



//Bottom
print $w_bot; 
//End of bottom






?>
