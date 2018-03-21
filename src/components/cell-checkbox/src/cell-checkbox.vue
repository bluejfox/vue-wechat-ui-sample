<template>
  <label class="weui-cell weui-check__label" :for="`checkbox_${uuid}`" role="checkbox">
    <div class="weui-cell__hd">
      <input
        class="weui-check"
        v-if="trueLabel || falseLabel"
        type="checkbox"
        :id="`checkbox_${uuid}`"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
      <input
        v-else
        class="weui-check"
        type="checkbox"
        :id="`checkbox_${uuid}`"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
      <i class="weui-icon-checked"></i>
    </div>
    <div class="weui-cell__bd" v-if="$slots.default || label">
      <p>
        <slot></slot>
        <template v-if="!$slots.default">{{ label }}</template>
      </p>
    </div>
  </label>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeCellCheckbox',
  componentName: 'SeCellCheckbox',
  mixins: [
    base,
  ],
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    };
  },
  computed: {
    model: {
      get() {
        if (this.checkboxGroupInstance) {
          return this.store;
        } else if (this.value !== undefined) {
          return this.value;
        }
        return this.selfModel;
      },
      set(val) {
        if (this.checkboxGroupInstance) {
          this.isLimitExceeded = false;
          if (this.checkboxGroupInstance.min !== undefined &&
                val.length < this.checkboxGroupInstance.min) {
            this.isLimitExceeded = true;
          }
          if (this.checkboxGroupInstance.max !== undefined &&
                val.length > this.checkboxGroupInstance.max) {
            this.isLimitExceeded = true;
          }
          if (this.isLimitExceeded === false) {
            this.dispatch('SeCellCheckboxGroup', 'input', [val]);
          }
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      },
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
      return false;
    },
    checkboxGroupInstance() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'SeCellCheckboxGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    store() {
      return this.checkboxGroupInstance ? this.checkboxGroupInstance.value : this.value;
    },
    isDisabled() {
      return this.checkboxGroupInstance
        ? this.checkboxGroupInstance.disabled || this.disabled || (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },
  },
  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      const event = ev;
      if (this.isLimitExceeded) {
        event.target.checked = false;
        return;
      }
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.checkboxGroupInstance) {
          this.dispatch('SeCellCheckboxGroup', 'change', [this.checkboxGroupInstance.value]);
        }
      });
    },
  },
  created() {
    if (this.checked) {
      this.addToStore();
    }
  },
};
</script>
