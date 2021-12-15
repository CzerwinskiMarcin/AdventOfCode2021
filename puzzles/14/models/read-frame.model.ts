export class ReadFrame {
    static * frames(template: string, readFrame: number = 2): IterableIterator<{frame: string, atIndex: number}> {
        if (template.length < readFrame) {
            throw new Error(`Template "${template} of length: ${template.length} is shorter that readFrame: ${readFrame}"`);
        }

        for (let i = 0; i <= template.length - readFrame; i++) {
            const frame = template.slice(i, i + readFrame);
            yield {frame, atIndex: i};
        }

        return '';
    }
}
