<template>
	<view style="min-height: 100%;background-color: #F5F5F5;">
		<!-- 头部 -->
		<view class="position-relative" style="height: 320rpx;">
			<view class="position-absolute d-flex flex-column a-center" style="top: 100rpx;width: 100%;">
				<image src="../../static/images/demo/cate_03.png" class="rounded" style="width: 100rpx;height: 100rpx;" mode=""></image>
				<view class="text-light-muted ">
					小米商城4.5.1
				</view>
			</view>
		</view>
		<!-- 列表项 -->
		<view class="bg-white pl-2 border-top border-bottom">
			<list-item title="版本更新" class="text-muted"></list-item>
			<list-item title="了解小米" class="text-muted"></list-item>
			<list-item title="官方微博" class="text-muted"></list-item>
			<list-item title="廉洁小米" class="text-muted"></list-item>
			<list-item title="app分享" class="text-muted"></list-item>
			<list-item title="授权直供店" class="text-muted"></list-item>
			<list-item title="清除缓存" class="text-muted"></list-item>
		</view>
		<view class="d-flex a-center j-center pt-4 text-muted">
			探索黑科技, 小米为发烧而生
		</view>
	</view>
</template>

<script>
	import listItem from '@/components/common/list-item.vue'
	export default {
		components: {
			listItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
