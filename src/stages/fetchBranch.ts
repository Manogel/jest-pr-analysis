import { exec } from '@actions/exec';

export const fetchBranch = async (targetBranch: string) => {
  try {
    await exec(`git fetch --no-tags --depth=1 origin ${targetBranch}`);
  } catch (err) {
    console.warn(`Error to fetch ${targetBranch} branch`, err);
    throw err;
  }
};
