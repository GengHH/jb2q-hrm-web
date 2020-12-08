<template>
  <div id="infoGlorietteBox">
    <el-row v-if="colNum == 2" :gutter="20">
      <el-col :sm="24" :md="24" :lg="12" :xl="12" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            2
          </div>
      </el-col>
    </el-row>
    <el-row v-if="colNum == 3" :gutter="20">
      <el-col :sm="24" :md="8" :lg="8" :xl="8" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            3
          </div>
      </el-col>
    </el-row>
    <el-row v-if="colNum == 4" :gutter="20">
      <el-col :sm="24" :md="12" :lg="6" :xl="6" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            4
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoGloriette',
  props:{
    colNum:Number,
    infoList:Array
  },
  data(){
    return{
      // twoCol: false,
      // thereCol: false,
      // fourCol: false,
      list:[]
    }
  },
  computed: {
    // 根据传入的列数，动态生成响应式col的配置参数
    colNumProperty: function(){
      const colType = {};
      // if(this.$props.colNum === 2){
      //   //return {twoCol : true};
      //   this.colType.twoCol = true;
      // }else if(this.$props.colNum === 3){
      //   this.colType.thereCol = true;
      // }else if(this.$props.colNum === 4){
      //   //return {fourCol : true};
      //   this.colType.fourCol = true;
      // }else{
      //   this.$message("没有需要展示的数据");
      // }
      return colType;
    }
  }
}
</script>

<style lang='scss' scoped>
#infoGlorietteBox{
  width: 100%;
  .infoContent{
    width: 100%;
    height: 94%;
    margin: 2%;
  }
  & .el-col:nth-child(2n) > .infoContent{
    background-color: #999;
  }
  & .el-col:nth-child(2n+1) > .infoContent{
    background-color: #ccc;
  }
}
</style>