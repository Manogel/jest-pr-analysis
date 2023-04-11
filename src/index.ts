import { error, info } from '@actions/core';

import { createAnnotationsFromCoverageReport } from '~/createAnnotationsFromCoverageReport';
import { getPrChangedFiles } from '~/getPrChangedFiles';
import { createReportComment } from '~/stages/createReportComment';
import { filterAnnotationsByModifiedLines } from '~/stages/filterAnnotationsByModifiedLines';
import { genCoverageTableInMarkdown } from '~/stages/genCoverageTableInMarkdown';
import { parseCoverageReportFromJsonFile } from '~/stages/parseCoverageReportFromJsonFile';
import { parseCoverageSummaryFromJsonFile } from '~/stages/parseCoverageSummaryFromJsonFile';
import { runTests } from '~/stages/runTests';
import { generateJestTestCmd } from '~/utils/generateJestTestCmd';
import { getActionParams } from '~/utils/getActionParams';
import { parseMarkdownTemplate } from '~/utils/parseMarkdownTemplate';
import { safeRunStage } from '~/utils/safeRunStage';

export const run = async () => {
  const actionParams = getActionParams();

  // Stage: Get changed files by pull request
  const { prChangedFiles, filesToTest, modifiedLines } =
    await getPrChangedFiles(actionParams);

  if (!prChangedFiles.length) {
    info('No changed files in pull request');
    return process.exit(0);
  }

  if (!filesToTest.length) {
    error(`No tests found for: [${prChangedFiles.join(', ')}]`);
    return process.exit(1);
  }

  const jestCmd = generateJestTestCmd({
    filesToCollectCoverage: prChangedFiles,
    filesToTestArray: filesToTest,
  });

  // Stage: Run tests and generate coverage report
  await safeRunStage(async () => {
    await runTests(jestCmd);
  });

  const coverageObjectResults = parseCoverageSummaryFromJsonFile(
    actionParams.coverageJsonSummaryPath,
  );

  // Stage: Check threshold
  const fullReport = parseCoverageReportFromJsonFile(
    actionParams.coverageJsonReportPath,
  );

  const mdTable = genCoverageTableInMarkdown(coverageObjectResults);

  const reportComment = parseMarkdownTemplate('default', {
    covTable: mdTable,
    covSummary: fullReport.summaryText,
    title: 'Coverage report',
  });

  const filteredAnnotations = filterAnnotationsByModifiedLines(
    fullReport.coverageDetails,
    modifiedLines,
  );
  await createReportComment(reportComment, actionParams);
  await createAnnotationsFromCoverageReport(
    { ...fullReport, coverageDetails: filteredAnnotations },
    actionParams,
  );

  if (!fullReport.success) {
    error(`Coverage threshold error.`);
    return process.exit(1);
  }

  return process.exit(0);
};
