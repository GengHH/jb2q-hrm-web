<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <el-row class="person-layout" :gutter="20">
      <el-col id="personNavMenuFixed" :span="6">
        <router-view name="personNavMenu" />
      </el-col>
      <el-col :span="18"> </el-col>
    </el-row>
    <el-row class="person-layout" :gutter="20">
      <el-col class="col-place-holder" :span="6"> </el-col>
      <el-col :span="18">
        <!-- <transition name="fade"> -->
        <router-view name="default" />
        <!-- </transition> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'personLayout',
  data() {
    return {};
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  methods: {
    jobHandleClick() {
      console.log(1);
    },
    corpHandleClick() {
      console.log(2);
    },
    showMore() {
      this.$message('this is more');
    }
  },
  created() {
    // console.log("index begin creating");
    // console.log(this);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  //min-height: calc(100% - 60px);
  min-height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  padding-top: 60px;
  // position: absolute;
  // bottom: 0;
  // top: 60px;
  // left: 5%;
  .person-layout {
    margin: 0 !important;
    height: 100%;
    .col-place-holder {
      height: 1px;
    }
    #personNavMenuFixed {
      width: 22.5% !important;
      position: fixed;
      z-index: 999;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
  }
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }
}

// .el-carousel {
//   height: 300px;
//   width: 100%;
//   div {
//     height: 300px;
//     width: 100%;
//   }

//   .el-carousel__item h3 {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 150px;
//     margin: 0;
//   }

//   .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
//   }

//   .el-carousel__item:nth-child(2n + 1) {
//     background-color: #1b579c;
//   }
// }

// #carouselBox {
//   margin: 20px 0;
//   .el-col {
//     margin: 10px 0;
//   }
// }

// .logo-module {
//   width: 100%;
//   height: 300px;
//   background: #ff9954 linear-gradient(to right, #ff9954, #fc6f3d);
//   border-radius: 3px;
//   padding: 0 12px;
//   display: inline-block;

//   .module-logs {
//     color: #fda749;
//     background: #fff4ed;
//     font-size: 24px;
//     line-height: 120px;
//     height: 120px;
//     border-radius: 3px;
//     margin: 20px 0;

//     & span:first-child {
//       width: 100px;
//       height: 100px;
//       border-radius: 50%;
//       text-align: center;
//       line-height: 56px;
//       display: block;
//       background: #fff;
//       float: left;
//       margin: 10px 20px;
//     }
//   }
//   .or-font {
//     .or-br-color i {
//       font-size: 60px;
//       margin: 20px 0;
//       display: block;
//     }
//   }
//   .co-font {
//     .co-br-color i {
//       font-size: 60px;
//       margin: 20px 0;
//       display: block;
//     }
//   }
// }
.clearfix {
  zoom: 1;
}
// 职位信息列表类型
#jobInfoGloriette {
  ::v-deep .el-col {
    color: blue;
    //height: 100px;
  }
}
// 单位信息列表类型
#corpInfoGloriette {
  ::v-deep .el-col {
    color: red;
    //height: 100px;
  }
}
</style>
