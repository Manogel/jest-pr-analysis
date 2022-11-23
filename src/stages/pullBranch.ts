import { exec } from '@actions/exec';

export const pullBranch = async (targetBranch: string) => {
  try {
    await exec(`git pull origin ${targetBranch}`);
  } catch (err) {
    console.warn(`Error to pull ${targetBranch} branch`, err);
    throw err;
  }
};
