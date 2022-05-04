import { task, series, parallel } from 'gulp';
import { join, resolve } from 'path';
import {
  deleteDir,
  lintESLint,
  lintSass,
  createRollupBundle,
  IRollupBundleConfig,
  copyFilesMultiple,
  IFileCopyConfig,
  compileSass
} from '@tylertech/forge-build-tools';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
const rollupTypeScript = require('rollup-plugin-typescript2');

const ROOT = resolve(__dirname, './');
const PROJECT_ROOT = join(ROOT, './src/projects/forge-docs-core');
const PROJECT_SRC_ROOT = join(PROJECT_ROOT, 'src');
const PROJECT_DIST_ROOT = join(ROOT, 'dist/forge-docs-core');
const PROJECT_PACKAGE_JSON = require(join(PROJECT_ROOT, 'package.json'));

/** Cleans the build output directory. */
task('clean', () => deleteDir(PROJECT_DIST_ROOT));

/** Lints the TypeScript files in the project. */
task('lint:typescript', () => lintESLint(join(PROJECT_SRC_ROOT, '**/*.{ts,tsx}')));

/** Lints the Sass files in the project. */
task('lint:sass', async () => {
  const result = await lintSass(join(PROJECT_SRC_ROOT, '**/*.scss'), join(ROOT, '.stylelintrc'));
  if (!result) {
    throw new Error();
  }
});

/** Creates the rollup bundles. */
task('bundle', () => {
  const rollupConfig: IBundleConfig = {
    name: PROJECT_PACKAGE_JSON.name,
    input: join(PROJECT_SRC_ROOT, 'index.ts'),
    file: join(PROJECT_DIST_ROOT, `dist/forge-docs-core.js`),
    format: 'es',
    version: PROJECT_PACKAGE_JSON.version,
    minify: false
  };
  const globals = {
    'react': 'react',
    'react-dom': 'react-dom'
  };
  return createRollupBundleTask(rollupConfig, globals);
});

/** Compiles Sass stylesheets. */
task('compile:sass', () => compileSass(join(PROJECT_SRC_ROOT, '*.scss'), PROJECT_SRC_ROOT, join(PROJECT_DIST_ROOT, 'dist')));

/** Copies the package.json to the build output directory. */
task('copy-package-files', () => {
  const files: IFileCopyConfig[] = [
    { path: join(ROOT, 'LICENSE'), rootPath: ROOT, outputPath: PROJECT_DIST_ROOT },
    { path: join(ROOT, 'README.md'), rootPath: ROOT, outputPath: PROJECT_DIST_ROOT },
    { path: join(PROJECT_ROOT, 'package.json'), rootPath: PROJECT_ROOT, outputPath: PROJECT_DIST_ROOT }
  ];
  return copyFilesMultiple(files);
});

task('lint', series('lint:typescript', 'lint:sass'));

/** The main build task that generates the npm package. */
task('build', series('clean', 'lint', parallel('bundle', 'compile:sass', 'copy-package-files')));

export interface IBundleConfig {
  input: string;
  name: string;
  format: 'es' | 'cjs' | 'umd';
  file: string;
  version: string;
  minify: boolean;
}

function createRollupBundleTask(rollupConfig: IBundleConfig, rollupGlobals: { [key: string]: string }): Promise<void> {
  const bundleConfig: IRollupBundleConfig = {
    input: rollupConfig.input,
    name: rollupConfig.name,
    format: rollupConfig.format,
    file: rollupConfig.file,
    version: rollupConfig.version,
    minify: rollupConfig.minify,
    globals: rollupGlobals,
    banner: ``,
    plugins: [
      rollupNodeResolve(),
      rollupTypeScript({
        tsconfig: resolve(PROJECT_ROOT, 'tsconfig.build.json'),
        useTsconfigDeclarationDir: true
      })
    ]
  };
  return createRollupBundle(bundleConfig);
}
