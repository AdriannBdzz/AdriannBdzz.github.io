let particles = [];
let particleCount = 150;
let isPaused = false;

function setup() {
    let container = document.getElementById('p5-canvas');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
    canvas.parent('p5-canvas');

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Crear controles de usuario
    createUI();
}

function draw() {
    if (!isPaused) {
        background(30, 30, 50);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);

        for (let particle of particles) {
            particle.update();
            particle.show();
        }
    }
}

class Particle {
    constructor() {
        this.pos = createVector(
            random(-200, 200),
            random(-200, 200),
            random(-200, 200)
        );
        this.vel = p5.Vector.random3D().mult(random(0.5, 2));
        this.size = random(5, 15);
        this.color = color(135, 206, 250, 180); // Azul translúcido
    }

    update() {
        this.pos.add(this.vel);

        // Rebote en los bordes
        if (abs(this.pos.x) > 200) this.vel.x *= -1;
        if (abs(this.pos.y) > 200) this.vel.y *= -1;
        if (abs(this.pos.z) > 200) this.vel.z *= -1;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        fill(this.color);
        noStroke();
        sphere(this.size);
        pop();
    }

    changeColor() {
        this.color = color(random(100, 255), random(100, 255), random(100, 255), 200);
    }
}

function createUI() {
    let container = document.getElementById('p5-canvas');

    let pauseButton = createButton('Pausar');
    pauseButton.parent(container);
    pauseButton.position(5, 10);
    pauseButton.mousePressed(() => {
        isPaused = !isPaused;
        pauseButton.html(isPaused ? 'Reanudar' : 'Pausar');
    });

    // Slider para ajustar la cantidad de partículas
    let particleSlider = createSlider(10, 400, particleCount, 10);
    particleSlider.parent(container);
    particleSlider.position(10, 50);
    particleSlider.style('width', '150px');
    particleSlider.input(() => {
        let newCount = particleSlider.value();
        adjustParticleCount(newCount);
    });
}

function adjustParticleCount(newCount) {
    if (newCount > particles.length) {
        for (let i = particles.length; i < newCount; i++) {
            particles.push(new Particle());
        }
    } else {
        particles.splice(newCount, particles.length - newCount);
    }
    particleCount = newCount;
}

function windowResized() {
    let container = document.getElementById('p5-canvas');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}
