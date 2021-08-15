<template> 
 <div class="container intro-container">

    <div class="row">

      <div  class="col-md-8" v-if="issearching">
        ....searching
      </div>

      <!-- Blog Entries Column -->
      <div class="col-md-8"  v-else>

        

        <!-- Blog Post -->
        <div class="media simple-post" v-for="post in posts " v-bind:key="post.id">
          <img class="mr-3" :src="post.image" style="width:100px;height:60px;border:1px solid #e7e7e7" alt="Generic placeholder image">
          <div class="media-body">
            <!--<h4 class="mt-0"><a :href="'/ui-elements/blog_post/'+ post.id"    >{{post.title}}</a></h4>-->
            <h4 class="mt-0"><router-link :to="{name: 'post', params: { slug: post.slug }}"  > {{post.title}} </router-link></h4>
                       
            <!--<h4 class="mt-0"> <router-link to="'/ui-elements/blog_post'">{{post.title}}</router-link></h4>-->
             {{post.body}}
            <ul class="list-inline list-unstyled d-flex post-info">
                  <li><span><i class="fa fa-user"></i> posted by ::{{post.user.name}}   <strong class="text-primary">    </strong> </span></li>
                  <li>  | |</li>
                  <li><span><i class="fa fa-calendar"></i>   {{post.AddedAt}}  </span></li>
                  <li>| |</li>
                  <span><i class="fa fa-comment"></i> {{post.comment_count}}   comments</span>
                  
            </ul>
             
          </div>
        </div>
         
        
       
         
      

        <!-- Pagination -->
      <!--  <nav aria-label="...">
          <ul class="pagination float-right">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <span class="page-link">
                2
                <span class="sr-only"></span>
              </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>-->

      </div>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card my-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for..." v-model="searchpost">
              <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
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
</template>
<script>
import axios from "axios"

export default  ({
     
    name: "Display_posts",

    data () {
        return{
            posts:[], 
            category:[],
            searchpost:'',
            issearching : false ,



        }
    },
    watch:{
      searchpost(query)
      {
        if(query.length > 0)
        {
          console.log(query)
          axios.get('http://127.0.0.1:8000/api/user/searchposts/'+query)
          .then(response=>{
            console.log(response)
            this.posts = response.data.Post
            //this.issearching=true
            //this.getposts()
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }
      
    },

     created(){
      this.getCategory();
      this.getposts();

    },

    methods:{
      getCategory()
      {
        axios.get('http://127.0.0.1:8000/api/user/show_category')
        .then(response=>{
          console.log(response)
          this.category=response.data.Category
        })
      }
      ,
      getposts()
      {
         axios.get("http://127.0.0.1:8000/api/user/index")
        .then(response =>{
          console.log(response)
            this.posts = response.data.Post
            
        })
        .catch(error=>{
            this.error = "there is error in  save process";
             console.log(error)
        })
      }
    },  
    

    mounted (){

       

    }
})
</script>

