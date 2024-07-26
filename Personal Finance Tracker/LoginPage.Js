function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == "Rifath" || password == "3853532") {
     alert("Welcome to Personal Finance Traker");
        return true;
    }
    else{
        alert("Wrong Username or password");
        return false;
    }

    
}
function change(){
    window.location.replace("Dashboard.html");
}

function changePage() {
    if(validateForm()){
        change();
    }
    return false;
        
}
