import { Command } from "../types";
import { MovementDirection } from "../../shared/enums/movement-direction.enum";

export default class CommandConverter {
    static convertToCommands(rawData: Array<string>): Array<Command> {
        return rawData.map(CommandConverter.convertToCommand);
    }

    static convertToCommand(rawData: string): Command {
        const [direction, value] = rawData.split(' ');

        // @ts-ignore
        const convertedDirection: MovementDirection = MovementDirection[direction];
        return {direction: convertedDirection, value: +value};
    }
}
