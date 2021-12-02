export class Vector {
    constructor(private x: number = 0, private y: number = 0) {}

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector): void {
        const {x, y} = vector;
        this.x += x;
        this.y += y;
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

    copy(): Vector {
        const {x, y} = this;
        return new Vector(x, y);
    }
}
