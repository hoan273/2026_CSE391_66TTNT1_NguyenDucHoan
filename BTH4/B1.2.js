let students = [];

let filteredStudents = [];

let sortAsc = true;

function rank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    let tbody = document.getElementById("tableBody");
    let noResult = document.getElementById("noResult");

    tbody.innerHTML = "";

    if(filteredStudents.length === 0){
        noResult.innerText = "Không có kết quả";
        return;
    }

    noResult.innerText = "";

    filteredStudents.forEach((sv,index)=>{

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${rank(sv.score)}</td>
        <td><button data-index="${sv.index}">Xóa</button></td>
        `;

        tbody.appendChild(tr);

    });

}

function applyFilters(){

    let keyword = document.getElementById("search").value.toLowerCase();
    let filterRank = document.getElementById("filterRank").value;

    filteredStudents = students
    .map((sv,i)=>({...sv,index:i}))
    .filter(sv=>{

        let matchName = sv.name.toLowerCase().includes(keyword);

        let r = rank(sv.score);

        let matchRank = filterRank === "all" || r === filterRank;

        return matchName && matchRank;

    });

    filteredStudents.sort((a,b)=>{

        return sortAsc ? a.score - b.score : b.score - a.score;

    });

    renderTable();

}

function addStudent(){

    let name = document.getElementById("name").value.trim();
    let score = parseFloat(document.getElementById("score").value);

    if(name === ""){
        alert("Tên không được trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0-10");
        return;
    }

    students.push({name,score});

    document.getElementById("name").value="";
    document.getElementById("score").value="";
    document.getElementById("name").focus();

    applyFilters();

}

document.getElementById("addBtn").addEventListener("click",addStudent);

document.getElementById("score").addEventListener("keypress",e=>{
    if(e.key==="Enter") addStudent();
});

document.getElementById("search").addEventListener("input",applyFilters);

document.getElementById("filterRank").addEventListener("change",applyFilters);

document.getElementById("scoreHeader").addEventListener("click",()=>{

    sortAsc = !sortAsc;

    let arrow = sortAsc ? " ▲" : " ▼";

    document.getElementById("scoreHeader").innerText = "Điểm"+arrow;

    applyFilters();

});

document.getElementById("tableBody").addEventListener("click",e=>{

    if(e.target.tagName==="BUTTON"){

        let index = e.target.dataset.index;

        students.splice(index,1);

        applyFilters();

    }

});

applyFilters();