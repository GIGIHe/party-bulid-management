import Vue from "vue";
import Router from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(Router);
const components = {
  Layout: () => import("@/views/Layout/layout"),
  Index: () => import("@/views/Layout/index"),
  AddAdmin: () => import("@/views/AddAdmin/index"),
  AdminList: () => import("@/views/AdminList/index"),
  AddNews: () => import("@/views/News/addNews"),
 NewsList: () => import("@/views/News/newsList")
};
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "",
      meta: {
        title: "登录"
      },
      component: () => import("@/views/Login")
    },
    {
      path: "/layout",
      name: "layout",

      component: components.Layout,
      redirect: "/layout/index",
      children: [
        {
          path: "index",
          name: "index",
          meta: {
            title: "首页"
          },
          component: components.Index
        },
        {
          path: "addAdmin",
          name: "addAdmin",
          meta: {
            title: "添加管理员"
          },
          component: components.AddAdmin
        },
        {
          path: "editAdmin",
          name: "editAdmin",
          meta: {
            title: "编辑管理员"
          },
          component: components.AddAdmin
        },
        {
          path: "adminList",
          name: "adminList",
          meta: {
            title: "管理员列表"
          },
          component: components.AdminList
        },
        {
          path: "addNews",
          name: "addNews",
          meta: {
            title: "添加新闻"
          },
          component: components.AddNews
        },
        {
          path: "editNews",
          name: "editNews",
          meta: {
            title: "添加新闻"
          },
          component: components.AddNews
        },
        {
          path: "newsList",
          name: "newsList",
          meta: {
            title: "新闻列表"
          },
          component: components.NewsList
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  Nprogress.start();
  next();
});
router.afterEach((to, from) => {
  Nprogress.done();
});
export default router;
