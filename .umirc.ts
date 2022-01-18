import { defineConfig } from 'umi';

export default defineConfig({
  history: {type: 'hash'},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      redirect: '/form'
    },
    {
      path: '/form',
      component: 'form/form'
    },
    {
      path: '/modal',
      component: 'modal/modal'
    }
  ],
  fastRefresh: {}
});
