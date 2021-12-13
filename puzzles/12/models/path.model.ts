export class Path {
    protected pathSegments: Array<string>;

    constructor(startSegment: string, fillSegments?: Array<string>) {
        this.pathSegments = [startSegment];

        if (fillSegments) {
            this.pathSegments.push(...fillSegments);
        }
    }

    protected hasVisitedSegment(segment: string): boolean {
        return this.pathSegments.some(s => s === segment);
    }

    protected isBigSegment(segment: string): boolean {
        const segmentCode: number = segment.charCodeAt(0);
        return 65 <= segmentCode && segmentCode <= 90
    }

    addSegment(segment: string): this {
        this.pathSegments.push(segment)
        return this;
    }

    canGoToSegment(segment: string): boolean {
        if (this.isBigSegment(segment)) {
            return true;
        }

        return !this.hasVisitedSegment(segment);
    }


    getCurrentSegment(): string {
        return this.pathSegments[this.pathSegments.length - 1];
    }

    getLastSegment(): string {
        if (this.pathSegments.length === 1) {
            return this.pathSegments[0];
        }

        return this.pathSegments[this.pathSegments.length - 2];
    }

    getNumberOfSmallSegments(): number {
        return this.pathSegments
            .filter(s => s !== 'start' && s !== 'end')
            .filter(s => !this.isBigSegment(s))
            .length;
    }

    copy(): Path {
        const [startSegment, ...rest] = this.pathSegments;
        const path =  new Path(startSegment, rest);
        return path;
    }

    toString(): string {
        return this.pathSegments.join(',');
    }
}
