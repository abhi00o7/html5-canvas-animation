const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // ctx is the context
const particleArray = []; // array to store all the particles
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
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // random number between -0.5 and 0.5
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.arc(this.x, this.y, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
}

// create particle array
function init() {
  for (let i = 0; i < 100; i++) {
    particleArray.push(new Particle());
  }
}
init();

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
}
// animate function
function animate() {
  // clear the canvas before drawing the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  // call the drawCircle function
  requestAnimationFrame(animate);
}
animate();
