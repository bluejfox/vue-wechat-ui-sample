<template>
  <option v-bind="$props" :value="selectedValue">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </option>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeOption',
  componentName: 'SeOption',
  inject: ['select'],
  mixins: [
    base,
  ],
  props: {
    value: {
      required: true,
    },
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedValue: '',
    };
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    itemSelected() {
      console.log(this.$refs.option.selected);
      return this.$refs.option.selected;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.isObject) {
          this.selectedValue = val[this.select.valueKey] === undefined ?
            '' : val[this.select.valueKey];
        } else {
          this.selectedValue = val;
        }
      },
    },
  },
  created() {
    this.select.options.push(this);
    this.select.optionsCount += 1;
  },
  methods: {
  },
};
</script>
