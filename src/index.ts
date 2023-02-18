import { error, info } from '@actions/core';
import micromatch from 'micromatch';

import { createReportComment } from '~/stages/createReportComment';
import { genCoverageReportInMarkdown } from '~/stages/genCoverageReportInMarkdown';
import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import { parseCoverageReportFromJsonFile } from '~/stages/parseCoverageReportFromJsonFile';
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

  const collectCoverageScript = parseChangedFiles(
    changedFilesArray,
    jestParams.rootDir,
  );

  const filesToTestArray = await getRelatedTestFiles(
    changedFilesArray,
    jestParams.testRegex,
  );

  if (filesToTestArray.length <= 0) {
    error(`No tests found for: [${changedFilesArray.join(' ')}].`);
    return process.exit(1);
  }

  // Stage: Run tests and generate coverage report
  const jestCmd = generateJestTestCmd({
    collectCoverageScript,
    filesToTestArray,
  });

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

  if (!fullReport.success) {
    error(`Coverage threshold error.`);
    return process.exit(1);
  }

  return process.exit(0);
};
