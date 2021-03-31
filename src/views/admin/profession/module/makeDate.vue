<!--
 * @Author: your name
 * @Date: 2021-03-24 11:12:37
 * @LastEditTime: 2021-03-24 13:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\makeDate.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="65%" title="预约设置" :visible="visible" @close="onclose">
      <div>
        <el-calendar>
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-')[2] }}
            </p>
          </template>
        </el-calendar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'makeDate',
  components: {},
  props: ['visible'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    onclose() {
      this.$emit('onclose');
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fontColor {
  color: #787878;
  font-weight: bold;
}
</style>
