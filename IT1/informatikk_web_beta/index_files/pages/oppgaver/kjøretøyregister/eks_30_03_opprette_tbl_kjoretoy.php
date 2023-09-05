<?php
include './skriv_error_log.php';
include ("./db_connection.php");

print "Oppretter db_tabell";


$sql = "create table if not exists tbl_kjoretoy (
        id int(4) auto_increment primary key,
        regnr varchar(7),    
        type varchar(30),
        produsent varchar(30),
        modell varchar(30),
        farge varchar(12),
        drivstoff varchar(12),
        eier int(13)
        )";
        
mysqli_query($lenke,$sql);
mysqli_close($lenke);

print "Kommando for opprettelse av tabell er eksekvert.";

?>