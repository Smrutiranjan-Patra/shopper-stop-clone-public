var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000);
}

var slideIndex = 1;
gotoSlides(slideIndex);

function currentSlide(n) {
  gotoSlides((slideIndex = n));
}

function gotoSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function getid(id) {
  return document.getElementById(id);
}
function senddata(product, type, totalPages, page) {
  let mendata = JSON.parse(product);
  append(mendata);
  function pagination(current, totalPages, search) {
    let container = getid("paginationcontainer");
    let div = create("div");
    let prev = create("a");
    if (+current != 1) {
      let prevpage = +current - 1;
      prev.href = `/category?items=${search}&page=${prevpage}`;
    }
    prev.class = "pagenav";
    prev.innerHTML = "<< Previous";
    div.append(prev);

    for (var i = 1; i <= +totalPages; i++) {
      let pagenum = create("a");
      pagenum.innerHTML = i;
      if (+current != i) {
        pagenum.href = `/category?items=${search}&page=${i}`;
      } else pagenum.id = "current";

      div.append(pagenum);
    }
    let next = create("a");
    next.class = "pagenav";

    next.innerHTML = "Next >>";
    if (+current !== +totalPages) {
      let nextpage = +current + 1;
      next.href = `/category?items=${search}&page=${nextpage}`;
    }
    div.append(next);
    container.append(div);
  }
  pagination(page, totalPages, type);
  function dispay_sort(id) {
    let x = document.querySelectorAll(".topbelowsortoptions_dis");
    for (var i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    getid(id).style.display = "inline-block";
  }

  let options = document.querySelectorAll(".sortingbelow");
  options.forEach((element) => {
    element.addEventListener("click", () => {
      add(element.id.toUpperCase());
    });
  });

  let pricingoptions = document.querySelectorAll(".pricerange");
  pricingoptions.forEach((element) => {
    element.addEventListener("click", () => {
      pricerange(element.id);
    });
  });

  let clearbtn = document.querySelectorAll(".clear");
  clearbtn.forEach((element) => {
    element.addEventListener("click", () => {
      Clearall();
    });
  });

  function Clearall() {
    append(mendata);
    let checkbox = document.querySelectorAll(".sh");
    checkbox.forEach((element) => {
      element.checked = false;
    });
  }

  let colors = document.querySelectorAll(".colorselect");
  colors.forEach((element) => {
    element.addEventListener("click", () => {
      sortcolor(element.id.toUpperCase());
    });
  });

  function sortcolor(id) {
    let getData = [];
    mendata.forEach((el) => {
      if (el.Product_Color?.toUpperCase() == id) {
        getData.push(el);
      }
    });
    append(getData);
  }

  let sizes = document.querySelectorAll(".sizesort");
  sizes.forEach((element) => {
    element.addEventListener("click", () => {
      sortsize(element.id);
    });
  });

  function sortsize(el) {
    alert("Sorry, this size is not available");
  }
  let discount_sort = document.querySelectorAll(".discountsort");
  discount_sort.forEach((element) => {
    element.addEventListener("click", () => {
      sortdiscount(element.id);
    });
  });

  function sortdiscount(id) {
    let getData = [];
    if (+id < 100) {
      mendata.forEach((el) => {
        if (+el.Product_Discount == id) {
          getData.push(el);
        }
      });

      append(getData);
    } else {
      mendata.forEach((el) => {
        if (+el.Product_Price == id) {
          getData.push(el);
        }
      });

      append(getData);
    }
  }

  let brand_sort = document.querySelectorAll(".brand");
  brand_sort.forEach((element) => {
    element.addEventListener("click", () => {
      sortbrand(element.id.toUpperCase());
    });
  });

  function sortbrand(id) {
    let getData = [];

    mendata.forEach((el) => {
      if (el.Product_Brand == id) {
        getData.push(el);
      }
    });

    append(getData);
  }
  let sub_sort = document.querySelectorAll(".subcatsort");
  sub_sort.forEach((element) => {
    element.addEventListener("click", () => {
      sortsubcat(element.id.toUpperCase());
    });
  });
  function sortsubcat(element) {
    let getData = [];

    mendata.forEach((el) => {
      if (el.Product_Category?.toUpperCase() == element) {
        getData.push(el);
      }
    });

    append(getData);
  }

  function pricerange(e) {
    let range = e.trim().split("-").map(Number);
    var [min, max] = range;
    let getData = [];
    mendata.forEach((el) => {
      if (el.Product_Price >= min && el.Product_Price <= +max) {
        getData.push(el);
      }
    });

    append(getData);
  }

  function add(element) {
    let getData = [];
    for (var i = 0; i < mendata.length; i++) {
      if (mendata[i].OCCASION?.toUpperCase() == element) {
        getData.push(data[i]);
      }
    }

    append(getData);
  }

  function create(el) {
    return document.createElement(el);
  }

  function append(data) {
    let container = getid("product_container");
    container.innerHTML = "";
    data.forEach((el) => {
      let div = create("div");
      div.id = "maindiv";

      let img = create("img");
      img.src = el.Product_Image[0];
      img.alt = el.Product_Description;
      if (!img.src) {
        img.src = "https://via.placeholder.com/430";
      }
      img.style.height = "370px";
      img.id = "prodimg";
      img.style.top = "0px";
      img.style.width = "100%";
      let fav_btn = create("button");
      fav_btn.innerHTML = `<i class="far fa-heart"></i>`;
      fav_btn.id = "fav_btn";
      fav_btn.onclick = function () {
       
        favoritevalidation(el);
      };

      let desc_div = create("div");
      desc_div.addEventListener("click", () => {
        gotoproduct(el._id);
      });
      desc_div.style.cursor = "pointer";
      let brand = create("h4");
      brand.innerHTML = el.Product_Brand;
      let title = create("p");
      title.innerHTML = el.Product_Title;
      let price = create("p");
      if (+el.Product_Discount > 0) {
        price.innerHTML = `₹  ${el.Product_Price} MRP <strike> ₹ ${el.Product_MRP}</strike> (${el.Product_Discount} %OFF)`;
      } else price.innerHTML = "₹ " + el.Product_Price;
      desc_div.append(brand, title, price);
      div.append(fav_btn, img, desc_div);

      container.append(div);
    });
  }

  getid("Popular").addEventListener("click", () => {
    popular();
  });
  getid("Discount").addEventListener("click", () => {
    discount();
  });
  getid("sortlow").addEventListener("click", () => {
    lowtohigh();
  });
  getid("sorthigh").addEventListener("click", () => {
    hightolow();
  });

  function popular() {
    let arr = mendata.sort(function (a, b) {
      return a.Product_Rating - b.Product_Rating;
    });
    append(arr);
  }

  function discount() {
    let arr = mendata.sort(function (b, a) {
      return a.Product_Discount - b.Product_Discount;
    });
    append(arr);
  }

  function lowtohigh() {
    let arr = mendata.sort(function (a, b) {
      return a.Product_Price - b.Product_Price;
    });
    append(arr);
  }

  function hightolow() {
    let arr = mendata.sort(function (b, a) {
      return a.Product_Price - b.Product_Price;
    });
    append(arr);
  }

  function gotoproduct(el) {
    window.location.href = "/" + el;
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
  function favoritevalidation(el){
    if (isAuthenticated()) {
        addtofav(el)
        let x = JSON.parse(localStorage.getItem("wishlistproducts")).length;
        if(+x>0){
            getid("countfav").innerHTML=x;
        } 
    }
    else{
      let text = "You need to login to add items to your favorites";
      if (confirm(text) == true) {
          document.querySelector(".container").style.display = "block";
      } 
    }
  }

  function addtofav(el) {
    if (localStorage.getItem("wishlistproducts") === null) {
      localStorage.setItem("wishlistproducts", JSON.stringify([]));
    }
    let wishlistproduct = JSON.parse(localStorage.getItem("wishlistproducts"));
    wishlistproduct.push(el);
    localStorage.setItem("wishlistproducts", JSON.stringify(wishlistproduct));
  }

  getid("refinesearch").addEventListener("click", function () {
    refineprice();
  });

  function refineprice() {
    let minprice = getid("minamount").value;
    let maxprice = getid("maxamount").value;
    if (+minprice > +maxprice) {
      alert("Please enter valid prices");
    } else {
      let getData = [];
      mendata.forEach((el) => {
        if (el.Product_Price >= +minprice && el.Product_Price <= +maxprice) {
          getData.push(el);
        }
      });

      append(getData);
    }
  }
}
// let backbtn = document.getElementById("backpage");

// backbtn.style.cursor = "pointer";
// backbtn.addEventListener("click", function (e) {
//   window.history.go(-1);
// });
getid("Sort_GENDER")?.addEventListener("click", () => {
  dispay_sort("gendersort");
});
getid("Sort_FABRIC")?.addEventListener("click", () => {
  dispay_sort("fabricsort");
});
getid("Sort_LENGTH")?.addEventListener("click", () => {
  dispay_sort("lengthsort");
});
getid("Sort_OCCASION")?.addEventListener("click", () => {
  dispay_sort("occasionsort");
});
getid("Sort_CATEGORY")?.addEventListener("click", () => {
  dispay_sort("categorysort");
});

//----------------------------------------------------------------

var btn = document.getElementById("option11");

btn.addEventListener("click", show1);
var count = 0;
var arrow11 = document.getElementById("arrow11");

function show1() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow11.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow11.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btnmeh = document.getElementById("option11");
const list1 = document.getElementById("st11");

list1.style.display = "none";
btnmeh.addEventListener("click", (event) => {
  if (list1.style.display == "none") {
    list1.style.display = "block";
    // console.log(list);
  } else {
    list1.style.display = "none";
  }
});

//---------------------------------------------------------------------------------------

var btn = document.getElementById("option12");

btn.addEventListener("click", show2);
var count = 0;
var arrow12 = document.getElementById("arrow12");

function show2() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow12.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow12.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn2 = document.getElementById("option12");
const list2 = document.getElementById("st12");

list2.style.display = "none";
btn2.addEventListener("click", (event) => {
  if (list2.style.display == "none") {
    list2.style.display = "block";
    // console.log(list);
  } else {
    list2.style.display = "none";
  }
});

//-----------------------------------------------------------------------------

var btn = document.getElementById("option13");

btn.addEventListener("click", show3);
var count = 0;
var arrow13 = document.getElementById("arrow13");

function show3() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow13.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow13.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn3 = document.getElementById("option13");
const list3 = document.getElementById("st13");

list3.style.display = "none";
btn3.addEventListener("click", (event) => {
  if (list3.style.display == "none") {
    list3.style.display = "block";
    // console.log(list);
  } else {
    list3.style.display = "none";
  }
});

//---------------------------------------------------------------------------

var btn = document.getElementById("option14");

btn.addEventListener("click", show4);
var count = 0;
var arrow14 = document.getElementById("arrow14");

function show4() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow14.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow14.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn4 = document.getElementById("option14");
const list4 = document.getElementById("st14");

list4.style.display = "none";
btn4.addEventListener("click", (event) => {
  if (list4.style.display == "none") {
    list4.style.display = "block";
    // console.log(list);
  } else {
    list4.style.display = "none";
  }
});

//------------------------------------------------------------------------------------

var btn = document.getElementById("option15");

btn.addEventListener("click", show5);
var count = 0;
var arrow15 = document.getElementById("arrow15");

function show5() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow15.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow15.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn5 = document.getElementById("option15");
const list5 = document.getElementById("st15");

list5.style.display = "none";
btn5.addEventListener("click", (event) => {
  if (list5.style.display == "none") {
    list5.style.display = "block";
    // console.log(list);
  } else {
    list5.style.display = "none";
  }
});

//----------------------------------------------------------------------------------

var btn = document.getElementById("option4");

btn.addEventListener("click", show);
var count = 0;
var arrow4 = document.getElementById("arrow4");

function show() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow4.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow4.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn40 = document.getElementById("option4");
const list40 = document.getElementById("color");

list40.style.display = "none";
btn40.addEventListener("click", (event) => {
  if (list40.style.display == "none") {
    list40.style.display = "block";
    // console.log(list);
  } else {
    list40.style.display = "none";
  }
});

//-------------------------------------------------------------------------------

var btn = document.getElementById("option16");

btn.addEventListener("click", show6);
var count = 0;
var arrow16 = document.getElementById("arrow16");

function show6() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow16.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow16.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn6 = document.getElementById("option16");
const list6 = document.getElementById("st16");

list6.style.display = "none";
btn6.addEventListener("click", (event) => {
  if (list6.style.display == "none") {
    list6.style.display = "block";
    // console.log(list);
  } else {
    list6.style.display = "none";
  }
});

//------------------------------------------------------------------------------------------

var btn = document.getElementById("option17");

btn.addEventListener("click", show7);
var count = 0;
var arrow17 = document.getElementById("arrow17");

function show7() {
  count++;
  // console.log(count); // show count
  if (count % 2 == 0) {
    arrow17.className = "fas fa-chevron-down";
  } else if (count % 2 !== 0) {
    arrow17.className = "fa-rotate-180 fas fa-chevron-down";
  }
}

const btn7 = document.getElementById("option17");
const list7 = document.getElementById("st17");

list7.style.display = "none";
btn7.addEventListener("click", (event) => {
  if (list7.style.display == "none") {
    list7.style.display = "block";
    // console.log(list);
  } else {
    list7.style.display = "none";
  }
});





