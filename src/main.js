// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import commonComponents from '@/components'
import {
    Pagination, RadioGroup, Radio, Button, Select, Checkbox, Input, Icon, InputNumber, Carousel, CarouselItem, Row, Col, Message, Tag, Tabs, TabPane, DatePicker, Option, Upload, Dialog, MessageBox, Tree, Dropdown, DropdownMenu, DropdownItem, CheckboxGroup, CheckboxButton, Tooltip, Menu, MenuItem
} from 'element-ui'
Vue.config.productionTip = false

Object.keys(commonComponents).forEach(key => {
    Vue.component(key, commonComponents[key])
})
Vue.use(Pagination)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Icon)
Vue.use(InputNumber)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(MenuItem)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
