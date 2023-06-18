const parallaxEl = document.querySelectorAll(".parallax");
let xValue = 0;
let yValue = 0;
let rotateDegree = 0;
const heroSection = document.querySelector(".hero-section");

const update = (cursorPosition) => {
  parallaxEl.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInleft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInleft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px)
     rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${yValue * speedy}px))  `;
  });
};

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

if (window.innerWidth >= 725) {
  heroSection.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  heroSection.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

// GSAP Animation
let timeline = gsap.timeline();

// Array.from(parallaxEl)
//   .filter((el) => !el.classList.contains("text"))
//   .forEach((el) => {
//     timeline.from(
//       el,
//       {
//         // top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
//         top: `${2000}px`,
//         duration: 3.5,
//         ease: "power3.out",
//       },
//       "1"
//     );
//   });

Array.from(parallaxEl)
  .filter((el) => !el.classList.contains("text"))
  .filter((el) => !el.classList.contains("bottom"))
  .forEach((el) => {
    timeline.fromTo(
      el,
      {
        top: `${-3000}px`,
      },
      {
        top: window.getComputedStyle(el).getPropertyValue("top"),
        duration: 0.1,
        ease: "power3.out",
        // delay: 0.5,
      }
    );
  });

Array.from(parallaxEl)
  .filter((el) => !el.classList.contains("text"))
  .filter((el) => el.classList.contains("bottom"))
  .forEach((el) => {
    timeline.fromTo(
      el,
      {
        bottom: `${-700}px`,
      },
      {
        bottom: window.getComputedStyle(el).getPropertyValue("bottom"),
        duration: 0.1,
        ease: "power3.out",
        // delay: 0.5,
      }
    );
  });

timeline
  .from(
    ".name h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".name h1").getBoundingClientRect().top,
      duration: 2,
    },
    "1"
  )
  .from(
    ".name h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "2"
  )
  .from(
    ".portfolio h3",
    {
      y: 250,
      opacity: 0,
      duration: 3,
    },
    "2"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );

// const numSnowflakes = 50; // Number of snowflakes to create
// const snowContainer = document.getElementById("snow-container");

// for (let i = 0; i < numSnowflakes; i++) {
//   const snowflake = document.createElement("div");
//   snowflake.classList.add("snowflake");
//   snowContainer.appendChild(snowflake);
// }

// const snowflakes = document.querySelectorAll(".snowflake");

// function animateSnowflakes() {
//   gsap.set(snowflakes, { y: 0, opacity: 1 });

//   gsap.to(snowflakes, {
//     y: "100%",
//     opacity: 0,
//     duration: 2,
//     ease: "power1.inOut",
//     stagger: {
//       each: 0.1,
//       from: "random",
//     },
//     onComplete: animateSnowflakes,
//   });
// }

// animateSnowflakes();
