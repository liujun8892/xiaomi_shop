<template>
	<view style="min-height: 100vh;">
		<!-- 搜索排序栏 -->
		<view class="border-bottom border-top d-flex position-fixed top-0 left-0 right-0 bg-white" style="height: 90rpx;z-index: 100;">
			<view class="flex-1 d-flex a-center j-center font-md text-muted" v-for="(item,index) in searchOrder.list" :key="index" @click="changeSearchOrder(index)">
			<text  :class="{'main_text_color':searchOrder.currentIndex === index  || !item.showOrder}">{{item.name}}</text> 
			<view class="d-flex flex-column" v-if="item.showOrder">
				<view class="iconfont icon-paixu-shengxu line-h0" :class="item.status === 1 ?  'main_text_color': 'text-light-muted'"></view>
				<view class="iconfont icon-paixu-jiangxu line-h0 " :class="item.status === 2 ?  'main_text_color': 'text-light-muted'"></view>
			</view>
			</view>
		</view>
		<view class="w-100" style="height: 90rpx;"></view>
		
		<!-- 搜索抽屉 -->
		<uni-drawer ref="drawer" :maskClick="false" mode="right" :width="330"  @onMaskClick="onMaskClick">
			<!-- 筛选选项 -->
			<radio-tag-group :radioGroup="screenItems" @changeScreen="changeScreen"></radio-tag-group>
			
			<!-- 底部按钮 -->
			<view class="w-100 border-top d-flex position-fixed bottom-0" style="height: 90rpx;">
				<view class="flex-1 d-flex a-center j-center font-md" hover-class="bg-light-secondary " @click="reset">重置</view>
				<view class="flex-1 d-flex a-center j-center font-md main_bg_color text-white" hover-class="main_bg_hover_color" @click="confirm">确定</view>
			</view>
		</uni-drawer>
		
		<!-- 搜索结果列表 -->
		<search-list :searchList="searchList"></search-list>
		<load-more :status="loadStatus" v-if="loadShow &&  searchList.length > 0" ></load-more>
		
		<view class="position-relative " v-if="loadStatus === 'noMore' && searchList.length===0" style="width: 750rpx;height: 93vh; background-color: #F5F5F5;">
			<no-thing title="空空如也~" class="position-absolute" style="top: 50%;transform: translateY(-50%);"></no-thing>
		</view>
		
	</view>
</template>

<script>
	// 导入uni的drawer组件
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	// 导入卡片组件
	import selfCard from '@/components/common/self-card.vue'
	// 导入单选框组件
	import radioTagGroup from '@/components/common/radio-tag-group.vue'
	// 导入价格组件
	import price from '@/components/common/price.vue'
	// 导入搜索列表组件
	import searchList from '@/components/search/search-list.vue'
	export default {
		computed: {
			// 获取排序对象
			getOrderMap(){
				let currentOrderObj = this.searchOrder.list[this.searchOrder.currentIndex]
				
				let value = currentOrderObj.status === 1 ? 'asc' : 'desc'
				return {
					[currentOrderObj.key]: value
				}
			},
			// 获得筛选对象
			getFilterMap() {
				let fliterMap = {}
				this.screenItems.forEach(v => {
					if(v.selectedIndex < 0) return
					 let currentFilterObj = v.list[v.selectedIndex]
					 let key =v.key
					 console.log(key);
					 fliterMap[key] = `${currentFilterObj.rule},${currentFilterObj.value}`
				 })
				 console.log(fliterMap);
				 return fliterMap
			}
		},
		components: {
			uniDrawer,
			selfCard,
			radioTagGroup,
			price,
			searchList
		},
		data() {
			return {
				// 搜索关键字
				keyWords: '',
				// 搜索页码:
				page: 1,
				// 上拉加载
				loadStatus: 'more',
				// 上拉加载显示
				loadShow:false,
				// 搜索排序栏
				searchOrder: {
					currentIndex: 0,
					list: [{
							name: "综合",
							status: 1,
							key: "all",
							showOrder: true
						},
						{
							name: "销量",
							status: 0,
							key: "sale_count",
							showOrder: true
						},
						{
							name: "价格",
							status: 0,
							key: "min_price",
							showOrder: true
						},
						{
							name: "筛选",
							status: 0,
							key: "price",
							showOrder: false
						}
					]
				},
				// 老的筛选项
				oldScreenItems: [],
				// 筛选项
				screenItems: [
					{
						title: '价格',
						key: 'price',
						list: [{
							name: '0-50元',
							rule: 'between',
							value: '0,50'
						},{
							name: '50-100元',
							rule: 'between',
							value: '50,100'
						},{
							name: '100-500元',
							rule: 'between',
							value: '100,500'
						},{
							name: '500-1000元',
							rule: 'between',
							value: '500,1000'
						},{
							name: '大于1000元',
							rule: '>',
							value: '1000'
						}],
						selectedIndex: -1
					}
				],
				// 搜索商品列表
				searchList:[],
				historySearch:[]
			}
		},
		methods:{
			// 更改排序选中
			changeSearchOrder(index) {
				if(index === 3){
					 this.oldScreenItems = this.screenItems.map(v => v.selectedIndex)
					console.log( this.oldScreenItems);
					return this.$refs['drawer'].open()
				}  
				// 获取原来的索引
				let orderIndex = this.searchOrder.currentIndex
				if(index !== orderIndex) {
					// 取消原来的排序颜色
					this.searchOrder.list[orderIndex].status = 0
					this.searchOrder.currentIndex = index
				}
				// 排序上下箭头颜色的该变
				 this.searchOrder.list[index].status =	this.searchOrder.list[index].status === 0 ? 1 : this.searchOrder.list[orderIndex].status ===1 ? 2 : 1
				// 重新加载数据
				 this.getData(true)
			},
			// 改变筛选项的选中状态
			changeScreen(item,index) {
				if(item.selectedIndex === index ) return
				item.selectedIndex = index
			},
			// 筛选获取数据
			confirm(){
				this.$refs['drawer'].close()
				this.getData(true)
				this.loadShow = true
			},
			// drawer关闭
			onMaskClick(){
				this.screenItems.forEach((v,i) => {
					v.selectedIndex = this.oldScreenItems[i]
				})
			
				this.$refs['drawer'].close()
			},
			// 重置筛选条件
			reset() {
				this.screenItems.forEach( v => {
					v.selectedIndex = -1
				})
			},
			// 搜索
			search() {
				if(this.keyWords === '') {
					return uni.showToast({
						title:'搜索关键词不能为空',
						icon:'none'
					})
				}
			   let index =	this.historySearch.indexOf(this.keyWords)
			   if(index === -1){
				   // 添加
				   this.historySearch.unshift(this.keyWords)
				   uni.setStorageSync('historySearch',JSON.stringify(this.historySearch))
			   }else {
				   // 置顶
				   this.historySearch.unshift(this.historySearch.splice(index,1)[0])
				   uni.setStorageSync('historySearch',JSON.stringify(this.historySearch))
			   }
				
				uni.hideKeyboard()
				this.getData(true)
			},
			// 获取数据
			getData(refresh =false,callback =false) {
				if(refresh) this.page = 1
				this.$http.post(`/goods/search`,{
					title: this.keyWords,
					page: this.page,
					...this.getOrderMap,
					...this.getFilterMap
				}).then(res => {
					 let list = res.map(v => {
						return {
							id: v.id,
							title: v.title,
							desc: v.desc,
							cover: v.cover,
							pprice: v.min_price,
							comment_num: v.comments_count,
							satisfaction: v.comments_count === 0 ? 0 : (v.comments_good_count / v.comments_count * 100).toFixed(1)
						}
					})
					console.log(res);
					this.searchList = !refresh ? [...this.searchList,...list] : [...list] 
					this.loadStatus = list.length < 10 ? 'noMore' : 'more'
					if(typeof callback === 'function') callback()
				})
			},
			__init() {
				if(!this.keyWords) return
				this.getData()
			}
		},
		onLoad(options) {
			this.keyWords = options.keyWords ? options.keyWords : '小米'
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview()
			webView.setTitleNViewSearchInputText(options.keyWords)  
			// #endif
			this.__init()
		},
		onReachBottom() {
			this.loadShow = true
			if(this.loadStatus !== 'more') return
			this.page ++
			this.loadStatus = 'loading'
			this.getData()
		},
		onPullDownRefresh() {
			this.getData(true,()=>{
				uni.stopPullDownRefresh()
				uni.showToast({
					title:'刷新成功',
					icon: 'none'
				})
			})
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyWords = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			this.reset()
			this.search()
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				this.reset()
				this.search()
			}
		},
		onShow() {
			let localSearchHistory = uni.getStorageSync('historySearch')
			this.historySearch = localSearchHistory ? JSON.parse(localSearchHistory) :[]
		}
	}
</script>

<style scoped>
	.load_center {
		margin-top: 500rpx;
	}
</style>
