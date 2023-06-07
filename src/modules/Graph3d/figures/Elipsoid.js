import { Point, Edge, Polygon, Figure } from "../props";

export default class Ellipsoid extends Figure {
    constructor(x = 14, y = 10, z = 14, edgeLines = 20) {
        super();

        this.edges = [];
        this.points = [];
        this.polygons = [];
        this.edgeLines = edgeLines;
        this.name = "ellipsoid";

        const T = Math.PI / this.edgeLines;
        const F = 2 * Math.PI / this.edgeLines;

        for (let i = 0; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += F) {
                this.points.push(new Point(
                    x * Math.sin(i) * Math.sin(j),
                    y * Math.cos(i),
                    z * Math.sin(i) * Math.cos(j)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if ((i + 1) % this.edgeLines === 0) {
                    this.edges.push(new Edge(i, i + 1 - this.edgeLines));
                } else {
                    this.edges.push(new Edge(i, i + 1));
                }
            }
            if (this.points[i + this.edgeLines]) {
                this.edges.push(new Edge(i, i + this.edgeLines));
            }
        }
        this.edges.push(new Edge(this.points.length - this.edgeLines, this.points.length - 1));

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + this.edgeLines + 1]) {
                if ((i + 1) % this.edgeLines === 0) {
                    this.polygons.push(new Polygon([i, i - this.edgeLines + 1, i + 1, i + this.edgeLines]));
                } else
                    this.polygons.push(new Polygon([i, i + 1, i + this.edgeLines + 1, i + this.edgeLines]));
            }
        }
        this.polygons.push(new Polygon([this.points.length - 1, this.points.length - this.edgeLines - 1, this.points.length - 2 * this.edgeLines, this.points.length - this.edgeLines]));
    }
}