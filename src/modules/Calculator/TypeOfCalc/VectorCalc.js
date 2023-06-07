import { Vector } from "../Entity";
import realCalc from "./RealCalc";

export default class VectorCalc extends realCalc {
    div() { return null; }
    add(a, b) {
        return new Vector(a.values.map((elem, i) => elem + b.values[i]));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => elem - b.values[i]));
    }

    mult(a, b) {
        return new Vector([
            a.values[1] * b.values[2] - a.values[2] * b.values[1],
            a.values[2] * b.values[0] - a.values[0] * b.values[2],
            a.values[0] * b.values[1] - a.values[1] * b.values[0]
        ])
    }

    prod(p, a) { return new Vector(a.values.map((elem) => elem + p)); }

    pow(a, p) {
        let c = this.one(3);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(super.prod(1 / Math.sqrt(length), super.one()));
        }

        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(super.zero());
        }

        return new Vector(values);
    }
}