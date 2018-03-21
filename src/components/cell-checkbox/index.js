import CellCheckbox from './src/cell-checkbox.vue';

/* istanbul ignore next */
CellCheckbox.install = (Vue) => {
  Vue.component('se-cell-checkbox', CellCheckbox);
};

export default CellCheckbox;
