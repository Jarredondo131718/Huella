import { createRouter, createWebHistory } from "vue-router";

const routes = [
  
  


  // {
  //   path: "/",
  //   component: () =>
  //     import(
  //       /* webpackChunkName:"NoFoundComponent" */ "@/components/NoFoundComponent"
  //     )
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


// router.beforeEach(to => {
//   if (!hasNecessaryRoute(to)) {
//     router.addRoute(generateRoute(to))
//     // trigger a redirection
//     return to.fullPath
//   }
// })

export default router;
