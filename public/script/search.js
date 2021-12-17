function senddata(product, search, current, totalPages) {
  let mydata = JSON.parse(product);
  getid("category text").innerText = `Searched item: "${search}"`;

  if (mydata.length == 0) {
    // alert("no product found");
    shownoproduct();
    // do something we will create a div that shows no page found  alert("No result found")
  } else {
    append(mydata);
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
      append(mydata);
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
      mydata.forEach((el) => {
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
        mydata.forEach((el) => {
          if (+el.Product_Discount == id) {
            getData.push(el);
          }
        });

        append(getData);
      } else {
        data.forEach((el) => {
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

      mydata.forEach((el) => {
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

      mydata.forEach((el) => {
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
      mydata.forEach((el) => {
        if (el.Product_Price >= min && el.Product_Price <= +max) {
          getData.push(el);
        }
      });

      append(getData);
    }

    function add(element) {
      let getData = [];
      for (var i = 0; i < data.length; i++) {
        if (data[0][i].OCCASION?.toUpperCase() == element) {
          getData.push(data[i]);
        }
      }

      append(getData);
    }

    function append(data) {
      let container = getid("product_container");
      container.innerHTML = "";
      data.forEach((el) => {
        let div = create("div");
        div.id = "maindiv";
        div.addEventListener("click", () => {
          gotoproduct(el._id);
        });
        let img = create("img");
        img.src = el.Product_Image[0];
        img.style.height = "430px";
        img.style.width = "100%";
        let desc_div = create("div");
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
        div.append(img, desc_div);
        container.append(div);
      });
    }
    function pagination(current, totalPages, search) {
      let container = getid("paginationcontainer");
      let div = create("div");
      let prev = create("a");
      if (+current != 1) {
        let prevpage = +current - 1;
        prev.href = `/search?search=${search}&page=${prevpage}`;
      }
      prev.class = "pagenav";
      prev.innerHTML = "<< Previous";
      div.append(prev);

      for (var i = 1; i <= +totalPages; i++) {
        let pagenum = create("a");
        pagenum.innerHTML = i;
        if (+current != i) {
          pagenum.href = `/search?search=${search}&page=${i}`;
        } else pagenum.id = "current";

        div.append(pagenum);
      }
      let next = create("a");
      next.class = "pagenav";

      next.innerHTML = "Next >>";
      if (+current !== +totalPages) {
        let nextpage = +current + 1;
        next.href = `/search?search=${search}&page=${nextpage}`;
      }
      div.append(next);
      container.append(div);
    }
    pagination(current, totalPages, search);

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
      let arr = mydata.sort(function (a, b) {
        return a.Product_Rating - b.Product_Rating;
      });
      append(arr);
    }

    function discount() {
      let arr = mydata.sort(function (b, a) {
        return a.Product_Discount - b.Product_Discount;
      });
      append(arr);
    }

    function lowtohigh() {
      let arr = mydata.sort(function (a, b) {
        return a.Product_Price - b.Product_Price;
      });
      append(arr);
    }

    function hightolow() {
      let arr = mydata.sort(function (b, a) {
        return a.Product_Price - b.Product_Price;
      });
      append(arr);
    }

    function gotoproduct(el) {
      window.location.href = "/" + el;
    }

    function addtofav(el) {
      if (localStorage.getItem("wishlistproducts") === null) {
        localStorage.setItem("wishlistproducts", JSON.stringify([]));
      }
      let wishlistproduct = JSON.parse(
        localStorage.getItem("wishlistproducts")
      );
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

        mydata.forEach((el) => {
          if (el.Product_Price >= +minprice && el.Product_Price <= +maxprice) {
            getData.push(el);
          }
        });

        append(getData);
      }
    }
  }
}

function getid(id) {
  return document.getElementById(id);
}

function shownoproduct() {
  let container = getid("product_container");
  container.innerHTML = "";
  let div = create("div");
  let img = create("img");
  img.src = "https://www.dlinkmea.com/images/no-product.png";
  div.append(img);
  container.append(div);
}
function create(el) {
  return document.createElement(el);
}

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
