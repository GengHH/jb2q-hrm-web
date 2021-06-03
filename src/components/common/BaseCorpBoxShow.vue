<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-03 17:24:26
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseCorpBoxShow.vue
-->
<template>
  <div class="module-two clearfix">
    <img
      v-if="corpBoxInfoObj.zl"
      src="../../assets/images/zhilianLogo.png"
      alt=""
    />
    <img v-else src="../../assets/images/logos.png" alt="" />
    <p class="font-eighteen mat-15" v-if="corpBoxInfoObj.zl">智联招聘</p>
    <p class="font-eighteen mat-15" v-else>万达信息股份有限公司</p>
    <p class="span-infor">
      <span>已上市</span>
      <el-divider direction="vertical"></el-divider>
      <span>5000人</span>
      <el-divider direction="vertical"></el-divider>
      <span>软件服务</span>
    </p>
    <span class="span-btn mat-15"><i class="or-font">22</i> 个在招职位</span>
  </div>
</template>

<script>
/**
 * 首页显示单位信息组件
 */
export default {
  name: 'BaseCorpBoxShow',
  props: {
    corpBoxInfoObj: Object,
    default: () => {}
  }
};
</script>

<style lang="scss" scoped>
.module-two {
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  background: #fff;
  padding: 22px;
  text-align: center;
  img {
    display: inline-block;
  }
  .mat-15 {
    margin-top: 15px;
  }

  .font-eighteen {
    font-size: 18px;
    color: #000000;
  }

  .span-infor {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 15px;
    .el-divider--vertical {
      display: inline-block;
      width: 1px;
      height: 1em;
      margin: 0 8px;
      vertical-align: middle;
      position: relative;
    }
  }

  .span-btn {
    padding: 8px 25px;
    border: 1px solid #dddddd;
    display: inline-block;
    color: #666;
    .or-font {
      color: #fda749;
    }
  }
}
// .clearfix {
//   zoom: 1;
// }
</style>
