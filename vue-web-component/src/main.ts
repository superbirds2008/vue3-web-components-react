import { defineCustomElement } from "vue";
import MyVueComponent from "./components/MyVueComponent.vue";

// 将 Vue 组件封装成 Web Component
const WrappedElement = defineCustomElement(MyVueComponent);
customElements.define("my-vue-component", WrappedElement);