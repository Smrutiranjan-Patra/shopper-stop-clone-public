function getid(id) {
  return document.getElementById(id);
}
function create(el) {
  return document.createElement(el);
}

let favdata = JSON.parse(localStorage.getItem("wishlistproducts"));
append(favdata);

let userdata = localStorage.getItem("currentuser");
if(userdata){
let email = userdata
  ?.trim()
  ?.split("\n")[1]
  ?.split("email: ")[1]
  ?.split("'")[1];
if (email == undefined) {
  email = JSON.parse(userdata).email;
}
getid("logout").style.cursor = "pointer";
getid("userdetails").innerHTML = `<p>Welcome back</p><p>email : ${email}</p>`;
getid("wishhead").innerText = "Wishlist " + "(" + favdata.length + ")";
getid("logout").addEventListener("click", function () {
  logout();
});
}

function append(data) {
  let container = getid("product_container");
  container.innerHTML = "";
  data.forEach((el) => {
    let div = create("div");
    div.id = "maindiv";
    // div.addEventListener("click", () => {
    //   gotoproduct(el._id);
    // });
    
    let img = create("img");
    img.src = el.Product_Image[0];
    img.style.height = "200px";
    let cross = create("h3");
    cross.innerText = "❌";
    cross.id="removebtn";
    cross.onclick = function(){
       removeproduct(el)
    }
    let desc_div = create("div");
    desc_div.style.cursor = "pointer";
    let brand = create("h4");
    brand.innerHTML = el.Product_Brand;
    let title = create("p");
    title.innerHTML = el.Product_Title;
    let price = create("p");
    let btn = create("button");
    btn.innerHTML = `<p><b>Move to bag<b/></p>`;
    btn.onclick = () => {
      addtoBag(el);
      removeproduct(el)
    };
    if (+el.Product_Discount > 0) {
      price.innerHTML = `₹  ${el.Product_Price} MRP <strike> ₹ ${el.Product_MRP}</strike> (${el.Product_Discount} %OFF)`;
    } else price.innerHTML = "₹ " + el.Product_Price;
    desc_div.append(cross, brand, title, price);
    div.append(img, desc_div, btn);
    container.append(div);
  });
}

// ****for now we are using local stroage for adding cart products

function addtoBag(el) {
  if (localStorage.getItem("cartproducts") === null) {
    localStorage.setItem("cartproducts", JSON.stringify([]));
  }
  let cartproduct = JSON.parse(localStorage.getItem("cartproducts"));
  cartproduct.push(el);
  localStorage.setItem("cartproducts", JSON.stringify(cartproduct));
}

//***********


if(!isAuthenticated()){
   let text = "You need to login to proceed.";
   if (confirm(text) == true) {
      window.location.href="/";
   } else {
      window.location.href="/";
   }
  }

function isAuthenticated() {
  let cookie = document.cookie.split("token=");
  if (cookie) {
    if (cookie[1]?.length > 100) {
      return true;
    }
  }

  return false;
}

function logout() {
  localStorage.removeItem("currentuser");
  var cookies = document.cookie.split("; ");
  for (var c = 0; c < cookies.length; c++) {
    var d = window.location.hostname.split(".");
    while (d.length > 0) {
      var cookieBase =
        encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
        "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
        d.join(".") +
        " ;path=";
      var p = location.pathname.split("/");
      document.cookie = cookieBase + "/";
      while (p.length > 0) {
        document.cookie = cookieBase + p.join("/");
        p.pop();
      }
      d.shift();
    }
  }
  window.location.href = "/";
}

function gotoproduct(el) {
  window.location.href = "/" + el;
}




function removeproduct(el){
  let my_prod_for_del = JSON.parse(localStorage.getItem("wishlistproducts"));
  let temporary_list = [];
  my_prod_for_del.forEach((pro) => {
      if (pro.Product_Id == el.Product_Id) {
         console.log("d");
      } else {
          temporary_list.push(pro)

      }
})

localStorage.setItem("wishlistproducts", JSON.stringify(temporary_list));
   window.location.reload();
}

