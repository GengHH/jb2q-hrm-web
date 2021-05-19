<!--
 * @Author: your name
 * @Date: 2021-04-08 17:29:14
 * @LastEditTime: 2021-05-19 17:52:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\profession\module\managementDetails.vue
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    title="详情"
    width="800px"
    :visible="visible"
    @close="onclose"
    @open="open"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <div>
        <div class="title-style">活动基本信息</div>
        <tform :formConfig="formConfig" ref="advancedSearch"></tform>
        <el-form
          ref="proForm"
          :disabled="type == '2' || type == '4' ? true : false"
          :rules="rules"
          :model="form"
          label-width="160px"
        >
          <el-form-item style="height:100px" label="宣传图片">
            <el-upload
              action=""
              class="avatar-uploader"
              :on-remove="handleRemove"
              :file-list="proFileList"
              :auto-upload="false"
              :on-change="proUploadUserChange"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              :show-file-list="false"
            >
              <template v-if="proForm.propagandaImageBase64">
                <img :src="proForm.propagandaImageBase64" class="avatar" />
              </template>
              <template v-if="!proForm.propagandaImageBase64">
                <img v-if="propagandaUrl" :src="propagandaUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </template>
            </el-upload>
            <div class="userClose" @click="proUrlRemove">
              <i class="el-icon-close"></i>
            </div>
          </el-form-item>
        </el-form>
        <div v-if="type != '2' && type != '4'" style="text-align:center">
          <el-button type="primary" @click="onSubmitForm">保存</el-button>
        </div>
      </div>
      <div v-if="type == '4' || type == '2'">
        <div class="title-style">活动反馈信息</div>
        <el-form
          ref="form"
          :disabled="type == '2' ? true : false"
          :rules="rules"
          :model="form"
          label-width="160px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="活动情况" prop="actSituation">
                <el-input
                  style="width:190px"
                  v-model="form.actSituation"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参与人数" prop="participants">
                <el-input
                  style="width:190px"
                  v-model="form.participants"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="height:100px" label="现场照片">
            <el-upload
              action=""
              class="avatar-uploader"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="uploadUserChange"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              :show-file-list="false"
            >
              <template v-if="form.sceneImageBase64">
                <img :src="form.sceneImageBase64" class="avatar" />
              </template>
              <template v-if="!form.sceneImageBase64">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </template>
            </el-upload>
            <div class="userClose" @click="urlRemove">
              <i class="el-icon-close"></i>
            </div>
          </el-form-item>

          <el-form-item
            label="系统专项指导推荐人数"
            prop="systemRecSpecialGuide"
          >
            <el-input
              style="width:190px"
              v-model="form.systemRecSpecialGuide"
            ></el-input
            >人
            <span style="color:#fc6f3d;margin-left:40px">人员详细》》</span>
          </el-form-item>
          <el-form-item label="个人报名活动人数" prop="selfApply">
            <el-input style="width:190px" v-model="form.selfApply"></el-input>人
            <span style="color:#fc6f3d;margin-left:40px">人员详细》》</span>
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { act_add, act_modify, act_apply_query } from '../api/index';
import { trim } from '@/utils/index';
import tform from '../../common/t_form';
export default {
  name: 'managementDetails',
  props: ['visible', 'formConfig', 'type'],
  components: { tform },
  data() {
    return {
      fileList: [],
      proFileList: [],
      form: {
        systemRecSpecialGuide: '',
        participants: '',
        actSituation: ''
      },
      proForm: {},
      imageUrl: '',
      propagandaUrl: '',
      dicOptions: {
        //性别
        sex: trim(this.$store.getters['dictionary/ggjbxx_sex']),
        //民族
        nationality: trim(this.$store.getters['dictionary/ggjbxx_nationality']),
        //证件类型
        type: trim(this.$store.getters['dictionary/ggjbxx_zjlx']),
        //银行
        jhh: trim(this.$store.getters['dictionary/sybx_jhh']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu'])
      },
      rules: {
        nationId: [{ required: true, message: '请填写必选项', trigger: 'blur' }]
      }
    };
  },
  computed: {},
  methods: {
    urlRemove() {
      if (this.type == '4') {
        this.imageUrl = '';
        this.fileList = [];
        this.form.sceneImageBase64 = '';
      }
    },
    proUrlRemove() {
      if (this.type != '2') {
        this.propagandaUrl = '';
        this.proFileList = [];
        this.proForm.sceneImageBase64 = '';
      }
    },
    onSubmitForm() {
      //1编辑 3新增
      let addForm = { ...this.$refs.advancedSearch.value, ...this.proForm };
      if (this.type == '1') {
        act_modify(
          addForm,
          res => {
            if (res.status == 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.onclose();
                }
              });
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else if (this.type == '3') {
        act_add(
          addForm,
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
    getBase64(file, name) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form[name] = reader.result;
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    proGetBase64(file, name) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.proForm[name] = reader.result;
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    //照片base64
    uploadUserChange(file) {
      this.getBase64(file.raw, 'sceneImageBase64');
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    proUploadUserChange(file) {
      this.proGetBase64(file.raw, 'propagandaImageBase64');
      this.propagandaUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg/jpg/png/ 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    open() {},
    onSubmit() {
      let data = { ...this.formConfig.dataList, ...this.form };
      act_modify(
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
    },
    onclose(type) {
      if (type) {
        this.$emit('onclose', type);
      }
      this.$emit('onclose');
    }
  },
  mounted() {
    // let data = { ...this.formConfig.dataList };
    // data.pageIndex = 0;
    // data.pageSize = 10;
    // //报名渠道（1系统推荐 2主动报名）
    // data.applyType = 1;
    // console.log(data);
    // act_apply_query(
    //   data,
    //   res => {
    //     if (res.status == 200) {
    //       console.log(res);
    //     }
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    setTimeout(() => {
      if (this.type != '3') {
        this.$refs.advancedSearch.value = this.formConfig.dataList;
        if (this.type == '2') {
          this.form = { ...this.formConfig.dataList };
        }
        this.proForm = { ...this.formConfig.dataList };
      } else {
        this.$refs.advancedSearch.value = {};
      }
    }, 0);
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
  margin-bottom: 10px;
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
.userClose {
  position: absolute;
  left: 100px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
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
