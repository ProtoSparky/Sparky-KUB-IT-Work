<?php
session_start();




if($_SESSION["is_logged_in"]=="1"|$_SESSION["is_logged_in"]=="2"){
    print "du er loggetinn";
}

else{
    print '<div style="color:white; font-size:20;">Du er ikke logget inn<br> Logg inn før du åpner meg :) <br>
    https://kristupas.informatikk6.net/login.php</div>';    
}

?>