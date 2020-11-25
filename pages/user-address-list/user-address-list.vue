<template>
	<view>
		<uni-swipe-action v-for="(item,index) in addrList" :key="index">
			<uni-swipe-action-item :threshold="0" :right-options="options2" @click="bindClick($event,index,item)">
				<view class="" @click.stop="chooseAddr(item,index)">
					<list-item :showRightArrow="false" style="width: 750rpx;">
						<view class="d-flex flex-column">
							<view class="text-muted">
								<text class="main_text_color pr-1">{{item.name}}</text>
								<text class="pr-1">{{item.phone}}</text>
								<text class="main_text_color pr-1" v-if="index === 0 && item.last_used_time">[默认]</text>
							</view>
							<view class="text-light-muted">
								<text>{{item.province}} {{item.city}} {{item.district}}</text>
							</view>
							<view class="text-light-muted">
								<text>{{item.address}}</text>
							</view>
						</view>
					</list-item>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

		<!-- 上拉加载 -->
		<load-more :status="loadStatus" v-if="loadShow &&  addrList.length > 0"></load-more>

		<view class="position-relative " v-if="loadStatus === 'noMore' && addrList.length===0" style="width: 750rpx;height: 100vh; background-color: #F5F5F5;">
			<no-thing title="空空如也~" class="position-absolute" style="top: 50%;transform: translateY(-50%);"></no-thing>
		</view>

	</view>
</template>

<script>
	import listItem from '@/components/my/list-item.vue'
	import uniSwipeAction from '@/components/uni/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				addrList: state => state.addr.list
			})
		},
		components: {
			listItem,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				// 上拉加载
				loadStatus: 'more',
				loadShow: false,
				page: 1,
				// 选择地址
				isChoose: false,
				options2: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				timer: null
			}
		},
		methods: {
			...mapMutations(['delAddr', 'addEditAddr', 'updateAddr']),
			doDelAddr(index) {
				this.delAddr(index)
			},
			// 选择收货地址
			chooseAddr(item,index) {
				item.isdefault = index === 0
				if (this.isChoose) {
					uni.$emit('chooseAddr', item)
					uni.navigateBack({
						delta: 1
					});
				}
			},
			// 获取用户的收货地址
			getData(callback =false,refresh =false) {
				if(refresh) {
					this.page = 1
				}
				this.$http.get(`/useraddresses/${this.page}`, {}, {
					token: true
				}).then(res => {
					console.log(res,'地址');
					this.updateAddr({refresh: refresh,list: res})
					this.loadStatus = res.length < 10 ? 'noMore' : 'more'
					if(typeof callback === 'function') callback()
				})
			},
			bindClick(e, i, item) {
				if (this.isChoose) return this.chooseAddr(item)
				switch (e.index) {
					case 0:
						// 编辑
						this.timer = setTimeout(() => {
							uni.navigateTo({
								url: `../user-address-edit/user-address-edit?type=edit&index=${i}`
							});
							clearTimeout(this.timer)
						}, 50);
						break;
					case 1:
						// 删除
						uni.showModal({
							content: '要删除该收货地址吗？',
							success: (res) => {
								if (res.confirm) {
									this.$http.del(`/useraddresses/${item.id}`, {}, {
											token: true
										}).then(res => {
											console.log(res,'删除成功');
											this.doDelAddr(i)
											uni.showToast({
												title: '删除成功'
											});
										})
								}
							}
						});
						break;
					default:
						break;
				}
			},
		},
		onLoad(e) {
			if (e && e.type === 'choose') {
				this.isChoose = true
			}
			
		},
		onShow() {
			this.getData(false,true)
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../user-address-edit/user-address-edit'
				});
			}
		},
		onReachBottom() {
			this.loadShow = true
			if(this.loadStatus !== 'more') return
			this.page ++
			this.loadStatus = 'loading'
			this.getData(()=>{
				uni.showToast({
					title:'加载成功',
					icon:'none'
				})
				this.loadShow = false
			})
		},
		onPullDownRefresh() {
			this.getData(()=>{
				uni.stopPullDownRefresh()
				uni.showToast({
					title:'刷新成功',
					icon: 'none'
				})
			}, true)
		}
	}
</script>

<style>

</style>
