export default class Canvas {
    constructor({ WIN, id, width = 700, height = 700, callbacks = {}, color }) {
        this.WIN = WIN;

        this.canvas = document.getElementById(id);
        this.canvasVirt = document.createElement("canvas")

        this.canvas.width = width;
        this.canvasVirt.width = width;

        this.canvas.height = height;
        this.canvasVirt.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.ctxVirt = this.canvasVirt.getContext('2d')

        this.canvas.color = color;
        this.ctx.strokeStyle = "black";

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mouseup', mouseUp);
        this.canvas.addEventListener('mousedown', mouseDown);
        this.canvas.addEventListener('mousemove', mouseMove);
        this.canvas.addEventListener('mouseleave', mouseLeave);
    }

    xs = (x) => (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    ys = (y) => this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;

    sx = (x) => x * this.WIN.width / this.canvas.width;
    sy = (y) => -y * this.WIN.height / this.canvas.height;

    x = (xs) => xs * this.WIN.width / this.canvas.width + this.WIN.left;
    y = (ys) => -ys * this.WIN.height / this.canvas.height + this.WIN.bottom + this.WIN.height;

    ssx(x) {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }

    ssy(y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    drawRect(x, y, width, height, color = 'black') {
        const heightRect = height * this.canvas.height / this.WIN.height;
        const widthRect = width * this.canvas.width / this.WIN.width;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
    };

    clear() {
        this.ctxVirt.fillStyle = '#e1e7f0';
        this.ctxVirt.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    line(x1, y1, x2, y2, width = 1, color = 'black', isDash = false) {
        this.ctxVirt.beginPath();
        this.ctxVirt.strokeStyle = color;
        this.ctxVirt.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.ctxVirt.lineWidth = 1;
            this.ctxVirt.setLineDash([10, 10]);
        } else {
            this.ctxVirt.lineWidth = width;
            this.ctxVirt.setLineDash([]);
        }
        this.ctxVirt.lineTo(this.xs(x2), this.ys(y2));
        this.ctxVirt.stroke();
        this.ctxVirt.closePath();
    };

    printText(text, x, y, color = '#A4A4A4', size = NaN) {
        this.ctxVirt.font = `${size}px serif`;
        this.ctxVirt.fillStyle = color;
        this.ctxVirt.fillText(text, this.xs(x), this.ys(y));
    };

    point(x, y, color = 'red', size = 4) {
        this.ctxVirt.beginPath();
        this.ctxVirt.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.ctxVirt.fillStyle = color;
        this.ctxVirt.fill();
        this.ctxVirt.closePath();
    };

    polygon(points = [], color = '#f003') {
        if (points.length >= 3) {
            this.ctxVirt.fillStyle = color;
            this.ctxVirt.strokeStyle = color;
            this.ctxVirt.beginPath();
            this.ctxVirt.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.ctxVirt.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.ctxVirt.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.ctxVirt.closePath();
            this.ctxVirt.fill();
            this.ctxVirt.stroke();
        }
    };

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

    render() {
        this.ctx.drawImage(this.canvasVirt, 0, 0);
    }

}