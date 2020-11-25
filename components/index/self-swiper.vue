<template>
	 <view >
	 	<swiper indicator-dots autoplay circular interval="3000" :duration="500" :style="{width: '100%',height: getHeight}">
	 		<block v-for="(item,index) in swiperList" :key="index">
	 			<swiper-item>
	 				<view class="swiper-item">
	 					<image :src="item.src" style="width: 100%;" lazy-load :style="{height: getHeight}" @tap="swiperImageTap(item,index)"></image>
	 				</view>
	 			</swiper-item>
	 		</block>
	 	</swiper>
	 </view>
</template>

<script>
	export default {
		props: {
			//  轮播图数据列表
			swiperList: {
				type: Array | Object,
				default: []
			},
			// 轮播图高度
			height: {
				type: String | Number,
				default: 350
			},
			// 点击轮播图是否预览
			preview: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getHeight() {
				return this.height + 'rpx'
			},
			getPrewImages() {
				return this.swiperList.map(v => v.src)
			}
		},
		
		data() {
			return {
				
			}
		},
		methods: {
			// 点击了轮播图
			swiperImageTap(item,index) {
				if(this.preview) {
					uni.previewImage({
						current:index,
						urls:this.getPrewImages,
						indicator:'default',
						loop: true
					})
				}
			}
		}
	}
</script>

<style scoped>
	
</style>
