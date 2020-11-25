<template>
	<view style="min-height: 100%;background-color: #F5F5F5;">
		<!-- 地址 -->
		<view class="d-flex j-sb a-center main_bg_color" style="padding: 60rpx 35rpx 80rpx 35rpx;" @click="navigate(pages.addrList)">
			<view class="text-white">
				<template v-if="addr">
					<view class="d-flex a-center">
						<view class="font-md font-weight">
							{{addr.name}}
						</view>
						<view class="ml-1 font-md ">
							{{addr.phone}}
						</view>
						<view class=" border border-white rounded ml-1 line-h-sm" style="border-width: 2rpx;padding: 3rpx 13rpx;" v-if="addr.isdefault">
							默认
						</view>
					</view>
					<view class="">{{addr.province}} {{addr.city}} {{addr.district}}</view>
				</template>
				<view class="font-lg font-weight py-1" v-else>
					请选择收货地址
				</view>
			</view>
			<view class="iconfont icon-you font-md" style="color: rgba(255,255,255,0.5);"></view>
		</view>
		<!-- 选项列表 -->
		<view class="bg-white" style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx; margin-top: -25rpx;overflow: hidden;">
			<template v-if="goodsList.length >0">
				<list-item :leftIconShow="false" title="你好">
					<view class="d-flex a-center">
						<block v-for="(item,index) in goodsList">
							<image :src="item.cover" mode="" style="width: 90rpx;height: 90rpx;" class="rounded mr-1" :key="index" v-if="item.cover"></image>
						</block>
					</view>
					<view slot="rightText" class="mr-1">
						共{{goodsNum}}件
					</view>
				</list-item>
			</template>
			<list-item :leftIconShow="false" title="商品总价" :showRightArrow="false">
				<view slot="rightText">
					<price color="text-dark" style="font-weight: bold;">{{totalPrice}}</price>
				</view>
			</list-item>
			<list-item :leftIconShow="false" title="运费" :showRightArrow="false">
				<view slot="rightText">
					包邮
				</view>
			</list-item>
			<view class="" @click="navigate(pages.orderCoupon)">
				<list-item :leftIconShow="false" title="优惠券">
					<view slot="rightText" :class="couponCount > 0 ? 'main_text_color' : 'text-light-muted'">
					<text v-if="coupon">{{couponText}}</text>
					<text v-else>{{couponCount > 0 ? couponCount + '张可用' : '无可用'}} </text>	
					</view>
				</list-item>
			</view>
			<list-item :leftIconShow="false" title="小计" class="main_text_color" :showRightArrow="false">
				<view slot="rightText" class="text-light-muted">
					<price style="font-weight: bold;">{{finalPrice}}</price>
				</view>
			</list-item>
			<self-divider />
			<view class="" @click="navigate(pages.orderInvoice)">
				<list-item :leftIconShow="false" title="发票">
					<view slot="rightText" class="mr-1">
						{{invoice}}
					</view>
				</list-item>
			</view>

		</view>
		<!-- 底部控件 -->
		<view class="position-fixed left-0 right-0 bottom-0 d-flex j-end b-box pr-3 bg-white a-center" style="height: 100rpx;">
			<view class="">合计:</view>
			<price class="font-weight" style="margin: 0 15rpx;">{{finalPrice}}</price>
			<view class="d-flex a-center j-center px-3 py-1 text-white" style="border-radius: 70rpx;" :class="confirmLoading ? 'bg-secondary' : 'main_bg_color'"  @click="openPayMethod(pages.payMethod)">{{confirmLoading ? '加载中': '去付款'}}</view>
		</view>
	</view>
</template>

<script>
	import listItem from '@/components/common/list-item.vue'
	import price from "@/components/common/price.vue"
	import {
		mapGetters,
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState({
				cartList: state => state.cart.list
			}),
			...mapGetters(['defalutAddr','totalPrice']),
			// 商品总件数
			goodsNum() {
				let count = 0
				this.goodsList.forEach( v => count += v.num)
				return count
			},
			// 优惠券文字显示
			couponText() {
				if(!this.coupon) return
				if(this.coupon.type === 1) {
					return this.coupon.price.split('\.')[0] + '折'
				}
				return '-' + this.coupon.price + '元'
			},
			// 最后价格
			finalPrice() {
				if(!this.coupon) return this.totalPrice
				// 满减
				if(this.coupon.type === 0){
					 return (this.totalPrice - parseFloat(this.coupon.price)).toFixed(2) 
				}
				// 折扣
				if(this.coupon.type === 1) {
					 return (this.totalPrice * (parseFloat(this.coupon.price) / 10)).toFixed(2) 
				}
			}
		},
		components: {
			listItem,
			price
		},
		data() {
			return {
				// 地址
				addr: false,
				// 要支付的商品
				goodsList: [],
				// 当前订单可用优惠券数量
				couponCount: 0,
				// 优惠券
				coupon: null,
				// 发票
				invoice: '电子发票-个人',
				// 商品的ids
				goodsIds: [],
				// 防止重复下单
				confirmLoading: false,
				// 跳转页面
				pages: {
					addrList: '../user-address-list/user-address-list?type=choose',
					orderInvoice: '../order-invoice/order-invoice',
					payMethod: '../pay-method/pay-method',
					orderCoupon: '../order-coupon/order-coupon'
				},
				// 订单id
				orderId: 0,
			}
		},
		methods: {
			navigate(url) {
				if (!url) return
				uni.navigateTo({
					url: url
				});
			},
			// 获取当前订单可用优惠券数量
			getCouponCount() {
				this.$http.post(`/coupon_count`,{price: 100.00},{token: true})
					.then(res => {
						this.couponCount = res
					})
			},
			// 下单
			openPayMethod(url) {
				if(this.confirmLoading) return
				// 验证收货地址
				if(!this.addr) {
					return uni.showToast({
						title: '请先选择收货地址',
						icon: 'none'
					});
				}
				let params = {}
				params.user_addresses_id = this.addr.id
				params.items = this.goodsIds.join(',')
				if(this.coupon) params.coupon_user_id = this.coupon.id
				console.log(params);
				this.confirmLoading = true
				this.$http.post(`/order`,params,{token:true})
					.then(res => {
						console.log(res,'订单...');
						this.orderId = res.id
						let params2 = {
							id: res.id,
							price: res.total_price
						}
						// 更新购物车数据
						uni.$emit('updateCartData')
						this.confirmLoading = false
						uni.navigateTo({
							url: url + '?params=' +  JSON.stringify(params2),
						});
					})
			}
		},
		onLoad(e) {
			if (!e.goodsIds) {
				uni.showToast({
					title: '请先选择要支付的商品',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			// 获取支付商品列表
			let goodsIds = JSON.parse(e.goodsIds)
			this.goodsIds = goodsIds
			this.goodsList = goodsIds.map(v => {
				return this.cartList.find(v2 => v2.id === v)
			})
	
			this.getCouponCount()

			this.addr = this.defalutAddr.length > 0 ? this.defalutAddr[0] : false
			// 注册选择地址事件
			uni.$on('chooseAddr', (e) => {
				console.log(e, '1111');
				this.addr = e
			})
			// 注册选择优惠券事件
			uni.$on('chooseCoupon', (e) => {
				console.log(e, '1111');
				this.coupon = e
			})
			// 注册选择发票事件
			uni.$on('chooseInvoice', (e) => {
				console.log(e, '1111');
				this.invoice = e
			})
			
		},
		onShow() {
			if(this.orderId) {
				uni.redirectTo({
					url:'../order-detail/order-detail?id=' + this.orderId 
				})
			}
		},
		onUnload() {
			uni.$off('chooseAddr', () => {
				console.log('卸载了选择地址监听...');
			})
			uni.$off('chooseInvoice', () => {
				console.log('卸载了发票监听...');
			})
			uni.$off('chooseCoupon', () => {
				console.log('卸载了优惠券监听...');
			})
		}
	}
</script>

<style>

</style>
