import { FileUtils } from "../shared/utils";
import { Command } from "./types";
import CommandConverter from "./utils/command-converter.util";
import Submarine from "./models/submarine.model";

export default function main(sourcePath: string): {alphaResult: number, betaResult: number} {
   const fileData: Array<string> = FileUtils.readFileToArray(sourcePath);
   const commands: Array<Command> = CommandConverter.convertToCommands(fileData);
   const submarine = new Submarine();

   // For first part of puzzle
   submarine.applyFirstVersionCommands(commands);
   const coordinates: [number, number] = submarine.getPosition().getCoordinates();
   const multiplication: number = coordinates.reduce((acc: number, curr: number) => acc * curr, 1);
   console.log(`first coordinates: ${coordinates.join(', ')} first multiplication: ${multiplication}`);

   // For second part of puzzle
   submarine.reset();
   submarine.applySecondVersionCommands(commands);
   const secondCoordinates: [number, number] = submarine.getPosition().getCoordinates();
   const secondMultiplication: number = secondCoordinates.reduce((acc: number, curr: number) => acc * curr, 1);
   console.log(`secondCoordinates: ${secondCoordinates.join(', ')} second multiplication: ${secondMultiplication}`);

   return {
      alphaResult: multiplication,
      betaResult: secondMultiplication
   }
}
