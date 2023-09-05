<?php 
session_start();
$pswd_pass_enc_k=trim('xe7y9*k@JMYsHN_U'); //kris 
$pswd_pass_enc_s=trim('LUk?F}CS4___ceYG'); //seb
$pswd_pass_enc_x=trim('ET4+zEba\nY*5r~)'); //peter

function filter($_input){
    $patterns = array();
    $patterns[0] = '/</';
    $patterns[1] = '/>/';
    $patterns[2] = '/$/';
    $replacements = array();
    $replacements[0] = ' ';
    $replacements[1] = ' ';
    $replacements[2] = ' ';
    $output=preg_replace($patterns, $replacements, $_input);
    return ($output);
}

$date = date("d/m/Y");
$time = date("H:i:s");
$client_ip = $_SERVER['REMOTE_ADDR'];
$client_referr = $_SERVER["HTTP_REFERER"];

$w_top='
<html>
    <head>
        <link href="./index_files/css/login.css" rel="stylesheet">
        
        
    </head>
    <body>
';

$w_form_login='
<title>Login</title>
<div id="text_li" class="text">Log in to access admin panel</div>
<form id="login_box" action="" method="POST">
    <input type="password" id="login" name="input">
    <input type="submit" value="Log in" name="submit" id="login_submit" class="submit">
</form>
';
$w_form_logout='
<title>Logout</title>
<div id="text_lo" class="text">You are currently logged in <br> Log out?</div>
    <form id="logout_box" action="" method="POST">
    <input type="submit" value="Log out" name="submit" id="logout_submit" class="submit">
</form>
';

$w_form_2fa='
<div id="text_li" class="text">Check your school email</div>
<form id="login_box" action="" method="POST">
    <input type="text" id="login" name="input2">
    <input type="submit" value="Verify" name="submit" id="login_submit" class="submit">
</form>
';

$w_bot='
</body>
</html>
';

$bg='<img src="./index_files/contentImg/background-l.png" id="bg">';

$cb_top='<div id="contentbox">';
$cb_bot='</div>';




if(empty($_SESSION["is_logged_in"])){
    $_SESSION["is_logged_in"]="0";
    //checks if session is empty, sets session to 0
    
}
else{
//donothing
}

if($_SESSION["is_logged_in"]=="1" || $_SESSION["is_logged_in"]=="2" || $_SESSION["is_logged_in"]=="3"){
    $w_form=$w_form_logout;
    if(isset($_POST['submit'])){
        //logs out user 
        $_SESSION["is_logged_in"]="0";
        $_SESSION['chat_is_logged_in'] = 0;
        header("Location: ./index.php");
    }
}
else{
    //Print login form
    $w_form=$w_form_login;    

    if(empty($_POST['input'])){

    }

    else{
        //runs if user is not logged in

        if ($_SERVER['REQUEST_METHOD']=='POST'){
            $login_input=trim(filter($_POST['input']));
        }
        else{//donothing
        }
        
        if($login_input == $pswd_pass_enc_k){                 
            $_SESSION["is_logged_in"]="1";
            $message='User "Kristupas" logged in on '.$date.' '.$time.' Client IP: '.$client_ip.' Logged in from: '.$client_referr;
            mail("kakra038@osloskolen.no", "Noreply|WARN|kristupas.informatikk",$message);
            header("Location: ./index.php");           

        }
        elseif ($login_input==$pswd_pass_enc_s){            
            $_SESSION["is_logged_in"]="2";
            $message='User "Sebastian" logged in on '.$date.' '.$time.' Client IP: '.$client_ip.' Logged in from: '.$client_referr;
            mail("kakra038@osloskolen.no", "Noreply|INFO|kristupas.informatikk",$message);
            header("Location: ./index.php");
        }
        elseif ($login_input==$pswd_pass_enc_x){            
            $_SESSION["is_logged_in"]="3";
            $message='User "Peter" logged in on '.$date.' '.$time.' Client IP: '.$client_ip.' Logged in from: '.$client_referr;
            mail("kakra038@osloskolen.no", "Noreply|WARN|kristupas.informatikk",$message);        
            header("Location: ./index.php");
        }
        
        else{
            $is_logged_in='0';
            $_SESSION["is_logged_in"]="0";
            //wrong password
            $info='<div id="infomsg" class="text">Wrong password. Try again </div>';
            $message='Brute forcing inbound '.$date.' '.$time.' Client IP: '.$client_ip.' Password typed: '.$login_input.' Logged in from: '.$client_referr;
            mail("kakra038@osloskolen.no", "Noreply|CRITICAL|kristupas.informatikk",$message);
            
        }
        
    }

    
}











print($w_top);
print($bg);

print($cb_top);
    print($w_form);
    if (empty($info)){
       //donothing
    }
    else{
        print($info);
    }
print($cb_bot);
print($w_bot);



?>