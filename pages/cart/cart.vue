<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;" class="animated fadeIn faster content_H">
		<!-- 导航栏 -->
		<uni-nav-bar :right-text="isEdit ? '完成' : '编辑' " title="购物车" statusBar fixed @clickRight="isEdit = !isEdit"></uni-nav-bar>		

		<!-- 购物车 -->
		<view class="px-2 bg-white" v-if="!allDisabled">
			<view class="d-flex py-5 border-bottom a-center" v-for="(item,index) in list">
				<label class="radio d-flex a-center j-center flex-shrink " style="width: 80rpx;height: 80rpx;" @click="selectedItem(index)">
					<radio :value="index + ''" :checked="item.checked" color="#FD6801" /><text></text>
				</label>
				<image :src="item.cover" class="border mr-2 flex-shrink rounded" style="width: 150rpx;height: 150rpx;padding: 15rpx;"></image>
				<view class="flex-1 d-flex flex-column ">
					<view class="font-md text-dark">{{item.title}}</view>
					<view class="d-flex a-center p-1" :class="isEdit ? 'bg-light-secondary': '' " @click="isEdit ? onShowSkuPopup(index,item) : () => {}" v-if="item.skus_type===1">
						<view class="text-light-muted pr-1" >{{item.skusText}}</view>
						<view v-if="isEdit" class="iconfont icon-bottom ml-auto text-light-muted line-h-sm"></view>
					</view>
					<view class="d-flex j-sb mt-auto" style="padding-top: 15rpx;">
						<price unitSize="font-sm" priceSize="font-md">{{item.pprice}}</price>
						<uni-number-box :min="item.minnum" :max="item.maxnum" @change="changeGoodsNum($event,item,index)" :value="item.num"></uni-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="d-flex a-center j-center bg-white" style="padding: 80rpx 0;" v-else>
			<view class="iconfont icon-gouwuche text-light-muted"></view>
			<view class="px-2 text-light-muted">购物车还是空的</view>
			<view class="border px-2 py-1 text-muted" @click="goShop">去逛逛</view>
		</view>

		<!-- 为你推荐 -->
		<!-- 商品列表 -->
		<view class="d-flex font-md main_text_color font-weight  j-center pt-4 pb-2">
			为你推荐
		</view>
		<view class="d-flex a-center j-center position-relative pt-1 pb-5">
			<view class="position-absolute text-light-muted px-2"  style="background-color: #F5F5F5;z-index: 2;">买了人还买了</view>
			<view class="position-absolute left-0 right-0" style="height: 2rpx;background-color: #ECECEC;">
				
			</view>
		</view>
		<view class="row bg-white " >
			<block v-for="(item2,index2) in recommandList" :key="index2">
				<common-list :item="item2"></common-list>
			</block>
		</view>

		<!-- 底部占位 -->
		<view class="" style="height: 120rpx;"> </view>

		<!-- 结算栏 -->
		<view class="position-fixed  left-0 right-0 bg-white d-flex a-stretch" style="z-index: 100;bottom: var(--window-bottom);">
			<label class="radio d-flex a-center j-center flex-shrink " style="width: 180rpx;height: 100rpx;" @click="doSelectedAll">
				<radio :value="-1 + '' " :checked="checkedAll" :color="allDisabled ? '#cccccc' : '#FD6801'" :disabled="allDisabled" /><text></text>
			</label>
			<template v-if="!isEdit">
				<view class="flex-1 d-flex j-center a-center">
					<text class="pr-2">合计:</text>
					<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 main_bg_color text-white d-flex j-center a-center" style="height: 100rpx;" @click="goOrderConfirm">
					结算
				</view>
			</template>
			<template v-if="isEdit">
				<view class="flex-1 main_bg_color text-white d-flex j-center a-center" style="height: 100rpx;">
					移入收藏
				</view>
				<view class="flex-1 d-flex j-center a-center text-white" style="background-color: #DC3546;height: 100rpx;" @click="doDelGoods">
					删除
				</view>
			</template>
		</view>

		<!-- 筛选弹出框 -->
		<common-popup @hide="doHidePopup" :className="popupShow" v-if="popupData">
			<view class="p-2 d-flex a-center pt-3">
				<image :src="popupData.cover" style="width: 180rpx; height: 180rpx;" class="rounded"></image>
				<view class="pl-2">
					<view class="font-md">{{popupData.title}}</view>
					<price>{{showPrice}}</price>
					<view class="d-flex align-center">
						<view class="mr-1" v-for="(item,index) in popupData.attrs" :key="index">{{item.list[item.selected].name}}</view>
					</view>
				</view> 
			</view>
			<scroll-view scroll-y="true" style="width: 100%;height: 560rpx;">
				<radio-tag-group :radioGroup="popupData.attrs" @changeScreen="changeScreen"></radio-tag-group>
			</scroll-view>
			<view class="position-relative " style="width: 710rpx;height: 150rpx;margin: 0 auto;">
				<view class="position-absolute left-0" style="top: 50%;transform: translateY(-50%);">购买数量</view>
				<uni-number-box class="position-absolute right-0" style="top: 50%;transform: translateY(-50%);" :min="list[popupDataIndex].minnum"
				 :max="list[popupDataIndex].maxnum" :value="list[popupDataIndex].num" @change="changeGoodsNum($event,list[popupDataIndex])"></uni-number-box>
			</view>
			<view class="position-fixed main_bg_color text-white d-flex j-center a-center bottom-0 left-0 right-0" style="height: 100rpx;"
			 @click.stop="doHidePopup">
				确定
			</view>
		</common-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import price from '@/components/common/price.vue'
	import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	// 导入公共弹出框组件
	import commonPopup from "@/components/common/common-popup.vue"
	// 导入单选组件
	import radioTagGroup from "@/components/common/radio-tag-group2.vue"
	// 导入公共列表组件
	import commonList from '@/components/common/common-list.vue'
	export default {
		watch: {
			popupData(n, o) {
				// console.log(n);
			}
		},
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			commonPopup,
			radioTagGroup,
			commonList
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				selectList: state => state.cart.selectList,
				popupShow: state => state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'allDisabled',
				'selectGoodsCount'
			]),
			// 商品规格选中的属性
			skuAttrChecked() {
				let checedAttrArr = []
				this.popupData.attrs.forEach(v => {
					checedAttrArr.push(v.list[v.selected].name) 
				})
				return checedAttrArr.join(',')
			},
			// 商品规格组合选中的是哪个
			skuItemChecked() {
				return this.popupData.goods_skus.find(v => v.skuText === this.skuAttrChecked)
			},
			// 显示的商品价格
			showPrice() {
				// console.log(this.getMaxStock);
				if(!this.skuItemChecked) {
					return this.popupData.min_price || '0.00'
				}
				console.log(this.skuItemChecked,'更改了sku选中...');
				return this.skuItemChecked.pprice
			},
		},
		data() {
			return {
				// 购物车是否可编辑
				isEdit: false,
				checked: false,
				// 热门数据
				recommandList: [],
				// 点击商品的sku
				popupData: null,
				// 点击商品sku的索引
				popupDataIndex: 0,
			}
		},
		methods: {
			...mapMutations(['selectedItem','initCart','unSelectedAll']),
			...mapActions(['doSelectedAll', 'doDelGoods', 'doShowPopup', 'doHidePopup']),
			changeRadio(item) {
				item.checked = !item.checked
			},
			changeAllRadio(id) {
				console.log(id);
				this.checked = !this.checked
			},
			// 修改选购商品的数量
			changeGoodsNum(e, item, index) {
				if(item.num === e) return
				// 修改数据库中该商品的数量
				this.$http.post(`/cart/updatenumber/${item.id}`,{num:e},{token:true})
					.then(res => {
						console.log(res,'数量修改成功');
						item.num = e
					})
				
			},
			// 编辑sku
			onShowSkuPopup(index,item){
				this.popupDataIndex = index
				console.log(item,'当前商品');
				let skuSelectedList = item.skusText.split(',')
				// 获取当前商品的sku
				this.$http.get(`/cart/${item.id}/sku`)
					.then(res => {
						console.log(res,'获取到的sku');
						// 处理后端的sku和sku_card数据
						// 商品规格(用户选择)
						res.attrs = res.goods_skus_card.map((v,i) => {
							let selected = 0
							let list = v.goods_skus_card_value.map(v2 => {
								// 选中的sku
								if(v2.value === skuSelectedList[i]) selected = i
								return {
									id: v2.id,
									name: v2.value
								}
							})
							return {
									id: v.id,
									goodsId: v.goods_id,
									"title": v.name,
									"selected": selected,
									"list":list
							}
						})
						// 商品规格(计算价格配置信息)
						let skuArr= []
						res.goods_skus.forEach(v => {
							 skuArr = []
							 for (let key in v.skus ) {
								skuArr.push(v.skus[key].value)
							}
							v.skuText = skuArr.join(',')
						})
						res.goodsSkuList = res.goodsSkus
						this.popupData = res
						console.log(this.popupData,'封装好的弹框数据');
						
					})
				
				this.doShowPopup(index)
			},
			changeScreen(item, index) {
				item.selected = index
			},
			goOrderConfirm() {
				if(this.selectGoodsCount === 0) {
					return uni.showToast({
						title:'请先选择要结算的商品',
						icon:'none'
					})
				}
				uni.navigateTo({
					url: '../order-confirm/order-confirm?goodsIds='+ JSON.stringify(this.selectList)
				});
			},
			// 去搜索列表页
			goShop() {
				uni.navigateTo({
					url:'../search/search-list'
				})
			},
			// 获取推荐列表数据
			getRecommandData() {
				this.$http.get(`/goods/hotlist`).then(res => {
					console.log(res,'热门数据');
					// 商品推荐列表
					this.recommandList = res.map(v => {
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
			// 获取购物车列表数据
			getCartData(callback =false) {
				this.$http.get(`/cart`,{},{token:true,skip:true}).then(res => {
					this.initCart(res)
					if(typeof callback === 'function') callback()
				}).catch(err => {
					uni.stopPullDownRefresh()
					console.log(err);
				})
			}
		},
		onPullDownRefresh() {
			// 获取购物车列表数据
			this.getCartData(()=>{
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				this.unSelectedAll()
			})
		},
		onLoad() {
			// 获取推荐列表数据
			this.getRecommandData()
			// 获取购物车列表数据
			this.getCartData()
		}
	}
</script>

<style>

</style>
