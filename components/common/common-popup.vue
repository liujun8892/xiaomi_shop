<template>
	<view >
			<view class="lj_popup" :class="className">
				<view class="mask" @click="event" @touchmove.stop.prevent="moveHandle">
				</view>
				<view class="body" @touchmove.stop.prevent="moveHandle">
					<slot></slot>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props: {
			className: String,
			default: 'none'
		},
		methods:{
			event() {
				this.$emit('hide')
			},
			moveHandle(){}
		}
	}
</script>

<style scoped>
	@keyframes bodyShow{
		from{
			transform: translateY(0);
		}
		to{	
			transform: translateY(-100%);
		}
	}
	@keyframes bodyHide{
		from{
			/* opacity: 1; */
			transform: translateY(-100%);
		}
		to{
			/* opacity: 0.5; */
			transform: translateY(0);
		}
	}
	@keyframes maskShow{
		from{
			opacity: 0;
		}
		to{	
			opacity: 1;
		}
	}
	@keyframes maskHide{
		from{
			opacity: 1;
		}
		to{	
			opacity: 0;
		}
	}
	.lj_popup {
		overflow: hidden;
		display: none;
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2000;
	}
	._popup.none{
		display: none;
	}
	.lj_popup .mask {
		overflow: hidden;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		z-index: 2001;
		width: 100%;
		height: 100%;
	}
	.lj_popup .body {
		overflow: hidden;
		position: fixed;
		bottom: -1035rpx;
		width: 100%;
		height: 1035rpx;
		background-color: #fff;
		z-index: 2002;
		border-radius: 21rpx 21rpx 0 0;
	}
	
	.lj_popup.show  .mask {
		animation: maskShow 0.2s forwards;
	}
	.lj_popup.show  .body {
		animation: bodyShow 0.2s forwards;
	}
	.lj_popup.hide  .mask {
		animation: maskHide 0.2s forwards;
	}
	.lj_popup.hide  .body {
		animation: bodyHide 0.2s forwards;
	}
	.lj_popup.show {
		display: block;
	}
	.lj_popup.hide {
		display: block;
	}
	.lj_popup.hide.none {
		display: none;
	}
</style>
