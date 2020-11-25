<template>
	<view style="width: 750rpx;min-height: 100vh;background-color: #EEEEEE;">
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="text-muted font-md mr-3 flex-shrink">收货人:</view>
			<input type="text" v-model="form.name" class="flex-1" />
		</view>
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="text-muted font-md mr-3 flex-shrink">手机号码:</view>
			<input type="text" v-model="form.phone" class="flex-1" />
		</view>
		<self-divider />
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="text-muted font-md mr-3 flex-shrink">所在地区:</view>
			<input type="text" :value="path" placeholder="请选择所在区域" disabled @click="showMulLinkageThreePicker" class="flex-1" />
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="text-muted font-md mr-3 flex-shrink">详细地址:</view>
			<input type="text" v-model="form.address" class="flex-1" />
		</view>
		<self-divider />
		<view class="p-2 d-flex a-center border-bottom bg-white">
			<view class="text-muted font-md mr-3 flex-shrink">设为默认地址:</view>
			<switch :checked="form.default===1?true:false" @change="changeSwitch" color="#FD6801" class="ml-auto" />
		</view>
		<view class="main_bg_color d-flex text-white a-center j-center rounded" style="width: 710rpx;height: 100rpx;margin: 30rpx auto 0;"
		 @click="submit">保存</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/uni/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			mpvueCityPicker
		},
		computed: {
			...mapState({
				addrList: state => state.addr.list
			}),
			path() {
				if (!this.form.province) return
				return `${this.form.province}-${this.form.city}-${this.form.district}`
			}
		},
		data() {
			return {
				isEdit: false,
				addrIndex: -1,
				themeColor: '#007AFF',
				pickerValue: [0, 0, 0],
				form: {
					province: '',
					city: '',
					district: '',
					address: '',
					zip: '',
					name: "",
					phone: "",
					default: 0 // 0 不是默认 1是默认
				},
				timer: null
			}
		},
		methods: {
			...mapActions(['createAddrAction', 'editAddrAction']),
			// 新增地址
			doCreateAddr() {
				this.$http.post(`/useraddresses`, this.form, {
						token: true
					})
					.then(res => {
						console.log(res, '添加的地址信息');
						uni.showToast({
							title: '添加地址成功'
						})
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 前一个页面
						this.timer = setTimeout(() => {
							uni.redirectTo({
								url: '/' + beforePage.route,
							});
							clearTimeout(this.timer)
						}, 1500)
					})
			},
			changeSwitch(e) {
				this.form.default = e.detail.value ? 1 : 0
			},
			// 修改地址
			doEditAddr() {
				let obj = this.form
				this.$http.post(`/useraddresses/${this.form.id}`, this.form, {
						token: true
					})
					.then(res => {
						this.editAddrAction({index:this.addrIndex,addr: this.form})
						uni.showToast({
							title: '修改地址成功',
							icon:2
						})
						this.timer = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
							clearTimeout(this.timer)
						}, 1500)
					}).catch(err => {
						console.log(err);
					})
			},

			submit() {
				// 新增
				if (!this.isEdit) return this.doCreateAddr()
				// 修改
				this.doEditAddr()

			},
			// 三级联动确定
			onConfirm(e) {
				let pathArr = e.label.split('-')
				console.log(pathArr);
				this.form.province = pathArr[0]
				this.form.city = pathArr[1]
				this.form.district = pathArr[2]
				this.pickerValue = e.value
			},
			// 显示三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
		},
		onLoad(opts) {
			if (opts.type && opts.type === 'edit') {
				this.isEdit = true
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				})
				this.addrIndex = Number(opts.index)
				this.form = this.addrList[this.addrIndex]
				this.form.default = this.addrIndex === 0 ? 1 : 0
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
	}
</script>

<style>

</style>
