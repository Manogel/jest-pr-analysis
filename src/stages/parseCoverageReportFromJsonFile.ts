import { join, sep } from 'path';
import stripAnsi from 'strip-ansi';

import { IParsedCoverageDetails, IParsedCoverageReport } from '~/stages/types';
import { getJsonReport } from '~/utils/getJsonReport';

export const parseCoverageReportFromJsonFile = (
  covReportPath: string,
): IParsedCoverageReport => {
  const cwd = process.cwd() + sep;
  const relativePathToFile = join(cwd, covReportPath);
  const results = getJsonReport<FormattedTestResults>(relativePathToFile);
  const {
    success,
    numTotalTestSuites,
    numPassedTestSuites,
    numFailedTests,
    numTotalTests,
    numFailedTestSuites,
    testResults,
    coverageMap,
  } = results;
  let summaryText = results.success
    ? `${results.numPassedTests} tests passing in ${results.numPassedTestSuites} suite(s).`
    : `Failed tests: ${results.numFailedTests}/${results.numTotalTests}. Failed suites: ${results.numFailedTests}/${results.numTotalTestSuites}.`;

  if (results.numFailedTests === 0 && !results.success) {
    summaryText =
      'Coverage threshold not met. Check action report for details.';
  }
  summaryText = (results.success ? `✅ ` : '❌ ') + summaryText;

  const filesList = testResults.flatMap((switchItem) => {
    const failedAssertions = switchItem.assertionResults.filter(
      ({ status }) => status === 'failed',
    );
    const parsedAssertions = failedAssertions.map((assertionItem) => {
      return {
        path: switchItem.name.replace(cwd, ''),
        startLine: assertionItem.location.line,
        endLine: assertionItem.location.line,
        startColumn: assertionItem.location.column,
        endColumn: assertionItem.location.column,
        title: assertionItem.ancestorTitles
          .concat(assertionItem.title)
          .join(' > '),
        messageError: stripAnsi(
          assertionItem.failureMessages.join('\n\n') || '',
        ),
      };
    });

    return parsedAssertions;
  });

  const coverageDetails = Object.values(coverageMap).flatMap((fileCoverage) => {
    const normalizedPath = fileCoverage.path.replace(cwd, '');
    const statements = Object.entries(fileCoverage.statementMap);
    const statementsNotCovered: IParsedCoverageDetails[] = [];
    const branches = Object.entries(fileCoverage.branchMap);
    const branchesNotCovered: IParsedCoverageDetails[] = [];
    const functions = Object.entries(fileCoverage.fnMap);
    const functionsNotCovered: IParsedCoverageDetails[] = [];

    statements.forEach(([stmtIndex, stmtCoverage]) => {
      if (fileCoverage.s[Number(stmtIndex)] !== 0) return;
      const { start, end } = stmtCoverage;

      if (!Number.isInteger(start.line) || !Number.isInteger(end.line)) return;
      const isSameLine = start.line === end.line;

      statementsNotCovered.push({
        path: normalizedPath,
        title: 'Statement is not covered',
        startLine: stmtCoverage.start.line,
        endLine: stmtCoverage.end.line,
        startColumn: isSameLine ? start.column : undefined,
        endColumn: isSameLine ? end.column : undefined,
      });
    });

    branches.forEach(([branchIndex, branchCoverage]) => {
      const { locations } = branchCoverage;
      if (!locations?.length) return;
      locations.forEach((location, locIdx) => {
        const hasCovInfo = fileCoverage.b[Number(branchIndex)][locIdx] === 0;
        if (!hasCovInfo) return;

        const { start, end } = location;
        if (!Number.isInteger(start.line) || !Number.isInteger(end.line))
          return;

        const isSameLine = start.line === end.line;
        branchesNotCovered.push({
          path: normalizedPath,
          title: 'Branch is not covered',
          startLine: start.line,
          endLine: end.line,
          startColumn: isSameLine ? start.column : undefined,
          endColumn: isSameLine ? end.column : undefined,
        });
      });
    });

    functions.forEach(([fnIndex, fnCoverage]) => {
      if (fileCoverage.f[Number(fnIndex)] !== 0) return;

      const { start, end } = fnCoverage.decl;
      if (!Number.isInteger(start.line) || !Number.isInteger(end.line)) return;

      const isSameLine = start.line === end.line;
      functionsNotCovered.push({
        path: normalizedPath,
        title: 'Function is not covered',
        startLine: start.line,
        endLine: end.line,
        startColumn: isSameLine ? start.column : undefined,
        endColumn: isSameLine ? end.column : undefined,
      });
    });

    return [
      ...statementsNotCovered,
      ...branchesNotCovered,
      ...functionsNotCovered,
    ];
  });

  return {
    success,
    numTotalTestSuites,
    numPassedTestSuites,
    numFailedTests,
    numTotalTests,
    numFailedTestSuites,
    summaryText,
    failedTestDetails: filesList,
    coverageDetails,
  };
};
