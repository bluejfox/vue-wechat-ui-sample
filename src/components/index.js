import smoothscroll from 'smoothscroll-polyfill';
import Button from './button/index';
import CellCheckbox from './cell-checkbox/index';
import CellCheckboxGroup from './cell-checkbox-group/index';
import CellForm from './cell-form/index';
import CellFormItem from './cell-form-item/index';
import CellFormItemGroup from './cell-form-item-group/index';
import CellRadio from './cell-radio/index';
import CellRadioGroup from './cell-radio-group/index';
import Gallery from './gallery/index';
import Input from './input/index';
import Message from './message/index';
import Option from './option/index';
import Select from './select/index';
import Switch from './switch/index';
import Uploader from './uploader/index';

smoothscroll.polyfill();

const components = [
  Button,
  CellCheckbox,
  CellCheckboxGroup,
  CellForm,
  CellFormItem,
  CellFormItemGroup,
  CellRadio,
  CellRadioGroup,
  Gallery,
  Input,
  Message,
  Option,
  Select,
  Switch,
  Uploader,
];

function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  Button,
  CellCheckbox,
  CellCheckboxGroup,
  CellForm,
  CellFormItem,
  CellFormItemGroup,
  CellRadio,
  CellRadioGroup,
  Gallery,
  Input,
  Message,
  Option,
  Select,
  Switch,
  Uploader,
};
