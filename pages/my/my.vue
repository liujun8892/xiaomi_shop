<template>
	<view style="width: 750rpx;min-height: 100vh;background-color: #FFFFFF;" class="animated fadeIn faster content_H">
		<!-- 加载 -->
		<!-- <loading-plus :beforeReady="beforeReady"></loading-plus> -->

		<!-- 头部 -->
		<view class="position-relative" style="height: 320rpx;width: 100%;">
			<navigator url="../msg-list/msg-list" hover-class="none">
				<view class="position-absolute iconfont icon-xiaoxi text-white" style="font-size: 50rpx;right: 20rpx;height: 75rpx;z-index: 100;"></view>
			</navigator>
			<view class="position-absolute d-flex a-center b-box <pl-5></pl-5>" style="top: 120rpx;z-index: 100;width: 750rpx;">
				<image :src="loginStatus ? userInfo.avatar : '../../static/images/demo/demo6.jpg'" class="rounded-circle border-light mr-2"
				 mode="" style="border: 5rpx solid;width: 145rpx;height: 145rpx;"></image>
				<view class="font-md text-white" @click="login(pages.login)">{{loginStatus ? userInfo.nickname : ' 注册/登录' }}</view>
				<view class="ml-auto d-flex a-center j-center px-2 a-self-end" style="height: 75rpx;border-top-left-radius: 38rpx;border-bottom-left-radius: 38rpx;background-color: #FFD43F;color: #D58319;">
					<view class="iconfont font-md icon-huangguan ml-2 mr-1" style="margin-top: -5rpx;"></view>
					<view class="font-md mr-1">会员积分 {{loginStatus ? userInfo.user_level ? userInfo.user_level : 0 : 0 }}.00</view>
				</view>
			</view>
			<image src="../../static/images/bg.jpg" mode="" style="width: 100%;height: 100%;"></image>
		</view>

		<!-- 我的订单 -->
		<card showTitleBorder>
			<view class="d-flex j-sb a-center" slot="title" style="width: 100%;">
				<view class="font-md font-weight">我的订单</view>
				<view class="text-muted d-flex a-center ml-auto" @click="toPage('../order/order',true)">
					<view class="mr-1">全部订单</view>
					<view class="iconfont icon-you"></view>
				</view>
			</view>
			<view class="d-flex" style="padding-top: 35rpx;padding-bottom: 35rpx;">
				<view class="flex-1 d-flex a-center j-center flex-column" v-for="(item,index) in orders" :key="index" @click="doAction(item)">
					<view class="iconfont line-h" :class="item.icon"></view>
					<view class="line-h" style="margin-top: 15rpx;">{{item.name}}</view>
				</view>
			</view>
		</card>
		<self-divider />

		<!-- 选项 -->
		<list-item leftIconName="icon-VIP" leftIconColor="#FDBF2E" title="小米会员"></list-item>
		<list-item leftIconName="icon-huangguan" leftIconColor="#FCBE2D" title="会员中心"></list-item>
		<list-item leftIconName="icon-service" leftIconColor="#FA6C5E" title="服务中心"></list-item>
		<list-item leftIconName="icon-home" leftIconColor="#FE8B42" title="小米之家"></list-item>
		<list-item leftIconName="icon-gengduo" leftIconColor="#9ED45A" title="更多功能"></list-item>
		<self-divider style="height: 22rpx;" />
		<view @click="toPage('../user-set/user-set')">
			<list-item leftIconName="icon-icon_set_up" leftIconColor="#808C98" title="更多设置"></list-item>
		</view>
	</view>
</template>

<script>
	import card from '@/components/common/self-card.vue'
	import listItem from '@/components/my/list-item.vue'
	import loading from '@/components/common/mixin/loading.js'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [loading],
		computed: {
			...mapState({
				loginStatus: state => state.user.loginStatus,
				userInfo: state => state.user.userInfo
			})
		},
		components: {
			card,
			listItem
		},
		data() {
			return {
				pages: {
					login: '../login/login'
				},
				orders: [{
					name: "待付款",
					icon: "icon-wallet_icon",
					index: 1
				}, {
					name: "待收货",
					icon: "icon-daishouhuo",
					index: 2
				}, {
					name: "待评价",
					icon: "icon-pinglun",
					index: 3
				}, {
					name: "待退修",
					icon: "icon-buoumaotubiao46"
				}]
			}
		},
		methods: {
			toPage(url, valid = false) {
				if (!url) return
				if (valid) {
					return this.navigateTo({
						url: url
					})
				}
				uni.navigateTo({
					url: url
				});
			},
			login(url) {
				if (this.loginStatus) return
				uni.navigateTo({
					url: url
				});
			},
			doAction(item) {
				if (item.index) {
				return	this.navigateTo({
						 url: '../order/order?detail=' + JSON.stringify({
							index: item.index
						}),
					});	
				}
				uni.showToast({
					title: '暂无待退修的订单',
					icon: 'none'
				});
			},
		},
		onLoad() {
			console.log(this.userInfo, '用户登录信息');
		}
	}
</script>

<style>

</style>
