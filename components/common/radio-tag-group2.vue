<!-- 单选标签组件 -->
<template>
	<view>
		<self-card :headTitle="item.title" v-for="(item,index) in radioGroup" :titleFontWeight="false" v-if="radioType=== 'group'">
			<view class="d-flex flex-wrap a-center b-box pl-2">
				<view class="span24-7 mb-2 d-flex a-center j-center rounded mr-2" style="height: 80rpx;background-color: #F8F9FB;"
				 v-for="(item1,index1) in item.list" :class="{'active': item.selected === index1}" @click="changeScreen(item,index1)">
					{{item1.name}}
				</view>
			</view>
		</self-card>

		<view class="d-flex flex-wrap a-center b-box pl-2" v-if="radioType === 'single' ">
			<view class="span24-7 mb-2 d-flex a-center j-center rounded mr-2" style="height: 80rpx;background-color: #F8F9FB;"
			 v-for="(item1,index1) in label.list" :class="{'active': label.selected === index1}" @click="changeScreen(label,index1)">
				{{item1.name}}
			</view>
		</view>
		
	</view>

</template>

<script>
	// 导入卡片组件
	import selfCard from '@/components/common/self-card.vue'
	export default {
		components: {
			selfCard
		},
		props: {
			// 单选框列表
			radioGroup: Array,
			radioType:{
				type: String,
				default: 'group'
			},
			label: {
				type: Object
			}
		},
		methods: {
			// 改变单选框的选中状态
			changeScreen(item, index) {
				this.$emit('changeScreen', item, index)
			}
		},
		
	}
</script>

<style scoped>
	.active {
		background-color: #FCE0D5 !important;
		border: 1rpx solid #E3630E !important;
		color: #EC8239 !important;
	}
</style>
