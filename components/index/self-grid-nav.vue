<template>
	<view>
		<!-- 删栏式nav -->
		<view class="row text-center  p-2 " style="width: 100%;">
			<block v-for="(item,index) in navGridList" :key="index">
				<view class="span-4 py-2 d-flex flex-column justify-center a-center" @tap="navTap(item)">
					<image :src="item.src" mode="" style="width: 60rpx;height: 60rpx;"></image>
					<text class="font-sm line-h-big">{{item.text}}</text>
				</view>		
			</block>
		</view>
	</view>	
</template>

<script>
	export default {
		props: {
			navGridList: {
				type: Array | Object,
				default: []
			}
		},
		methods: {
			// 每个删栏nav点击
			navTap(item) {
				console.log(item,'nav被点击了...');
			}
		}
	}
</script>

<style>
</style>
