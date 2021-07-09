// 统一管理 vuex 的资源，在这里引入后vuex的方法就可以引用这里各文件中的数据
import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import getters from './getters'
import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book
  },
  getters,
  actions
})
