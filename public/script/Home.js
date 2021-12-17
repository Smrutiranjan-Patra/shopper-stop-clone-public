var slideIndex = 0;
    showSlides();

    function showSlides() {
      var i;
      var slides = document.getElementsByClassName("mySlides1");
      var dots = document.getElementsByClassName("dot1");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 5000);
    }

    var slideIndex = 1;
    gotoSlides(slideIndex);

    function currentSlide(n) {
      gotoSlides((slideIndex = n));
    }

    function gotoSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides1");
      var dots = document.getElementsByClassName("dot1");
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
  
    var slideIndex2 = 0;
    showSlides2();

    function showSlides2() {
      var i;
      var slides = document.getElementsByClassName("mySlides2");
      var dots = document.getElementsByClassName("dot2");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex2++;
      if (slideIndex2 > slides.length) {
        slideIndex2 = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex2 - 1].style.display = "block";
      dots[slideIndex2 - 1].className += " active";
      setTimeout(showSlides2, 5000);
    }

    var slideIndex2 = 1;
    gotoSlides2(slideIndex2);

    function currentSlide2(n) {
      gotoSlides2((slideIndex2 = n));
    }

    function gotoSlides2(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides2");
      var dots = document.getElementsByClassName("dot2");
      if (n > slides.length) {
        slideIndex2 = 1;
      }
      if (n < 1) {
        slideIndex2 = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex2 - 1].style.display = "block";
      dots[slideIndex2 - 1].className += " active";
    }

    
    var slideIndex3 = 0;
    showSlides3();

    function showSlides3() {
      var i;
      var slides = document.getElementsByClassName("myslides3");
      var dots = document.getElementsByClassName("dot3");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex3++;
      if (slideIndex3 > slides.length) {
        slideIndex3 = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex3 - 1].style.display = "block";
      dots[slideIndex3 - 1].className += " active";
      setTimeout(showSlides3, 5000);
    }

    var slideIndex3 = 1;
    gotoSlides3(slideIndex3);

    function currentSlide3(n) {
      gotoSlides3((slideIndex3 = n));
    }

    function gotoSlides3(n) {
      var i;
      var slides = document.getElementsByClassName("myslides3");
      var dots = document.getElementsByClassName("dot3");
      if (n > slides.length) {
        slideIndex3 = 1;
      }
      if (n < 1) {
        slideIndex3 = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex3 - 1].style.display = "block";
      dots[slideIndex3 - 1].className += " active";
    }
    var slideIndex5 = 0;
    showSlides5();
    
    function showSlides5() {
      var i;
      var slides = document.getElementsByClassName("mySlides5");
      var dots = document.getElementsByClassName("dot5");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex5++;
      if (slideIndex5 > slides.length) {
        slideIndex5 = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
      }
      slides[slideIndex5 - 1].style.display = "block";
      dots[slideIndex5 - 1].className += " active";
      setTimeout(showSlides5, 3000);
    }
    
    var slideIndex5 = 1;
    gotoSlides5(slideIndex5);
    
    function currentSlide(n) {
      gotoSlides5((slideIndex5 = n));
    }
    
    function gotoSlides5(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides5");
      var dots = document.getElementsByClassName("dot5");
      if (n > slides.length) {
        slideIndex5 = 1;
      }
      if (n < 1) {
        slideIndex5 = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex5 - 1].style.display = "block";
      dots[slideIndex5 - 1].className += " active";
    }