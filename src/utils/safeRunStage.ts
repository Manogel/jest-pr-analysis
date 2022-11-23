export const safeRunStage = async <T>(action: () => T) => {
  try {
    const output = await action();
    return { success: true, output };
  } catch (error) {
    console.error(error);
    return { success: false, output: undefined };
  }
};
