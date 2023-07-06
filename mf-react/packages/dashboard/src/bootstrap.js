import { createApp } from 'vue'
import App from './App.vue';

const mount = (el, props) => {
    const app = createApp(App, props);
    app.mount(el)
}

const devRoot = document.querySelector('#app')
if (devRoot) {
    mount(devRoot)
}

export { mount }
