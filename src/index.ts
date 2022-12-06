import { fetchBranch } from '~/stages/fetchBranch';
import { pullBranch } from '~/stages/pullBranch';
import { getActionParams } from '~/utils/getActionParams';
import { switchToBranch } from '~/stages/switchToBranch';
import micromatch from 'micromatch';
import actCore from '@actions/core';
import { getJestParams } from '~/utils/getJestParams';
import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import path from 'path';
import { generateJestTestCmd } from '~/utils/generateJestTestCmd';
import { safeRunStage } from '~/utils/safeRunStage';
import { runTest } from '~/stages/runTests';

export const run = async () => {
  const { pullRequest } = getActionParams();

  const currentBranch = pullRequest.head.ref;
  const baseBranch = pullRequest.base.ref;

  // setup git files
  await fetchBranch(baseBranch);
  await switchToBranch(baseBranch);
  await pullBranch(baseBranch);
  await switchToBranch(currentBranch);

  const diffFilesStr = await getPrDiffFiles({
    baseBranch,
    headBranch: currentBranch,
  });

  const jestParams = getJestParams();
  const changedFilesArray = micromatch(
    diffFilesStr.split(/\n/g),
    jestParams.collectCoverageFrom,
  );
  console.log(changedFilesArray);

  if (changedFilesArray.length <= 0) {
    actCore.info('No files to tests.');
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

  const relatedTestFiles = await getRelatedTestFiles(changedFilesArray);

  const filesToTestArray = relatedTestFiles
    .replace(/\n/g, ' ')
    .trim()
    .split(' ')
    .map((testFile: string) => path.relative(process.cwd(), testFile));
  console.log(filesToTestArray);
  const jestCmd = generateJestTestCmd({
    collectCoverageScript,
    filesToTestArray,
  });

  const fullTestCmd = `${jestCmd} | tee ./coverage/coverage.txt`;

  await safeRunStage(async () => {
    await runTest(fullTestCmd);
  });
};

void run();
