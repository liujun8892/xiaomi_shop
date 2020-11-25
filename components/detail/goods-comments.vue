<template>
	<view class="">
		<scroll-view scroll-x="true" class="scroll-row p-2 b-box">
			<view class="scroll-row-item mr-2" v-for="(item,index) in comments" :key="index">
				<view class="rounded-lg bg-light-secondary p-2" style="width: 620rpx;height: 380rpx;">
					<view class="d-flex align-center">
						<image :src="item.userpic" style="height: 70rpx;width: 70rpx;border-radius: 50%;"></image>
						<view class="ml-3">
							<view class="font-weight line-h-sm">{{item.username}}</view>
							<view class="font-sm  text-light-muted">{{item.create_time}}</view>
						</view>
						<view class="ml-auto font-sm text-light-muted">
							<text class="iconfont icon-dianzan pr-1"></text>
							<text>164</text>
						</view>
					</view>
					<view class="mt-4  font-weight-500">{{item.context}}</view>
					<view class="row mt-3">
						<view class="span24-8 px-2" v-for="(item1,index1) in item.imglist" :key="index1">
							<image :src="item1" mode="widthFix" style="height: 115rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="d-flex a-center j-center font text-primary mt-3" @click="goCommentDetail">
			<text class="pr-1">更多评论</text>
			<text class="iconfont icon-you"></text>
		</view>


	</view>
</template>

<script>
	export default {
		props: {
			comments: {
				type: Array,
				default: []
			},
			goodsId: String | Number
		},
		methods: {
			goCommentDetail() {
				uni.navigateTo({
					url: '/pages/detail-comment/detail-comment?id=' + this.goodsId
				});
			}
		}
	}
</script>

<style>
</style>
