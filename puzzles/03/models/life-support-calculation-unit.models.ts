import { LifeSupportData } from "../interfaces/life-support-data.interface";
import { BitUtils } from "../../shared/utils";

export class LifeSupportCalculationUnit {
    calculateData(data: Array<number>, countedBits: Array<number>): LifeSupportData {
        const oxygenGeneration: number = this.calculateOxygenGeneratorRating(data, countedBits.length);
        const CO2Scrubber: number = this.calculateCO2ScrubberRating(data, countedBits.length);

        return {
            rates: {
                oxygenGeneration,
                CO2Scrubber
            },
            lifeSupportRating: this.calculateLifeSupportRating(oxygenGeneration, CO2Scrubber)
        }
    }

    private calculateOxygenGeneratorRating(data: Array<number>, bitLength: number): number {
        try {
            return this.getValueByStepComparisonBit(data, bitLength, 'moreCommon');
        } catch (err) {
            throw new Error('Cannot calculate Oxygen Generator rating');
        }
    }

    private calculateCO2ScrubberRating(data: Array<number>, bitLength: number): number {
        try {
            return this.getValueByStepComparisonBit(data, bitLength, 'lessCommon');
        } catch (err) {
            throw new Error('Cannot calculate CO2 Scrubber rating');
        }
    }

    private getValueByStepComparisonBit(data: Array<number>, bitLength: number, comparisonStrategy: 'moreCommon' | 'lessCommon'): number {
        let filteredData: Array<number> = [...data];
        let bitShiftCounter = 0;


        while (bitShiftCounter != bitLength && filteredData.length > 1) {
            let bits: number;

            if (comparisonStrategy === 'moreCommon') {
                bits = BitUtils.getMoreCommonBits(filteredData, bitLength);
            } else {
                bits = BitUtils.getLessCommonBits(filteredData, bitLength);
            }

            const bitToCheck = bitLength - bitShiftCounter - 1;
            const maskBitValue = bits & 1 << bitToCheck;

            filteredData = filteredData.filter(data => {
                const dataTargetBitValue = data & 1 << bitToCheck;
                return dataTargetBitValue === maskBitValue;
            });

            bitShiftCounter++;
        }

        if (filteredData.length === 1) {
            return filteredData[0];
        } else {
            throw new Error();
        }

    }

    private calculateLifeSupportRating(oxygenGeneration: number, CO2Scrubber: number): number {
        return oxygenGeneration * CO2Scrubber;
    }
}
