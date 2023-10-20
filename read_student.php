<?php
    include "connection.php";

    $sql = "SELECT *from student_details";
    $result2 = mysqli_query($con,$sql) or die("query can't fire");
    $output = [];        
    if(mysqli_num_rows($result2) > 0) {
        while($row = mysqli_fetch_assoc($result2)) {
            $student = new stdClass();
            $student->id = $row['id'];
            $student->profile = $row['profile'];
            $student->name = $row['name'];
            $student->email = $row['email'];
            $student->mobile= $row['mobile'];
            $student->class= $row['class'];
            $student->total_fees= $row['total_fees'];
            $student->deposite_fees= $row['deposite_fees'];
            $student->pending_fees= $row['pending_fees'];
            $output[] = $student;
        }
    }

    echo json_encode($output);
?>