<template>
	<view>
		<view class="uni-timeline" style="padding: 30upx 20upx;background-color: #fff;">
			<view class="uni-timeline-item"
			v-for="(item,index) in list" 
			:class="{'uni-timeline-first-item':index === 0,'uni-timeline-last-item':index === (list.length - 1)}">
				<view class="uni-timeline-item-divider"></view>
				<view class="uni-timeline-item-content">
					<view>{{item.status}}</view>
					<view class="datetime">{{item.time}}</view>
				</view>
			</view>
			<view v-if="!list.length" class="d-flex a-center j-center py-5">
				<text class="text-light-muted font-md">暂无物流信息</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				list:[]
			}
		},
		onLoad(e) {
			if(!e.detail){
				uni.navigateBack({
					delta: 1
				});
				return uni.showToast({
					title: '参数错误',
					icon: 'none'
				});
			}
			this.id = (JSON.parse(e.detail)).id
			this.getData()
		},
		methods: {
			getData(){
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				this.$http.get('/order/'+this.id+'/get_ship_info',{},{
					token:true
				}).then(res=>{
					// 失败
					if(res.status !== 0){
						uni.navigateBack({
							delta: 1
						});
						return uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
					this.list = res.result.list
					// 物流状态
					let arr = {
						1:"在途中",
						2:"派件中",
						3:"已签收",
						4:"派送失败"
					};
					let title = arr[res.result.deliverystatus]
					if(title){
						uni.setNavigationBarTitle({ title })
					}
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
