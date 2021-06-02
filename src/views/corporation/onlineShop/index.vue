<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-02 14:53:13
 * @Description:
 * @FilePath: \jb2q-hrm-web\src\views\corporation\onlineShop\index.vue
-->
<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody">
    <div class="title-style">
      在线开店
      <pl-button
        id="addShopBtn"
        v-if="showEditBtn"
        @click="dialogFormVisible = !dialogFormVisible"
        ><i class="el-icon-circle-plus-outline">点击新增店铺</i></pl-button
      >
    </div>
    <!-- 历史信息展示 -->
    <el-row :gutter="20" style="margin-top:40px;">
      <!-- <el-col :sm="24" :md="24" :lg="12" :xl="8" class="shop-card">
        <div class="shop-box-status">
          未通过
        </div>
        <div class="shop-box">
          <h2>万达信息股份有限公司</h2>
          <p>
            <span class="gray-font">91310000132653687M</span>
          </p>
          <div class="shop-info">
            <p>
              <span class="gray-font">联系人：</span>123412
              <span class="gray-font" style="margin-left:30px;">联系电话：</span
              >18888888888
            </p>
            <p>
              <span class="gray-font">其他说明：</span
              >dfgsdfgsdfgsdfgsdhuifghsdkfhgsipodfygsdfg
            </p>
            <p><span class="gray-font">操作时间：</span>2021-05-21 13:33:4</p>
            <p>
              <span class="gray-font">原因：</span
              >dfgsdfgsdfgsdfgsdhuifghsdkfhgsipodfygsdfg
            </p>
          </div>
          <el-divider style="width:100%;margin:10px 0;"></el-divider>
          <div>
            <el-row>
              <el-col :span="18" class="gray-font"
                ><i class="el-icon-time"></i>2021-05-21 13:33:40</el-col
              >
              <el-col :span="6" style="text-align:right">
                <a href="#" @click="editShop()"
                  ><i class="el-icon-edit"></i>编辑</a
                >
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col> -->
      <!-- 依次展示 -->
      <template v-for="(item, index) in historyList">
        <el-col
          :key="index"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="8"
          :class="['shop-card', { shopCardCenter: historyList.length === 1 }]"
        >
          <div
            v-if="item.deleteStatus === '1'"
            class="shop-box-status shop-box-status-general"
          >
            已删除
          </div>
          <div
            v-else-if="!item.verifyResult"
            class="shop-box-status shop-box-status-general"
          >
            审核中
          </div>
          <div
            v-else-if="item.verifyResult === '1'"
            class="shop-box-status shop-box-status-success"
          >
            通过
          </div>
          <div
            v-else-if="item.verifyResult === '0'"
            class="shop-box-status shop-box-status-failure"
          >
            未通过
          </div>
          <div class="shop-box">
            <h2>{{ item.corpName }}</h2>
            <p>
              <span class="gray-font"
                ><i class="el-icon-school"></i>{{ item.tyshxydm }}</span
              >
            </p>
            <div class="shop-info">
              <p>
                <span class="gray-font">联系人：</span
                >{{ item.contactName ? item.contactName : '无' }}
                <span class="gray-font" style="margin-left:30px;"
                  >联系电话：</span
                >{{ item.contactPhone ? item.contactPhone : '无' }}
              </p>
              <p>
                <span class="gray-font">其他说明：</span
                >{{ item.applyMemo ? item.applyMemo : '无' }}
              </p>
              <p>
                <span class="gray-font">操作时间：</span
                >{{ item.verifyTime ? item.verifyTime : '无' }}
              </p>
              <p>
                <span class="gray-font">原因：</span
                >{{ item.verifyMemo ? item.verifyMemo : '无' }}
              </p>
            </div>
            <el-divider style="width:100%;margin:10px 0;"></el-divider>
            <div>
              <el-row>
                <el-col :span="18" class="gray-font" title="开店申请时间"
                  ><i class="el-icon-time"></i
                  >{{ item.applyTime ? item.applyTime : '无' }}</el-col
                >
                <el-col :span="6" style="text-align:right">
                  <span
                    class="shop-edit-btn"
                    v-if="!item.verifyResult && item.deleteStatus !== '1'"
                    @click="editShop(item)"
                    ><i class="el-icon-edit"></i>编辑</span
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
    <!-- 操作 -->
    <el-form
      v-if="showEditForm"
      :model="shopInfo"
      :rules="rules"
      ref="shopInfo"
      label-width="0px"
      class="clearfix"
    >
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="tyshxydm">
          <pl-input
            required
            v-model="shopInfo.tyshxydm"
            label="社会信用代码"
            :disabled="disabledEditForm"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="corpName">
          <pl-input
            required
            v-model="shopInfo.corpName"
            label="单位名称"
            :disabled="disabledEditForm"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item required prop="contactName">
          <pl-input
            required
            v-model="shopInfo.contactName"
            label="联系人"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="contactPhone">
          <pl-input
            required
            v-model="shopInfo.contactPhone"
            label="联系人电话"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="applyMemo">
          <pl-input
            required
            type="textarea"
            autosize
            label="其他说明（不超过2000字符）"
            maxlength="2000"
            show-word-limit
            :rows="12"
            v-model="shopInfo.applyMemo"
          >
          </pl-input>
        </el-form-item>
      </el-col>
      <div class="form-btns">
        <pl-button class="white-btn btn-style" @click="clearEditShop($event)"
          >清空</pl-button
        >
        <!-- <pl-button
          v-if="updateShop"
          class="orange-btn btn-style"
          :auto-loading="true"
          @click="submitForm($event, 'shopInfo')"
        >
          修改
        </pl-button> -->
        <pl-button
          class="orange-btn btn-style"
          :auto-loading="true"
          @click="submitForm($event, 'shopInfo')"
        >
          开店
        </pl-button>
      </div>
    </el-form>
    <!-- 开店弹出框 -->
    <el-dialog
      title="在线开店"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="shopInfo"
        :rules="rules"
        ref="shopInfo"
        label-width="0px"
        class="clearfix"
      >
        <el-col :span="12" class="form-item-left">
          <el-form-item prop="tyshxydm">
            <pl-input
              required
              v-model="shopInfo.tyshxydm"
              label="社会信用代码"
              :disabled="disabledEditForm"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-right">
          <el-form-item prop="corpName">
            <pl-input
              required
              v-model="shopInfo.corpName"
              label="单位名称"
              :disabled="disabledEditForm"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-left">
          <el-form-item required prop="contactName">
            <pl-input
              required
              v-model="shopInfo.contactName"
              label="联系人"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-right">
          <el-form-item prop="contactPhone">
            <pl-input
              required
              v-model="shopInfo.contactPhone"
              label="联系人电话"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="applyMemo">
            <pl-input
              required
              type="textarea"
              autosize
              label="其他说明（不超过2000字符）"
              maxlength="2000"
              show-word-limit
              :rows="12"
              v-model="shopInfo.applyMemo"
            >
            </pl-input>
          </el-form-item>
        </el-col>
        <div class="form-btns">
          <pl-button class="white-btn btn-style" @click="unEditShop($event)"
            >取消</pl-button
          >
          <pl-button
            v-if="updateShop"
            class="orange-btn btn-style"
            :auto-loading="true"
            @click="submitForm($event, 'shopInfo')"
          >
            修改
          </pl-button>
          <pl-button
            v-else
            class="orange-btn btn-style"
            :auto-loading="true"
            @click="submitForm($event, 'shopInfo')"
          >
            开店
          </pl-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { phonePattern } from '@/utils/regexp';
import { queryShop, saveShop, updateShop } from '@/api/corporationApi';
import { niceScroll, niceScrollUpdate } from '@/utils';
export default {
  name: 'shopApp',
  components: {},
  data() {
    return {
      path: require('@/assets/logo.png'),
      isSc: this.$store.getters['corporation/first_login'],
      dialogFormVisible: false,
      disabledEditForm: false,
      showEditBtn: false,
      showEditForm: false,
      updateShop: false,
      historyList: [],
      shopInfo: {
        applyId: null,
        cid: this.$store.getters['corporation/cid'],
        corpName: this.$store.getters['corporation/username'],
        tyshxydm: '',
        contactName: '',
        contactPhone: '',
        applyMemo: '',
        applyUserId: '',
        applyTime: '',
        verifyUserId: '',
        verifyResult: '',
        verifyTime: '',
        verifyMemo: '',
        channelNo: '',
        deleteStatus: '',
        deleteTime: '',
        deleteUserId: '',
        deleteMemo: ''
      },
      areaForm: {
        changeReason: ''
      },
      rules: {
        tyshxydm: [
          { required: true, message: '社会信用代码', trigger: 'blur' },
          {
            max: 18,
            message: '最长不可超过18字符',
            trigger: ['blur', 'change']
          }
        ],
        corpName: [
          { required: true, message: '单位名称', trigger: 'blur' },
          {
            max: 100,
            message: '最长不可超过100字符',
            trigger: ['blur', 'change']
          }
        ],
        contactPhone: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的手机号',
            trigger: ['blur', 'change']
          }
        ],
        applyMemo: [
          { required: true, message: '其他说明', trigger: 'blur' },
          {
            max: 2000,
            message: '最长不可超过2000字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      // arearules: {
      //   changeReason: [
      //     { required: true, message: '请输变更原因', trigger: 'blur' },
      //     {
      //       max: 1000,
      //       message: '最长不可超过1000字符',
      //       trigger: ['blur', 'change']
      //     }
      //   ]
      // },
      dicData: this.$store.getters['dictionary/yesno']
    };
  },
  computed: {},
  methods: {
    /**
     * 获取店面信息
     */
    async getShop() {
      let result = await queryShop({
        cid: this.$store.getters['corporation/cid'] || ''
      });
      console.log('result', result);
      if (result.status === 200 && result.result.data) {
        let rightCount = 0; //审核中,同过的数量和
        let deleteCount = 0;
        let failCount = 0;
        if (result.result.data.length) {
          result.result.data.forEach(element => {
            console.log(element);
            console.log(element.verifyResult);
            console.log(element.verifyResult === '0');
            if (element.deleteStatus === '1') {
              deleteCount++;
            } else if (element.verifyResult === '0') {
              failCount++;
            } else {
              rightCount++;
            }
          });

          if (rightCount > 0) {
            this.showEditBtn = false;
          } else {
            this.showEditBtn = true;
          }
          this.showEditForm = false;
          // if (
          //   deleteCount === result.result.data.length ||
          //   failCount === result.result.data.length
          // ) {
          //   //全部是已删除或者全部不通过
          //   this.showEditBtn = true;
          //   this.showEditForm = false;
          // }
        } else {
          //没有历史数据时直接可以添加
          this.showEditBtn = false;
          this.showEditForm = true;
        }
        //历史信息
        this.$set(this, 'historyList', result.result.data);
      } else if (result) {
        this.$message({
          type: 'error',
          message: '未查询到任何信息'
        });
      }
    },
    /**
     * 编辑店面
     */
    editShop(data) {
      this.shopInfo = data;
      this.dialogFormVisible = true;
      //this.showEditForm = true;
      this.disabledEditForm = true;
      this.updateShop = true;
    },
    /**
     * 取消编辑编辑店面
     */
    unEditShop() {
      this.dialogFormVisible = false;
      //this.showEditForm = false;
      this.disabledEditForm = false;
    },
    /**
     * 保存店面
     */
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //let formData = JSON.parse(JSON.stringify(this.shopInfo));
          let formData = this.$refs[formName].model;
          // 更新信息
          if (this.updateShop) {
            let params = {
              applyId: formData.applyId,
              contactName: formData.contactName,
              contactPhone: formData.contactPhone,
              applyMemo: formData.applyMemo
            };
            let result = await updateShop(params).catch(() => {
              done();
              this.$message({
                showClose: true,
                message: '系统异常，保存失败',
                type: 'error'
              });
            });
            if (result && result.status === 200) {
              // 更新数据
              this.getShop();
              this.$message({
                showClose: true,
                message: '修改成功!',
                type: 'success'
              });
              this.dialogFormVisible = false;
            } else if (result) {
              this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
              });
              done();
            }
          } else {
            // 新增信息
            let params = {
              cid: formData.cid,
              corpName: formData.corpName,
              tyshxydm: formData.tyshxydm,
              contactName: formData.contactName,
              contactPhone: formData.contactPhone,
              applyMemo: formData.applyMemo
            };
            let result = await saveShop(params).catch(() => {
              done();
              this.$message({
                showClose: true,
                message: '系统异常，保存失败',
                type: 'error'
              });
            });
            if (result && result.status === 200) {
              //更新数据
              this.getShop();
              //this.historyList.push({ ...this.shopInfo });
              this.$message({
                showClose: true,
                message: '开店成功!',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.showEditForm = false;
            } else if (result) {
              this.$message({
                showClose: true,
                message: '开店失败',
                type: 'error'
              });
              done();
            }
          }
        }
      });
    },
    clearEditShop(done) {
      //清空表格
      this.$refs.shopInfo.resetFields();
      //this.shopInfo(done);
    }
  },
  created() {
    this.getShop();
  },
  mounted() {
    niceScroll();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  }
};
</script>

<style lang="scss" scoped>
#indexBody {
  width: 90%;
  //min-height: 100%;
  //max-height:1000px;
  margin: 0 auto;
  padding-top: 60px;
  background-color: $g-white-color;
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  #addShopBtn {
    padding: 8px 10px;
    color: #fc7a43;
    border-radius: 20px;
    border-color: #fc7a43;
  }
  .shopCardCenter {
    transform: translateX(-50%);
    left: 50%;
  }
  .shop-card {
    position: relative;
    margin-bottom: 30px;
    .shop-box-status {
      width: 100px;
      padding: 10px;
      color: #ffffff;
      background-color: #8c9794;
      box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
      position: absolute;
      left: 40px;
      top: -15px;
      text-align: center;
    }
    .shop-box-status-general {
      background-color: #8c9794;
    }
    .shop-box-status-success {
      background-color: #20c997;
    }
    .shop-box-status-failure {
      background-color: #c93420;
    }
    .shop-box {
      width: 100%;
      min-height: 240px;
      // border: 1px solid #333;
      padding: 15px 30px;
      border-radius: 5px;
      box-shadow: 0 5px 15px rgba(rgb(61, 61, 61), 0.35);
      h2 {
        margin: 20px 0 5px 0;
        font-family: 宋体, Arial, Verdana, sans-serif;
      }
      .shop-info {
        width: 100%;
        font-size: 14px;
        margin-top: 15px;
        line-height: 24px;
      }
      .shop-edit-btn {
        color: #20c997;
      }
      .shop-edit-btn:hover {
        color: #333;
        cursor: pointer;
      }
    }
  }
  .el-form {
    margin-top: 20px;
    & > .el-col {
      min-height: 80px;
    }
    .el-input,
    .el-select {
      width: 100%;
    }
    ::v-deep textarea {
      min-height: 150px !important;
    }
    .form-item-left {
      .el-form-item {
        padding-right: 15%;
      }
    }
    .form-item-right {
      .el-form-item {
        padding-left: 15%;
      }
    }
  }
  .form-btns {
    margin-top: 30px;
    text-align: center;
  }
  .gray-font {
    color: #999;
  }

  ::v-deep .el-divider--horizontal {
    margin: 15px 0;
  }
}
</style>
