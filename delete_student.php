<?php
    include "connection.php";
    
    if(isset($_POST['id'])) {
        $id = mysqli_real_escape_string($con,$_POST['id']);
        
        //deleting profile image
        $sql = "Select *from student_details where id=$id";
        $result = mysqli_query($con, $sql) or die("query can't fire");
        while($row = mysqli_fetch_assoc($result)){
            unlink('fileUploaded/'.$row['profile']);
        }
        
        //deleting student details;
        $sql2 = "Delete from student_details where id=$id";
        $result2 = mysqli_query($con, $sql2) or die("query can't fire");

        if($result2) {
            echo 1;
        }
        else {
            echo 0;
        }
    }
?>