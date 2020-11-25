<template>
	<view class="">
		<view class="p-2">
			<view class="font-md font-weight">{{detail.title}}</view>
			<view class="font-sm text-light-muted line-h-sm mb-3">{{detail.desc}}</view>
			<price unitSize="font" priceSize="font-lg">{{showPrice}}</price>
		</view>
	</view>
</template>

<script>
	// 导入价格组件
	import price from '@/components/common/price.vue'
	export default {
		components: {
			price
		},
		props: {
			detail: {
				type: Object,
				default: {}
			},
			showPrice: {
				type: String | Number
			}
		},
	}
</script>

<style>
</style>
