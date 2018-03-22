<template>
  <div class="weui-uploader">
    <div class="weui-uploader__hd">
      <p class="weui-uploader__title">{{ title }}</p>
      <div class="weui-uploader__info" v-if="limit !== undefined">
        {{ fileList.length }}/{{ limit }}
      </div>
    </div>
    <div class="weui-uploader__bd">
      <ul class="weui-uploader__files" v-for="(file, index) in fileList" :key="index">
        <li class="weui-uploader__file"
          :style="{
            backgroundImage: `url(${file})`
          }" @click="handlePreviewImage(file)">
          <div class="weui-uploader__file-content">
            <!-- <i class="weui-icon-warn"></i> -->
            <!-- 50% -->
          </div>
        </li>
      </ul>
      <div class="weui-uploader__input-box" v-if="canUpload" @click="handleSelectFile">
      </div>
      <input
        ref="fileUploader"
        class="weui-uploader__input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        style="display: none;"
        @change="handleChange"
      />
    </div>
  </div>
</template>
<script>
import base from '../../libs/base';

export default {
  name: 'SeUploader',
  componentName: 'SeUploader',
  mixins: [
    base,
  ],
  props: {
    accept: String,
    title: String,
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: null,
      default: undefined,
    },
    beforeSelect: Function,
    onExceed: Function,
  },
  computed: {
    canUpload() {
      let ret = true;
      if (this.limit !== undefined && this.fileList.length >= this.limit) {
        ret = false;
      }
      return ret;
    },
  },
  methods: {
    handlePreviewImage(file) {
      this.$emit('preview', file);
    },
    handleSelectFile() {
      if (this.beforeSelect === undefined) {
        this.startSelect();
        return;
      }
      const before = this.beforeSelect();
      // 返回Promise的场合
      if (before && before.then) {
        before.then((flag) => {
          if (flag && this.canUpload) {
            this.startSelect();
          }
        });
      // 返回true的场合
      } else if (before !== false) {
        this.startSelect();
      }
    },
    handleChange(ev) {
      const { files } = ev.target;
      if (this.limit && this.fileList.length + files.length > this.limit) {
        if (this.onExceed) {
          this.onExceed(files, this.fileList);
        }
        return;
      }
      let selectedFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        selectedFiles = selectedFiles.slice(0, 1);
      }
      if (selectedFiles.length === 0) {
        return;
      }
      this.$emit('change', selectedFiles);
    },
    startSelect() {
      this.$refs.fileUploader.click();
    },
  },
};
</script>
