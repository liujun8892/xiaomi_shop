<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 兼容小程序端导航栏 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<view class="iconfont icon-xiaoxi d-flex align-center j-center font-lg text-center text-muted" style="width: 85rpx;height: 85rpx;line-height: 85rpx;"></view>
			<view class="flex-1 bg-light d-flex a-center" style="height: 65rpx;">
				<view class="iconfont icon-sousuo px-1 text-light-muted"></view>
				<view class="text-light-muted">智能积木 越野四驱车</view>
			</view>
			<view class="iconfont icon-richscan_icon d-flex align-center j-center font-lg text-center text-muted" style="width: 85rpx;height: 85rpx;line-height: 85rpx;"></view>
		</view>
		<!-- #endif -->


		<!-- scroll-view-x -->
		<scroll-view scroll-x class="scroll-row  border-bottom" style="height: 80rpx;" :scroll-into-view="tabId"
		 :scroll-with-animation="true">
			<block v-for="(item,index) in tabbars" :key="index">
				<view style="height: 80rpx;line-height: 80rpx;" class="scroll-row-item text-center px-3" :class="{'main_text_color':tabbarIndex===index}"
				 :id="'tab'+index" @tap="changeTab(index)">
					<view class="font-md" style="box-sizing: border-box; height: 80rpx; line-height: 80rpx; border-bottom: 5rpx solid transparent;"
					 :style="{'border-color':tabbarIndex===index?'#FD6801':'transparent'}">{{item.name}}</view>
				</view>
			</block>
		</scroll-view>

		<swiper :current="tabbarIndex" :style="{'height':scrollH + 'px'}" @change="onChangeSwiper" :duration="150">
			<!-- 遍历每一个页面 -->
			<swiper-item v-for="(item, index) in newsItem" :key="index">
				<scroll-view scroll-y="true" :style="{'height':scrollH + 'px'}" @scrolltolower="loadMore(item)">
					<template v-if="item.data.length >0">
						<!-- 遍历每一个页面中的数据 -->
						<block v-for="(item1,index1) in item.data">
							<!-- 轮播图 -->
							<template  v-if="item1.type==='swiper'">
								<view class="" @click="goSearch">
									<self-swiper :swiperList="item1.data" style="width: 100%;height: 350rpx;"  />
								</view>
								
							</template>
							

							<template v-else-if="item1.type === 'indexnavs'" >
								<!-- 删栏式nav -->
								<view class=""  @click="goSearch">
									<self-grid-nav :navGridList="item1.data" />
								</view>
								<!-- 分割线 -->
								<self-divider bgc="#F8F9FB" />
							</template>

							<template v-else-if="item1.type === 'threeAdv'">
								<!-- 3栏广告栏 -->
								<view  @click="goSearch">
									<self-three-adv :threeAdv="item1.data"   />
								</view>
								
								<!-- 分割线 -->
								<self-divider />
							</template>

							<!-- 卡片 -->
							<self-card v-else-if="item1.type==='oneAdv'" :headTitle="item1.data.title" :bodyCover="item1.data.cover" @click="openDetail" />

							<!-- 商品列表 -->
							<view class="row" v-else-if="item1.type==='list'">
								<block v-for="(item2,index2) in item1.data" :key="index2">
									<common-list :item="item2">小米商品{{index2}}</common-list>
								</block>
							</view>
						</block>
						<!-- 上拉加载 -->
						<load-more :status="item.loadStatus" v-if="item.loadShow === 'show'"></load-more>
					</template>
					<template v-else>
						<view class="d-flex j-center a-center pt-5" ><text class="font-md text-light-muted">{{item.firstLoad ? '加载中...' : '暂无数据'}}</text></view>
					</template>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 引入轮播图组件
	import selfSwiper from '@/components/index/self-swiper.vue'
	// 引入删栏nav组件
	import selfGridNav from '@/components/index/self-grid-nav.vue'
	// 引入3栏广告组件
	import selfThreeAdv from '@/components/index/self-three-adv.vue'
	// 引入大图卡片组件
	import selfCard from '@/components/common/self-card.vue'
	// 导入公共列表组件
	import commonList from '@/components/common/common-list.vue'
	// 上拉加载
	import loadMore from '@/components/uni/uni-load-more/uni-load-more.vue'
	//  定义mock数据
	// 模拟导航栏数据
	let demoTabbars = [{
		name: '推荐'
	}, {
		name: '体育'
	}, {
		name: '热点'
	}, {
		name: '财经'
	}, {
		name: '娱乐'
	}, {
		name: '军事'
	}, {
		name: '历史'
	}, {
		name: '本地'
	}]
	// 	模拟页面滑块首屏数据
	let demoNewsIndex = [{
		// 轮播图
		type: 'swiper',
		data: [{
			src: '/static/images/demo/demo4.jpg'
		}, {
			src: '/static/images/demo/demo4.jpg'
		}, {
			src: '/static/images/demo/demo4.jpg'
		}]
	}, {
		// 栅格导航小窗口
		type: 'navGrid',
		data: [{
				src: '/static/images/indexnav/1.png',
				text: '新品分类'
			},
			{
				src: '/static/images/indexnav/2.gif',
				text: '小米众筹'
			},
			{
				src: '/static/images/indexnav/3.gif',
				text: '以旧换新'
			},
			{
				src: '/static/images/indexnav/4.gif',
				text: '1分拼团'
			},
			{
				src: '/static/images/indexnav/5.gif',
				text: '超值特卖'
			},
			{
				src: '/static/images/indexnav/6.gif',
				text: '小米秒杀'
			},
			{
				src: '/static/images/indexnav/7.gif',
				text: '真心想要'
			},
			{
				src: '/static/images/indexnav/8.gif',
				text: '电视热卖'
			},
			{
				src: '/static/images/indexnav/9.gif',
				text: '家电热卖'
			},
			{
				src: '/static/images/indexnav/10.gif',
				text: '米粉卡'
			}
		]
	}, {
		// 3图广告
		type: 'threeAdv',
		data: {
			big: {
				src: '/static/images/demo/demo1.jpg'
			},
			smalltop: {
				src: '/static/images/demo/demo2.jpg'
			},
			smallbottom: {
				src: '/static/images/demo/demo2.jpg'
			}
		}
	}, {
		// 商品列表
		type: 'goodsList',
		data: [{
			cover: '/static/images/demo/list/1.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}, {
			cover: '/static/images/demo/list/2.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}, {
			cover: '/static/images/demo/list/3.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}, {
			cover: '/static/images/demo/list/4.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}, {
			cover: '/static/images/demo/list/5.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}, {
			cover: '/static/images/demo/list/6.jpg',
			title: '米家空调',
			desc: '1.5匹支持变频',
			pprice: 2199,
			oprice: 2699
		}]
	}]

	export default {
		components: {
			selfSwiper,
			selfGridNav,
			selfThreeAdv,
			selfCard,
			commonList,
			loadMore
		},
		data() {
			return {
				// 导航栏
				tabbars: [],
				// 页面滑块
				newsItem: [],
				// 导航栏索引
				tabbarIndex: 0,
				// 剩余高度
				scrollH: 500,
				// 导航栏滚动的id
				tabId: 'tab0',
				timer: null
			}
		},
		onLoad() {
			// 计算剩余可滚动的高度

			// #ifdef MP
			let navH = uni.upx2px(90)
			// #endif
			// #ifndef MP
			let navH = 0
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - uni.upx2px(82) - navH
				}
			})
			// 初始化数据
			this.__init()
		},
		methods: {
			// 去搜索页
			goSearch() {
				uni.navigateTo({
					url: '../search/search'
				});
			},
			// 初始化数据
			__init() {
				// 请求导航栏数据
				// this.tabbars = demoTabbars
				this.$http.get('/index_category/data')
					.then(res => {
						// 初始化tabbars
						this.tabbars = res.category
						console.log(this.tabbars, '导航栏数据....')
						// 初始化页面其他数据
						this.newsItem = this.setNewsItem(res)
						console.log(this.newsItem, '其他数据....')
					})
			},
			// 去详情页
			openDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail?id='+ 25
				});
			},
			// 定义首页导航栏下滑块的数据结构, 填充首页首屏数据
			setNewsItem(dt) {
				let arr = []
				let length = this.tabbars.length
				let item = {}
				for (let i = 0; i < length; i++) {
					item = {
						data: [],
						loadShow: 'hide',
						haveMore: true,
						refreshText: '下拉刷新',
						refreshShow: 'hide',
						firstLoad: true,
						loadtext: '上拉加载更多',
						loadStatus: 'more'
					}
					if (this.tabbars[i].template === 'index') {
						item.data = dt.data
						item.firstLoad = false
					}
					arr.push(item)
				}
				console.log(arr, '1111')
				return arr
			},
			// 滑块滑动加载数据
			getSliderData(callback = false, refresh = false) {
				let index = this.tabbarIndex
				console.log(this.tabbars, 'tabbar...');
				let tabbarId = this.tabbars[index].id
				let sliderPage = !refresh ? Math.ceil(this.newsItem[index].data.length / 5) + 1 : 1
				this.$http.get(`/index_category/${tabbarId}/data/${sliderPage}`).then(dt => {
					console.log(dt);
					let newData = dt
					// 当前滑块赋值 / 加载更多 或 下拉刷新
					this.newsItem[index].data = !refresh ? [...this.newsItem[index].data, ...newData] : [...newData],
						// 是否是第一次加载数据
						this.newsItem[index].firstLoad = false
					// 有没有更多数据
					this.newsItem[index].haveMore = newData.length === 5
					console.log(this.newsItem, '3333')
					console.log(this.newsItem[index].haveMore, 4444)
					// 执行上拉加载的回调
					if (typeof callback === 'function') callback()
				})
			},
			// 改变导航栏选中
			changeTab(index) {
				if (this.tabbarIndex === index) return
				// 改变选中索引
				this.tabbarIndex = index
				// 改变自动切换的导航栏id
				this.tabId = 'tab' + index
				// 请求页面数据

			},
			// 滑块的改变
			onChangeSwiper(e) {
				this.changeTab(e.detail.current)
				// 加载数据
				if (this.newsItem[this.tabbarIndex].firstLoad) this.getSliderData()
			},
			// 加载更多
			loadMore(item) {
				if (!item.haveMore) {
					item.loadStatus = 'noMore'
					return uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})

				}

				item.loadShow = 'show'
				item.loadStatus = 'loading'
				item.loadtext = '上拉加载更多'
				item.loadtext = '加载中...'
				this.getSliderData(() => {
					item.loadShow = 'hide'
					uni.showToast({
						title: '加载成功',
						icon: 'none'
					})
					item.loadtext = '上拉加载更多'
				})
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		onPullDownRefresh() {
			this.getSliderData(() => {
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
			}, true)
		}
	}
</script>

<style>
	.divider {
		width: 100%;
		height: 18rpx;
		background-color: #F8F9FB;
	}
</style>
