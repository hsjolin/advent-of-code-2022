var djikstras = {
    estimatedNodes: [],
    findShortestPath: function (options) {
        var _this = this;
        var startNode = options.startNode;
        var destinationNode = options.destinationNode;
        startNode.explored = true;
        startNode.totalDistance = 0;
        startNode.distance = 0;
        var currentNode = startNode;
        while (currentNode != destinationNode) {
            currentNode.adjacentNodes.forEach(function (adjecent) {
                _this.estimateNode(currentNode, adjecent);
            });
            var next = this.estimatedNodes.pop();
            this.exploreNode(next);
            currentNode = next;
        }
        var result = [];
        while (currentNode != null) {
            result.push(currentNode);
            currentNode = currentNode.sourceNode;
        }
        return this.draw(result);
    },
    estimateNode: function (sourceNode, node) {
        if (sourceNode == null) {
            node.totalDistance = 0;
        }
        else if (node.totalDistance > sourceNode.totalDistance + node.distance) {
            node.totalDistance = sourceNode.totalDistance + node.distance;
            node.sourceNode = sourceNode;
        }
        if (!node.explored && !this.estimatedNodes.find(function (n) { return n == node; })) {
            this.estimatedNodes.push(node);
            this.estimatedNodes.sort(function (a, b) { return b.totalDistance - a.totalDistance; });
        }
    },
    exploreNode: function (node) {
        node.explored = true;
    },
    draw: function (result) {
        return result
            .reverse()
            .map(function (node) { return '(' + node.x + ', ' + node.y + ') Distance: ' + node.distance + ' Total distance: ' + node.totalDistance + '\r\n'; })
            .join('');
    }
};
module.exports = djikstras;
