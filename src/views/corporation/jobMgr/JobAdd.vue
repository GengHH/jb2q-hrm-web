<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-06 16:29:28
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobAdd.vue
-->
<template>
  <!--S demo2职位管理右侧内容部分 -->
  <div class="shadow-left">
    <!--S 公共标题部分 -->
    <div class="title-style">
      发布职位
    </div>
    <!--E 公共标题部分 -->

    <!--S 发布职位内容部分 -->
    <el-form
      :model="jobForm"
      :label-position="labelPosition"
      :rules="rules"
      ref="jobForm"
      label-width="0px"
      class="inside-infor clearfix"
    >
      <el-col :span="12">
        <el-form-item prop="positionName" required>
          <pl-input
            required
            v-model="jobForm.positionName"
            label="职位名称"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="isHumanResourceReg">
        <el-form-item prop="agencyRecruit">
          <pl-select
            required
            v-model="jobForm.agencyRecruit"
            label="是否属于中介代招"
            :optionData="dicData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="isHumanResourceReg">
        <el-form-item prop="entrustCorpName">
          <pl-input
            required
            v-model="jobForm.entrustCorpName"
            label="委托代招单位"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="positionType" required>
          <pl-select
            v-model="jobForm.positionType"
            label="职位分类"
            :optionData="dicZyflData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="radio-group" prop="workNature" required>
          <el-radio-group v-model="jobForm.workNature" size="medium">
            <el-radio-button label="01">全职</el-radio-button>
            <el-radio-button label="02">兼职</el-radio-button>
            <el-radio-button label="03">就业见习</el-radio-button>
          </el-radio-group> </el-form-item
        ><span class="radio-group-label"
          >（<span class="requiredSymbol">*</span>工作性质）</span
        >
      </el-col>
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" prop="ageMin" required>
            <pl-input
              required
              v-model.number="jobForm.ageMin"
              label="年龄下限"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" prop="ageMax" required>
            <pl-input
              required
              v-model.number="jobForm.ageMax"
              label="年龄上限"
            ></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12" class="clearfix">
        <el-form-item class="input-one" prop="workArea" required>
          <pl-select
            required
            v-model="jobForm.workArea"
            label="工作区域"
            :optionData="dicGzqyData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input-two" prop="workStreetList">
          <el-select
            required
            multiple
            v-model="jobForm.workStreetList"
            label="工作街镇"
            :optionData="dicStreet"
            class="w-select"
          >
            <el-option
              v-for="item in dicStreet"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="workAddress" required>
          <pl-input
            required
            v-model="jobForm.workAddress"
            label="工作详细地址"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="workHour">
          <pl-select
            v-model="jobForm.workHour"
            label="工作班时"
            :optionData="dicBsData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <pl-select
            v-model="jobForm.salaryPayType"
            label="工资支付方式"
            :optionData="dicZffsData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item class="radio-group" prop="workYearNeed" required>
          <el-radio-group v-model="jobForm.workYearNeed" size="medium">
            <el-radio-button label="01">无需求</el-radio-button>
            <el-radio-button label="02">1年以下</el-radio-button>
            <el-radio-button label="03">1~2年</el-radio-button>
            <el-radio-button label="04">3~5年</el-radio-button>
            <el-radio-button label="05">6~9年</el-radio-button>
            <el-radio-button label="06">10年以上</el-radio-button>
          </el-radio-group>
          <span class="radio-group-label"
            >（<span class="requiredSymbol">*</span>工作年限要求）</span
          >
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="eduRequir" required>
          <pl-select
            v-model="jobForm.eduRequir"
            label="学历要求"
            :optionData="dicXlData"
            class="w-select"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-col :span="12" class="row-input-one">
          <el-form-item class="input-one" prop="salaryMin" required>
            <pl-input
              required
              v-model.number="jobForm.salaryMin"
              @change="minSalaryChange"
              label="薪酬下限"
            ></pl-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="row-input-two">
          <el-form-item class="input-two" prop="salaryMax" required>
            <pl-input
              required
              v-model.number="jobForm.salaryMax"
              @change="maxSalaryChange"
              label="薪酬上限"
            ></pl-input>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="recruitNum" required>
          <pl-input
            required
            v-model.number="jobForm.recruitNum"
            label="招聘人数"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="specialList">
          <pl-select
            multiple
            v-model="jobForm.specialList"
            label="招聘特定人群"
            class="w-select"
            :optionData="dicTdrqData"
          >
          </pl-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="describe" required>
          <pl-input
            required
            id="jobTextarea"
            type="textarea"
            label="职位描述（1000字符）"
            v-model="jobForm.describe"
          ></pl-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          class="radio-group"
          prop="recruitType"
          :rules="isPublic ? rules.recruitType : []"
        >
          <el-radio-group v-model="jobForm.recruitType" size="medium">
            <el-radio-button label="1">自主招聘</el-radio-button>
            <el-radio-button label="2">代理招聘</el-radio-button>
          </el-radio-group>
          <span class="radio-group-label"
            >（<span v-if="isPublic" class="requiredSymbol">*</span
            >招聘类型）</span
          >
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="date-picker" prop="publicDate">
          <pl-date-picker
            v-model="jobForm.publicDate"
            type="date"
            value-format="yyyyMMdd"
            label="发布截止日期"
            :required="isPublic"
            :picker-options="expireTimeOption"
          >
          </pl-date-picker>
        </el-form-item>
      </el-col>
    </el-form>

    <!--E 发布职位内容部分 -->

    <!-- S demo4按钮部分 -->
    <div id="demo4" class="form-btns">
      <el-button class="white-btn btn-style" @click="dialogClear"
        >清空重置</el-button
      >
      <pl-button class="brown-btn btn-style" @click="savePosition($event)"
        >保存</pl-button
      >
      <pl-button class="orange-btn btn-style" @click="releasePosition($event)"
        >发布</pl-button
      >
    </div>
  </div>
  <!-- E demo4按钮部分 -->
</template>

<script>
/**
 * 发布职位
 */
import { savePosition, releasePosition } from '@/api/corporationApi';
import { salaryPattern, agePattern } from '@/utils/regexp';
import { overDateSomeDays } from '@/utils';
export default {
  name: 'JobAdd',
  data() {
    return {
      visible: false,
      labelPosition: 'right',
      isPublic: false,
      rules: {
        corpId: '',
        positionName: [
          {
            required: true,
            message: '请输入职位名称',
            trigger: ['blur', 'change']
          }
        ],
        //entrustTyshxym: '',
        //tranBaseSymbol: '',
        //agencyRecruit: '',
        entrustCorpName: '',
        positionType: [
          {
            required: true,
            message: '请选择职位分类',
            trigger: ['blur', 'change']
          }
        ],
        workNature: [
          {
            required: true,
            message: '请选择工作性质',
            trigger: ['blur', 'change']
          }
        ],
        workArea: [
          {
            required: true,
            message: '请选择工作区域',
            trigger: ['blur', 'change']
          }
        ],
        workAddress: [
          {
            required: true,
            message: '请输入工作详细地址',
            trigger: ['blur', 'change']
          }
        ],
        workStreetList: [
          {
            required: true,
            message: '请选择工作街镇',
            trigger: ['blur']
          }
        ],
        workYearNeed: [
          {
            required: true,
            message: '请选择工作年限要求',
            trigger: ['blur', 'change']
          }
        ],
        eduRequir: [
          {
            required: true,
            message: '请选择学历要求',
            trigger: ['blur', 'change']
          }
        ],
        // salaryPayType: [
        //   {
        //     required: true,
        //     message: '请选择工资支付方式',
        //     trigger: 'blur'
        //   }
        // ],
        //specialList: '',
        describe: [
          {
            required: true,
            message: '请输职位描述',
            trigger: ['blur', 'change']
          },
          { max: 1000, message: '不得超过1000字符', trigger: 'blur' }
        ],
        ageMin: [
          {
            required: true,
            message: '请输入年龄下限',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: agePattern,
            message: '年龄介于16-150周岁',
            trigger: 'blur'
          }
        ],
        ageMax: [
          {
            required: true,
            message: '请输入年龄下限',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: agePattern,
            message: '年龄介于16-150周岁',
            trigger: 'blur'
          }
        ],
        salaryMin: [
          {
            required: true,
            message: '薪酬下限不能为空',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字' },
          {
            pattern: salaryPattern,
            message: '月薪介于1000和99999',
            trigger: 'blur'
          }
        ],
        salaryMax: [
          {
            required: true,
            message: '薪酬上限不能为空',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字' },
          {
            pattern: salaryPattern,
            message: '月薪介于1000和99999',
            trigger: 'blur'
          }
        ],
        recruitNum: [
          {
            required: true,
            message: '请输入招聘人数',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
          {
            pattern: /^\d{1,3}$/,
            message: '最高不超过999人',
            trigger: 'blur'
          }
        ],
        recruitType: [
          {
            required: true,
            message: '请选择招聘类型',
            trigger: ['blur', 'change']
          }
        ]
      },
      jobForm: {
        editId: '',
        positionName: '',
        recruitType: '',
        tranBaseSymbol: '',
        agencyRecruit: '',
        entrustTyshxym: '',
        entrustCorpName: '',
        corpId: '',
        positionType: '',
        workNature: '',
        ageMax: '',
        ageMin: '',
        workArea: '',
        workAddress: '',
        workStreetList: [],
        workHour: '',
        workYearNeed: '',
        eduRequir: '',
        salaryMax: '',
        salaryMin: '',
        salaryPayType: '',
        recruitNum: '',
        specialList: [],
        describe: '',
        opWay: '',
        publicDate: ''
      },
      dicGzqyData: this.$store.getters['dictionary/ggjbxx_qx'],
      //dicGzjzData: this.$store.getters['dictionary/ggjbxx_street'],
      dicBsData: this.$store.getters['dictionary/recruit_work_hour'],
      dicTdrqData: this.$store.getters['dictionary/recruit_special_people'],
      dicZyflData: this.$store.getters['dictionary/recruit_position_f_type'],
      dicData: this.$store.getters['dictionary/yesno'],
      dicXlData: this.$store.getters['dictionary/recruit_edu'],
      dicZffsData: this.$store.getters['dictionary/recruit_salary_pay_type'],
      isHumanResourceReg: this.$store.getters['corporation/human_resource_reg'],
      dicStreet: [],
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      }
    };
  },
  created() {
    //this.getData();
    console.log(this.$route.query);
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      //! TODO根据url上的参数查询职位信息
      this.$alert('此功能暂未实现，缺少查询编辑职位的Api');
    }
  },
  watch: {
    'jobForm.workArea': function() {
      let that = this;
      if (this.$store.getters['dictionary/ggjbxx_street']) {
        let array = this.$store.getters['dictionary/ggjbxx_street'];
        let newArray = []; //查找符合条件值并存入新数组
        let exist = false;
        for (let i in array) {
          if (array[i].filter === that.jobForm.workArea) {
            newArray[newArray.length] = array[i];
          }
        }
        for (let s in newArray) {
          if (newArray[s].value === that.jobForm.workStreetList) {
            exist = true;
          }
        }
        if (!exist) {
          that.jobForm.workStreetList = [];
        }
        that.dicStreet = newArray;
      }
      that.jobForm.workStreetList = [];
    }
    // dicStreet: function() {
    //   let that = this;
    //   if (this.$store.getters['dictionary/ggjbxx_street']) {
    //     let array = this.$store.getters['dictionary/ggjbxx_street'];
    //     let newArray = []; //查找符合条件值并存入新数组
    //     let exist = false;
    //     for (let i in array) {
    //       if (array[i].filter === that.jobForm.workArea) {
    //         newArray[newArray.length] = array[i];
    //       }
    //     }
    //     for (let s in newArray) {
    //       if (newArray[s].value === that.jobForm.workStreetList) {
    //         exist = true;
    //       }
    //     }
    //     if (!exist) {
    //       that.jobForm.workStreetList = [];
    //     }
    //     return newArray;
    //   }
    //   that.jobForm.workStreetList = [];
    //   return [];
    // }
  },
  methods: {
    elForm() {},
    getData() {
      // var xjobForm = {
      //   editId: '',
      //   positionName: '职位名称',
      //   recruitType: '1',
      //   tranBaseSymbol: '0',
      //   agencyRecruit: '0',
      //   entrustTyshxym: '',
      //   entrustCorpName: '',
      //   corpId: '1',
      //   positionType: '1',
      //   workNature: '1',
      //   ageMax: 50,
      //   ageMin: 18,
      //   workArea: '01',
      //   workAddress: '工作详细地址',
      //   workStreetList: '',
      //   workHour: '1',
      //   workYearNeed: '1',
      //   eduRequir: '1',
      //   salaryMax: '9000',
      //   salaryMin: '5000',
      //   salaryPayType: '',
      //   recruitNum: 4,
      //   specialList: '1',
      //   describe: '职位描述',
      //   opWay: 'save'
      // };
      // this.$set(this, 'jobForm', xjobForm);
    },
    minSalaryChange() {
      if (!this.jobForm.salaryMin) {
        return;
      }
      // if (isNaN(Number(this.jobForm.salaryMin))) {
      //   this.$alert('请输入数字');
      //   this.jobForm.salaryMin = '';
      // } else
      if (
        this.jobForm.salaryMax &&
        this.jobForm.salaryMin > this.jobForm.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.jobForm.salaryMin = '';
      } else if (
        this.jobForm.salaryMax &&
        this.jobForm.salaryMin * 3 < this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobForm.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (!this.jobForm.salaryMax) {
        return;
      }
      // if (isNaN(Number(this.jobForm.salaryMax))) {
      //   this.$alert('请输入数字');
      //   this.jobForm.salaryMax = '';
      // } else
      if (
        this.jobForm.salaryMin &&
        this.jobForm.salaryMin > this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.jobForm.salaryMin = '';
      } else if (
        this.jobForm.salaryMin &&
        this.jobForm.salaryMin * 3 < this.jobForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobForm.salaryMax = '';
      }
    },
    dialogClear() {
      //清空弹出框
      this.isPublic = false;
      this.$refs.jobForm.resetFields();
    },
    savePosition(done) {
      this.isPublic = false;
      this.$refs.jobForm.validate(async valid => {
        if (valid) {
          this.jobForm.opWay = 'save';
          let saveResult = await savePosition(this.jobForm).catch(() => {
            done();
          });
          if (saveResult && saveResult.status === 200) {
            this.$message({ type: 'success', message: '保存成功' });
          } else if (saveResult) {
            this.$message({ type: 'error', message: '保存失败' });
          }
        }
      });
      done();
    },
    releasePosition(done) {
      this.isPublic = true;
      if (overDateSomeDays(this.jobForm.publicDate, 30)) {
        this.$message({
          type: 'error',
          message: '发布日期不得超过当前日期30天'
        });
      } else {
        this.$refs.jobForm.validate(async valid => {
          if (valid) {
            if (!this.jobForm.publicDate) {
              this.$message({ type: 'error', message: '发布日期不能为空' });
            } else if (overDateSomeDays(this.jobForm.publicDate, 30)) {
              this.$message({
                type: 'error',
                message: '发布日期不得超过当前日期30天'
              });
            } else {
              this.jobForm.opWay = 'release';
              let publicResult = await releasePosition(this.jobForm).catch(
                () => {
                  done();
                }
              );
              if (publicResult && publicResult.status === 200) {
                this.$message({ type: 'success', message: '发布成功' });
              } else if (publicResult) {
                this.$message({ type: 'error', message: '发布失败' });
              }
            }
          }
        });
      }
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow-left {
  background-color: #ffffff;
  //box-shadow: rgba(0, 0, 0, 0.1) -5px 0 5px -5px;
  //padding-right: 50px;
  .el-col {
    min-height: 80px;
  }
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
  .inside-infor {
    margin-top: 20px;
  }
  .el-select {
    width: 100%;
  }
  .date-picker {
    width: 100%;
  }
  .row-input-one {
    padding-left: 0 !important;
  }
  .row-input-two {
    padding-right: 0 !important;
  }
  .el-textarea {
    height: 100px;
  }
  .radio-group {
    display: inline-block;
  }
  .radio-group-label {
    font-size: 14px;
    color: #acacac;
  }
}
#jobTextarea {
  //min-height: 100px !important;
  height: 100% !important;
}
.form-btns {
  text-align: center;
  padding: 40px 0;
}
::v-deep textarea {
  min-height: 150px !important;
}
</style>
