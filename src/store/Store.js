import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
import VuexPersistence from 'vuex-persist'




export default new Vuex.Store({
  state: {
    Sidebar_drawer: false,
    LayoutType: "full-sidebar",
    SidebarColor: "white",
    navbarColor: "primary",
    logoColor: "white",
     

    userToken:null,
    user:null,
    EditedPost:[],
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_LAYOUT_TYPE(state, payload) {
      state.LayoutType = payload;
    },
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_user(state, payload) {
      state.user = payload;
    },
    setUserToken(state, userToken) {
      state.userToken=userToken;
      localStorage.setItem('userToken',JSON.stringify(userToken));
      axios.defaults.headers.common.Authorization = 'Bearer ${userToken}'
      
    },
    removeUserToken(state)
    {
      state.userToken= null;
      localStorage.removeItem('userToken');

    },
    Logout(state)
    {
      state.userToken= null;
      state.user= null;
      localStorage.removeItem('userToken');
      window.location.pathname="demos/free-admin-templates/xtreme-vuesax-free/main/ui-elements/Display_posts";
    },
    EditPost(state , post)
    {
      state.EditedPost = post;
    },

     
  },
  actions: {

    registerUser({commit}, payload){
      axios.post('http://127.0.0.1:8000/api/user/register',payload)
      .then(response=>{
        console.log(response)
        commit('setUserToken',response.data.token)
      })
      .catch(err=>{
        console.log(err)
      })

    },
    loginUser({commit}, payload){
      axios.post('http://127.0.0.1:8000/api/user/login',payload)
      .then(response=>{
        console.log(response)
        commit('setUserToken',response.data.token);
        commit("SET_user", response.data.user);
      })
      .catch(err=>{
        console.log(err)
      })

    },

    

   /*adminlogout({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8000/api/admin/login?api_password=2172000", {
          token: state.api_token
        })

        .then(res => {
          commit("SET_token", null);

          commit("SET_loggedIn", false);
          commit("SET_user", null);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },*/

  
    setLayoutType({ commit }, width) {
      commit("SET_LAYOUT_TYPE", width);
    },
    //
  },
  getters: {
     
    isLogged(state)
    {
      return !!state.userToken;
    },
    get_user(state) {
      return state.user;
    },
    isAdmin(state){
      if(state.user)
      {
      return state.user.is_admin;
      }
      return null;
    },
    postto_edit(state)
    {
      return state.EditedPost ;
    }
    
  },
});
