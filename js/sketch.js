function setup() {
  createCanvas(w * cols, w * rows);
  grid = new Array(cols);

  // Creating 2D Array for spots
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // Insert the spots in the 2D array
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Scan and set each grids' neighbors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  // Set the beginning and the end spot;
  start = grid[startX][startY];
  end = grid[endX][endY];

  // Set the start and end points as not obstacle
  start.obstacle = false;
  end.obstacle = false;

  // Set the starting point at open sets to check
  openSet.push(start);
}

function draw() {
  debug ? background(51) : background(245);

  let current;
  if (openSet.length > 0) {
    // Evaluate
    // Find the index of the spot with lowest F value
    let lowest = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowest].f) lowest = i;
    }

    current = openSet[lowest]; // Current spot evaluating

    // If the current position of grid is at the end points.. DONE!
    if (current === end) {
      noLoop();
      console.log("Done!");
    }

    removeFromArr(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors; 
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
        let tempG = current.g + 1;    
        let pathFound = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            pathFound = true;
          }
        } else {
          neighbor.g = tempG;
          pathFound = true;
          openSet.push(neighbor);
        }

        if (pathFound) {
          neighbor.h = heuristic(neighbor, end); // Calculate the heuristic
          neighbor.f = neighbor.g + neighbor.h; // Apply the formula
          neighbor.cameFrom = current;
        }
      }
    }
  } else {
    // No Solution
    // console.log("No solution :(");
    alert("No solution :( Please refresh the page...");
    noLoop();
    return;
  }

  // Draw all available path
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // Draw all closed path
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  // Draw all open path
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  // Find the next path from all open/possible paths
  let path = [];
  let temp = current;
  path.push(temp);
  while (temp.cameFrom) {
    path.push(temp.cameFrom);
    temp = temp.cameFrom;
  }

  // Draw all finder/solution path
  if(debug) {
    for (let i = 0; i < path.length; i++) {
      path[i].show(color(0, 0, 255));
    }
  } else {
    noFill();
    strokeWeight(w/3);
    stroke(color(13,230,123));
    beginShape();
      for (let i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w/2, path[i].j * w + w/2);
      }
    endShape();
  }
}
