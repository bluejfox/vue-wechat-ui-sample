import uuidMixin from './mixin_uuid';


function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.componentName;
    const otherChild = child;
    if (name === componentName) {
      child.$emit.apply(otherChild, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  mixins: [uuidMixin],
  methods: {
    /**
     * 派发事件给指定的父组件（派发事件的组件与指定的父组件间包含其他组件的场合也适用）
     * @param {*} componentName
     * @param {*} eventName
     * @param {*} params
     */
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        const otherParent = parent;
        parent.$emit.apply(otherParent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
