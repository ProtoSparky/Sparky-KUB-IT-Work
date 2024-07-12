<?php
session_start();

if (empty($_SESSION["is_logged_in"])){
    $_SESSION["is_logged_in"]="0";
    http_response_code(404);
    //hehe sneaky
    
}

else {
    if ($_SESSION["is_logged_in"]=="1"){
        //prints when user is logged in
    
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
                        <link href="../../css/index.css" rel="stylesheet">
                    </head>
                    <body>
                ';
                
                //admin account logged in
                $w_men_li='
                <img src="../../contentImg/background-pur.png" id="bg">
                
                <div id="menu">
                    <div id="menu_text_align">
                        <div class="menu_text" id="menu_text_1">
                            <a href="../../../index.php">
                                <img src="../../menuIcons/icon.png" id="menu_icon">
                            </a>
                        </div>
                        <a href="../../../prover.php">
                            <div class="menu_text" id="menu_text_2">Prøver</div>
                        </a>
                        <a href="../../../oppgaver.php">
                            <div class="menu_text" id="menu_text_3">Oppgaver</div>
                        </a>
                        <a href="../../../chat.php">
                            <div class="menu_text" id="menu_text_4">Chat</div>
                        </a>
                
                
                        <div class="menu_text" id="ham_dropdown">
                
                            <img src="../../menuIcons/ham_menu.png" id="menu_ham">
                
                            <div id="dropdown_menu_big">
                                <a href="../../../prover.php">
                                    <button id="dropdown_menu_button_prove" class="dropdown_menu_button_text_lo">Prøver</button>
                                </a>
                                <a href="../../../oppgaver.php">
                                    <button id="dropdown_menu_button_oppgaver" class="dropdown_menu_button_text_lo">Oppgaver</button>
                                </a>
                                <a href="enc_fqs.php">
                                    <button id="dropdown_menu_button_admin_lo" class="dropdown_menu_button_text_lo">Admin</button>                    
                                </a>
                                <a href="../../../login.php">
                                    <button id="dropdown_menu_button_login_lo" class="dropdown_menu_button_text_lo">'.$log_inf.'</button>
                                </a>
                                </div>
                            </div>       
                        </div>
                </div>
                ';
                
                //normal user
                $w_men_lo='
                CRITICAL ERROR
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
                $changelog_dir = '../chat/chat.txt';
                $changelog_array = file($changelog_dir);            
                $changelog_form_top = '
                    <form method="POST" action="">
                        <textarea class="textarea" id="changelog_textarea" name="changelog_textarea" rows="20" cols="132">
                ';
                
                $changelog_form_submit = '</textarea><input type="submit" value="submit">';
                $changelog_form_bot = '</form>';
                
                print $changelog_form_top;
                foreach ($changelog_array as $changelog_line) {
                    print $changelog_line;
                    //print preg_replace('/\\s+/i'," ",$changelog_line);
                }
                
                print $changelog_form_submit;
                print $changelog_form_bot;
                
                if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if (empty($_POST['changelog_textarea'])) {
                        print "i empy ";
                    } 
                    else {
                        $changelog_form_input = trim($_POST['changelog_textarea']).'<br>';
                        file_put_contents($changelog_dir, $changelog_form_input);
                        header("Refresh:0");
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
    }
    else{
        $_SESSION["is_logged_in"] = "0";  
        header("Location: ../../../index.php");
        http_response_code(404);
        //hehe sneaky
    }

}


?>