
/* ===================================== */
/* LOADING SCREEN */
/* ===================================== */

const introScreen = document.getElementById('introScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');

let loading = 0;

const loadingInterval = setInterval(() => {

    loading++;

    loadingBar.style.width = loading + '%';
    loadingText.innerHTML = loading + '%';

    if (loading >= 100) {

        clearInterval(loadingInterval);

        setTimeout(() => {

            introScreen.style.transition = '1s';
            introScreen.style.opacity = '0';

            setTimeout(() => introScreen.remove(), 1000);

        }, 500);
    }

}, 40);


/* ===================================== */
/* HEADER AUTO HIDE */
/* ===================================== */

const header = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
});


/* ===================================== */
/* DASHBOARD (CLIMA REAL MARINGÁ) */
/* ===================================== */

const humidityValue = document.getElementById('humidityValue');
const tempValue = document.getElementById('tempValue');
const productionValue = document.getElementById('productionValue');

const soilHumidity = document.getElementById('soilHumidity');
const temperature = document.getElementById('temperature');
const irrigation = document.getElementById('irrigation');
const efficiency = document.getElementById('efficiency');

async function updateDashboard() {

    try {

        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-23.42&longitude=-51.93&current=temperature_2m,relative_humidity_2m"
        );

        const data = await res.json();

        const temp = data.current.temperature_2m;
        const humidity = data.current.relative_humidity_2m;

        humidityValue.innerHTML = humidity + '%';
        soilHumidity.innerHTML = humidity + '%';

        tempValue.innerHTML = temp + '°C';
        temperature.innerHTML = temp + '°C';

        productionValue.innerHTML = '+' + Math.floor(Math.random() * 15 + 10) + '%';

        efficiency.innerHTML = Math.floor(Math.random() * 10 + 90) + '%';

        irrigation.innerHTML = humidity < 70 ? 'Ativa' : 'Desligada';

    } catch (e) {
        console.log("Erro clima:", e);
    }
}

updateDashboard();
setInterval(updateDashboard, 60000);


/* ===================================== */
/* SOM (CORRIGIDO MOBILE) */
/* ===================================== */

const soundButton = document.getElementById("soundButton");
const ambientSound = document.getElementById("ambientSound");

let playing = false;

// desbloqueio obrigatório mobile
document.addEventListener("click", () => {
    ambientSound.play().then(() => {
        ambientSound.pause();
        ambientSound.currentTime = 0;
    }).catch(() => {});
}, { once: true });

soundButton.addEventListener("click", () => {

    if (!playing) {
        ambientSound.play();
        soundButton.innerHTML = "🔇 Parar";
        playing = true;
    } else {
        ambientSound.pause();
        soundButton.innerHTML = "🔊 Som";
        playing = false;
    }
});


/* ===================================== */
/* ACESSIBILIDADE (TEXTO GRANDE) */
/* ===================================== */

const fontButton = document.getElementById("fontButton");

let largeText = false;

if (fontButton) {
    fontButton.addEventListener("click", () => {

        largeText = !largeText;

        document.body.classList.toggle("large-text");

        fontButton.innerHTML = largeText ? "🔎 A-" : "🔎 A+";
    });
}


/* ===================================== */
/* CONTADORES */
/* ===================================== */

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const increment = target / 100;

            function update() {

                current += increment;

                if (current < target) {
                    counter.innerHTML = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.innerHTML = target;
                }
            }

            update();
            counterObserver.unobserve(counter);
        }
    });

}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


/* ===================================== */
/* IA AGRÍCOLA */
/* ===================================== */

const aiMessage = document.getElementById('aiMessage');

const aiMessages = [
    "Sensores indicam solo com boa umidade.",
    "IA recomenda irrigação leve pela manhã.",
    "Drones analisaram a lavoura com sucesso.",
    "Condições climáticas estáveis no Paraná.",
    "Produtividade acima da média regional."
];

function updateAI() {
    const i = Math.floor(Math.random() * aiMessages.length);
    aiMessage.innerHTML = aiMessages[i];
}

updateAI();
setInterval(updateAI, 5000);


/* ===================================== */
/* TIMELINE */
/* ===================================== */

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });

}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = '.8s';
    timelineObserver.observe(item);
});


/* ===================================== */
/* PARALLAX */
/* ===================================== */

document.addEventListener('mousemove', (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const g1 = document.querySelector('.glow1');
    const g2 = document.querySelector('.glow2');
    const g3 = document.querySelector('.glow3');

    if (g1) g1.style.transform = `translate(${x}px,${y}px)`;
    if (g2) g2.style.transform = `translate(${-x}px,${-y}px)`;
    if (g3) g3.style.transform =
        `translate(calc(-50% + ${x / 2}px), calc(-50% + ${y / 2}px))`;
});


/* ===================================== */
/* QUIZ */
/* ===================================== */

const questions = [
    {
        question: "O que é IoT?",
        answers: ["Internet das Coisas", "Rede offline", "Sistema manual", "Agricultura antiga"],
        correct: 0,
        explanation: "IoT conecta dispositivos à internet."
    },
    {
        question: "Função dos sensores?",
        answers: ["Monitorar solo", "Vender produtos", "Criar plantas", "Nenhuma"],
        correct: 0,
        explanation: "Sensores coletam dados do ambiente."
    },
    {
        question: "Drones servem para?",
        answers: ["Monitorar lavouras", "Cavar solo", "Cozinhar", "Nada"],
        correct: 0,
        explanation: "Drones ajudam na agricultura moderna."
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const explanationEl = document.getElementById("explanation");
const scoreEl = document.getElementById("score");

function loadQuestion() {

    const q = questions[currentQuestion];

    questionEl.innerHTML = q.question;
    answersEl.innerHTML = "";
    explanationEl.innerHTML = "";

    const shuffled = [...q.answers]
        .map((a, i) => ({ text: a, index: i }))
        .sort(() => Math.random() - 0.5);

    shuffled.forEach(item => {

        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.innerHTML = item.text;

        btn.onclick = () => {

            if (item.index === q.correct) {
                score++;
                explanationEl.innerHTML = "✔ Correto! " + q.explanation;
                unlockBadge(1);
            } else {
                explanationEl.innerHTML = "❌ Errado! " + q.explanation;
            }

            scoreEl.innerHTML = "Pontuação: " + score;

            setTimeout(() => {

                currentQuestion++;

                if (currentQuestion < questions.length) {
                    loadQuestion();
                } else {
                    questionEl.innerHTML = "Quiz finalizado!";
                    answersEl.innerHTML = "";
                    explanationEl.innerHTML =
                        `Você acertou ${score} de ${questions.length}`;

                    unlockBadge(2);
                }

            }, 1200);
        };

        answersEl.appendChild(btn);
    });
}

if (questionEl) loadQuestion();


/* ===================================== */
/* CONQUISTAS */
/* ===================================== */

function unlockBadge(index) {

    const badges = document.querySelectorAll(".badge");

    if (badges[index]) {
        badges[index].classList.add("unlocked");
    }
}

unlockBadge(0);


/* ===================================== */
/* CERTIFICADO */
/* ===================================== */

const certBtn = document.getElementById('generateCertificate');

if (certBtn) {
    certBtn.addEventListener('click', () => {

        const name = document.getElementById('studentName').value;

        if (!name.trim()) {
            alert("Digite seu nome");
            return;
        }

        document.getElementById('certificateName').innerHTML = name;
        document.getElementById('certificate').style.display = 'block';

        document.getElementById('certificate')
            .scrollIntoView({ behavior: 'smooth' });
    });
}
