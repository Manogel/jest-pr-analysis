import defaultTemplateMd from '../templates/template.md';

type ITemplate = 'default';

export const parseMarkdownTemplate = (
  _template: ITemplate,
  args: Record<string, string | number | undefined>,
) => {
  let text = defaultTemplateMd;

  // TODO:
  // if (template === 'default') text = defaultTemplateMd;

  Object.keys(args).forEach((argName) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isValidArg = args[argName] !== undefined && args[argName] !== null;

    if (isValidArg) {
      text = text.replace(`{{ ${argName} }}`, args[argName] as string);
    }
  });
  return text;
};
