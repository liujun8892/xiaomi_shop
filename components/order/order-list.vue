<template>
	<view class="bg-white" >
		<block v-for="(item2,index2) in item.list" :key="index2">
			<template v-show="item.list.length > 0">
				<self-divider />
				<view class="" >
					<view class="px-2 py-3 d-flex j-sb border-light-secondary border-bottom" style="border-width: 2rpx;"  @click="goOrderDetail">
						<view class="text-light-muted font-md">{{item2.create_time}}</view>
						<view class="main_text_color font-md">{{item2.status}}</view>
					</view>
					<view class="px-2" v-for="(item3,index3) in item2.order_items" :key="index3">
						<order-list-item :item3="item3" @click="goOrderDetail(item2)"></order-list-item>
					</view>
					<view class="px-2 py-1">
						<view class="text-dark text-right py-2">
							共{{item2.total_num}}件商品, 合计: ￥{{item2.total_price}}
						</view>
						<view class="d-flex a-center j-end  pb-2">
							<template v-if="item2.status === '待支付'">
								<common-button @click="closeOrder(item2)">取消订单</common-button>
								<common-button color="orange" @click="openPay(item2)">去付款</common-button>
							</template>
							<template v-else-if="item2.status === '待发货'">
								<common-button @click="openRefund(item2)">申请退款</common-button>
								<common-button color="orange">提醒发货</common-button>
							</template>
							<template v-else-if="item2.status === '待收货'">
								<common-button @click="openLogistics">查看物流</common-button>
								<common-button @click="confirmCompeleted(item2)" color="orange">确认收货</common-button>
							</template>
							<template v-else>
								<common-button color="orange">查看详情</common-button>
							</template>
							
						</view>
					</view>
				</view>
			</template>
		</block>
		<!-- 没有订单提示 -->
		<no-thing :icon="item
		.no_thing" :title="item.msg"  v-show="item.list.length === 0" />
	</view>
</template>

<script>
	// 导入没有订单提示组件
	import noThing from '@/components/common/no-thing.vue'
	// 导入没有订单提示组件
	import orderListItem from './order-list-item.vue'
	// 导入公共按钮组件
	import commonButton from '../common/common-button.vue'
	export default {
		components:{
			noThing,
			orderListItem,
			commonButton
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		methods:{
			goOrderDetail(item) {
				uni.navigateTo({
					url: '/pages/order-detail/order-detail?id=' + item.id
				});
			},
			goLogisticsDetail() {
				uni.navigateTo({
					url: '/pages/logistics-detail/logistics-detail',
				});
			},
			goAfterSales() {
				uni.navigateTo({
					url: '/pages/after-sales/after-sales'
				})
			},
			// 关闭订单
			closeOrder(item2) {
				uni.showModal({
					content: '是否要取消订单',
					success: res => {
						if(res.confirm) {
							uni.showLoading({
								title: '取消订单中',
								mask: false
							});
							this.$http.post(`/closeorder/${item2.id}`,{},{
								token: true
							}).then(res => {
								console.log(res,'取消订单');
								uni.showToast({
									title: '取消成功',
									icon: 'none'
								});
								this.update()
							}).catch(err => {
								uni.hideLoading()
							})
						}
					}
				});
			},
			// 去支付
			openPay(item2) {
				let params = {
					id: item2.id,
					price: item2.total_price
				}
				uni.navigateTo({
					url: '/pages/pay-method/pay-method?params=' + JSON.stringify(params),
				});
			},
			// 更新数据
			update() {
				this.$emit('update')
			},
			// 申请退款
			openRefund(item2) {
				uni.navigateTo({
					url: '/pages/order-refund/order-refund?detail=' + JSON.stringify(item2)
				});
			},
			// 查看物流
			openLogistics(item2) {
				uni.navigateTo({
					url:'/pages/logistics-detail/logistics-detail?detail=' + JSON.stringify(item2)
				})
			},
			// 确认收货
			confirmCompeleted(item2) {
				uni.showModal({
					content: '是否要确认收货',
					success: res => {
						if(res.confirm) {
							uni.showLoading({
								title:'确认收货中...',
								mask:false
							})
							this.$http.post(`/order/${item2.id}/received`,{},{token: true}).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: '收货成功'
								});
								this.update()
							}).catch(err => {
								uni.hideLoading()
							})
						}
						
					},
				});
			}
		}
	}
</script>

<style>
</style>
