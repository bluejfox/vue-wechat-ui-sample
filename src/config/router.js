import About from '../views/About.vue';
import TransformApply from '../views/TransformApply.vue';

export default {
  // middleware: 'auth',
  routes: [
    {
      path: '/about',
      name: 'About',
      meta: { auth: false },
      component: About,
    },
    {
      path: '/transform-apply',
      name: 'TransformApply',
      component: TransformApply,
    },
  ],
};
