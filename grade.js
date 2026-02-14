const btnCgpa = document.getElementById("btnCgpa");
const btnSgpa = document.getElementById("btnSgpa");
const sgpaSection = document.getElementById("sgpaSection");
const cgpaSection = document.getElementById("cgpaSection");
const sgpaSubjects = document.getElementById("sgpaSubjects");
const addSgpaSubject = document.getElementById("addSgpaSubject");
const semestersContainer = document.getElementById("semesters");
const addSemesterBtn = document.getElementById("addSemester");
const crenum_1 = document.getElementById("crenum1");
const crenum_2 = document.getElementById("crenum2");

let crenum1 = 0, crenum2 = 0;
crenum_1.addEventListener("input", () =>{
    crenum1 = Number(crenum_1.value);
});

crenum_2.addEventListener("input", () =>{
    crenum2 = Number(crenum_2.value);
});

sgpaSection.style.display = "block";
cgpaSection.style.display = "none";

btnCgpa.onclick = () => {
    sgpaSection.style.display = "none";
    cgpaSection.style.display = "block";
};

btnSgpa.onclick = () => {
    cgpaSection.style.display = "none";
    sgpaSection.style.display = "block";
};


function toggleRemoveButtons(container) {
    const rows = container.querySelectorAll(".subject-row");
    rows.forEach(row => {
        const btn = row.querySelector(".remove-btn");
        btn.style.display = rows.length > 1 ? "inline-block" : "none";
    });
}


function updateSubjectNumbers(container) {
    const rows = container.querySelectorAll(".subject-row");
    rows.forEach((row, index) => {
        const subjectInput = row.querySelector("input[type='text']");
        if (subjectInput) {
            subjectInput.placeholder = "Subject " + (index + 1);
        }
    });
}


addSgpaSubject.onclick = () => {
    const template = sgpaSubjects.firstElementChild;
    const newRow = template.cloneNode(true);

    newRow.querySelectorAll("input").forEach(i => i.value = "");
    newRow.querySelector("select").selectedIndex = 0;

    sgpaSubjects.appendChild(newRow);

    toggleRemoveButtons(sgpaSubjects);
    updateSubjectNumbers(sgpaSubjects);   
};


addSemesterBtn.onclick = () => {
    const template = semestersContainer.firstElementChild;
    const newSemester = template.cloneNode(true);

    newSemester.querySelectorAll("input").forEach(i => i.value = "");
    newSemester.querySelectorAll("select").forEach(s => s.selectedIndex = 0);

    semestersContainer.appendChild(newSemester);
    updateSemesterNumbers();
};

document.addEventListener("click", (e) => {

    
    if (e.target.textContent === "Remove") {
        const row = e.target.parentElement;
        const container = row.parentElement;

        if (container.children.length > 1) {
            row.remove();
            toggleRemoveButtons(container);
            updateSubjectNumbers(container);   
        }
    }

    
    if (e.target.textContent === "Add Subject" && e.target.id === "addCgpaSubject") {
        const semester = e.target.parentElement;
        const subjectsContainer = semester.children[1];
        const template = subjectsContainer.firstElementChild;
        const newRow = template.cloneNode(true);

        newRow.querySelectorAll("input").forEach(i => i.value = "");
        newRow.querySelectorAll("select").forEach(s => s.selectedIndex = 0);

        subjectsContainer.appendChild(newRow);

        toggleRemoveButtons(subjectsContainer);
        updateSubjectNumbers(subjectsContainer);   
    }

   
    if (e.target.textContent === "Remove Semester") {
        const semester = e.target.closest("#sem");

        if (semestersContainer.children.length > 1) {
            semester.remove();
            updateSemesterNumbers();
        }
    }
});


function updateSemesterNumbers() {
    Array.from(semestersContainer.children).forEach((sem, index) => {
        sem.querySelector("h3").textContent = "Semester " + (index + 1);
    });
}


updateSubjectNumbers(sgpaSubjects);





document.getElementById("calcSgpa").onclick = () => {
    const rows = sgpaSubjects.querySelectorAll(".subject-row");

    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const credit = Number(row.querySelector(".credits").value);
        const grade = row.querySelector(".grade").value;

        if (credit > 0 && grade !== "Grade Points") {
            const gp = Number(grade.split(" ")[0]);
            totalPoints += credit * gp;
        }
    });

    if (totalCredits === 0) {
        alert("Please fill all subjects properly!");
        return;
    }

    const sgpa = (totalPoints / totalCredits).toFixed(2);
    alert("Your SGPA is: " + sgpa);
};


document.getElementById("calcCgpa").onclick = () => {
    const semesters = semestersContainer.children;

    let totalCreditsAll = 0;
    let totalPointsAll = 0;

    Array.from(semesters).forEach(sem => {
        const rows = sem.querySelectorAll(".subject-row");

        rows.forEach(row => {
            const credit = Number(row.querySelector(".credits").value);
            const grade = row.querySelector(".grade").value;

            if (credit > 0 && grade !== "Grade Points") {
                const gp = Number(grade.split(" ")[0]);
                totalCreditsAll += credit;
                totalPointsAll += credit * gp;
            }
        });
    });

    if (totalCreditsAll === 0) {
        alert("Please fill all semesters properly!");
        return;
    }

    const cgpa = (totalPointsAll / totalCreditsAll).toFixed(2);
    alert("Your CGPA is: " + cgpa);
};