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
//         top: `${100}px`,
//         duration: 3.5,
//         ease: "power3.out",
//       },
//       "1"
//     );
//     console.log(el, el.offsetHeight / 2 + +el.dataset.distance);
//   });

Array.from(parallaxEl)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    console.log(el);
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
    "2.5"
  )
  .from(
    ".name h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".portfolio h3",
    {
      y: 250,
      opacity: 0,
      duration: 3,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
