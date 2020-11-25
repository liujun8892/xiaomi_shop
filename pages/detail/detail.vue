<template>
	<view>
		<!-- 轮播图 -->
		<self-swiper :swiperList="banners" height="750" preview />

		<!-- 商品信息 -->
		<goods-detail :detail="detail" :showPrice="showPrice" />

		<!-- 商品参数 -->
		<goods-attrs :baseAttrs="baseAttrs" />

		<!-- 可选参数 -->
		<view class="p-2">
			<view class="rounded-md bg-light-secondary" style="overflow: hidden;">

				<view class="px-3 d-flex j-sb a-center border-bottom" style="height: 90rpx;" @click.stop="handOpenAttrPopup" v-if="detail.sku_type === 1">
					<view class="left d-flex a-center">
						<view class="title mr-3 text-light-muted">
							已选
						</view>
						<view class="desc text-muted">
							{{skuAttrChecked}}
						</view>
					</view>
					<view class="iconfont icon-you text-light-muted font-weight-100"></view>
				</view>

				<view class="px-3 d-flex j-sb a-center border-bottom" style="height: 90rpx;" @click="openPopup('express')">
					<view class="left d-flex a-center">
						<view class="title mr-3 text-light-muted">
							配送
						</view>
						<view class="desc text-muted">
							<text>北京 </text>
							<text class="px-1"> 东城区 </text>
							<text class="main_text_color"> 有现货</text>
						</view>
					</view>
					<view class="iconfont icon-you text-light-muted font-weight-100"></view>
				</view>
				
				<view class="px-3 d-flex j-sb a-center border-bottom" style="height: 90rpx;" @click="goCoupon">
					<view class="left d-flex a-center">
						<view class="title mr-3 text-light-muted">
							优惠券
						</view>
						<view class="desc main_text_color">
							<text>立即领取</text>
						</view>
					</view>
					<view class="iconfont icon-you text-light-muted font-weight-100"></view>
				</view>

				<view class="px-3 d-flex j-sb a-center border-bottom" style="height: 90rpx;" @click="openPopup('service')">
					<view class="left d-flex a-center">
						<view class="iconfont icon-finish main_text_color mr-1">

						</view>
						<view class="desc text-muted mr-2">
							小米自营
						</view>
						<view class="iconfont icon-finish main_text_color mr-1">

						</view>
						<view class="desc text-muted  mr-2">
							小米发货
						</view>
						<view class="iconfont icon-finish main_text_color mr-1">

						</view>
						<view class="desc text-muted  mr-2">
							七天无理由退货
						</view>
					</view>
					<view class="iconfont icon-you text-light-muted font-weight-100"></view>
				</view>

			</view>
		</view>

		<!-- 滚动评论 -->
		<goods-comments :comments="comments" :goodsId="goodsId"/>

		<!-- 富文本解析 -->
		<view class="pt-3">
			<u-parse :content="content" @navigate="navigate" className="uparse"></u-parse>
		</view>

		<!-- 为你推荐 -->
		<card headTitle="为你推荐">
			<view class="row">
				<block v-for="(item2,index2) in goodsList" :key="index2">
					<common-list :item="item2"></common-list>
				</block>
			</view>
		</card>

		<view class="" style="height: 120rpx;"></view>

		<!-- 底部按钮 -->
		<view class="d-flex position-fixed bg-white" style="height: 100rpx;z-index: 100;bottom: 0; width: 100%;">
			<view class="d-flex flex-column a-center j-center" style="width: 25%;" @click="fav">
				<view class="iconfont icon-xihuan line-h-sm" :class="!isFav ? 'text-light-muted': 'main_text_color'">

				</view>
				<view class="line-h-sm">{{!isFav ? '收藏' : '已收藏'}}</view>
			</view>
			<view class="d-flex flex-column a-center j-center position-relative" style="width: 25%;"  @click.stop="goCartPage">
				<view class="iconfont icon-gouwuche line-h-sm text-light-muted">
				</view>
				<view class="line-h-sm">购物车</view>
				<view class="position-absolute" style="left: 100rpx;top: 0;" v-if="cartCount === '99+' || cartCount > 0">
					<uni-badge type="error" :text="cartCount" size="small"></uni-badge>
				</view>
			</view>
			<view class=" main_bg_color text-white  d-flex  a-center j-center " :class="{'bg-secondary':getMaxStock === 0}" style="width: 50%;"  @click.stop="beforeAddCart('attr')" >
			  {{getMaxStock === 0 ? '暂无库存' : '加入购物车'}}	
			</view>
		</view>

		<!-- 筛选弹出框 -->
		<common-popup @hide="hidePopup('attr')" :className="popupClass.attr">
			<view class="p-2 d-flex a-center pt-3">
				<image :src="detail.cover" style="width: 180rpx; height: 180rpx;" class="rounded"></image>
				<view class="pl-2">
					<price>{{showPrice}}</price>
					<view class="d-flex align-center">
						<view class="mr-1" >{{skuAttrChecked}}</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" style="width: 100%;height: 560rpx;" v-if="detail.sku_type === 1">
				<radio-tag-group :radioGroup="goodDetailItem.attrs" @changeScreen="changeScreen"></radio-tag-group>
			</scroll-view>
			<view class="position-relative " style="width: 710rpx;height: 150rpx;margin: 0 auto;" v-if="isAddCart">
				<view class="position-absolute left-0" style="top: 50%;transform: translateY(-50%);">购买数量</view>
				<uni-number-box class="position-absolute right-0" style="top: 50%;transform: translateY(-50%);" :min="1"
				 :max="getMaxStock" :value="goodDetailItem.num" @change="changeGoodsNum($event,goodDetailItem,1)"></uni-number-box>
			</view>
			<view class="position-fixed main_bg_color text-white d-flex j-center a-center bottom-0 left-0 right-0" style="height: 100rpx;"
			@click.stop="addCart('attr')">
				{{isAddCart ? '加入购物车' : '确定' }}
			</view>
		</common-popup>

		<!-- 快递 -->
		<common-popup @hide="hidePopup('express')" :className="popupClass.express">
			<view class="b-box px-2">
				<!--100 -->
				<view class=" d-flex a-center j-center font-weight border-bottom" style="height: 100rpx;">
					收货地址
				</view>
				<!-- 835 -->
				<scroll-view scroll-y="true" style="width: 100%;height: 835rpx;">

					<view class="border-bottom py-2" v-for="(item,index) in addrList" :key="index" @click.stop="chooseAddr(item)">
						<view class="d-flex align-center font-weight ">
							<view class="iconfont icon-dingwei" style="transform: translateY(-3rpx);"></view>
							<view class="ml-1">{{item.name}}</view>
						</view>
						<view class="text-light-muted">{{item.path}} {{item.detailPath}}</view>
					</view>

				</scroll-view>
				<view class="position-fixed main_bg_color text-white d-flex j-center a-center bottom-0 left-0 right-0" style="height: 100rpx;"
				 @click="createAddr">
					选择新地址
				</view>
			</view>

		</common-popup>

		<!-- 服务 -->
		<common-popup @hide="hidePopup('service')" :className="popupClass.service">
			<view class="b-box px-2">
				<!--100 -->
				<view class=" d-flex a-center j-center font-weight border-bottom" style="height: 100rpx;">
					服务说明
				</view>
				<!-- 835 -->
				<scroll-view scroll-y="true" style="width: 100%;height: 835rpx;">

					<view class="py-2">
						<view class="d-flex align-center font-weight ">
							<view class="iconfont icon-finish main_text_color" style="transform: translateY(-3rpx);"></view>
							<view class="ml-1 font-weight">仿小米自营</view>
						</view>
					</view>
					<view class="py-2">
						<view class="d-flex align-center font-weight ">
							<view class="iconfont icon-finish main_text_color" style="transform: translateY(-3rpx);"></view>
							<view class="ml-1 font-weight">仿小米自营</view>
						</view>
						<view class="text-light-muted">湖南省长沙市岳麓书院</view>
					</view>
					<view class="py-2">
						<view class="d-flex align-center font-weight ">
							<view class="iconfont icon-finish main_text_color" style="transform: translateY(-3rpx);"></view>
							<view class="ml-1 font-weight">7天无理由退货</view>
						</view>
					</view>
					<view class="py-2">
						<view class="d-flex align-center font-weight ">
							<view class="iconfont icon-finish main_text_color" style="transform: translateY(-3rpx);"></view>
							<view class="ml-1 font-weight">运费说明</view>
						</view>
						<view class="text-light-muted">满99,包邮;</view>
					</view>

				</scroll-view>
				<view class="position-fixed main_bg_color text-white d-flex j-center a-center bottom-0 left-0 right-0" style="height: 100rpx;" @click="hidePopup('service')">
					确定
				</view>
			</view>

		</common-popup>

	</view>
</template>

<script>
	// 导入轮播图组件
	import selfSwiper from '@/components/index/self-swiper.vue'
	// 导入价格组件
	import price from '@/components/common/price.vue'
	// 导入商品详细组件
	import goodsDetail from '@/components/detail/goods-detail.vue'
	// 导入商品属性组件
	import goodsAttrs from '@/components/detail/goods-attrs.vue'
	// 导入商品评论组件
	import goodsComments from '@/components/detail/goods-comments.vue'
	// 导入商品列表组件
	import uniList from '@/components/uni/uni-list/uni-list.vue'
	// 导入商品列表项组件
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'
	// 导入富文本解析器
	import uParse from "@/components/feng-parse/parse.vue"
	// 导入卡片
	import card from "@/components/common/self-card.vue"
	// 导入列表页
	import commonList from "@/components/common/common-list.vue"
	// 导入公共弹出框组件
	import commonPopup from "@/components/common/common-popup.vue"
	// 导入单选组件
	import radioTagGroup from "@/components/common/radio-tag-group2.vue"
	// 导入数字输入框组件
	import uniNumberBox from "../../components/uni/uni-number-box/uni-number-box.vue"
	// 导入角标组件
	import uniBadge from "@/components/uni/uni-badge/uni-badge.vue"
	// 导入vuex
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex"

	export default {
		components: {
			selfSwiper,
			price,
			goodsDetail,
			goodsAttrs,
			goodsComments,
			uniList,
			uniListItem,
			uParse,
			card,
			commonList,
			commonPopup,
			radioTagGroup,
			uniNumberBox,
			uniBadge
		},
		computed: {
			...mapState({
				addrList: state => state.addr.list
			}),
			...mapGetters(['cartCount']),
			// 商品规格选中的属性
			skuAttrChecked() {
				let checedAttrArr = []
				this.goodDetailItem.attrs.forEach(v => {
					checedAttrArr.push(v.list[v.selected].name) 
				})
				return checedAttrArr.join(' ')
			},
			// 商品规格组合选中的是哪个
			skuItemChecked() {
				return this.goodsSkuList.find(v => v.skuText === this.skuAttrChecked)
			},
			// 显示的商品价格
			showPrice() {
				console.log(this.getMaxStock);
				if(!this.skuItemChecked) {
					return this.detail.min_price || '0.00'
				}
				return this.skuItemChecked.pprice
			},
			// 获取最大库存
			getMaxStock() {
				if(!this.skuItemChecked) return this.detail.stock
				return this.skuItemChecked.stock 
			}
		},
		data() {
			return {
				// 是否是加入购物车弹框
				isAddCart: false,
				// 商品id
				goodsId: -1,
				// 是否收藏
				isFav: false,
				// spec单选组
				radioGroup: [{
					title: '颜色',
					list: [{
							name: '火焰红'
						},
						{
							name: '炭黑'
						},
						{
							name: '冰川兰'
						},
					],
					selectedIndex: 0
				}],
				addrChecked: {
					
				},
				// 弹出层显示
				popupClass: {
					attr: 'none',
					express: 'none',
					service: 'none',
				},
				// 推荐列表数据
				goodsList: [{
					cover: '/static/images/demo/list/1.jpg',
					title: '米家空调',
					desc: '1.5匹支持变频',
					pprice: 2199,
					oprice: 2699
				}],
				// 轮播图数据
				banners: [{
						src: 'https://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp'
					},
					{
						src: 'https://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp'
					}
				],
				// 富文本数据
				content: '',
				// 商品详情数据
				detail: {
					title: "小米MIX3 6GB+128GB",
					desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
					pprice: 3299
				},
				// 商品参数
				baseAttrs: [{
					icon: "icon-cpu",
					title: "CPU",
					desc: "蛟龙845八核"
				}],
				// 商品规格列表
				goodsSkuList: [
					
				],
				// 选中的商品详情
				goodDetailItem: {
					id: 9,
					"title": "商品标题111",
					"cover": "/static/images/demo/list/1.jpg",
					"attrs": [{
						"title": "颜色",
						"selected": 0,
						"list": [{
							"name": "火焰红"
						}, {
							"name": "炭黑"
						}, {
							"name": "冰川兰"
						}]
					}],
					"pprice": 336,
					"num": 1,
					"minnum": 1,
					"maxnum": 10
				},
				// 规格弹框
				specPopup: false,
				// 评论数据列表
				comments: [{
					userpic: "/static/images/demo/demo6.jpg",
					username: "雷军",
					create_time: "2020-07-31",
					goods_num: 123,
					context: "评论内容",
					imglist: [
						"/static/images/demo/demo6.jpg"
					]
				}],
			}
		},
		methods: {
			...mapMutations([
				'addGoodsToCart'
			]),
			// 去优惠券页面
			goCoupon() {
				this.navigateTo({url: '/pages/coupon/coupon'})
			},
			// 获取详情页数据
			__init() {
				this.$http.get(`/goods/${this.goodsId}`).then(res => {
					console.log(res, '详情页数据')
					// 轮播图
					this.banners = res.goodsBanner.map((v) => {
						return {
							src: v.url
						}
					})
					// 详情
					this.detail = res
					this.baseAttrs = res.goodsAttrs.map(v => {
						return {
							icon: "icon-cpu",
							title: v.name,
							desc: v.value
						}
					})
					// 评论列表
					this.comments = this.detail.hotComments.map(v => {
						return {
							id: v.id,
							user_id: v.user_id,
							userpic: v.user.avatar,
							username: v.user.nickname,
							create_time: v.review_time,
							goods_num: v.goods_num,
							context: v.review.data,
							imglist: v.review.image
						}
					})
					// 富文本
					this.content = res.content
					// 商品推荐列表
					this.goodsList = res.hotList.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_price,
							oprice: v.min_oprice
						}
					})
					
					// 多规格商品
					if(res.sku_type === 1) {
						// 商品规格(用户选择)
						this.goodDetailItem.attrs = res.goodsSkusCard.map(v => {
							let list = v.goodsSkusCardValue.map(v2 => {
								return {
									name: v2.value
								}
							})
							
							return {
									id: v.id,
									goodsId: v.goods_id,
									"title": v.name,
									"selected": 0,
									"list":list
							}
						})
						// 商品规格(计算价格配置信息)
						let skuArr= []
						res.goodsSkus.forEach(v => {
							 skuArr = []
							 for (let key in v.skus ) {
								skuArr.push(v.skus[key].value)
							}
							v.skuText = skuArr.join(' ')
						})
						this.goodsSkuList = res.goodsSkus
						
					}
				})
			},
			// 处理轮播图数据
			handBannerData(oldBanners) {
				let obj = {}
				return oldBanners.map(v => obj.src = v.url)
			},
			createAddr() {
				this.hidePopup('express')
				this.navigate('../user-address-edit/user-address-edit')
			},
			navigate(url) {
				uni.navigateTo({
					url: url
				});
			},
			handOpenAttrPopup() {
				this.isAddCart =false
				this.openPopup('attr')
			},
			// 加入购物车之前检查状态
			beforeAddCart(popup) {
				if(this.getMaxStock === 0) return
				this.isAddCart = true
				this.openPopup(popup)
			},
			// 添加到购物车
			addCart(popup) {
				// 如果是点击的规格弹框, 只隐藏规格弹框
				if(!this.isAddCart) return this.hidePopup(popup)
				
				// 
			
				this.$http.post(`/cart`,{
					shop_id: this.detail.sku_type === 0 ? this.detail.id : this.skuItemChecked.id,
					skus_type: this.detail.sku_type,
					num: this.goodDetailItem.num,
				},{
					token: true
				}).then(res => {
					// 隐藏popup
					this.hidePopup('attr')
					uni.showToast({
						title: '加入购物车成功'
					});
					// 更新购物车数据
					uni.$emit('updateCartData')
				}).catch(err => {
					console.log(err,6666);
				})
			},
			// 选择收货地址
			chooseAddr(item){
				this.addrChecked = item
			},
			fav() {
				this.isFav = !this.isFav
			},
			openPopup(key) {
				this.popupClass[key] = 'show'
			},
			goCartPage() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			hidePopup(key) {
				this.popupClass[key] = 'hide'
				setTimeout(() => {
					this.popupClass[key] = 'none'
				}, 200)
			},
			changeScreen(item, index) {
				this.goodDetailItem.num = 1
				item.selected = index
			},
			changeGoodsNum(e, item, index) {
				if(e>this.getMaxStock) return
				item.num = e
			}
		},
		onBackPress() {
			for (let key in this.popupClass) {
				if (this.popupClass[key] !== 'none') {
					this.hidePopup(key)
					return true
				}
			}
		},
		onLoad(options) {
			if (!options.id) return
			this.goodsId = options.id
			this.__init()
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view,
	.uparse uni-view {
		line-height: 0 !important;
	}
</style>
