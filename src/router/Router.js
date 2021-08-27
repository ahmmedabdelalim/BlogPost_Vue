import Vue from "vue";
import Router from "vue-router";
import Store from "../store/Store";
//import Store from "../store/Store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      redirect: "/starter",
      component: () => import("@/layouts/full-layout/FullLayout"),
      
      children: [
        {
          name: "Starter",
          path: "starter",
          component: () => import("@/views/Starter"),
           
        },
        
         
        {
          name: "Admin",
          path: "/ui-elements/Admin",
          component: () => import("@/views/ui-elements/Admin"),
          meta: { requiresAuth: true },
        },
        {
          name: "AddPost",
          path: "/ui-elements/AddPost",
          component: () => import("@/views/ui-elements/AddPost"),
          meta: { requiresAuth: true },
        },
        {
          name: "EditPost",
          path: "/ui-elements/EditPost",
          component: () => import("@/views/ui-elements/EditPost"),
          meta: { requiresAuth: true },
        },
        {
          name: "posts",
          path: "/ui-elements/Display_posts",
          component: () => import("@/views/ui-elements/Display_posts"),
          
        },
        {
          name: "post",
          path: "/ui-elements/blog_post/:slug",
          component: () => import("@/views/ui-elements/blog_post/"),
           
        },
        {
          name: "CategoryPosts",
          path: "/ui-elements/CategoryPosts/:slug/posts",
          component: () => import("@/views/ui-elements/CategoryPosts/"),
           
        },
        
        {
          name: "Profile",
          path: "/ui-elements/profile",
          component: () => import("@/views/ui-elements/Profile"),
          
        },
      ],
    },
    {
    path: "/",
    redirect: "/user",
    component: () => import("@/layouts/User/FullLayout"),
    
    children:
    [
      {
        name: "UserStarter",
        path: "/user",
        component: () => import("@/views/UserStarter"),
        
      },
      {
        name: "AddUser",
        path: "user/adduser",
        component: () => import("@/views/User-element/AddUser"),
        
      },
      
    ],
  },

    {
      path: "*",
      component: () => import("@/views/Starter"),
      meta: { requiresAuth: true },
    },
    {
      name: "login",
      path: "/login",
      
      component: () => import("@/views/login"),
    },
    {
      name: "Register",
      path: "/Register",
       
      component: () => import("@/views/Register"),
    },

  ],
});

router.beforeEach((to, from, next) =>{

  if (to.matched.some(record => record.meta.requiresAuth)){

    if(Store.state.user.is_admin){
      next();

    }
    else {
      next({
        path:"/ui-elements/Display_posts",
        
      });
    }
  }
   
  
  else {
    next(); // make sure to always call next()!
  }
});



export default router;
