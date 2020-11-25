<template>
	<view>
		<view class="d-flex flex-column px-4 a-center">
			<view class="iconfont icon-iconfontxuanzhong4 main_text_color mt-5" style="font-size: 100rpx;"></view>
			<view class="font-md  line-h" style="margin-top: -15rpx;margin-bottom: 80rpx;">支付成功</view>
			<view class="d-flex a-center j-center main_bg_color text-white mb-3 rounded "  style="width: 100%;height: 100rpx;" hover-class="main_bg_hover_color" @click="openOrderDetail">查看订单</view>
			<view class="d-flex a-center j-center rounded border"  style="width: 100%;height: 100rpx;" @click="goHome">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goHome() {
				uni.switchTab({
					url:'../index/index'
				})
			},
			openOrderDetail() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
