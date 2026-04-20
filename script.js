let messages = [];
let images = [];
let index = 0;
let canClick = true;

// Fetch the data from our JSON file
fetch('db.json')
    .then(res => res.json())
    .then(data => {
        messages = data.messages;
        images = data.images;
        // Start slideshow once images are loaded
        if (images.length > 0) {
            startSlideshow();
        }
    })
    .catch(err => console.error("Error loading birthday data:", err));

// 🖼️ Background Slideshow Logic
let bgIndex = 0;
function startSlideshow() {
    const bg = document.querySelector(".bg-slideshow");
    
    function updateBg() {
        bg.style.backgroundImage = `url('${images[bgIndex]}')`;
        bgIndex = (bgIndex + 1) % images.length;
    }

    updateBg(); // Show first image immediately
    setInterval(updateBg, 3000); // Change every 3 seconds
}

// ✨ Generate Particles
const particlesContainer = document.querySelector(".particles");
for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (Math.random() * 5 + 5) + "s";
    particlesContainer.appendChild(span);
}

function typeText(text, element) {
    element.innerText = "";
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerText += text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

function launchConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function goToFinalPage() {
    window.location.href = "final.html";
}

const finalMessage = `
My Nila...

My bestie, the only person I trust in this life.

You’ve made it clear that me and you are not separating…
and I love that.

I love that I can always see your smile.
I love those majestic eyes.
I love hearing your sweet voice.
I love being close to you.

We’ve had our good and bad days…
but we still have each other.

My dream is simple…
to one day hug you,
to hold you in my arms
and feel at home.

Maybe even steal a kiss… time will tell.

I pray we never fall off.

If I had one chance to go back in time
and fix everything just to have you again…

I would take it.

Even if it meant going back to high school…
I would do it all again for you.

You’ve given me truth,
honesty,
and real love.

And I promise…
I would give you my all too.

My Nicole.
My Nila.
My sugarplum.
My angel.

Happy Birthday 🎂

You’re 20 now…
I might start calling you unc 😄

Distance may keep us apart right now…
but one day,
we’ll meet,
we’ll hug,
and cut a cake together.

With all my heart,
Tjay Earl 💙
`;

function nextMessage() {
    if (!canClick) return;

    canClick = false;

    const text = document.getElementById("displayMessage");
    const btn = document.getElementById("actionBtn");
    const title = document.getElementById("mainTitle");
    const spotify = document.getElementById("memoryPlayer");

    if (index < messages.length) {
        // Check if it's time for the final heartfelt letter
        if (index === messages.length - 1) {
            typeText(finalMessage, text);
            text.classList.add("final-message");
            btn.style.display = "none"; // Hide button after letter starts
            
            launchConfetti();
            document.getElementById("finalBtn").style.display = "block";
        } else {
            typeText(messages[index], text);
            btn.innerText = "Next ➔";
        }
        
        if (title) title.style.display = "none";

        // Show Spotify player at "Before anything..."
        if (index === 1 && spotify) {
            spotify.classList.add("show-player");
        }

        index++;
    } else {
        text.innerText = "That’s all for now… but you mean a lot 💙";
        btn.style.display = "none";
    }

    // ⏳ delay before next click allowed
    setTimeout(() => {
        canClick = true;
    }, 2000); // 2 seconds to allow typing to finish
}