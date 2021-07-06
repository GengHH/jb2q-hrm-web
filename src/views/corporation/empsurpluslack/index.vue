<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-06 18:30:40
 * @Description:
 * @FilePath: \jb2q-hrm-web\src\views\corporation\empsurpluslack\index.vue
-->
<template>
  <!-- <router-view></router-view> -->
  <div id="indexBody" v-loading="loading" element-loading-text="拼命加载中">
    <div class="title-style">
      用工余缺
      <pl-button id="addShopBtn1" class="addShopBtn" @click="btnClick1"
        ><i class="el-icon-circle-plus-outline">点击新增用工缺失</i></pl-button
      >
      <pl-button id="addShopBtn2" class="addShopBtn" @click="btnClick2"
        ><i class="el-icon-circle-plus-outline">点击新增用工剩余</i></pl-button
      >
    </div>
    <!-- 历史信息展示 -->
    <el-row :gutter="20" style="margin-top:40px;">
      <el-col :span="6">
        <pl-select
          required
          v-model="params.positionType"
          :optionData="zwlbDic"
          label="职位类别"
        >
        </pl-select>
      </el-col>
      <el-col :span="6">
        <pl-select
          required
          v-model="params.verifyStatus"
          :optionData="ztDic"
          label="审核状态"
        >
        </pl-select>
      </el-col>
      <el-col :span="6">
        <pl-select
          required
          v-model="params.queryType"
          :optionData="lxDic"
          label="申请类型"
        >
        </pl-select>
      </el-col>
      <el-col :span="6">
        <BaseSearch ref="searchBox" @click="query($event)"></BaseSearch>
      </el-col>
      <el-col :span="24">
        <pl-table
          id="tableData"
          :data="tableData"
          :totalCount="totalCount"
          ref="serveTable"
          :columns="columns"
          show-pager
          @handleSizeChangeOnBack="query"
          @handleCurrentChangeOnBack="query"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #reply="{row}">
            <span v-if="row.reply === '1'" style="color:green">是</span>
            <el-popover v-else trigger="hover" placement="top">
              <p><span style="color:red">原因</span>: {{ row.reason }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">否</el-tag>
              </div>
            </el-popover>
          </template>
        </pl-table>
      </el-col>
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
        <el-form-item prop="tyshxydm">
          <pl-input
            required
            v-model="shopInfo.tyshxydm"
            label="职位分类"
            :disabled="disabledEditForm"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="corpName">
          <pl-input
            required
            v-model="shopInfo.corpName"
            label="招聘人数"
            :disabled="disabledEditForm"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="tyshxydm">
          <pl-select
            required
            v-model="shopInfo.verifyStatus"
            :optionData="ztDic"
            label="工作性质"
            :disabled="true"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="corpName">
          <pl-select
            required
            v-model="shopInfo.verifyStatus"
            :optionData="ztDic"
            label="学历要求"
            :disabled="true"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-left">
        <el-form-item prop="salaryMin">
          <pl-input
            required
            v-model="shopInfo.salaryMin"
            label="薪酬下限"
            :disabled="disabledEditForm"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="form-item-right">
        <el-form-item prop="salaryMax">
          <pl-input
            required
            v-model="shopInfo.salaryMax"
            label="薪酬上限"
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
          添加
        </pl-button>
      </div>
    </el-form>
    <!-- 用工缺口弹出框 -->
    <el-dialog
      :title="dialogTitle"
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
import {
  queryLack,
  querySurplus,
  saveLack,
  saveSurplus
} from '@/api/corporationApi';
import { niceScroll, niceScrollUpdate } from '@/utils';
import BaseSearch from '@/components/common/BaseSearch';
export default {
  name: 'empsurpluslackApp',
  components: { BaseSearch },
  data() {
    return {
      path: require('@/assets/logo.png'),
      loading: false,
      dialogTitle: '用工缺口',
      dialogFormVisible: false,
      disabledEditForm: false,
      showEditBtn: false,
      showEditForm: false,
      updateShop: false,
      tableData: [],
      totalCount: 0,
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
      params: {
        positionType: '',
        verifyStatus: '',
        queryType: true
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
      dicData: this.$store.getters['dictionary/yesno'],
      zwlbDic: this.$store.getters['dictionary/recruit_position_s_type'],
      ztDic: this.$store.getters['dictionary/recruit_surplus_verify_status'],
      lxDic: [
        { label: '用工缺失', value: true },
        { label: '用工剩余', value: false }
      ]
    };
  },
  computed: {
    columns() {
      return [
        // { attrs: { type: 'selection' } },
        {
          label: '序号',
          attrs: { type: 'index', width: 60 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '单位名称',
          prop: 'corpName',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all' //tranBaseSymbol
        },
        {
          label: '职位分类',
          prop: 'positionType',
          rowSpan: 'all' //tranBaseSymbol
        },
        {
          label: '招聘人数',
          prop: 'recruitNum',
          rowSpan: 'all'
        },
        {
          label: '工作性质',
          prop: 'workNature',
          rowSpan: 'all'
        },
        // {
        //   label: '工作年限',
        //   prop: 'workYear',
        //   customerRenderText: ({ row }) => {
        //     const { workYear } = row;
        //     const data =
        //       this.$store.getters['dictionary/recruit_work_year'] || [];
        //     return (
        //       data.find(element => element.value === workYear)?.label ||
        //       workYear
        //     );
        //   },
        //   rowSpan: 'all'
        // },
        {
          label: '学历要求',
          prop: 'eduRequire',
          customerRenderText: ({ row }) => {
            const { eduRequire } = row;
            const data = this.$store.getters['dictionary/recruit_edu'] || [];
            return (
              data.find(element => element.value === eduRequire)?.label ||
              eduRequire
            );
          },
          rowSpan: 'all'
        },
        {
          label: '薪酬上限',
          prop: 'salaryMin',
          rowSpan: 'all'
        },
        {
          label: '薪酬上限',
          prop: 'salaryMax',
          rowSpan: 'all'
        },
        {
          label: '借用期限',
          prop: 'borrowPeriod',
          rowSpan: 'all'
        },
        {
          label: '联系人',
          prop: 'contactName',
          rowSpan: 'all'
        },
        {
          label: '联系电话',
          prop: 'contactPhone',
          rowSpan: 'all'
        },
        {
          label: '审核状态',
          prop: 'verifyStatus',
          rowSpan: 'all'
        },
        {
          label: '审核人',
          prop: 'verifyUserId',
          rowSpan: 'all'
        },
        {
          label: '审核时间',
          prop: 'verifyTime',
          attrs: { showOverflowTooltip: true },
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '备注',
          prop: 'memo',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        // {
        //   label: '是否参加面试',
        //   prop: 'reply',
        //   slotName: 'reply',
        //   unshow: this.unshowCjmsColumn
        // },

        // {
        //   label: '地址',
        //   attrs: { showOverflowTooltip: true },
        //   customerRenderText: ({ row, $index }) => {
        //     //console.log($index);
        //     const { province, city, address } = row;
        //     return province + city + address;
        //   }
        // },
        {
          label: '操作',
          attrs: { width: 240 }, //340
          actions: [
            {
              id: 'action1',
              text: '查看详情',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                //return !row?.actions?.find(c => c === item.id);
              }
            }
            // {
            //   id: 'action2',
            //   text: '反馈',
            //   attrs: { round: true, size: 'small' },
            //   icon: 'el-icon-edit-outline',
            //   onClick: ({ row }) => {
            //     if (row.applyforId) {
            //       //非批量
            //       this.batch = false;
            //       this.dialog2 = true;
            //       this.feedback.applyforId = row.applyforId;
            //       if (this.activeName === '02') {
            //         this.feedback.feedbackStatus = '03';
            //       } else if (this.activeName === '03') {
            //         this.feedback.feedbackStatus = '04';
            //       } else {
            //         this.feedback.feedbackStatus = '';
            //       }
            //     } else {
            //       this.$message({ type: 'error', message: '无法反馈信息' });
            //     }
            //   },
            //   hidden: ({ row }, item) => {
            //     //return !row?.actions?.find(c => c === item.id);
            //   }
            // },
            // {
            //   id: 'action3',
            //   text: '聊天',
            //   needBadge: true,
            //   icon: 'el-icon-chat-line-round',
            //   attrs: { round: true, size: 'small' },
            //   onClick: ({ row }) => {
            //     console.log(row);
            //     this.targetObjId = row.pid || '';
            //     this.targetObjName = row.xm || '';
            //     this.dialog3 = true;
            //     row.notReadCount = '0';
            //   },
            //   hidden: ({ row }, item) => {
            //     //return !row?.actions?.find(c => c === item.id);
            //   }
            // }
          ]
        }
      ];
    }
  },
  methods: {
    btnClick1() {
      this.dialogTitle = '用工缺口';
      dialogFormVisible = !dialogFormVisible;
    },
    btnClick2() {
      this.dialogTitle = '用工剩余';
      dialogFormVisible = !dialogFormVisible;
    },
    /**
     * 获取用工状况申请信息列表
     */
    async query(val) {
      // this.dwmc = this.$refs.searchBox.input
      //   ? $.trim(this.$refs.searchBox.input)
      //   : null;

      if (this.params.queryType) {
        //查询用工缺失
        let queryRes = await queryLack({
          cid: this.$store.getters['corporation/cid'] || '',
          positionType: this.params.positionType,
          verifyStatus: this.params.verifyStatus,
          pageParam: {
            pageIndex: this.$refs.serveTable.currentPage - 1 || 0,
            pageSize: this.$refs.serveTable.pageSize || 10
          }
        });
        console.log('result', queryRes);
        if (queryRes.status === 200 && queryRes.result.pageresult.data) {
          queryRes.result.pageresult.data.forEach(element => {
            element.actions = ['action1'];
          });
          this.tableData = queryRes.result.pageresult.data || [];
          this.totalCount = queryRes.result.pageresult.total || 0;
        } else if (queryRes) {
          this.tableData = [];
          this.totalCount = 0;
          this.$message.error('未查询到任何信息');
        }
      } else {
        //查询用工剩余
        let result = await querySurplus({
          cid: this.$store.getters['corporation/cid'] || '',
          positionType: this.params.positionType,
          verifyStatus: this.params.verifyStatus,
          pageParam: {
            pageIndex: this.$refs.serveTable.currentPage - 1 || 0,
            pageSize: this.$refs.serveTable.pageSize || 10
          }
        });
        console.log('result', result);
        if (queryRes.status === 200 && queryRes.result.pageresult.data) {
          queryRes.result.pageresult.data.forEach(element => {
            element.actions = ['action1'];
          });
          this.tableData = queryRes.result.pageresult.data || [];
          this.totalCount = queryRes.result.pageresult.total || 0;
        } else if (queryRes) {
          this.tableData = [];
          this.totalCount = 0;
          this.$message.error('未查询到任何信息');
        }
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
              this.query();
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
              this.query();
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
  mounted() {
    this.query();
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
  .addShopBtn {
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
  ::v-deep #seek-box {
    margin: 0;
  }
  ::v-deep #tableData {
    margin-top: 20px;
  }
}
</style>
