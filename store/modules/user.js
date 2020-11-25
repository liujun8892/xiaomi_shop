import Vue from 'vue'

export default {
	state: {
		// 用户登录状态
		loginStatus: false,
		// 登录token
		token: null,
		// 用户信息
		userInfo: {}
	},
	getters: {

	},
	mutations: {
		// 初始化用户信息
		initUserInfo(state,userInfo) {
			state.loginStatus = true
			state.token = userInfo.token
			state.userInfo = userInfo
		},
		// 登录
		login(state, userInfo) {
			state.loginStatus = true
			state.token = userInfo.token
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.token = null
			state.userInfo = {}
			uni.removeStorageSync('userInfo')
		}
	},
	actions: {
		// 重新登录
		reLogin({commit,state}){
			commit('logout')
			let timer = null
			uni.showToast({
				title:'请先登录',
				icon:'none',
				duration:400
			})
			timer = setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/login'
				})
				clearTimeout(timer)
			},400)
		}
	}
}
