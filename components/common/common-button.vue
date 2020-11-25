<template>
	<view class="">
		<!-- 公共按钮 -->
		<view class="border rounded mr-2" style="padding: 15rpx 20rpx;" :class="{'bg-light-secondary text-light-muted':color==='gray','main_bg_color text-white':color==='orange' }" @click="$emit('click')">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			color: {
				type: String,
				default: 'gray'
			},
		},
	}
</script>

<style>
</style>
