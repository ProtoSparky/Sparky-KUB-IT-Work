<?php
session_start();
require 'db_connection.php';
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

$w_top = '
<html>
<head>

</head>
<body>';

$w_bot = '
</body>
</html>';

//web init

$w_con= '
<form method="POST" action ="" id="form">
<input type="text" name="fname" class="name" id="submit_fname" maxlength="50" placeholder="Navn" required>
<input type="text" name="lname" class="name" id="submit_lname" maxlength="50" placeholder="Etternavn" required>
<input type="text" name="username" class="username" id="submit_username" maxlength="50" placeholder="Brukernavn" required>
<input type="submit" name="submit" class="submit" id="submit_submit">
</form>
';

if(!empty($_POST['fname'])&&!empty($_POST['lname'])&&!empty($_POST['username'])){
    $fname = filter($_POST['fname']);
    $lname = filter($_POST['lname']);
    $username = filter($_POST['username']);


    $sql = "SELECT id, name, lastname, username FROM tbl_trening_pers2";    
    $result = $tilkopling->query($sql);
    while($row = $result->fetch_assoc()) {
        if ($username == $row["username"]){
            $isUserunique = 0;

        }
        else{
            $isUserunique = 1;
        }

    }


    if ($isUserunique==1){
        $sql ="INSERT INTO tbl_trening_pers2 (name, lastname, username)
        VALUES ('$fname','$lname','$username')";
        mysqli_query($lenke,$sql);
        print "User is being registered<br>";
        header("Refresh:5");
    }
    else {
        print "Account already registered<br>";
        header("Refresh:5");
    }






    









}
else{
print "no input";
}


//print
print $w_top;
print $w_con;
print $w_bot;

    //create db
    
    /*
    $sql ="create table if not exists tbl_trening_pers2(
        id int(4) auto_increment primary key, name varchar(50),
        lastname varchar(50),username varchar(50)
    )";
    mysqli_query($lenke,$sql);
    mysqli_close($lenke);
    */

    //create db

?>