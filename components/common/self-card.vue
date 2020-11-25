<template>
	<view>
		
		<view class="card" >
			<!-- 标题 -->
			<view class="p-2 main_border_color d-flex a-center" :class="{'border-bottom':showTitleBorder}" :style="{'background-color':titleBgc}" v-if="showHead">
				<slot name="title">
					<text class="font-md" v-if="headTitle" :class="{'font-weight':titleFontWeight}">{{headTitle}}</text>
				</slot>	
				<slot name="title-right"></slot>	
			</view>
			<!-- body -->
			<view>
				<image v-if="bodyCover" src="../../static/images/demo/demo4.jpg" mode="widthFix" style="width: 100%;" @click.stop="$emit('click')"></image>
				<slot />
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			// 标题
			headTitle: String,
			// 内容封面图
			bodyCover: String,
			// 是否新鲜事标题
			showHead: {
				type: Boolean,
				default: true
			},
			// 是否显示标题的下边框
			showTitleBorder: {
				type: Boolean,
				default: false
			},
			// 标题是否加粗
			titleFontWeight: {
				type: Boolean,
				default: true
			},
			// 标题背景
			titleBgc: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>
