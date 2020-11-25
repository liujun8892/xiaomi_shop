<template>
	<view class="d-flex bg-white mb-3" v-show="tabIndex === index" @click="$emit('click')">
		<view class="flex-1 d-flex flex-column  j-center pl-3 pr-1">
			<view style="font-size: 35rpx;" :class="{'text-light-muted':item1.disabled || !item1.status}">{{item1.title}}</view>
			<view class="text-light-muted font-sm">{{ typeof item1.start_time ==='string' ? item1.start_time : item1.start_time | formatTime}} ~ {{typeof item1.end_time ==='string' ? item1.end_time : item1.end_time | formatTime}}</view>
		</view>
		<view class="main_bg_color flex-shrink d-flex flex-column j-center a-center text-white" :class="{'bg-secondary':item1.disabled || !item1.status}"
		 style="width: 250rpx;height: 200rpx;">
			<view class="">
				<text style="font-size: 42rpx;" class="line-h">{{item1.desc === '折扣' ? item1.price.split('\.')[0] :  item1.price}}</text>{{item1.desc === '折扣' ? '折': '元'}}
			</view>
			<view class="line-h mb-2">{{item1.desc}}</view>
			<slot>
				<view class="main_text_color bg-white rounded px-2" :class="{'text-secondary':item1.disabled || !item1.status}">{{item1.status ?item1.disabled?'已使用' : '去使用':'已失效'}}
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		filters:{
			handlePrice(price){
				return price.toString().split('\.')
				let nun = 1
				nun.toFixed(0)
			}
		}, 
		props: {
			item1: Object,
			tabIndex: {
				type: Number,
				default: 0
			},
			index: {
				type: Number,
				default: 0
			}
		},
	}
</script>

<style>
</style>
