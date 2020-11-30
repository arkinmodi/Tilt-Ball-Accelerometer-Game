window.onload = function () {
  // Get canvas
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  class Ball {
    constructor(x, y, radius, colour) {
      this.x = x; // x position
      this.y = y; // y position
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
    move(vx, vy) {
      // First check if new position is within bounds
      if (
        this.x + vx >= this.radius &&
        this.x + vx <= canvas.width - this.radius
      ) {
        this.x = this.x + vx;
      } else if (this.x + vx < this.radius) {
        this.x = this.radius;
      } else if (this.x + vx > canvas.width - this.radius) {
        this.x = canvas.width - this.radius;
      }

      if (
        this.y + vy >= this.radius &&
        this.y + vy <= canvas.height - this.radius
      ) {
        this.y = this.y + vy;
      } else if (this.y + vy < this.radius) {
        this.y = this.radius;
      } else if (this.y + vy > canvas.height - this.radius) {
        this.y = canvas.height - this.radius;
      }
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
  let speedMultiplier = 1;

  // Current device orientation
  let beta = 0;
  let gamma = 0;

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
  let player = new Ball(startBallX, startBallY, playerRadius, "green");
  let hole = new Square(startHoleX, startHoleY, holeLength, "black");

  function gameLogic() {
    // Update position based on device orientation
    window.ondeviceorientation = function (event) {
      beta = event.beta;
      gamma = event.gamma;
    };
    player.move(gamma * speedMultiplier, beta * speedMultiplier);
  }

  function updateFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    hole.draw();
    player.draw();
  }

  setInterval(function () {
    gameLogic();
    updateFrame();
  }, 30);
};
