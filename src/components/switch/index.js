import Switch from '../switch/src/switch.vue';

/* istanbul ignore next */
Switch.install = (Vue) => {
  Vue.component('se-switch', Switch);
};

export default Switch;
