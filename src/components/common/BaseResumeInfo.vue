<template>
  <div>
    <div id="baseResumeInfo" ref="print">
      <!-- <el-button @click="print()">打印</el-button>
      <el-button @click="exportPdf()">导出PDF</el-button> -->
      <div id="baseInfo" class="title-style font-or font-bold">
        基本信息
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="dialog1 = true"
          >编辑</el-button
        >
      </div>
      <div class="column">
        <p class="font-size24">
          李子七 <span class="sixteen-opacity">26岁</span>
          <i class="el-icon-male sixteen-opacity"></i>
        </p>
        <p class="fourteen-opacity mat-15">
          <span><i class="icon iconfont">&#xe63d;</i> 2018年毕业</span>
          <el-divider direction="vertical"></el-divider>
          <span><i class="icon iconfont">&#xe641;</i> 本科学历</span>
          <el-divider direction="vertical"></el-divider>
          <span><i class="icon iconfont">&#xe63f;</i> 13282189989</span>
          <el-divider direction="vertical"></el-divider>
          <span
            ><i class="icon iconfont">&#xe643;</i>
            上海市静安区某某街道18号</span
          >
        </p>
      </div>
      <div id="selfEvaluation" class="title-style font-or font-bold">
        求职意向
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="dialog1 = true"
          >编辑</el-button
        >
      </div>
      <div class="column">
        <p class="fourteen-opacity mat-15 bg-gray line40">
          <span><i class="icon iconfont">&#xe63d;</i> UI设计师</span>
          <span><i class="icon iconfont">&#xe641;</i> 8k-15k</span>
          <span
            ><i class="icon iconfont">&#xe63f;</i>
            互联网-计算机软件-计算机多媒体服务-电子商务...
          </span>
          <span><i class="icon iconfont">&#xe643;</i> 上海</span>
        </p>
      </div>
      <div id="selfEvaluation" class="title-style font-or font-bold">
        工作经历
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog2 = true"
          >添加</el-button
        >
      </div>
      <div class="column">
        <el-row>
          <el-col :span="8">
            <p class="sixteen-opacity font-bold line40">万达信息股份有限公司</p>
          </el-col>
          <el-col :span="16">
            <p class="four-opacity line40">2018年9月-2020年6月</p>
          </el-col>
          <el-col :span="8">
            <p class="fourteen-opacity line40">社保事业部</p>
          </el-col>
          <el-col :span="16">
            <p class="fourteen-opacity line40">IOS开发工程师</p>
          </el-col>
        </el-row>
        <p class="font14-or line40">工作内容：</p>
        <p class="fourteen-opacity line30">
          1、负责iOS平台下的APP应用开发、整体构架设计；
        </p>
        <p class="fourteen-opacity line30">
          2、根据公司产品策略，开发iOS平台上的应用程序
        </p>
        <p class="fourteen-opacity line30">
          3、负责iOS平台上的技术攻关，确保开发质量；
        </p>
        <p class="fourteen-opacity line30">
          4、负责根据产品需求完成模块设计、编码、编码集成工作；
        </p>
        <p class="fourteen-opacity line30">
          5、根据开发过程中的体验对产品提出改进意见。
        </p>
      </div>
      <div id="educationExperience" class="title-style font-or font-bold">
        教育经历
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog3 = true"
          >添加</el-button
        >
      </div>
      <div class="column">
        <el-row class="bg-gray">
          <el-col :span="8">
            <p class="sixteen-opacity font-bold line40">重庆大学城市科技学院</p>
          </el-col>
          <el-col :span="16">
            <p class="four-opacity line40">2018年9月-2020年6月</p>
          </el-col>
          <el-col :span="8">
            <p class="fourteen-opacity line40">互联网多媒体</p>
          </el-col>
          <el-col :span="16">
            <p class="fourteen-opacity line40">研究生</p>
          </el-col>
        </el-row>
        <el-row class="bg-gray">
          <el-col :span="8">
            <p class="sixteen-opacity font-bold line40">重庆大学城市科技学院</p>
          </el-col>
          <el-col :span="16">
            <p class="four-opacity line40">2018年9月-2020年6月</p>
          </el-col>
          <el-col :span="8">
            <p class="fourteen-opacity line40">计算机</p>
          </el-col>
          <el-col :span="16">
            <p class="fourteen-opacity line40">本科</p>
          </el-col>
        </el-row>
      </div>
      <div id="languageSkills" class="title-style font-or font-bold">
        外语能力
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog4 = true"
          >添加</el-button
        >
      </div>
      <div class="column">
        <el-tag size="medium" closable>大学英语四级</el-tag>
        <el-tag size="medium" closable>俄语专业四级</el-tag>
        <el-tag size="medium" closable>TEF法语A1级</el-tag>
      </div>
      <div id="skillsCertificate" class="title-style font-or font-bold">
        技能证书
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog5 = true"
          >添加</el-button
        >
      </div>
      <div class="column">
        <el-tag size="medium" closable @close="handleClose('1234')"
          >信息系统项目管理师证书</el-tag
        >
        <el-tag size="medium" closable>信息系统项目管理师证书</el-tag>
        <el-tag size="medium" closable>CISP注册信息安全专业人员</el-tag>
        <el-tag size="medium" closable>信息系统项目管理师证书</el-tag>
        <el-tag size="medium" closable>信息系统项目管理师证书</el-tag>
        <el-tag size="medium" closable>信息系统项目管理师证书</el-tag>
        <el-tag size="medium" closable>信息系统项目管理师证书</el-tag>
      </div>
      <div id="selfEvaluation" class="title-style font-or font-bold">
        自我评价
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="dialog6 = true"
          >编辑</el-button
        >
      </div>
      <div class="column">
        <p class="font-fourteen line30 t-indent">
          本人性格内敛、稳重、有活力，待人真诚;工作认真负责，积极主动，能吃苦耐劳，勇于承受压力，勇于创新;有很强的组织能力和团队协作精神，具有较强的适应能力;纪律性强，工作积极配合;意志坚强，具有较强的无私奉献精神。
        </p>
        <p class="font-fourteen line30 t-indent">
          本人是设计专业应届毕业生，熟练手绘，熟悉rhino.photoshop等设计软件，熟练办公软件。我虽还未毕业，但我年轻，意志坚强，有能力完成任何工作。尽管我还缺乏一定的经验，但我会用时间和汗水去弥补。请领导放心，我一定会保质保量完成各项工作任务。
        </p>
      </div>
    </div>
    <!----------------------->
    <!-- 求职意向 弹窗部分 -->
    <el-dialog class="width75" :visible.sync="dialog1">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>求职意向
        </p>
      </div>
      <el-form
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="万达信息股份有限公司"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="IOS开发工程师"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="评价星级" :label-width="formLabelWidth">
          <el-rate v-model="value"></el-rate>
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入（1000字符）"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="评价人" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="评价时间" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder=""
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="fourteen-opacity font-or tac line20">
        注：请按岗位真实性、HR反馈速度、面试体验、招聘规范性几方面评价
        <br />个人填写的相关评价，对企业不可见。
      </p>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >发布评价</el-button
        >
      </div>
    </el-dialog>

    <!-- 工作经历 弹窗部分 -->
    <el-dialog class="width75" :visible.sync="dialog2">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>工作经历
        </p>
      </div>
      <el-form
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="曾任职公司名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-one"
          label="起始时间"
          :label-width="formLabelWidth"
          prop="date1"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="input-two" label="结束时间" prop="date2">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date2"
            style="width: 70%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="所任职位" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="主要工作内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入（1000字符）"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 教育经历 弹窗部分 -->
    <el-dialog class="width75" :visible.sync="dialog3">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>教育经历
        </p>
      </div>
      <el-form
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="毕业院校" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 外语能力 弹窗部分 -->
    <el-dialog class="width75" :visible.sync="dialog4">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>外语能力
        </p>
      </div>
      <el-form
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="语种" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="等级" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 技能证书 弹窗部分 -->
    <el-dialog class="width75" :visible.sync="dialog5">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>技能证书
        </p>
      </div>
      <el-form
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="证书名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="技能等级" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-one"
          label="获得时间"
          :label-width="formLabelWidth"
          prop="date1"
        >
          <el-date-picker
            type="date"
            placeholder="请选择"
            v-model="ruleForm.date1"
            style="width: 70%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 自我评价 弹窗部分 -->
    <el-dialog :visible.sync="dialog6">
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>自我评价
        </p>
      </div>
      <el-form
        id="selfEvaluationArea"
        class="width70"
        :model="form"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入自我评价内容（1000字符）"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 简历信息的基本模板
 */
export default {
  name: 'BaseResumeInfo',
  data() {
    return {
      value: 0,
      labelPosition: 'right',
      rules: {},
      ruleForm: {
        keyword: '',
        ages: '',
        unit: '',
        name: '',
        life: '',
        edu: '',
        date1: '2020-01-01',
        date2: '',
        delivery: false,
        type: []
      },
      baseInfoDialog: false,
      dialogFormVisible2: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    };
  },
  methods: {
    print() {
      // 打印
      this.$print(this.$refs.print);
    },
    exportPdf() {
      // 下载
      window.scrollTo(0, 0);
      let htmlTitle = '简历';
      let elements = document.getElementById('baseResumeInfo');
      this.getPdf(htmlTitle, elements);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //handleSizeChange(val) {},
    //handleCurrentChange(val) {},
    handleClose(val) {
      this.$message(val);
    }
  }
};
</script>

<style lang="scss" scoped>
#baseResumeInfo {
  .el-button--edit {
    color: #fc7a43;
    border: 1px solid #fc7a43;
    padding: 6px 20px;
    border-radius: 13px;
    float: right;
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
  .column {
    padding: 25px 120px 5px 20px;
    box-sizing: border-box;
    .el-tag {
      background-color: #f6f6f6;
      border-color: #f6f6f6;
      color: rgba(0, 0, 0, 0.8);
    }
    .el-icon-close {
      margin: 0 10px 15px 0;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  .font-size24 {
    font-size: 24px;
  }
  .fourteen-opacity {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
  .bg-gray {
    background: #f7f7f7;
    margin-top: 16px;
  }
  .mat-15 {
    margin-top: 15px;
  }
  .line30 {
    line-height: 30px;
  }
  .line40 {
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .t-indent {
    text-indent: 2em;
  }
}
.pup-btn {
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  background: #f7f7f7;
  left: 0;
  padding: 10px 0;
  z-index: 2;
  border-bottom: 1px solid #e6e6e6;
  .pup-tit {
    text-align: left;
    font-size: 16px;
    color: #fc6f3d;
    font-weight: bold;
    padding: 0 20px;
    line-height: 30px;
    i {
      margin-right: 6px;
    }
  }
}

#selfEvaluationArea {
  ::v-deep .el-form-item__content {
    margin-left: 0px !important;
    height: 300px;
    .el-textarea {
      height: 100%;
      textarea {
        height: 100%;
      }
    }
  }
}
::v-deep .el-date-editor,
::v-deep .el-select {
  width: 100% !important;
}
</style>
