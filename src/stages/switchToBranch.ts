import { exec } from '@actions/exec';

export const switchToBranch = async (targetBranch: string) => {
  try {
    await exec(`git checkout -b '${targetBranch}' 'origin/${targetBranch}'`);
    await exec(`git branch --show-current`);
  } catch (err) {
    console.warn(`Error to switch to branch ${targetBranch}`, err);
    throw err;
  }
};
