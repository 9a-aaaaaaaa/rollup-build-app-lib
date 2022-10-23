import { rollup } from 'rollup';
import { inputOptions } from './input.js';
import {output,outdir} from './output.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const syncExec = promisify(exec);
const log = console.log;

build();

async function build() {
  let bundle;
  let buildFailed = false;
  try {
    bundle = await rollup(inputOptions);
    // an array of file names this bundle depends on
    // console.log(bundle.watchFiles);
    await generateOutputs(bundle);
    const lsData = await syncExec(`ls -a ${outdir}`);
    log(chalk.green('打包成功：build [success] dist:/'), lsData.stdout);
    log(chalk.green('文件位置 👉️ :'),path.resolve(__dirname,outdir));
  } catch (error) {
    buildFailed = true;
    log(chalk.red("sorry, build has error: "), error);
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of output) {
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk
    const { output } = await bundle.write(outputOptions);
    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        log(chalk.magenta('[asset]  writing...'),chunkOrAsset.fileName)
      } else {
        log(chalk.magenta('[chunk]  writing...'),chunkOrAsset.fileName)
      }
    }
  }
}