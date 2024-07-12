<?php
$hostname = "localhost:8080";  //skriv "localhost" eller et navn.
$user = "root";     //skriv brukernavn
$password = "";   //skriv passord
$db = "db_kristupas.informatikk6.net";         //skriv databasenavn (det er ikke tabellnavn !) 

$tilkopling = mysql_pconnect($hostname, $user, $password) or die('Could not connect to
databasehost');
mysql_select_db($db, $tilkopling) or die('Could not select databasename');

?>