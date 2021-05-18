<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <el-row :gutter="20">
      <el-col :span="leftSpan" id="leftNav">
        <router-view name="corpNavMenu" />
      </el-col>
      <el-col :span="rightSpan">
        <!-- <transition name="fade"> -->
        <router-view name="default" />
        <!-- </transition> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'corporationLayout',
  components: {
    // FooterIndex,
    // BaseSearch,
    // BaseCarousel,
    // BaseInfoGloriette,
  },
  data() {
    return {
      leftSpan: 4,
      rightSpan: 20
    };
  },
  computed: {},
  created() {
    this.changeMenuStyle();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        'resize',
        this._.debounce(
          //监听浏览器窗口大小改变
          //浏览器变化执行动作
          this.changeMenuStyle,
          500
        )
      );
    });
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
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding-top: 60px;
  //background-color: $g-gray1-color;
  .more-btn {
    margin: 20px auto;
    padding-left: 50px;
    padding-right: 50px;
    color: #fc6f3d;
    border: 1px solid #fc6f3d;
    display: block;
  }
  #leftNav {
    margin-top: 10px;
  }
}

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
