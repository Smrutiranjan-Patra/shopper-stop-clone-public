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

function senddata(product, type, totalPages, page) {
    let data = JSON.parse(product);
    append(data);

    function pagination(current, totalPages, search) {
        let container = getid("paginationcontainer");
        let div = create("div");
        let prev = create("a");
        if (+current != 1) {
            let prevpage = +current - 1;
            prev.href = `/category?items=${search}&page=${prevpage}`
        }
        prev.class = "pagenav";
        prev.innerHTML = "<< Previous";
        div.append(prev)

        for (var i = 1; i <= +totalPages; i++) {
            let pagenum = create("a");
            pagenum.innerHTML = i;
            if (+current != i) {
                pagenum.href = `/category?items=${search}&page=${i}`;
            } else pagenum.id = "current";

            div.append(pagenum)
        }
        let next = create("a");
        next.class = "pagenav"

        next.innerHTML = "Next >>";
        if (+current !== +totalPages) {
            let nextpage = +current + 1;
            next.href = `/category?items=${search}&page=${nextpage}`
        }
        div.append(next);
        container.append(div)
    }
    pagination(page, totalPages, type)




    let options = document.querySelectorAll(".sortingbelow");
    options.forEach(element => {
        element.addEventListener("click", () => {
            add(element.id.toUpperCase())
        })
    })

    let pricingoptions = document.querySelectorAll(".pricerange");
    pricingoptions.forEach(element => {
        element.addEventListener("click", () => {
            pricerange(element.id)
        })
    })

    let clearbtn = document.querySelectorAll(".clear");
    clearbtn.forEach(element => {
        element.addEventListener("click", () => {
            Clearall();
        })
    })

    function Clearall() {
        append(beautydata)
        let checkbox = document.querySelectorAll(".sh");
        checkbox.forEach(element => {
            element.checked = false;
        })
    }

    let colors = document.querySelectorAll(".colorselect");
    colors.forEach(element => {
        element.addEventListener("click", () => {
            sortcolor(element.id.toUpperCase())
        })
    })


    function sortcolor(id) {
        let getData = [];
        data.forEach((el) => {
            if (el.Product_Color ?.toUpperCase() == id) {
                getData.push(el)
            }
        })
        append(getData)
    }

    let sizes = document.querySelectorAll(".sizesort");
    sizes.forEach(element => {
        element.addEventListener("click", () => {
            sortsize(element.id)
        })
    })

    function sortsize(el) {
        alert("Sorry, this size is not available")

    }
    let discount_sort = document.querySelectorAll(".discountsort");
    discount_sort.forEach(element => {
        element.addEventListener("click", () => {
            sortdiscount(element.id)
        })
    })

    function sortdiscount(id) {

        let getData = []
        if (+id < 100) {
            data.forEach((el) => {


                if (+el.Product_Discount == id) {

                    getData.push(el)
                }
            })

            append(getData);
        } else {
            data.forEach((el) => {


                if (+el.Product_Price == id) {

                    getData.push(el)
                }
            })

            append(getData);

        }
    }

    let brand_sort = document.querySelectorAll(".brand");
    brand_sort.forEach(element => {
        element.addEventListener("click", () => {
            sortbrand(element.id.toUpperCase())
        })
    })

    function sortbrand(id) {


        let getData = []

        data.forEach((el) => {


            if (el.Product_Brand == id) {

                getData.push(el)
            }
        })

        append(getData);
    }
    let sub_sort = document.querySelectorAll(".subcatsort");
    sub_sort.forEach(element => {
        element.addEventListener("click", () => {
            sortsubcat(element.id.toUpperCase())
        })
    })

    function sortsubcat(element) {
        let getData = []

        data.forEach((el) => {


            if (el.Product_Category ?.toUpperCase() == element) {

                getData.push(el)
            }
        })

        append(getData);

    }

    function pricerange(e) {
        let range = e.trim().split("-").map(Number);
        var [min, max] = range;
        let getData = [];
        data.forEach((el) => {


            if (el.Product_Price >= min && el.Product_Price <= +max) {

                getData.push(el)
            }
        })

        append(getData);



    }

    function add(element) {
        let getData = [];
        for (var i = 0; i < beautydata.length; i++) {
            if ((data[i].OCCASION ?.toUpperCase()) == element) {
                getData.push(data[i])
            }
        }

        append(getData)


    }

    function create(el) {
        return document.createElement(el)
    }

    function append(data) {
        let container = getid("product_container")
        container.innerHTML = ""
        data.forEach((el) => {
            let div = create("div");
            div.id = "maindiv";
            let img = create("img");
            img.src = el.Product_Image[0];
            img.style.height = "430px";
            img.id = "prodimg"
            img.style.width = "100%";
            let fav_btn = create("button");
            fav_btn.innerHTML = `<i class="far fa-heart"></i>`;
            fav_btn.id = "fav_btn"
            fav_btn.onclick = function () {
                favoritevalidation(el);
            }

            let desc_div = create("div");
            desc_div.addEventListener("click", () => {
                gotoproduct(el._id)
            })


            let brand = create("h4");
            brand.innerHTML = el.Product_Brand;
            let title = create("p");
            title.innerHTML = el.Product_Title;
            let price = create("p");
            if (+el.Product_Discount > 0) {
                price.innerHTML = `₹  ${el.Product_Price} MRP <strike> ₹ ${el.Product_MRP}</strike> (${el.Product_Discount} %OFF)`
            } else price.innerHTML = "₹ " + el.Product_Price;
            desc_div.append(brand, title, price);
            desc_div.style.cursor = "pointer";
            div.append(fav_btn, img, desc_div);
            container.append(div)


        })
    }


    function isAuthenticated() {
        let cookie = document.cookie.split("token=");
        if (cookie) {
            if (cookie[1] ?.length > 100) {
                return true;
            }
        }

        return false;
    }

    function favoritevalidation(el) {
        if (isAuthenticated()) {
            addtofav(el)
            let x = JSON.parse(localStorage.getItem("wishlistproducts")).length;
            if (+x > 0) {
                getid("countfav").innerHTML = x;
            }
        } else {
            let text = "You need to login to add items to your favorites";
            if (confirm(text) == true) {
                document.querySelector(".container").style.display = "block";
            } 
        }
    }

    getid("Popular").addEventListener("click", () => {
        popular();
    })
    getid("Discount").addEventListener("click", () => {
        discount();
    })
    getid("sortlow").addEventListener("click", () => {
        lowtohigh()
    })
    getid("sorthigh").addEventListener("click", () => {
        hightolow();
    })

    function popular() {
        let arr = data.sort(function (a, b) {
            return a.Product_Rating - b.Product_Rating;

        });
        append(arr)
    }

    function discount() {
        let arr = data.sort(function (b, a) {
            return a.Product_Discount - b.Product_Discount;

        });
        append(arr)
    }

    function lowtohigh() {
        let arr = data.sort(function (a, b) {
            return a.Product_Price - b.Product_Price;

        });
        append(arr)
    }

    function hightolow() {
        let arr = data.sort(function (b, a) {
            return a.Product_Price - b.Product_Price;

        });
        append(arr)
    }

    function gotoproduct(el) {


        window.location.href = "/" + el

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
        refineprice()
    })

    function refineprice() {

        let minprice = getid("minamount").value;
        let maxprice = getid("maxamount").value;
        if (+minprice > +maxprice) {
            alert("Please enter valid prices")
        } else {
            let getData = [];
            data.forEach((el) => {


                if (el.Product_Price >= +minprice && el.Product_Price <= +maxprice) {

                    getData.push(el)
                }
            })

            append(getData);
        }
    }


}



function getid(id) {
    return document.getElementById(id);
}




//--------------------------------------------------------------------------------

var btn = document.getElementById("option");

btn.addEventListener("click", show);
var count = 0
var arrow = document.getElementById("arrow");

function show() {
    count++;
    // console.log(count); // show count
    if (count % 2 == 0) {
        arrow.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btnmeh = document.getElementById("option");
const listmeh = document.getElementById("st");

listmeh.style.display = "none"
btnmeh.addEventListener("click", (event) => {
    if (listmeh.style.display == "none") {
        listmeh.style.display = "block";
        // console.log(list);  
    } else {
        listmeh.style.display = "none";
    }
});

//---------------------------------------------------------------------------

var btn = document.getElementById("option1");

btn.addEventListener("click", show1);
var count = 0
var arrow1 = document.getElementById("arrow1");

function show1() {
    count++;
    // console.log(count); // show count
    if (count % 2 == 0) {
        arrow1.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow1.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn2 = document.getElementById("option1");
const list1 = document.getElementById("st1");

list1.style.display = "none"
btn2.addEventListener("click", (event) => {
    if (list1.style.display == "none") {
        list1.style.display = "block";
        // console.log(list);  
    } else {
        list1.style.display = "none";
    }
});

//-------------------------------------------------------------------

var btn = document.getElementById("option2");

btn.addEventListener("click", show2);
var count = 0
var arrow2 = document.getElementById("arrow2");

function show2() {
    count++;
    console.log(count); // show count
    if (count % 2 == 0) {
        arrow2.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow2.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn3 = document.getElementById("option2");
const list2 = document.getElementById("st2");

list2.style.display = "none"
btn3.addEventListener("click", (event) => {
    if (list2.style.display == "none") {
        list2.style.display = "block";
        // console.log(list);  
    } else {
        list2.style.display = "none";
    }
});

//----------------------------------------------------------------------------

var btn = document.getElementById("option3");

btn.addEventListener("click", show3);
var count = 0
var arrow3 = document.getElementById("arrow3");

function show3() {
    count++;
    console.log(count); // show count
    if (count % 2 == 0) {
        arrow3.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow3.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn4 = document.getElementById("option3");
const list3 = document.getElementById("st3");

list3.style.display = "none"
btn4.addEventListener("click", (event) => {
    if (list3.style.display == "none") {
        list3.style.display = "block";
        // console.log(list);  
    } else {
        list3.style.display = "none";
    }
});

//------------------------------------------------------------------------------------

var btn = document.getElementById("option4");

btn.addEventListener("click", show4);
var count = 0
var arrow4 = document.getElementById("arrow4");

function show4() {
    count++;
    console.log(count); // show count
    if (count % 2 == 0) {
        arrow4.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow4.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn5 = document.getElementById("option4");
const list4 = document.getElementById("color");

list4.style.display = "none"
btn5.addEventListener("click", (event) => {
    if (list4.style.display == "none") {
        list4.style.display = "block";
        // console.log(list);  
    } else {
        list4.style.display = "none";
    }
});

//-------------------------------------------------------------------------------

var btn = document.getElementById("option5");

btn.addEventListener("click", show5);
var count = 0
var arrow5 = document.getElementById("arrow5");

function show5() {
    count++;
    console.log(count); // show count
    if (count % 2 == 0) {
        arrow5.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow5.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn6 = document.getElementById("option5");
const list5 = document.getElementById("st4");

list5.style.display = "none"
btn6.addEventListener("click", (event) => {
    if (list5.style.display == "none") {
        list5.style.display = "block";
        // console.log(list);  
    } else {
        list5.style.display = "none";
    }
});

//-----------------------------------------------------------------------------------

var btn = document.getElementById("option6");

btn.addEventListener("click", show6);
var count = 0
var arrow6 = document.getElementById("arrow6");

function show6() {
    count++;
    console.log(count); // show count
    if (count % 2 == 0) {
        arrow6.className = "fas fa-chevron-down"
    } else if (count % 2 !== 0) {
        arrow6.className = "fa-rotate-180 fas fa-chevron-down"
    }
}

const btn7 = document.getElementById("option6");
const list6 = document.getElementById("st5");

list6.style.display = "none"
btn7.addEventListener("click", (event) => {
    if (list6.style.display == "none") {
        list6.style.display = "block";
        // console.log(list);  
    } else {
        list6.style.display = "none";
    }
});