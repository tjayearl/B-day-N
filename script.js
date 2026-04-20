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
    })
    .catch(err => console.error("Error loading birthday data:", err));

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
            element.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 40); // slightly slower for better readability
}

function nextMessage() {
    if (!canClick) return;

    canClick = false;

    const text = document.getElementById("displayMessage");
    const img = document.getElementById("displayImage");
    const btn = document.getElementById("actionBtn");
    const title = document.getElementById("mainTitle");
    const spotify = document.getElementById("memoryPlayer");

    if (index < messages.length) {
        typeText(messages[index], text);
        btn.innerText = "Next ➔";
        
        if (title) title.style.display = "none";

        // Show Spotify player at "Before anything..."
        if (index === 1 && spotify) {
            spotify.style.display = "block";
        }

        // Image 1: "Not just the song..."
        if (index === 5) {
            img.src = images[0];
            img.style.display = "block";
            setTimeout(() => img.classList.add("show"), 10);
        }

        // Image 2: "And this is just a small reminder of that"
        if (index === 10) {
            img.src = images[1];
        }

        // Final Birthday Peak
        if (index === messages.length - 2) {
            text.classList.add("final-message");
        } else {
            text.classList.remove("final-message");
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