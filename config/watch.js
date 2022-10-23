import { watch } from 'rollup';
import { inputOptions } from './input.js';
import { output} from './output.js';
import process from 'process';

const watchOptions = {
    ...inputOptions,
    output
};
const watcher = watch(watchOptions);

watcher.on('event', event => {
    const { code } = event;
    console.log('bundle [event]', code);
    if (code === 'ERROR') {
        console.log('打包异常', event);
    }
});

// This will make sure that bundles are properly closed after each run
watcher.on('event', ({ result }) => {
    if (result) result.close(); 
});

watcher.on('change', (id, { event }) => console.log('change',id,event));
watcher.on('restart',()=>console.log('restart'))
watcher.on('close', () => console.log('watch end [监听结束]'))
  

process.on('SIGINT', (code) => {
  console.log(`process end close ${code}`, process.pid);
  watcher.close();
});
  