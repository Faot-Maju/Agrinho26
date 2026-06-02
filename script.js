/* ===================================== */
/* ASSISTENTE IA */
/* ===================================== */

const askButton = document.getElementById("askButton");
const questionInput = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");

const aiResponses = {

    "iot":
    "IoT significa Internet das Coisas. Ela conecta dispositivos à internet para trocar dados em tempo real.",

    "sensor":
    "Sensores coletam informações do ambiente, como temperatura, umidade e nutrientes do solo.",

    "drone":
    "Drones monitoram lavouras, detectam falhas e ajudam na pulverização agrícola.",

    "agricultura":
    "A agricultura inteligente utiliza tecnologias para aumentar a produtividade e reduzir desperdícios.",

    "ia":
    "A Inteligência Artificial analisa dados e ajuda agricultores a tomar decisões mais rápidas."
};

if (askButton) {

    askButton.addEventListener("click", () => {

        const question =
            questionInput.value.toLowerCase();

        let answer =
            "Não encontrei uma resposta específica. Tente perguntar sobre IoT, sensores, drones ou agricultura.";

        for (let key in aiResponses) {

            if (question.includes(key)) {

                answer = aiResponses[key];
                break;
            }
        }

        answerBox.innerHTML = answer;

    });

}

/* ===================================== */
/* CERTIFICADO */
/* ===================================== */

const certificateButton =
document.getElementById("generateCertificate");

if (certificateButton) {

    certificateButton.addEventListener("click", () => {

        const name =
        document.getElementById("studentName").value;

        if (!name.trim()) {

            alert("Digite seu nome.");

            return;
        }

        document.getElementById(
            "certificateName"
        ).innerHTML = name;

        document.getElementById(
            "certificate"
        ).style.display = "block";

        unlockBadge(3);

        document
            .getElementById("certificate")
            .scrollIntoView({
                behavior:"smooth"
            });

    });

}

/* ===================================== */
/* VOLTAR AO TOPO */
/* ===================================== */

const backTop =
document.getElementById("backTop");

if(backTop){

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ===================================== */
/* ACESSIBILIDADE */
/* ===================================== */

const increaseFont =
document.getElementById("increaseFont");

const decreaseFont =
document.getElementById("decreaseFont");

const resetFont =
document.getElementById("resetFont");

let currentFontSize = 16;

if(increaseFont){

    increaseFont.addEventListener("click",()=>{

        currentFontSize += 2;

        document.documentElement.style.fontSize =
        currentFontSize + "px";

    });

}

if(decreaseFont){

    decreaseFont.addEventListener("click",()=>{

        if(currentFontSize > 12){

            currentFontSize -= 2;

            document.documentElement.style.fontSize =
            currentFontSize + "px";

        }

    });

}

if(resetFont){

    resetFont.addEventListener("click",()=>{

        currentFontSize = 16;

        document.documentElement.style.fontSize =
        "16px";

    });

}
/* ===================================== */
/* MODO CLARO */
/* ===================================== */

const themeButton =
document.getElementById("themeButton");

if(themeButton){

    themeButton.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

        const light =
        document.body.classList.contains(
            "light-mode"
        );

        themeButton.innerHTML =
        light
        ? "🌙 Modo Escuro"
        : "☀️ Modo Claro";

    });

}

/* ===================================== */
/* PARTÍCULAS */
/* ===================================== */

const particlesContainer =
document.getElementById("particles");

if(particlesContainer){

    for(let i = 0; i < 40; i++){

        const particle =
        document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
        Math.random() * 100 + "%";

        particle.style.animationDuration =
        (10 + Math.random() * 20) + "s";

        particle.style.animationDelay =
        Math.random() * 5 + "s";

        particle.style.opacity =
        Math.random();

        particle.style.width =
        (2 + Math.random() * 4) + "px";

        particle.style.height =
        particle.style.width;

        particlesContainer.appendChild(
            particle
        );

    }

}

/* ===================================== */
/* HEADER INTELIGENTE */
/* ===================================== */

const pageHeader =
document.querySelector("header");

let lastScroll = 0;

window.addEventListener("scroll",()=>{

    if(window.innerWidth > 768){

        pageHeader.classList.remove(
            "hidden"
        );

        return;
    }

    const current =
    window.pageYOffset;

    if(
        current > lastScroll &&
        current > 150
    ){

        pageHeader.classList.add(
            "hidden"
        );

    }else{

        pageHeader.classList.remove(
            "hidden"
        );

    }

    lastScroll = current;

});

/* ===================================== */
/* DASHBOARD AUTOMÁTICO */
/* ===================================== */

function randomDashboard(){

    const humidity =
    Math.floor(
        Math.random()*20 + 65
    );

    const temp =
    Math.floor(
        Math.random()*10 + 20
    );

    const production =
    Math.floor(
        Math.random()*15 + 10
    );

    const efficiencyValue =
    Math.floor(
        Math.random()*8 + 92
    );

    document.getElementById(
        "humidityValue"
    ).innerHTML =
    humidity + "%";

    document.getElementById(
        "tempValue"
    ).innerHTML =
    temp + "°C";

    document.getElementById(
        "productionValue"
    ).innerHTML =
    "+" + production + "%";

    document.getElementById(
        "soilHumidity"
    ).innerHTML =
    humidity + "%";

    document.getElementById(
        "temperature"
    ).innerHTML =
    temp + "°C";

    document.getElementById(
        "efficiency"
    ).innerHTML =
    efficiencyValue + "%";

    document.getElementById(
        "irrigation"
    ).innerHTML =
    humidity < 75
    ? "Ativa"
    : "Desligada";

}

randomDashboard();

setInterval(
    randomDashboard,
    5000
);
/* ===================================== */
/* QUIZ AVANÇADO */
/* ===================================== */

const allQuestions = [

{
    question:"O que significa IoT?",
    answers:[
        "Internet das Coisas",
        "Internet Offline",
        "Sistema Manual",
        "Rede Rural"
    ],
    correct:0,
    explanation:"IoT significa Internet das Coisas."
},

{
    question:"Qual equipamento monitora plantações pelo ar?",
    answers:[
        "Drone",
        "Trator",
        "Arado",
        "Colheitadeira"
    ],
    correct:0,
    explanation:"Drones monitoram grandes áreas rapidamente."
},

{
    question:"Sensores agrícolas coletam:",
    answers:[
        "Dados do ambiente",
        "Dinheiro",
        "Combustível",
        "Sementes"
    ],
    correct:0,
    explanation:"Sensores coletam informações em tempo real."
},

{
    question:"A IoT ajuda a:",
    answers:[
        "Tomar decisões",
        "Reduzir tecnologia",
        "Eliminar máquinas",
        "Substituir agricultores"
    ],
    correct:0,
    explanation:"Os dados ajudam nas decisões agrícolas."
},

{
    question:"Qual recurso economiza água?",
    answers:[
        "Irrigação inteligente",
        "Queimadas",
        "Desmatamento",
        "Arado manual"
    ],
    correct:0,
    explanation:"A irrigação inteligente reduz desperdícios."
},

{
    question:"Qual tecnologia usa imagens espaciais?",
    answers:[
        "Satélite",
        "Enxada",
        "Arado",
        "Silo"
    ],
    correct:0,
    explanation:"Satélites fornecem imagens e dados climáticos."
},

{
    question:"O Paraná utiliza muito:",
    answers:[
        "Agricultura de precisão",
        "Agricultura medieval",
        "Produção manual",
        "Nenhuma tecnologia"
    ],
    correct:0,
    explanation:"O Paraná é referência em agricultura de precisão."
},

{
    question:"A IA na agricultura serve para:",
    answers:[
        "Analisar dados",
        "Plantar árvores",
        "Produzir chuva",
        "Criar sementes"
    ],
    correct:0,
    explanation:"A IA analisa grandes volumes de dados."
},

{
    question:"O monitoramento remoto permite:",
    answers:[
        "Acompanhar a fazenda à distância",
        "Desligar a internet",
        "Parar sensores",
        "Reduzir produção"
    ],
    correct:0,
    explanation:"Tudo pode ser acompanhado online."
},

{
    question:"A Agricultura 4.0 utiliza:",
    answers:[
        "IoT e IA",
        "Somente enxadas",
        "Somente tratores",
        "Somente mão de obra"
    ],
    correct:0,
    explanation:"A Agricultura 4.0 integra tecnologias digitais."
}

];

let availableQuestions =
[...allQuestions]
.sort(() => Math.random() - 0.5);

currentQuestion = 0;
score = 0;

/* ===================================== */
/* CARREGAR QUESTÃO */
/* ===================================== */

function loadQuestion(){

    if(currentQuestion >= availableQuestions.length){

        questionEl.innerHTML =
        "🎉 Quiz Finalizado!";

        answersEl.innerHTML = "";

        explanationEl.innerHTML =
        `Você acertou ${score} de ${availableQuestions.length}`;

        scoreEl.innerHTML =
        "Pontuação Final: " + score;

        unlockBadge(2);

        localStorage.setItem(
            "quizScore",
            score
        );

        return;
    }

    const q =
    availableQuestions[currentQuestion];

    questionEl.innerHTML =
    q.question;

    answersEl.innerHTML = "";

    explanationEl.innerHTML = "";

    const shuffled =
    [...q.answers]
    .map((a,i)=>({
        text:a,
        index:i
    }))
    .sort(()=>
        Math.random()-0.5
    );

    shuffled.forEach(item=>{

        const btn =
        document.createElement("button");

        btn.classList.add(
            "answer-btn"
        );

        btn.innerHTML =
        item.text;

        btn.onclick = ()=>{

            if(item.index === q.correct){

                score++;

                explanationEl.innerHTML =
                "✅ Correto! " +
                q.explanation;

                unlockBadge(1);

            }else{

                explanationEl.innerHTML =
                "❌ Errado! " +
                q.explanation;

            }

            scoreEl.innerHTML =
            "Pontuação: " + score;

            setTimeout(()=>{

                currentQuestion++;

                loadQuestion();

            },1200);

        };

        answersEl.appendChild(btn);

    });

}

if(questionEl){

    loadQuestion();

}

/* ===================================== */
/* CONQUISTAS */
/* ===================================== */

function unlockBadge(index){

    const badges =
    document.querySelectorAll(".badge");

    if(!badges[index]) return;

    badges[index].classList.add(
        "unlocked"
    );

    let unlocked =
    JSON.parse(
        localStorage.getItem(
            "badges"
        ) || "[]"
    );

    if(!unlocked.includes(index)){

        unlocked.push(index);

        localStorage.setItem(
            "badges",
            JSON.stringify(unlocked)
        );

    }

}

function loadBadges(){

    const badges =
    document.querySelectorAll(".badge");

    const unlocked =
    JSON.parse(
        localStorage.getItem(
            "badges"
        ) || "[]"
    );

    unlocked.forEach(index=>{

        if(badges[index]){

            badges[index].classList.add(
                "unlocked"
            );

        }

    });

}

loadBadges();

/* ===================================== */
/* SALVAR MODO CLARO */
/* ===================================== */

if(localStorage.getItem("theme")
=== "light"){

    document.body.classList.add(
        "light-mode"
    );

    if(themeButton){

        themeButton.innerHTML =
        "🌙 Modo Escuro";

    }

}

if(themeButton){

    themeButton.addEventListener(
        "click",
        ()=>{

            const light =
            document.body.classList.contains(
                "light-mode"
            );

            localStorage.setItem(
                "theme",
                light
                ? "light"
                : "dark"
            );

        }
    );

}

/* ===================================== */
/* CONQUISTA INICIAL */
/* ===================================== */

unlockBadge(0);

console.log(
    "AGRO AI iniciado com sucesso."
);
