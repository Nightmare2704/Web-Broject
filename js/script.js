"use strict";

const overlay = document.querySelector(".overlay");
const overlayContainsHidden = overlay.classList.contains("hidden");

const navBarRight = document.querySelector(".navbar-right");
const navBarRightHiddenAdd = () => navBarRight.classList.add("hidden");
const navBarRightHiddenRemove = () => navBarRight.classList.remove("hidden");
const headerRight = document.querySelector(".right-section");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

function login() {
  location.href = "login_signup/login.html";
}

let deveshBhai = true;
document.querySelector(".Layer_1").addEventListener("click", function () {
  navBarRight.style.transform = `translateX(${100}%)`;

  if (deveshBhai) {
    navBarRightHiddenRemove();
    navBarRight.style.transform = `translateX(${0}%)`;

    deveshBhai = false;
  } else {
    // navBarRightHiddenAdd();

    deveshBhai = true;
  }
});

overlay.addEventListener("click", function () {
  if (!overlayContainsHidden) {
    navBarRightHiddenAdd();
  }
});

document.addEventListener("keydown", function (e) {
  if (!overlayContainsHidden && e.key === "Escape") navBarRightHiddenAdd();
});

document.addEventListener("scroll", function () {
  if (!overlayContainsHidden) navBarRightHiddenAdd();
});

const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab--container");
const tabsContent = document.querySelectorAll(".operations__content");

document
  .querySelector(".operations__tab--container")
  .addEventListener("click", function (e) {
    console.log("hello");

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
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;

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

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;

      gotoSlide(slide);
      activateDot(slide);
    }
  });
  let isTouching = false;

  //touch thing not working yet
  if (!isTouching) {
    const autoSliderev = setInterval(function () {
      if (curSlide === maxSlide - 1) curSlide = 0;
      else curSlide++;
      gotoSlide(curSlide);
      activateDot(curSlide);
    }, 5000);
  }
};
sliders();

//slider-main

const boxSlides = document.querySelectorAll(".box-slide");
const boxSlider = document.querySelector(".box-slider");
const boxBtnLeft = document.querySelector(".box-btn--left");
const boxBtnright = document.querySelector(".box-btn--right");
let curBoxSlide = 0;

const maxBoxSlide = boxSlides.length;

const activateBox = function (slide) {
  document
    .querySelectorAll(".box-slide")
    .forEach((s) => s.classList.remove("box-slide--active"));

  document
    .querySelector(`.box-slide[data-slide = '${slide}']`)
    .classList.add("box-slide--active");
};

activateBox(0);

const gotoBoxSlide = function (slide) {
  boxSlides.forEach(
    (s, i) => (s.style.transform = `translateX(${i - slide}%)`)
  );
};
gotoBoxSlide(0);

const nextBoxSlide = function () {
  if (curBoxSlide === maxBoxSlide - 1) curBoxSlide = 0;
  else curBoxSlide++;
  gotoBoxSlide(curBoxSlide);
  activateBox(curBoxSlide);
};

const prevBoxSlide = function () {
  if (curBoxSlide === 0) curBoxSlide = maxBoxSlide - 1;
  else curBoxSlide--;
  gotoBoxSlide(curBoxSlide);
  activateBox(curBoxSlide);
};

boxBtnright.addEventListener("click", nextBoxSlide);
boxBtnLeft.addEventListener("click", prevBoxSlide);
const autoSlide = setInterval(function () {
  if (curBoxSlide === maxBoxSlide - 1) curBoxSlide = 0;
  else curBoxSlide++;
  gotoBoxSlide(curBoxSlide);
  activateBox(curBoxSlide);
}, 4000);

//menu fade animation

const handleHover = function (e) {
  if (e.target.closest(".desktop-icons")) {
    const link = e.target;
    const siblings = link.closest(".desktop-icons").querySelectorAll(".icon");

    // const logo = link.closest('img') whem u add logo

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

headerRight.addEventListener("mouseover", handleHover.bind(0.5));

headerRight.addEventListener("mouseout", handleHover.bind(1));

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
