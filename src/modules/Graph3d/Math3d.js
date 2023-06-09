export default class Math3d {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        const { camera, focus } = this.WIN;
        return (point.x - camera.x) / (point.z - camera.z) * (focus.z - camera.z) - camera.x;
    }

    ys(point) {
        const { camera, focus } = this.WIN;
        return (point.y - camera.y) / (point.z - camera.z) * (focus.z - camera.z) - camera.y;
    }

    mult(t, m) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += t[j][i] * m[j];
            }
            c[i] = s;
        }

        return c;
    }

    multVector(vec1, vec2) {
		return {
			x: vec1.y * vec2.z - vec1.z * vec2.y,
			y: vec1.z * vec2.x - vec1.x * vec2.z,
			z: vec1.x * vec2.y - vec1.y * vec2.x
		}
	}

    zoom(delta) {
		return [
			[delta, 0, 0, 0],
			[0, delta, 0, 0],
			[0, 0, delta, 0],
			[0, 0, 0, 1]
		];
	}

    move(dx, dy, dz) {
		return [
			[1, 0, 0, dx],
			[0, 1, 0, dy],
			[0, 0, 1, dz],
			[0, 0, 0, 1]
		];
	}

    rotateOy(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOx(alpha) {
        return [
            [Math.cos(alpha), 0, -Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]

        ];
    }

    rotateOz(alpha) {
		return [
			[Math.cos(alpha), Math.sin(alpha), 0, 0],
			[-(Math.sin(alpha)), Math.cos(alpha), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		];
	}

    transformPoint(matrix, point) {
        const arr = this.mult(matrix, [point.x, point.y, point.z, 1]);
        point.x = arr[0];
        point.y = arr[1];
        point.z = arr[2];
    }

    calcCenter(figure) {
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let j = 0; j < points.length; j++) {
                x += figure.points[points[j]].x;
                y += figure.points[points[j]].y;
                z += figure.points[points[j]].z;
            }

            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        })
    }

    calcDistance(figure, endPoint, name) {
		figure.polygons.forEach(polygon => {
			polygon[name] = Math.sqrt(
				Math.pow(endPoint.x - polygon.center.x, 2) +
				Math.pow(endPoint.y - polygon.center.y, 2) +
				Math.pow(endPoint.z - polygon.center.z, 2)
			)
		});
	}

    calcLumDist(distance, lumen) {
		const result = distance ? lumen / Math.pow(distance, 3) : 1;
		return result > 1 ? 1 : result;
	}

    normVector(figure) {
		figure.polygons.forEach(polygon => {
			const edge1 = {
				x: (figure.points[polygon.points[2]].x - figure.points[polygon.points[0]].x),
				y: (figure.points[polygon.points[2]].y - figure.points[polygon.points[0]].y),
				z: (figure.points[polygon.points[2]].z - figure.points[polygon.points[0]].z)
			}
			const edge2 = {
				x: (figure.points[polygon.points[1]].x - figure.points[polygon.points[0]].x),
				y: (figure.points[polygon.points[1]].y - figure.points[polygon.points[0]].y),
				z: (figure.points[polygon.points[1]].z - figure.points[polygon.points[0]].z)
			}
			return polygon.norm = this.multVector(edge1, edge2);
		});
	}

    calcRadius(figure) {
        const points = figure.points;
        figure.polygons.forEach((polygon) => {
            const centre = polygon.centre;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];

            polygon.radius = (
                this.calcVectorModule(this.calcVector(centre, p1)) +
                this.calcVectorModule(this.calcVector(centre, p2)) +
                this.calcVectorModule(this.calcVector(centre, p3)) +
                this.calcVectorModule(this.calcVector(centre, p4))
            ) / 4;
        });
    }

    calcShadow(polygon, figures, LIGHT) {
        if (polygon.radius) {
            const m1 = polygon.centre;
            const radius = polygon.radius;
            const s = this.calcVector(m1, LIGHT);
            for (let i = 0; i < figures.length; i++) {
                if (polygon.figureIndex === i) {
                    continue;
                }

                if (figures[i]) {
                    for (let j = 0; j < figures[i].polygons.length; j++) {
                        const polygon2 = figures[i].polygons[j];
                        const m0 = polygon2.centre;
                        if (polygon.lumen < polygon2.lumen) {
                            continue;
                        }
                        const dark = this.calcVectorModule(
                            this.vectProd(this.calcVector(m0, m1),
                                s
                            )) / this.calcVectorModule(s);
                        if (dark < radius) {
                            return {
                                isShadow: true,
                                dark: dark / 1.3
                            }
                        }
                    }
                }
            }
        }
        return {
            isShadow: false,
        }
    }

    getTranformMatrix() {
        return Array.from(arguments).reduce((result, matrix) =>
            this.mutlMatrix(result, matrix), [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }


    sortByArtistAlg(polygons){
        polygons.sort((a, b) => b.distance - a.distance);
    }


}