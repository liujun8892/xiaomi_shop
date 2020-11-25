import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/modules/cart.js'
import addr from '@/store/modules/addr.js'
import user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		cart,
		addr,
		user
	}
})