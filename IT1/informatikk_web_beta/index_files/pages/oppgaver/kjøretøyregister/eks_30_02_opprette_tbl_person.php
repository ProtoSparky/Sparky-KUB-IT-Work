<?php
include './skriv_error_log.php';
include ("./db_connection.php");

print "Oppretter db_tabell";

$sql = "create table if not exists tbl_person (
        id int(4) auto_increment primary key,
        personnr int(13),
        fornavn varchar(30),
        etternavn varchar(30),
        adresse varchar(30),
        postnr int(4),
        telefon int(12),
        epost varchar(30))";
        
mysqli_query($lenke,$sql);
mysqli_close($lenke);

print "Kommando for opprettelse av tabell er eksekvert.";

?>       