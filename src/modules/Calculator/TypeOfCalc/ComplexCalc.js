import realCalc from "./RealCalc";
import { Complex } from "../Entity";

export default class complexCalc extends realCalc {
    add(a, b) { return new Complex(a.re + b.re, a.im + b.im); }
    sub(a, b) { return new Complex(a.re - b.re, a.im - b.im); }
    mult(a, b) { return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
    div(a, b) {
        const m = Math.pow(b.re, 2) + Math.pow(b.im, 2);
        return new Complex((a.re * b.re + a.im * b.im) / m, (a.im * b.re - a.re * b.im) / m);
    }
    prod(p, a) { return p * a; }
    pow(a, p) {
        let c = this.one;
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }
    one() { return new Complex(1); }
    zero() { return new Complex; }
}