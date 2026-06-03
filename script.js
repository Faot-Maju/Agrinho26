
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

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-23.42&longitude=-51.93&current=temperature_2m,relative_humidity_2m"
        );

        const data = await response.json();

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
        console.log("Erro API clima", e);
    }
}

updateDashboard();
setInterval(updateDashboard, 60000);
/* ===================================== */
/* VOLTAR AO TOPO */
/* ===================================== */

const backTop = document.getElementById("backTop");

if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

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
    "Drones completaram análise da lavoura.",
    "Condições climáticas estáveis no Paraná.",
    "Produtividade acima da média regional."
];

function updateAI() {
    const index = Math.floor(Math.random() * aiMessages.length);
    aiMessage.innerHTML = aiMessages[index];
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

    document.querySelector('.glow1').style.transform =
        `translate(${x}px,${y}px)`;

    document.querySelector('.glow2').style.transform =
        `translate(${-x}px,${-y}px)`;

    document.querySelector('.glow3').style.transform =
        `translate(calc(-50% + ${x / 2}px), calc(-50% + ${y / 2}px))`;
});


/* ===================================== */
/* QUIZ */
/* ===================================== */

const questions = [
    {
        question: "O que é IoT?",
        answers: ["Internet das Coisas", "Sistema manual", "Rede offline", "Agricultura antiga"],
        correct: 0,
        explanation: "IoT conecta dispositivos à internet."
    },
    {
        question: "Para que servem sensores?",
        answers: ["Monitorar solo", "Plantar sozinho", "Vender produtos", "Subir preço"],
        correct: 0,
        explanation: "Sensores monitoram solo e clima."
    },
    {
        question: "O que drones fazem?",
        answers: ["Monitoram plantações", "Cavam solo", "Colhem manualmente", "Nada"],
        correct: 0,
        explanation: "Drones ajudam no monitoramento agrícola."
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

loadQuestion();


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

document.getElementById('generateCertificate').addEventListener('click', () => {

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


const themeButton = document.getElementById("themeButton");

let lightMode = false;

themeButton.addEventListener("click", () => {

    lightMode = !lightMode;

    document.body.classList.toggle("light-mode");

    themeButton.style.transition = "0.3s";

    if (lightMode) {
        themeButton.innerHTML = "🌙 Modo Escuro";
    } else {
        themeButton.innerHTML = "☀️ Modo Claro";
    }

});


const particlesContainer = document.getElementById("particles");

function createParticle() {

    const particle = document.createElement("div");
    particle.classList.add("particle");

    // posição aleatória
    particle.style.left = Math.random() * 100 + "vw";

    // tamanho variado
    const size = Math.random() * 3 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // duração da animação
    const duration = Math.random() * 10 + 8;
    particle.style.animationDuration = duration + "s";

    particlesContainer.appendChild(particle);

    // remove depois de subir
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// cria partículas continuamente
setInterval(createParticle, 200);
/* ===================================== */
/* ACESSIBILIDADE - TAMANHO DA FONTE */
/* ===================================== */

let fontSize = 16;

const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const resetFont = document.getElementById("resetFont");

function updateFont() {
    document.documentElement.style.fontSize = fontSize + "px";
}

increaseFont.addEventListener("click", () => {
    if (fontSize < 22) {
        fontSize += 1;
        updateFont();
    }
});

decreaseFont.addEventListener("click", () => {
    if (fontSize > 12) {
        fontSize -= 1;
        updateFont();
    }
});

resetFont.addEventListener("click", () => {
    fontSize = 16;
    updateFont();
});
/* ===================================== */
/* ASSISTENTE IA */
/* ===================================== */

const askButton = document.getElementById("askButton");
const questionInput = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");

const knowledgeBase = {

    iot: [
        "IoT significa Internet das Coisas. É uma tecnologia que conecta dispositivos físicos à internet para coletar, compartilhar e analisar dados em tempo real.",

        "Na agricultura, a IoT permite que sensores monitorem temperatura, umidade do solo, clima e desempenho das máquinas automaticamente.",

        "A principal vantagem da IoT é permitir decisões mais rápidas e precisas, reduzindo desperdícios e aumentando a produtividade."
    ],

    sensores: [
        "Sensores são dispositivos capazes de coletar informações do ambiente, como temperatura, umidade, luminosidade e nutrientes do solo.",

        "Na Agricultura 4.0, sensores ajudam os produtores a acompanhar a lavoura em tempo real e identificar problemas antes que causem prejuízos.",

        "Com sensores conectados à internet, é possível automatizar sistemas de irrigação e monitoramento agrícola."
    ],

    drones: [
        "Drones são aeronaves não tripuladas utilizadas para monitorar plantações, identificar falhas e acompanhar o desenvolvimento das culturas.",

        "Com câmeras especiais, drones conseguem detectar áreas com falta de água, pragas ou doenças nas plantas.",

        "Os drones ajudam a reduzir custos e aumentam a precisão das análises agrícolas."
    ],

    ia: [
        "A Inteligência Artificial analisa grandes quantidades de dados e identifica padrões que ajudam os agricultores a tomar decisões mais eficientes.",

        "A IA pode prever condições climáticas, identificar doenças em plantações e recomendar o melhor momento para irrigação.",

        "Na Agricultura 4.0, a Inteligência Artificial trabalha em conjunto com sensores, drones e sistemas automatizados."
    ],

    agricultura: [
        "A Agricultura 4.0 representa a modernização do campo por meio de tecnologias digitais como IoT, Inteligência Artificial, Big Data e automação.",

        "Seu principal objetivo é aumentar a produtividade ao mesmo tempo em que reduz desperdícios de água, energia e insumos.",

        "A Agricultura 4.0 permite um controle mais preciso de toda a produção agrícola."
    ],

    beneficios: [
        "Entre os principais benefícios estão a economia de recursos, aumento da produtividade e redução de custos operacionais.",

        "A tecnologia permite identificar problemas rapidamente e agir antes que eles afetem a produção.",

        "Com dados mais precisos, o agricultor consegue tomar decisões mais seguras e eficientes."
    ],

    irrigacao: [
        "A irrigação inteligente utiliza sensores para identificar exatamente quando e quanto irrigar uma plantação.",

        "Esse sistema reduz o desperdício de água e melhora o desenvolvimento das culturas.",

        "A automação da irrigação é uma das aplicações mais importantes da IoT na agricultura."
    ],

    clima: [
        "O monitoramento climático ajuda os agricultores a planejar melhor o plantio, a irrigação e a colheita.",

        "Sensores meteorológicos conseguem registrar temperatura, umidade e previsão de chuva em tempo real.",

        "Com essas informações é possível reduzir perdas causadas por condições climáticas adversas."
    ]
};

function getRandomResponse(array) {

    const shuffled =
        [...array].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 2).join("<br><br>");

}

askButton.addEventListener("click", () => {

    const question = questionInput.value
        .trim()
        .toLowerCase();

    if (!question) {

        answerBox.innerHTML =
            "Digite uma pergunta para a IA.";

        return;
    }

    let response = "";

    if (
        question.includes("iot")
    ) {
        response = getRandomResponse(knowledgeBase.iot);
    }

    else if (
        question.includes("sensor")
    ) {
        response = getRandomResponse(knowledgeBase.sensores);
    }

    else if (
        question.includes("drone")
    ) {
        response = getRandomResponse(knowledgeBase.drones);
    }

    else if (
        question.includes("inteligência artificial") ||
        question.includes("ia")
    ) {
        response = getRandomResponse(knowledgeBase.ia);
    }

    else if (
        question.includes("agricultura")
    ) {
        response = getRandomResponse(knowledgeBase.agricultura);
    }

    else if (
        question.includes("benefício") ||
        question.includes("vantagem")
    ) {
        response = getRandomResponse(knowledgeBase.beneficios);
    }

    else if (
        question.includes("irrigação") ||
        question.includes("irrigacao")
    ) {
        response = getRandomResponse(knowledgeBase.irrigacao);
    }

    else if (
        question.includes("clima") ||
        question.includes("tempo")
    ) {
        response = getRandomResponse(knowledgeBase.clima);
    }

    else {

        response =
            "Não encontrei uma resposta específica. Tente perguntar sobre IoT, sensores, drones, clima, irrigação, Inteligência Artificial ou Agricultura 4.0.";
    }

    answerBox.innerHTML = response;

    questionInput.value = "";
    questionInput.focus();

});

questionInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        askButton.click();
    }

});

const particles = document.getElementById("particles");

for(let i = 0; i < 35; i++){

    const bubble = document.createElement("div");

    bubble.classList.add("particle");

    const size = Math.random() * 50 + 10;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = Math.random() * 100 + "%";

    bubble.style.animationDuration =
        (Math.random() * 20 + 12) + "s";

    bubble.style.animationDelay =
        Math.random() * 10 + "s";

    bubble.style.opacity =
        Math.random() * 0.5 + 0.2;

    particles.appendChild(bubble);

}

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.innerWidth <= 768){

        const currentScroll = window.scrollY;

        if(currentScroll > 100){

            if(currentScroll > lastScroll){
                header.classList.add("hide");
            }else{
                header.classList.remove("hide");
            }

        }else{
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;
    }

});
