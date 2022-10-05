import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,anyRoutes,asyncRoutes,constantRoutes } from '@/router'
import router from '@/router';
import cloneDeep from 'lodash/cloneDeep'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    //角色信息
    roles:[],
    //按钮权限的信息
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
    resultAsyncRoutes:[],
    //用户最终需要展示全部路由
    resultAllRputes:[],
    
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_UNSERINFO:(state,userInfo)=>{
  //用户名
  state.name = userInfo.name;
  //用户头像
  state.avatar = userInfo.avatar;
  //菜单权限标记
  state.routes = userInfo.routes;
  //按钮权限标记
  state.buttons = userInfo.buttons;
  //角色
  state.roles = userInfo.roles;
  },
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
state.resultAsyncRoutes=asyncRoutes
state.resultAllRputes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
router.addRoutes(state.resultAllRputes)
  }
}

const computedAsyncRoutes=(asyncRoutes,routes)=>{
 return asyncRoutes.filter(item=>{
    if(routes.indexOf(item.name)!=-1){
      if(item.children &&item.children.length){
        item.children=computedAsyncRoutes(item.children,routes)
      }
 return true
    }
  })
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        commit('SET_UNSERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
       
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

