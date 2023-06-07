
export default class Graph2dComponent {
    constructor(WIN, canvas) {
        this.WIN = WIN;
        this.canvas = canvas;
    }

    printOXY(){
        const { left, bottom, width, height } = this.WIN;
        this.canvas.line(left, 0, width + left, 0);
        this.canvas.line(0, bottom, 0, bottom + height);

        for (let i = left; i <= width + left; i += 0.5) {
            this.canvas.line(i, height + bottom, i, bottom, 0.3);
        }

        for (let i = bottom; i <= bottom + height; i += 0.5) {
            this.canvas.line(left, i, width + left, i, 0.3);
        }

        for (let i = 0; i >= left; i -= 1) {
            this.canvas.line(i, -0.2, i, 0.2, 1);
        }

        for (let i = 0; i <= width + left; i += 1) {
            this.canvas.line(i, -0.1, i, 0.1, 1);
        }
        for (let i = 0; i <= bottom + height; i += 1) {
            this.canvas.line(0.1, i, -0.1, i, 1);
        }
        for (let i = 0; i >= bottom; i -= 1) {
            this.canvas.line(0.1, i, -0.1, i, 1);
        }
    }

    printFunction( f, color = "red", linewidth = 1) {
        var dx = this.WIN.width / 1000;
        var x = this.WIN.left;
        while (x < this.WIN.width + this.WIN.left) {
            this.canvas.line(x, f(x), x + dx, f(x + dx), linewidth, color);
            x += dx;
        }
    }

    printIntegral(f, a, b, integral, color = 'rgb(195, 119, 224, 0.6)') {
        const dx = (b - a) / 1000;
        let x = a;
        const points = [];
        points.push({ x: a, y: 0 })
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: 0 })
        this.canvas.polygon(points, color);
        this.canvas.line(a, 0, b, 0, 2, 'orange');
    }

    printNums() {
        const { left, bottom, width, height } = this.WIN;
        const Length = height / (width + 30);
        const len = Length / 2;
        const shiftY = -height * 0.01 - 0.04;
        const shiftX = width * 0.001 + 0.04;

        for (let i = Math.round(left); i < left + width; i++) {
            this.canvas.line(i, len, i, -len, 2.5);
            this.canvas.printText(i, i + shiftX, shiftY);
        }
        for (let i = Math.round(bottom); i < bottom + height; i++) {
            this.canvas.line(len, i, -len, i, 2.5);
            this.canvas.printText(i, shiftX, i + shiftY);
        }
    }

    getIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += (f(x) + f(x + dx)) / 2 * dx;
            x += dx;
        }
        return S;
    }

    getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
        if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
        else return null;
    }

    printDerivative(f, x) {
        const dx = Math.pow(10, -9),
            k = (f(x + dx) - f(x)) / dx,
            b = f(x) - k * x,
            x1 = this.WIN.LEFT,
            x2 = this.WIN.LEFT + this.WIN.WIDTH,
            y1 = k * x1 + b,
            y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, 'red');
    }
}