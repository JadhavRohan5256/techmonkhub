
// opening form on click of add btn 
const addBtn = document.querySelector('.add-btn');
const cancelForm = document.querySelector('.cancel-btn');
const employeeFormMain = document.querySelector('.employee-form-main');
const darkMode = document.querySelector('#darkMode');
const mode = document.querySelector('.mode');
const toastWrapper = document.querySelector('.toast-wrapper');
const fileWrapper = document.querySelector('.file_wrapper');
const studProfile = document.querySelector('#stud_profile');
const root = document.documentElement;
const submitBtn = document.querySelector('#submit-btn');
let studentArr = [];



// Theme javascript 
const dark = () => {
	root.style.setProperty('--bg-color', '#121212');
	root.style.setProperty('--bg-surface-color', '#212121');
	root.style.setProperty('--font-color', '#ffffff');
	root.style.setProperty('--primary-color', '#81D4FA');
	root.style.setProperty('--secondary-color', '#FF5722');
	root.style.setProperty('--error-color', '#721c24');
	root.style.setProperty('--error-bg', '#f8d7da');
	root.style.setProperty('--success-color', '#155724');
	root.style.setProperty('--success-bg', '#d4edda');
}

const light = () => {
	root.style.setProperty('--bg-color', '#eeeeee');
	root.style.setProperty('--bg-surface-color', '#ffffff');
	root.style.setProperty('--font-color', '#121212');
	root.style.setProperty('--primary-color', '#81D4FA');
	root.style.setProperty('--secondary-color', '#FF5722');
	root.style.setProperty('--error-color', '#721c24');
	root.style.setProperty('--error-bg', '#f8d7da');
	root.style.setProperty('--success-color', '#155724');
	root.style.setProperty('--success-bg', '#d4edda');
}

const applyTheme = () => {
	let storage  = localStorage.getItem("darkMode");
	if (storage === null || storage !== 'true') {
		mode.innerHTML = '<i class="fa-solid fa-moon theme-icons"></i>';
		light();
		darkMode.checked = true;
	} else {
		mode.innerHTML = '<i class="fa-solid fa-sun theme-icons"></i>';
		dark();
		localStorage.setItem("darkMode", true);
	}
}




// adding result data into table body function
const parseTableData = (result) => {
	studentArr = result;
	if (result.length <= 0) {
		let row = `
		<tr>
		<td colspan="10" class="not-found">No content found</td>
		</tr>
		`
		$('.all-employee').html(row);
	}
	else {
		let content = '';
		result.forEach((student) => {
			let row = `
			<tr>
			<td>
			<img src="fileUploaded/${student.profile}" alt="profile">
			</td>
			<td>${student.id}</td>
			<td>${student.name}</td>
			<td>${student.email}</td>
			<td>${student.mobile}</td>
			<td>${student.class}</td>
			<td>${student.total_fees}</td>
			<td>${student.deposite_fees}</td>
			<td>${student.pending_fees}</td>
			<td>
			<button onClick="deleteStudent(${student.id})" >delete</button>
			<button onClick="updateStudent(${student.id})" >edit</button>
			</td>
			</tr>
			`;
			content += row;
		})
		
		$('.all-employee').html(content);
	}
}


const toastTimeOut = () => {
	setInterval(() => {
		if (toastWrapper.firstChild !== null) {
			toastWrapper.removeChild(toastWrapper.firstChild);
		}
	}, 3000)
}

toastTimeOut();

// export items start
//toast javascript
function toast(messageType, messageDesc) {
	const div = document.createElement("div");
	div.classList.add("toast", messageType);
	div.setAttribute("onclick", "closeToast(this)");
	const p = document.createElement("p");
	p.classList.add('toast-message');
	p.textContent = messageDesc;
	const small = document.createElement("small");
	small.classList.add("fa-solid", "fa-xmark", "close-toast");
	div.appendChild(p);
	div.appendChild(small);
	toastWrapper.appendChild(div);
}

const closeToast = (current) => {
	current.remove();
}


// fetching all student data
// ajax call 
function load() {
	$(document).ready(() => {
		$('.loader').show();
		$.ajax({
			url: "read_student.php",
			type: "post",
			success: (data) => {
				if (data) {
					const studentList = JSON.parse(data);
					parseTableData(studentList);
					$('.loader').hide();
				}
			}
		});
	})
}

function deleteStudent(id) {
	if (id > 0) {
		$(document).ready(() => {
			$('.loader').show();
			$.ajax({
				url: "delete_student.php",
				type: "post",
				data: { 'id': id },
				success: (data) => {
					if (data === '1') {
						toast('success-message', `student are deleted`)
						$('.loader').hide();
						load();
					}
					else {
						data === '0'
							? toast('error-message', 'something went wrong in server please try after some time.')
							: toast('error-message', data)
						$('.loader').hide();
					}
				}
			});
		})
	}
}

function updateStudent(id) {
	const student  = studentArr.filter((stud) => stud.id == id);
	addBtn.click();
	
	$(document).ready(() => {
		$('.employee-title').html('Update Student');
		$('.selected_profile').attr('src',`fileUploaded/${student[0].profile}`);
		$('.selected_profile').css('display','block');
		$('.file_name').html(student[0].profile);
		$('#stud_id').val(student[0].id);
		$('#stud_name').val(student[0].name);
		$('#stud_email').val(student[0].email);
		$('#stud_mobile').val(student[0].mobile);
		$('#stud_class').val(student[0].class);
		$('#stud_total_fees').val(student[0].total_fees);
		$('#stud_deposite_fees').val(student[0].deposite_fees);
		$('#stud_pending_fees').val(student[0].pending_fees);
		$('#submit-btn').attr('data', 'update').html('Update')

	})
}


$(document).ready(() => {
	// fetching search data 
	$('#search').on('keyup', (e) => {
		const inputData = e.target.value;
		$('.loader').show();
		$.ajax({
			url: 'search_result.php',
			type: 'POST',
			data: { 'search': inputData },
			success: (data) => {
				const result = $.parseJSON(data);
				parseTableData(result);
				$('.loader').hide();
			}
		})
	})

	// inserting employee data 
	$('#studentForm').on("submit", function (e) {
		e.preventDefault();
		const dataAttr = submitBtn?.getAttribute('data');
		var data = new FormData(this);
		$('.loader').show();
		if (dataAttr === 'save') {
			setTimeout(() => {
				$.ajax({
					url: 'create_student.php',
					method: 'POST',
					data: data,
					contentType: false,
					processData: false,
					success: (data) => {
						if (data === '1') {
							$('#studentForm')[0].reset()
							$('.loader').hide();
							toast('success-message', 'successfully inserted');
							load();
						}
						else {
							$('.loader').hide();
							data !== 0
								? toast('error-message', data)
								: toast('error-message', 'something went wrong in server please try after some time');
						}
					}
				})
			}, 2000);
		}
		else {
			setTimeout(() => {
				$.ajax({
					url: 'update_student.php',
					method: 'POST',
					data: data,
					contentType: false,
					processData: false,
					success: (data) => {
						if (data === '1') {
							$('#studentForm')[0].reset()
							$('.loader').hide();
							toast('success-message', 'successfully updated');
							addBtn.click();
							load();
						}
						else {
							$('.loader').hide();
							data !== 0
								? toast('error-message', data)
								: toast('error-message', 'something went wrong in server please try after some time');
						}
					}
				})
			}, 2000);
		}
	})
})



// all events start
fileWrapper?.addEventListener('click', (e) => {
	studProfile.click();
})

studProfile?.addEventListener('change', (e) => {
	const file = e.target.files[0];

	if (file) {
		const file_name = file.name.toLowerCase();
		if (!file_name.endsWith('.png') && !file_name.endsWith('.jpeg') && !file_name.endsWith('.jpg')) {
			toast('error-message', 'only .png, .jpg, .jpeg formate are allowed');
			return;
		}

		document.querySelector('.file_name').textContent = file_name;
		let imgObj = document.querySelector('.selected_profile')
		imgObj.style.display = 'block';
		imgObj.src = URL.createObjectURL(file);
	}
})

darkMode.addEventListener('change', () => {
	if (darkMode.checked == true) {
		mode.innerHTML = '<i class="fa-solid fa-sun theme-icons"></i>';
		localStorage.setItem("darkMode", false);
		light();
	}
	else {
		mode.innerHTML = '<i class="fa-solid fa-moon theme-icons"></i>';
		localStorage.setItem("darkMode", true);
		dark();
	}
})

addBtn.addEventListener('click', () => {
	if (employeeFormMain.classList.contains('clear')) {
		employeeFormMain.classList.remove('clear');
	}
	else {
		employeeFormMain.classList.add('clear');
	}

})


cancelForm?.addEventListener('click', () => addBtn.click());
window.addEventListener("load", () => {
	applyTheme()
	load();
})
// all event end