<template>
  <div
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click="switchValue"
  >
    <input
      class="weui-switch"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    />
  </div>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeSwitch',
  componentName: 'SeSwitch',
  mixins: [
    base,
  ],
  inject: {
    cellForm: {
      default: '',
    },
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
      type: String,
      default: '',
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  created() {
    if ([this.activeValue, this.inactiveValue].indexOf(this.value) === -1) {
      this.$emit('input', this.inactiveValue);
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
    switchDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
    },
  },
  methods: {
    handleChange() {
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue);
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue);
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked;
      });
    },
    switchValue() {
      this.$refs.input.click();
    },
  },
  mounted() {
    /* istanbul ignore if */
    this.$refs.input.checked = this.checked;
  },
};
</script>
