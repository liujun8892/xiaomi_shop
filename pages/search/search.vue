<template>
	<view>
		<!-- 卡片图 -->
		<self-card headTitle="热门搜索" bodyCover="/static/images/demo/search-banner.png" @click="quickSearch('小米')" />

		<!-- 热门标签 -->
		<view class="pt-1 px-1">
			<color-tag v-for="(item,index) in hot" :tagName="item.name" @click="quickSearch(item.name)" />
		</view>
		<!-- 常用分类 -->
		<self-card headTitle="常用分类">
			<view class="px-2 py-1">
				<color-tag v-for="(item,index) in cate" :tagName="item.name" :isClassify="true" @click="quickSearch(item.name)" />
			</view>
		</self-card>

		<!-- 分割线 -->
		<self-divider />

		<!-- 搜索记录 -->
		<self-card headTitle="搜索记录">
			<view slot="title-right" class="ml-auto text-primary" @click="clearHistory">清除历史记录</view>
			<uni-list>

				<uni-list-item v-for="(item,index) in historySearch" :key="index" @click="quickSearch(item)" :showArrow="false"
				 :title="item" />

			</uni-list>
		</self-card>

	</view>
</template>

<script>
	// 导入卡片组件
	import selfCard from '@/components/common/self-card.vue'
	// 导入颜色标题组件
	import colorTag from '@/components/search/color-tag.vue'
	// 导入uni的list组件
	import uniList from '@/components/uni/uni-list/uni-list.vue'
	// 导入uni的list-item组件
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			selfCard,
			colorTag,
			uniList,
			uniListItem
		},
		data() {
			return {
				// 搜索页热词tag
				hot: [{
						name: '小米'
					},
					{
						name: '领券中心'
					},
					{
						name: 'Redmi K20'
					},
					{
						name: 'RedmiBook 14'
					},
					{
						name: '智能积木 越野四驱车'
					},
					{
						name: '手环 腕带'
					},
				],
				// 常用分类
				cate: [{
						name: '小米'
					},
					{
						name: '耳机'
					},
					{
						name: '手机'
					},
					{
						name: '音箱'
					},
					{
						name: '手表'
					},
					{
						name: '配件'
					},
					{
						name: '网关/传感器'
					},
					{
						name: '健康'
					},
					{
						name: '酷玩'
					},
				],
				// 历史记录
				historySearch: [],
				// 搜索关键词
				keyWords: '',
				timer:null
			}
		},
		methods: {
			// 快捷搜索
			quickSearch(keyWords) {
				this.keyWords = keyWords
				this.search()
			},
			// 搜索
			search() {
				if (this.keyWords === '') {
					return uni.showToast({
						title: '搜索关键词不能为空',
						icon: 'none'
					})
				}
				uni.hideKeyboard()
				this.goSearchList()
				this.timer = setTimeout(()=>{
					this.addHistory()
					clearTimeout(this.timer)
				},800)
				
			},
			addHistory() {
				let index = this.historySearch.indexOf(this.keyWords)
				if (index === -1) {
					// 添加
					this.historySearch.unshift(this.keyWords)
				} else {
					// 置顶
					this.historySearch.unshift(this.historySearch.splice(index, 1)[0])
				}
				// 历史记录大于6
				if(this.historySearch.length >6){
					this.historySearch.splice(6,1)
				}
				uni.setStorageSync('historySearch', JSON.stringify(this.historySearch))
			},
			// 去搜索列表页
			goSearchList(keyWords = false) {
				console.log('1...');
				let key = keyWords ? keyWords : this.keyWords
				uni.navigateTo({
					url: './search-list?keyWords=' + key,
					fail(err) {
						console.log(err);
					}
				});
			},
			// 清除历史记录
			clearHistory() {
				uni.showModal({
					title: '提示?',
					content: '是否要清除搜索历史?',
					cancelText: '取消',
					confirmText: '清除',
					success: res => {
						if (res.confirm) {
							this.historySearch = []
							uni.removeStorageSync('historySearch')
						}
					},
				});
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.search()
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyWords = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onShow() {
			let localSearchHistory = uni.getStorageSync('historySearch')
			this.historySearch = localSearchHistory ? JSON.parse(localSearchHistory) : []
		}
	}
</script>

<style>

</style>
