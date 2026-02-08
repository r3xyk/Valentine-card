const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const p = document.getElementById("p");
const kissBtn = document.getElementById("kissBtn");
const herPhoto = document.getElementById("herPhoto");
const myPhoto = document.getElementById("myPhoto");
const photosContainer = document.getElementById("photos");

let step = 0;

// YES / NO logic
yesBtn.addEventListener("click", () => {
  question.innerHTML = "Achievement unlocked:<br>Valentine acquired 💘";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  p.style.display = "none";

  kissBtn.style.display = "inline-block"; // show kiss button
  photosContainer.style.display = "flex";  // show photos
});

noBtn.addEventListener("click", () => {
  if (step === 0) {
    question.textContent = "Are you sure?";
    yesBtn.style.display = "none";
    step = 1;
  } else {
    question.textContent = "Now for real, are you going to be my valentine?";
    yesBtn.style.display = "inline-block";
    step = 0;
  }
});

// KISS animation (horizontal) after clicking kiss button
kissBtn.addEventListener("click", () => {
  // Create kiss element dynamically
  const kiss = document.createElement("div");
  kiss.textContent = "💋";
  kiss.style.position = "absolute";
  kiss.style.fontSize = "2rem";
  kiss.style.opacity = "1";
  kiss.style.pointerEvents = "none";

  // Get start (her) and end (you) positions
  const herRect = herPhoto.getBoundingClientRect();
  const myRect = myPhoto.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  const startX = herRect.left + herRect.width / 2 - bodyRect.left;
  const startY = herRect.top + herRect.height / 2 - bodyRect.top;
  const endX = myRect.left + myRect.width / 2 - bodyRect.left;
  const endY = startY; // horizontal

  // Set initial position to her's photo
  kiss.style.left = startX + "px";
  kiss.style.top = startY + "px";

  document.body.appendChild(kiss);

  // Animation loop
  let t = 0;
  const duration = 2000;
  const fps = 60;
  const interval = 1000 / fps;

  const animate = setInterval(() => {
    t += interval / duration;
    if (t > 1) t = 1;

    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;

    kiss.style.left = x + "px";
    kiss.style.top = y + "px";
    kiss.style.opacity = 1 - t;

    if (t >= 1) {
      clearInterval(animate);
      kiss.remove();
    }
  }, interval);
});
