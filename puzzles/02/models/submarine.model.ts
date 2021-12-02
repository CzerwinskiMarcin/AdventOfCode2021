import { Command } from "../types";
import { MovementDirection } from "../../shared/enums/movement-direction.enum";
import { Vector } from "../../shared/models";

export default class Submarine {
    private position: Vector;
    private aim = 0;

    private setPosition(position: Vector): void {
        this.position = position;
    }

    getPosition(): Vector {
        return this.position.copy();
    }

    constructor() {
        this.setPosition(new Vector());
    }

    reset(): void {
        this.position = new Vector();
        this.aim = 0;
    }

    applyFirstVersionCommands(commands: Array<Command>): void {
        commands.forEach(this.applyFirstVersionCommand.bind(this));
    }

    applyFirstVersionCommand(command: Command): void {
        let movement = {x: 0, y: 0};

        const {direction, value} = command;
        switch (direction) {
            case MovementDirection.forward:
                movement.x = value;
                break;
            case MovementDirection.backward:
                movement.x = -value;
                break;
            case MovementDirection.up:
                movement.y = -value;
                break;
            case MovementDirection.down:
                movement.y = value;
                break;
        }

        this.applyMovement(new Vector(movement.x, movement.y));
    }

    // For second part of puzzle
    applySecondVersionCommands(commands: Array<Command>): void {
        commands.forEach(this.applySecondVersionCommand.bind(this));
    }

    applySecondVersionCommand(command: Command): void {
        const {direction, value} = command;
        switch (direction) {
            case MovementDirection.forward:
                this.applyMovement(new Vector(value, this.aim * value));
                break;
            case MovementDirection.up:
                this.adjustAim(-value);
                break;
            case MovementDirection.down:
                this.adjustAim(value);
                break;
        }
    }

    private applyMovement(movementVector: Vector): void {
        this.position.add(movementVector);
    }

    private adjustAim(aim: number): void {
        this.aim += aim;
    }
}
