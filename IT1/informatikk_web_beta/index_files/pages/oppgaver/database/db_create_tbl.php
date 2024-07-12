<?php
include "./db_connection.php";

$sql = "
CREATE TABLE tbl_plass_camp (PlassID VARCHAR(8) NOT NULL
PRIMARY KEY, KundeID VARCHAR(8), Lengde VARCHAR(2), Bredde VARCHAR(2),
Handicap TEXT, Husdyr TEXT, Elektrisitet VARCHAR(3),
Vann VARCHAR(3), Type VARCHAR(11), Kommentar TEXT)
";
mysql_query($sql);
mysql_close($tilkobling);
?>