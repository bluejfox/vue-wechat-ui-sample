<template>
  <div
    class="cell-radio-group"
    role="radiogroup">
    <slot></slot>
  </div>
</template>
<script>
import base from '../../libs/base';

export default {
  mixins: [base],
  name: 'SeCellRadioGroup',
  componentName: 'SeCellRadioGroup',
  props: {
    value: {},
    disabled: Boolean,
  },
  computed: {
  },
  created() {
    this.$on('handleChange', (value) => {
      this.$emit('change', value);
    });
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    // value() {
    //   this.dispatch('ElFormItem', 'el.form.change', [this.value]);
    // }
  },
};
</script>

