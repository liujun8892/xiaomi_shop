<template>
	<view style="height: 100%; background-color: #FFFFFF;">
		<!-- 登录页状态栏占位 -->
		<uni-status-bar />
		
		<!-- 导航栏 -->
		<view class="d-flex j-sb a-center" style="padding: 20rpx 25rpx;">
			<view class="iconfont icon-shanchu1 text-light-muted" @click="goBack"></view>
			<view class="text-light-muted">忘记密码</view>
		</view>
		
		<!-- 登录 -->	
		<view class="px-5">
			<view class="font-lg font-weight py-5">
				密码登录
			</view>
			<input type="text" value="" class="uni-input2 border-bottom" placeholder="请输入手机号/邮箱/小米账号" @focus="userFocus" @blur="userBlur" :class="{'ipt-active':focus.username}" v-model="form.username"/>
			<input type="text" value="" class="uni-input2 border-bottom" placeholder="请输入密码" style="margin: 50rpx 0 80rpx 0;" @focus="passFocus" @blur="passBlur" :class="{'ipt-active':focus.password}" v-model="form.password"/>
			<view class=" d-flex a-center j-center text-white rounded-md main_bg_color " style="width: 100%; height: 100rpx;" hover-class="main_bg_hover_color" @click="submit">
				登录
			</view>
			<view class="d-flex a-center mt-3">
				<label @click="checked = !checked">
					<checkbox :value="checked" class="ml-1" style="transform:scale(0.7)" color="#FD6801" />
					<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
				</label>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni/uni-status-bar/uni-status-bar.vue'
	import card from '@/components/common/self-card.vue'
	import {mapMutations} from 'vuex'
	export default {
		components:{
			uniStatusBar,
			card
		},
		data() {
			return {
				checked: false,
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{
							rule: /^\w{3,20}$/,
							msg: '账号长度6~20, 只能包含数字、字母、下划线'
						}
					],
					password: [
						{
							rule: /^.{6,20}$/,
							msg: '密码长度6~20'
						}
					]
				},
				focus: {
					username: false,
					password: false
				},
				timer: null
			}
		},
		methods: {
			...mapMutations(['login']),
			userFocus() {
				this.focus.username = true
			},
			userBlur() {
				this.focus.username = false
			},
			passFocus() {
				this.focus.password = true
			},
			passBlur() {
				this.focus.password = false
			},
			validData(key) {
				let res = true
				this.rules[key].forEach(v => {
					if(!(v.rule.test(this.form[key]))){
						res = false
						uni.showToast({
							title:v.msg,
							icon:'none'
						})
						return false
					}
				})
				return res
			},
			submit() {
				// 验证用户名
				if(!this.validData('username')) return
				// 验证密码
				if(!this.validData('password')) return
				// 验证协议
				if(!this.checked) return uni.showToast({
					title: '请阅读xxx协议',
					icon:'none'
				})
				// 登录
				uni.showLoading({
					title: '登录中',
					mask: true
				});
				this.$http.post(`/login`,this.form).then(res => {
					this.login(res)
					uni.hideLoading()
					uni.showToast({
						title:'登录成功',
						icon:'none',
						duration:500,
						success() {
							// 加载购物车数据
							uni.$emit('updateCartData')
						}
					})
					this.timer = setTimeout(()=>{
						clearTimeout(this.timer)
						this.goBack()
					},500)
				})
				
				
			},
			goBack() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
.ipt-active {
	border-color: #FD6801;
}

</style>
