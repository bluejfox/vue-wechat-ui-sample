import Button from './src/button.vue';

/* istanbul ignore next */
Button.install = (Vue) => {
  Vue.component('se-button', Button);
};

export default Button;
