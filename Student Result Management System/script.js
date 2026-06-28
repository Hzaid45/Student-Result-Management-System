let nameinput = document.querySelector("#name");
let marksinput = document.querySelector("#marks");

const addBtn = document.querySelector("#addBtn");

const totalMarksBtn = document.querySelector("#totalMarksBtn");
const passedStudentBtn = document.querySelector("#passedBtn");
const topStudentBtn = document.querySelector("#topStudentBtn");
const resetBtn = document.querySelector("#resetBtn");

const studentTableBody = document.querySelector("#studentTableBody");

const totalStudents = document.querySelector("#totalStudents");
const totalMarks = document.querySelector("#totalMarks");
const passedStudents = document.querySelector("#passedStudents");
const topStudent = document.querySelector("#topStudent");

let students = [];

addBtn.addEventListener('click',() =>{
    const name = nameinput.value.trim();
    const marks = Number(marksinput.value);

    if(name ==="" || marksinput.value === ""){
        alert("Please fill all fields");
        return;
    }

    const student = {
        name,
        marks
    };
    students.push(student);
    console.log(students);
    displayStudents();

    nameinput.value = "";
    marksinput.value = "";
});

//display all student

const displayStudents = () =>{
    studentTableBody.innerHTML = "";
    students.forEach((student,index) =>{
        let grade = getGrade(student.marks)
        let row = `
        <tr>
            <td>${index+1}</td>
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>${grade}</td>
            <td>
                <button onclick = "deleteStudent(${index})"class="delete-btn">
                    Delete
                </button>
            </td>
        </tr>`;

        studentTableBody.innerHTML += row; 
    });

    totalStudents.textContent = students.length;

};

//grades

const getGrade = (marks) => {

    if (marks >= 90) {
        return "A+";
    } 
    else if (marks >= 80) {
        return "A";
    } 
    else if (marks >= 70) {
        return "B";
    } 
    else if (marks >= 60) {
        return "C";
    } 
    else if (marks >= 50) {
        return "D";
    } 
    else {
        return "F";
    }

};

//delete

const deleteStudent = (index) =>{
    students.splice(index,1);
    displayStudents();
};

//total marks

totalMarksBtn.addEventListener("click", () =>{
    let total = students.reduce((sum, student) =>{
        return sum + student.marks;
    },0);
    totalMarks.textContent = total;
});

//passed student

passedStudentBtn.addEventListener('click',() =>{
    let passed = students.filter(student => student.marks >=50);

    passedStudents.textContent = passed.length;
});

//top student

topStudentBtn.addEventListener('click',() =>{
    if(students.length ===0){
        topStudent.textContent = "-";
        return;
    }
    let topper = students.reduce((max,student) =>{
        return student.marks > max.marks ? student : max;
    });
    topStudent.textContent = `${topper.name} (${topper.marks})`;
});

//reset

resetBtn.addEventListener('click' , ()=>{
    students =[];
    studentTableBody.innerHTML = "";
    totalMarks.textContent = "0";
    totalStudents.textContent = "0";
    passedStudents.textContent = "0";
    topStudent.textContent = "0";
});