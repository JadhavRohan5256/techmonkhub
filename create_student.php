<?php
     include "connection.php";
     
     if(isset($_POST['stud_name'])) {
        $stud_name = mysqli_real_escape_string($con, $_POST['stud_name']);
        $stud_email = mysqli_real_escape_string($con, $_POST['stud_email']);
        $stud_mobile = mysqli_real_escape_string($con, $_POST['stud_mobile']);
        $stud_class = mysqli_real_escape_string($con, $_POST['stud_class']);
        $stud_total_fees = mysqli_real_escape_string($con, $_POST['stud_total_fees']);
        $stud_deposite_fees = mysqli_real_escape_string($con, $_POST['stud_deposite_fees']);
        $stud_pending_fees = mysqli_real_escape_string($con, $_POST['stud_pending_fees']);
        if(empty($stud_name) || empty($stud_email) || empty($stud_mobile) || empty($stud_mobile) || empty($stud_class) || empty($stud_total_fees) || empty($stud_deposite_fees) || empty($stud_pending_fees)) {
            echo "All fields are required";
            return;
        }

         if($_FILES['stud_profile']['name'] !='') {
            $fileName = $_FILES['stud_profile']['name'];
            $tmpName = $_FILES['stud_profile']['tmp_name'];
            $extension = pathinfo($fileName,PATHINFO_EXTENSION);
            $valid_ext = array("jpg","png","jpeg");
            if(in_array($extension,$valid_ext)) {
                $time = time();
                $newImageName =$time.$fileName;
                $path = "fileUploaded/".$newImageName;
                if(move_uploaded_file($tmpName,$path)) {
                    $sql = "insert into student_details(profile,name,email,mobile, class, total_fees, deposite_fees, pending_fees) values('$newImageName', '$stud_name', '$stud_email', $stud_mobile, '$stud_class', $stud_total_fees, $stud_deposite_fees, $stud_pending_fees)";
                    $result = mysqli_query($con,$sql) or die("query can't fire");
                    if($result) {
                      echo 1;
                    }
                    else {
                       echo 0;
                    }
                }
                
            }
            else {
                echo "Please select an Image File formate of - jpeg, jpg, png";
            }
        }
        else {
            echo "Please select the file";
        }

     }
?>