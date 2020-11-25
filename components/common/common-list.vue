<template>
	<!-- 公共列表组件 -->
	<view v-if="item" style="width: 375rpx;padding:0 2rpx;box-sizing: border-box;" @click="openDetail(item)">
		<image :src="item.cover" style="width: 100%;height: 370rpx;"></image>
		<view class="p-2" style="padding: 14rpx;">
			<slot>
				<view class="font-md line-h">{{item.title}}</view>
			</slot>
			<view class="font text-light-muted line-h-sm limit-line-2" style="margin-top: 18rpx;margin-bottom: 15rpx;">{{item.desc}}</view>
			<view class="d-flex line-h">
				<price>{{item.pprice}}</price>
				<view class="a-self-end text-light-muted line-through font-sm ">￥{{item.oprice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入价格组件
	import price from '@/components/common/price.vue'
	export default {
		components: {
			price,
		},
		props: {
			item: Object
		},
		methods: {
			// 去详情页
			openDetail(item) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.id
				});
			}
		}
	}
</script>

<style scoped>
	
</style>
