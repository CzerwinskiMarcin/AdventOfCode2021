import { FileUtils } from "../shared/utils";
import { DiagnosticReportInterpreter } from "./models/diagnostic-report-interpreter.model";

export default function main(sourcePath: string): void {
    const diagnosticInterpreter = new DiagnosticReportInterpreter();
    const sourceData: Array<string> = FileUtils.readFileToArray(sourcePath);

    const diagnosticResult = diagnosticInterpreter.interpretReport(sourceData);

    console.log(diagnosticResult);
}
