<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<!-- tabbar -->
		<view class="d-flex bg-white border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2 text-muted" v-for="(item,index) in tabBars" :key="index" :class="{'active':index === tabIndex}"
			 @click="changTab(index)">{{item.name}}</view>
		</view>

		<!-- 订单列表 -->
		<block v-for="(item,index) in tabBars" :key="index">
			<order-list :item="item" v-show="tabIndex === index" @update="getOrderList"></order-list>
		</block>


		<!-- 为你推荐 -->
		<!-- 商品列表 -->
		<view class="" style="background-color: #F5F5F5;">
			<view class="d-flex font-md main_text_color font-weight  j-center pt-4 pb-2">
				为你推荐
			</view>
			<view class="d-flex a-center j-center position-relative pt-1 pb-5">
				<view class="position-absolute text-light-muted px-2" style="background-color: #F5F5F5;z-index: 2;">买了人还买了</view>
				<view class="position-absolute left-0 right-0" style="height: 2rpx;background-color: #ECECEC;">

				</view>
			</view>
			<view class="row bg-white ">
				<block v-for="(item2,index2) in hotList" :key="index2">
					<common-list :item="item2"></common-list>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	// 导入公共列表组件
	import commonList from '@/components/common/common-list.vue'
	// 导入没有订单提示组件
	import noThing from '@/components/common/no-thing.vue'
	// 导入没有订单提示组件
	import orderList from '@/components/order/order-list.vue'
	export default {
		components: {
			commonList,
			noThing,
			orderList
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "全部",
						no_thing: "no_pay",
						msg: "你还没有订单",
						key: 'all',
						list: [],
					},
					{
						name: "待付款",
						no_thing: "no_pay",
						msg: "你还没有待付款订单",
						key: 'paying',
						list: []
					},
					{
						name: "待收货",
						no_thing: "no_receiving",
						msg: "你还没有待收货订单",
						key: 'receiving',
						list: []
					},
					{
						name: "待评价",
						no_thing: "no_comment",
						msg: "你还没有待评价订单",
						key: 'reviewing',
						list: []
					}
				],
				// 热门数据
				hotList: [],
				// 原始数据
				originList: [],
				// 可视数据
				viewList: []
			}
		},
		methods: {
			// tabbar的切换
			changTab(index) {
				this.tabIndex = index
				this.getOrderList()
			},
			// 获取热门数据
			getHotList() {
				this.$http.get(`/goods/hotlist`).then(res => {
					console.log(res, '热门数据');
					// 商品推荐列表
					this.hotList = res.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_price,
							oprice: v.min_oprice
						}
					})
				})
			},
			getOrderList() {
				let index = this.tabIndex
				let type = this.tabBars[index].key
				this.$http.post(`/order/${type}`)
					.then(res => {
						this.originList = res
						this.viewList = res.slice(0, 10)
						let total_num = 0
						let order_items = []
						let skuArr = []
						this.tabBars[index].list = this.viewList.map(v1 => {
							total_num = 0
							order_items = []

							order_items = v1.order_items.map(v2 => {
								skuArr = []
								total_num += v2.num
								if (v2.skus_type === 1 && v2.goods_skus && v2.goods_skus.skus) {
									for (let v3 in v2.goods_skus.skus) {
										skuArr.push(v2.goods_skus.skus[v3].value)
									}
								}
								return {
									id: v2.goods_id,
									cover: v2.goods_item.cover,
									title: v2.goods_item.title,
									pprice: v2.price,
									attrs: skuArr.join(' '),
									num: v2.num
								}
							})

							return {
								id: v1.id,
								create_time: v1.create_time,
								status: this.$Util.formatStatus(v1),
								order_items: order_items,
								total_num: total_num,
								total_price: v1.total_price
							}
						})
						this.$nextTick(() => {
							console.log(this.tabBars[index].list, '封装数据');
						})
					}).catch(err => {
						console.log(err);
					})
			}
		},
		onLoad(e) {
			console.log(e);
			if (e.detail) {
				this.tabIndex = (JSON.parse(e.detail)).index
			}
			// 获取热门数据
			this.getHotList()
		},
		onShow() {
			// 获取订单列表
			this.getOrderList()
		}
	}
</script>

<style>
	.active {
		color: #FD6801 !important;
		border-bottom: 4rpx solid #FD6801;
		margin-bottom: -4rpx;
	}
</style>
