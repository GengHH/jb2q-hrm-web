<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-03-16 14:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\management.vue
-->
<template>
  <div id="indexBody">
    <!-- <areaadminmanagement></areaadminmanagement> -->

    <adminmanagement> </adminmanagement>
  </div>
</template>

<script>
import areaadminmanagement from './pages/areaAdminManagement';
import adminmanagement from './pages/adminManagement';
export default {
  name: 'personLayout',
  components: {
    areaadminmanagement,
    adminmanagement
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
