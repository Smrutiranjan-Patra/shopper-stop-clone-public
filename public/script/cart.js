let cont = document.getElementById("itemshere");
function senddata(user){
    if(user!="false"){
        if (localStorage.getItem("currentuser") != null) {
            localStorage.removeItem("currentuser");
        } 
        localStorage.setItem("currentuser", user);
    }
}
if (localStorage.getItem("cartproducts") === null) {
    localStorage.setItem("cartproducts", JSON.stringify([]));
}
var data = JSON.parse(localStorage.getItem("cartproducts"));
    if(data.length==0){
        getid("emptymsg").style.display="block";
        getid("cartpagebody").style.display="none";
    }
    else{
        appendData();
    }
var sub=0
var totalP=0;
for(var i=0;i<data.length;i++){
    sub= sub + data[i].Product_Price
}
var totalP = 250 +sub;
getid("subtotal").textContent=  "₹ "+ sub;
getid("total").textContent=  "₹ "+ totalP;
getid("pincode").addEventListener("click", function(){
    if(+getid("pinvalue").value>59999){
        alert("Delievery available")
    }
    else{
        alert("please enter a valid pin")
    }
})

getid("disbtn").addEventListener("click", function(){
    if(getid("discountcode").value==="masai21"){
        alert("30% Discount applied");
        var offer= Math.floor(0.30* totalP);
         getid("offer").textContent= "-" + offer;
         totalP= totalP-offer;
         getid("total").textContent=  "₹ "+ totalP;
    }
    else{
        alert("invalid pin")
    }
  
})
getid("checkout").addEventListener("click", ()=>{
        if (localStorage.getItem("prices") !== null) {
            localStorage.removeItem("prices");
        }
        if (localStorage.getItem("prices") === null) {
            localStorage.setItem("prices", JSON.stringify([]));
        }
        let prices = JSON.parse(localStorage.getItem("prices"));
        let pricedata={
            total: getid("total").textContent,
            subtotal:getid("subtotal").textContent,
            discount:getid("offer").textContent
    
        };
        prices.push(pricedata)
        localStorage.setItem("prices", JSON.stringify(prices));
        window.location.href="/cart/address"
    })
function create(element){return document.createElement(element);}
function getid(id){return document.getElementById(id)}
function appendData(){
   data.forEach((el)=>{
        var div= create("div");
        div.class="bag one";
        div.id="appendcont"
        div.innerHTML=` <div class="img"><img src=${el.Product_Image[0]}></div>
        <div id="prod_info nested">
        <div>
            <ul>
                <li>${el.Product_Brand}</li>
                <li >${el.Product_Title}</li>
                <li><div class="bag">
                    <div class="small-size">Type: ${el.Product_Type}</div>
                    <div class="small-size l">Size <select>
                        <option>XL</option>
                        <option>XXL</option>
                        <option>Medium</option>
                        <option>Small</option>
                    </select></div>
                    <div class="small-size l">Quantity <select>
                        <option class="qty" >1</option>
                        <option class="qty" >2</option>
                        <option class="qty" >3</option>
                        <option class="qty" >4</option>
                        <option class="qty" >5</option>
                        <option class="qty" >6</option>
                        <option class="qty" >7</option>
                        <option class="qty" >8</option>
                        <option class="qty" >9</option>
                    </select></div>
                    
                </div></li>
         </ul>
            <button style="margin-left:20%; " id=${el.Product_Id} class="remove"><img title="Remove item" src="https://cdn-icons-png.flaticon.com/512/3964/3964013.png" height=20px alt="Remove"></button>
            </div>
        
    </div>
    <div class="none"style="margin-right: 70px; margin-left:70px">
        <li class="small-size bag">Typically delivered 3 working days
        </li>
        <li class="small-size bag">Cash On Delivery</li>
        <li class="small-size bag">Express Store Pick Up</li>
        </div>
        <div class="none">
            <li class=" bag">  ₹  ${el.Product_Price}</li>           
        </div>
        </div>
        <hr>
        <div style="width:250%" class="line"></div>
        <hr>
        `
      cont.append(div);  
   })
}

let rmvbtns= document.querySelectorAll(".remove");

for(let i=0; i<rmvbtns.length;i++){
    rmvbtns[i].style.cursor="pointer";
    rmvbtns[i].addEventListener("click", function(){
        remove(rmvbtns[i].id)
    })
}

function remove(el){
    let my_prod_for_del = JSON.parse(localStorage.getItem("cartproducts"));

    let temporary_list = [];

    my_prod_for_del.forEach((pro) => {
        

        if (pro.Product_Id === el) {
           console.log("d");
        } else {
            temporary_list.push(pro)

        }
  })
 localStorage.setItem("cartproducts", JSON.stringify(temporary_list));
    window.location.reload();
}
let backbtn = document.getElementById("backpage");
backbtn.style.cursor="pointer";
backbtn.addEventListener("click", function (e) {
    window.history.go(-1);
})
function isAuthenticated() {
 let cookie= document.cookie.split("token=");
    if(cookie){
       if(cookie[1]?.length>100){
           return true
       }
    }
    return false  
 }
  
  
  
  
  

