function getid(id) {
    return document.getElementById(id);
}


function confirm(e) {
    e.preventDefault();
    window.location.href = "/cart/payment";
  }
  let backbtn = document.getElementById("backpage");
  backbtn.addEventListener("click", function (e) {
    window.history.go(-1);
  });

let prices = JSON.parse(localStorage.getItem("prices"));
if (prices) {
    var total = prices[0].total;
    var discount = prices[0].discount;
    var subtotal = prices[0].subtotal;
  
    getid("total").innerHTML = `${total}`;
    getid("offer").innerHTML = `${discount}`
    getid("subtotal").innerHTML = `${subtotal}`
}

let userdata = localStorage.getItem('currentuser');
if(userdata){
    let email = userdata ?.trim() ?.split("\n")[1] ?.split("email: ")[1] ?.split("'")[1]
    if (email == undefined) {
        email = JSON.parse(userdata).email;
    }
    getid("eMail").value = email;
}


if (!isAuthenticated()) {
    alert("You need to login to proceed")
    window.location.href = "/"
}


function isAuthenticated() {

    let cookie = document.cookie.split("token=");
    if (cookie) {
        if (cookie[1] ?.length > 100) {
            return true
        }
    }

    return false
}

function logout() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}