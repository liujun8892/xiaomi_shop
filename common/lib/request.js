import $store from '@/store/index.js'

export default {
	// 全局配置
	common: {
		// baseUrl: 'http://ceshi3.dishait.cn/api',
		baseUrl: 'http://xiaomi.liujun1314.online/api',
		header:{
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data:{},
		method:'GET',
		dataType: 'json'
	},
	
	// 请求 返回promise
	request(options ={}) {
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data ||this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType		
		return new Promise((res,rej) => {
			// 校验token
			if(options.token) {
				// 验证token
				if(!$store.state.user.token){
					rej()
					// 有跳过token验证码
					return options.skip ? '' : $store.dispatch('reLogin')
				} 
				// 添加token
				options.header.token = $store.state.user.token
			}
			
			uni.request({
				...options,
				success: (result) => {
					if(options.native) return res(result)
					
					if (result.statusCode !== 200) {
						if(!options.toast) {
							uni.showToast({
								title: result.data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej(result.data)
					}
					let data = result.data.data
					return res(data)
				},
				fail: (error) => {
					// 非法token,重新登录
					if(error.errorCode === 20000) {
						return $store.dispatch('reLogin')
					}
					return uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				},
			});
		})
	},
	
	// 请求方式
	get(url , data ={} ,options ={}){
		if(!url) return
		options.url = url
		options.data = data
		options.method = 'GET'
	 	return this.request(options)
	},
	post(url , data ={} ,options ={}){
		if(!url) return
		options.url = url
		options.data = data
		options.method = 'POST'
	 	return this.request(options)
	},
	put(url , data ={} ,options ={}){
		if(!url) return
		options.url = url
		options.data = data
		options.method = 'PUT'
	 	return this.request(options)
	},
	del(url , data ={} ,options ={}){
		if(!url) return
		options.url = url
		options.data = data
		options.method = 'DELETE'
	 	return this.request(options)
	}
	
}