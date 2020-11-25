<template>
	<view class="">
		<!-- 加载 -->
		<view class="d-flex a-center j-center main_text_color font-md position-fixed left-0 right-0 top-0 bottom-0 bg-white" style="z-index: 999;" v-if="beforeReady">加载中...</view>
	</view>
</template>

<script>
	export default {
		props: {
			beforeReady: {
				type: Boolean,
				default: true 
			},
		},
	}
</script>

<style>
</style>
