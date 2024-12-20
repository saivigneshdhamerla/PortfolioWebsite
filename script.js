const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnmation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingElem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleMouseFollower() {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px,${details.clientY}px)`;
  });
}

circleMouseFollower();
firstPageAnmation();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mousemove", function (details) {
    var img = elem.querySelector("img");
    var imgWidth = img.offsetWidth; // Get the width of the image
    var imgHeight = img.offsetHeight; // Get the height of the image

    var diffY = details.clientY - elem.getBoundingClientRect().top; // Vertical difference
    var diffX = details.clientX - elem.getBoundingClientRect().left; // Horizontal difference

    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    // Adjust top and left to center the image on the cursor
    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: diffY - imgHeight / 2, // Center vertically
      left: diffX - imgWidth / 2, // Center horizontally
      // position: 'absolute' ,// Ensure the image is positioned absolutely
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
});

// Get the h5 tag in the footer
var footerTime = document.querySelector("#time");

// Function to update the time
function updateTime() {
  var now = new Date();
  var timeString = now.toLocaleTimeString();
  footerTime.innerHTML = timeString + " IST ";
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial time update
updateTime();
