import { Path } from "./path.model";

export class CorrectedPath extends Path {
    private doubleVisitedSegment: string;

    addSegment(segment: string): this {
        if (this.hasVisitedSegment(segment) && !this.isBigSegment(segment)) {
            this.doubleVisitedSegment = segment;
        }
        this.pathSegments.push(segment)
        return this;
    }

    canGoToSegment(segment: string): boolean {
        if (this.isBigSegment(segment)) {
            return true;
        }

        if (!this.doubleVisitedSegment && segment !== 'end') {
            return true;
        }

        return !this.hasVisitedSegment(segment);
    }

    copy(): CorrectedPath {
        const [startSegment, ...rest] = this.pathSegments;
        const path =  new CorrectedPath(startSegment, rest);
        path.doubleVisitedSegment = this.doubleVisitedSegment;
        return path;
    }
}
