import { FileUtils } from "../shared/utils";
import { Vector } from "../shared/models";
import { Line } from "../shared/models/line.model";
import { Map } from "./models/map.model";
import { create } from "domain";

export default function main(sourcePath: string): any {
    const lines = createLines(sourcePath);

    const horOrVerLines: Array<Line> = lines.filter(l => l.isHorOrVerLine());

    const filteredPointsHigher = createMap(horOrVerLines).getPointsCountsMoreThan(1);
    const pointsHigher = createMap(lines).getPointsCountsMoreThan(1);

    return {
        alphaResult: filteredPointsHigher.length,
        betaResult: pointsHigher.length
    }
}

function createLines(sourcePath: string): Array<Line> {
    const fileData: Array<string> = FileUtils.readFileToArray(sourcePath);
    return convertDataToLines(fileData);
}

function createMap(lines: Array<Line>): Map {
    const pathsPoints: Array<Vector> = lines.map(l => l.getPathPoints())
        .flat()

    const map: Map = new Map()
    pathsPoints.forEach(point => map.markPoint(point.getCoordinates()));

    return map;
}

function convertDataToLines(rawData: Array<string>): Array<Line> {
    return rawData
        .map(data => data.split('->'))
        .map(data => data.map(d => {
            const [x, y] = d.split(',')
                .map(d => d.trim())
                .map(d => Number.parseInt(d));

            return new Vector(x, y);
        }))
        .map(([start, end]) => new Line(start, end))

}
