import router from "@/router";
import routes from '../router'

export const validateLogin = () => {
    let userInfo: string | null = localStorage.getItem('userInfo');
    let backlen = window.history.length - 1;
    console.log(userInfo,routes.currentRoute.value)
      if(!userInfo){
        localStorage.clear();
        router.replace({ name: 'login' });
     }
    // if (!userInfo&&routes.currentRoute.value.name!=='login') {
    //     window.history.go(-backlen);
    //     localStorage.clear();
    //     router.replace({ name: 'login' });
    // }else if(!userInfo&&routes.currentRoute.value.name=='login'){
    //     localStorage.clear();
    //     //router.replace({ name: 'login' });
    // }else{
    //     router.replace({ name: 'login' });
    // }
}