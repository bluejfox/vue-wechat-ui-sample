import smoothscroll from 'smoothscroll-polyfill';
import CellCheckbox from './cell-checkbox/index';
import CellCheckboxGroup from './cell-checkbox-group/index';
import CellForm from './cell-form/index';
import CellFormItem from './cell-form-item/index';
import CellFormItemGroup from './cell-form-item-group/index';
import CellRadio from './cell-radio/index';
import CellRadioGroup from './cell-radio-group/index';
import Input from './input/index';
import Message from './message/index';
import Option from './option/index';
import Select from './select/index';
import Switch from './switch/index';

smoothscroll.polyfill();

const components = [
  CellCheckbox,
  CellCheckboxGroup,
  CellForm,
  CellFormItem,
  CellFormItemGroup,
  CellRadio,
  CellRadioGroup,
  Input,
  Message,
  Option,
  Select,
  Switch,
];

function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  CellCheckbox,
  CellCheckboxGroup,
  CellForm,
  CellFormItem,
  CellFormItemGroup,
  CellRadio,
  CellRadioGroup,
  Input,
  Message,
  Option,
  Select,
  Switch,
};
