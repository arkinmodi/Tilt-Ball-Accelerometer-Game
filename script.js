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

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getRadius() {
      return this.radius;
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

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getLength() {
      return this.length;
    }
  }

  function newGame() {
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
    player = new Ball(startBallX, startBallY, playerRadius, "green");
    hole = new Square(startHoleX, startHoleY, holeLength, "black");
  }

  function isGoal(player, hole) {
    /*  
        LOGIC
        1.  Check which sides (left or right & top or bottom) of the square the 
            circle is closest to. (e.g., if circle is above, closest is top)

        2.  Use Pythagorean Theorem to find the distance between center of 
            circle and the side of the square.

        3.  If this distance is less than the radius of circle, there is a 
            collision.
    */

    let x = player.getX();
    let y = player.getY();

    if (player.getX() < hole.getX()) {
      x = hole.getX(); // left side
    } else if (player.getX() > hole.getX() + hole.getLength()) {
      x = hole.getX() + hole.getLength(); // right side
    }

    if (player.getY() < hole.getY()) {
      y = hole.getY(); // top side
    } else if (player.getY() > hole.getY() + hole.getLength()) {
      y = hole.getY() + hole.getLength(); // bottom side
    }

    let distX = player.getX() - x;
    let distY = player.getY() - y;
    let distance = Math.sqrt(distX * distX + distY * distY);

    if (distance <= player.getRadius()) {
      return true;
    }
    return false;
  }

  function gameLogic() {
    // Update position based on device orientation
    window.ondeviceorientation = function (event) {
      beta = event.beta;
      gamma = event.gamma;
    };
    player.move(gamma * speedMultiplier, beta * speedMultiplier);

    if (isGoal(player, hole)) {
      score++;
      newGame();
    }
  }

  function updateFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    hole.draw();
    player.draw();
    context.font = "25px sans-serif";
    context.fillStyle = "black";
    context.fillText("Score: " + score, 5, 25);
    speedMultiplier = document.getElementById("speed").value;
  }

  // Current device orientation
  let beta = 0;
  let gamma = 0;

  // Initialize the game variables
  let score = 0;
  let playerRadius = 25;
  let holeLength = 50;
  let speedMultiplier = document.getElementById("speed").value;
  let player;
  let hole;

  // Start Game
  newGame();
  setInterval(function () {
    gameLogic();
    updateFrame();
  }, 30);
};
