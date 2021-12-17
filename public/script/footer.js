var btn = document.getElementById("option");
        
btn?.addEventListener("click", show);
var parent = document.getElementById("box");
var count = 0
var arrow = document.getElementById("arrow");
function show() {
    count++;
    if (count % 2 == 0) {
        arrow.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn1 = document.getElementById("option");
const list = document.getElementById("st");
if(list){
    list.style.display == "none"
}
btn1?.addEventListener("click", (event)=>{
    if(list.style.display == "none"){
        list.style.display = "block"; 
    } else{
        list.style.display = "none";
    }
});
