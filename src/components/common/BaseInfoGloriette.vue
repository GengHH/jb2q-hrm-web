<template>
  <div id="infoGlorietteBox">
    <!-- <el-row v-if="colNum == 2" :gutter="20">
      <el-col :sm="24" :md="24" :lg="12" :xl="12" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            <slot v-bind:dataObj="infoIndex"></slot>
          </div>
      </el-col>
    </el-row>
    <el-row v-if="colNum == 3" :gutter="20">
      <el-col :sm="24" :md="8" :lg="8" :xl="8" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            <slot v-bind:dataObj="infoIndex"></slot>
          </div>
      </el-col>
    </el-row>
    <el-row v-if="colNum == 4" :gutter="20">
      <el-col :sm="24" :md="12" :lg="6" :xl="6" v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            <slot v-bind:dataObj="infoIndex"></slot>
          </div>
      </el-col>
    </el-row> -->
    
    <!-- 默认显示的是两列 -->
    <el-row :gutter="colRowGutter">
      <el-col :sm="colNumProperty.smStr" :md="colNumProperty.mdStr" :lg="colNumProperty.lgStr" :xl="colNumProperty.xlStr" 
        v-for="infoIndex in infoList" :key="infoIndex.id">
          <div class="infoContent infoIndex.styleCalssName">
            <BaseJobBoxShow v-if="templateName === 'job'" :job-box-info-obj="infoIndex"></BaseJobBoxShow>
            <BaseCorpBoxShow v-if="templateName === 'corp'" :corp-box-info-obj="infoIndex"></BaseCorpBoxShow>
            <BaseJobFairBoxShow v-if="templateName === 'jobFair'" :job-fair-box-info-obj="infoIndex"></BaseJobFairBoxShow>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * 通用显示块状信息栏的显示组件
 */
let tempInfo = { template:'<div>hahhah</div>' };
import BaseJobBoxShow from '@/components/common/BaseJobBoxShow.vue';
import BaseCorpBoxShow from '@/components/common/BaseCorpBoxShow.vue';
import BaseJobFairBoxShow from '@/components/common/BaseJobFairBoxShow.vue';
export default {
  name: 'BaseInfoGloriette',
  props:{
    colRowGutter:{
      type:Number,
      default:20
    },
    colNum:Number,
    templateName: String,
    infoList:Array
  },
  components:{
    BaseJobBoxShow,
    BaseCorpBoxShow,
    BaseJobFairBoxShow
  },
  data(){
    return{
      tempInfo: tempInfo,
      list:[],
      colNumProperty:{
        smStr:24,
        mdStr:24,
        lgStr:12,
        xlStr:12
      }
    }
  },
  computed: {},
  created(){
    // if(this.$props.templateName === "job"){
    //   this.tempInfo = import('@/components/common/BaseJobBoxShow')
    // }else{
    //   this.tempInfo = import('@/components/common/BaseCorpBoxShow')
    // }
    if(this.$props.colNum === 3){
      this.colNumProperty.mdStr = 8;
      this.colNumProperty.lgStr = 8;
      this.colNumProperty.xlStr = 8;
    }else if(this.$props.colNum === 4){
      this.colNumProperty.mdStr = 12;
      this.colNumProperty.lgStr = 6;
      this.colNumProperty.xlStr = 6;
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
    margin: 3% 0;
  }
  & .el-col:nth-child(2n) > .infoContent{
    //background-color: #999;
  }
  & .el-col:nth-child(2n+1) > .infoContent{
    //background-color: #ccc;
  }
}
</style>