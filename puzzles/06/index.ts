import { FileUtils, ValuesUtils } from "../shared/utils";
import { LaternfishSchoolManager } from "./models/laternfishSchoolManager";
import { Laternfish } from "./models/laternfish.model";
import { AdvancedLaternfishSchoolManager } from "./models/AdvancedLaternfishSchoolManager.model";

export default function main(sourcePath: string): {alphaResult: number, betaResult: number} {
    const laternfishesAges: Array<number> = ValuesUtils.convertToNumber(FileUtils.readFileToArray(sourcePath)[0].split(',')) as Array<number>;

    return {
        alphaResult: runSchoolSimulation(laternfishesAges, 80),
        betaResult: runAdvancedSchoolSimulation(laternfishesAges, 256)
    }
}


function runSchoolSimulation(initialPopulation: Array<number>, day: number): number {
    const laternfishSchool: LaternfishSchoolManager = new LaternfishSchoolManager(Laternfish.newLaternfishOffspringLength);
    laternfishSchool.populateSchoolWithLaternfishes(initialPopulation);
    return laternfishSchool.getPopulationAtDay(day);
}

function runAdvancedSchoolSimulation(initialPopulation: Array<number>, day: number): number {
    return new AdvancedLaternfishSchoolManager(initialPopulation).getPopulationAtDay(day);
}
