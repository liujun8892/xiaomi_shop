<template>
	<view class="divider" :style="{'background':bgc}"></view>
</template>

<script>
	export default {
		props: {
			bgc: {
				type: String,
				default: '#F5F5F5'
			}
		}
	}
</script>

<style>
	.divider {
		width: 100%;
		height: 18rpx;
	}
</style>
