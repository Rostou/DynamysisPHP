<?php
$var = $_GET["name"];
$a =0;
$b =$var;

mysql_query("SELECT * FROM sometable WHERE id = $var");

$a = 0;

$query = sprintf("SELECT * FROM users WHERE user='%s' AND password='%s'",
            mysql_real_escape_string($var),
            mysql_real_escape_string($a));

?>