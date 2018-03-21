import CellRadio from './src/cell-radio.vue';

/* istanbul ignore next */
CellRadio.install = (Vue) => {
  Vue.component('se-cell-radio', CellRadio);
};

export default CellRadio;
