<template>
   
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#"> </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active" v-if="isAdmin">
             <router-link  class="nav-link" to="/ui-elements/Admin">Admin
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item active">
             <router-link  class="nav-link" to="/ui-elements/Display_posts">Posts
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
          <router-link  class="nav-link" to="/ui-elements/Display_posts">Blog</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">Contact</a>
          </li>
          
          <li v-if="!islogged" class="nav-item register-btn reg-login-btn" data-toggle="modal" data-target="#register-modal">
            <router-link class="btn btn-info nav-link" to="/Register">Register</router-link>
            
          </li>
          ||
          <li v-if="!islogged" class="nav-item reg-login-btn" data-toggle="modal" data-target="#login-modal">
            <router-link class="btn btn-info nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="islogged" @click.stop="Logout" class="nav-item reg-login-btn" data-toggle="modal" data-target="#login-modal">
            <router-link class="btn btn-info nav-link" to="/login">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapState } from "vuex";


export default {
  name: "vertical-header",
  data: () => ({
    showToggle: false,

    
  }),
  components: {
     
  },
  computed: {
    ...mapState(["navbarColor", "logoColor", "LayoutType"]),
     token() {
      return this.$store.getters.get_token;
    },
     islogged(){
        return this.$store.getters.isLogged; 
      },
    User()
    {
      return this.$store.getters.get_user;
    },
    isAdmin(){
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    profile(){
       this.$router.push("/ui-elements/profile");
    },
    showMobileSidebar() {
      this.$store.commit("SET_SIDEBAR_DRAWER", true);
    },
      Logout() {
      this.$store.commit('Logout');
         
    }
  },
};
</script>
