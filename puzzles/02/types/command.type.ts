import { MovementDirection } from "../../shared/enums/movement-direction.enum";

export type Command = {direction: MovementDirection, value: number};
