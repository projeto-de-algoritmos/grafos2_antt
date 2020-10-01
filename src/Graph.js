// import graph from './assets/graph.json';
const graph = [
	{
		nome: 'ALFA LUZ VIACAO TRANSPORTE LTDA',
		origem: 'BRASILIA',
		destino: 'CALDAS NOVAS',
		extensao: 100
	},
	{
		nome: 'ALFA LUZ VIACAO TRANSPORTE LTDA',
		origem: 'CALDAS NOVAS',
		destino: 'VIANÓPOLIS',
		extensao: 200
	}
];

export default class Graph {
	edges = {};
	nodes = [];

	addNode(node) {
		this.nodes.push(node);
		this.edges[node] = [];
	}

	addEdge(node1, node2, weight) {
		if (!this.edges[node1]) {
			this.edges[node1] = [];
		}
		this.edges[node1].push({ node: node2, weight: weight });
	}

	display() {
		let graph = "";
		this.nodes.forEach(node => {
			graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
		});
		console.log(graph);
	}

	djikstraAlgorithm(startNode) {
		let distances = {};
	
		// Stores the reference to previous nodes
		let prev = {};
		let pq = new PriorityQueue(this.nodes.length * this.nodes.length);
	
		// Set distances to all nodes to be infinite except startNode
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
		return distances;
	}
}

class PriorityQueue {
	constructor(maxSize) {
		 // Set default max size if not provided
		 if (isNaN(maxSize)) {
				maxSize = 10;
			}
		 this.maxSize = maxSize;
		 // Init an array that'll contain the queue values.
		 this.container = [];
	}
	// Helper function to display all values while developing
	display() {
		 console.log(this.container);
	}
	// Checks if queue is empty
	isEmpty() {
		 return this.container.length === 0;
	}
	// checks if queue is full
	isFull() {
		 return this.container.length >= this.maxSize;
	}
	enqueue(data, priority) {
		 // Check if Queue is full
		 if (this.isFull()) {
				console.log("Queue Overflow!");
				return;
		 }
		 let currElem = new this.Element(data, priority);
		 let addedFlag = false;
		 // Since we want to add elements to end, we'll just push them.
		 for (let i = 0; i < this.container.length; i++) {
				if (currElem.priority < this.container[i].priority) {
					 this.container.splice(i, 0, currElem);
					 addedFlag = true; break;
				}
		 }
		 if (!addedFlag) {
				this.container.push(currElem);
		 }
	}
	dequeue() {
		// Check if empty
		if (this.isEmpty()) {
			console.log("Queue Underflow!");
			return;
		}
		return this.container.pop();
	}
	peek() {
		if (this.isEmpty()) {
			console.log("Queue Underflow!");
			return;
		}
		return this.container[this.container.length - 1];
	}
	clear() {
		this.container = [];
		}
}
// Create an inner class that we'll use to create new nodes in the queue
// Each element has some data and a priority
PriorityQueue.prototype.Element = class {
	constructor(data, priority) {
		 this.data = data;
		 this.priority = priority;
	}
};

let g = new Graph();
graph.forEach(item => {
	g.addNode(item.origem);
	g.addEdge(item.origem, item.destino, item.extensao);
});

console.log(g.djikstraAlgorithm("BRASILIA"));