<template>
	<view style="min-height: 100%;background-color: #F5F5F5;">
		<self-divider />
		<view class="pl-2 bg-white">
			<view class="text-muted py-2 border-bottom">申请售后产品</view>
			<view class="px-1 py-2 d-flex a-center">
				<image src="/static/images/demo/cate_01.png " class="rounded mr-1 flex-shrink" mode="" style="width: 100rpx;height: 100rpx;"></image>
				<view class="flex-1">
					<view class="font-md">小米8 青春版 6GB+128G 梦幻蓝</view>
					<view class="text-muted line-h-sm">维修服务: 剩余111天</view>
				</view>
			</view>
		</view>
		<self-divider />
		<view class="bg-white">
			<view class="pl-2">
				<view class="text-muted py-2 border-bottom">服务类型</view>
			</view>
			<view class="py-3">
				<radio-tag-group radioType="single" :label="label1" @changeScreen></radio-tag-group>
			</view>
		</view>
		<self-divider />
		<view class="bg-white">
			<view class="pl-2">
				<view class="text-muted py-2 border-bottom">问题描述</view>
			</view>
			<view class="py-3 px-2 position-relative">
				<textarea v-model="content" placeholder="描述一下你遇到的问题吧"  :maxlength="maxlength"  class=" border rounded b-box p-2" style="width: 100%;height: 400rpx;"/>
				<view class="position-absolute text-light-muted2" style="right: 40rpx;bottom: 40rpx;" :class="{'text-danger':getRemainLenth===0}">
					{{getRemainLenth}}/{{maxlength}}
				</view>
			</view>
		</view>
		
		<view class="rounded main_bg_color text-white font-md d-flex a-center j-center " style="width: 710rpx;height: 100rpx; margin: 30rpx 20rpx 0;" hover-class="main_bg_hover_color">
			下一步
		</view>
	</view>
</template>

<script>
	import radioTagGroup from '@/components/common/radio-tag-group2.vue'
	export default {
		computed: {
			getRemainLenth() {
				return this.maxlength - this.content.length
			}
		},
		components: {
			radioTagGroup
		},
		data() {
			return {
				label1: {
					selected: 0,
					list: [{
						name: "维修"
					}, ]
				},
				content: "",
				maxlength: 200
			}
		},
		methods: {
			changeScreen(item,index) {
				item.selected = index
			}
		}
	}
</script>

<style>

</style>
