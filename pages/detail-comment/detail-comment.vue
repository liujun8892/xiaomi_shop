<template>
	<view>
		<view class="b-box px-2">
			<view class="border-bottom py-2 d-flex a-center" style="height: 100%;">
				<text class="text-muted ">用户评价</text>
				<text class="text-muted ">({{this.commentInfo.total}})</text>
				<text class="main_text_color ml-auto" style="padding-right: 5rpx;">{{this.commentInfo.good_rate * 100}}%</text>
				<text class="text-muted ">满意</text>
			</view>
		</view>

		<view class="b-box px-2 pb-2">
			<view class="d-flex flex-wrap a-center ">
				<view class="px-2 mr-2 rounded py-1 mt-2 cate-item" v-for="(item,index) in cateList" :key="index" :class="{'active':index === cateIndex}"
				 @click="changeCate(index)">
					{{item.name}}
				</view>
			</view>
		</view>

		<self-divider />

		<view class="">
			<view class="p-2 border-bottom" v-for="(item,index) in commentList" :key="index">
				<view class="d-flex">
					<image :src="item.user.avatar" style="width: 100rpx;height: 100rpx;" class="rounded flex-shrink mr-2" mode="" v-if="item.user.avatar"></image>
					<view class="flex-1">
						<view class="d-flex align-center">
							<text class="text-primary">{{item.user.nickname}}</text>
							<text class="iconfont icon-xihuan main_text_color ml-auto pr-1"></text>
							<text class="main_text_color">{{item.rating | getRating}}</text>
						</view>
						<view class="line-h-md font-md pb-2">
							{{item.review.data}}
						</view>
						<image :src="item.review.image" mode="widthFix" style="width: 360rpx;" v-if="item.review.image"></image>
						<view class="d-flex a-center text-light-muted">
							<text>{{item.review_time}}</text>
							<text class="ml-auto">{{item.goods_num}}</text>
							<text class="iconfont icon-dianzan pl-1 pr-3" style="transform: translateY(-4rpx);"></text>
							<!-- <text>1</text> -->
							<text class="iconfont icon-pinglun pl-1" style="transform: translateY(-4rpx);"></text>
						</view>
						<view class="bg-light-secondary rounded p-2 d-flex flex-wrap a-center mt-1" v-for="(item2,index2) in item.extra" :key="index2">
							<text class="main_text_color">官方回复：</text>
							{{item2.data}}
							<view class="iconfont icon-dianzan text-light-muted line-h-md font ml-auto">
								<text class="text-muted pl-1">赞客服 {{item2.good_num}}</text>
							</view>
						</view>
					</view>
				</view>
			
			</view>
		</view>

		<!-- 上拉加载 -->
		<load-more :status="loadStatus" v-if="loadShow"></load-more>
	</view>
</template>

<script>
	export default {
		filters: {
			getRating(rating) {
				if (rating === 3) {
					return '中评'
				} else if (rating > 3) {
					return '好评'
				} else {
					return '差评'
				}
			}
		},
		data() {
			return {
				goodsId: -1,
				cateIndex: 0,
				cateList: [{
						name: "全部",
						value: ''
					},
					{
						name: "好评",
						value: '/good'
					},
					{
						name: "中评",
						value: '/middle'
					},
					{
						name: "差评",
						value: '/bad'
					},
				],
				commentList: [],
				commentInfo: {},
				loadStatus: 'more',
				loadShow: false,
				page: 1
			}
		},
		methods: {
			changeCate(index) {
				this.cateIndex = index
				uni.showLoading({
					title: '加载中'
				})
				this.getData(true, () => {
					uni.hideLoading()
					uni.showToast({
						title: '加载成功',
						icon: 'none'
					})
				})
			},
			__init() {
				this.$http.get(`/goods/${this.goodsId}/comments`).then(res => {
					console.log(res, '评论数据....');
					this.commentList = res.list
					this.commentInfo = res
				})
			},
			getData(refresh = false, callback = false) {
				this.loadStatus = 'loading'
				let commentType = this.cateList[this.cateIndex].value
				this.$http.get(`/goods/${this.goodsId}/comments${commentType}?page=${this.page}`).then(res => {
					console.log(res, '评论数据....');

					this.commentList = !refresh ? [...this.commentList, ...res.list] : [...res.list]
					this.loadStatus = res.list.length < 10 ? 'noMore' : 'more'
					if (typeof callback === 'function') callback()
				})
			}
		},
		onReachBottom() {
			if (this.loadStatus === 'noMore') return
			this.page++
			this.loadShow = true
			this.loadStatus = 'more'
			this.getData()
		},
		onPullDownRefresh() {
			this.getData(true, () => {
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '加载成功',
					icon: 'none'
				})
			})
		},
		onLoad(options) {
			if (!options.id) return
			this.goodsId = options.id
			this.__init()
		}
	}
</script>

<style>
	.cate-item {
		background: #FFEBEC;
		color: #7B6D6C;
		border-color: #F4E0E1;
	}

	.cate-item.active {
		background: #FF6B01 !important;
		color: #FFFFFF !important;
		border-color: #DE7232 !important;
	}
</style>
