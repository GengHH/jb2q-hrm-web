<template>
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
</template>

<script>
//import { testData } from '@pub/mockTestData';
export default {
  name: "BaseCarousel",
  data: () => {
    return {
      navList:[
        {id:'6',path:'',nvaText:'6'},
        {id:'5',path:'',nvaText:'5'},
        {id:'4',path:'',nvaText:'4'},
        {id:'3',path:'',nvaText:'3'},
        {id:'2',path:'',nvaText:'2'},
        {id:'1',path:'/',nvaText:'1'},
      ]
    }
  },
  methods: {
    goPage() {

    },
  },
};
</script>

<style lang='scss' scoped>
.el-carousel{
  height: 300px;
  width: 100%;
  div {
    height: 300px;
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #1b579c;
  }
}
</style>
