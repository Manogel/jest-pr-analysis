import { error, info } from '@actions/core';
import micromatch from 'micromatch';

import { createGithubAnnotations } from '~/stages/createGithubAnnotations';
import { createReportComment } from '~/stages/createReportComment';
import { genCoverageReportInMarkdown } from '~/stages/genCoverageReportInMarkdown';
import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import {
  IParsedCoverageReport,
  parseCoverageReportFromJsonFile,
} from '~/stages/parseCoverageReportFromJsonFile';
import { parseCoverageSummaryFromJsonFile } from '~/stages/parseCoverageSummaryFromJsonFile';
import { runTest } from '~/stages/runTests';
import { generateJestTestCmd } from '~/utils/generateJestTestCmd';
import { getActionParams } from '~/utils/getActionParams';
import { getJestParams } from '~/utils/getJestParams';
import { safeRunStage } from '~/utils/safeRunStage';

const parseChangedFiles = (
  changedFilesArray: string[],
  jestRootDir: string | null,
) => {
  return changedFilesArray
    .map((from) => {
      // remove rootDir reference

      const formattedPath =
        jestRootDir != null ? from.split(`${jestRootDir}/`)[1] : from;
      return `--collectCoverageFrom "${formattedPath}"`;
    })
    .join(' ');
};

const createAnnotationsFromCoverageReport = async (
  fullReport: IParsedCoverageReport,
  actionParams: IActionParams,
) => {
  try {
    await createGithubAnnotations(
      {
        conclusion: fullReport.success ? 'success' : 'failure',
        status: 'completed',
        output: {
          title: fullReport.success ? 'Jest tests passed' : 'Jest tests failed',
          text: 'Results here',
          summary: fullReport.summaryText,
          annotations: fullReport.failedTestDetails.map((test) => ({
            path: test.path,
            start_line: test.startLine,
            end_line: test.endLine,
            annotation_level: 'failure',
            message: test.messageError,
            title: test.title,
          })),
        },
      },
      actionParams,
    );
  } catch (e) {
    error('Failed to create annotations');
  }
};

export const run = async () => {
  const actionParams = getActionParams();

  // Stage: Get changed files by pull request
  const filesDiffList = await getPrDiffFiles(actionParams);
  const filenamesList = filesDiffList.map(({ filename }) => filename);

  const jestParams = getJestParams();
  const changedFilesArray = micromatch(
    filenamesList,
    jestParams.collectCoverageFrom,
  );

  if (changedFilesArray.length <= 0) {
    info('No files to tests.');
    return process.exit(0);
  }

  const filesToTestArray = await getRelatedTestFiles(
    changedFilesArray,
    jestParams.testRegex,
  );

  if (filesToTestArray.length <= 0) {
    error(`No tests found for: [${changedFilesArray.join(' ')}].`);
    return process.exit(1);
  }

  const collectCoverageScript = parseChangedFiles(
    changedFilesArray,
    jestParams.rootDir,
  );

  const jestCmd = generateJestTestCmd({
    collectCoverageScript,
    filesToTestArray,
  });

  // Stage: Run tests and generate coverage report
  await safeRunStage(async () => {
    await runTest(jestCmd);
  });

  const coverageObjectResults = parseCoverageSummaryFromJsonFile(
    actionParams.coverageJsonSummaryPath,
  );

  const reportSummary = genCoverageReportInMarkdown(coverageObjectResults);

  await createReportComment(reportSummary, actionParams);

  // Stage: Check threshold
  const fullReport = parseCoverageReportFromJsonFile(
    actionParams.coverageJsonReportPath,
  );

  await createAnnotationsFromCoverageReport(fullReport, actionParams);

  if (!fullReport.success) {
    error(`Coverage threshold error.`);
    return process.exit(1);
  }

  return process.exit(0);
};
