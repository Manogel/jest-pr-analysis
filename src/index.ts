import { fetchBranch } from '~/stages/fetchBranch';
import { pullBranch } from '~/stages/pullBranch';
import { getActionParams } from '~/utils/getActionParams';
import { switchToBranch } from '~/stages/switchToBranch';
import micromatch from 'micromatch';
import { error, info } from '@actions/core';
import { getJestParams } from '~/utils/getJestParams';
import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import path from 'path';
import { generateJestTestCmd } from '~/utils/generateJestTestCmd';
import { safeRunStage } from '~/utils/safeRunStage';
import { runTest } from '~/stages/runTests';
import { createReportComment } from '~/stages/createReportComment';
import { genCoverageReportInMarkdown } from '~/generators/genCoverageReportInMarkdown';
import { context, getOctokit } from '@actions/github';

export const run = async () => {
  const actionParams = getActionParams();

  const filesDiffList = await getPrDiffFiles(actionParams);
  const filenamesList = filesDiffList.map(({ filename }) => filename);
  console.log(filenamesList);
  const jestParams = getJestParams();
  const changedFilesArray = micromatch(
    filenamesList,
    jestParams.collectCoverageFrom,
  );

  if (changedFilesArray.length <= 0) {
    info('No files to tests.');
    process.exit(0);
  }

  const collectCoverageScript = changedFilesArray
    .map((from) => {
      // remove rootDir reference

      const formattedPath =
        jestParams.rootDir != null
          ? from.split(`${jestParams.rootDir}/`)[1]
          : from;
      return `--collectCoverageFrom "${formattedPath}"`;
    })
    .join(' ');

  const relatedTestResults = await getRelatedTestFiles(changedFilesArray);
  const filesToTestArray = relatedTestResults
    .replace(/\n/g, ' ')
    .trim()
    .split(' ')
    .map((testFile: string) => path.relative(process.cwd(), testFile))
    .filter((file) => file.match(new RegExp(jestParams.testRegex, 'g')));

  if (filesToTestArray.length <= 0) {
    error(`No tests found for: [${changedFilesArray.join(' ')}].`);
    process.exit(1);
  }

  const jestCmd = generateJestTestCmd({
    collectCoverageScript,
    filesToTestArray,
  });

  const fullTestCmd = `/bin/bash -c "${jestCmd} | tee ${actionParams.coverageTextPath}"`;

  await safeRunStage(async () => {
    await runTest(fullTestCmd);
  });

  const report = genCoverageReportInMarkdown(actionParams.coverageTextPath);
  console.log(report);
  // await createReportComment(report, actionParams);

  process.exit(0);
};

void run();
