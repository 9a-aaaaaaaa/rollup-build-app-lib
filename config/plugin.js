import json from "rollup-plugin-json";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from "rollup-plugin-replace";
import { terser } from 'rollup-plugin-terser';
import { eslint } from "rollup-plugin-eslint";
// import babel from '@rollup/plugin-babel';

const minifyOptions = {
    compress: {
      warnings: true,
      drop_console: true,
    },
    mangle: true,
  };

export default [
    // 将结果导入
    eslint({
        fix: true,
        throwOnError: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
}),
    json(),
    resolve(),
    commonjs(),
    replace({
        exclude: 'node_modules/**',
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    // babel({
    //   // 为了避免转译第三方脚本,忽略掉node_modules 
    //     exclude: 'node_modules/**', 
    // }),                     
    process.env.NODE_ENV === "production" && terser(minifyOptions),
 ]
