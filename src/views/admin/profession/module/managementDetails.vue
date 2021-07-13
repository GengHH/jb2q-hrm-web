<!--
 * @Author: your name
 * @Date: 2021-04-08 17:29:14
 * @LastEditTime: 2021-07-13 17:07:16
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
              :show-file-list="false"
            >
              <template v-if="proForm.propagandaImageBase64">
                <img :src="proForm.propagandaImageBase64" class="avatar" />
              </template>
              <template v-if="!proForm.propagandaImageBase64">
                <div v-if="propagandaUrl">
                  <img :src="propagandaUrl" class="avatar" />
                </div>

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
          <div style="text-align:right">
            系统专项指导推荐人数和个人报名活动人数的实际到场人数<span
              style="color: #fc6f3d;font-size: 22px;"
              >{{ sum }}</span
            >人
          </div>
          <el-form-item style="height:100px" label="现场照片">
            <el-upload
              action=""
              class="avatar-uploader"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="uploadUserChange"
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
              disabled
              style="width:190px"
              v-model="form.systemRecSpecialGuide"
            ></el-input
            >人
            <span
              @click="openUser('1')"
              style="color:#fc6f3d;margin-left:40px;cursor: pointer;"
              >人员详细》》</span
            >
          </el-form-item>
          <el-form-item label="个人报名活动人数" prop="selfApply">
            <el-input
              disabled
              style="width:190px"
              v-model="form.selfApply"
            ></el-input
            >人
            <span
              @click="openUser('2')"
              style="color:#fc6f3d;margin-left:40px;cursor: pointer;"
              >人员详细》》</span
            >
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <userdetails
      v-if="userVisible"
      :visible="userVisible"
      :dataList="userList"
      @onclose="useronclose"
      @isApply="isApply"
    >
    </userdetails>
  </el-dialog>
</template>

<script>
import { act_add, act_modify, act_apply_query } from '../api/index';
import { trim } from '@/utils/index';
import tform from '../../common/t_form';
import userdetails from './userDetails';
export default {
  name: 'managementDetails',
  props: ['visible', 'formConfig', 'type'],
  components: { tform, userdetails },
  data() {
    return {
      sum: 0,
      userList: {},
      userVisible: false,
      fileList: [],
      proFileList: [],
      form: {
        systemRecSpecialGuide: 0,
        participants: 0,
        actSituation: '',
        selfApply: 0
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
    isApply(e) {
      console.log(e);
      if (e) {
        this.sum = this.sum + 1;
      } else {
        this.sum = this.sum - 1;
      }
    },
    openUser(type) {
      // type  1系统 2个人推荐

      this.userList = {
        userType: type,
        actId: this.formConfig.dataList.actId
      };
      this.userVisible = true;
    },
    useronclose() {
      this.userVisible = false;
    },
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
      let addForm = { ...this.proForm, ...this.$refs.advancedSearch.value };
      addForm.propagandaImageBase64 = this.proForm.propagandaImageBase64;

      if (addForm.acttime) {
        addForm.actStartTime = addForm.acttime[0];
        addForm.actEndTime = addForm.acttime[1];
      }

      if (addForm.applytime) {
        addForm.applyStartTime = addForm.applytime[0];
        addForm.applyEndTime = addForm.applytime[1];
      }

      if (this.type == '1') {
        let str = 'data:';

        if (addForm.propagandaImageBase64) {
          let subStr = addForm.propagandaImageBase64.substring(0, 5);
          if (str == subStr) {
            addForm.propagandaImageBase64 = addForm.propagandaImageBase64
              .split(',')[1]
              .toString();
          }
        }
        act_modify(
          addForm,
          res => {
            if (res.result.data.result) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.onclose();
                }
              });
            } else {
              this.$message({
                message: res.result.data.msg,
                type: 'warning',
                duration: 1000
              });
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else if (this.type == '3') {
        if (addForm.propagandaImageBase64) {
          addForm.propagandaImageBase64 = addForm.propagandaImageBase64
            .split(',')[1]
            .toString();
        }

        act_add(
          addForm,
          res => {
            if (res.result.data.result) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.onclose('1');
                }
              });
            } else {
              this.$message({
                message: res.result.data.msg,
                type: 'warning',
                duration: 1000
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
    getBase64(file, name, fn) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form[name] = reader.result;
        if (fn) {
          fn();
        }
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    proGetBase64(file, name, fn) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.proForm[name] = reader.result;
        if (fn) {
          fn();
        }
      };
      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    },
    //照片base64
    uploadUserChange(file) {
      if (this.beforeAvatarUpload(file.raw)) {
        this.getBase64(file.raw, 'sceneImageBase64', () => {
          this.urlRemove();
          this.imageUrl = URL.createObjectURL(file.raw);
        });
      }
    },
    proUploadUserChange(file) {
      console.log(1);
      if (this.beforeAvatarUpload(file.raw)) {
        this.proGetBase64(file.raw, 'propagandaImageBase64', () => {
          this.proUrlRemove();
          this.propagandaUrl = URL.createObjectURL(file.raw);
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (
        file.type != 'image/jpeg' &&
        file.type != 'image/png' &&
        file.type != 'image/jpg'
      ) {
        this.$message.error('图片只能是 jpeg/jpg/png/ 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    open() {},
    onSubmit() {
      let data = { ...this.formConfig.dataList, ...this.form };
      if (data.sceneImageBase64) {
        data.sceneImageBase64 = data.sceneImageBase64.split(',')[1].toString();
      }
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
      this.$emit('onclose', '1');
    },
    querySize() {
      let data = {
        actId: this.formConfig.dataList.actId,
        applyType: this.formConfig.dataList.applyType
      };
      data.pageIndex = 0;
      data.pageSize = 10;
      act_apply_query(
        { ...data, applyType: 1 },
        res => {
          if (res.status == 200) {
            let total = res.result.data.total;
            this.form.systemRecSpecialGuide = total;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
      act_apply_query(
        { ...data, applyType: 2 },
        res => {
          if (res.status == 200) {
            let total = res.result.data.total;
            this.form.selfApply = total;
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
    console.log(this.type);
    let dataList = { ...this.formConfig.dataList };
    setTimeout(() => {
      if (this.type != '3') {
        this.$refs.advancedSearch.value = dataList;
        this.proForm = { ...dataList };

        this.proForm.sceneImageBase64 = this.proForm.sceneImageBase64
          ? 'data:image/png;base64,' + this.proForm.sceneImageBase64
          : '';

        this.proForm.propagandaImageBase64 = this.proForm.propagandaImageBase64
          ? 'data:image/png;base64,' + this.proForm.propagandaImageBase64
          : '';
        //计算个人投递和系统投递人数
        let systemRecSpecialGuide = this.proForm.systemRecSpecialGuide
          ? this.proForm.systemRecSpecialGuide
          : 0;
        let selfApply = this.proForm.selfApply ? this.proForm.selfApply : 0;
        this.form = {
          systemRecSpecialGuide: systemRecSpecialGuide,
          participants: this.proForm.participants,
          selfApply: selfApply,
          sceneImageBase64: this.proForm.sceneImageBase64,
          actSituation: this.proForm.actSituation
        };
        if (this.type == '4' && this.type != '2') {
          this.querySize();
        }

        this.sum =
          this.proForm.selfApplyAttendCount + this.proForm.systemRecAttendCount;
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
