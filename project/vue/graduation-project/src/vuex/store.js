import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const state = {
  ajaxUrl: 'http://locahost:3000/request/',
  loginMes: {},
  staffListState: 1,
  datas: []
}

const mutations = {
  LOGIN_MESSAGE (state, obj) {
    state.loginMes = obj
  },
  CHANGE_STAFFLIST_STATE (state, num) {
    state.staffListState = num
  },
  ADD_DATA (state, arr) {
    state.datas = arr
  }
}

const actions = {
  addPerson (context, obj) {
    return Vue.http.post(state.ajaxUrl + 'user_login', obj)
    .then((res) => {
      console.log(res.data)
      if (res.data.success) {
        context.commit('LOGIN_MESSAGE', res.data.obj)
        if (res.data.obj.gtype) {
          router.push('/index/train/trainapply')
        } else {
          router.push('/admin/newstaff')
        }
      } else {
        alert(res.data.msg)
      }
    }, (res) => {
      console.log(res)
    })
  },
  changeStaffListState (context, num) {
    context.commit('CHANGE_STAFFLIST_STATE', num)
  },
  addData (context, arr) {
    context.commit('ADD_DATA', arr)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
