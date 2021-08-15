<template>
      <!-- Page Content -->
  <div class="container">

    <div class="row">

      <!-- Post Content Column -->
      <div class="col-lg-8"  >

        <!-- Title -->
        <h1 class="mt-4"  >{{post.title}} </h1>

        <!-- Author -->
        <p class=" alert alert-info" style="width: fit-content;
        padding: 5px;
        color: #142d31;" v-if="post.category">   {{post.category.name}}
        </p>

        <hr>

        <!-- Date/Time -->
        <p>Posted on <strong class="badge badge-primary p-1">Added At {{post.added_at}} </strong>
            <span class="float-right"><strong class="badge badge-info p-1">{{Comments.length}} </strong> comments</span></p>
    
        <hr>

        <!-- Preview Image -->
        <img class="img-fluid rounded" :src="post.image" style="width:900px;max-height:300px" alt="">

        <hr>

        {{post.body}}
        <hr>

        <!-- Comments Form -->
        <div class="card my-4">
          <h5 class="card-header">Leave a Comment:</h5>
          <div class="card-body">
            <form>
              <input type="hidden" name="" v-model="post_id">
              <input type="hidden" name="" v-model="user_id">
              <div class="form-group">
                <textarea class="form-control" rows="3"  v-model="body"></textarea>
              </div>
              <button v-if="islogged" type="submit" class="btn btn-primary" @click.prevent="addComment" >Submit</button>
              <h6 v-if="!islogged" > To Leave Comment You Should Login</h6>
            </form>
          </div>
        </div>

        <!-- Single Comment -->
        <div class="media mb-4" v-for="comment in Comments" v-bind:key="comment.id">
          <img class="d-flex mr-3 rounded-circle" :src="'/img/'+comment.user.image" style="height:50px ; width:50px" alt="">
          <div class="media-body">
            <h5 class="mt-0" >{{comment.user.name}}</h5>
          {{comment.body}}
          </div>
        </div>

        
      </div>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">
       
        
        <!-- Search Widget -->
        <div class="card my-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for...">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body"  >
            <div class="row">
              <div class="col-lg-6">
                <ul class="list-unstyled mb-0">
                  <li v-for="categ in category" v-bind:key="categ.id">
                    <router-link :to="{name: 'CategoryPosts', params: { slug: categ.slug }}">{{categ.name}}</router-link>
                  </li>
                   
                   
                </ul>
              </div>
             
            </div>
          </div>
        </div>


      </div>

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->
</template>

<script>
import axios from "axios"

export default  ({
    name:"blog_post",

      data () {
        return{
            post:[],
            category:[],
            body:'',
            post_id:'',
            user_id:'',
            Comments:[],




        }
    },
    
    created(){
      this.getCategory();
      this.getPost();

    },
    computed:{
      islogged(){
        return this.$store.getters.isLogged;
      }
    },

    methods:{
      getPost(){
        
        axios.get('http://127.0.0.1:8000/api/user/show/' + this.$route.params.slug)
        .then(response =>{
            console.log(response)
            this.post = response.data.Post
            this.post_id = this.post.id
            this.user_id = this.$store.getters.get_user.id;
            this.Comments = response.data.Post.comments
        })
        .catch(error=>{
            this.error = "there is error in  save process";
             console.log(error)
        })

      },
      getCategory()
      {
        axios.get('http://127.0.0.1:8000/api/user/show_category')
        .then(response=>{
          console.log(response)
          this.category=response.data.Category
        })
      },
      addComment()
      {
        let{body,post_id,user_id}=this;
        axios.post('http://127.0.0.1:8000/api/user/comment/create',{body,post_id,user_id})
        .then(response=>{
          console.log(response)
           this.Comments.unshift(response.data)
        })
        .catch(err=>{
           console.log(err)
        })
      }
    },  
     
//+ this.$route.params.id
     mounted (){

    },
    
       
    
})
</script>
