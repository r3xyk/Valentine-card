// Elements
const letterScreen = document.getElementById("letterScreen");
const openLetterBtn = document.getElementById("openLetterBtn");
const letterFlap = document.getElementById("letterFlap");
const valentineContent = document.getElementById("valentineContent");
const bgMusic = document.getElementById("bgMusic");

const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const p = document.getElementById("p");
const kissBtn = document.getElementById("kissBtn");
const photosContainer = document.getElementById("photos");
const myPhoto = document.getElementById("myPhoto");
const herPhoto = document.getElementById("herPhoto");

let step = 0;
// Change this line at the top
const letterFlapWrapper = document.getElementById("letterFlapWrapper"); // Targeted the wrapper

// Update the OPEN LETTER logic
openLetterBtn.addEventListener("click", () => {
    openLetterBtn.style.display = "none";
    
    // Animate the WRAPPER (which holds the shadow) instead of the flap
    letterFlapWrapper.classList.add("fold-up");

    setTimeout(() => {
        letterScreen.classList.add("envelope-fall");
        valentineContent.style.display = "flex";
        setTimeout(() => {
            valentineContent.classList.add("pop-out");
        }, 50);

        bgMusic.volume = 0.5;
        bgMusic.play().catch(() => {});
    }, 600);
});

// Add this element to your list of constants at the top
const memoriesSection = document.getElementById("memoriesSection");

// Update ONLY this listener
yesBtn.addEventListener("click", () => {
    question.innerHTML = "Achievement unlocked:<br>Valentine acquired 💘";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    p.style.display = "none"; 
    kissBtn.style.display = "inline-block";
    photosContainer.style.display = "flex";
    
    // ADD THIS LINE
    memoriesSection.style.display = "block";
});

// YES BUTTON (SUCCESS)
yesBtn.addEventListener("click", () => {
    question.innerHTML = "Achievement unlocked:<br>Valentine acquired 💘";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    p.style.display = "none"; // Ensure p is hidden on success
    kissBtn.style.display = "inline-block";
    photosContainer.style.display = "flex";
});

// NO BUTTON (LOOP LOGIC)
noBtn.addEventListener("click", () => {
    if (step === 0) {
        // Step 1: Are you sure?
        question.textContent = "Are you sure? 🥺";
        p.style.display = "none";        // Hides the "Choose wisely" text
        noBtn.textContent = "Yes, I'm sure"; 
        yesBtn.style.display = "none";      
        step = 1;
    } else {
        // RESET LOOP: Returns to the original state
        question.textContent = "Will you be my valentine?";
        p.style.display = "block";       // Shows the "Choose wisely" text again
        noBtn.textContent = "No";
        yesBtn.style.display = "inline-block"; 
        step = 0;
    }
});

// ... existing elements and open/no logic remain the same ...

// KISS LOGIC - Role Switched: She kisses you first
kissBtn.addEventListener("click", () => {
    // 1. Her Photo -> My Photo
    sendKiss(herPhoto, myPhoto, () => {
        // 2. My Photo -> Her Photo back after a small delay
        setTimeout(() => {
            sendKiss(myPhoto, herPhoto);
        }, 400);
    });
});

// KISS ANIMATION FUNCTION
function sendKiss(from, to, callback) {
    const kiss = document.createElement("div");
    kiss.textContent = "💋";
    kiss.style.position = "fixed";
    kiss.style.fontSize = "2.5rem";
    kiss.style.zIndex = "20000";
    
    // Get positions of the photos
    const fRect = from.getBoundingClientRect();
    const tRect = to.getBoundingClientRect();

    const startX = fRect.left + fRect.width / 2;
    const startY = fRect.top + fRect.height / 2;
    const endX = tRect.left + tRect.width / 2;
    const endY = tRect.top + tRect.height / 2;

    kiss.style.left = startX + "px";
    kiss.style.top = startY + "px";
    document.body.appendChild(kiss);

    // Animate the kiss across the screen
    kiss.animate([
        { left: startX + 'px', top: startY + 'px', opacity: 1, transform: 'scale(1)' },
        { left: endX + 'px', top: endY + 'px', opacity: 0, transform: 'scale(2)' }
    ], { 
        duration: 1000, 
        easing: 'ease-in-out' 
    }).onfinish = () => {
        kiss.remove();
        if (callback) callback();
    };
}
