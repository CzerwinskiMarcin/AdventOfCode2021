import { BitUtils } from "../../shared/utils/bit.utils";

export class PowerConsumptionCalculationUnit {
   calculateData(data: Array<number>, countedBits: Array<number>) {
        const mask = BitUtils.getMaskFromArrayLength(countedBits);
        const gammaRate = this.convertBitCountsToGammaRate(countedBits, data.length);
        const epsilonRate = this.convertGammaToEpsilon(gammaRate, mask);
        const powerConsumption = this.calculatePowerConsumption(gammaRate, epsilonRate);

        return {
            rates: {
                gamma: gammaRate,
                epsilon: epsilonRate
            },
            powerConsumption
        }
    }

    private convertBitCountsToGammaRate(bitCounts: Array<number>, dataLength: number): number {
       const comparisonFn = (value: number) => value > dataLength / 2 ? 1 : 0;
       return BitUtils.convertNumbersToBit(bitCounts, comparisonFn);
    }

    private convertGammaToEpsilon(gammaRate: number, mask: number): number {
       return BitUtils.negateBits(gammaRate, mask);
    }

    private calculatePowerConsumption(gammaRate: number, epsilonRate: number): number {
        return gammaRate * epsilonRate;
    }
}
