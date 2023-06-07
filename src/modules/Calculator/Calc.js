import { complexCalc, matrixCalc, vectorCalc, realCalc } from './TypeOfCalc';
import { Complex, Vector, Matrix } from './Entity';

export default class Calc{
    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getMatrix(str) {
        const arr = str.slice(1, - 1).split('|').map(
            elems => elems.split(';').map(
                elem => this.getEntity(elem)
            )
        );
        return new Matrix(arr);
    }

    getVector(str) {
        const arr = str.slice(1, -1).split(',');
        return new Vector(arr.map(Number));
    }

    getComplex(str) {
        const arr = str.split('i');
        if (arr.length === 2) {
            const ch = arr[0].substr(arr[0].length - 1);
            arr[0] = arr[0].slice(0, -1);
            arr[1] = arr[1]
            if (ch === '-') {
                arr[1] = ch + arr[1];
            }
            if (arr[0]) {
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0);
        }
    }

    getEntity(str) {
        str = str.replace(/\s/g, '').replaceAll('\n', '');
        if (str.includes('[')) {
            return this.getMatrix(str);

        }
        if (str.includes('(')) {
            return this.getVector(str);
        }
        if (str.includes('i')) {
            return this.getComplex(str);
        }
        return str - 0;
    }

    get(elem) {
        if (elem instanceof Matrix) {
            return new matrixCalc(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new vectorCalc(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new complexCalc;
        }
        return new realCalc;
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    prod(p, a) {
        return this.get(a).prod(p, a)
    }
}