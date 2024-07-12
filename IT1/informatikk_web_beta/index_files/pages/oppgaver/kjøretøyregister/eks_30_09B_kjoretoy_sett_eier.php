<?php
include './skriv_error_log.php';
include("./db_connection.php");

$regnr = $_POST['registreringsnummer'];
$personnr = $_POST['personnummer'];

$sql = "UPDATE tbl_kjoretoy SET eier = '$personnr' WHERE regnr = '$regnr'"; 

$resultat = mysqli_query($lenke, $sql);

mysqli_close($tilkopling);

print "Update utfort";
?>
