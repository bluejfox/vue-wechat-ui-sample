<template>
  <div>
    <div
      class="weui-cells__title"
      :class="{
        'weui-cell_warn': hasError,
      }">
      {{ title }}
    </div>
    <div class="weui-cells weui-cells_form">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeCellFormItemGroup',
  componentName: 'SeCellFormItemGroup',
  mixins: [
    base,
  ],
  provide() {
    return {
      cellFormItemGroup: this,
    };
  },
  props: {
    title: String,
  },
  data() {
    return {
      hasError: false,
    };
  },
  created() {
    this.$on('cell.form.item.validate', (state) => {
      this.$set(this, 'hasError', !state);
    });
  },
};
</script>
