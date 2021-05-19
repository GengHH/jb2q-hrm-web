<!--
 * @Author: your name
 * @Date: 2021-03-30 18:19:39
 * @LastEditTime: 2021-05-19 20:32:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\pages\activityDetail.vue
-->
<template>
  <el-dialog
    title="专家活动情况"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form
        ref="form"
        :rules="rules"
        :disabled="disabled"
        :model="form"
        label-width="250px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="专家姓名" prop="expertName">
              <el-select
                v-model="form.name"
                filterable
                remote
                reserve-keyword
                style="width:350px"
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
                @change="expertChange"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                  <span>{{ item.label }}</span
                  >-<span>{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专家编号">
              <el-input
                style="width:350px"
                disabled
                v-model="form.expertId"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="活动类型" prop="actType">
              <el-select
                v-model="form.actType"
                @change="selectType"
                style="width:350px"
              >
                <el-option
                  v-for="(v, k) in dicOptions.act_type"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="活动日期" prop="actDate">
              <el-date-picker
                v-model="form.actDate"
                type="date"
                style="width:350px"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="活动日期类型" prop="actDateType">
              <el-select v-model="form.actDateType" style="width:350px">
                <el-option
                  v-for="(v, k) in dicOptions.date_type"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            v-if="Number(form.actType) == 1 || Number(form.actType) == 4"
            :span="24"
          >
            <el-form-item label="服务对象姓名" prop="pids">
              <el-select
                v-model="form.pids"
                filterable
                remote
                reserve-keyword
                style="width:350px"
                placeholder="请输入关键词"
                :remote-method="orgRemoteMethod"
                :loading="loading"
                @change="userChange"
              >
                <el-option
                  v-for="item in orgOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                  <span>{{ item.label }}</span
                  >-<span>{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="Number(form.actType) == 1 || Number(form.actType) == 4"
            :span="24"
          >
            <el-form-item label="服务对象证件号码">
              <el-input
                disabled
                style="width:350px"
                v-model="form.zjhm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="参与人员姓名" prop="xm">
              <el-input v-model="form.xm"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col
            v-if="Number(form.actType) == 1 || Number(form.actType) == 4"
            :span="24"
          >
            <el-form-item label="服务对象联系电话">
              <el-input
                :disabled="true"
                style="width:350px"
                v-model="form.contactNumber"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            v-if="Number(form.actType) == 2 || Number(form.actType) == 3"
            :span="24"
          >
            <el-form-item label="活动名称" prop="actName">
              <el-select style="width:350px" v-model="form.actName">
                <el-option
                  v-for="(v, k) in activityList"
                  :key="k"
                  :label="v.actName"
                  :value="v.actId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="Number(form.actType) == 2 || Number(form.actType) == 3"
            :span="24"
          >
            <el-form-item label="参加活动人数" prop="psnlCount">
              <el-input style="width:350px" v-model="form.psnlCount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item v-if="!disabled" label="签字记录表">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :on-change="uploadChange"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
                <div
                  slot="tip"
                  class="el-upload__tip"
                  style="display: inline-block;margin-top: 0px;margin-left: 10px;"
                >
                  只能上传1张jpg/png格式文件，且不超过2MB
                </div>
              </el-upload>
            </el-form-item>

            <img
              width="600px"
              v-if="disabled && form.pairImageBase64 != ''"
              :src="'data:image/png;base64,' + form.pairImageBase64"
              alt="记录表"
            />
          </el-col>
        </el-row>
        <div v-if="!disabled" style="text-align:center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import { activity_add, activity_edit, synthesize_query } from '../api/index';
import { emphasis_keypoint } from '../../serviceManagement/api/index';
import { act_query } from '../../profession/api/index';
export default {
  name: 'activityDetail',
  props: ['visible', 'disabled', 'form', 'type'],
  components: {},
  data() {
    return {
      userOptions: [],
      orgOption: [],
      list: [],
      loading: false,
      dicOptions: {
        //日期类型
        date_type: trim(
          this.$store.getters['dictionary/recruit_act_date_type']
        ),
        //活动类型
        act_type: trim(this.$store.getters['dictionary/recruit_act_type'])
      },
      rules: {
        expertId: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        actType: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        actDate: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        actDateType: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        pids: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        zjhm: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        expertName: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ],
        actName: [{ required: true, message: '请填写必选项', trigger: 'blur' }],
        psnlCount: [
          { required: true, message: '请填写必选项', trigger: 'blur' }
        ]
      },
      fileList: [],
      userList: [],
      activityList: []
    };
  },
  computed: {},
  methods: {
    expertChange(e) {
      this.form.expertName = e.label;
      this.form.expertId = e.value;
    },
    userChange(e) {
      this.form.zjhm = e.value;
      this.form.pid = e.pid;
      this.form.contactNumber = e.contactNumber;
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let data = {
          xm: query,
          pageIndex: 0,
          pageSize: 10,
          valid: 1,
          districtCode: this.$store.state.admin.userInfo.logonUser.areaInfo
            .areaCode
        };
        synthesize_query(
          data,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.pageresult.data;
              let list = pageresult.map(e => {
                return { value: e.expertId, label: e.xm };
              });
              this.userOptions = list;
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.options = [];
      }
    },
    orgRemoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        let params = {
          xm: query,
          pageParam: {
            pageIndex: 0,
            pageSize: 10
          }
        };

        emphasis_keypoint(
          params,
          res => {
            if (res.status == 200) {
              this.loading = false;
              let pageresult = res.result.data.data;
              let list = pageresult.map(e => {
                return {
                  value: e.zjhm,
                  label: e.xm,
                  pid: e.pid,
                  contactNumber: e.contactNumber
                };
              });
              this.orgOption = list;
            }
            console.log(res);
          },
          err => {
            console.log('错误');
            console.log(err);
          }
        );
      } else {
        this.options = [];
      }
    },
    selectType(e) {
      console.log(e);
      this.actType = Number(e);
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
    //base64
    uploadChange(file) {
      this.getBase64(file.raw, 'recordImageBase64');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          // if (!data.recordImageBase64) {
          //   this.$message({
          //     message: '请添加记录表',
          //     type: 'warning'
          //   });
          //   return;
          // }
          data.recordImageBase64 = data.recordImageBase64
            ? data.recordImageBase64.split(',')[1].toString()
            : '';
          if (this.type == 3) {
            activity_add(
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
          } else {
            activity_edit(
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
    }
  },
  mounted() {
    //获取活动信息

    act_query(
      {
        pageIndex: 0,
        pageSize: 100,
        actName: ''
      },
      res => {
        if (res.status == 200) {
          let data = res.result.data.data;
          this.activityList = data;
        } else {
          this.message('warning', res.result.data.msg);
        }
        console.log('-----------------------------');
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  },
  created() {}
};
</script>
<style lang="scss" scoped>
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
