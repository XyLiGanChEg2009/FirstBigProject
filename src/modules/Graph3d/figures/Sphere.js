import { Point, Edge, Polygon, Figure } from "../props";

export default class Sphere extends Figure {
    constructor(x = 10, edgesLines = 20) {
        super();
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.edgesLines = edgesLines;
        this.name = "sphere";

        const I = Math.PI / this.edgesLines;
        const J = 2 * Math.PI / this.edgesLines;

        for (let i = 0; i <= Math.PI; i += I) {
            for (let j = 0; j < 2 * Math.PI; j += J) {
                this.points.push(new Point(
                    x * Math.sin(i) * Math.sin(j),
                    x * Math.cos(i),
                    x * Math.sin(i) * Math.cos(j)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if ((i + 1) % this.edgesLines === 0) {
                    this.edges.push(new Edge(i, i + 1 - this.edgesLines));
                } else {
                    this.edges.push(new Edge(i, i + 1));
                }
            }
            if (this.points[i + this.edgesLines]) {
                this.edges.push(new Edge(i, i + this.edgesLines));
            }
        }
        this.edges.push(new Edge(this.points.length - this.edgesLines, this.points.length - 1));

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + this.edgesLines + 1]) {
                if ((i + 1) % this.edgesLines === 0) {
                    this.polygons.push(new Polygon([i, i - this.edgesLines + 1, i + 1, i + this.edgesLines]));
                } else
                    this.polygons.push(new Polygon([i, i + 1, i + this.edgesLines + 1, i + this.edgesLines]));
            }
        }
        this.polygons.push(new Polygon([this.points.length - 1, this.points.length - this.edgesLines - 1, this.points.length - 2 * this.edgesLines, this.points.length - this.edgesLines]));

        
    }

}