<?php
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$ip = $data['ip'];
$location = $data['location']; // Replace with accurate location information

$file = fopen("data.txt", "a");
fwrite($file, "Name: $name, IP: $ip, Location: $location\n");
fclose($file);
if ($name === 'Raj') {
    echo "success"; 
} else {
    echo "failure"; // Or some other signal to indicate the condition failed
}
?>
