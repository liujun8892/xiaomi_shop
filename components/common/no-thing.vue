<template>
	<!-- 没有订单提示 -->
	<view class="d-flex position-relative j-center a-center flex-column" style="height: 400rpx;background-color: #F5F5F5;">
		<image :src="getIcon" mode="widthFix" style="width: 250rpx;"></image>
		<view class="mt-3 text-light-muted font-md">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			getIcon() {
				return `/static/images/nothing/${this.icon}.png`
			}
		},
		props: {
			title: {
				type: String,
				default: '您还没有待付款订单'
			},
			icon: {
				type: String,
				default: 'no_comment'
			}
		},
	}
</script>

<style>
</style>
