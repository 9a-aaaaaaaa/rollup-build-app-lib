export const outdir = 'dist/js';
export const output = [
    {
        file: `${outdir}/main.umd.js`,
        format: "umd",
        name: 'sdk',
        sourcemap: true,
    },
    {
        file: `${outdir}/main.es.js`,
        format: "es",
        sourcemap: true,
    },
    {
        file: `${outdir}/main.cjs.js`,
        format: "cjs",
        sourcemap: true,
    }
];