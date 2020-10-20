<?php

$dbServerName = "localhost";
$dbUsername = "root";
$dbPassword = "issa123";
$databaseName = "login-register-php-ajax";

$db = mysqli_connect($dbServerName, $dbUsername, $dbPassword, $databaseName);

if (!$db) {
    die("Connection Failed ! " . mysqli_connect_errno());
}
