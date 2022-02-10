import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  devServer: { openBrowser: false },
  namespace: 'yoobic-design-system',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/styles/global.scss'],
    }),
    inlineSvg(),
  ],
};
