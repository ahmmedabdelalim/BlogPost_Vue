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
          name: "Alert",
          path: "/ui-elements/alert",
          component: () => import("@/views/ui-elements/Alert"),
          
        },
        {
          name: "AddItem",
          path: "/ui-elements/AddItem",
          component: () => import("@/views/ui-elements/AddItem"),
          
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
          name: "Avatar",
          path: "/ui-elements/avatar",
          component: () => import("@/views/ui-elements/Avatar"),
          
        },
        {
          name: "Badge",
          path: "/ui-elements/badge",
          component: () => import("@/views/ui-elements/Badge"),
          
        },
        {
          name: "Breadcrumb",
          path: "/ui-elements/breadcrumb",
          component: () => import("@/views/ui-elements/Breadcrumb"),
          
        },
        {
          name: "Buttons",
          path: "/ui-elements/buttons",
          component: () => import("@/views/ui-elements/Buttons"),
           
        },
        {
          name: "Button Group",
          path: "/ui-elements/button-group",
          component: () => import("@/views/ui-elements/ButtonGroup"),
          
        },

        {
          name: "Cards",
          path: "/ui-elements/cards",
          component: () => import("@/views/ui-elements/Cards"),
          
        },

        {
          name: "Dropdown",
          path: "/ui-elements/dropdown",
          component: () => import("@/views/ui-elements/Dropdown"),
          
        },
        {
          name: "Popover",
          path: "/ui-elements/popover",
          component: () => import("@/views/ui-elements/Popover"),
          
        },

        {
          name: "Toasts",
          path: "/ui-elements/toasts",
          component: () => import("@/views/ui-elements/Toasts"),
          
        },
        {
          name: "Tooltip",
          path: "/ui-elements/tooltip",
          component: () => import("@/views/ui-elements/Tooltip"),
          
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
