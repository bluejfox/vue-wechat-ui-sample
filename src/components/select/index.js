import Select from '../select/src/select.vue';

/* istanbul ignore next */
Select.install = (Vue) => {
  Vue.component('se-select', Select);
};

export default Select;
