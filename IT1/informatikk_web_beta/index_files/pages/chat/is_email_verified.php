<?php 
$w_top='
<html>
    <head>
        <link href="../../css/generic_login.css" rel="stylesheet">
        
    </head>
    <body>
    <img src = "../../contentImg/background.png" id = "bg">
';

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
$chat_email_verify_login_form='
<div id="text_li" class="text">Verify your email address</div>
<form id="login_box" action="" method="POST">
    <input type = "number" name = "email_verify2" id="login" maxlength="100">
    <input type="submit" value="Verify" name="submit" id="login_submit" class="submit">
</form>
';

$cb_top='<div id="contentbox">';
$cb_bot='</div>';

print $w_top;
print $cb_top; 

print $chat_email_verify_login_form;
if (!isset($_SESSION['chat_is_logged_in'])) {
    //sends user back to chat if no var
    header("Location: ../../../chat.php");   
}
else{
    if ($_SESSION['chat_is_logged_in'] == 0) {
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            //if post
            if (!isset($_POST['email_verify2'])){
                //runs if input is undefined
            }
            else{
                // check input
                // defines numberchecker
                $num_checker = '/[0-9]+/i';
                if (preg_match($num_checker, filter((max_length($_POST['email_verify2'],100))))) {
                    //defines otp number and cleans
                    $chat_input_otp = filter(max_length($_POST['email_verify2'],100));
                    if ($_SESSION['chat_otp'] == $chat_input_otp){
                        //verification successful
                        $_SESSION['chat_is_logged_in'] = 1; 
                        header("Location: ../../../chat.php"); 

                    }
                    else {
                        // Number sent does not match the system
                        $info='<div id="infomsg" class="text">Code does not match the one in the system <br> Try again later</div>';

                    }
                    

                }
                else {
                    //error input
                    print "error_input faliure";
                }
            }
        }
    }
    else{
        //sends user back if they are logged in
        header("Location: ../../../chat.php");   
    }
}
if (empty($info)){
    //donothing
 }
 else{
     print($info);
}

print $cb_bot;
print '
</body>
</html>
';

?>