<template>
	<view class="p-2 border-light-secondary border-bottom d-flex a-center" @click="$emit('click')">
		<image :src="item3.cover" style="width: 150rpx;height: 150rpx;" class="rounded flex-shrink mr-2"></image>
		<view class="flex-1">
			<view class="d-flex a-center j-sb">
				<view class="font-md">{{item3.title}}</view>
				<view class="font-md text-light-muted">￥{{item3.pprice}}</view>
			</view>
			<view class="d-flex a-center j-sb">
				<view class="text-light-muted">{{item3.attrs}}</view>
				<view class="text-light-muted">x{{item3.num}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item3: {
				type: Object,
				default: {} 
			}
		},
	}
</script>

<style>
</style>
