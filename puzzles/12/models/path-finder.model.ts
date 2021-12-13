import { Path } from "./path.model";

type Connection = [string, string];

export class PathFinder<T extends Path> {
    private static START_SEGMENT = 'start';
    private static END_SEGMENT = 'end'
    private connections: Array<Connection>

    constructor(data: Array<string>, private pathType: new (startSegment: string) => T) {
        this.connections = this.convertData(data);
    }

    private convertData(data: Array<string>): Array<Connection> {
        return data
            .map(d => d.split('-') as [string, string]);
    }

    private generatePaths(paths: Array<T>): Array<T> {
        // @ts-ignore
        return paths.map((p: T) => {
            if (this.hasPathEnded(p)) {
                return p;
            }

            const currentSegment = p.getCurrentSegment();
            const nextSegments = this.getNextPossibleSegments(currentSegment);

            if (!nextSegments.length) {
                return p;
            }

            const newPaths: Array<T> = nextSegments
                .filter(s => p.canGoToSegment(s))
                .map(s => p.copy().addSegment(s) as T);

            return this.generatePaths(newPaths);

        }).flat();
    }

    private getNextPossibleSegments(currentSegment: string): Array<string> {
        return this.connections
            .filter(([cA, cB]) => cA === currentSegment || cB === currentSegment)
            .map(([cA, cB]) => cA === currentSegment ? cB : cA)
            .filter(s => s !== PathFinder.START_SEGMENT);
    }

    private hasPathEnded(path: T): boolean {
        return path.getCurrentSegment() === PathFinder.END_SEGMENT;
    }

    getPaths(): Array<T> {
        return this.generatePaths([new this.pathType(PathFinder.START_SEGMENT)]);
    }

    getPathThatVisitSmallCavesAtMost(times: number): number {
        return this.getPaths()
            .filter(p => p.getNumberOfSmallSegments() <= times)
            .length;
    }
}
