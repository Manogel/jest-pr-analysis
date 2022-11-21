import { exec } from '@actions/exec';

export const runTest = async (testCommand: string) => {
  await exec(testCommand);
};
