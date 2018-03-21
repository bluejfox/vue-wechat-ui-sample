<template>
  <form @submit.prevent="handleSubmit($event)">
    <slot></slot>
  </form>
</template>
<script>
import base from '../../libs/base';
import Message from '../../message/index';

export default {
  name: 'SeCellForm',
  componentName: 'SeCellForm',
  mixins: [
    base,
  ],
  provide() {
    return {
      cellForm: this,
    };
  },
  props: {
    model: Object,
    rules: Object,
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    showErrorState: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    rules() {
      if (this.validateOnRuleChange) {
        this.validate(() => {});
      }
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on('cell.form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    /* istanbul ignore next */
    this.$on('cell.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    // resetFields() {
    //   if (!this.model) {
    //     process.env.NODE_ENV !== 'production' &&
    //     console.warn('[Element Warn][Form]model is required for resetFields to work.');
    //     return;
    //   }
    //   this.fields.forEach(field => {
    //     field.resetField();
    //   });
    // },
    clearValidate() {
      this.fields.forEach((field) => {
        field.clearValidate();
      });
    },
    validate(callback) {
      const cb = callback;
      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for validate to work!');
        return null;
      }

      // let promise;
      // // if no callback, return promise
      // if (typeof cb !== 'function' && window.Promise) {
      //   promise = new window.Promise((resolve, reject) => {
      //     cb = (errors) => {
      //       if (errors !== undefined && errors.length > 0) {
      //         reject(errors);
      //       } else {
      //         resolve([]);
      //       }
      //     };
      //   });
      // }

      // let valid = true;
      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && cb) {
        cb(valid);
      }
      // 表单内项目出现校验失败的场合，只提示第一个校验错误
      this.fields.forEach((field) => {
        if (count > 0 && !valid) return;
        field.validate('', (errors) => {
          if (errors) {
            valid = false;
            if (typeof cb === 'function') {
              cb(valid);
            }
            // 显示错误消息
            if (this.showErrorMessage && !valid) {
              const { message } = errors[0];
              Message.error({
                message,
              });
            }
          }
          count += 1;
        });
        if (valid && count === this.fields.length) {
          cb(valid);
        }
      });

      // if (promise) {
      //   return promise;
      // }
      return null;
    },
    validateField(prop, cb) {
      const field = this.fields.filter(f => f.prop === prop)[0];
      if (!field) { throw new Error('must call validateField with valid prop string!'); }

      field.validate('', cb);
    },
    handleSubmit(event) {
      // 没有定义校验规则的场合，直接触发提交事件
      if (this.rules === undefined || this.rules === null) {
        this.$emit('submit');
      // 使用定义的校验规则进行校验
      } else {
        this.validate((state) => {
          // 校验成功的场合
          if (state) {
            // 触发submit事件
            this.$emit('submit');
          }
        });
      }
      if (this.isPrevent) {
        event.preventDefault();
      }
    },
  },
};
</script>
