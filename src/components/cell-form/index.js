import CellForm from '../cell-form/src/cell-form.vue';

/* istanbul ignore next */
CellForm.install = (Vue) => {
  Vue.component('se-cell-form', CellForm);
};

export default CellForm;
