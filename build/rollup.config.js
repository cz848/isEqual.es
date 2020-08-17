const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

module.exports = config => {
  const { input, fileName, name } = config;
  return {
    input: {
      input,
      external: [
        'isEqual',
      ],
      plugins: [
        babel(),
        terser(),
      ],
    },
    output: {
      file: fileName,
      format: 'umd',
      name: name || 'isEqual',
      globals: {
        isEqual: 'isEqual',
      },
    },
  };
};
