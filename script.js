window.addEventListener("load", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500); // matches the CSS transition
  }, 0); // No artificial delay
});

const backgroundImages = [
  "assets/home-image-1.jpg",
  "assets/home-image-2.jpg",
  "assets/home-image-3.jpg",
  "assets/home-image-4.jpg",
  "assets/home-image-5.jpg",
];

let currentIndex = 0;
let isMobile = window.innerWidth <= 1200;

// Filter images for mobile (remove last image)
let imagesToUse = isMobile
  ? backgroundImages.slice(0, backgroundImages.length - 1)
  : backgroundImages;

const homeImageDiv = document.querySelector(".home-image");

// Use imagesToUse for initial image
homeImageDiv.style.backgroundImage = `url('${imagesToUse[currentIndex]}')`;

function changeBackground() {
  homeImageDiv.classList.add("fade");
  setTimeout(() => {
    isMobile = window.innerWidth <= 1200;
    imagesToUse = isMobile
      ? backgroundImages.slice(0, backgroundImages.length - 1)
      : backgroundImages;

    // Use imagesToUse for cycling and indexing
    currentIndex = (currentIndex + 1) % imagesToUse.length;
    homeImageDiv.style.backgroundImage = `url('${imagesToUse[currentIndex]}')`;

    if (isMobile) {
      homeImageDiv.style.backgroundPosition = "center center";
    } else if (window.innerWidth >= 1200 && window.innerWidth <= 1700) {
      homeImageDiv.style.backgroundPosition = "center center";
    } else {
      if (imagesToUse[currentIndex] === "assets/home-image-4.jpg") {
        homeImageDiv.style.backgroundPosition = "center -200px";
      } else if (imagesToUse[currentIndex] === "assets/home-image-5.jpg") {
        homeImageDiv.style.backgroundPosition = "center center";
      } else {
        homeImageDiv.style.backgroundPosition = "center -370px";
      }
    }

    homeImageDiv.classList.remove("fade");
    document.querySelector(".navbar").classList.remove("fade");
  }, 100);
}

setInterval(changeBackground, 4000);

function preloadImages() {
  backgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function toggleNav() {
  document.querySelector(".nav-links").classList.toggle("show");
}

window.addEventListener("scroll", function () {
  document.querySelector(".navbar").classList.remove("fade");
  const navbar = document.querySelector(".navbar");
  const homeImage = document.querySelector(".home-image");
  const homeImageBottom =
    homeImage.getBoundingClientRect().bottom + window.scrollY;

  if (window.scrollY >= homeImageBottom) {
    navbar.style.position = "fixed";
    navbar.style.top = "0";
    navbar.style.left = "0";
    navbar.style.paddingTop = "5px";
    navbar.style.paddingBottom = "5px";
    navbar.style.width = "100%";
    // navbar.style.backgroundColor = "#c56869";
    // navbar.style.backgroundImage = "linear-gradient(#c54e50, transparent)";
    navbar.style.backgroundImage = "linear-gradient(#c35a5c 25%, transparent)";
  } else {
    navbar.style.position = "sticky";
    navbar.style.top = "0";
    navbar.style.left = "";
    navbar.style.width = "";
    navbar.style.paddingTop = "0px";
    navbar.style.paddingBottom = "0px";
    navbar.style.backgroundColor = "transparent";
    navbar.style.backgroundImage = "linear-gradient(#db9f95, transparent)";
  }
});

// Collapse mobile navbar when any link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("show");
  });
});
