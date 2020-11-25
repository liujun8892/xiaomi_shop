<template>
	<view>
		<view class="px-2 py-3 font-lg line-h-md">{{detail.title}}</view>
		<u-parse :content="content" @navigate="navigate" className="uparse"></u-parse>
	</view>
</template>

<script>
	// 导入富文本解析器
	import uParse from "@/components/feng-parse/parse.vue"
	
	var htmlString =
		`
		<p>
			<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
			<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
			<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
			<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
			<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
			<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
			<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
		</p>`
	export default {
		components:{
			uParse
		},
		data() {
			return {
				detail: '',
				// 富文本数据
				content: htmlString,
			}
		},
		methods: {
			navigate(url) {
				uni.navigateTo({
					url: url
				});
			},
		},
		onLoad(e) {	
			if(!e.detail) return uni.navigateBack({
				delta: 1
			});
			this.detail = JSON.parse(e.detail)
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
