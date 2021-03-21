<template>
  <div>
    <div id="baseResumeInfo" ref="print">
      <!-- <el-button @click="print()">打印</el-button>
      <el-button @click="exportPdf()">导出PDF</el-button> -->
      <div id="baseInfo" class="title-style font-or font-bold">
        基本信息
        <!-- <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="dialog1 = true"
          >编辑</el-button
        > -->
      </div>
      <div class="column">
        <p class="font-size24">
          {{ resume.xm }}
          <span class="sixteen-opacity" v-if="resume.age"
            >{{ resume.age }}岁</span
          >
          <i
            class="el-icon-male sixteen-opacity"
            v-if="resume.sex === '男'"
          ></i>
          <i
            class="el-icon-female sixteen-opacity"
            v-else-if="resume.sex === '女'"
          ></i>
        </p>
        <p class="fourteen-opacity mat-15">
          <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe63d;</i>
            {{ resume.contactPhone }}年毕业</span
          >
          <el-divider direction="vertical"></el-divider>
          <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe641;</i>
            {{ resume.contactPhone }}</span
          >
          <el-divider direction="vertical"></el-divider>
          <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe63f;</i>
            {{ resume.contactPhone }}</span
          >
          <el-divider direction="vertical"></el-divider>
          <span v-if="resume.livingAddress"
            ><i class="icon iconfont">&#xe643;</i>
            {{ resume.livingAddress }}</span
          >
        </p>
      </div>
      <div id="jobIntention" class="title-style font-or font-bold">
        求职意向
        <el-button
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="editCard('dialog1', 1)"
          >编辑</el-button
        >
      </div>
      <div class="column">
        <p class="fourteen-opacity mat-15 bg-gray line40">
          <span class="intention-item"
            ><i class="icon iconfont" v-if="positionNameText">&#xe641;</i>
            {{ positionNameText }}</span
          >
          <span class="intention-item"
            ><i class="icon iconfont" v-if="salaryScope">&#xe644;</i>
            {{ salaryScope }}</span
          >
          <span class="intention-item"
            ><i class="icon iconfont" v-if="positionLikeText">&#xe642;</i>
            {{ positionLikeText }}
          </span>
          <span class="intention-item"
            ><i class="icon iconfont" v-if="workNatureText">&#xe63e;</i>
            {{ workNatureText }}
          </span>
          <span class="intention-item"
            ><i class="icon iconfont" v-if="workAreaText">&#xe643;</i>
            {{ workAreaText }}</span
          >
        </p>
      </div>
      <div id="workExperience" class="title-style font-or font-bold">
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
        <el-card
          class="box-card bg-gray"
          shadow="hover"
          v-for="(workCarditem, index) in resume.laborExp"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span class="font-bold sixteen-opacity">{{
              workCarditem.corpName
            }}</span>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="deleteCard('dialog2', index)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="editCard('dialog2', index)"
            ></el-button>
          </div>

          <el-row>
            <el-col :span="8">
              <p class="fourteen-opacity line40">
                {{ workCarditem.positionName }}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="fourteen-opacity line40">
                {{ workCarditem.positionName }}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="four-opacity line40">
                {{
                  workCarditem.entryDate
                    ? workCarditem.entryDate.substring(0, 4) +
                      '年' +
                      workCarditem.entryDate.substring(4, 6) +
                      '月' +
                      workCarditem.entryDate.substring(6, 8) +
                      '日'
                    : '无'
                }}-{{
                  workCarditem.quitDate
                    ? workCarditem.quitDate.substring(0, 4) +
                      '年' +
                      workCarditem.quitDate.substring(4, 6) +
                      '月' +
                      workCarditem.quitDate.substring(6, 8) +
                      '日'
                    : '至今'
                }}
              </p>
            </el-col>
          </el-row>
          <p class="font14-or line40">工作内容：</p>
          <!-- <p class="fourteen-opacity line30">
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
          </p> -->
          <p
            class="fourteen-opacity line30"
            v-for="(expItem, expIndex) in workExpView[index]"
            :key="expIndex"
          >
            {{ expIndex + 1 }}、{{ expItem }}
          </p>
        </el-card>
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
        <el-card
          class="box-card bg-gray"
          shadow="hover"
          v-for="(eduCarditem, index) in resume.eduExp"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span class="font-bold sixteen-opacity">{{
              eduCarditem.collegesName
            }}</span>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="deleteCard('dialog3', index)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="editCard('dialog3', index)"
            ></el-button>
          </div>

          <el-row>
            <el-col :span="8">
              <p class="fourteen-opacity line40">
                {{ eduCarditem.majorName }}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="fourteen-opacity line40">
                {{ eduCarditem.eduLevel }}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="four-opacity line40">
                {{
                  eduCarditem.admissionDate
                    ? eduCarditem.admissionDate.substring(0, 4) +
                      '年' +
                      eduCarditem.admissionDate.substring(4, 6) +
                      '月' +
                      eduCarditem.admissionDate.substring(6, 8) +
                      '日'
                    : '无'
                }}-{{
                  eduCarditem.graduateDate
                    ? eduCarditem.graduateDate.substring(0, 4) +
                      '年' +
                      eduCarditem.graduateDate.substring(4, 6) +
                      '月' +
                      eduCarditem.graduateDate.substring(6, 8) +
                      '日'
                    : '至今'
                }}
              </p>
            </el-col>
          </el-row>
        </el-card>
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
        <el-tag
          size="medium"
          closable
          v-for="(languageItem, index) in psnlLanguageTags"
          :key="index"
          @close="languageTagClose(index)"
          >{{ languageItem }}
        </el-tag>
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
        <span
          class="tag-card"
          v-for="(skillItem, index) in resume.psnlSkillcert"
          :key="index"
        >
          <el-tag
            class="tag-card-item"
            size="medium"
            closable
            @close="skillTagClose(index)"
            >{{ skillItem.certName }}
            <p>
              <span>{{ skillItem.certLevel }}</span>
              <span>{{ skillItem.receiveTime }}</span>
            </p>
          </el-tag>
        </span>
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
        <!-- <p class="font-fourteen line30 t-indent">
          本人性格内敛、稳重、有活力，待人真诚;工作认真负责，积极主动，能吃苦耐劳，勇于承受压力，勇于创新;有很强的组织能力和团队协作精神，具有较强的适应能力;纪律性强，工作积极配合;意志坚强，具有较强的无私奉献精神。
        </p>
        <p class="font-fourteen line30 t-indent">
          本人是设计专业应届毕业生，熟练手绘，熟悉rhino.photoshop等设计软件，熟练办公软件。我虽还未毕业，但我年轻，意志坚强，有能力完成任何工作。尽管我还缺乏一定的经验，但我会用时间和汗水去弥补。请领导放心，我一定会保质保量完成各项工作任务。
        </p> -->
        <p
          class="font-fourteen line30 t-indent"
          v-for="(item, index) in evaluateView"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <!----------------------->
    <!-- 求职意向 弹窗部分 -->
    <!----------------------->
    <el-dialog
      class="width75"
      :visible.sync="dialog1"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>求职意向
        </p>
      </div>
      <el-form
        class="width70"
        :model="jobIntentionForm"
        ref="jobIntentionForm"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item
          label="意向职位分类"
          prop="positionLike"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="jobIntentionForm.positionLike"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option7"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="意向行业"
          prop="positionName"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="jobIntentionForm.positionName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option8"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="薪酬下线"
              prop="salaryScopeDown"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="jobIntentionForm.salaryScopeDown"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item
              label="薪酬上线"
              prop="salaryScopeUp"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="jobIntentionForm.salaryScopeUp"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="意向工作区域"
          prop="workArea"
          :label-width="formLabelWidth"
        >
          <el-select v-model="jobIntentionForm.workArea" placeholder="请选择">
            <el-option
              v-for="item in dicOptions.option1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="意向工作性质"
          prop="workNature"
          :label-width="formLabelWidth"
        >
          <el-select v-model="jobIntentionForm.workNature" placeholder="请选择">
            <el-option
              v-for="item in dicOptions.option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p class="fourteen-opacity font-or tac line20">
        注：请按岗位真实性、HR反馈速度、面试体验、招聘规范性几方面评价
        <br />个人填写的相关评价，对企业不可见。
      </p>

      <div slot="footer" class="dialog-footer">
        <el-button
          id="dialog1Btn"
          @click="dialogClear('jobIntentionForm')"
          class="white-btn btn-style"
          >还 原</el-button
        >
        <el-button
          type="primary"
          @click="doPositionLike('jobIntentionForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 工作经历 弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog2"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>工作经历
        </p>
      </div>
      <el-form
        class="width70"
        :model="workExperienceForm"
        ref="workExperienceForm"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item
          label="曾任职公司名称"
          prop="corpName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="workExperienceForm.corpName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              class="input-one"
              label="起始时间"
              :label-width="formLabelWidth"
              prop="entryDate"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="workExperienceForm.entryDate"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="input-two"
              label="结束时间"
              :label-width="formLabelWidth"
              prop="quitDate"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="workExperienceForm.quitDate"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="所任职位"
          prop="positionName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="workExperienceForm.positionName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="主要工作内容"
          prop="workDescribe"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（1000字符）"
            v-model="workExperienceForm.workDescribe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          id="dialog2Btn"
          @click="dialogClear('workExperienceForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogSubmit('workExperienceForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 教育经历 弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog3"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>教育经历
        </p>
      </div>
      <el-form
        class="width70"
        :model="educationExperienceForm"
        ref="educationExperienceForm"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item
          label="毕业院校"
          prop="collegesName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="educationExperienceForm.collegesName"
            autocomplete="off"
            placeholder="请输入毕业院校"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          prop="majorName"
          :label-width="formLabelWidth"
        >
        <el-input
            v-model="educationExperienceForm.majorName"
            autocomplete="off"
            placeholder="请输入专业"
          ></el-input>
          <!-- <el-select
            v-model="educationExperienceForm.majorName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item
          label="学历"
          prop="eduLevel"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="educationExperienceForm.eduLevel"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              class="input-one"
              label="入学时间"
              :label-width="formLabelWidth"
              prop="admissionDate"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="educationExperienceForm.admissionDate"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="input-two"
              label="毕业时间"
              :label-width="formLabelWidth"
              prop="graduateDate"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="educationExperienceForm.graduateDate"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          id="dialog3Btn"
          @click="dialogClear('educationExperienceForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogSubmit('educationExperienceForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 外语能力 弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog4"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>外语能力
        </p>
      </div>
      <el-form
        class="width70"
        ref="languageSkillsForm"
        :label-position="labelPosition"
        :model="languageSkillsForm"
        :rules="rules.languageRules"
      >
        <el-form-item
          label="语种"
          :label-width="formLabelWidth"
          prop="languageType"
        >
          <el-select
            v-model="languageSkillsForm.languageType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="等级"
          :label-width="formLabelWidth"
          prop="languageLevel"
        >
          <el-select
            v-model="languageSkillsForm.languageLevel"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option6"
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
          id="dialog4Btn"
          @click="dialogClear('languageSkillsForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogSubmit('languageSkillsForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 技能证书 弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog5"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>技能证书
        </p>
      </div>
      <el-form
        class="width70"
        :model="skillsCertificateForm"
        ref="skillsCertificateForm"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item
          label="证书名称"
          prop="certName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="skillsCertificateForm.certName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="技能等级"
          prop="certLevel"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="skillsCertificateForm.certLevel"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-one"
          label="获得时间"
          :label-width="formLabelWidth"
          prop="receiveTime"
        >
          <el-date-picker
            type="date"
            placeholder="请选择"
            v-model="skillsCertificateForm.receiveTime"
            style="width: 70%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          id="dialog5Btn"
          @click="dialogClear('skillsCertificateForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogSubmit('skillsCertificateForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>

    <!-- 自我评价 弹窗部分 -->
    <el-dialog
      id="selfEvaluationArea"
      :visible.sync="dialog6"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>自我评价
        </p>
      </div>
      <el-form
        class="width70"
        :model="selfEvaluationForm"
        ref="selfEvaluationForm"
        :label-position="labelPosition"
        :rules="rules.selfEvaluationRules"
      >
        <el-form-item prop="evaluate">
          <el-input
            type="textarea"
            placeholder="请输入自我评价内容（1000字符）"
            v-model="selfEvaluationForm.evaluate"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogClear('selfEvaluationForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <el-button
          type="primary"
          @click="dialogSubmit('selfEvaluationForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  // getGzxz,
  // getQx,
  // getLanguageType,
  // getLanguageLevel,
  // getRecruitEdu,
  getPsnlResume
} from '@/api/common';
import {
  getPersonBaseInfo,
  savePositionLike,
  savePsnlEvaluate,
  saveLaborExp,
  saveEduExp,
  saveLanguageLevel,
  saveSkillCert
} from '@/api/personApi';
import { getDicText } from '@/utils/index';
/**
 * 简历信息的基本模板
 */
export default {
  name: 'BaseResumeInfo',
  data() {
    return {
      editStatus: false,
      editItemIdex: 0,
      labelPosition: 'right',
      formLabelWidth: '120px',
      applyForId: '',
      resumeId: '',
      pid: '',
      xm: '',
      age: 0,
      sex: '',
      contactPhone: '',
      livingAddress: '',
      workNature: '',
      positionName: '',
      //salaryScopeUp: '',
      //salaryScopeDown: '',
      workArea: '',
      positionLike: '',
      jobIntentionForm: {
        workNature: '',
        positionName: '',
        workArea: '',
        salaryScopeUp: '',
        salaryScopeDown: '',
        positionLike: ''
      },
      workExperienceForm: {
        expId: '',
        pid: '',
        corpName: '',
        positionName: '',
        entryDate: '',
        quitDate: '',
        workDescribe: ''
      },
      educationExperienceForm: {
        eduId: '',
        pid: '',
        collegesName: '',
        majorName: '',
        eduLevel: '',
        admissionDate: '',
        graduateDate: '',
        sourceOuter: '',
        certNum: ''
      },
      languageSkillsForm: {
        languageId: '',
        pid: '',
        languageType: '',
        languageLevel: ''
      },
      skillsCertificateForm: {
        certId: '',
        pid: '',
        certName: '',
        certLevel: '',
        receiveTime: ''
      },
      selfEvaluationForm: {
        //evaluate: 'hahah！夏尔&#10;\n你好！&#13;再见！'
        evaluate: ''
      },
      rules: {
        languageRules: {
          languageType: [
            { required: true, message: '请选择语种', trigger: 'change' }
          ],
          languageLevel: [
            { required: true, message: '请选择等级', trigger: 'change' }
          ]
        },
        selfEvaluationRules: {
          evaluate: [
            { required: true, message: '个人评价不能为空', trigger: 'blur' },
            { max: 1000, message: '长度不可超过1000个字符', trigger: 'blur' }
          ]
        }
      },
      baseInfoDialog: false,
      dialogFormVisible2: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dicOptions: {
        //区县
        option1: this.$store.getters['dictionary/ggjbxx_qx'],
        //工作性质
        option2: this.$store.getters['dictionary/recruit_work_nature'],
        //专业（暂时没有）
        option3: this.$store.getters['dictionary/ggjbxx_qx'],
        //学历
        option4: this.$store.getters['dictionary/recruit_edu'],
        // 语种
        option5: this.$store.getters['dictionary/recruit_language_type'],
        // 语言等级
        option6: this.$store.getters['dictionary/recruit_language_level'],
        //职位
        option7: this.$store.getters['dictionary/recruit_position_f_type'],
        //行业
        option8: this.$store.getters['dictionary/recruit_position_s_type']
      },
      resume: {
        // applyForId: '',
        // resumeId: '1',
        // pid: '201906186258910',
        // xm: '董晓鑫',
        // age: 24,
        // sex: '男',
        // contactPhone: '13122272095',
        // livingAddress: '宝山淞南镇新梅松南苑11号楼1201',
        // workNature: '01',
        // positionName: '1506'
        // salaryScopeUp: '10000',
        // salaryScopeDown: '50000',
        // workArea: '05',
        // positionLike: '01-04',
        // laborExp: [],
        // eduExp: [],
        // psnlLanguage: [],
        // psnlSkillcert: [],
        // //evaluate: '本人就是搬砖厉害！夏尔&#10;你好！&#13;再见！'
        // evaluate: ''
      }
    };
  },
  computed: {
    workNatureText: function() {
      if (
        this.$store.getters['dictionary/recruit_work_nature'] &&
        this.resume.workNature
      ) {
        return getDicText(
          this.$store.getters['dictionary/recruit_work_nature'],
          'RECRUIT_WORK_NATURE',
          this.resume.workNature
        );
      }
      return this.resume.workNature;
    },
    workAreaText: function() {
      if (this.$store.getters['dictionary/ggjbxx_qx'] && this.resume.workArea) {
        return getDicText(
          this.$store.getters['dictionary/ggjbxx_qx'],
          'GGJBXX_QX',
          this.resume.workArea
        );
      }
      return this.resume.workArea;
    },
    //薪资范围
    salaryScope: function() {
      //return this.resume.salaryScopeUp + '-' + this.resume.salaryScopeDown;
      return this.resume.salaryScope;
    },
    positionLikeText: function() {
      let that = this,
        positionArray = [],
        positionNameArray = [];
      if (that.resume.positionLike) {
        positionArray = that.resume.positionLike.split('-');
      } else {
        return;
      }
      if (that.$store.getters['dictionary/recruit_position_f_type']) {
        positionNameArray = positionArray.map(function(val) {
          let _dic = that.$store.getters[
            'dictionary/recruit_position_f_type'
          ].find(function(i) {
            return i.value === val;
          });
          return _dic ? _dic.label : '';
        });
      }
      return positionNameArray.join('-');
    },
    positionNameText: function() {
      let that = this;
      if (this.$store.getters['dictionary/recruit_position_s_type']) {
        let _dic = this.$store.getters[
          'dictionary/recruit_position_s_type'
        ].find(function(i) {
          return i.value === that.resume.positionName;
        });
        return _dic ? _dic.label : '';
      }
      return this.resume.positionName;
    },
    //组合成语言技能tags
    psnlLanguageTags: function() {
      if (this.resume.psnlLanguage && this.resume.psnlLanguage.length) {
        return this.resume.psnlLanguage.map(obj => {
          let newObj = [];
          let _obj1 = this.dicOptions.option5.find(item => {
            return item.value === obj.languageType;
          });
          let _obj2 = this.dicOptions.option6.find(item => {
            return item.value === obj.languageLevel;
          });
          if (_obj1 || _obj2) {
            newObj = _obj1.label + _obj2.label;
          }
          return newObj;
        });
      } else {
        return [];
      }
    },
    evaluateView: function() {
      if (this.selfEvaluationForm.evaluate)
        return this.selfEvaluationForm.evaluate.split('\n');
      else {
        return [];
      }
    },
    workExpView: function() {
      if (this.resume.laborExp.length) {
        return this.resume.laborExp.map(function(itme) {
          return itme.workDescribe.split('\n');
        });
      } else {
        return [];
      }
    }
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
    //删除技能证书tag
    tagClose(val) {
      this.$message(val);
    },
    //删除外语能力tag
    languageTagClose(index) {
      this.$confirm('确认删除此项外语能力？')
        .then(() => {
          // TODO
          this.$delete(this.resume.psnlLanguage, index);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除技能证书tag
    skillTagClose(index) {
      this.$confirm('确认删除此项技能证书？')
        .then(() => {
          // TODO
          this.$delete(this.resume.psnlSkillcert, index);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始化加载个人基本信息
    async getPersonInfo() {
      try {
        let result = await getPersonBaseInfo({
          pid: this.$store.getters['person/pid'] || ''
        });
        console.log('result', result);
        if (result.status === 200)
          this.$set(this, 'personInfo', result.result.data);
      } catch (error) {
        console.log(error);
      }
    },
    //初始化加载个人简历信息
    loadPsnlResume() {
      let that = this;
      getPsnlResume({ pid: this.$store.getters['person/pid'] } || '')
        .then(function(res) {
          console.log('个人简历信息', res);
          if (res.status == 200) {
            that.$set(that, 'resume', res.result.data);
          }
        })
        .catch(function(err) {
          that.$message({
            message: '缺失简历信息' + err,
            type: 'error'
          });
        });
    },
    loadDicData() {
      // let that = this;
      // Promise.all([
      //   getQx(),
      //   getGzxz(),
      //   getRecruitEdu(),
      //   getLanguageType(),
      //   getLanguageLevel()
      // ])
      //   .then(function(results) {
      //     that.$set(that.dicOptions, 'option1', results[0].dicData);
      //     that.$set(that.dicOptions, 'option2', results[1].dicData);
      //     //that.$set(that.dicOptions, 'option3', results[2].dicData);
      //     that.$set(that.dicOptions, 'option4', results[2].dicData);
      //     that.$set(that.dicOptions, 'option5', results[3].dicData);
      //     that.$set(that.dicOptions, 'option6', results[4].dicData);
      //   })
      //   .catch(function(err) {
      //     this.$message({
      //       message: '缺失字典信息' + err,
      //       type: 'error'
      //     });
      //   });
    },
    dialogSubmit(formName) {
      if (formName === 'selfEvaluationForm') {
        //console.log(this.$refs[formName].model.evaluate.length);
        this.savePsnlEvaluate();
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          // TODO 保存数据
          switch (formName) {
            case 'workExperienceForm':
              if (
                this.resume.laborExp.find(
                  element =>
                    element.corpName === this.workExperienceForm.corpName
                )
              ) {
                this.$message({
                  type: 'warning',
                  message: '此工作经历已经添加过！'
                });
                return;
              }
              saveLaborExp(this.$refs[formName].model)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'error',
                      message: '保存成功'
                    });
                    this.resume.laborExp.push(this.$refs[formName].model);
                  } else {
                    this.$message({
                      type: 'error',
                      message: '保存失败'
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '系统异常，保存失败'
                  });
                });
              break;

            case 'educationExperienceForm':
              this.dialog3 = false;
              if (
                this.editStatus ||
                this.resume.eduExp.find(
                  element =>
                    element.collegesName ===
                    this.educationExperienceForm.collegesName
                )
              ) {
                this.editStatus
                  ? (this.resume.eduExp[this.editItemIdex] = JSON.parse(
                      JSON.stringify(this.$refs[formName].model)
                    ))
                  : this.$message({
                      type: 'warning',
                      message: '此教育经历已经添加过！'
                    });
                return;
              }
              saveEduExp(this.$refs[formName].model)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'error',
                      message: '保存成功'
                    });
                    this.resume.eduExp.push(this.$refs[formName].model);
                  } else {
                    this.$message({
                      type: 'error',
                      message: '保存失败'
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '系统异常，保存失败'
                  });
                });

              break;

            case 'languageSkillsForm':
              if (
                this.resume.psnlLanguage.find(
                  element =>
                    element.languageType ===
                    this.languageSkillsForm.languageType
                )
              ) {
                this.$message({
                  type: 'warning',
                  message: '此语种已经添加过！'
                });
                return;
              }
              saveLanguageLevel(this.$refs[formName].model)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'error',
                      message: '保存成功'
                    });
                    this.resume.psnlLanguage.push(this.$refs[formName].model);
                  } else {
                    this.$message({
                      type: 'error',
                      message: '保存失败'
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '系统异常，保存失败'
                  });
                });
              break;

            case 'skillsCertificateForm':
              if (
                this.resume.psnlSkillcert.find(
                  element =>
                    element.certName === this.skillsCertificateForm.certName
                )
              ) {
                this.$message({
                  type: 'warning',
                  message: '此技能证书已经添加过！'
                });
                return;
              }
              saveSkillCert(this.$refs[formName].model)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'error',
                      message: '保存成功'
                    });
                    this.resume.psnlSkillcert.push(this.$refs[formName].model);
                  } else {
                    this.$message({
                      type: 'error',
                      message: '保存失败'
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '系统异常，保存失败'
                  });
                });
              break;
          }
        }
      });
    },
    dialogClear(formName) {
      //清空弹出框
      this.$refs[formName].resetFields();
    },
    editCard(dialog, index) {
      if (dialog) {
        switch (dialog) {
          case 'dialog1':
            this.dialog1 = true;
            //$("#dialog1Btn").children('span').html('还 原');
            this.jobIntentionForm = {
              contactPhone: this.resume.contactPhone,
              livingAddress: this.resume.livingAddress,
              positionName: this.resume.positionName,
              positionLike: this.resume.positionLike
                ? this.resume.positionLike.split('-')
                : [],
              workNature: this.resume.workNature,
              workArea: this.resume.workArea,
              salaryScopeDown: this.resume.salaryScope
                ? this.resume.salaryScope.split('-')[0]
                : '',
              salaryScopeUp: this.resume.salaryScope
                ? this.resume.salaryScope.split('-').length === 2
                  ? this.resume.salaryScope.split('-')[1]
                  : ''
                : ''
            };
            break;
          case 'dialog2':
            this.dialog2 = true;
            $('#dialog2Btn')
              .children('span')
              .html('还 原');
            this.workExperienceForm = JSON.parse(
              JSON.stringify(this.resume.laborExp[index])
            );
            break;
          case 'dialog3':
            this.dialog3 = true;
            $('#dialog3Btn')
              .children('span')
              .html('还 原');
            this.educationExperienceForm = JSON.parse(
              JSON.stringify(this.resume.eduExp[index])
            );
            break;
        }
        //标记成"编辑"状态
        this.editStatus = true;
        this.editItemIdex = index;
      }
    },
    deleteCard(dialog, index) {
      if (dialog) {
        switch (dialog) {
          case 'dialog2':
            this.$confirm('确认删除此项工作经历？')
              .then(() => {
                // TODO
                this.$delete(this.resume.laborExp, index);
              })
              .catch(err => {
                console.log(err);
              });
            break;
          case 'dialog3':
            this.$confirm('确认删除此项教育经历？')
              .then(() => {
                // TODO
                this.$delete(this.resume.eduExp, index);
              })
              .catch(err => {
                console.log(err);
              });
            break;
        }
      }
    },
    handleClose(done) {
      done();
      this.editStatus = false;
      this.editItemIdex = 0;
      $('#dialog2Btn')
        .children('span')
        .html('清 空');
      $('#dialog3Btn')
        .children('span')
        .html('清 空');
    },
    async savePsnlEvaluate() {
      let saveResult = await savePsnlEvaluate({
        pid: this.$store.getters['person/pid'],
        content: this.selfEvaluationForm.evaluate
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '系统异常，保存失败'
        });
        return;
      });
      if (saveResult.status === 200) {
        this.$message({
          type: 'success',
          message: '个人描述保存成功'
        });
      }
    },
    async doPositionLike(formName) {
      let that = this;
      that.dialogFormVisible = false;
      console.log(this[formName]);
      let saveResult = await savePositionLike(that.$refs[formName].model).catch(
        err => {
          that.$message({
            type: 'error',
            message: '系统异常，保存失败'
          });
        }
      );
      if (saveResult.status === 200) {
        // TODO
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.resume.workNature = this.jobIntentionForm.workNature;
        this.resume.positionName = this.jobIntentionForm.positionName;
        this.resume.workArea = this.jobIntentionForm.workArea;
        this.resume.salaryScopeUp = this.jobIntentionForm.salaryScopeUp;
        this.resume.salaryScopeDown = this.jobIntentionForm.salaryScopeDown;
        this.resume.positionLike = this.jobIntentionForm.positionLike
          ? this.jobIntentionForm.positionLike.join('-')
          : '';
      } else {
        this.$message({
          type: 'error',
          message: '保存失败'
        });
      }
    }
  },
  created() {
    //初始化加载个人简历基本信息
    this.loadPsnlResume();
  }
};
</script>

<style lang="scss" scoped>
#baseResumeInfo {
  .intention-item {
    margin-right: 20px;
  }
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
    padding: 20px 120px 40px 25px;
    box-sizing: border-box;
    .el-tag {
      background-color: #f6f6f6;
      border-color: #f6f6f6;
      color: rgba(0, 0, 0, 0.8);
      margin: 5px;
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
  .box-card {
    ::v-deep .el-card__header {
      padding: 10px 20px;
      span {
        line-height: 32px;
      }
      button {
        float: right;
        padding: 8px;
      }
      button:last-child {
        margin-right: 20px;
      }
    }
    ::v-deep .el-card__body {
      padding: 10px 20px;
    }
    &:hover {
      background-color: #ffffff;
      border: 1px solid #fc6f3d;
      .card-btn {
        visibility: visible;
      }
    }
  }
  .tag-card {
    height: 70px;
    position: relative;
    background-color: #f6f6f6;
    border-color: #f6f6f6;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 15px;
    .tag-card-item {
      font-size: 14px;
      p {
        margin: 10px 0 0;
        font-size: 12px;
        color: #999;
        span:first-child {
          margin-right: 20px;
        }
        span:last-child {
          float: right;
        }
      }
      ::v-deep i {
        position: absolute;
        top: 2px;
        right: 0;
      }
    }
  }
}
.hidden {
  visibility: hidden;
}
.pup-btn {
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  background: #f7f7f7;
  left: 0;
  padding: 5px 0;
  z-index: 2;
  border-bottom: 1px solid #e6e6e6;
  .pup-tit {
    text-align: left;
    font-size: 14px;
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
