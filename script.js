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

// Create a message div for "He sent you a kiss back"
const messageDiv = document.createElement("div");
messageDiv.style.position = "absolute";
messageDiv.style.top = "20px";
messageDiv.style.width = "100%";
messageDiv.style.textAlign = "center";
messageDiv.style.fontSize = "1.5rem";
messageDiv.style.fontWeight = "600";
messageDiv.style.color = "red";
messageDiv.style.opacity = "0";
document.body.appendChild(messageDiv);

// Function to animate kiss horizontally
function sendKiss(fromPhoto, toPhoto, callback) {
  const kiss = document.createElement("div");
  kiss.textContent = "💋";
  kiss.style.position = "absolute";
  kiss.style.fontSize = "2rem";
  kiss.style.opacity = "1";
  kiss.style.pointerEvents = "none";

  const fromRect = fromPhoto.getBoundingClientRect();
  const toRect = toPhoto.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  const startX = fromRect.left + fromRect.width/2 - bodyRect.left;
  const startY = fromRect.top + fromRect.height/2 - bodyRect.top;
  const endX = toRect.left + toRect.width/2 - bodyRect.left;
  const endY = startY; // horizontal

  kiss.style.left = startX + "px";
  kiss.style.top = startY + "px";

  document.body.appendChild(kiss);

  let t = 0;
  const duration = 2000;
  const fps = 60;
  const interval = 1000/fps;

  const animate = setInterval(() => {
    t += interval/duration;
    if(t > 1) t = 1;

    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;

    kiss.style.left = x + "px";
    kiss.style.top = y + "px";
    kiss.style.opacity = 1 - t;

    if(t >= 1){
      clearInterval(animate);
      kiss.remove();
      if(callback) callback(); // call after animation
    }
  }, interval);
}

// KISS button click
kissBtn.addEventListener("click", () => {
  sendKiss(herPhoto, myPhoto, () => {
    // After her kiss arrives, show message and send kiss back
    messageDiv.textContent = "He sent you a kiss back";
    messageDiv.style.opacity = "1";

    sendKiss(myPhoto, herPhoto, () => {
      // Fade out message after return kiss completes
      setTimeout(() => {
        messageDiv.style.opacity = "0";
      }, 1500);
    });
  });
});
