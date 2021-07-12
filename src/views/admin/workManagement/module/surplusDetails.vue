<!--
 * @Author: your name
 * @Date: 2021-03-23 14:06:58
 * @LastEditTime: 2021-06-25 17:25:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\index\module\addDetails.vue
-->
<template>
  <div id="indexBody">
    <el-dialog width="750px" title="详情" :visible="visible" @close="onclose">
      <div class="title-style">信息</div>
      <tform ref="form" :formConfig="formConfig"></tform>
      <div class="title-style">审核意见</div>
      <el-form
        style="width:650px;margin: 0 auto"
        :model="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核意见">
              <el-select
                :disabled="type == 0 ? true : false"
                v-model="form.verifyStatus"
                style="width:150px"
              >
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="处理意见">
              <el-input
                :disabled="type == '1' ? false : true"
                style="width:534px"
                type="textarea"
                placeholder="2000字符以内"
                maxlength="2000"
                v-model="form.handleResult"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div style="text-align:center">
        <el-button size="small" type="primary" @click="onsubmit">
          <i class="el-icon-plus"></i> 保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form'; //高级查询
import { surplus_approver } from '../api/index';
export default {
  name: 'surplusDetails',
  components: { tform },
  props: ['visible', 'type', 'dataList'],
  data() {
    return {
      dicOptions: {
        //状态
        status: trim(
          this.$store.getters['dictionary/recruit_surplus_verify_status']
        )
      },
      userIdKey: this.$store.state.admin.userInfo.logonUser.userIdKey,
      userName: this.$store.state.admin.userInfo.logonUser.userName,
      loading: false,
      form: {
        verifyStatus: '1'
      },

      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',
        isBtn: true,
        disabled: true,
        style: {
          width: '650px',
          margin: '0 auto'
        },
        formItemList: [
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'input',
            label: '社会信用代码',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'tyshxym'
          },
          {
            type: 'select',
            label: '职位分类',
            style: { width: '210px' },
            rules: [],
            key: 'positionType',
            options: trim(
              this.$store.getters['dictionary/recruit_position_s_type']
            )
          },
          {
            type: 'input',
            label: '用工剩余人数',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'surplusNum'
          },
          {
            type: 'input',
            label: '可借用期限',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'lendPeriod'
          },
          {
            type: 'input',
            label: '联系人',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'contactName'
          },
          {
            type: 'input',
            label: '联系人电话',
            style: { width: '210px' },
            placeholder: '',
            rules: [],
            key: 'contactPhone'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      this.$emit('onclose', type || 0);
    },
    onsubmit() {
      let data = { surplusId: this.dataList.surplusId, ...this.form };
      surplus_approver(
        data,
        res => {
          if (res.status == 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.onclose('1');
              }
            });
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.form.value = { ...this.dataList };
    }, 0);
    //0查看 1处理
    if (this.type != '1') {
      this.form = { ...this.dataList };
    }
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
  margin: 0 0 15px 0;
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
