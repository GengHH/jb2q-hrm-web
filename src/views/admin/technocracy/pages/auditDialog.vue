<!--
 * @Author: your name
 * @Date: 2021-03-16 13:59:30
 * @LastEditTime: 2021-03-16 15:42:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\auditDialog.vue
-->
<template>
  <el-dialog title="审核" width="850px" :visible="visible" @close="onclose">
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <tform :formConfig="auditConfig"></tform>
      <div v-if="auditConfig.type == '0'" class="title-style">入团审核</div>
      <div v-if="auditConfig.type == '1'" class="title-style">续聘审核</div>
      <div v-if="auditConfig.type == '2'" class="title-style">退团审核</div>
      <div v-if="auditConfig.type == '3'" class="title-style">转移审核</div>
      <el-form size="small" ref="form" :model="form" label-width="120px">
        <el-form-item label="审核状态">
          <el-select v-model="form.name" placeholder="请选择审核状态">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import tform from '../../common/t_form'; //高级查询
export default {
  name: 'auditDialog',
  props: ['visible', 'auditConfig'],
  components: { tform },
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    };
  },
  computed: {},
  methods: {
    onclose() {
      this.$emit('onclose');
    },
    onSubmit() {}
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
</style>
