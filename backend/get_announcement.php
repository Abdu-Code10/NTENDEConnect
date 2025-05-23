<?php
header('Content-Type: application/json');
include 'db.php';

$sql = "SELECT message FROM announcements ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$data = [];
while($row = $result->fetch_assoc()) {
    $data[] = $row['message'];
}
echo json_encode($data);
?>
