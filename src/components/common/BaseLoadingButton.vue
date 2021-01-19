<!--
 * @Author: GengHH
 * @Date: 2021-01-13 13:46:07
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-18 10:16:05
 * @Description: 二次封装el-button成实现Loading的按钮
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseLoadingButton.vue
-->
<template>
  <el-button v-bind="$attrs" :loading="loadingStatus" @click="handleClick">
    <slot />
  </el-button>
</template>
<script>
export default {
  name: 'pl-button',
  props: {
    autoLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingStatus: false
    };
  },
  methods: {
    handleClick() {
      if (this.autoLoading) {
        this.loadingStatus = true;
      }
      this.$emit('click', () => {
        this.loadingStatus = false;
      });
    }
  }
};
</script>
