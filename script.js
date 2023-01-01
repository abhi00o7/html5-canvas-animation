const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // ctx is the context
const particlesArray = []; // array to store all the particles
let hue = 0; // hue is the color
let saturation = 0; // saturation is the amount of gray
let light = 0; // light is the amount of black
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// to view the list of all the properties and methods of the context
console.log(ctx);

// using addEventListener to resize the canvas when the window is resized
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// draw a circle on click
const mouse = {
  x: undefined,
  y: undefined,
};
canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 13; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

// particle class
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // random number between -0.5 and 0.5
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// create particle array

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        // change line width based on the distance between the particles
        // > 100 will give a particle blast effect with pixie dust
        
        ctx.lineWidth = particlesArray[i].size / 111;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}
// animate function
function animate() {
  // clear the canvas before drawing the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += Math.PI; // increment the hue
  saturation += 2; // increment the saturation
  light += 2; // increment the light
  requestAnimationFrame(animate);
}
animate();
