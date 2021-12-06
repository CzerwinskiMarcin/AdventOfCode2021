export class Vector {
    constructor(private x: number = 0, private y: number = 0) {}

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector): this {
        const {x, y} = vector;
        this.x += x;
        this.y += y;

        return this;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getCoordinates(): [number, number] {
        return [this.getX(), this.getY()];
    }

    getDifference(vector: Vector): Vector {
        const xDiff = this.getX() - vector.getX();
        const yDiff = this.getY() - vector.getY();

        return new Vector(xDiff, yDiff);
    }

    copy(): Vector {
        const {x, y} = this;
        return new Vector(x, y);
    }
}
