import Vue from 'vue'

export default {
	state: {
		// 地址列表
		list:[],
	},
	getters: {
		// 默认地址
		defalutAddr(state) {
			return state.list.filter(v => v.isdefault)
		}
	},
	mutations: {
		// 初始化地址列表
		updateAddr(state,{refresh,list}){
			state.list =  refresh  ? [...list] : [...state.list,...list]
		},
		// 新增地址
		createAddr(state,addr) {
			state.list.unshift(addr)
		},
		// 删除地址
		delAddr(state,index) {
			state.list.splice(index,1)
		},
		// 修改地址
		editAddr(state,{index,addr}) {
			Vue.set(state.list,index,addr)
		},
		// 取消默认
		cancelDefault(state,index =-1) {
			state.list.forEach( (v,i) => {
				if( index === -1 && v.isdefault)  v.isdefault = false
				if( index !== -1 && i !== index && v.isdefault ) v.isdefault = false
			})
		}
	},
	actions:{
		// 添加收货地址
		createAddrAction({commit},addr) {
			if(addr.isdefault) commit("cancelDefault")
			commit('createAddr',addr)
		},
		// 修改收货地址
		editAddrAction({commit},obj) {
			if(obj.addr.isdefault) commit("cancelDefault",obj.index)
			commit('editAddr',obj)
		}
	}
}