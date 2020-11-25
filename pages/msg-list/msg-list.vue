<template>
	<view style="min-height: 100%; background-color: #F5F5F5;" class="p-2">
		<view class="rounded-md bg-white p-2 mb-2" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
			<view class="font-md text-dark">
					{{item.title}}
			</view>
			<view class="text-light-muted">{{item.desc}}</view>
			<view class="text-light-muted">{{item.create_time}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: "小米MIX Alpha 5G 环绕屏 19999 上线了",
						desc: "黑科技、颜值爆表",
						create_time: "9月份"
					},
					{
						title: "小米MIX Alpha 5G 环绕屏 19999 上线了",
						desc: "黑科技、颜值爆表",
						create_time: "9月份"
					},
				]
			}
		},
		methods: {
			goDetail(item) {
				uni.navigateTo({
					url: '../msg-detail/msg-detail?detail=' + JSON.stringify(item)
				});
			}
		}
	}
</script>

<style>

</style>
