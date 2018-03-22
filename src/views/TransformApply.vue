<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">
        Setaria-WeUI
      </h1>
      <p class="page__desc">XXXXXXXXXX</p>
    </div>
    <div class="page__bd">
      <se-cell-form :model="form" :rules="rules" ref="form" @submit="handleSubmit">
        <se-cell-form-item-group title="常规项目">
          <se-cell-form-item label="qq" prop="qq">
            <se-input type="number" pattern="[0-9]*" placeholder="请输入qq号"
              v-model="form.qq"/>
          </se-cell-form-item>
          <se-cell-form-item label="邮箱" prop="mail">
            <se-input placeholder="请输入邮箱" v-model="form.mail"/>
          </se-cell-form-item>
          <se-cell-form-item label="兴趣" prop="interest">
            <se-input type="textarea" placeholder="请输入文本" autosize
              v-model="form.interest" :maxlength="100"></se-input>
          </se-cell-form-item>
          <se-cell-form-item label="国家/地区" prop="area">
            <se-select v-model="form.area">
              <se-option :value="0">中国</se-option>
              <se-option :value="1">美国</se-option>
              <se-option :value="2">英国</se-option>
            </se-select>
          </se-cell-form-item>
          <se-cell-form-item prop="birth" label="出生日期">
            <se-input type="date" v-model="form.birth"/>
          </se-cell-form-item>
          <se-cell-form-item prop="switch" label="开关">
            <se-switch v-model="form.switch" :active-value="1" :inactive-value="0"></se-switch>
          </se-cell-form-item>
          <se-cell-form-item>
            <se-uploader
              title="上传图片"
              accept="image/*"
              :limit="fileLimit"
              :file-list="fileImagePathArr"
              :on-exceed="handleFileExceed"
              @preview="handleClickImage"
              @change="handleFileChange">
            </se-uploader>
          </se-cell-form-item>
        </se-cell-form-item-group>
        <se-cell-form-item-group title="联系方式">
          <se-cell-form-item prop="contactType">
            <se-select v-model="form.contactType">
              <se-option :value="0">微信号</se-option>
              <se-option :value="1">QQ号</se-option>
              <se-option :value="2">电子邮箱</se-option>
            </se-select>
          </se-cell-form-item>
        </se-cell-form-item-group>
        <se-cell-form-item-group title="性别">
          <se-cell-form-item prop="sex">
            <se-cell-radio-group v-model="form.sex">
              <se-cell-radio :label="1">男</se-cell-radio>
              <se-cell-radio :label="2">女</se-cell-radio>
            </se-cell-radio-group>
            <a href="javascript:void(0);" class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">添加更多</div>
            </a>
          </se-cell-form-item>
        </se-cell-form-item-group>
        <se-cell-form-item-group title="复选列表项">
          <se-cell-form-item prop="checkboxVal">
            <se-cell-checkbox-group v-model="form.checkboxVal" @change="handleChange" :max="3">
              <se-cell-checkbox :label="1">Checkbox1</se-cell-checkbox>
              <se-cell-checkbox :label="2">Checkbox2</se-cell-checkbox>
              <se-cell-checkbox :label="3">Checkbox3</se-cell-checkbox>
              <se-cell-checkbox :label="4">Checkbox4</se-cell-checkbox>
            </se-cell-checkbox-group>
            <a href="javascript:void(0);" class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">添加更多</div>
            </a>
          </se-cell-form-item>
        </se-cell-form-item-group>
        <se-cell-form-item-group title="电话号码">
          <se-cell-form-item prop="tel">
            <se-select v-model="form.countryCode" slot="label">
              <se-option :value="0">+86</se-option>
              <se-option :value="1">+81</se-option>
              <se-option :value="2">+87</se-option>
            </se-select>
            <se-input type="number" pattern="[0-9]*" placeholder="请输入号码"/>
          </se-cell-form-item>
        </se-cell-form-item-group>
        <div class="weui-cells__tips">底部说明文字底部说明文字</div>
        <div class="weui-btn-area">
          <se-button type="primary" native-type="submit">提交</se-button>
        </div>
      </se-cell-form>
      <label for="weuiAgree" class="weui-agree">
          <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox">
          <span class="weui-agree__text">
              阅读并同意<a href="javascript:void(0);">《相关条款》</a>
          </span>
      </label>
    </div>
    <se-gallery :visible.sync="galleryVisible" :url="selectImageUri">
      <i
        slot="button"
        class="weui-icon-delete weui-icon_gallery-delete"
        @click="handleDeleteImage"></i>
    </se-gallery>
  </div>
</template>
<style scoped>
.page__title {
  text-align: center;
}
.file-img {
  background-image:url('../assets/pic_160.png');
}
</style>
<script>
import { util } from 'setaria';
import Component from '../components/index';

export default {
  data() {
    return {
      form: {
        sex: '',
        checkboxVal: [],
        interest: '',
        area: '',
        qq: '',
        mail: '',
        contactType: null,
        countryCode: null,
        switch: 1,
      },
      rules: {
        sex: [
          { required: true, message: '请选择性别。' },
        ],
        qq: [
          { required: true, message: 'QQ号必须输入。' },
          { pattern: '[0-9]*' },
        ],
        mail: [
          { type: 'email', message: '邮箱格式错误。' },
        ],
      },
      galleryVisible: false,
      fileLimit: 3,
      fileImagePathArr: [
        // eslint-disable-next-line
        require('../assets/pic_160.png'),
        // eslint-disable-next-line
        require('../assets/pic_161.jpeg'),
      ],
      selectImageUri: '',
    };
  },
  methods: {
    handleDeleteImage() {
      if (!util.isEmpty(this.selectImageUri)) {
        const index = this.fileImagePathArr.indexOf(this.selectImageUri);
        if (index !== -1) {
          this.fileImagePathArr.splice(index, 1);
        }
      }
      this.galleryVisible = false;
    },
    handleClickImage(uri) {
      this.galleryVisible = true;
      this.selectImageUri = uri;
    },
    handleFileExceed() {
      Component.Message.error({
        message: `最多只可选择${this.fileLimit - this.fileImagePathArr.length}个文件`,
      });
    },
    handleFileChange(files) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.fileImagePathArr.push(reader.result);
        };
      });
    },
    handleChange(val) {
      console.log(val);
    },
    handleSubmit() {
      console.log(this.form);
    },
  },
};
</script>
