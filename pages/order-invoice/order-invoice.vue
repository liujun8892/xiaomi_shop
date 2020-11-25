<template>
	<view style="height: 100%; background-color: #F5F5F5;">
		<self-divider />
		<card headTitle="发票类型" style="background-color: #FFFFFF;">
			<radio-tag-group radioType="single" :label="label1" class="pt-1"></radio-tag-group>
			<view class="px-2 pt-1 pb-3 line-h-md text-light-muted">
				电子发票与纸质发票具有相同的法律效力，可作为报销、售后、维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
			</view>
		</card>
		<self-divider />
		<card headTitle="发票抬头" style="background-color: #FFFFFF;">
			<radio-tag-group radioType="single" :label="label2" class="pt-1 pb-2" @changeScreen="changeScreen"></radio-tag-group>
		</card>
		<self-divider />
		<list-item :showRightArrow="false" :titlePadding="false">
			<view class="">
				<text class="text-muted pr-3">收票人手机:</text>
				<text>个人</text>
			</view>
		</list-item>
		<list-item :showRightArrow="false" :titlePadding="false">
			<view class="">
				<text class="text-muted pr-3">发票内容:</text>
				<text>商品明细</text>
			</view>
		</list-item>
		<self-divider />
		<list-item :showRightArrow="false" :titlePadding="false">
			<view class="">
				<text class="text-muted pr-3">收票人手机:</text>
				<text>158****1215</text>
			</view>
		</list-item>
		<view class="text-light-muted p-2 d-flex flex-column">
			<text>发票须知：</text>
			<text>1.发票为实际支付金额，不包括优惠券等；</text>
			<text>2.电子发票可在订单完成后，在订单详情中查看；</text>
		</view>
	</view>
</template>

<script>
	import card from '@/components/common/self-card.vue'
	import radioTagGroup from '@/components/common/radio-tag-group2.vue'
	import listItem from '../../components/common/list-item.vue'
	export default {
		components: {
			card,
			radioTagGroup,
			listItem
		},
		data() {
			return {
				label1: {
					selected: 0,
					list: [{
						name: "电子发票"
					}, ]
				},
				label2: {
					selected: 0,
					list: [{
							name: "个人"
						},
						{
							name: "单位"
						},
					]
				}
			}
		},
		methods: {
			changeScreen(item,index) {
				item.selected = index
			}
		},
		onBackPress() {
			let text = this.label1.list[this.label1.selected].name +'-' +  this.label2.list[this.label2.selected].name
			uni.$emit('chooseInvoice',text)
		}
	}
</script>

<style>

</style>
