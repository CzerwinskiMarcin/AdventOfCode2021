import { PowerConsumptionCalculationUnit } from "./power-consumption-calculation-unit.models";
import { PowerConsumptionDataInterface } from "../interfaces/power-consumption-data.interface";
import { LifeSupportData } from "../interfaces/life-support-data.interface";
import { LifeSupportCalculationUnit } from "./life-support-calculation-unit.models";
import { BitUtils } from "../../shared/utils";

export class DiagnosticReportInterpreter {
    private powerConsumptionCalculationUnit: PowerConsumptionCalculationUnit = new PowerConsumptionCalculationUnit();
    private lifeSupportCalculationUnit: LifeSupportCalculationUnit = new LifeSupportCalculationUnit();

    interpretReport(rawData: Array<string>): {consumptionData: PowerConsumptionDataInterface, lifeSupportData: LifeSupportData} {
        const data: Array<number> = rawData.map(value => Number.parseInt(value, 2));

        const bitSize = rawData[0].length;
        const countedBits = BitUtils.countOnes(data, bitSize);

        return {
            consumptionData: this.powerConsumptionCalculationUnit.calculateData(data, countedBits),
            lifeSupportData: this.lifeSupportCalculationUnit.calculateData(data, countedBits)
        }
    }
}

