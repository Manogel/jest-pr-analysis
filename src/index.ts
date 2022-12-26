import { error, info } from '@actions/core';
import micromatch from 'micromatch';
import path from 'path';

import { checkThreshold } from '~/stages/checkThreshold';
import { createCoverageTextFile } from '~/stages/createCoverageTextFile';
import { createReportComment } from '~/stages/createReportComment';
import { genCoverageReportInMarkdown } from '~/stages/genCoverageReportInMarkdown';
import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import { parseCoverageFromTextFile } from '~/stages/parseCoverageFromTextFile';
import { runTest } from '~/stages/runTests';
import { generateJestTestCmd } from '~/utils/generateJestTestCmd';
import { getActionParams } from '~/utils/getActionParams';
import { getJestParams } from '~/utils/getJestParams';
import { safeRunStage } from '~/utils/safeRunStage';

export const run = async () => {
  const actionParams = getActionParams();

  const filesDiffList = await getPrDiffFiles(actionParams);
  const filenamesList = filesDiffList.map(({ filename }) => filename);

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

  createCoverageTextFile(actionParams.coverageTextPath);

  await safeRunStage(async () => {
    await runTest(fullTestCmd);
  });

  const coverageObjectResults = parseCoverageFromTextFile(
    actionParams.coverageTextPath,
  );

  const report = genCoverageReportInMarkdown(coverageObjectResults);

  await createReportComment(report, actionParams);

  checkThreshold(coverageObjectResults, jestParams.coverageThreshold);

  process.exit(0);
};

void run();
