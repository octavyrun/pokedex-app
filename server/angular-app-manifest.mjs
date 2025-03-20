
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/pokedex-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/pokedex-app"
  },
  {
    "renderMode": 2,
    "route": "/Program%20Files/Git/pokedex-app/favorites"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23596, hash: 'acf5c4386637e6d87a61be991db3f34970ec650ee5713680bebe206f056f8508', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17170, hash: '0d07150f170d71f852c001a7c5e8dfc4f1044573ae788d17074687ca15658694', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
