const N = 8;
const inBounds = (curr) => {
  return curr.x < N && curr.x >= 0 && curr.y < N && curr.y >= 0;
};
class Node {
  constructor(x, y, prev = null) {
    this.x = x;
    this.y = y;
    this.prev = prev;
  }
  equal = (obj) => {
    return this.x === obj.x && this.y === obj.y;
  };
}
const getNeighbors = (curr) => {
  const directions = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  const neighbors = [];
  directions.forEach((d) => {
    const c = new Node(d[0] + curr.x, d[1] + curr.y, curr);
    if (inBounds(c)) neighbors.push(c);
  });
  return neighbors;
};
const constructPath = (vertices, start) => {
  let path = [];
  let curr = vertices[vertices.length - 1];
  while (curr) {
    path.push({ x: curr.x, y: curr.y });
    curr = curr.prev;
  }
  path.reverse();
  console.log(`you made it in ${path.length - 1} moves!`);
  return path;
};
const knightMoves = (a, b) => {
  const start = new Node(a[0], a[1]);
  const end = new Node(b[0], b[1]);
  let queue = [start];
  let visited = [];
  while (queue.length !== 0) {
    let element = queue.shift();
    visited.push(element);
    let neighbors = getNeighbors(element).filter((q) => {
      for (let i = 0; i < visited.length; i++) {
        if (q.equal(visited[i])) return false;
      }
      return true;
    });
    for (let i = 0; i < neighbors.length; i++) {
      queue.push(neighbors[i]);
      visited.push(neighbors[i]);
      if (neighbors[i].equal(end)) return constructPath(visited, start);
    }
  }
  return visited;
};

console.log(knightMoves([3, 3], [4, 3]));
