<template>
	<view class="py-3 px-2 d-flex a-center border-bottom" @click="$emit('click')">
		<view class="iconfont font-md" :class="leftIconName" :style="{'color':leftIconColor}" v-if="leftIconShow"></view>
		<view class="ml-2 font-md">
			<slot>{{title}}</slot>
		</view>
		<view v-if="showRightArrow" class="ml-auto font-md iconfont icon-you text-light-muted"></view>
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
			}
		},
	}
</script>

<style>
</style>
