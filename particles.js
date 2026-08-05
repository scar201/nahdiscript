// ==========================================================
// NahdiScript Background Particles
// ==========================================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 80;

const mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", () => {

    resizeCanvas();
    createParticles();

});

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});

resizeCanvas();

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

        if (mouse.x !== null) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                this.x += dx * 0.02;
                this.y += dy * 0.02;

            }

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "#FF7A00";

        ctx.shadowColor = "#FF7A00";
        ctx.shadowBlur = 12;

        ctx.fill();

    }

}

function createParticles() {

    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        particles.push(new Particle());

    }

}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {

                ctx.beginPath();

                ctx.strokeStyle = `rgba(255,122,0,${1 - distance / 130})`;

                ctx.lineWidth = 0.6;

                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);

                ctx.stroke();

            }

        }

    }

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {

        particle.update();
        particle.draw();

    }

    connectParticles();

    requestAnimationFrame(animate);

}

createParticles();
animate();
