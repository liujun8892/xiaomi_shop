<template>
	<view>
		<view class="main_bg_color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">{{status}}</view>
				<view class="font">{{timeDownText}}</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3 bg-white">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-2">{{address.name}}</text>
				{{address.phone}}
			</view>
			<view class="text-light-muted font-md">
				{{path}}
			</view>
		</view>
		<divider></divider>
		<view class="px-2">
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>
		<divider></divider>
		<uni-list-item>
			<text class="font-md text-light-muted">商品总价</text>
			<view slot="right" class="font-md text-light-muted">
				￥{{orderItemsPrice}}
			</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md text-light-muted">快递</text>
			<view slot="right" class="font-md text-light-muted">
				包邮
			</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md text-light-muted">优惠券</text>
			<view slot="right" class="font-md text-light-muted">
				{{coupon}}
			</view>
		</uni-list-item>
		<uni-list-item>
			<text class="font-md main-text-color">实际付款</text>
			<view slot="right" class="font-md text-light-muted">
				<price>{{total_price}}</price>
			</view>
		</uni-list-item>
		<divider></divider>
		<card headTitle="订单信息">
			<uni-list-item title="订单编号">
				<view slot="right" class="font-md text-light-muted">
					{{no}}
				</view>
			</uni-list-item>
		</card>
		<divider></divider>
		<card headTitle="退款记录" v-if="extra && status !== '退款成功'">
			<uni-list-item v-if="extra.refund_reason">
				<text class="font-md text-light-muted">申请退款</text>
				<view slot="right" class="font-md text-light-muted">
					{{extra.refund_reason}}
				</view>
			</uni-list-item>
			<uni-list-item v-if="extra.refund_disagree_reason">
				<text class="font-md text-light-muted">退款失败原因</text>
				<view slot="right" class="font-md text-light-muted">
					{{extra.refund_disagree_reason}}
				</view>
			</uni-list-item>
		</card>

		<view style="height: 150rpx;"></view>
		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p-2 font-md">
			<view class="d-flex a-center j-end">
				<template v-if="status === '待支付'">
					合计:
					<view class="ml-2">
						<price>{{total_price}}</price>
					</view>
					<view class="ml-2 px-2 py-1 text-white font-md main-bg-color" hover-class="main-bg-hover-color" style="border-radius: 80rpx;"
					@click="openPayMethods">
						去支付
					</view>
					<view class="ml-2 px-2 py-1 text-secondary font-md border" hover-class="bg-light" style="border-radius: 80rpx;"
					@click="closeOrder">
						取消订单
					</view>
				</template>
				<template v-else-if="status === '待发货'">
					<view class="ml-2 px-2 py-1 text-secondary font-md border" hover-class="bg-light" style="border-radius: 80rpx;"
					>
						提醒发货
					</view>
					<view class="ml-2 px-2 py-1 text-secondary font-md border" hover-class="bg-light" style="border-radius: 80rpx;"
					@click="applyRefund">
						申请退款
					</view>
				</template>
				
				<template v-else-if="status === '待收货'">
					<view class="ml-2 px-2 py-1 text-secondary font-md border" hover-class="bg-light" style="border-radius: 80rpx;"
					@click="openLogistics">
						物流信息
					</view>
					<view class="ml-2 px-2 py-1 text-white font-md main-bg-color" hover-class="main-bg-hover-color" style="border-radius: 80rpx;"
					@click="received">
						确认收货
					</view>
				</template>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	let timer = null
	import orderListItem from "@/components/order-detail/order-list-item.vue"
	import uniListItem from "@/components/order-detail/uni-list-item/uni-list-item.vue"
	import price from '@/components/order-detail/price.vue';
	import card from '@/components/order-detail/card.vue';
	import $T from '@/common/lib/time.js';
	export default {
		components: {
			orderListItem,
			uniListItem,
			price,
			card
		},
		data() {
			return {
				loading:false,
				no:"",
				id:0,
				address:{
					province: "",
					city: "",
					district: "",
					address: "",
					name: "",
					phone: "",
				},
				create_time:0,
				now_time:0,
				end_time:0,
				order_items:[],
				total_price:0.00,
				paid_time:null,
				refund_status:null,
				ship_status:null,
				coupon:"未使用",
				timeDown:"",
				extra:{}
			}
		},
		onLoad(e) {
			this.id = parseInt(e.id)
		},
		onShow() {
			this.getData()
		},
		beforeDestroy() {
			if(timer){
				clearInterval(timer)
			}
		},
		computed: {
			status(){
				return this.$Util.formatStatus({
					paid_time:this.paid_time,
					refund_status:this.refund_status,
					ship_status:this.ship_status,
				})
			},
			total_num() {
				return this.order_items.length 
			},
			orderItemsPrice(){
				let price = 0
				this.order_items.forEach(item=>{
					price += (parseFloat(item.pprice)*item.num).toFixed(2)
				})
				return price
			},
			path(){
				return `${this.address.province} ${this.address.city} ${this.address.district} ${this.address.address}`
			},
			timeDownText(){
				let msg = ''
				switch (this.status){
					case '待支付':
					msg = '取消'
						break;
					case '待收货':
					msg = '确认'
						break;
					case '待发货':
					return '等待商家发货'
						break;
					case '退款中':
					return '等待商家审核'
						break;
					case '已签收':
					return '订单已签收'
						break;
				}
				if(msg !== '' && this.timeDown !== ''){
					return `还差 ${this.timeDown} 自动${msg}`
				} 
				return ''
			}
		},
		methods:{
			// 确认收货
			received(){
				uni.showLoading({
					title: '确认收货中...',
					mask: false
				});
				this.$http.post('/order/'+this.id+'/received',{},{
					token:true
				}).then(res=>{
					this.getData()
					uni.showToast({
						title: '确认收货成功',
						icon: 'none'
					});
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			// 关闭订单
			closeOrder(){
				uni.showLoading({
					title: '取消订单中...',
					mask: false
				});
				this.$http.post('/closeorder/'+this.id,{},{
					token:true
				}).then(res=>{
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '取消订单成功',
						icon: 'none'
					});
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			// 查看物流信息
			openLogistics(){
				uni.navigateTo({
					url: '../logistics-detail/logistics-detail?detail='+JSON.stringify({
						id:this.id
					})
				});
			},
			// 申请退款
			applyRefund(){
				// 跳转到支付页
				uni.navigateTo({
					url: '../order-refund/order-refund?detail='+JSON.stringify({
						id:this.id
					})
				});
			},
			// 支付
			openPayMethods(){
				// 跳转到支付页
				uni.navigateTo({
					url: '../pay-methods/pay-methods?detail='+JSON.stringify({
						id:this.id,
						totalPrice:this.total_price
					})
				});
			},
			openTimeDown(){
				if(this.status === '待支付' || this.status === '待收货'){
					if(timer) clearInterval(timer)
					timer = setInterval(()=>{
						let now = new Date().getTime()/1000
						if(now > this.end_time){
							uni.showToast({
								title: this.status === '待支付' ? '订单已关闭' : '订单已确认收货',
								icon:"none"
							});
							this.timeDown = ''
							clearInterval(timer)
							return uni.switchTab({
								url:"../index/index"
							})
						}
						this.timeDown = $T.timeDown(this.end_time)
						console.log(this.timeDown);
					},1000)
				}
			},
			getData(){
				this.$http.get('/order/'+this.id,{},{
					token:true
				}).then(res=>{
					// 额外数据
					if(res.extra){
						this.extra = res.extra
					}
					
					this.no = res.no
					this.paid_time = res.paid_time
					this.refund_status = res.refund_status
					this.ship_status = res.ship_status
					this.create_time = res.create_time
					this.end_time = res.end_time
					this.total_price = res.total_price
					// 优惠券
					if(res.couponUserItem && !Array.isArray(res.couponUserItem)){
						let {type,value} = res.couponUserItem.coupon
						this.coupon = type === 1 ? value+'折优惠' : '-'+value + '元';
					}
					// 商品
					this.order_items = res.orderItems.map(item=>{
						let attrs = []
						if(item.goodsSkus){
							let skus = item.goodsSkus.skus
							if(skus){
								for (let k in skus) {
									attrs.push(skus[k].value)
								}
							}
						}
						return {
							id:item.goodsItem.id,
							cover:item.goodsItem.cover,
							title:item.goodsItem.title,
							pprice:item.price,
							attrs:attrs.join(','),
							num:item.num,
						}
					});
					// 地址
					this.address = res.address
					// 开启倒计时
					this.openTimeDown()
				}).catch(err=>{
					console.log(err);
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					});
					uni.navigateBack({
						delta: 1
					});
				})
			}
		} 
	}
</script>

<style>

</style>
