<?php
     include "connection.php";
     
     if(isset($_POST['stud_id'])) {
        $stud_id = mysqli_real_escape_string($con, $_POST['stud_id']);
        $stud_name = mysqli_real_escape_string($con, $_POST['stud_name']);
        $stud_email = mysqli_real_escape_string($con, $_POST['stud_email']);
        $stud_mobile = mysqli_real_escape_string($con, $_POST['stud_mobile']);
        $stud_class = mysqli_real_escape_string($con, $_POST['stud_class']);
        $stud_total_fees = mysqli_real_escape_string($con, $_POST['stud_total_fees']);
        $stud_deposite_fees = mysqli_real_escape_string($con, $_POST['stud_deposite_fees']);
        $stud_pending_fees = mysqli_real_escape_string($con, $_POST['stud_pending_fees']);
        $newImageName = '';

        if(empty($stud_name) || empty($stud_email) || empty($stud_mobile) || empty($stud_mobile) || empty($stud_class) || empty($stud_total_fees) || empty($stud_deposite_fees) || empty($stud_pending_fees)) {
            echo "All fields are required";
            return;
        }
        
        $sql = "SELECT *from student_details where id=$stud_id";
        $result = mysqli_query($con,$sql) or die("query can't fire");
        $output = [];        
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $newImageName = $row['profile'];
            }
        }
        

        if($_FILES['stud_profile']['name'] !='') {
            // removing old profile
            unlink('fileUploaded/'.$newImageName);
            
            // uploading new profile 
            $fileName = $_FILES['stud_profile']['name'];
            $tmpName = $_FILES['stud_profile']['tmp_name'];
            $extension = pathinfo($fileName,PATHINFO_EXTENSION);
            $valid_ext = array("jpg","png","jpeg");
            if(in_array($extension,$valid_ext)) {
                $time = time();
                $newImageName = $time.$fileName;
                $path = "fileUploaded/".$newImageName;
                if(move_uploaded_file($tmpName,$path)) {
                }
                
            }
            else {
                echo "Please select an Image File formate of - jpeg, jpg, png";
                return;
            }

        }

        $sql2 = "UPDATE student_details SET profile='$newImageName', name='$stud_name', email='$stud_email', mobile='$stud_mobile', class='$stud_class', total_fees='$stud_total_fees', deposite_fees='$stud_deposite_fees', pending_fees='$stud_pending_fees' where id=$stud_id";

        $result2 = mysqli_query($con,$sql2) or die("query can't fire");
        if($result2) {
          echo 1;
        }
        else {
            echo 0;
        }
        
     }
     else {
        echo "something went wrong please try again";
     }
?>