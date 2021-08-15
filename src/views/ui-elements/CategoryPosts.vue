<template>
    <div class="container intro-container">

    <div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

         

        <!-- Blog Post -->
        <div class="media simple-post" v-for="post in categoryposts" v-bind:key="post.id">
          <img class="mr-3" src="img/p1.jpg" alt="Generic placeholder image">
          <div class="media-body">
            <h4 class="mt-0"><router-link :to="{name: 'post', params: { slug: post.slug }}"  > {{post.title}} </router-link></h4>
            {{post.body}}
            <ul class="list-inline list-unstyled d-flex post-info">
                  <li><span><i class="fa fa-user"></i> posted by : <strong class="text-primary">{{post.user.name}}</strong> </span></li>
                  <li>|</li>
                  <li><span><i class="fa fa-calendar"></i> {{post.AddedAt}} </span></li>
                  <li>|</li>
                  <span><i class="fa fa-comment"></i> {{post.comment_count}} comments</span>
                  
            </ul>
          </div>
        </div>
        
       
      

        <!-- Pagination -->
        <nav aria-label="...">
          <ul class="pagination float-right">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <span class="page-link">
                2
                <span class="sr-only">(current)</span>
              </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <!-- Search Widget -->
       

         

      
      </div>

    </div>
    <!-- /.row -->

  </div>
</template>

<script>
 
import axios from "axios";
  export default  ({
    name:"CategoryPosts",
    data () {
        return{
            
            categoryposts:[],

        }
    },


     created(){
      this.getCategoryPosts();

    },

    methods:{
      getCategoryPosts()
      {
        axios.get('http://127.0.0.1:8000/api/user/categoryPosts/'+this.$route.params.slug+'/posts')
        .then(response=>{
          console.log(response)
          this.categoryposts=response.data.Post
        })
      }
    },  
  })
</script>