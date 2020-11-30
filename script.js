window.onload = function () {
  // Get canvas
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  class Ball {
    constructor(x, y, vx, vy, radius, colour) {
      this.x = x; // x position
      this.y = y; // y position
      this.vx = vx; // x velocity
      this.vy = vy; // y velocity
      this.radius = radius;
      this.colour = colour;
    }

    // Draw ball to canvas
    draw() {
      context.beginPath();
      context.fillStyle = this.colour;
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }

    // Set new position
    move() {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
  }

  class Square {
    constructor(x, y, length, colour) {
      this.x = x; // x position
      this.y = y; // y position
      this.length = length;
      this.colour = colour;
    }

    draw() {
      context.beginPath();
      context.fillStyle = this.colour;
      context.rect(this.x, this.y, this.length, this.length);
      context.fill();
    }
  }

  // Initialize the game
  let score = 0;
  let playerRadius = 25;
  let holeLength = 50;

  // Number between 25 and (canvas width or height - 25)
  // Makes sure player starts inbounds
  let startBallX =
    Math.floor(Math.random() * (canvas.width - playerRadius * 2)) +
    playerRadius;
  let startBallY =
    Math.floor(Math.random() * (canvas.height - playerRadius * 2)) +
    playerRadius;

  // Start hole at ball and keep changing until hole is not on ball
  // Square (x, y) is at top left corner
  let startHoleX = startBallX;
  let startHoleY = startBallY;
  while (
    Math.abs(startHoleX - startBallX) < holeLength + playerRadius &&
    Math.abs(startHoleY - startBallY) < holeLength + playerRadius
  ) {
    // Number between 0 and (canvas width or height - holeLength)
    startHoleX = Math.floor(Math.random() * (canvas.width - holeLength + 1));
    startHoleY = Math.floor(Math.random() * (canvas.height - holeLength + 1));
  }

  // Game objects
  let player = new Ball(startBallX, startBallY, 0, 0, playerRadius, "green");
  let hole = new Square(startHoleX, startHoleY, holeLength, "black");

  console.log(startHoleX, startHoleY, startBallX, startBallY);

  setInterval(function () {
    hole.draw();
    player.draw();
  }, 30);
};
