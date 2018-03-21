<template>
  <div class="cell-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeCellCheckboxGroup',
  componentName: 'SeCellCheckboxGroup',
  mixins: [base],
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
  },
  watch: {
    // value(value) {
    //   this.dispatch('CellFormItem', 'el.form.change', [value]);
    // }
  },
};
</script>
