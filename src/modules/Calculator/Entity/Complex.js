export default class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    toString() {
        if (this.im === 0) { // 2
            return `${this.re}`;
        }

        return `${this.re} + i${this.im}`;
    }
}