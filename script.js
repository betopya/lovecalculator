function startCalculation() {
    const name1 = document.getElementById("name1").value.trim().toLowerCase();
    const name2 = document.getElementById("name2").value.trim().toLowerCase();
    const loadingDiv = document.getElementById("loading");

    if (name1 === "" || name2 === "") {
        loadingDiv.innerHTML = "İsimleri boş bırakmaaaa 😭";
        return;
    }

    const messages = [
        "💘 Enerjiler analiz ediliyor",
        "💞 Yıldız haritaları karşılaştırılıyor",
        "🔮 Aşk frekansları ölçülüyor",
        "❤️ Kalp titreşimleri eşleştiriliyor",
        "✨ Ruh uyumu hesaplanıyor"
    ];

    let i = 0;

    loadingDiv.classList.add("dots");
    loadingDiv.innerHTML = messages[i];

    const messageInterval = setInterval(() => {
        i++;
        if (i < messages.length) {
            loadingDiv.innerHTML = messages[i];
        }
    }, 600);

    setTimeout(() => {
        clearInterval(messageInterval);
        localStorage.setItem("name1", name1);
        localStorage.setItem("name2", name2);
        window.location.href = "result.html";
    }, 3000); // 3 saniye
}



function calculateLove(name1, name2) {

    const specialCouples = [
        ["ılgın", "mete"],
        ["betül", "emrah"]
    ];

    for (let couple of specialCouples) {
        if (
            (name1 === couple[0] && name2 === couple[1]) ||
            (name1 === couple[1] && name2 === couple[0])
        ) {
            return 100;
        }
    }

    const combined = name1 + name2;
    let total = 0;

    for (let i = 0; i < combined.length; i++) {
        total += combined.charCodeAt(i);
    }

    return total % 101;
}


function showResult() {
    const resultDiv = document.getElementById("result");
    if (!resultDiv) return;

    const name1 = localStorage.getItem("name1");
    const name2 = localStorage.getItem("name2");

    const percentage = calculateLove(name1, name2);

    let message = "";

    if (percentage > 80) {
        message = "Ruh eşi alerti 💍🔥";
        startConfetti();
    } else if (percentage > 50) {
        message = "Fena değil ha 😏💘";
    } else if (percentage > 30) {
        message = "Biraz çalışmanız lazım 😅";
    } else {
        message = "Friendzone kokusu alıyorum 💀";
    }

    resultDiv.innerHTML = `
        <h2>${name1} ❤️ ${name2}</h2>
        <h1>%${percentage}</h1>
        <p>${message}</p>
    `;
}


function goBack() {
    window.location.href = "index.html";
}


/* 🎉 BASİT CONFETTI */
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 50
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            ctx.fillStyle = "pink";
            ctx.fill();
        }

        update();
    }

    function update() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y += Math.cos(p.d) + 2;
            if (p.y > canvas.height) {
                p.y = 0;
            }
        }
    }

    setInterval(draw, 20);
}

window.onload = showResult;
