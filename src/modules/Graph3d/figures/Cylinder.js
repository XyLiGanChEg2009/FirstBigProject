import { Point, Edge, Polygon, Figure } from "../props";

export default class Cylinder extends Figure {
    constructor(x = 5, y = 10, z = 4, lines = 9) {
        super();
        this.edges = [];
        this.points = [];
        this.polygons = [];
        this.lines = lines;
        this.deltaY = y / this.lines;
        this.deltaT = (2 * Math.PI) / this.lines;

        for (let j = -y; j < y; j += this.deltaY) {
            for (let i = 0; i < 2 * Math.PI; i += this.deltaT) {
                this.points.push(new Point(
                    x = y * Math.cos(i),
                    j,
                    z = y * Math.sin(i),
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if ((i + 1) % this.lines === 0) {
                    this.edges.push(new Edge(i, i + 1 - this.lines));
                } else {
                    this.edges.push(new Edge(i, i + 1));
                }
            }
            if (this.points[i + this.lines]) {
                this.edges.push(new Edge(i, i + this.lines));
            }
        }
        this.edges.push(new Edge(this.points.length - this.lines, this.points.length - 1));

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + this.lines + 1]) {
                if ((i + 1) % this.lines === 0) {
                    this.polygons.push(new Polygon([i, i - this.lines + 1, i + 1, i + this.lines]));
                } else
                    this.polygons.push(new Polygon([i, i + 1, i + this.lines + 1, i + this.lines]));
            }
        }

        this.polygons.push(new Polygon([
            this.points.length - 1,
            this.points.length - this.lines - 1,
            this.points.length - 2 * this.lines,
            this.points.length - this.lines]));
    }
}