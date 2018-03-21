<template>
  <div role="input">
    <template v-if="type !== 'textarea'">
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="weui-input"
        v-bind="$props"
        :disabled="inputDisabled"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :aria-label="label"
      >
      <a href="javascript:" class="weui-icon-clear input-clear" v-if="showClear" @click="clear"></a>
    </template>
    <template v-else>
      <textarea
      :tabindex="tabindex"
      class="weui-textarea"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :disabled="inputDisabled"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
      >
      </textarea>
      <div class="weui-textarea-counter" v-if="maxlength !== undefined">
        <span>{{currentValueLength}}</span>/{{maxlength}}
      </div>
    </template>
  </div>
</template>
<style scoped>
  .input-clear {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 10px;
    line-height: 45px;
  }
</style>
<script>
import base from '../../libs/base';
import objectAssign from '../../utils/merge';
import calcTextareaHeight from './calcTextareaHeight';

export default {
  name: 'SeInput',
  componentName: 'SeInput',

  mixins: [base],

  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
    };
  },

  props: {
    value: [String, Number],
    placeholder: String,
    resize: String,
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    rows: {
      type: Number,
      default: 2,
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true,
    },
    label: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    tabindex: String,
    pattern: String,
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    textareaStyle() {
      return objectAssign({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    showClear() {
      return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
    },
    currentValueLength() {
      return (this.currentValue !== undefined && this.currentValue.length !== undefined) ?
        this.currentValue.length : 0;
    },
  },

  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },

  methods: {
    focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      // if (this.validateEvent) {
      //   this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
      // }
    },
    inputSelect() {
      (this.$refs.input || this.$refs.textarea).select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
        };
        return;
      }
      const { minRows, maxRows } = autosize;
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleInput(event) {
      const { target: { value } } = event;
      this.$emit('input', value);
      this.setCurrentValue(value);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.$nextTick(() => {
        this.resizeTextarea();
      });
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.focus();
    },
  },
  created() {
    this.$on('inputSelect', this.inputSelect);
  },
  mounted() {
    this.resizeTextarea();
  },
};
</script>
