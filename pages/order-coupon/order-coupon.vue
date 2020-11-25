<template>
	<view style="min-height: 100%;background-color: #F5F5F5;">
		<!-- tabbar -->
		<view class="d-flex bg-white border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2 text-muted" v-for="(item,index) in tabBars" :key="index" :class="{'active':index === tabIndex}"
			 @click="changTab(index)">{{item.name}}</view>
		</view>

		<!-- 优惠券列表 -->
		<view class="px-2 py-3">
			<view v-for="(item,index) in tabBars" :key="index">
				<template v-if="item.list.length  > 0">
					<block class="" v-for="(item1,index1) in item.list" :key="index1">
						<order-coupon :item1="item1" :tabIndex="tabIndex" :index="index"  @click="useCoupon(item1)"></order-coupon>
					</block>
				</template>
				
				<no-thing :icon="item.no_thing" :title="item.msg" v-if="tabIndex === index && item.list.length === 0" />
				
			</view>
		</view>



	</view>
</template>

<script>
	// 导入没有订单提示组件
	import noThing from '@/components/common/no-thing.vue'
	import orderCoupon from '@/components/order-coupon/order-coupon.vue'
	export default {
		computed: {
			showList() {
				if (tabbarIndex === 0) {
					return item1.statue = true
				}
			}
		},
		components: {
			noThing,
			orderCoupon
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "有效",
						no_thing: "no_pay",
						msg: "你还没有可用的优惠券",
						page: 1,
						isvalid: 'valid',
						firstLoad: false,
						list: [],
					},
					{
						name: "已失效",
						no_thing: "no_pay",
						msg: "你还没有优惠券",
						page: 1,
						isvalid: 'invalid',
						firstLoad: false,
						list: []
					},
				],
			}
		},
		methods: {
			// tabbar的切换
			changTab(index) {
				this.tabIndex = index
				if(!this.tabBars[this.tabIndex].firstLoad) this.getUserCoupon()
			},
			// 获取用户领取的优惠券
			getUserCoupon(callback =false) {
				let index = this.tabIndex
				let page = this.tabBars[index].page
				let valid = this.tabBars[index].isvalid
				this.$http.get(`/usercoupon/${page}/${valid}`,{},{token: true})
					.then(res => {
						console.log(res, 'y优惠券');
						let status = valid === 'valid'
						this.tabBars[index].list = res.map( v => {
							return {
								id: v.id,
								type: v.coupon.type,
								title: v.coupon.name,
								start_time: v.coupon.start_time,
								end_time: v.coupon.end_time,
								price: v.coupon.value,
								desc: v.coupon.desc,
								status: v.coupon.status && status,
								disabled: v.used === 1
							}
						})
						this.tabBars[index].firstLoad = true
						if(typeof callback === 'function') callback()
					}).catch(()=>{
						uni.stopPullDownRefresh()
					})
			},
			// 使用优惠券
			useCoupon(item) {
				if(!item.status) {
					return uni.showToast({
						title:'优惠券已失效',
						icon:'none'
					})
				}
				if(item.disabled) {
					return uni.showToast({
						title:'优惠券已使用',
						icon:'none'
					})
				}
				
				
				uni.$emit('chooseCoupon',item)
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			this.getUserCoupon()
		},
		onPullDownRefresh() {
			this.getUserCoupon(()=>{
				uni.stopPullDownRefresh()
				uni.showToast({
					title:'刷新成功',
					icon:'none'
				})
			})
			
			
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
