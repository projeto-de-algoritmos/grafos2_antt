const PriorityQueue = require('./priorityQueue.js');

class Graph {
  edges = {};
  nodes = [];

  addNode(node) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
      this.edges[node] = [];
    }
  }

  addEdge(node1, node2, weight) {
    this.edges[node1].push({ node: node2, weight: weight });
  }

  djikstraAlgorithm(startNode, endNode) {
    let distances = {};
    let prev = {};
    let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach(node => {
      if (node !== startNode) distances[node] = Infinity;
      prev[node] = null;
    });

    while (!pq.isEmpty()) {
      let minNode = pq.dequeue();
      let currNode = minNode.data;
      this.edges[currNode].forEach(neighbor => {
        let alt = distances[currNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = currNode;
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        }
      });
    }

    const path = [endNode];
    let p = prev[endNode];
    while (p !== startNode) {
      path.unshift(p);
      p = prev[p];
    }
    path.unshift(startNode);
    return { distancia: distances[endNode], path };
  }
}

module.exports = Graph;
