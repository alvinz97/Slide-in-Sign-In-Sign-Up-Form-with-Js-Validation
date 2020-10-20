<?php 
require 'config.inc.php';

$status = $_REQUEST['status'];

// REGISTER AREA 

if ($status == 'register') {
    $username = $_REQUEST['username'];
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];

    $sql = "SELECT id FROM users WHERE username=?;";
    $stmt = mysqli_stmt_init($db);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo 'sqlError';
    } else {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $resultCheck = mysqli_stmt_num_rows($stmt);
        if ($resultCheck > 0) {
            echo 'usernameTaken';
        } else {
            $date = date('Y-m-d H:i:s');
            $passHashed = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO users (username, email, password, timeStamp) VALUES('$username', '$email','$passHashed','$date')";
            
            if ($db->query($sql)) {
                session_start();
                $_SESSION['username'] = $username;
                echo "OK";
            } else {
                echo "Error";
            }
        }
    }
}

// LOGIN AREA 
if ($status == 'login') {
    $email = mysqli_real_escape_string($db, $_REQUEST['email']);
    $password = $_REQUEST['password'];
    $remember = $_REQUEST['remember'];

    $sql = "SELECT * FROM users WHERE email=?;";
    $stmt = mysqli_stmt_init($db);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo 'sqlError';
    } else {
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($row = mysqli_fetch_assoc($result)) {
            $pwdCheck = password_verify($password, $row['password']);
            if ($pwdCheck == false) {
                echo 'wrongPwd';
            } elseif ($pwdCheck == true) {
                session_start();
                $_SESSION['userID'] = $row['id'];
                $_SESSION['email'] = $row['email'];

                echo 'OK';
            } else {
                echo 'wrongPwd';
            }
        } else {
            echo 'noUser';
        }
    }
}