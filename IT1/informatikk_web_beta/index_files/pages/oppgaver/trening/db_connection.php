<?php
include './skriv_error_log.php';

$hostname = "localhost:8080";

$user = "root";

$password = "";

$db = "db_kristupas.informatikk6.net";

$tilkopling = mysqli_connect("$hostname", "$user", "$password") or die('Could not connect to databasehost');

$lenke = mysqli_connect($hostname, $user, $password, $db);

mysqli_select_db($tilkopling, $db) or die('Could not select databasename');

?>