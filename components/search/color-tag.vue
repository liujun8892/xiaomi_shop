<template>
	<view class="p-2 d-inline-block mr-2 mb-2 border" :style="getTagStyle" @click="$emit('click')">
		{{tagName}}
	</view>
</template>

<script>
	export default {
		computed: {
			getTagStyle() {
				if(this.isClassify) {
					return `border:0;background:#F5F5F5;`
				}
				// 颜色
				let	color = {
					borderColor: ['#EEA6AA', '#DD6A4B', '#98D5D8', '#9DBE93', '#BCCD99'],
					background: ['#F8EAE9', '#FFBEC6', '#E8F6F6', '#E4F5E2', '#F2F6E8']
				}
				// 随机颜色索引
				let index = Math.floor(Math.random()*color.borderColor.length)
				return `background:${color.background[index]};border-color: ${color.borderColor[index]};`
			}
		}
		,
		props: {
			tagName:String,
			isClassify: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
</style>
