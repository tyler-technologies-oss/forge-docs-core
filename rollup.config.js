import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pluginJson from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';
import visualizer from 'rollup-plugin-visualizer';
// import { terser } from 'rollup-plugin-terser';
import { getFiles } from './buildutils';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// just above plugins declaration add
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
// then for each output declaration add external key and value
export default [
  {
    input: [
      './src/index.ts',
      ...getFiles('./src/common', extensions),
      ...getFiles('./src/components', extensions),
      ...getFiles('./src/core', extensions),
      ...getFiles('./src/utils', extensions),
      ...getFiles('./src/styles', ['.scss']),
    ],
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      pluginJson(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist',
      }),
      postcss({
        use: [
          [
            'sass',
            {
              includePaths: ['./node_modules'],
            },
          ],
        ],
        extract: true,
      }),
      // terser(),
      visualizer({
        filename: 'bundle-analysis.html',
        open: true,
      }),
    ],
    external,
    // external: ['react', 'react-dom'],
  },
];