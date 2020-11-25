<template>
	<view >
		<view class="p-2 border-bottom d-flex" style="height: 300rpx;box-sizing: border-box;" v-for="(item,index) in searchList" :key="index" @click="openDetail(item)">
			<view  style="width: 250rpx;height: 100%;" class="mr-2 flex-shrink"  >
				<image :src="item.cover" style="width: 100%;
				height: 100%;" v-if="item.cover"></image>
			</view>
			<view style="flex: 1;height: 100%;">
				<view class="font-md font-weight line-h-lg mt-1">
					{{item.title}}
				</view>
				<view class="font-sm text-muted mt-1 limit-line-2" style="line-height: 1.5;">
					{{item.desc}}
				</view>
				<price  style="margin-top: 15rpx;">
					{{item.pprice}}
				</price>
				<view class="bottom_count font-sm text-muted pt-1">
					<template v-if="item.comment_num > 0">
					{{item.comment_num}} 条评论 {{item.satisfaction}}% 满意
					</template>
					 <template v-else>
						 暂无评论
					 </template>
				</view>
			</view>
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
			searchList: Array
		},
		methods:{
			// 去详情页
			openDetail(item) {
				console.log(item,'1111');
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.id
				});
			}
		}
	}
</script>

<style>
</style>
