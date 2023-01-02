import { build } from 'esbuild';

build({
  bundle: true,
  minify: true,
  sourcemap: 'external',
  platform: 'node',
  entryPoints: ['dist/run.js'],
  outfile: 'lib/index.js',
  target: 'node10',
  loader: {
    '.md': 'text',
  },
}).catch(() => process.exit(1));
