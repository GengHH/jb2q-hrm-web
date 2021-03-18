<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:14
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 11:21:16
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeCollected.vue
-->
<template>
  <div id="resumeCollected">
    <div class="title-style">已收藏的简历</div>
  </div>
</template>

<script>
export default {
  name: 'resumeCollected',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#resumeCollected {
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
}
</style>
