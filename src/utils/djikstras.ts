import { GridNode, Grid } from "./grid";

export interface DjikstrasNode extends GridNode {
    sourceNode: DjikstrasNode;
    explored: boolean;
    totalDistance: number;
    distance: number;
}

export class Djikstras {
    estimatedNodes: DjikstrasNode[] = [];
    grid: Grid<DjikstrasNode>;

    constructor(grid: Grid<DjikstrasNode>) {
        this.grid = grid;
    }

    findShortestPath = (startNode: DjikstrasNode, destinationNode: DjikstrasNode): DjikstrasNode[] => {
        startNode.explored = true;
        startNode.totalDistance = 0;
        startNode.distance = 0;

        let currentNode = startNode;

        while (currentNode != destinationNode) {
            const adjacentNodes = this.grid.getAdjacentItems(currentNode.column, currentNode.row);

            adjacentNodes.forEach(adjecent => {
                this.estimateNode(currentNode, adjecent);
            });

            const next = this.estimatedNodes.pop();
            this.exploreNode(next);
            currentNode = next;
        }

        let result: DjikstrasNode[] = [];
        while (currentNode != null) {
            result.push(currentNode);
            currentNode = currentNode.sourceNode;
        }

        return result;
    }

    estimateNode = (sourceNode: DjikstrasNode, node: DjikstrasNode) => {
        if (sourceNode == null) {
            node.totalDistance = 0;
        } else if (node.totalDistance > sourceNode.totalDistance + node.distance) {
            node.totalDistance = sourceNode.totalDistance + node.distance;
            node.sourceNode = sourceNode;
        }
        
        if (!node.explored && !this.estimatedNodes.find(n => n == node)) {
            this.estimatedNodes.push(node);
            this.estimatedNodes.sort((a, b) => b.totalDistance - a.totalDistance);
        }
    }

    exploreNode = (node: DjikstrasNode) => {
        node.explored = true;
    }

    draw = (result: DjikstrasNode[]): string => {
        return result
            .reverse()
            .map(node => '(' + node.column + ', ' + node.row + ') Distance: ' + node.distance + ' Total distance: ' + node.totalDistance + '\r\n')
            .join('');
    }
}