async function letload(){
  
   let prices =  await JSON.parse(localStorage.getItem("prices"));
   if(prices){

      var total = prices[0].total;
      var discount = prices[0].discount;
      var subtotal = prices[0].subtotal;
      getid("total").innerHTML = `${total}`;
      getid("totalpayble").innerHTML=`<b>Payable Amount: ${total}</b>`;
    getid("offer").innerHTML = `${discount}`
    getid("subtotal").innerHTML = `${subtotal}`
      
      
      getid("myForm").addEventListener("submit", validate)
   }
      
   
   
   
   let backbtn = document.getElementById("backpage");
   backbtn.style.cursor="pointer";
   backbtn.addEventListener("click", function (e) {
   
      window.history.go(-1);
   
   })
}
letload()

// ************





if(!isAuthenticated()){
   let text = "You need to login to proceed.";
   if (confirm(text) == true) {
      window.location.href="/";
   } else {
      window.location.href="/";
   }
  }
  
     
  function isAuthenticated() {
      
   let cookie= document.cookie.split("token=");
   if(cookie){
      if(cookie[1]?.length>100){
          return true
      }
   }
  
   return false  
}

    function getid(id) {
      return  document.getElementById(id);
   }


getid("discountdiv").style.display="none";
getid("checkout").style.display="none";




function validate(e){
   e.preventDefault()
   let card=getid("C-num").value;
   let cvv= getid("cvv").value;
   let date=getid("date").value;
   date=date.split("/");
   
   if(card.length!=16){
      alert("Enter your 16 digit valid card number");
      return
   }
   if(+date[0]>12){
      alert("Enter a valid expiry month");
      return
   }
   if(+date[1]<21){
      alert("Enter a valid expiry year");
      return
   }
   if(cvv.length<3){
      alert("Enter a valid CVV");
      return
   }
   pay(e)
}
function pay(e) {
   e.preventDefault();

   setTimeout(() => {
      alert("Payment successful!");
   }, 500);
   setTimeout(() => {
      alert("Your items will be deleivered in 2 days!");
   }, 1000);
   setTimeout(() => {
      window.location.href = "/"
   }, 2000);
}
