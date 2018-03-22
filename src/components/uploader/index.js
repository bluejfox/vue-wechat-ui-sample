import Uploader from './src/uploader.vue';

/* istanbul ignore next */
Uploader.install = (Vue) => {
  Vue.component('se-uploader', Uploader);
};

export default Uploader;
