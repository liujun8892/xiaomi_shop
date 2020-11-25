<template>
	<view>
		<!-- 头部 -->
		<view class="main_bg_color position-relative" style="min-height: 420rpx;">
			<view class="px-4 d-flex a-center j-sb text-white position-absolute" style="top: 180rpx;left: 0;right: 0;">
				<view class="">
					<view style="font-size: 36rpx;">卖家已发货</view>
					<view class="font">还差7天10时自动确认</view>
				</view>
				<view class="iconfont icon-daishouhuo " style="font-size: 100rpx;"></view>
			</view>
		</view>
		<!-- 用户信息 -->
		<view class="p-2">
			<view class="">
				<text style="font-size: 35rpx;" class="pr-2 text-dark">雷军</text>
				<text class="text-light-muted">135****3456</text>
			</view>
			<view class="text-light-muted">广东省 深圳市 南山区 深圳湾</view>
		</view>
		<self-divider />
		<!-- 商品列表 -->
		<view class="p-2 ">
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :item3="item"></order-list-item>
			</block>
		</view>
		<self-divider />
		<!-- 商品的其他信息 -->
		<view class="p-2 d-flex a-center j-sb text-muted font-md border-bottom">
			<view class="">商品总价</view>
			<view class="">￥102.01</view>
		</view>
		<view class="p-2 d-flex a-center j-sb text-muted font-md border-bottom">
			<view class="">快递</view>
			<view class="">￥10</view>
		</view>
		<view class="p-2 d-flex a-center j-sb text-muted font-md border-bottom">
			<view class="">优惠券</view>
			<view class="">-20.01</view>
		</view>
		<view class="p-2 d-flex a-center j-sb text-muted font-md border-bottom">
			<view class="main_text_color">实际付款</view>
			<price>90.00</price>
		</view>
		<self-divider></self-divider>
		<card headTitle="订单信息">
			<view class="p-2 pl-4 d-flex a-center j-sb  font-md border-bottom">
				<view class="">订单编号</view>
				<view>123123123</view>
			</view>
		</card>

	</view>
</template>

<script>
	import orderListItem from '@/components/order/order-list-item.vue'
	import price from '@/components/common/price.vue'
	import card from '@/components/common/self-card.vue'
	export default {
		components: {
			orderListItem,
			price,
			card
		},
		data() {
			return {
				order_items: [{
					cover: "/static/images/demo/demo6.jpg",
					title: "小米8",
					pprice: 1999.00,
					attrs: "金色 标配",
					num: 1
				}],
				loading: false,
				no: "",
				id: 0,
				address: {
					province: "",
					city: "",
					district: "",
					address: "",
					name: "",
					phone: "",
				},
				create_time: 0,
				now_time: 0,
				end_time: 0,
				order_items: [],
				total_price: 0.00,
				paid_time: null,
				refund_status: null,
				ship_status: null,
				coupon: "未使用",
				timeDown: "",
				extra: {}
			}
		},
		methods: {

		},
		onLoad(e) {
			console.log(e, '订单详情id');
		}
	}
</script>

<style>

</style>
