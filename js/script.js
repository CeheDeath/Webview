// ICT251 Activity 3 JavaScript
// Adds interactivity and validation to the student portfolio

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. CONTACT FORM VALIDATION + PREVIEW (Compulsory) ---
    const form = document.querySelector("form");
    const previewArea = document.createElement("div");
    previewArea.id = "form-preview";
    form.parentNode.appendChild(previewArea);

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // keep submission local

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        let errors = [];

        if (!name) errors.push("Name cannot be empty.");
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) errors.push("Invalid email format.");
        if (!message) errors.push("Message cannot be empty.");

        if (errors.length > 0) {
            previewArea.textContent = "⚠️ " + errors.join(" ");
            previewArea.style.color = "red";
        } else {
            previewArea.textContent = `✅ Data validated.\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
            previewArea.style.color = "green";
        }
    });


    // --- 2. GALLERY SLIDESHOW WITH ARROWS ---
    const gallery = document.querySelector(".gallery");
    const figures = gallery.querySelectorAll("figure");
    let currentIndex = 0;

    // Create arrow controls
    const prevArrow = document.createElement("span");
    const nextArrow = document.createElement("span");
    prevArrow.className = "arrow prev";
    nextArrow.className = "arrow next";
    prevArrow.innerHTML = "&#10094;"; // left arrow
    nextArrow.innerHTML = "&#10095;"; // right arrow
    gallery.appendChild(prevArrow);
    gallery.appendChild(nextArrow);

    function showImage(index) {
        figures.forEach((fig, i) => {
            fig.style.display = i === index ? "block" : "none";
        });
    }
    showImage(currentIndex);

    prevArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + figures.length) % figures.length;
        showImage(currentIndex);
    });

    nextArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % figures.length;
        showImage(currentIndex);
    });


    // --- 3. THEME SWITCH ---
    const themeBtn = document.createElement("button");
    themeBtn.textContent = "Switch to Dark Theme";
    themeBtn.className = "theme-btn";
    document.body.insertBefore(themeBtn, document.body.firstChild);

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        themeBtn.textContent = document.body.classList.contains("dark-theme")
            ? "Switch to Light Theme"
            : "Switch to Dark Theme";
    });


    // --- 4. STUDY HOURS CALCULATOR ---
    const learningSection = document.getElementById("learning");
    const calcDiv = document.createElement("div");
    calcDiv.className = "study-calc";
    calcDiv.innerHTML = `
        <h3>Study Hours Calculator</h3>
        <label>Hours per day: <input type="number" id="hoursPerDay"></label>
        <label>Days per week: <input type="number" id="daysPerWeek"></label>
        <button id="calcBtn">Calculate</button>
        <p id="calcResult"></p>
    `;
    learningSection.appendChild(calcDiv);

    document.getElementById("calcBtn").addEventListener("click", () => {
        const hours = parseInt(document.getElementById("hoursPerDay").value);
        const days = parseInt(document.getElementById("daysPerWeek").value);
        const result = document.getElementById("calcResult");

        if (isNaN(hours) || isNaN(days) || hours <= 0 || days < 1 || days > 7) {
            result.textContent = "⚠️ Please enter valid numbers (days 1–7).";
            result.style.color = "red";
        } else {
            const total = hours * days;
            result.textContent = `✅ You plan to study ${total} hours per week.`;
            result.style.color = "green";
        }
    });

});
