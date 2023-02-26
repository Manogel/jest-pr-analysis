import { exec } from '@actions/exec';

export const runTests = async (testCommand: string) => {
  await exec(testCommand);
};
