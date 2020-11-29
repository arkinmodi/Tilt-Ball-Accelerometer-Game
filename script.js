window.onload = function () {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  class Ball {
    constructor(x, y, vx, vy, bvx, bvy, radius, color) {
      this.x = x; // x position
      this.y = y; // y position
      this.vx = vx; // x velocity
      this.vy = vy; // y velocity
      this.bvx = bvx; // x velocity after bounce = vx * bvx
      this.bvy = bvy; // y velocity after bounce = vy * bvy
      this.radius = radius;
      this.color = color;
    }

    // Draw ball to canvas
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }

    // Set new position
    move() {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }

    // Check if ball is within bounds
    boundary_check() {
      if (
        this.y + this.radius + this.vy > canvas.height ||
        this.y - this.radius + this.vy < 0
      ) {
        this.vy = this.bvy * this.vy;
      }
      if (
        this.x + this.radius + this.vx > canvas.width ||
        this.x - this.radius + this.vx < 0
      ) {
        this.vx = this.bvx * this.vx;
      }
    }
  }

  // Initialize the game
  let score = 0;
  let playerRadius = 25;

  // Number between 25 and (canvas width or height - 25)
  // Makes sure player starts inbounds
  let startBallX =
    Math.floor(Math.random() * (canvas.width - playerRadius * 2)) +
    playerRadius;
  let startBallY =
    Math.floor(Math.random() * (canvas.height - playerRadius * 2)) +
    playerRadius;

  let player = new Ball(
    startBallX,
    startBallY,
    0,
    0,
    0,
    0,
    playerRadius,
    "green"
  );

  setInterval(function () {
    player.draw();
  }, 30);
};
