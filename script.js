const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // ctx is the context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
  console.log(event);
  drawCircle(mouse.x, mouse.y);
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(event);
  drawCircle(mouse.x, mouse.y);
});

// make drawCircle function
function drawCircle(x, y) {
  ctx.fillStyle = "#ff0000";
  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  ctx.arc(x, y, 55, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
}

// animate function 
function animate() {
 // clear the canvas before drawing the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // call the drawCircle function
  requestAnimationFrame(animate);
}