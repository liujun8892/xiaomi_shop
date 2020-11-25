<template>
	<view class="bg-light-secondary" style="min-height: 100vh;">
		<card :headTitle="item.label" v-for="(item,index) in list" :key="index" :titleFontWeight="false" v-if="item.label!=='账号管理'||loginStatus">
			<view @click="goPage(item1.path)" v-for="(item1,index1) in item.value" :key="index1">
				<list-item :title="item1.title" style="background-color: #FFFFFF;"></list-item>
			</view>

		</card>

		<view class="p-3">
			<button type="default" class="bg-white py-1" @click="logoutEvent" v-if="loginStatus">退出登录</button>
		</view>


	</view>
</template>

<script>
	import card from '@/components/common/self-card.vue'
	import listItem from '@/components/my/list-item.vue'
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'

	export default {
		computed: {
			...mapState({
				loginStatus: state => state.user.loginStatus,
				token: state => state.user.token
			})
		},
		components: {
			card,
			listItem
		},
		data() {
			return {
				timer: null,
				list: [{
						label: "账号管理",
						value: [{
								title: "个人资料",
								path: ""
							},
							{
								title: "收货地址",
								path: "../user-address-list/user-address-list"
							},
						]
					},
					{
						label: "关于",
						value: [{
								title: "关于商城",
								path: "../about/about"
							},
							{
								title: "意见反馈",
								path: ""
							},
							{
								title: "协议规则",
								path: ""
							},
							{
								title: "资质证件",
								path: ""
							},
							{
								title: "用户协议",
								path: ""
							},
							{
								title: "隐私政策",
								path: ""
							},
						]
					},
				]
			}
		},
		methods: {
			...mapMutations(['logout','clearCart']),
			...mapActions(['reLogin']),
			logoutEvent() {
				this.$http.post(`/logout`, {}, {
						token: true,
					}).then(res => {
						console.log(res, 111);
						// 清空购物车
						this.clearCart()
						// 更新购物车角标
						this.$Util.updateTabbarBadge(0)
						uni.showToast({
							title: '退出成功',
							icon: 'none',
							duration: 400
						});
						this.timer = setTimeout(() => {
							this.logout()
							uni.navigateBack({
								delta: 1
							})
							clearTimeout(this.timer)
						}, 400)
					})
					.catch(err => {
						this.reLogin()
						console.log(err, 222);
					})
			},
			goPage(url) {
				uni.navigateTo({
					url: url,
					success: res => {},
					fail: (err) => {
						console.log(err);
					},
					complete: () => {}
				});
				console.log('111');
			}
		}
	}
</script>

<style>

</style>
