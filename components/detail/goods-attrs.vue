<template>
	<view >
		<scroll-view scroll-x="true" class="scroll-row" :show-scrollbar="false">
			<view class="scroll-row-item" style="width: 170rpx;height: 110rpx;" v-for="(item,index) in baseAttrs" :key="index">
				<view class="d-flex flex-column a-center j-center" style="width: 100%; height: 100%;">
					<view class="iconfont line-h-sm" :class="item.icon"></view>
					<view class="font-md line-h-sm">{{item.title}}</view>
					<view class="font-sm text-light-muted line-h-sm">{{item.desc}}</view>
				</view>
			</view>
				
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			baseAttrs: {
				type: Array,
				default: []
			},
		},
	}
</script>

<style>
</style>
