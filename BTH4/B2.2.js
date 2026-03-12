const prices = {
    "Áo":150000,
    "Quần":200000,
    "Giày":500000
};

function showError(id,msg){
    document.getElementById(id+"Error").innerText = msg;
}

function clearError(id){
    document.getElementById(id+"Error").innerText = "";
}

function validateProduct(){

    let p = document.getElementById("product").value;

    if(p===""){
        showError("product","Phải chọn sản phẩm");
        return false;
    }

    clearError("product");
    return true;
}

function validateQuantity(){

    let q = parseInt(document.getElementById("quantity").value);

    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantity","1-99");
        return false;
    }

    clearError("quantity");
    return true;
}

function validateDate(){

    let d = new Date(document.getElementById("date").value);
    let now = new Date();

    let max = new Date();
    max.setDate(now.getDate()+30);

    if(d < now){
        showError("date","Không được trong quá khứ");
        return false;
    }

    if(d > max){
        showError("date","Không quá 30 ngày");
        return false;
    }

    clearError("date");
    return true;
}

function validateAddress(){

    let a = document.getElementById("address").value.trim();

    if(a.length < 10){
        showError("address","Ít nhất 10 ký tự");
        return false;
    }

    clearError("address");
    return true;
}

function validateNote(){

    let note = document.getElementById("note").value;

    if(note.length > 200){
        showError("note","Tối đa 200 ký tự");
        return false;
    }

    clearError("note");
    return true;
}

function validatePay(){

    let pay = document.querySelector('input[name="pay"]:checked');

    if(!pay){
        showError("pay","Chọn phương thức");
        return false;
    }

    clearError("pay");
    return true;
}

function calcTotal(){

    let p = document.getElementById("product").value;
    let q = parseInt(document.getElementById("quantity").value);

    if(prices[p] && q){

        let total = prices[p]*q;

        document.getElementById("total").innerText =
        total.toLocaleString("vi-VN");

    }

}

document.getElementById("product").addEventListener("change",calcTotal);
document.getElementById("quantity").addEventListener("input",calcTotal);

document.getElementById("note").addEventListener("input",function(){

    let len = this.value.length;

    document.getElementById("charCount").innerText =
    len + "/200";

    if(len>200){
        document.getElementById("charCount").style.color="red";
    }else{
        document.getElementById("charCount").style.color="black";
    }

});

document.getElementById("orderForm").addEventListener("submit",function(e){

    e.preventDefault();

    let valid =
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePay();

    if(!valid) return;

    let p = document.getElementById("product").value;
    let q = document.getElementById("quantity").value;
    let d = document.getElementById("date").value;

    let total = prices[p]*q;

    document.getElementById("summary").innerHTML =
    `
    Sản phẩm: ${p} <br>
    Số lượng: ${q} <br>
    Tổng tiền: ${total.toLocaleString("vi-VN")} VND <br>
    Ngày giao: ${d}
    `;

    document.getElementById("confirmBox").style.display="block";

});

document.getElementById("confirmBtn").onclick=function(){

    document.getElementById("confirmBox").style.display="none";
    document.getElementById("orderForm").style.display="none";

    document.getElementById("success").innerText =
    "Đặt hàng thành công 🎉";

}

document.getElementById("cancelBtn").onclick=function(){

    document.getElementById("confirmBox").style.display="none";

}