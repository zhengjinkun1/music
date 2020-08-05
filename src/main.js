import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.css'
// 导入vant框架
import { 
  NavBar,
  Form ,
  Field,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Search,
  Icon,
  Tab,
  Tabs,
  Sticky,
  List,
  Cell
  
  
} from 'vant';

// 导入用于设置rem基准值模块
import 'lib-flexible';
// 注册组件
Vue
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Sticky)
  .use(List)
  .use(Cell)
  
// 注册axios
Vue.use(VueAxios, axios)
// 配置请求基础路径
axios.defaults.baseURL = 'http://music.kele8.cn'
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 发起请求之前处理 序列化
axios.interceptors.request.use(config =>{
  // 
  if(config.method == 'post'){
    let paramsString = '';
    for(let key in config.data){
      paramsString += key + "=" + config.data[key] + "&"
    }
    config.data = paramsString.slice(0,-1);
  }
  return config;
})




Vue.config.productionTip = false

// 添加appkey属性保存appkey
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
