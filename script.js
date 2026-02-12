const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let currentEra = 'wwafa';

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.init(); }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = currentEra === 'blue' ? canvas.height + 20 : -20;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    draw() {
        ctx.beginPath();
        if (currentEra === 'wwafa') {
            ctx.shadowBlur = 8; ctx.shadowColor = "#1fdf64";
            ctx.fillStyle = "rgba(31, 223, 100, 0.5)";
            ctx.roundRect(this.x, this.y, 2, 12, 5);
        } else if (currentEra === 'happier') {
            ctx.fillStyle = `rgba(139, 94, 60, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
            ctx.strokeStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.fill(); ctx.shadowBlur = 0;
    }
    update() {
        if (currentEra === 'blue') this.y -= this.speed;
        else this.y += this.speed;
        if (this.y > canvas.height + 50 || this.y < -50) this.init();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

const eras = {
    wwafa: { title: "WWAFA, <br> WDWG?", phrases: ['"Bury a friend" de los problemas...', 'Eres la "Bad Guy" más dulce...'], song: "MUSICA_WWAFA.mp3", track: "Bad Guy" },
    happier: { title: "HAPPIER <br> THAN EVER", phrases: ['"I’m Happier Than Ever" riendo contigo.', 'Eres "Getting Older" pero genial.'], song: "MUSICA_HAPPIER.mp3", track: "Happier Than Ever" },
    blue: { title: "HIT ME <br> HARD & SOFT", phrases: ['Nuestro lazo es "L’AMOUR DE MA VIE".', 'Somos "Birds of a Feather".'], song: "MUSICA_BLUE.mp3", track: "Birds of a Feather" }
};

function changeEra(eraName, element) {
    currentEra = eraName;
    const era = eras[eraName];
    document.querySelectorAll('.album-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    document.body.setAttribute('data-era', eraName);
    document.getElementById('main-title').innerHTML = era.title;
    document.getElementById('phrase-1').innerText = era.phrases[0];
    document.getElementById('phrase-2').innerText = era.phrases[1];
    
    const audio = document.getElementById('main-audio');
    const audioSrc = document.getElementById('audio-src');
    audio.pause(); 
    audioSrc.src = era.song; 
    audio.load();
    document.getElementById('track-name').innerText = era.track;
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function toggleMusic() {
    const audio = document.getElementById('main-audio');
    const btn = document.getElementById('play-btn');
    if (audio.paused) { 
        audio.play().catch(e => console.log("Esperando interacción del usuario...")); 
        btn.innerText = "||"; 
    }
    else { audio.pause(); btn.innerText = "▶"; }
}