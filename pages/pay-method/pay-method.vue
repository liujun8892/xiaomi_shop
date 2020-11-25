<template>
	<view>
		<view class="d-flex a-center j-center py-5 flex-column">
			<view class="text-light-muted mb-1" >支付金额</view>
			<price priceSize="font-lg" unitSize="font-md" :unitY="5">{{payPrice}}</price>
		</view>
		<view class="px-2" >
			
			<view class="p-2 border-bottom d-flex a-center"  @click="changePayType(0)">
				<view class="iconfont icon-zhifubao text-primary" style="font-size: 60rpx;"></view>
				<view class="ml-2">
					<view class="line-h-md">支付宝支付</view>
					<view class="text-light-muted line-h-md font">推荐使用支付宝支付</view>
				</view>
				<radio class="ml-auto" color="#FD6801" :checked="payType === 0"></radio>
			</view>
			
			<view class="p-2 border-bottom d-flex a-center" @click="changePayType(1)">
				<view class="iconfont icon-weixinzhifu text-success" style="font-size: 60rpx;"></view>
				<view class="ml-2">
					<view class="line-h-md font-md">推荐使用微信支付</view>
				</view>
				<radio class="ml-auto" color="#FD6801" :checked="payType === 1" ></radio>
			</view>
			<view class="d-flex a-center j-center text-white mt-5 rounded main_bg_color" style="width: 100%;height: 100rpx;" hover-class="main_bg_hover_color" @click="goPayResult">
				{{  payType === 0 ? '支付宝支付' : '微信支付'}}
			</view>
			
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue'
	export default {
		components:{
			price
		},
		computed:{
			payTypeText() {
				return this.payType === 0 ? 'alipay' : 'wxpay'
			},
		},
		data() {
			return {
				// 0 支付宝 1微信
				payType:0,
				// 支付id
				payId: -1,
				// 支付价格
				payPrice: 0,
				// 支付loading
				payLoading: false
			}
		},
		onLoad(e) {
			if(!e.params) return
			let detail  = JSON.parse(e.params)
			console.log(detail);
			this.payId = detail.id
			this.payPrice = detail.price
		},
		methods: {
			changePayType(type) {
				this.payType = type
			},
			goPayResult() {
				
				if(this.payLoading) return
				this.payLoading = true
				this.$http.get(`/payment/${this.payId}/${this.payTypeText}`,{},{token:true,native:true})
					.then(res => {
						console.log(res,'支付相关');
						uni.requestPayment({
							provider: this.payTypeText,
							orderInfo: res.data,
							success: res => {
								console.log(res,'成功');
								uni.redirectTo({
									url:'../pay-result/pay-result?detail=' + JSON.stringify({success: true})
								})
							},
							fail: (err) => {
								uni.showModal({
									content: '支付失败:' + err.errMsg,
									showCancel: false
								});
							},
							complete: () => {this.payLoading = false}
						});
					}).catch(err => {
						console.log(err);
					})
				
				return
				uni.navigateTo({
					url: '../pay-result/pay-result'
				});
			}
		}
	}
</script>

<style>

</style>
