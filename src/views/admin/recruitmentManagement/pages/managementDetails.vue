<!--
 * @Author: your name
 * @Date: 2021-04-28 14:27:10
 * @LastEditTime: 2021-07-15 10:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\recruitmentManagement\pages\managementDetails.vue
-->
<template>
  <el-dialog
    title="招聘会新增"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div
      style="height:500px;overflow: scroll;overflow-x: hidden;padding: 0 10px 0 0;"
    >
      <div class="title-style">
        详细信息
      </div>
      <tform ref="form" :formConfig="formConfig"> </tform>
      <el-form :model="form" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘会宣传图片">
              <el-upload
                action=""
                class="avatar-uploader"
                :file-list="fileList2"
                :auto-upload="false"
                :on-change="uploadUserChange"
                :limit="1"
                :show-file-list="false"
              >
                <template v-if="type == '2'">
                  <img :src="lookList.propagandaImageBase64" class="avatar" />
                </template>
                <template v-if="type == '1'">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </template>
              </el-upload>
              <div
                class="userClose"
                @click="
                  imageUrl = '';
                  fileList2 = [];
                "
              >
                <i class="el-icon-close"></i>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" v-if="adminId == '00'">
            <el-form-item label="招聘会首页图片">
              <el-upload
                action=""
                class="avatar-uploader"
                :file-list="fileList"
                :auto-upload="false"
                :on-change="indexUserChange"
                :limit="1"
                :show-file-list="false"
              >
                <template v-if="type == '2'">
                  <img :src="lookList.propagandaImageBase64" class="avatar" />
                </template>
                <template v-if="type == '1'">
                  <img v-if="indexUrl" :src="indexUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </template>
              </el-upload>
              <div
                class="userClose"
                @click="
                  indexUrl = '';
                  fileList = [];
                "
              >
                <i class="el-icon-close"></i>
              </div>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <div style="text-align:center">
        <el-button size="mini" type="primary" @click="advancedSearch()">
          提交</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../../common/t_form';
import ttable from '../../common/t_table';

import {
  schedule_query_info,
  schedule_update,
  schedule_add
} from '../api/index';
export default {
  name: 'managementDetails',
  props: ['visible', 'lookList', 'type'],
  components: { tform, ttable },
  data() {
    return {
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      imageUrl: '',
      indexUrl: '',
      fileList: [],
      fileList2: [],
      form: {},
      dicOptions: {
        //招聘会类型
        type: trim(this.$store.getters['dictionary/recruit_meet_type']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //是否
        yesno: trim(this.$store.getters['dictionary/yesno'])
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '130px',
        style: {
          width: '700px',
          margin: '0 auto'
        },
        isBtn: true,
        formItemList: [
          {
            type: 'input',
            label: '招聘会名称',
            style: { width: '554px' },
            placeholder: '请输入招聘会名称',
            rules: [
              { required: true, message: '请输入招聘会名称', trigger: 'blur' }
            ],
            key: 'meetName'
          },
          {
            type: 'textarea',
            label: '招聘会简介',
            style: { width: '554px' },
            placeholder: '请输入招聘会简介',
            rules: [
              { required: true, message: '请输入招聘会简介', trigger: 'blur' }
            ],
            key: 'meetIntroduce'
          },
          {
            type: 'select',
            label: '招聘会类型',
            rules: [
              { required: true, message: '请输入招聘会类型', trigger: 'blur' }
            ],
            key: 'meetType',
            style: { width: '554px' },
            options: trim(this.$store.getters['dictionary/recruit_meet_type'])
          },
          {
            type: 'datetimerange',
            label: '招聘会开始时间',
            placeholder: '请输入召开时间',
            rules: [
              { required: true, message: '请输入召开时间', trigger: 'blur' }
            ],
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
              }
            },
            format: 'yyyy-MM-dd HH:mm:ss',
            style: { width: '554px' },
            key: 'time'
          },
          // {
          //   type: 'date',
          //   label: '招聘会结束时间',
          //   placeholder: '请输入结束时间',
          //   rules: [
          //     { required: true, message: '请输入结束时间', trigger: 'blur' }
          //   ],
          //   format: 'yyyy-MM-dd HH:mm:ss',
          //   style: { width: '210px' },
          //   key: 'endTime'
          // },
          {
            type: 'input',
            label: '主办单位',
            style: { width: '554px' },
            placeholder: '请输入主办单位',
            rules: [
              { required: true, message: '请输入主办单位', trigger: 'blur' }
            ],
            key: 'mainCorpName'
          },
          {
            type: 'input',
            label: '招聘会地点',
            style: { width: '554px' },
            placeholder: '请输入招聘会地点',
            rules: [
              { required: true, message: '请输入招聘会地点', trigger: 'blur' }
            ],
            key: 'address'
          },
          {
            type: 'number',
            label: '招聘会展位数量',
            style: { width: '554px' },
            placeholder: '请输入招聘会展位数量',
            controls: false,
            rules: [
              {
                required: true,
                message: '请输入招聘会展位数量',
                trigger: 'blur'
              }
            ],
            key: 'boothCount'
          },
          {
            type: 'input',
            label: '附近交通',
            style: { width: '554px' },
            placeholder: '请输入附近交通',
            rules: [
              { required: true, message: '请输入附近交通', trigger: 'blur' }
            ],
            key: 'traffic'
          },
          {
            type: 'input',
            label: '联系人',
            style: { width: '210px' },
            placeholder: '请输入联系人',
            rules: [
              { required: true, message: '请输入联系人', trigger: 'blur' }
            ],
            key: 'contactName'
          },
          {
            type: 'input',
            label: '联系电话',
            style: { width: '200px' },
            placeholder: '请输入联系电话',
            maxlength: 11,
            rules: [
              { required: true, message: '请输入联系电话', trigger: 'blur' }
            ],
            key: 'contactPhone'
          },
          {
            type: 'radio',
            label: '发布状态',
            rules: [
              { required: true, message: '请选择发布状态', trigger: 'blur' }
            ],
            style: { width: '200px' },
            key: 'releaseStatus',
            options: [
              {
                value: '1',
                label: '已发布'
              },
              {
                value: '2',
                label: '已撤销'
              }
            ]
          },
          {
            type: 'radio',
            label: '报名状态',
            rules: [
              { required: true, message: '请选择报名状态', trigger: 'blur' }
            ],
            key: 'applyStatus',
            style: { width: '200px' },
            options: [
              {
                value: '1',
                label: '未截止'
              },
              {
                value: '2',
                label: '已截止'
              }
            ]
          },
          {
            type: 'radio',
            label: '是否置顶',
            rules: [
              { required: true, message: '请选择是否置顶', trigger: 'blur' }
            ],
            key: 'onTop',
            style: { width: '200px' },
            options: trim(this.$store.getters['dictionary/yesno'])
          },
          {
            type: 'datetime',
            label: '截止时间',
            placeholder: '请输入截止时间',
            rules: [
              { required: true, message: '请输入截止时间', trigger: 'blur' }
            ],
            format: 'yyyy-MM-dd HH:mm:ss',
            style: { width: '200px' },
            key: 'endApplyTime',
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
              }
            }
          },
          {
            type: 'select',
            label: '报名允许区域',
            rules: [
              { required: true, message: '请输入报名允许区域', trigger: 'blur' }
            ],
            multiple: true,
            style: { width: '200px' },
            key: 'districtCodeList',
            options: this.setQx()
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    setQx() {
      let qx = [...trim(this.$store.getters['dictionary/ggjbxx_qx'])];
      qx.unshift({ label: '全部', value: '0A' });
      return qx;
    },
    getBase64(file, name) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.form[name] = reader.result;
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('图片只能是 jpeg/jpg/png/ 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    //照片base64
    uploadUserChange(file) {
      if (this.beforeAvatarUpload(file)) {
        this.getBase64(file.raw, 'propagandaImageBase64');
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    //首页照片base64
    indexUserChange(file) {
      if (this.beforeAvatarUpload(file)) {
        this.getBase64(file.raw, 'propagandaImageBase64');
        this.indexUrl = URL.createObjectURL(file.raw);
      }
    },
    advancedSearch() {
      this.$refs.form.$refs.value.validate(valid => {
        if (valid) {
          let data = { ...this.$refs.form.value, ...this.form };
          if (!data.propagandaImageBase64) {
            this.$message.error('请上传招聘会宣传图片');
            return;
          }
          if (data.time) {
            data.startTime = data.time[0];
            data.endTime = data.time[1];
          }
          //1 添加 2 修改
          if (this.type == '1') {
            data.propagandaImageBase64 = this.form.propagandaImageBase64
              .split(',')[1]
              .toString();
            schedule_add(
              data,
              res => {
                if (res.status == 200) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.onclose(1);
                    }
                  });
                }
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          } else if (this.type == '2') {
            schedule_update(
              data,
              res => {
                if (res.status == 200) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.onclose(1);
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onclose(type) {
      this.$emit('onclose', type || 0);
    }
  },
  mounted() {
    let data = { ...this.lookList };
    console.log(this.type);
    if (this.type == '2') {
      setTimeout(() => {
        this.$refs.form.value = { ...data };
      }, 0);
      this.lookList.propagandaImageBase64 =
        'data:image/png;base64,' + data.propagandaImageBase64;
    }
    if (this.type == '1') {
      setTimeout(() => {
        this.$refs.form.value = {
          districtCodeList: ['0A']
        };
      }, 0);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.userClose {
  position: absolute;
  left: 100px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
}
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;
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
.avatar-uploader {
  height: 100px;
  position: absolute;
  border: 1px solid #dcdfe6;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
