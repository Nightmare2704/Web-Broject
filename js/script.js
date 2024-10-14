"use strict";
const hamBurger = document.querySelector(".hamBurger");
const navBarRight = document.querySelector(".navbar-right");
const section = document.querySelector(".section");
const headerRight = document.querySelector(".right-section");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab--container");
const tabsContent = document.querySelectorAll(".operations__content");

const navHeight = nav.getBoundingClientRect().height;

function login() {
  location.href = "login_signup/login.html";
} //hamburger menu

const navfn = function () {
  let deveshBhai = true;
  hamBurger.addEventListener("click", function () {
    hamBurger.classList.toggle("active");

    if (deveshBhai) {
      navBarRight.style.transform = `translateX(${0}%)`;

      deveshBhai = false;
    } else {
      navBarRight.style.transform = `translateX(${100}%)`;
      deveshBhai = true;
    }
  });

  section.addEventListener("click", function () {
    navBarRight.style.transform = `translateX(${100}%)`;
    hamBurger.classList.remove("active");
    deveshBhai = true;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navBarRight.style.transform = `translateX(${100}%)`;
      hamBurger.classList.remove("active");
      deveshBhai = true;
    }
  });

  document.addEventListener("scroll", function () {
    navBarRight.style.transform = `translateX(${100}%)`;
    hamBurger.classList.remove("active");
    deveshBhai = true;
  });
};
navfn();
//operations
document
  .querySelector(".operations__tab--container")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;
    //activate tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    //activate content area
    tabsContent.forEach((e) =>
      e.classList.remove("operations__content--active")
    );

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });

//slider
const sliders = function () {
  let curSlide = 0;
  let autoSlider;

  const maxSlide = slides.length;

  //functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        ` <button class='dots__dot' data-slide='${i}'> </button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((s) => s.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide = '${slide}']`)
      .classList.add("dots__dot--active");
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    gotoSlide(curSlide);
    activateDot(curSlide);
  };
  const preSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    gotoSlide(curSlide);
    activateDot(curSlide);
  };

  const inIt = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  inIt();
  //event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", preSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    }
    e.key === "ArrowLeft" && preSlide();
  });

  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;

      gotoSlide(slide);
      activateDot(slide);
    }
  });
  //start auto scrolling
  const startAutoScroll = function () {
    autoSlider = setInterval(function () {
      nextSlide();
    }, 3000);
  };
  startAutoScroll();
  //stop auto scrolling
  const stopAutoScroll = function () {
    clearInterval(autoSlider);
  };

  slider.addEventListener("mousedown", stopAutoScroll);
  slider.addEventListener("mouseup", startAutoScroll);
};
sliders();

//box slider
let autoSlide;
let boxCurSlide = 0;
const nextButton = document.querySelector(".box-slider__btn--right");
const lastButton = document.querySelector(".box-slider__btn--left");
const boxSlides = document.querySelectorAll(".box-slide");
const boxSlider = document.querySelector(".box-slider");
const totalSlides = boxSlides.length;
const updateSlides = function (boxslide) {
  boxSlides.forEach((s, i) => {
    const position = i - boxCurSlide;
    s.style.transform = `translateX(${position * 150}%)`;
    //check if the slide is in middle
    if (position === 0) s.classList.add("center-slide");
    else {
      s.classList.remove("center-slide");
    }
  });
};
updateSlides();

const nextBox = () => {
  if (boxCurSlide < totalSlides - 1) {
    boxCurSlide++;
  } else {
    boxCurSlide = 0;
  }
  updateSlides();
};

const lastBox = () => {
  if (boxCurSlide === 0) {
    boxCurSlide = totalSlides - 1;
  } else {
    boxCurSlide--;
  }
  updateSlides();
};
nextButton.addEventListener("click", nextBox);
lastButton.addEventListener("click", lastBox);
//auto slide
const startRollin = function () {
  autoSlide = setInterval((s) => nextBox(), 3000);
};
startRollin();

const stopRollin = function () {
  autoSlide = clearInterval(autoSlide);
};
boxSlider.addEventListener("mouseover", stopRollin);
boxSlider.addEventListener("mouseout", startRollin);
//Sticky navigation
// ducument.querySelector('.section-1')

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("fixed");
  } else nav.classList.remove("fixed");
};

const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headObserver.observe(header);
