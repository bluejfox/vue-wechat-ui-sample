<template>
  <label class="weui-cell weui-check__label" :for="`radio_${uuid}`" role="radio">
    <div class="weui-cell__bd">
      <p>
        <slot></slot>
        <template v-if="!$slots.default">{{ label }}</template>
      </p>
    </div>
    <div class="weui-cell__ft">
      <input
        type="radio"
        class="weui-check"
        :value="label"
        :name="name"
        :id="disabled ? '' : `radio_${uuid}`"
        :disabled="isDisabled"
        v-model="model"
        @change="handleChange">
      <span class="weui-icon-checked"></span>
    </div>
  </label>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeCellRadio',
  componentName: 'SeCellRadio',
  mixins: [
    base,
  ],
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
  },
  computed: {
    radioGroupInstance() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'SeCellRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.radioGroupInstance ? this.radioGroupInstance.value : this.value;
      },
      set(val) {
        if (this.radioGroupInstance) {
          this.dispatch('SeCellRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      },
    },
    isDisabled() {
      return this.radioGroupInstance
        ? this.radioGroupInstance.disabled || this.disabled || (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model);
        if (this.radioGroupInstance) {
          this.dispatch('SeCellRadioGroup', 'handleChange', this.model);
        }
      });
    },
  },
};
</script>

