<!--
 * @Author: GengHH
 * @Date: 2020-12-07 13:17:05
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-15 16:11:35
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseCarousel.vue
-->
<template>
  <el-carousel height="400px">
    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
      <!-- <h3 class="small">{{ item }}</h3> -->
      <img :src="item.path" alt="未加载" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
/**
 * 轮播图组件
 */
export default {
  name: 'BaseCarousel',
  data: () => {
    return {
      // navList: [
      //   { id: '6', path: '', nvaText: '6' },
      //   { id: '5', path: '', nvaText: '5' },
      //   { id: '4', path: '', nvaText: '4' },
      //   { id: '3', path: '', nvaText: '3' },
      //   { id: '2', path: '', nvaText: '2' },
      //   { id: '1', path: '/', nvaText: '1' }
      // ],
      carouselList: [
        { path: require('@/assets/img/banner.png') }
        // { path: require('@/assets/img/carousel1.png') },
        // { path: require('@/assets/img/carousel2.png') },
        // { path: require('@/assets/img/carousel3.png') },
        // { path: require('@/assets/img/carousel4.png') }
      ]
    };
  },
  methods: {
    goPage() {}
  }
};
</script>

<style lang="scss" scoped>
.el-carousel {
  //height: 300px;
  width: 100%;
  div {
    height: 400px;
    //height: auto !important;
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    //line-height: 150px;
    margin: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    //background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    //background-color: #1b579c;
  }
}
</style>
