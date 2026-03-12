function showError(id,message){

    document.getElementById(id+"Error").innerText = message;

}

function clearError(id){

    document.getElementById(id+"Error").innerText = "";

}

function validateFullname(){

    let name = document.getElementById("fullname").value.trim();

    let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

    if(name === ""){
        showError("fullname","Không được để trống");
        return false;
    }

    if(!regex.test(name)){
        showError("fullname","Ít nhất 3 ký tự, chỉ chữ và khoảng trắng");
        return false;
    }

    clearError("fullname");
    return true;

}

function validateEmail(){

    let email = document.getElementById("email").value.trim();

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        showError("email","Email không được trống");
        return false;
    }

    if(!regex.test(email)){
        showError("email","Email không đúng định dạng");
        return false;
    }

    clearError("email");
    return true;

}

function validatePhone(){

    let phone = document.getElementById("phone").value.trim();

    let regex = /^0\d{9}$/;

    if(phone === ""){
        showError("phone","SĐT không được trống");
        return false;
    }

    if(!regex.test(phone)){
        showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
        return false;
    }

    clearError("phone");
    return true;

}

function validatePassword(){

    let pass = document.getElementById("password").value;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(pass === ""){
        showError("password","Mật khẩu không được trống");
        return false;
    }

    if(!regex.test(pass)){
        showError("password","≥8 ký tự, có chữ hoa, thường và số");
        return false;
    }

    clearError("password");
    return true;

}

function validateConfirm(){

    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if(confirm !== pass){
        showError("confirmPassword","Mật khẩu không khớp");
        return false;
    }

    clearError("confirmPassword");
    return true;

}

function validateGender(){

    let gender = document.querySelector('input[name="gender"]:checked');

    if(!gender){
        showError("gender","Phải chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;

}

function validateTerms(){

    let terms = document.getElementById("terms").checked;

    if(!terms){
        showError("terms","Phải đồng ý điều khoản");
        return false;
    }

    clearError("terms");
    return true;

}

document.getElementById("fullname").addEventListener("blur",validateFullname);
document.getElementById("email").addEventListener("blur",validateEmail);
document.getElementById("phone").addEventListener("blur",validatePhone);
document.getElementById("password").addEventListener("blur",validatePassword);
document.getElementById("confirmPassword").addEventListener("blur",validateConfirm);

document.querySelectorAll("input").forEach(el=>{
    el.addEventListener("input",()=>{
        let id = el.id;
        if(id) clearError(id);
    });
});

document.getElementById("registerForm").addEventListener("submit",function(e){

    e.preventDefault();

    let valid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm() &
    validateGender() &
    validateTerms();

    if(valid){

        let name = document.getElementById("fullname").value;

        document.getElementById("registerForm").style.display="none";

        document.getElementById("successMsg").innerText =
        "Đăng ký thành công! 🎉 Xin chào " + name;

    }

});