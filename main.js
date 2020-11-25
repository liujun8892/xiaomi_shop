import Vue from 'vue'
import App from './App'
// 导入全局的分割线组件
import selfDivider from './components/common/self-divider.vue'
// 加载中组件
import loading from './components/common/loading.vue'
// vuex
import store from './store/index.js'
// 加载中组件2
import loadingPlus from '@/components/common/mixin/loading-plus.vue'
// 请求
import http from '@/common/lib/request.js'
// 上拉加载
import loadMore from '@/components/uni/uni-load-more/uni-load-more.vue'
// 没有提示
import noThing from '@/components/common/no-thing.vue'
// 工具类
import Util from '@/common/lib/util.js'

// 注册分割线组件
Vue.component('self-divider', selfDivider)
Vue.component('loading', loading)
Vue.component('loading-plus', loadingPlus)
Vue.component('load-more', loadMore)
Vue.component('no-thing', noThing)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$Util = Util

// 时间过滤器
Vue.filter('formatTime', (shorttime = new Date().getTime()) => {
	shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
	let date = new Date(shorttime)
	let parseNumber = (num) => {
		return num < 10 ? "0" + num : num;
	}
	return date.getFullYear() + '-' + parseNumber(date.getMonth() + 1) + '-' + parseNumber(date.getDate()) + ' ' +
		parseNumber(date.getHours()) + ':' + parseNumber(date.getMinutes())
})

// 跳转权限
Vue.prototype.navigateTo = (options) => {
	if (!store.state.user.loginStatus) {
		// 重新登录
		return store.dispatch('reLogin')
	}
	uni.navigateTo(options);
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
