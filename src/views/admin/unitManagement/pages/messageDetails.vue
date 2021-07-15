<!--
 * @Author: your name
 * @Date: 2021-04-10 15:35:57
 * @LastEditTime: 2021-07-15 11:12:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\pages\messagedetails.vue
-->
<template>
  <el-dialog
    title="单位信息详情"
    width="850px"
    :visible="visible"
    @close="onclose"
  >
    <div style="height:500px;overflow: scroll;overflow-x: hidden;">
      <el-form size="mini" ref="form" :model="form" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位logo">
              <img
                v-if="form.logoBase64"
                style="width:240px"
                :src="'data:image/png;base64,' + form.logoBase64"
              />
              <span v-if="!form.logoBase64">暂无图片</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宣传视频">
              <el-input
                :disabled="disabled"
                v-model="form.publicityMovie"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="社会信用代码">
              <el-input :disabled="disabled" v-model="form.tyshxym"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称">
              <el-input :disabled="disabled" v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位设立日期">
              <el-input
                :disabled="disabled"
                v-model="form.establishDate"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营范围">
              <el-input
                :disabled="disabled"
                v-model="form.businessRange"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位住所">
              <el-input
                :disabled="disabled"
                v-model="form.unitResidence"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位性质">
              <el-select v-model="form.corpNature" style="width:150px">
                <el-option
                  v-for="(v, k) in dicOptions.nature"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
              <el-button type="primary" @click="alteration">变更</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="见习基地标志">
              <el-select
                :disabled="disabled"
                v-model="form.tranBaseSymbol"
                style="width:100%"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当月单位缴费人数">
              <el-input
                :disabled="disabled"
                v-model="form.meetCaller"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司简介">
              <el-input
                :disabled="disabled"
                type="textarea"
                :rows="4"
                v-model="form.introduce"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="行业类别">
              <el-select
                :disabled="disabled"
                v-model="form.industryType"
                style="width:100%"
              >
                <el-option
                  v-for="(v, k) in dicOptions.type"
                  :key="k"
                  :label="v.label"
                  :value="v.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位联系电话">
              <el-input
                :disabled="disabled"
                v-model="form.contactPhone"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="单位联系地址">
              <el-input
                :disabled="disabled"
                v-model="form.contactAddress"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘负责人姓名">
              <el-input
                :disabled="disabled"
                v-model="form.recruitChargeName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘负责人手机">
              <el-input
                :disabled="disabled"
                v-model="form.recruitChargePhone"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘工作人员一姓名">
              <el-input
                :disabled="disabled"
                v-model="form.recruitStaffName1"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘工作人员一手机">
              <el-input
                :disabled="disabled"
                v-model="form.recruitStaffPhone1"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘工作人员二姓名">
              <el-input
                :disabled="disabled"
                v-model="form.recruitStaffName2"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘工作人员二手机">
              <el-input
                :disabled="disabled"
                v-model="form.recruitStaffPhone2"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="title-style">单位招聘信息列表</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="自主招聘" name="first">
          <ttable
            :options="{ loading: loading }"
            :columns="columns"
            :list="list"
          >
            <el-table-column
              width="150"
              slot="salary"
              label="薪酬"
              align="center"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.salaryMax }}-{{ scope.row.salaryMin }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="recruitType" label="招聘类型" align="center">
              <template slot-scope="scope">
                <div v-for="(v, k) in dicOptions.recType" :key="k">
                  <el-tag v-if="v.value == scope.row.recruitType">{{
                    v.label
                  }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              slot="aaa010"
              label="操作"
              align="center"
              width="180"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="openPosition(scope)"
                >
                  详情</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="look(scope)"
                  plain
                  :disabled="!scope.row.resumeCount"
                >
                  简历：{{ scope.row.resumeCount }}</el-button
                >
                <el-popover
                  v-if="scope.row.offShelf != '1'"
                  placement="bottom"
                  width="400"
                  trigger="click"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入下架理由"
                    v-model="scope.row.offReason"
                  >
                  </el-input>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="soldOut(scope, '1')"
                    >确定下架</el-button
                  >
                  <el-button size="mini" slot="reference" type="warning" plain
                    >下架</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </ttable>
          <el-pagination
            @size-change="handleChange"
            @current-change="handleChange"
            :current-page.sync="params.pageIndex"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="params.total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="代理招聘" name="second">
          <ttable
            :options="{ loading: loading2 }"
            :columns="columns2"
            :list="list2"
          >
            <el-table-column
              slot="salary"
              width="150"
              label="薪酬"
              align="center"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.salaryMin }}-{{ scope.row.salaryMax }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="recruitType" label="招聘类型" align="center">
              <template slot-scope="scope">
                <div v-for="(v, k) in dicOptions.recType" :key="k">
                  <el-tag v-if="v.value == scope.row.recruitType">{{
                    v.label
                  }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              slot="aaa010"
              label="操作"
              align="center"
              width="180"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="openPosition(scope)"
                >
                  详情</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="look(scope)"
                  plain
                  :disabled="!scope.row.resumeCount"
                >
                  简历：{{ scope.row.resumeCount }}</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="edit(scope)"
                  plain
                >
                  修改</el-button
                >
                <el-popover
                  v-if="scope.row.offShelf != '1'"
                  placement="bottom"
                  width="400"
                  trigger="click"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入下架理由"
                    v-model="scope.row.offReason"
                  >
                  </el-input>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="soldOut(scope, '2')"
                    >确定下架</el-button
                  >
                  <el-button size="mini" slot="reference" type="warning" plain
                    >下架</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </ttable>
          <el-pagination
            @size-change="handleChange2"
            @current-change="handleChange2"
            :current-page.sync="params2.pageIndex"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="params2.total"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <editmessage
      v-if="visibleEdit"
      :visible="visibleEdit"
      :form="formEdit"
      @onclose="oncloseEdit"
    ></editmessage>
    <querymessage
      v-if="visibleQuery"
      :visible="visibleQuery"
      :form="formQuery"
      @onclose="oncloseQuery"
    ></querymessage>
    <position
      v-if="positionVisible"
      :data="positionData"
      :resVisible="positionVisible"
      :type="0"
      @onclose="positionVisible = false"
    ></position>
  </el-dialog>
</template>

<script>
import { trim } from '@/utils/index';
import {
  unit_query_agency,
  management_edit,
  unit_query_resume,
  unit_out
} from '../api/index';
import ttable from '../../common/t_table';
import editmessage from './message/edit';
import querymessage from './message/query';
import position from './recruitment/position';
export default {
  name: 'messagedetails',
  props: ['visible', 'form'],
  components: { ttable, editmessage, querymessage, position },
  data() {
    return {
      positionData: {},
      positionVisible: false,
      visibleQuery: false,
      formQuery: {},
      visibleEdit: false,
      formEdit: {},
      loading: true,
      loading2: true,
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,

      params2: {
        pageIndex: 1,
        total: 0
      },
      pageSize2: 10,
      activeName: 'first',
      fileList: [],
      disabled: true,
      dicOptions: {
        //行业分类
        type: trim(this.$store.getters['dictionary/recruit_industry_type']),
        //单位性质
        nature: trim(this.$store.getters['dictionary/recruit_corp_nature']),
        //工作性质
        workNature: trim(this.$store.getters['dictionary/recruit_work_nature']),
        //招聘类型
        recType: trim(this.$store.getters['dictionary/recruit_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //工作年限
        year: trim(this.$store.getters['dictionary/recruit_work_year']),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName', width: 150 },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '招聘类型', prop: 'recruitType', slot: 'recruitType' },
        { title: '操作', slot: 'aaa010' }
      ],
      columns2: [
        { title: '序号', type: 'index' },
        { title: '职位名称', prop: 'positionName' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '招聘类型', prop: 'recruitType', slot: 'recruitType' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      list2: []
    };
  },
  computed: {},
  methods: {
    openPosition(e) {
      this.positionData = { ...e.row, topTiele: '详情' };
      this.positionVisible = true;
    },
    handleChange2(e) {
      this.params2.pageIndex = e;
      this.queryAgency();
    },
    handleChange(e) {
      this.params.pageIndex = e;
      this.queryAutonomously();
    },
    look(e) {
      this.formQuery = { ...e.row };
      console.log(this.formQuery);
      this.visibleQuery = true;
    },
    queryAutonomously() {
      let data = { ...this.form };
      //recruitType 招聘类型 1自主 2代理
      data.recruitType = 1;
      //1未审核 2审核通过 3审核不通过 这里默认传2
      data.type = 2;
      data.pageSize = this.pageSize;
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex)) - 1;

      unit_query_agency(
        data,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
            this.loading = false;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    queryAgency() {
      console.log(this.dicOptions.recType);
      let data2 = { ...this.form };
      //recruitType 招聘类型 1自主 2代理
      data2.recruitType = 2;
      data2.type = 2;
      data2.pageSize = this.pageSize2;
      data2.pageIndex = JSON.parse(JSON.stringify(this.params2.pageIndex)) - 1;
      unit_query_agency(
        data2,
        res => {
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list2 = pageresult.data;
            this.params2.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params2.total = pageresult.total;
            this.loading2 = false;
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    edit(e) {
      this.formEdit = { ...e.row };
      this.visibleEdit = true;
    },
    oncloseQuery(type) {
      this.visibleQuery = false;
    },
    oncloseEdit(type) {
      if (type == '1') {
        this.queryAgency(this.dataList);
      }
      this.visibleEdit = false;
    },
    soldOut(scope, type) {
      console.log(scope.row);
      let data = { ...scope.row };
      unit_out(
        data,
        res => {
          if (res.status == 200) {
            document.body.click();
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                //1自主  2代理
                if (type == '1') {
                  this.queryAutonomously();
                } else {
                  this.queryAgency();
                }
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
    alteration() {
      let data = { ...this.form };
      management_edit(
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
    },
    onSubmit() {
      let data = { ...this.form };
      this.$refs.form.validate(valid => {
        if (valid) {
          data.expertJoinDatas = [{ expertId: '0052103001' }];
          // if (!data.meetImageBase64) {
          //   this.$message({
          //     message: '请上传签字记录',
          //     type: 'warning'
          //   });
          //   return;
          // }
          if (this.type == 3) {
            console.log(data);
          } else {
            management_edit(
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
    this.queryAgency();
    this.queryAutonomously();
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
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
