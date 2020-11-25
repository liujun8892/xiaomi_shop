<template>
	<view class="py-3 px-2 d-flex a-center border-bottom bg-white">
		<view class="iconfont font-md" :class="leftIconName" :style="{'color':leftIconColor}" v-if="leftIconShow"></view>
		<view class="font-md" :class="{'ml-2':titlePadding}">
			<slot>{{title}}</slot>
		</view>
		<view class="ml-auto d-flex a-center">
			<slot name="rightText" class=""></slot>
			<view v-if="showRightArrow" class="font-md iconfont icon-you text-light-muted"></view>
		</view>
		
	</view>

</template>

<script>
	export default {
		props: {
			leftIconName: {
				type: String,
				default: ''
			},
			leftIconShow: {
				type: Boolean,
				default: true
			},
			leftIconColor: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			showRightArrow: {
				type: Boolean,
				default: true
			},
			titlePadding:{
				type: Boolean,
				default: true
			}
		},
	}
</script>

<style>
</style>
