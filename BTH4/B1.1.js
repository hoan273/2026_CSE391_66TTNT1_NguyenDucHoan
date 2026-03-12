let students = [];

function rank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    students.forEach((sv,index)=>{

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("yeu");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${rank(sv.score)}</td>
        <td><button data-index="${index}" class="deleteBtn">Xóa</button></td>
        `;

        tbody.appendChild(tr);

    });

    updateStats();
}

function updateStats(){

    let total = students.length;
    let sum = students.reduce((s,sv)=> s + sv.score ,0);
    let avg = total ? (sum/total).toFixed(2) : 0;

    document.getElementById("stats").innerText =
    `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

function addStudent(){

    let name = document.getElementById("name").value.trim();
    let score = parseFloat(document.getElementById("score").value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({name,score});

    renderTable();

    document.getElementById("name").value="";
    document.getElementById("score").value="";
    document.getElementById("name").focus();
}

document.getElementById("addBtn").addEventListener("click",addStudent);

document.getElementById("score").addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

document.getElementById("tableBody").addEventListener("click",function(e){

    if(e.target.classList.contains("deleteBtn")){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }
});