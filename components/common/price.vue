<template>
	<view class="d-flex">
		<view class="font-sm font-smaller line-h-sm"  :class="unitSize + ' ' + color" :style="{'transform':getUnitY}">￥</view>
		<view class="line-h-sm mr-1 " :class="priceSize + ' ' + color + ''"><slot /></view>
	</view>
</template>

<script>
	export default {
		computed: {
			getUnitY() {
				return  `translateY(${this.unitY}rpx)`
			}
		},
		props:{
			// 价格单位的字体大小
			unitSize: {
				type: String,
				default: 'font-sm'
			},
			// 价格的字体大小
			priceSize: {
				type: String,
				default: 'font-md'
			},
			color:{
				type: String,
				default: 'main_text_color'
			},
			unitY:{
				type: String | Number,
				default: 3
			}
		}
	}
</script>

<style>
</style>
