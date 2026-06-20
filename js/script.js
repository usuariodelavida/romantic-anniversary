/* ==========================================================
   NUESTROS 2 AÑOS ❤️ - JAVASCRIPT FINAL
========================================================== */

/* ===========================
   FECHA BASE (24/06/2024)
=========================== */

const startDate = new Date("2024-06-24T00:00:00");

/* ===========================
   ELEMENTOS
=========================== */

const startBtn = document.getElementById("startBtn");
const cardSection = document.getElementById("cardSection");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseSection = document.getElementById("surpriseSection");
const openVideo = document.getElementById("openVideo");
const passwordSection = document.getElementById("passwordSection");
const anniversaryPassword = document.getElementById("anniversaryPassword");
const passwordError = document.getElementById("passwordError");
const confirmPassword = document.getElementById("confirmPassword");
const cancelPassword = document.getElementById("cancelPassword");
const videoSection = document.getElementById("videoSection");
const video = document.getElementById("videoInvitation");
const finalMessage = document.getElementById("finalMessage");

const bgMusic = document.getElementById("bgMusic");
const videoMusic = document.getElementById("videoMusic");

const musicBtn = document.getElementById("musicBtn");
const typingText = document.getElementById("typingText");
const counterYears = document.getElementById("counterYears");
const counterMonths = document.getElementById("counterMonths");
const counterDays = document.getElementById("counterDays");
const counterHours = document.getElementById("counterHours");
const counterMinutes = document.getElementById("counterMinutes");
const counterSeconds = document.getElementById("counterSeconds");

/* ===========================
   MÚSICA
=========================== */

let musicPlaying = false;
let typingStarted = false;
let finalMessageShown = false;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMusicState(isPlaying) {
    musicPlaying = isPlaying;
    musicBtn.innerHTML = isPlaying ? "🎵" : "🔇";
    musicBtn.setAttribute("aria-label", isPlaying ? "Pausar música" : "Activar música");
    musicBtn.classList.toggle("is-playing", isPlaying);
    musicBtn.classList.toggle("needs-tap", !isPlaying);
}

function playIntroMusic() {
    bgMusic.volume = 0.86;

    return bgMusic.play()
        .then(() => {
            setMusicState(true);
        })
        .catch(() => {
            setMusicState(false);
        });
}

function toggleMusic() {
    if (bgMusic.paused) {
        playIntroMusic();
    } else {
        bgMusic.pause();
        setMusicState(false);
    }
}

musicBtn.addEventListener("click", toggleMusic);

window.addEventListener("DOMContentLoaded", () => {
    playIntroMusic();
});

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
    window.addEventListener(eventName, () => {
        if (bgMusic.paused && !videoSection.classList.contains("fade")) {
            playIntroMusic();
        }
    }, { once: true, passive: true });
});

/* ===========================
   INICIO
=========================== */

startBtn.addEventListener("click", () => {

    playIntroMusic();

    document.querySelector(".hero").classList.add("hidden");

    cardSection.classList.remove("hidden");
    cardSection.classList.add("fade");
    cardSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

    startTyping();

});

/* ===========================
   CARTA ANIMADA
=========================== */

const letter = `
Mi amor...
Hace casi dos años llegaste a mi vida sin avisar, pero te quedaste para siempre en mi corazón.

Desde entonces descubrí que el amor no se busca, simplemente llega... y contigo llegó todo lo que necesitaba.

Gracias por cada sonrisa, por cada abrazo y por cada momento a tu lado. Hemos pasado por tantas situaciones a lo largo de estos dos años, que ya vamos a cumplir en tan solo unos días, pero nosotros no nos rendimos y aquí estamos, más juntos que nunca.

Pido a Dios que siga bendiciendo nuestra relación y que nos dé la sabiduría para seguir fortaleciéndola y saber afrontar futuros problemas. Que nos dé salud para cumplir todos nuestros sueños y metas. Tenemos que llegar a ser esos esposos que se aman mucho y que anhelan una relación estable.

Además quiero que sepas que no eres solo parte de mi vida...
eres mi vida.
Nunca lo olvides.

Y hoy quiero regalarte algo más que palabras...

una experiencia hermosa...

❤️
`;

function startTyping() {
    if (typingStarted) {
        return;
    }

    typingStarted = true;

    let i = 0;
    const text = letter.trim();
    typingText.textContent = "";
    typingText.classList.add("is-typing");
    surpriseBtn.disabled = true;
    surpriseBtn.classList.add("is-waiting");
    surpriseBtn.textContent = "Escribiendo...";

    if (prefersReducedMotion) {
        typingText.classList.add("is-reduced-motion");
    }

    function type() {
        if (i < text.length) {
            const currentChar = text.charAt(i);
            typingText.textContent += currentChar;
            i++;
            typingText.scrollTop = typingText.scrollHeight;
            setTimeout(type, getTypingDelay(currentChar));
            return;
        }

        typingText.classList.remove("is-typing");
        typingText.classList.remove("is-reduced-motion");
        surpriseBtn.disabled = false;
        surpriseBtn.classList.remove("is-waiting");
        surpriseBtn.textContent = "Descubrir mi sorpresa ❤️";
    }

    type();
}

function getTypingDelay(char) {
    if (char === "\n") {
        return prefersReducedMotion ? 160 : 760;
    }

    if (char === "." || char === "…" || char === "!" || char === "?") {
        return prefersReducedMotion ? 110 : 520;
    }

    if (char === "," || char === ";") {
        return prefersReducedMotion ? 70 : 260;
    }

    return prefersReducedMotion ? 18 : 64;
}

/* ===========================
   SORPRESA
=========================== */

surpriseBtn.addEventListener("click", () => {

    cardSection.classList.add("hidden");

    surpriseSection.classList.remove("hidden");
    surpriseSection.classList.add("fade");
    surpriseSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

});

/* ===========================
   VIDEO
=========================== */

openVideo.addEventListener("click", () => {

    surpriseSection.classList.add("hidden");

    passwordSection.classList.remove("hidden");
    passwordSection.classList.add("fade");
    anniversaryPassword.value = "";
    passwordError.textContent = "";
    anniversaryPassword.focus();
    passwordSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

});

cancelPassword.addEventListener("click", () => {

    passwordSection.classList.add("hidden");

    surpriseSection.classList.remove("hidden");
    surpriseSection.classList.add("fade");
    surpriseSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

});

confirmPassword.addEventListener("click", validatePassword);

anniversaryPassword.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        validatePassword();
    }

});

function validatePassword() {

    const password = anniversaryPassword.value.trim().toLowerCase();
    const cleanPassword = password.replace(/\s+/g, "");

    const validPasswords = [
        "24/06",
        "24-06",
        "24.06",
        "2406",
        "24/06/2024",
        "24-06-2024",
        "24.06.2024",
        "24062024",
        "24dejunio2024",
        "24dejuniodel2024"
    ];

    if (!validPasswords.includes(cleanPassword)) {
        passwordError.textContent = "Intenta con nuestra fecha de aniversario ❤️";
        anniversaryPassword.focus();
        return;
    }

    openInvitation();

}

function openInvitation() {

    passwordSection.classList.add("hidden");

    videoSection.classList.remove("hidden");
    videoSection.classList.add("fade");
    finalMessage.classList.add("hidden");
    finalMessage.innerHTML = "";
    finalMessageShown = false;
    videoSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

    /* cambiar música */
    bgMusic.pause();
    videoMusic.play().catch(() => {});

    /* cargar video solo cuando se abre */
    video.src = "assets/video/invitacion.mp4";
    video.loop = true;
    video.load();
    video.play().catch(() => {});

}

/* ===========================
   CONTADOR ROMÁNTICO
=========================== */

function updateCounter() {

    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    counterYears.textContent = years;
    counterMonths.textContent = months;
    counterDays.textContent = days;
    counterHours.textContent = hours;
    counterMinutes.textContent = minutes;
    counterSeconds.textContent = seconds;

}

setInterval(updateCounter, 1000);
updateCounter();

/* ===========================
   CORAZONES FLOTANTES
=========================== */

function createHeart() {
    if (prefersReducedMotion || document.hidden) {
        return;
    }

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 5) + "s";

    document.querySelector(".hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);

}

setInterval(createHeart, 650);

/* ===========================
   FINAL VIDEO
=========================== */

function showFinalMessage() {
    if (finalMessageShown) {
        return;
    }

    finalMessageShown = true;

    finalMessage.classList.remove("hidden");
    finalMessage.classList.add("fade");

    finalMessage.innerHTML = `
        <h2>Gracias por estos dos años ❤️</h2>
        <p>Cada día contigo es mi lugar favorito. Espero que esa noche sea otro hermoso capítulo de nuestra historia.</p>
        <h3>¿Me acompañas a nuestra cena romántica?</h3>
        <a href="https://wa.me/51966769973?text=S%C3%AD%20acepto%20nuestra%20cita%20%E2%9D%A4%EF%B8%8F"
           target="_blank"
           rel="noopener">
           Confirmar cita ❤️
        </a>
    `;
}

video.addEventListener("timeupdate", () => {
    if (!video.duration || finalMessageShown) {
        return;
    }

    if (video.duration - video.currentTime <= 0.45) {
        showFinalMessage();
    }
});

video.addEventListener("ended", showFinalMessage);
