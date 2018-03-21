<template>
  <div
    v-if="!childrenIsRadioGroup && !childrenIsCheckboxGroup"
    class="weui-cell"
    :class="{
      'weui-cell_warn': hasError,
      'weui-cell_select': childrenIsSelect || slotLabelIsSelect,
      'weui-cell_select-after': childrenIsSelect,
      'weui-cell_select-before': slotLabelIsSelect,
      'weui-cell_switch': childrenIsSwitch
    }">
    <template v-if="!childrenIsSwitch">
      <div class="weui-cell__hd" v-if="(label || $slots.label)">
        <label class="weui-label" v-if="!$slots.label">{{ label }}</label>
        <slot name="label"></slot>
      </div>
      <div class="weui-cell__bd">
        <slot></slot>
      </div>
      <div class="weui-cell__ft" v-if="hasError">
        <i class="weui-icon-warn"></i>
      </div>
    </template>
    <template v-else>
      <div class="weui-cell__bd" v-if="label || $slots.label">
        <label class="weui-label" v-if="!$slots.label">{{ label }}</label>
        <slot name="label"></slot>
      </div>
      <div class="weui-cell__ft">
        <slot></slot>
      </div>
    </template>
  </div>
  <div
    v-else
    :class="{
      'weui-cells_radio': childrenIsRadioGroup,
      'weui-cells_checkbox': childrenIsCheckboxGroup,
    }">
    <slot></slot>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import base from '../../libs/base';
import objectAssign from '../../utils/merge';
import { getPropByPath, noop } from '../../utils/util';

export default {
  name: 'SeCellFormItem',
  componentName: 'SeCellFormItem',
  mixins: [
    base,
  ],
  provide() {
    return {
      cellFormItem: this,
    };
  },
  inject: ['cellForm'],
  props: {
    label: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: '',
    },
    showErrorState: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? 'error' : '';
      },
    },
    validateStatus(value) {
      this.validateState = value;
    },
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      // isNested: false,
    };
  },
  computed: {
    childrenIsSelect() {
      let ret = false;
      if (this.$slots && this.$slots.default && this.$slots.default.length === 1) {
        // 当form-item下仅有一个Select组件的场合
        if (this.$slots.default[0].componentOptions.Ctor.options.componentName === 'SeSelect') {
          ret = true;
        }
      }
      return ret;
    },
    childrenIsRadioGroup() {
      let ret = false;
      if (this.$slots && this.$slots.default) {
        // 当form-item下有RadioGroup组件的场合
        ret = this.$slots.default.some(item => item.componentOptions &&
          item.componentOptions.Ctor.options.componentName.indexOf('SeCellRadioGroup') === 0);
      }
      return ret;
    },
    childrenIsCheckboxGroup() {
      let ret = false;
      if (this.$slots && this.$slots.default) {
        // 当form-item下有CheckboxGroup组件的场合
        ret = this.$slots.default.some(item => item.componentOptions &&
          item.componentOptions.Ctor.options.componentName.indexOf('SeCellCheckboxGroup') === 0);
      }
      return ret;
    },
    childrenIsSwitch() {
      let ret = false;
      if (this.$slots && this.$slots.default) {
        // 当form-item下有RadioGroup组件的场合
        ret = this.$slots.default.some(item => item.componentOptions &&
          item.componentOptions.Ctor.options.componentName.indexOf('SeSwitch') === 0);
      }
      return ret;
    },
    slotLabelIsSelect() {
      let ret = false;
      if (this.$slots && this.$slots.label) {
        ret = this.$slots.label.some(item => item.componentOptions &&
          item.componentOptions.Ctor.options.componentName.indexOf('SeSelect') === 0);
      }
      return ret;
    },
    hasError() {
      return this.validateState === 'error' && this.showErrorState && this.form.showErrorState;
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'SeCellForm') {
        // if (parentName === 'SeCellFormItem') {
        //   this.$set(this, isNested, true);
        // }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue: {
      cache: false,
      get() {
        const { model } = this.form;
        if (!model || !this.prop) { return null; }

        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getPropByPath(model, path, true).v;
      },
    },
  },
  methods: {
    validate(trigger, callback = noop) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }

      this.validateState = 'validating';

      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          const r = rule;
          delete r.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        if (this.childrenIsCheckboxGroup || this.childrenIsRadioGroup) {
          this.dispatch('SeCellFormItemGroup', 'cell.form.item.validate', !errors);
        }
        if (errors) {
          // 移动至出错的节点
          this.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
        callback(errors);
      });
      return null;
    },
    clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      formRules = formRules ? getPropByPath(formRules, this.prop || '').o[this.prop || ''] : [];
      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger ||
        rule.trigger.indexOf(trigger) !== -1).map(rule => objectAssign({}, rule));
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('SeCellForm', 'cell.form.addField', [this]);

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue,
      });

      const rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('cell.form.blur', this.onFieldBlur);
        this.$on('cell.form.change', this.onFieldChange);
      }
    }
  },
  beforeDestroy() {
    this.dispatch('SeCellForm', 'cell.form.removeField', [this]);
  },
};
</script>
