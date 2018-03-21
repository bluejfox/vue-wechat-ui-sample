import CellCheckboxGroup from '../cell-checkbox/src/cell-checkbox-group.vue';

/* istanbul ignore next */
CellCheckboxGroup.install = (Vue) => {
  Vue.component('se-cell-radio-group', CellCheckboxGroup);
};

export default CellCheckboxGroup;
