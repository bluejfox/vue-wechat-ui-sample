import Gallery from './src/gallery.vue';

/* istanbul ignore next */
Gallery.install = (Vue) => {
  Vue.component('se-gallery', Gallery);
};

export default Gallery;
