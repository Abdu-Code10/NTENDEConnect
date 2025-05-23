<?php
$host = "localhost"; // or your server IP
$user = "root";
$pass = ""; // set your DB password
$dbname = "ntendeconnect";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

