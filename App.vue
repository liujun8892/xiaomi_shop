<script>
	export default {
		// globalData
		globalData:{
			message: ''
		},
		onLaunch: function() {
			console.log('App Launch')
			let userInfo = uni.getStorageSync('userInfo')
			// console.log(userInfo,'userInfo');
			if(userInfo) {
				this.$store.commit('initUserInfo',JSON.parse(userInfo))
			}
			// 初始化购物车数据
			this.$store.dispatch('updateCart')
			// 全局监听购物车更新
			uni.$on('updateCartData',()=>{
				this.$store.dispatch('updateCart')
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入uniapp官方css库 */
	@import "/common/uni.css";
	/* 引入动画库 */
	@import "/common/animate.css";
	/* 引入字体图标库 */
	@import "/common/icon.css";
	/* 引入自由库 */
	/* @import "/common/free.css"; */
	/* 引入基础样式库 */
	@import "/common/zcm-main.css";
	/* 引入公共库 */
	@import "/common/common.css";
</style>
