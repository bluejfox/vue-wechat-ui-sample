<template>
  <div role="select">
    <select
      class="weui-select"
      v-bind="$props"
      :value="selectedValue"
      @change="handleChange"
      >
      <slot></slot>
    </select>
  </div>
</template>
<script>
import base from '../../libs/base';
import { valueEquals } from '../../utils/util';

export default {
  name: 'SeSelect',
  componentName: 'SeSelect',
  mixins: [
    base,
  ],
  inject: {
    cellForm: {
      default: '',
    },
    cellFormItem: {
      default: '',
    },
  },
  provide() {
    return {
      select: this,
    };
  },
  props: {
    name: String,
    value: {
      required: true,
    },
    disabled: Boolean,
    placeholder: String,
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      options: [],
      optionsCount: 0,
      selectedValue: '',
    };
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
  },
  created() {
    this.$on('handleOptionClick', this.handleOptionSelect);
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.isObject) {
          this.selectedValue = val[this.valueKey] === undefined ? '' : val[this.valueKey];
        } else {
          this.selectedValue = val;
        }
      },
    },
  },
  methods: {
    handleOptionSelect(option) {
      this.$nextTick(() => {
        this.$emit('input', option.value);
        this.emitChange(option.value);
      });
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
        this.dispatch('SeFormItem', 'se.form.change', val);
      }
    },
    handleChange({ target: { options } }) {
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].selected) {
          this.handleOptionSelect(this.getOption(options[i].value));
          break;
        }
      }
    },
    getOption(value) {
      let ret;
      for (let i = this.options.length - 1; i >= 0; i -= 1) {
        const option = this.options[i];
        const optionValue = option.selectedValue;
        let selectedValue = value;
        if (typeof optionValue === 'number') {
          selectedValue = parseInt(selectedValue, 10);
        }
        if (optionValue === selectedValue) {
          ret = option;
          break;
        }
      }
      return ret;
    },
  },
};
</script>
