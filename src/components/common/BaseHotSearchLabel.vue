<!--
 * @Author: GengHH
 * @Date: 2020-12-04 17:06:53
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-28 14:30:55
 * @Description: 热门搜索的标签
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseHotSearchLabel.vue
-->
<template>
  <div class="hot-box">
    <!-- <el-input class="width" v-model="input" placeholder="请输入内容"></el-input>
    <div class="seek-btn"><img src="@/assets/images/seek.png" alt="">搜索</div> -->
    <span class="hot-tip">热门搜素：</span>
    <span class="hot-label" v-for="(item ,index)in hotLabes" :key="index">{{
      item
    }}</span>
  </div>
</template>

<script>
/**
 * 首页热门搜素显示组件
 */
export default {
  name: 'BaseHotLabel',
  prop: {
    hotLabes: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      input: ''
    };
  }
};
</script>

<style lang="scss">
.seek-box {
  position: relative;
  margin-top: 14px;
  margin-bottom: 11px;
  font-size: 12px;
  .hot-label {
    color: $g-mian-color;
    padding: 0 20px;
  }
}
</style>
