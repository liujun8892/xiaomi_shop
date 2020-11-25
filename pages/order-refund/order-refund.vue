<template>
	<view>
		<textarea v-model="reason" placeholder="请输入退款原因" class="uni-textarea p-2 border" />
		<view class="p-3">
			<button type="default" class="bg-white py-1 " @click="submit" :loading="loading" :disabled="reason.length === 0">申请退款</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				// 退款订单id
				id:'',
				reason: '',
				loading: false,
				disabled: true
			}
		},
		methods: {
			submit() {
				this.loading = true
				this.$http.post(`/order/${this.id}/apply_refund`,{reason:this.reason},{token: true}).then(res => {
					this.loading = false
					console.log(res);
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '申请成功, 等待商家处理',
						icon: 'none'
					});
				}).catch(err => {
					this.loading = false 
				})
			}
		},
		onLoad(e) {
			let detail = JSON.parse(e.detail) 
			this.id = detail.id
			if(!detail || !id) {
				uni.navigateBack({
					delta: 1
				});
				return uni.showToast({
					title: '参数错误',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>

</style>
