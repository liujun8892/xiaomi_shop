<template>
	<view>
		<!-- 优惠券列表 -->
		<block class="" v-for="(item1,index1) in list" :key="index1">
			<coupon :item1="item1" @click="getCoupon(item1)">
				<view class="main_text_color bg-white rounded px-2" :class="{'text-secondary':item1.disabled || !item1.status}">{{item1.status ?item1.disabled?'已领取' : '立即领取':'已失效'}}
				</view>
			</coupon>
		</block>

		<!-- 上拉加载 -->
		<load-more :status="loadStatus" v-if="loadShow &&  list.length > 0"></load-more>

		<view class="position-relative " v-if="loadStatus === 'noMore' && list.length===0" style="width: 750rpx;height: 93vh; background-color: #F5F5F5;">
			<no-thing title="空空如也~" class="position-absolute" style="top: 50%;transform: translateY(-50%);"></no-thing>
		</view>
		
		
	</view>
</template>

<script>
	// 导入优惠券组件
	import coupon from '@/components/order-coupon/order-coupon.vue'
	export default {
		components: {
			coupon
		},
		data() {
			return {
				// 优惠券列表页码
				page: 1,
				// 优惠券列表
				list: [],
				// 上拉加载
				loadStatus: 'more',
				// 上拉加载控件显示
				loadShow: false
			}
		},
		methods: {
			// 获取优惠券列表
			getData(refresh =false) {
				return new Promise((res, rej) => {
					this.$http.get(`/coupon/${this.page}`, {}, {
						token: true
					}).then(result => {
						let time = new Date().getTime() / 1000
						let status = null
						let list2 =  result.map(v => {
							status = v.end_time > time && v.status
							return {
								id: v.id,
								title: v.name,
								start_time: v.start_time,
								end_time: v.end_time,
								price: v.value,
								desc: v.desc,
								status: status, // 未过期
								disabled: v.coupon_user.length > 0 // 0 用户已领取 1 未领取
							}
						})
						this.list = refresh ? [...list2] : [...this.list,...list2],
						this.loadStatus = list2.length < 10 ? 'noMore' : 'more'
						res(result)
					}).catch(err => {
						rej(err)
					})
				})
			},
			// 领取优惠券
			getCoupon(item) {
				console.log(item);
				this.$http.post(`/getcoupon/${item.id}`, {}, {
						token: true
					})
					.then(res => {
						console.log(res);
						// 优惠券设为已领取过了
						item.disabled = true
						uni.showToast({
							title: '领取成功',
							icon: 'none'
						})
					})
			}
		},
		// 上拉加载
		onReachBottom() {
			this.loadShow = true
			if(this.loadStatus !== 'more') return
			this.page++
			this.loadStatus = 'loading'
			this.getData().then(res => {
				uni.showToast({
					title: '加载成功',
					icon:'none'
				});
			}).catch(err => {
				this.page --
				this.loadStatus = 'noMore'
			})
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getData(true)
				.then(res => {
					uni.stopPullDownRefresh()
					uni.showToast({
						title: '刷新成功',
						icon: 'none'
					});
				})
				.catch(err => {
					uni.stopPullDownRefresh()
				})
		},
		onLoad() {
			this.getData(true)
		}
	}
</script>

<style>

</style>
