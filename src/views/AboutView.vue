<template >
  <div style="background: #F5F5F5;" class="h-full">
    <div class="flex items-center justify-center w-full h-auto bg-origan">
      <span class="text-lg font-thin text-white">个人中心</span>
    </div>
    <div class="relative">
      <div class="flex flex-col w-full h-auto pb-10 bg-origan">
        <div class="flex justify-between w-full p-5">
          <div class="flex flex-row">
            <img class="mr-2 h-14 w-14 rounded-4xl" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKia31mguZMJJic9l5V8ZVQpl4ttjgVPyBvM0zXMaNvnq1UKYqpWc2aXCgmRQjsJhIjpBXDQia0QosZw/132" alt="">
            <div class="flex flex-col items-start justify-between h-14">
              <span class="text-white">何能相见如初</span>
              <span class="text-sm text-plead">ID:5</span>
            </div>
          </div>
          <div class="flex flex-row">
            <img class="w-5 h-5 mr-2 rounded-4xl" src="@/assets/logo.svg" alt="">
            <img class="w-5 h-5 rounded-4xl" src="@/assets/logo.svg" alt="">
          </div>
        </div>
        <div class="flex items-center justify-around w-full">
          <div  v-for="(item,index) in tabList" :key="index" class="flex items-center justify-around text-white " style="width: 30%;">
            <div class="flex flex-col items-center">
              <span class="text-2xl font-semibold">{{ item.num }}</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="h-4 bg-white w-1px"  :class="index<tabList.length-1?'':'hidden'" ></div>
          </div>
        </div>
      </div>
      <div class="w-11/12 mx-auto my-0 bg-yellow-400 ">
        <div class="absolute flex justify-end w-full h-20 bg-no-repeat bg-cover bg-user-vip -bottom-12">
          <div class="flex items-center justify-between w-10/12 h-full ">
            <div class="flex flex-col justify-start text-AE5A2A">
              <span class="">会员可享多项权益</span>
              <span class="text-xs">未开通会员</span>
            </div>
            <div class="px-2 py-0.5 bg-white rounded-4xl mr-4">
              <span class="text-sm text-AE5A2A">立即激活</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-border w-11/12 p-2 mx-auto my-0 bg-white rounded-lg mt-14">
      <div class="flex items-center justify-between mb-2.5">
        <span class="font-semibold ">订单中心</span>
        <span class="text-sm text-plead">查看全部></span>
      </div>
      <div class="flex items-center justify-between"  >
        <div class="flex flex-col items-center" v-for="(item,index) in orderList">
          <img src="@/assets/logo.svg" class="w-8 h-8 mb-1" alt="">
          <span class="text-sm text-plead">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="w-11/12 p-2 mx-auto my-0 mt-3 bg-white rounded-lg">
      <div class="flex items-center justify-between mb-2.5">
        <span class="font-semibold ">我的服务</span>
      </div>
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex flex-col items-center w-1/4 mb-2" v-for="(item,index) in fncList">
          <img src="@/assets/logo.svg" class="w-8 h-8 mb-1" alt="">
          <span class="text-sm text-plead">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';


let tabList = reactive([{name:'收藏',num:0},{name:'优惠券',num:0},{name:'积分',num:0},]);
let orderList = reactive([{name:'代付款',},{name:'代发货',},{name:'代收货',},{name:'代评价',},{name:'退款',}])
let fncList = reactive([{name:'付费会员',},{name:'积分中心',},{name:'联系客服',},{name:'优惠券',},{name:'我的收藏',},
{name:'地址信息',},{name:'砍价记录',},{name:'浏览记录',},{name:'我的等级',}])

// let fnc = ()=>{
//   return new Promise((resolve,reject)=>{
//     resolve('传递过去的数据');
//     setTimeout(()=>{

//     },1000)
//   }).then((value)=>{
//     console.log(value,'11111');
//     return '1111'
//   }).then((value)=>{
//     console.log(value,'222')
//   })
// }
// fnc();
</script>

<style>

</style>
