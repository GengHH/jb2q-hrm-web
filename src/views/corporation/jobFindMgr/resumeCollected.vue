<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:14
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-01 15:48:52
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeCollected.vue
-->
<template>
  <div
    id="resumeCollected"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <div class="title-style">已收藏的简历</div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-input
            v-model="queryParam.keyWord"
            autocomplete="off"
            label="关键字"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-col :span="11" class="text-left no-col-padding">
            <pl-input
              v-model="queryParam.ageMin"
              autocomplete="off"
              label="年龄（小）"
            ></pl-input>
          </el-col>
          <el-col :span="2" class="text-center no-col-padding">
            <span class="delimiter">-</span>
          </el-col>
          <el-col :span="11" class="text-right no-col-padding">
            <pl-input
              v-model="queryParam.ageMax"
              autocomplete="off"
              label="年龄（大）"
            ></pl-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <pl-input
            v-model="queryParam.positionName"
            autocomplete="off"
            label="职位名称"
          ></pl-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-select
            v-model="queryParam.workYear"
            :optionData="dicGznx"
            label="工作年限"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <pl-select
            v-model="queryParam.eduLevel"
            :optionData="$store.getters['dictionary/recruit_edu']"
            label="学历"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="queryParam.favorDate"
            type="daterange"
            align="right"
            unlink-panels
            label="123"
            range-separator="至"
            start-placeholder="收藏开始日期"
            end-placeholder="收藏结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <pl-button
            class="orange-btn"
            icon="el-icon-edit"
            @click="doFavorResume"
            >批量操作</pl-button
          >
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-col :span="8" class="no-col-padding text-left">
            <pl-button
              class="orange-btn"
              icon="el-icon-search"
              @click="queryFavorList"
              >搜索</pl-button
            >
          </el-col>
          <el-col :span="8" class="no-col-padding text-center">
            <pl-button>清空</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-right">
            <pl-button>高级搜索</pl-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <pl-table
      :data="tableData"
      :totalCount="tableCount"
      ref="resumeTable"
      :columns="columns"
      @handleSizeChangeOnBack="queryFavorList"
      @handleCurrentChangeOnBack="queryFavorList"
      show-pager
    >
      <template #updateTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.updateTime }}</span>
      </template>
      <template #loginTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.loginTime }}</span>
      </template>
      <template #favorStartTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.favorStartTime }}</span>
      </template>
    </pl-table>
    <!-- 简历详细信息 弹窗部分 -->
    <el-dialog
      v-if="detailsDialog"
      width="75%"
      :visible.sync="detailsDialog"
      :before-close="handleClose"
    >
      <!-- <div class="operate-resume-header">
        <el-button size="small" round
          ><i class="el-icon-star-on" v-if="queryFavor">已收藏</i>
          <i class="el-icon-star-off" v-else>收藏</i>
        </el-button> -->
      <!--<el-button size="small" round
          ><i class="el-icon-download">下载</i></el-button
        >
         <el-button size="small" round
          ><i class="el-icon-user">获取联系方式</i></el-button
        > -->
      <!-- <el-button size="small" round
          ><i class="el-icon-el-icon-tickets" @click="invite"
            >邀约</i
          ></el-button
        > -->
      <!-- </div> -->
      <BaseResumeInfo
        secrecy
        :queryPid="queryPid"
        searchByCorp
      ></BaseResumeInfo>
    </el-dialog>
    <!-- end -->
    <!-- 邀约 弹窗部分 -->
    <el-dialog
      width="75%"
      :visible.sync="inviteDialog"
      :before-close="handleClose"
    >
      <div v-loading="inviteLoading">
        <!-- 显示职位名称 -->
        <div class="zw-wrap zw-wrap-header" style="width:100%">
          <el-row :gutter="40" style="margin:0">
            <el-col
              :span="12"
              class="zw-wrap-header-title"
              style="line-height: 70px;"
            >
              职位列表信息<i class="header-icon el-icon-info"></i>
            </el-col>
            <el-col :span="12">
              <BaseSearch
                placeholder="请输入职位名称"
                @clickButton="queryInvitePosition($event)"
              ></BaseSearch>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="!invitePositionList.length"
          class="zw-wrap zw-wrap-body"
          style="text-align:center;padding:80px;color:#999;"
        >
          无职位数据
        </div>
        <div v-else class="zw-wrap zw-wrap-body">
          <!-- 委托单位或者见习职位列表 -->
          <el-carousel indicator-position="outside" :autoplay="false">
            <el-carousel-item v-for="item in carouselPageCount" :key="item">
              <div class="zw-carousel">
                <el-radio-group
                  v-model="invitePosition"
                  size="medium"
                  id="positionsRadios"
                  class="radio-list-bar"
                >
                  <el-popover
                    ref="popoverRef"
                    v-for="(positionItem, index) in invitePositionPageList[
                      item - 1
                    ]"
                    :key="index"
                    placement="bottom"
                    width="600"
                    trigger="click"
                    :append-to-body="false"
                    popper-class="invite-position-popover"
                  >
                    <el-radio-button
                      class="zw-radio-button"
                      :key="positionItem.positionId"
                      :label="positionItem.positionId"
                      slot="reference"
                    >
                      {{ positionItem.positionName }}
                      <!-- <span
                        :id="positionItem.gwbh"
                        :class="positionItem.cid"
                        slot="reference"
                        @click="
                          radioGroupChange(
                            positionItem.gwbm,
                            positionItem.cid,
                            positionItem.dwmc
                          )">{{ positionItem.zwmc }}</span
                      > -->
                    </el-radio-button>
                  </el-popover>
                </el-radio-group>
              </div>
            </el-carousel-item>
          </el-carousel>
          <el-divider></el-divider>
          <!-- 面试信息 -->
          <el-form
            class="width70"
            :model="interview"
            ref="interview"
            :label-position="labelPosition"
            :rules="rules.interview"
          >
            <!-- <el-form-item
              label="反馈结果"
              prop="interviewStatus"
              :label-width="formLabelWidth"
            >
              <el-radio-group v-model="interview.interviewStatus" size="medium">
                <el-radio-button >通知面试</el-radio-button
                >
                <el-radio-button label="04">意向录用</el-radio-button>
                <el-radio-button label="05">通知不录用</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
            <el-row>
              <el-col :span="12">
                <el-form-item
                  class="input-one"
                  label="面试日期"
                  :label-width="formLabelWidth"
                  prop="interviewDate"
                >
                  <el-date-picker
                    type="date"
                    placeholder="面试日期"
                    v-model="interview.interviewDate"
                    :picker-options="interviewDateOptions"
                    value-format="yyyyMMdd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  class="input-two"
                  label="面试时间"
                  :label-width="formLabelWidth"
                  prop="interviewTime"
                >
                  <!-- <el-time-picker
                    placeholder="面试时间"
                    v-model="interview.interviewTime"
                    value-format="HHmmss"
                    style="width: 100%;"
                  ></el-time-picker> -->
                  <el-time-select
                    v-model="interview.interviewTime"
                    placeholder="面试时间"
                    :picker-options="{
                      start: '06:30',
                      step: '00:15',
                      end: '22:30'
                    }"
                    style="width: 100%;"
                  ></el-time-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="面试联系人"
              prop="interviewContactName"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="interview.interviewContactName"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="面试联系电话"
              prop="interviewContactPhone"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="interview.interviewContactPhone"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="面试地址"
              prop="interviewAddress"
              :label-width="formLabelWidth"
            >
              <el-input
                type="textarea"
                placeholder="请输入（40字符）"
                v-model="interview.interviewAddress"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="备注"
              prop="interviewRemarks"
              :label-width="formLabelWidth"
            >
              <el-input
                type="textarea"
                placeholder="请输入（2000字符）"
                v-model="interview.interviewRemarks"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="operate-resume-header" v-if="invitePositionList.length">
          <el-button size="small" @click="invite()"
            ><i class="el-icon-el-icon-tickets">邀约</i></el-button
          >
        </div>
      </div>
      <!-- end -->
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script>
import {
  findFavorList,
  doFavorResume,
  queryPositionList,
  doInvite
} from '@/api/corporationApi';
import BaseSearch from '@/components/common/BaseSearch.vue';
import BaseResumeInfo from '@/components/common/BaseResumeInfo.vue';
import { niceScroll, niceScrollUpdate } from '@/utils';
export default {
  name: 'resumeCollected',
  components: {
    BaseSearch,
    BaseResumeInfo
  },
  data() {
    /**
     *自定义校验规则
     */
    var validatePhone = (rule, value, callback) => {
      if (!phonePattern.test(value) && !telephonePattern.test(value)) {
        return callback(new Error('请输入正确格式的手机号码或者固定电话号'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      formLabelWidth: '150px',
      loading: false,
      detailsDialog: false,
      queryParam: {
        // feedBackStatus: '',
        cid: this.$store.getters['corporation/cid'],
        keyWord: '',
        ageMin: '',
        ageMax: '',
        positionName: '',
        workYear: '',
        eduLevel: '',
        favorDate: [],
        favorStartDate: '',
        favorEndDate: '',
        pageParam: {
          pageSize: 10,
          pageIndex: 0
        }
      },
      data: [],
      dicGznx: this.$store.getters['dictionary/recruit_work_year'],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      tableCount: 0,
      tableData: [],
      queryPid: '',
      queryFavor: true,
      inviteLoading: false,
      inviteDialog: false,
      invitePosition: '',
      carouselPageCount: 0,
      invitePositionList: [],
      invitePositionPageList: [],
      interview: {
        // applyforIdList: [],
        // applyforId: '',
        // feedbackStatus: '',
        interviewDate: '',
        interviewTime: '',
        interviewContactName: '',
        interviewContactPhone: '',
        interviewAddress: '',
        interviewRemarks: ''
      },
      interviewDateOptions: {
        //控制时间范围（只选今天之后的日期）
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      rules: {
        interview: {
          interviewDate: [
            { required: true, message: '请输入面试日期', trigger: 'blur' }
          ],
          interviewTime: [
            { required: true, message: '请输入面试时间', trigger: 'blur' }
          ],
          interviewContactName: [
            { required: true, message: '请输入面试联系人', trigger: 'blur' }
          ],
          interviewContactPhone: [
            { required: true, message: '请输面试联系电话', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          interviewAddress: [
            { required: true, message: '面试地址', trigger: 'blur' },
            {
              max: 40,
              message: '最长不可超过40字符',
              trigger: ['blur', 'change']
            }
          ],
          interviewRemarks: [
            {
              max: 2000,
              message: '最长不可超过2000字符',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
    };
  },
  computed: {
    columns() {
      return [
        { attrs: { type: 'selection' } },
        {
          label: '序号',
          attrs: { type: 'index', width: 60 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '姓名',
          prop: 'xm',
          customerRenderText: ({ row }) => {
            return row.xm ? row.xm.substr(0, 1) + '**' : row.xm;
          },
          rowSpan: 'all'
        },
        {
          label: '年龄',
          prop: 'age',
          attrs: { width: 60 },
          rowSpan: 'all'
        },
        {
          label: '学历',
          prop: 'eduLevel',
          customerRenderText: ({ row }) => {
            const { eduLevel } = row;
            const data = this.$store.getters['dictionary/recruit_edu'] || [];
            return (
              data.find(element => element.value === eduLevel)?.label ||
              eduLevel
            );
          },
          rowSpan: 'all'
        },
        {
          label: '工作年限（年）',
          prop: 'workYear',
          attrs: { width: 100 },
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '简历最近修改时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'updateTime',
          formatter: 'date',
          slotName: 'updateTime'
        },
        {
          label: '账号最近登录时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'loginTime',
          formatter: 'date',
          slotName: 'loginTime'
        },
        {
          label: '收藏时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'favorStartTime',
          formatter: 'date',
          slotName: 'favorStartTime'
        },
        // { label: '评分', prop: 'star', slotName: 'star' },
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
          attrs: { width: 300 },
          actions: [
            {
              id: 'action1',
              text: '查看简历',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //判断是不是显示简历的私密信息（应聘来源为04-邀约应聘，且不参见面试的不能查看到私密简历信息）
                // if (row.applyforId) {
                //   if (
                //     this.activeName === '03' &&
                //     row.reply === '1' &&
                //     row.source === '04'
                //   ) {
                //     this.secrecy = true;
                //   } else {
                //     this.secrecy = false;
                //   }
                //   this.queryResumesInfo(row.applyforId);
                // } else {
                //   //无法获取简历信息
                //   this.$message({ type: 'error', message: '无法获取简历信息' });
                // }
                this.showResumeDetials(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action2',
              text: '取消收藏',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-star-on',
              onClick: ({ row }) => {
                //console.log(row);
                this.doFavorResume(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action3',
              text: '邀约',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-edit',
              onClick: ({ row }) => {
                //console.log(row);
                this.inviteDetials(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    },
    selection() {
      return this.$refs.resumeTable.multipleSelection;
    }
  },
  watch: {
    'queryParam.favorDate': function(val) {
      if (val && val.length > 0) {
        this.queryParam.favorStartDate = val[0] + ' 00:00:00' || '';
        this.queryParam.favorEndDate =
          val.length > 1 ? val[1] + ' 23:59:59' || '' : '';
      } else {
        this.queryParam.favorStartDate = '';
        this.queryParam.favorEndDate = '';
      }
    },
    /**
     * 职位信息分页
     */
    invitePositionList: function() {
      //节流，防止数据短时间多次变动照成样式渲染过多而浪费性能
      this._.throttle(() => {
        //监听选中的选项-修改样式
        if (this.invitePositionList.length) {
          this.invitePositionPageList = [];
          let pageCount =
            Math.floor(this.invitePositionList.length / 20) +
            (this.invitePositionList.length % 20 > 0 ? 1 : 0);
          for (let i = 1; i <= pageCount; i++) {
            this.invitePositionPageList.push(
              this.invitePositionList.slice((i - 1) * 20, i * 20)
            );
          }
          console.log(this.invitePositionPageList);
          this.carouselPageCount = pageCount;
        } else {
          //没有职位信息
          this.invitePositionPageList = [];
          this.carouselPageCount = 0;
        }
      }, 500)();
    }
  },
  methods: {
    handleClose() {
      this.detailsDialog = false;
      // this.wchatDialog = false;
      this.inviteDialog = false;
    },
    /**
     * 单个取消和批量取消收藏
     */
    async doFavorResume(row) {
      if (
        (!row || typeof row == 'function') &&
        this.selection &&
        this.selection.length == 0
      ) {
        this.$alert('请选择一条');
      } else {
        //取消收藏简历
        let res = await doFavorResume({
          resumeIdList: row
            ? [row.resumeId]
            : this.selection.map(obj => {
                return obj.resumeId;
              }),
          cid: this.$store.getters['corporation/cid'],
          favorType: false
        });
        if (res.status === 200) {
          // 修改按钮状态
          // this.queryResult[index].favor = false;
          this.$message({ type: 'success', message: '取消收藏简历成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏简历失败' });
        }
      }
    },
    /**
     * 查询已收藏的简历信息列表
     */
    async queryFavorList() {
      let _pageSize = this.$refs.resumeTable?.pageSize || 10,
        _pageIndex = this.$refs.resumeTable?.currentPage - 1 || 0;
      let params = { ...this.queryParam };
      params.pageParam.pageSize = _pageSize;
      params.pageParam.pageIndex = _pageIndex;
      this.loading = true;
      let queryRes = await findFavorList(params);
      if (queryRes && queryRes.status === 200) {
        queryRes.result.pageresult.data.forEach(item => {
          item.actions = ['action1', 'action2', 'action3'];
        });
        this.tableCount = queryRes.result.pageresult.total || 0;
        this.tableData = queryRes.result.pageresult.data || [];
        this.$message.success('获取收藏简历信息成功');
      } else if (queryRes) {
        this.$message.error('获取收藏简历信息失败');
      }
      this.loading = false;
    },
    /**
     * 显示简历详情
     */
    showResumeDetials(row) {
      this.detailsDialog = true;
      //查询简历信息，并显示
      this.queryPid = row.pid;
      // this.queryFavor = row.favor;
    },
    /**
     * 打开邀约界面
     */
    inviteDetials(row) {
      //本条记录的pid
      this.queryPid = row.pid;
      this.inviteDialog = true;
      //只需首次查询所有职位信息
      if (!this.invitePositionList.length) {
        this.inviteLoading = true;
        this.queryInvitePosition();
      }
    },
    /**
     * 查询可以邀约的单位
     */

    async queryInvitePosition(val) {
      //查询职位信息
      let queryRes = await queryPositionList({
        cid: this.$store.getters['corporation/cid'],
        positionName: val ? $.trim(val) : ''
      });
      if (queryRes && queryRes.status === 200) {
        this.invitePositionList = queryRes.result.data || [];
      } else if (queryRes) {
        this.$message({ type: 'error', message: '无法获取职位信息' });
      }
      this.inviteLoading = false;
    },
    /**
     * 邀约
     */
    invite(arg) {
      if (!this.invitePosition) {
        this.$alert('请选择一个职位');
        return;
      }
      this.$refs.interview.validate(async valid => {
        if (valid) {
          let inviteRes = await doInvite({
            pid: this.queryPid,
            positionId: this.invitePosition,
            ...this.interview
          });
          if (inviteRes && inviteRes.status === 200) {
            this.$message({ type: 'success', message: '邀约成功' });
            this.inviteDialog = false;
            //TODO 按钮重置
            //  this.queryResult[index].invite = true;
          } else if (inviteRes) {
            this.$message({ type: 'error', message: '邀约失败' });
          }
        }
      });
    }
  },
  mounted() {
    niceScroll('#indexApp');
    this.queryFavorList();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  }
};
</script>

<style lang="scss" scoped>
#resumeCollected {
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
  .el-row {
    & > .el-col {
      margin: 10px 0;
    }
    .delimiter {
      line-height: 40px;
    }
    .no-col-padding {
      button {
        width: 100px;
      }
    }
    .el-range-editor {
      width: 100%;
    }
  }
}
.operate-resume-header {
  width: 100%;
  background-color: #f4f4f4;
  text-align: center;
  padding: 14px 0;
}
.zw-radio-button {
  span {
    border: 0;
  }
  &:first-child .el-radio-button__inner {
    border-left: 0;
  }
}
.el-carousel__item {
  .zw-carousel {
    margin: 0;
    padding: 10px 60px 0;
    .radio-list-bar {
      height: 100%;
      max-height: 100% !important;
    }
  }
}
</style>
