// ======================== Global variables ========================

const debug = false;

// Canvas/Grid size constants
const w = 15; // 15 pixels each block
const cols = rows = 40; // 40x40 grid

// Setting the starting point at TOP LEFT of grid
let start;
const startX = 0;
const startY = 0;

// Setting the ending point at BOTTOM RIGHT of grid
let end;
const endX = cols - 1;
const endY = rows - 1;

// Array for possible and impossible paths
let openSet = [], closedSet = [];

// Global grid
let grid;


// ======================== Global functions ========================

// Remove element from array
let removeFromArr = (arr, elt) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) arr.splice(i, 1);
  }
}

// Heuristic formula
const heuristic = (x, y) => {
  return dist(x.i, x.j, y.i, y.j); // Euclidean Distance
  // return abs(x.i - y.i) + abs(x.j - y.j); // Manhattan Distance
}