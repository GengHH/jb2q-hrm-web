<!--
 * @Author: your name
 * @Date: 2021-03-09 14:14:04
 * @LastEditTime: 2021-06-25 12:42:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\resume.vue
-->
<template>
  <div id="indexBody" ref="indexBodyHeight">
    <BaseResumeInfo
      v-if="userPid ? true : false"
      :queryPid="userPid"
    ></BaseResumeInfo>
  </div>
</template>

<script>
import BaseResumeInfo from '@/components/common/BaseResumeInfo';
import { trim } from '@/utils/index';
export default {
  name: 'resume',
  components: { BaseResumeInfo },
  props: ['userPid'],
  data() {
    return {};
  },
  watch: {
    height: function(a, b) {
      console.log(a, b);
    }
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
