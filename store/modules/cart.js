import $http from '@/common/lib/request.js'
import $Util from '@/common/lib/util.js'

export default {
	state: {
		// 购物车选中列表
		selectList: [],
		// 属性选择弹框显示隐藏
		popupShow: 'none',
		// 商品索引
		popupIndex: 0,
		// 购物车列表
		list: []

	},
	getters: {
		// 是否全选
		checkedAll(state) {
			return state.selectList.length === state.list.length
		},
		// 总价
		totalPrice(state) {
			let price = 0
			state.list.forEach(v => {
				if (state.selectList.indexOf(v.id) !== -1) {
					price += v.pprice * v.num
				}
			})
			return price.toFixed(2)
		},
		// 禁用
		allDisabled(state) {
			return state.list.length === 0
		},
		// 弹出框的数据
		popupData(state) {
			return state.list[state.popupIndex] || false
		},
		// 购物车的数量
		cartCount(state){
			return state.list.length > 99 ? '99+' : state.list.length
		},
		// 选中商品的数量
		selectGoodsCount(state) {
			return state.selectList.length
		}
	},
	mutations: {
		// 清空购物车
		clearCart(state) {
			state.list = []
			state.selectList = []
		},
		// 初始化购物车数据
		initCart(state, list) {
			state.list = list
			// 更新购物车角标
			$Util.updateTabbarBadge(state.list.length)
		},
		// 全选
		selectedAll(state) {
			state.selectList = state.list.map(v => {
				v.checked = true
				return v.id
			})
		},
		// 取消全选
		unSelectedAll(state) {
			state.list.forEach(v => v.checked = false)
			state.selectList = []
		},
		// 单选和取消单选
		selectedItem(state, index) {
			let id = state.list[index].id
			let flag = state.selectList.indexOf(id)
			if (flag > -1) {
				state.list[index].checked = false
				return state.selectList.splice(flag, 1)
			}
			state.list[index].checked = true
			state.selectList.push(id)
		},
		// 删除
		delGoods(state) {
			state.list = state.list.filter(v => state.selectList.indexOf(v.id) === -1)
			// 更新购物车角标
			$Util.updateTabbarBadge(state.list.length)
		},
		// 初始化商品索引
		initIndex(state, index) {
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state, goods) {
			state.list.unshift(goods)
			// 更新购物车角标
			$Util.updateTabbarBadge(state.list.length)
		}
	},
	actions: {
		// 更新购物车数据
		updateCart({
			commit
		}){
			console.log('更新购物车数据');
			$http.get(`/cart`,{},{token:true,skip:true}).then(res => {
				  commit('initCart',res)
			})
		},
		// 全选和取消全选
		doSelectedAll({
			commit,
			getters
		}) {
			getters.checkedAll ? commit('unSelectedAll') : commit('selectedAll')
		},
		// 删除
		doDelGoods({
			commit,
			state
		}) {
			// 如果没有选中提示
			if (state.selectList.length === 0) {
				return uni.showToast({
					title: '请选中要删除的商品',
					icon: 'none'
				});
			}


			uni.showModal({
				content: '是否删除选中',
				success: function(res) {
					if (res.confirm) {
						$http.post(`/cart/delete`, {
							shop_ids: state.selectList.join(',')
						}, {
							token: true
						}).then(res => {
							console.log(res, '删除成功');
							commit('delGoods')
							commit('unSelectedAll')
							uni.showToast({
								title: '删除成功'
							});

						})
					}
				}
			});
		},
		// 显示属性选择
		doShowPopup({
			commit,
			state
		}, index) {
			console.log('show');
			commit('initIndex', index)
			state.popupShow = 'show'
		},
		// 隐藏属性选择
		doHidePopup({
			commit,
			state
		}) {
			console.log('hide');
			state.popupShow = 'hide'
			setTimeout(() => {
				state.popupShow = 'none'
				commit('initIndex', 0)
			}, 200)
		}
	}
}
