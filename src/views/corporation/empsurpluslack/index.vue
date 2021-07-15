<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-15 16:06:15
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
      <el-col :span="8">
        <pl-select
          required
          v-model="params.queryType"
          :optionData="lxDic"
          label="申请类型"
          @change="query"
        >
        </pl-select>
      </el-col>
      <el-col :span="8">
        <pl-select
          required
          v-model="params.positionType"
          :optionData="zwlbDic"
          label="职位类别"
          @change="query"
        >
        </pl-select>
      </el-col>
      <el-col :span="8">
        <pl-select
          required
          v-model="params.verifyStatus"
          :optionData="ztDic"
          label="审核状态"
          @change="query"
        >
        </pl-select>
      </el-col>
      <!-- <el-col :span="6">
        <BaseSearch ref="searchBox" @click="query($event)"></BaseSearch>
      </el-col> -->
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
            <span style="margin-left: 5px">{{ row.verifyTime }}</span>
          </template>
          <template #verifyStatus="{row}">
            <span v-if="row.verifyStatus === '2'" style="color:green"
              >通过</span
            >
            <el-popover
              v-else-if="row.verifyStatus === '3'"
              trigger="hover"
              placement="top"
            >
              <p><span style="color:red">原因</span>: {{ row.memo }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">驳回</el-tag>
              </div>
            </el-popover>
            <span v-else>待审核</span>
          </template>
        </pl-table>
      </el-col>
    </el-row>

    <!-- 用工缺口弹出框 -->
    <el-dialog
      :title="dialogTitle"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="workInfo"
        :rules="rules"
        ref="workInfo"
        label-width="0px"
        class="clearfix"
      >
        <el-col :span="12" class="form-item-left">
          <el-form-item prop="corpName">
            <pl-input
              required
              v-model="workInfo.corpName"
              label="单位名称"
              disabled
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-right">
          <el-form-item prop="tyshxym">
            <pl-input
              required
              v-model="workInfo.tyshxym"
              label="社会信用代码"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-left">
          <el-form-item prop="positionType">
            <pl-select
              required
              v-model="workInfo.positionType"
              :optionData="zwlbDic"
              label="职位类别"
            >
            </pl-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-right">
          <el-form-item prop="validDate">
            <!-- <pl-input
              required
              v-model="workInfo.validDate"
              label="该条信息有效期"
            ></pl-input> -->
            <pl-date-picker
              required
              v-model="workInfo.validDate"
              type="date"
              value-format="yyyyMMdd"
              label="该条信息有效期"
            >
            </pl-date-picker>
          </el-form-item>
        </el-col>
        <!-- 用工缺口 -->
        <template v-if="params.queryType">
          <el-col :span="12" class="form-item-left">
            <el-form-item prop="recruitNum">
              <pl-input
                required
                v-model.number="workInfo.recruitNum"
                label="招聘人数"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-right">
            <el-form-item prop="workNature">
              <pl-select
                required
                v-model="workInfo.workNature"
                :optionData="gzxzDic"
                label="工作性质"
              >
              </pl-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-left">
            <el-form-item prop="eduRequire">
              <pl-select
                required
                v-model="workInfo.eduRequire"
                :optionData="xlyqDic"
                label="学历要求"
              >
              </pl-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-right">
            <el-form-item prop="borrowPeriod">
              <pl-input
                required
                v-model="workInfo.borrowPeriod"
                label="借用期限"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-left">
            <el-form-item prop="salaryMin">
              <pl-input
                required
                v-model.number="workInfo.salaryMin"
                @change="minSalaryChange"
                label="薪酬下限"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-right">
            <el-form-item prop="salaryMax">
              <pl-input
                required
                v-model.number="workInfo.salaryMax"
                @change="maxSalaryChange"
                label="薪酬上限"
              ></pl-input>
            </el-form-item>
          </el-col>
        </template>
        <!-- end -->
        <!-- 用工剩余 -->
        <template v-else>
          <el-col :span="12" class="form-item-left">
            <el-form-item prop="surplusNum">
              <pl-input
                required
                v-model.number="workInfo.surplusNum"
                label="用工剩余人数"
              ></pl-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item-right">
            <el-form-item prop="lendPeriod">
              <pl-input
                required
                v-model="workInfo.lendPeriod"
                label="可借出期限"
              ></pl-input>
            </el-form-item>
          </el-col>
        </template>
        <!-- end -->
        <el-col :span="12" class="form-item-left">
          <el-form-item required prop="contactName">
            <pl-input
              required
              v-model="workInfo.contactName"
              label="联系人"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-item-right">
          <el-form-item prop="contactPhone">
            <pl-input
              required
              v-model="workInfo.contactPhone"
              label="联系人电话"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="content">
            <pl-input
              required
              type="textarea"
              autosize
              label="其他说明（不超过2000字符）"
              maxlength="2000"
              show-word-limit
              :rows="12"
              v-model="workInfo.content"
            >
            </pl-input>
          </el-form-item>
        </el-col>
        <div class="form-btns">
          <pl-button class="white-btn btn-style" @click="unEditInfo($event)"
            >取消</pl-button
          >
          <pl-button
            v-if="updateInfo"
            class="orange-btn btn-style"
            :auto-loading="true"
            @click="submitForm($event, 'workInfo')"
          >
            修改
          </pl-button>
          <pl-button
            v-else
            class="orange-btn btn-style"
            :auto-loading="true"
            @click="submitForm($event, 'workInfo')"
          >
            添加
          </pl-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { phonePattern } from '@/utils/regexp';
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
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为0'));
      }
      if (value > 999) {
        callback(new Error('不能超过999'));
      } else {
        callback();
      }
    };
    return {
      path: require('@/assets/logo.png'),
      loading: false,
      dialogTitle: '用工缺失',
      unshowColumn: false,
      dialogFormVisible: false,
      disabledEditForm: false,
      showEditBtn: false,
      showEditForm: false,
      updateInfo: false,
      tableData: [],
      totalCount: 0,
      workInfo: {
        lackId: null,
        surplusId: null,
        cid: this.$store.getters['corporation/cid'],
        corpName: this.$store.getters['corporation/username'],
        tyshxym: '',
        contactName: '',
        contactPhone: '',
        positionType: '0101',
        recruitNum: 60,
        workNature: '01',
        eduRequire: '02',
        salaryMax: '3000',
        salaryMin: '1000',
        borrowPeriod: '1',
        content: 'sit quis laboris',
        validDate: '16',
        surplusNum: '20',
        lendPeriod: '1'
      },
      params: {
        positionType: '',
        verifyStatus: '',
        queryType: true
      },
      rules: {
        tyshxym: [
          { required: true, message: '请输入社会信用代码', trigger: 'blur' },
          {
            max: 18,
            message: '最长不可超过18字符',
            trigger: ['blur', 'change']
          }
        ],
        corpName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          {
            max: 100,
            message: '最长不可超过100字符',
            trigger: ['blur', 'change']
          }
        ],
        contactPhone: [
          { required: true, message: '请输入请输联系电话', trigger: 'blur' },
          {
            pattern: phonePattern,
            message: '请输入正确格式的联系电话',
            trigger: ['blur', 'change']
          }
        ],
        contactName: [
          { required: true, message: '请输入请输联系人', trigger: 'blur' }
        ],
        positionType: [
          { required: true, message: '请输入工作性质', trigger: 'blur' }
        ],
        recruitNum: [
          { required: true, message: '请输入招聘人数', trigger: 'blur' },
          {
            validator: checkNum,
            trigger: ['blur', 'change']
          }
        ],
        workNature: [
          { required: true, message: '请输入工作性质', trigger: 'blur' }
        ],
        eduRequire: [
          { required: true, message: '请输入学历要求', trigger: 'blur' }
        ],
        salaryMax: [
          { required: true, message: '请输入薪酬上限', trigger: 'blur' }
        ],
        salaryMin: [
          { required: true, message: '请输入薪酬下限', trigger: 'blur' }
        ],
        borrowPeriod: [
          { required: true, message: '请输入借用期限', trigger: 'blur' }
        ],
        validDate: [
          { required: true, message: '请输入该条信息有效期', trigger: 'blur' }
        ],
        surplusNum: [
          { required: true, message: '请输入用工剩余人数', trigger: 'blur' },
          {
            validator: checkNum,
            trigger: ['blur', 'change']
          }
        ],
        lendPeriod: [
          { required: true, message: '请输入可借出期限', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入其他说明', trigger: 'blur' },
          {
            max: 2000,
            message: '最长不可超过2000字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      dicData: this.$store.getters['dictionary/yesno'],
      ztDic: this.$store.getters['dictionary/recruit_surplus_verify_status'],
      zwlbDic: this.$store.getters['dictionary/recruit_position_s_type'],
      // gzxzDic: this.$store.getters['dictionary/recruit_work_nature'],
      xlyqDic: this.$store.getters['dictionary/recruit_work_year'],
      lxDic: [
        { label: '用工缺失', value: true },
        { label: '用工剩余', value: false }
      ]
    };
  },
  computed: {
    gzxzDic() {
      //就业见习基地”标签单位
      let isTranBaseSymbol = this.$store.getters[
        'corporation/tran_base_symbol'
      ];
      let _dic = this.$store.getters['dictionary/recruit_work_nature'];
      if (!isTranBaseSymbol && _dic.length > 0) {
        _dic.pop();
      }
      return _dic;
    },
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
          customerRenderText: ({ row }) => {
            const { positionType } = row;
            const data =
              this.$store.getters['dictionary/recruit_position_s_type'] || [];
            return (
              data.find(element => element.value === positionType)?.label ||
              positionType
            );
          },
          rowSpan: 'all' //tranBaseSymbol
        },
        {
          label: '招聘人数',
          prop: 'recruitNum',
          unshow: this.unshowColumn,
          rowSpan: 'all'
        },
        {
          label: '工作性质',
          prop: 'workNature',
          unshow: this.unshowColumn,
          customerRenderText: ({ row }) => {
            const { workNature } = row;
            const data =
              this.$store.getters['dictionary/recruit_work_nature'] || [];
            return (
              data.find(element => element.value === workNature)?.label ||
              workNature
            );
          },
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
          unshow: this.unshowColumn,
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
          unshow: this.unshowColumn,
          rowSpan: 'all'
        },
        {
          label: '薪酬上限',
          prop: 'salaryMax',
          unshow: this.unshowColumn,
          rowSpan: 'all'
        },
        {
          label: '借用期限',
          prop: 'borrowPeriod',
          unshow: this.unshowColumn,
          rowSpan: 'all'
        },
        {
          label: '可借用期限',
          prop: 'lendPeriod',
          unshow: !this.unshowColumn,
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '用工剩余人数',
          prop: 'surplusNum',
          unshow: !this.unshowColumn,
          attrs: { showOverflowTooltip: true },
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
          slotName: 'verifyStatus'
        },
        // {
        //   label: '审核人',
        //   prop: 'verifyUserId',
        //   rowSpan: 'all'
        // },
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
        {
          label: '操作',
          attrs: { width: 180 }, //240
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
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action2',
              text: '编辑更新',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
                this.editInfo(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
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
  watch: {
    /**
     * 根据查询类型，动态显示列
     */
    'params.queryType': function(val) {
      if (val) {
        this.unshowColumn = false;
      } else {
        this.unshowColumn = true;
      }
    }
  },
  methods: {
    btnClick1() {
      this.dialogTitle = '用工缺失';
      this.updateInfo = false;
      Object.keys(this.workInfo).forEach(
        key =>
          (this.workInfo[key] =
            key === 'cid' || key === 'corpName' ? this.workInfo[key] : '')
      );
      this.params.queryType = true;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    btnClick2() {
      this.dialogTitle = '用工剩余';
      this.updateInfo = false;
      Object.keys(this.workInfo).forEach(
        key =>
          (this.workInfo[key] =
            key === 'cid' || key === 'corpName' ? this.workInfo[key] : '')
      );
      this.params.queryType = false;
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    minSalaryChange() {
      if (!this.workInfo.salaryMin) {
        return;
      }
      // if (isNaN(Number(this.workInfo.salaryMin))) {
      //   this.$alert('请输入数字');
      //   this.workInfo.salaryMin = '';
      // } else
      if (
        this.workInfo.salaryMax &&
        this.workInfo.salaryMin > this.workInfo.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.workInfo.salaryMin = '';
      } else if (
        this.workInfo.salaryMax &&
        this.workInfo.salaryMin * 3 < this.workInfo.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.workInfo.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (!this.workInfo.salaryMax) {
        return;
      }
      // if (isNaN(Number(this.workInfo.salaryMax))) {
      //   this.$alert('请输入数字');
      //   this.workInfo.salaryMax = '';
      // } else
      if (
        this.workInfo.salaryMin &&
        this.workInfo.salaryMin > this.workInfo.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.workInfo.salaryMin = '';
      } else if (
        this.workInfo.salaryMin &&
        this.workInfo.salaryMin * 3 < this.workInfo.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.workInfo.salaryMax = '';
      }
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
          this.tableData = queryRes.result.pageresult.data || [];
          this.tableData.forEach(element => {
            // element.actions = ['action1'];
            element.actions = [];
            if (element.verifyStatus === '1') {
              element.actions.push('action2');
            }
          });
          this.totalCount = queryRes.result.pageresult.total || 0;
        } else if (queryRes) {
          this.tableData = [];
          this.totalCount = 0;
          this.$message.error('未查询到任何信息');
        }
      } else {
        //查询用工剩余
        let queryRes = await querySurplus({
          cid: this.$store.getters['corporation/cid'] || '',
          positionType: this.params.positionType,
          verifyStatus: this.params.verifyStatus,
          pageParam: {
            pageIndex: this.$refs.serveTable.currentPage - 1 || 0,
            pageSize: this.$refs.serveTable.pageSize || 10
          }
        });
        if (queryRes.status === 200 && queryRes.result.pageresult.data) {
          this.tableData = queryRes.result.pageresult.data || [];
          this.tableData.forEach(element => {
            // element.actions = ['action1'];
            element.actions = [];
            if (element.verifyStatus === '1') {
              element.actions.push('action2');
            }
          });
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
    editInfo(data) {
      this.workInfo = { ...data };
      this.dialogFormVisible = true;
      //this.showEditForm = true;
      this.disabledEditForm = true;
      this.updateInfo = true;
    },
    /**
     * 取消编辑编辑店面
     */
    unEditInfo() {
      this.dialogFormVisible = false;
      //this.showEditForm = false;
      this.disabledEditForm = false;
    },
    /**
     * 保存用工信息（新增或者修改）
     */
    submitForm(done, formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //let formData = JSON.parse(JSON.stringify(this.workInfo));
          // let formData = this.$refs[formName].model;
          if (this.params.queryType) {
            //用工缺口
            let result = await saveLack(this.workInfo);
            if (result && result.status === 200) {
              //更新数据
              //this.query();
              this.tableData.push({ ...this.workInfo });

              this.$message.success('保存成功!');
              this.dialogFormVisible = false;
              this.showEditForm = false;
            } else if (result) {
              this.$message.error('保存失败');
              done();
            }
          } else {
            //用工剩余
            let result = await saveSurplus(this.workInfo);
            if (result && result.status === 200) {
              //更新数据
              //this.query();
              this.tableData.push({ ...this.workInfo });

              this.$message.success('保存成功!');
              this.dialogFormVisible = false;
              this.showEditForm = false;
            } else if (result) {
              this.$message.error('保存失败');
              done();
            }
          }
        }
      });
    },
    clearEditShop(done) {
      //清空表格
      this.$refs.workInfo.resetFields();
      //this.workInfo(done);
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
