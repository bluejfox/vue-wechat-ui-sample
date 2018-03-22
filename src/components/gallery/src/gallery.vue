<template>
  <div class="weui-gallery"
    :style="{
      'display': !visible ? 'none' : 'initial',
    }"
    @click="handleHide">
    <span class="weui-gallery__img"
      :style="{
        backgroundImage: `url(${url})`,
      }">
    </span>
    <div class="weui-gallery__opr">
      <slot name="button"></slot>
    </div>
  </div>
</template>
<script>
import { compareIsEqual } from '../../utils/dom';
import Popup from '../../utils/popup';

export default {
  name: 'SeGallery',
  componentName: 'SeGallery',
  mixins: [
    Popup,
  ],
  props: {
    url: String,
  },
  data() {
    return {
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
  },
  methods: {
    handleHide(ev) {
      if (compareIsEqual(ev.target, this.$slots.button[0].elm)) return;
      this.$emit('update:visible', false);
      this.$emit('close');
    },
  },
};
</script>
