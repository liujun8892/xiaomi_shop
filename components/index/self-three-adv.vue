<template>
	<view >
		<template v-if="threeAdv">
			<!-- 三栏广告 -->
			<view class="d-flex" style="width: 100%; height: 530rpx;">
				<view style="width: 373rpx;height: 100%;border-right: 2rpx solid #f5f5f5;" >
					<image :src="imgUrls[0]" mode="" style="width: 100%;height: 100%;"></image>
				</view>
				<view style="width: 375rpx;height: 100%;" class="d-flex flex-column">
					<view class="w-100 flex-1" @tap="event(threeAdv.smalltop)">
						<image :src="imgUrls[1]" style="width: 100%;height: 100%;" lazy-load></image>
					</view>
					<view class="w-100" style="height: 2rpx;background-color: #f5f5f5;"></view>
					<view class="w-100 flex-1" @tap="event(threeAdv.smallbottom)">
						<image :src="imgUrls[2]" style="width: 100%;height: 100%;" lazy-load></image>
					</view>
				</view>
				
			</view>
		</template>
		
		
	</view>
</template>

<script>
	export default {
		computed: {
			imgUrls() {
				let arr = []
				for(let key in this.threeAdv) {
					arr.push(this.threeAdv[key].src)
				}
				return arr
			}
		},
		 props: {
			 threeAdv: {
				 type: Object,
				 default: {}
			 }
		 },
		 methods: {
			 event(e) {
				 console.log(e,'被点击了');
			 }
		 }
	}
</script>

<style>
</style>
