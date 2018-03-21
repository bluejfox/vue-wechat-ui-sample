import Option from '../select/src/option.vue';

/* istanbul ignore next */
Option.install = (Vue) => {
  Vue.component('se-option', Option);
};

export default Option;
