document.addEventListener("DOMContentLoaded", () => {

    let students = [];
    let editIndex = -1;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const gridInput = document.getElementById("grid");
    const courseInput = document.getElementById("course");
    const tbody = document.getElementById("tbody");
    const total = document.getElementById("total");
    const emptyMsg = document.querySelector(".emptyMsg");

    document.getElementById("addBtn").addEventListener("click", (e) => {
        e.preventDefault();

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let grid = gridInput.value.trim();
        let course = courseInput.value;

        if (name === "" || email === "" || grid === "" || course === "") {
            alert("Please fill all fields!");
            return;
        }

        let student = { name, email, grid, course };

        if (editIndex === -1) {
            students.push(student);
        } else {
            students[editIndex] = student;
            editIndex = -1;
        }

        renderStudents();
        resetForm();
    });

    function renderStudents() {
        tbody.innerHTML = "";

        students.forEach((stu, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${stu.name}</td>
                    <td>${stu.email}</td>
                    <td>${stu.grid}</td>
                    <td>${stu.course}</td>
                    <td>
                        <button class="editBtn" onclick="editStudent(${index})">Edit</button>
                        <button class="deleteBtn" onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });

        total.textContent = students.length;
        emptyMsg.classList.toggle("hidden", students.length > 0);
    }

    function resetForm() {
        nameInput.value = "";
        emailInput.value = "";
        gridInput.value = "";
        courseInput.value = "";
    }

    window.editStudent = (i) => {
        let s = students[i];
        nameInput.value = s.name;
        emailInput.value = s.email;
        gridInput.value = s.grid;
        courseInput.value = s.course;

        editIndex = i;
    };

    window.deleteStudent = (i) => {
        if (confirm("Delete this student?")) {
            students.splice(i, 1);
            renderStudents();
        }
    };

});
