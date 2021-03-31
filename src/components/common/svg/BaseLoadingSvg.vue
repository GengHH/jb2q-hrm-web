<!--
 * @Author: GengHH
 * @Date: 2021-03-16 14:06:41
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-16 14:10:49
 * @Description: 基本的待加载占位动画
 * @FilePath: \jb2q-hrm-web\src\components\common\svg\BaseLoadingSvg.vue
-->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="8.17552" width="4" height="13.649" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="8" y="9.32448" width="4" height="11.351" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="16" y="6.82448" width="4" height="16.351" fill="#FF6700" opacity="0.2">
        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
  </svg>
</template> 

<script>
export default {
  name: 'BaseLoadingSvg',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
  svg {
    width: 100%;
    margin-top: 150px;
  }
</style>
