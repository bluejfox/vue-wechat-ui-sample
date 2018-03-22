<template>
  <button
    class="weui-btn"
    @click="handleClick"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      buttonClass,
      buttonSize ? 'weui-btn_' + buttonSize : '',
      {
        'weui-btn_disabled': disabled,
        'weui-btn_loading': loading
      }
    ]"
  >
    <i class="weui-loading" v-if="loading" @click="handleInnerClick"></i>
    <i :class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
    <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeButton',
  componentName: 'SeButton',
  mixins: [
    base,
  ],
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
  },

  computed: {
    buttonClass() {
      let ret = '';
      if (this.plain) {
        ret = `weui-btn_plain-${this.type}`;
      } else {
        ret = `weui-btn_${this.type}`;
      }
      return ret;
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
  },

  methods: {
    handleClick(evt) {
      if (this.loading) {
        evt.preventDefault();
        return;
      }
      this.$emit('click', evt);
    },
    handleInnerClick(evt) {
      if (this.disabled) {
        evt.stopPropagation();
      }
    },
  },
};
</script>
