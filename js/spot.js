class Spot {
  constructor(i, j) {
    this.i = i; // x-axis point
    this.j = j; // y-axis point

    this.neighbors = [];
    this.cameFrom = undefined;
    this.obstacle = this.isObstacle();

    // Path finding formula: f(n) = g(n) + h(n);
    this.f = 0; // Cost score
    this.g = 0; // Cost from point A to B score
    this.h = 0; // Heuristic score
  }

  isObstacle() {
    return random(1) < 0.4; // 40% chance of being an obstacle
  }

  show(col) {
    /*
      White - Path
      Black - Obstacle
      Red   - Impossible Path
      Green - Possible Path
      Blue  - The Finder/Solution Path
     */
    noStroke();

    // Draw the spot with corresponding color
    if(debug) {
      this.obstacle ? fill(0) : fill(col);
      rect(this.i * w, this.j * w, w - 1, w - 1); 
    } else {
      if(this.obstacle) {
        fill(0);
        ellipse(this.i * w + w/2, this.j * w + w/2, w / 2, w / 2);
      }
    }
  }

  addNeighbors(grid) {
    let i = this.i;
    let j = this.j;

    if (i < cols - 1)   this.neighbors.push(grid[i + 1][j]);      // RIGHT
    if (i > 0)          this.neighbors.push(grid[i - 1][j]);      // LEFT
    if (j < rows - 1)   this.neighbors.push(grid[i][j + 1]);      // BOTTOM
    if (j > 0)          this.neighbors.push(grid[i][j - 1]);      // TOP
    if (i > 0 && j > 0)                 this.neighbors.push(grid[i - 1][j - 1]);    // UPPER LEFT
    if (i < cols - 1 && j > 0)          this.neighbors.push(grid[i + 1][j - 1]);    // UPPER RIGHT
    if (i > 0 && j < rows - 1)          this.neighbors.push(grid[i - 1][j + 1]);    // LOWER LEFT
    if (i < cols - 1 && j < rows - 1)   this.neighbors.push(grid[i + 1][j + 1]);    // LOWER RIGHT
  }
}
