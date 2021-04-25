<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <el-row class="person-layout" :gutter="20">
      <el-col id="personNavMenuFixed" :span="leftSpan">
        <router-view name="personNavMenu" />
      </el-col>
      <el-col :span="rightSpan"></el-col>
    </el-row>
    <el-row class="person-layout" :gutter="60">
      <el-col class="col-place-holder" :span="leftSpan"> </el-col>
      <el-col id="personContentFixed" :span="rightSpan">
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
    return {
      leftSpan: 4,
      rightSpan: 20
    };
  },
  computed: {
    jobFaieList: function() {
      return this.showList ? this.showList.slice(0, 3) : [];
    }
  },
  created() {
    this.changeMenuStyle();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        'resize',
        this._.throttle(
          //监听浏览器窗口大小改变
          //浏览器变化执行动作
          this.changeMenuStyle,
          500
        )
      );
    });
  },
  updated() {
    console.log('layout----------------update');
  },
  methods: {
    changeMenuStyle() {
      if (window.innerWidth < 1350) {
        this.leftSpan = 2;
        this.rightSpan = 22;
      } else {
        this.leftSpan = 4;
        this.rightSpan = 20;
      }
    },
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
      //width: 14.5% !important;
      position: fixed;
      z-index: 999;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    #personContentFixed {
      float: right;
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

.clearfix {
  zoom: 1;
}
// // 职位信息列表类型
// #jobInfoGloriette {
//   ::v-deep .el-col {
//     color: blue;
//     //height: 100px;
//   }
// }
// // 单位信息列表类型
// #corpInfoGloriette {
//   ::v-deep .el-col {
//     color: red;
//     //height: 100px;
//   }
// }
</style>
