<template>
	<view style="height: 100%;" class="animated fadeIn faster content_H">
		<view class="d-flex" style="height: 100%;">
			<scroll-view scroll-y="true" style="width: 162rpx;height: 100%;" id="leftScrollBox"
			 :scroll-top="leftScrollTop">
				<view style="width: 100%;height: 100rpx;line-height: 100rpx;box-sizing: border-box;" class="border-bottom border-right text-center position-relative left_item"
				 v-for="(item,index) in leftCates" :key="index" @click="changeClassfiy(index + 1)">
					<text :class="{'classify_active':classfiyIndex === index+1}">{{item.name}}</text>
					<view v-show="classfiyIndex===index + 1" class="position-absolute" style="height: 68rpx;width: 6rpx;left: 0;top: 50%;transform: translateY(-50%);background: #FD6801;"></view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="flex-1" style="height: 100vh;padding-bottom: bottom: var(--window-bottom);" :scroll-top="rightScrollTop"
			 :scroll-with-animation="true" @scroll="rightScroll">
				<view v-for="(item,index) in rightCateGoods" :key="index" class="right_item">
					<view class="font-md font-weight mb-3">
						{{item.name}}
					</view>
					<view class="d-flex flex-wrap" v-if="item.list.length > 0" >
						<view class="d-flex flex-column a-center" style="width: 186rpx;height: 182rpx;margin-bottom: 60rpx;justify-content: space-between;"
						 v-for="(item1,index1) in item.list" :key="index1" @click="openDetail(item1)">
							<image :src="item1.cover" style="width: 120rpx;height: 120rpx;" mode="" v-if="item1.cover"></image>
							<view class="">
								{{item1.name}}
							</view>
						</view>
					</view>
					<view class="position-relative" v-else style="width: 100%;height: 100vh;background-color: #F5F5F5;">
						<no-thing class="position-absolute" style="top: 50%;transform: translateY(-50%);" title="暂时还没有上架该分类的商品~"></no-thing>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 缓冲动画 -->
		<!-- <loading :show="loading" /> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 选中的分类索引
				classfiyIndex: 1,
				// 左边分类列表
				leftCates: [],
				// 右边商品列表
				rightCateGoods: [],
				// 左边每个元素的高度
				leftItemsTop: [],
				// 右侧每块元素高度
				rightItemsTop: [],
				// 左边滚动高度
				leftScrollTop: 0,
				// 右边滚动高度
				rightScrollTop: 0,
				// 左侧每一个元素的高度
				leftItemHeight: 0,
				query: null,
				rightFilterArr: [],
				timer: null,
				loading: true
			}
		},
		methods: {
			// 改变分类的选中
			changeClassfiy(i) {
				if (this.classfiyIndex === i) return
				this.classfiyIndex = i
			   this.timer =	setTimeout(()=>{
				   this.rightScrollTop = this.rightItemsTop[i - 1]
				   clearTimeout(this.timer)
			   },150)
				
			},
			// 获取数据
		   async getData(count =20) {
			   this.$http.get(`/category/app_category`).then(res => {
				   this.leftCates = res.map(v => {
					   return {
						   id: v.id,
						   name: v.name,
						   status: v.status,
						   create_time: v.create_time,
						   update_time: v.update_time,
						   category_id: v.category_id
					   }
				   })
				   this.rightCateGoods = res.map (v => {
					   return {
						   id: v.id,
						   name: v.name,
						   list: v.app_category_items
					   }
				   } )
				   
				  //  setTimeout(()=>{
					    
						
				  //  },1000)
				   this.$nextTick(() => {
					this.__initHeight()
				   	this.loading = false
				   })
				 
				   // console.log(res,'分类数据');
			   })
			   
			},
			// 监听右边滚动
			async rightScroll(e) {
				this.rightFilterArr = this.rightItemsTop.filter(item => item <= e.detail.scrollTop )
				this.classfiyIndex = this.rightFilterArr.length === 0 ? 1 : this.rightFilterArr.length
			},
			// 获取页面元素
			getEleInfo(options = {}) {
				if (!options.ele) return
				return new Promise((res, rej) => {
					const query = uni.createSelectorQuery().in(this)
					let params = {
						size: options.size ? true : false,
						rect: options.rect ? true : false,
						scrollOffset: options.scrollOffset ? true : false
					}
					let q = options.all ? query.selectAll(options.ele) : query.select(options.ele)
					q.fields(params, data => res(data)).exec()
				})
			},
			// 初始化每个分类的高度
			__initHeight() {
				//  查询左侧每个元素的高度
				this.getEleInfo({
					size: true,
					rect: true,
					ele: '.left_item',
					all: true
				}).then(data => {	
					this.leftItemHeight = data[0].height
					this.leftItemsTop = data.map(v => v.top)
				})
				// 查询右边每个元素的高度
				this.getEleInfo({
					rect: true,
					ele: '.right_item',
					all: true
				}).then(data => {
					this.rightItemsTop = data.map(v => v.top)
				})
			},
			// 去详情页
			openDetail(item) {
				console.log('1111');
				console.log(item.goods_id,'dsfdsf');
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.goods_id,
					fail: (err) => {
						console.log(err,'跳转失败..');
					}
				});
			}
		},
		onLoad() {
			// 获取分类数据
			this.getData(15)
		},
		onShow() {

		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		watch: {
			async classfiyIndex(newV, oldV) {
				this.getEleInfo({
					size: true,
					scrollOffset: true,
					ele: '#leftScrollBox'
				}).then( data => {
					let H = data.height
					let ST = data.scrollTop
					//下边
					if ((this.leftItemsTop[newV - 1] + this.leftItemHeight) >= (H + ST)) {
						return this.leftScrollTop = this.leftItemsTop[newV - 1] + this.leftItemHeight - H
					}
					// 上边
					if (ST >= this.leftItemHeight) {
						this.leftScrollTop = this.leftItemsTop[newV - 1]
					}
				})
			}
		},
		onReady() {
		
		}
	}
</script>

<style scoped>
	.classify_active {
		color: #FD6801;
	}
</style>
