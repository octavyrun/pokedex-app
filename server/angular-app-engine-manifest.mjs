
export default {
  basePath: 'C:/Program Files/Git/pokedex-app',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
