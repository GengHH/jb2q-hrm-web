<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div id="baseResumeInfo" ref="print">
      <!-- <el-button @click="print()">打印</el-button>
      <el-button @click="exportPdf()">导出PDF</el-button> -->
      <div
        id="baseInfo"
        class="title-style font-or font-bold"
        v-if="notConstResume"
      >
        基本信息
        <span style="color: #fc6f3d;font-weight: 500;"
          >（可点击
          <i style="color:#35e835" class="el-icon-edit-outline"></i>
          修改“工作年限”、“最高学历”）</span
        >
      </div>
      <div id="baseInfo" class="title-style font-or font-bold" v-else>
        基本信息
        <!-- <el-button
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="dialog1 = true"
          >编辑</el-button
        > -->
      </div>

      <!-- 私密信息不完全显示 -->
      <div class="column" v-if="secrecy">
        <p class="font-size24">
          {{ resume.xm ? resume.xm.substr(0, 1) + '**' : '' }}
          <span class="sixteen-opacity">{{ resume.age }}岁</span>
          <span class="sixteen-opacity">{{ resume.sex }}</span>
          <!-- <i
            class="el-icon-male sixteen-opacity"
            v-if="resume.sex === '男'"
          ></i>
          <i
            class="el-icon-female sixteen-opacity"
            v-else-if="resume.sex === '女'"
          ></i> -->
          <span class="sixteen-opacity" style="margin: 0 10px;"
            >工作年限
            <span
              v-if="
                resume.workYear !== null &&
                  resume.workYear !== undefined &&
                  resume.workYear !== ''
              "
            >
              {{ resume.workYear }}
            </span>
            <span v-else>?</span>
            年
            <!-- <i class="el-icon-edit-outline" @click=""></i> -->
            <el-popover
              v-if="notConstResume"
              placement="right"
              width="100"
              trigger="hover"
              @show="openPop"
              @hide="hidePop"
            >
              <el-input-number
                v-model="workYear"
                :min="0"
                :max="100"
                size="mini"
                label="描述文字"
              ></el-input-number>
              <!-- <el-button slot="reference">click 激活</el-button> -->
              <i
                slot="reference"
                style="color:#35e835"
                class="el-icon-edit-outline"
              ></i>
            </el-popover>
          </span>
        </p>
        <p class="fourteen-opacity mat-15">
          <!-- <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe63d;</i>
            {{ resume.contactPhone }}年毕业</span
          >
          <el-divider direction="vertical"></el-divider> -->
          <span v-if="resume.eduLevel"
            ><i class="icon iconfont">&#xe641;</i> {{ highEduLevel }}</span
          >
          <el-divider direction="vertical"></el-divider>
          <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe63f;</i>
            {{ resume.contactPhone.substr(0, 3) + '********' }}</span
          >
          <el-divider direction="vertical"></el-divider>
          <span v-if="resume.livingAddress"
            ><i class="icon iconfont">&#xe643;</i> ******</span
          >
        </p>
      </div>

      <!-- 私密信息完全显示 -->
      <div class="column" v-else>
        <p class="font-size24">
          {{ resume.xm }}
          <span class="sixteen-opacity" v-if="resume.age"
            >{{ resume.age }}岁</span
          >
          <span class="sixteen-opacity">{{ resume.sex }}</span>
          <!-- <i
            class="el-icon-male sixteen-opacity"
            v-if="resume.sex === '男'"
          ></i>
          <i
            class="el-icon-female sixteen-opacity"
            v-else-if="resume.sex === '女'"
          ></i> -->
          <span class="sixteen-opacity"
            >工作年限
            <span
              v-if="
                resume.workYear !== null &&
                  resume.workYear !== undefined &&
                  resume.workYear !== ''
              "
            >
              {{ resume.workYear }}
            </span>
            <span v-else>?</span>
            <span>
              年
            </span>
            <el-popover
              v-if="notConstResume"
              placement="right"
              width="100"
              trigger="hover"
              @show="openPop"
              @hide="hidePop"
            >
              <el-input-number
                v-model="workYear"
                :min="0"
                :max="100"
                size="mini"
                label="描述文字"
              ></el-input-number>
              <!-- <el-button slot="reference">click 激活</el-button> -->
              <i
                slot="reference"
                style="color:#35e835"
                class="el-icon-edit-outline"
              ></i>
            </el-popover>
          </span>
        </p>
        <p class="fourteen-opacity mat-15">
          <!-- <span v-if="resume.contactPhone"
            ><i class="icon iconfont">&#xe63d;</i>
            {{ resume.contactPhone }}年毕业</span
          >
          <el-divider direction="vertical"></el-divider> -->

          <span
            v-if="
              resume.eduLevel !== null &&
                resume.eduLevel !== undefined &&
                resume.eduLevel !== ''
            "
            title="最高学历"
          >
            <i class="icon iconfont">&#xe641;</i>{{ highEduLevel }}
          </span>
          <span v-else title="最高学历"
            ><i class="icon iconfont">&#xe641;</i>?</span
          >
          <el-popover
            v-if="notConstResume"
            placement="right"
            width="200"
            trigger="click"
          >
            <el-select v-model="selectHighEdu" placeholder="请选择最高学历">
              <el-option
                v-for="item in dicOptions.option4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <i
              slot="reference"
              style="color:#35e835"
              class="el-icon-edit-outline"
            ></i>
          </el-popover>
          <!-- <span v-if="resume.eduLevel" 
            ><i class="icon iconfont">&#xe641;</i>
            {{ highEduLevel }}</span
          > -->
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
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="editCard('dialog1', 1)"
          >编辑</el-button
        >
      </div>
      <div class="column">
        <p class="fourteen-opacity mat-15 bg-gray line40">
          <span class="intention-item" v-if="industryLikeText"
            ><i class="icon iconfont">&#xe641;</i> {{ industryLikeText }}</span
          >
          <span class="intention-item" v-if="salaryScope && salaryScope !== '-'"
            ><i class="icon iconfont">&#xe644;</i> {{ salaryScope }}</span
          >
          <span class="intention-item" v-if="positionLikeText"
            ><i class="icon iconfont">&#xe642;</i>
            {{ positionLikeText }}
          </span>
          <span class="intention-item" v-if="workNatureText"
            ><i class="icon iconfont">&#xe63e;</i>
            {{ workNatureText }}
          </span>
          <span class="intention-item" v-if="workAreaText"
            ><i class="icon iconfont">&#xe643;</i> {{ workAreaText }}</span
          >
        </p>
      </div>
      <div id="workExperience" class="title-style font-or font-bold">
        工作经历
        <el-button
          v-if="notConstResume"
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
              v-if="notConstResume"
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="deleteCard('dialog2', index, workCarditem.expId)"
            ></el-button>
            <el-button
              v-if="notConstResume"
              type="primary"
              icon="el-icon-edit"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="editCard('dialog2', index)"
            ></el-button>
          </div>

          <el-row>
            <!-- <el-col :span="8">
              <p class="fourteen-opacity line40">
                {{ workCarditem.positionName }}
              </p>
            </el-col> -->
            <el-col :span="12">
              <p class="fourteen-opacity line40">
                {{ workCarditem.positionName }}
              </p>
            </el-col>
            <el-col :span="12">
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
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog3 = true"
          >添加</el-button
        >
        <el-divider
          v-if="notConstResume"
          class="vertical-divider"
          direction="vertical"
        ></el-divider>
        <!-- 学信网  -->
        <el-popover
          v-if="notConstResume"
          placement="left"
          width="700"
          @show="openEduPop"
          trigger="click"
        >
          <el-table
            ref="multipleEduTable"
            :data="eduTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              prop="collegesName"
              label="大学名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="入学日期" width="120">
              <template slot-scope="scope">{{
                scope.row.admissionDate
              }}</template>
            </el-table-column>
            <el-table-column label="毕业日期" width="120">
              <template slot-scope="scope">{{
                scope.row.graduateDate
              }}</template>
            </el-table-column>
            <el-table-column
              prop="majorName"
              label="专业"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="eduLevel" label="学历" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <el-button id="selectEudBtn" size="small" @click="addEduFromChsi()"
            >确认选择</el-button
          >
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <el-button
            class="tab-btn"
            type="edit"
            icon="el-icon-circle-plus-outline"
            slot="reference"
            >从学信网查询添加</el-button
          >
        </el-popover>
      </div>
      <div class="column">
        <!-- 一行显示一条 -->
        <el-card
          class="box-card bg-gray"
          shadow="hover"
          v-for="(eduCarditem, index) in eduExpTransformed1"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span class="font-bold sixteen-opacity">{{
              eduCarditem.collegesName
            }}</span>
            <el-button
              v-if="notConstResume"
              type="danger"
              icon="el-icon-delete"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="deleteCard('dialog3', index, eduCarditem.eduId)"
            ></el-button>
            <!-- 来自于学信网的数据不能进行编辑 -->
            <el-button
              v-if="notConstResume && eduCarditem.sourceOuter !== '1'"
              type="primary"
              icon="el-icon-edit"
              circle
              style="float: right;"
              class="card-btn hidden"
              @click="editCard('dialog3', index, '1')"
            ></el-button>
          </div>

          <el-row>
            <el-col :span="6">
              <p class="fourteen-opacity line40">
                {{ eduCarditem.majorName ? eduCarditem.majorName : '无' }}
              </p>
            </el-col>
            <el-col :span="4">
              <p class="fourteen-opacity line40">
                {{ eduCarditem.eduLevelText }}
              </p>
            </el-col>
            <el-col :span="10">
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
            <el-col :span="4">
              <p class="fourteen-opacity line40">
                {{ eduCarditem.sourceOuter === '1' ? '来自学信网' : '' }}
              </p>
            </el-col>
          </el-row>
        </el-card>
        <!-- 一行显示两条 -->
        <el-row :gutter="20">
          <el-col
            :span="12"
            v-for="(eduCarditem, index) in eduExpTransformed2"
            :key="index"
          >
            <el-card class="box-card bg-gray" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="font-bold sixteen-opacity">{{
                  eduCarditem.collegesName
                }}</span>
                <el-button
                  v-if="notConstResume"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  style="float: right;"
                  class="card-btn hidden"
                  @click="deleteCard('dialog3', index, eduCarditem.eduId)"
                ></el-button>
                <!-- 来自于学信网的数据不能进行编辑 -->
                <el-button
                  v-if="notConstResume && eduCarditem.sourceOuter !== '1'"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  style="float: right;"
                  class="card-btn hidden"
                  @click="editCard('dialog3', index, '2')"
                ></el-button>
              </div>

              <el-row>
                <el-col :span="12">
                  <p class="fourteen-opacity line40">
                    {{ eduCarditem.majorName ? eduCarditem.majorName : '无' }}
                  </p>
                </el-col>
                <el-col :span="12" style="text-align:right;">
                  <p class="fourteen-opacity line40">
                    {{ eduCarditem.eduLevelText }}
                  </p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
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
                <el-col :span="6" style="text-align:right;">
                  <p class="fourteen-opacity line40">
                    {{ eduCarditem.sourceOuter === '1' ? '来自学信网' : '' }}
                  </p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div id="languageSkills" class="title-style font-or font-bold">
        外语能力
        <el-button
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="addLanguageSkills"
          >添加</el-button
        >
      </div>
      <div class="column">
        <el-tag
          size="medium"
          :closable="notConstResume"
          v-for="(languageItem, index) in psnlLanguageTags"
          :key="index"
          @close="languageTagClose(index, languageItem.languageId)"
          >{{ languageItem.text }}
        </el-tag>
      </div>
      <div id="skillsCertificate" class="title-style font-or font-bold">
        技能证书
        <el-button
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-circle-plus-outline"
          @click="dialog5 = true"
          >添加</el-button
        >
        <el-divider
          v-if="notConstResume"
          class="vertical-divider"
          direction="vertical"
        ></el-divider>
        <!-- 鉴定内网  -->
        <el-popover
          v-if="notConstResume"
          placement="left"
          width="700"
          @show="openSkillPop"
          trigger="click"
        >
          <el-table
            ref="multipleSkillTable"
            :data="skillTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              prop="certId"
              label="证书编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="certName"
              label="证书名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="certLevel"
              label="证书等级"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="认证日期" width="120">
              <template slot-scope="scope">{{
                scope.row.receiveTime
              }}</template>
            </el-table-column>
          </el-table>
          <el-button id="selectSkillBtn" size="small" @click="addSkillFromJd()"
            >确认选择</el-button
          >
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <el-button
            class="tab-btn"
            type="edit"
            icon="el-icon-circle-plus-outline"
            slot="reference"
            >从已获取证书中添加</el-button
          >
        </el-popover>
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
            :closable="notConstResume"
            @close="skillTagClose(index, skillItem.certId)"
            >{{ skillItem.certName }}
            <p>
              <span v-if="skillItem.sourceOuter === '1'" class="type-label"
                >认证</span
              >
              <span>{{ skillItem.certLevel }}</span>
              <span>{{ skillItem.receiveTime }}</span>
            </p>
          </el-tag>
        </span>
      </div>
      <div id="selfEvaluation" class="title-style font-or font-bold">
        自我评价
        <el-button
          v-if="notConstResume"
          class="tab-btn"
          type="edit"
          icon="el-icon-edit"
          @click="editCard('dialog6', 1)"
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
        :rules="rules.positionsLikeRules"
      >
        <el-form-item
          label="意向职位分类"
          prop="positionLike"
          :label-width="formLabelWidth"
        >
          <el-select
            filterable
            v-model="jobIntentionForm.positionLike"
            multiple
            placeholder="请选择"
            style="width:100%"
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
          prop="industryLike"
          :label-width="formLabelWidth"
        >
          <el-select
            filterable
            v-model="jobIntentionForm.industryLike"
            multiple
            placeholder="请选择"
            style="width:100%"
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
              label="薪酬下限"
              prop="salaryMin"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model.number="jobIntentionForm.salaryMin"
                autocomplete="off"
                @change="minSalaryChange"
                style="width:100%"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item
              label="薪酬上限"
              prop="salaryMax"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model.number="jobIntentionForm.salaryMax"
                autocomplete="off"
                @change="maxSalaryChange"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="意向工作区域"
          prop="workArea"
          :label-width="formLabelWidth"
        >
          <el-select
            filterable
            clearable
            v-model="jobIntentionForm.workArea"
            placeholder="请选择"
            style="width:100%"
          >
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
          <el-select
            filterable
            v-model="jobIntentionForm.workNature"
            placeholder="请选择"
            style="width:100%"
          >
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
        :rules="rules.workExperienceRules"
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
                style="width:100%"
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
                style="width:100%"
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
        :rules="rules.educationExperienceRules"
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
          label="学历"
          prop="eduLevel"
          :label-width="formLabelWidth"
        >
          <el-select
            filterable
            v-model="educationExperienceForm.eduLevel"
            placeholder="请选择"
            style="width:100%"
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
        <el-form-item
          label="专业"
          prop="majorName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="educationExperienceForm.majorName"
            autocomplete="off"
            placeholder="请输入专业"
            :disabled="majorNameDisabled"
          ></el-input>
          <!-- <el-select
          filterable 
            v-model="educationExperienceForm.majorName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dicOptions.option3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> 
          </el-select> -->
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
                style="width:100%"
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
                style="width:100%"
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
            filterable
            v-model="languageSkillsForm.languageType"
            placeholder="请选择"
            style="width:100%"
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
            filterable
            v-model="languageSkillsForm.languageLevel"
            placeholder="请选择"
            style="width:100%"
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
        :rules="rules.skillsCertificateRules"
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
            style="width:100%"
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
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="input-one"
          label="获得时间"
          :label-width="formLabelWidth"
          prop="receiveTime"
        >
          <el-date-picker
            type="month"
            placeholder="请选择"
            v-model="skillsCertificateForm.receiveTime"
            value-format="yyyyMM"
            style="width: 100%;"
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
          >还 原</el-button
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
import { getPsnlResume, getEduExpFromChsi, getCertInfo } from '@/api/common';
import { getPsnlResumeByCorp } from '@/api/corporationApi';
import {
  getPersonBaseInfo,
  savePositionLike,
  savePsnlEvaluate,
  saveLaborExp,
  saveEduExp,
  saveLanguageLevel,
  saveSkillCert,
  deleteSomeResume,
  saveWorkYear
} from '@/api/personApi';
import { getDicText } from '@/utils/index';
/**
 * 简历信息的基本模板
 */
export default {
  name: 'BaseResumeInfo',
  props: {
    secrecy: {
      type: Boolean,
      default: false
    },
    queryPid: {
      type: String,
      default: ''
    },
    searchByCorp: {
      type: Boolean,
      default: false
    },
    resumeData: {
      type: Object,
      //default: () => {}
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      editStatus: false,
      editItemIdex: 0,
      labelPosition: 'right',
      formLabelWidth: '150px',
      applyForId: '',
      resumeId: '',
      workYear: 0,
      pid: this.$store.getters['person/pid'],
      // xm: '',
      // age: 0,
      // sex: '',
      // contactPhone: '',
      // livingAddress: '',
      // workNature: '',
      // positionName: '',
      //salaryMax: '',
      //salaryMin: '',
      //workArea: '',
      //positionLike: '',
      jobIntentionForm: {
        workNature: '',
        industryLike: [],
        workArea: '',
        salaryMax: '',
        salaryMin: '',
        positionLike: []
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
        sourceOuter: '0',
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
        positionsLikeRules: {
          positionLike: [
            { required: true, message: '请选择职位类型', trigger: 'blur' }
          ],
          industryLike: [
            { required: true, message: '请输入意向行业', trigger: 'blur' }
            // { max: 80, message: '长度不可超过80个字符', trigger: 'blur' }
          ],
          workArea: [
            // { required: true, message: '请输入意向工作区域', trigger: 'blur' }
          ],
          workNature: [
            { required: true, message: '请输入意向工作性质', trigger: 'blur' }
          ],
          salaryMin: [
            {
              required: true,
              message: '薪酬下限不能为空',
              trigger: 'blur'
            },
            { type: 'number', message: '请输入数字' },
            {
              pattern: /^\d{4,5}$/,
              message: '月薪介于1000和99999',
              trigger: 'blur'
            }
          ],
          salaryMax: [
            {
              required: true,
              message: '薪酬上限不能为空',
              trigger: 'blur'
            },
            { type: 'number', message: '请输入数字' },
            {
              pattern: /^\d{4,5}$/,
              message: '月薪介于1000和99999',
              trigger: 'blur'
            }
          ]
        },
        workExperienceRules: {
          corpName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' },
            { max: 80, message: '长度不可超过80个字符', trigger: 'blur' }
          ],
          entryDate: [
            { required: true, message: '请输入起始时间', trigger: 'blur' }
          ],
          quitDate: [
            { required: true, message: '请输入结束时间', trigger: 'blur' }
          ],
          positionName: [
            { required: true, message: '请输入所任职位', trigger: 'blur' },
            { max: 80, message: '长度不可超过80个字符', trigger: 'blur' }
          ],
          workDescribe: [
            { required: true, message: '请输入主要工作内容', trigger: 'blur' },
            { max: 1000, message: '长度不可超过1000个字符', trigger: 'blur' }
          ]
        },
        educationExperienceRules: {
          collegesName: [
            { required: true, message: '请输入毕业院校', trigger: 'blur' },
            { max: 100, message: '长度不可超过100个字符', trigger: 'blur' }
          ],
          majorName: [
            { required: true, message: '请输入专业', trigger: 'blur' },
            { max: 400, message: '长度不可超过400个字符', trigger: 'blur' }
          ],
          eduLevel: [
            { required: true, message: '请输入学历', trigger: 'blur' },
            { max: 1000, message: '长度不可超过1000个字符', trigger: 'blur' }
          ],
          admissionDate: [
            { required: true, message: '请输入入学时间', trigger: 'blur' }
          ],
          graduateDate: [
            { required: true, message: '请输入毕业时间', trigger: 'blur' }
          ]
        },
        skillsCertificateRules: {
          certName: [
            { required: true, message: '请输入证书名称', trigger: 'blur' },
            { max: 80, message: '长度不可超过80个字符', trigger: 'blur' }
          ],
          certLevel: [
            { required: true, message: '请输入技能等级', trigger: 'blur' },
            { max: 100, message: '长度不可超过100个字符', trigger: 'blur' }
          ],
          receiveTime: [
            { required: true, message: '请输入获得时间', trigger: 'blur' }
          ]
        },
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
        //职位（级）
        option7: this.$store.getters['dictionary/recruit_position_s_type'],
        //行业
        option8: this.$store.getters['dictionary/recruit_industry_type']
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
        // salaryMax: '10000',
        // salaryMin: '50000',
        // workArea: '05',
        // positionLike: '01-04',
        // laborExp: [],
        // eduExp: [],
        // psnlLanguage: [],
        // psnlSkillcert: [],
        // //evaluate: '本人就是搬砖厉害！夏尔&#10;你好！&#13;再见！'
        // evaluate: '',
        // workYear:0,
        // eduId:''
      },
      eduTableData: [],
      multipleSelection: [],
      skillTableData: [],
      multipleSelection2: [],
      eduExp1: [],
      eduExp2: [],
      majorNameDisabled: false
    };
  },
  computed: {
    // 判断是不是不能修改的情况
    notConstResume: function() {
      return JSON.stringify(this.resumeData) == '{}' && !this.queryPid;
    },
    workNatureText: function() {
      if (
        this.$store.getters['dictionary/recruit_work_nature'] &&
        this.resume.workNature
      ) {
        return getDicText(
          this.$store.getters['dictionary/recruit_work_nature'],
          this.resume.workNature
        );
      }
      return this.resume.workNature;
    },
    workAreaText: function() {
      if (this.$store.getters['dictionary/ggjbxx_qx'] && this.resume.workArea) {
        return getDicText(
          this.$store.getters['dictionary/ggjbxx_qx'],
          this.resume.workArea
        );
      }
      return this.resume.workArea;
    },
    //薪资范围
    salaryScope: function() {
      //return this.resume.salaryMax + '-' + this.resume.salaryMin;
      return this.resume.salaryScope;
    },

    positionLikeArray: function() {
      return this.resume.positionLike
        ? this.resume.positionLike.split('-')
        : [];
    },
    industryLikeArray: function() {
      return this.resume.industryLike
        ? this.resume.industryLike.split('-')
        : [];
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
      if (that.$store.getters['dictionary/recruit_position_s_type']) {
        positionNameArray = positionArray.map(function(val) {
          let _dic = that.$store.getters[
            'dictionary/recruit_position_s_type'
          ].find(function(i) {
            return i.value === val;
          });
          return _dic ? _dic.label : '';
        });
      }
      return positionNameArray.join(' - ');
    },
    industryLikeText: function() {
      let that = this;
      if (this.$store.getters['dictionary/recruit_industry_type']) {
        let _dic = this.$store.getters['dictionary/recruit_industry_type'].find(
          function(i) {
            return i.value === that.resume.industryLike;
          }
        );
        return _dic ? _dic.label : '';
      }
      return this.resume.industryLike;
    },
    //组合成语言技能tags
    psnlLanguageTags: function() {
      if (this.resume.psnlLanguage && this.resume.psnlLanguage.length) {
        return this.resume.psnlLanguage.map(obj => {
          //let newObj = {};
          let textStr = '';
          let _obj1 = this.dicOptions.option5.find(item => {
            return item.value === obj.languageType;
          });
          let _obj2 = this.dicOptions.option6.find(item => {
            return item.value === obj.languageLevel;
          });
          if (_obj1 || _obj2) {
            textStr = _obj1.label + _obj2.label;
          }
          return { languageId: obj.languageId, text: textStr };
        });
      } else {
        return [];
      }
    },
    evaluateView: function() {
      if (this.resume.evaluate) return this.resume.evaluate.split('\n');
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
    },
    /**
     * 将学历（教育经历）字典转成文字
     */
    eduExpTransformed() {
      let dictionary = this.$store.getters['dictionary/recruit_edu'];
      return this.resume.eduExp
        ? this.resume.eduExp.map(item => {
            let dic = dictionary.find(i => {
              return i.value === item.eduLevel;
            });
            item.eduLevelText = dic ? dic.label : item.eduLevel;
            return item;
          })
        : [];
    },
    eduExpTransformed1() {
      let dictionary = this.$store.getters['dictionary/recruit_edu'];
      return this.eduExp1
        ? this.eduExp1.map(item => {
            let dic = dictionary.find(i => {
              return i.value === item.eduLevel;
            });
            item.eduLevelText = dic ? dic.label : item.eduLevel;
            return item;
          })
        : [];
    },
    eduExpTransformed2() {
      let dictionary = this.$store.getters['dictionary/recruit_edu'];
      return this.eduExp2
        ? this.eduExp2.map(item => {
            let dic = dictionary.find(i => {
              return i.value === item.eduLevel;
            });
            item.eduLevelText = dic ? dic.label : item.eduLevel;
            return item;
          })
        : [];
    },
    /**
     * 将最高学历字典转成文字
     */
    highEduLevel() {
      let dictionary = this.$store.getters['dictionary/recruit_edu'];
      let dic = dictionary.find(i => {
        return i.value === this.resume.eduLevel;
      });
      return dic ? dic.label : this.resume.eduLevel;
    },
    selectHighEdu: {
      get: function() {
        return this.resume.eduLevel;
      },
      set: function(v) {
        this.markHighEdu(v);
      }
    }
  },
  updated() {
    // 更新滚动条样式
    if (
      !this.dialog1 &&
      !this.dialog2 &&
      !this.dialog3 &&
      !this.dialog4 &&
      !this.dialog5 &&
      !this.dialog6
    ) {
      this.resizeScroll();
    }
  },
  methods: {
    resizeScroll: _.throttle(function() {
      $('#indexApp')
        .getNiceScroll()
        .resize();
    }, 2000),
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
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    //handleSizeChange(val) {},
    //handleCurrentChange(val) {},
    //删除技能证书tag
    tagClose(val) {
      this.$message(val);
    },
    //删除外语能力tag
    languageTagClose(index, languageId) {
      this.$confirm('确认删除此项外语能力？')
        .then(async () => {
          let deleteResult = await deleteSomeResume('language/' + languageId);
          if (deleteResult.status == 200) {
            this.$delete(this.resume.psnlLanguage, index);
          } else {
            this.$message({ type: 'error', message: '删除失败' });
          }
        })
        .catch(() => {
          //this.$message({ type: 'error', message: '系统异常，删除失败' });
        });
    },
    //删除技能证书tag
    skillTagClose(index, certId) {
      this.$confirm('确认删除此项技能证书？')
        .then(async () => {
          let deleteResult = await deleteSomeResume('skillCert /' + certId);
          if (deleteResult.status == 200) {
            this.$delete(this.resume.psnlSkillcert, index);
          } else {
            this.$message({ type: 'error', message: '删除失败' });
          }
        })
        .catch(() => {
          //this.$message({ type: 'error', message: '系统异常，删除失败' });
        });
    },
    //初始化加载个人基本信息
    // async getPersonInfo() {
    //   try {
    //     let result = await getPersonBaseInfo({
    //       pid: this.$store.getters['person/pid'] || ''
    //     });
    //     console.log('result', result);
    //     if (result.status === 200)
    //       this.$set(this, 'personInfo', result.result.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    //初始化加载个人简历信息
    loadPsnlResume() {
      let that = this;
      if (!this.$store.getters['person/pid'] && !this.queryPid) {
        console.log('缺少个人标识');
        return;
      }
      // 默认先按照传入的pid查询，再按照登录的人员查询
      if (this.searchByCorp) {
        this.loading = true;
        console.log(
          '%c 🍪 new date(): ',
          'font-size:20px;background-color: #ED9EC7;color:#fff;',
          new date()
        );
        getPsnlResumeByCorp({
          pid: this.queryPid || this.$store.getters['person/pid'],
          cid: this.$store.getters['corporation/cid'] || ''
        })
          .then(function(res) {
            console.log('个人简历信息', res);
            if (res.status == 200) {
              that.$set(that, 'resume', res.result.data);
            }
            that.loading = false;
            console.log(
              '%c 🍪 new date(): ',
              'font-size:20px;background-color: #ED9EC7;color:#fff;',
              new date()
            );
          })
          .catch(function(err) {
            that.$message({
              message: '缺失简历信息' + err,
              type: 'error'
            });
            that.loading = false;
          });
      } else {
        this.loading = true;
        getPsnlResume(
          { pid: this.queryPid || this.$store.getters['person/pid'] } || ''
        )
          .then(function(res) {
            console.log('个人简历信息', res);
            if (res.status == 200) {
              that.$set(that, 'resume', res.result.data);
            }
            that.loading = false;
          })
          .catch(function(err) {
            that.$message({
              message: '缺失简历信息' + err,
              type: 'error'
            });
            that.loading = false;
          });
      }
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
    // 保存各个弹出框中的内容
    dialogSubmit(formName) {
      //保存各模块录入的信息
      if (formName === 'selfEvaluationForm') {
        //console.log(this.$refs[formName].model.evaluate.length);
        this.savePsnlEvaluate();
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.$refs[formName].model;
          params.pid = this.$store.getters['person/pid'];
          switch (formName) {
            case 'workExperienceForm':
              if (
                !this.editStatus &&
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
              saveLaborExp(params)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    //this.resume.laborExp.push(params);
                    this.loadPsnlResume();
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
              this.dialog2 = false;
              this.editStatus = false;
              break;

            case 'educationExperienceForm':
              if (
                !this.editStatus &&
                this.resume.eduExp.find(
                  element =>
                    element.collegesName ===
                      this.educationExperienceForm.collegesName &&
                    element.sourceOuter !== '1'
                )
              ) {
                this.$message({
                  type: 'warning',
                  message: '此教育经历已经添加过！'
                });
                return;
              }
              saveEduExp({ eduExpList: [params] })
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    //this.resume.eduExp.push(params);
                    this.loadPsnlResume();
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
              this.dialog3 = false;
              this.editStatus = false;
              break;

            case 'languageSkillsForm':
              if (
                !this.editStatus &&
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
              saveLanguageLevel(params)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    //this.resume.psnlLanguage.push(params);
                    this.loadPsnlResume();
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
              this.dialog4 = false;
              this.editStatus = false;
              break;

            case 'skillsCertificateForm':
              if (
                !this.editStatus &&
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
              saveSkillCert({ certList: [params] })
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    //this.resume.psnlSkillcert.push(params);
                    this.loadPsnlResume();
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
              this.dialog5 = false;
              this.editStatus = false;
              break;
          }
        }
      });
    },
    dialogClear(formName) {
      //清空弹出框
      this.$refs[formName].resetFields();
    },
    editCard(dialog, index, type) {
      let _orginData = {};
      if (dialog) {
        switch (dialog) {
          case 'dialog1':
            this.dialog1 = true;
            //$("#dialog1Btn").children('span').html('还 原');
            $.extend(true, _orginData, this.resume);
            this.jobIntentionForm = {
              contactPhone: _orginData.contactPhone,
              livingAddress: _orginData.livingAddress,
              // industryLike: _orginData.industryLike,
              industryLike: this.industryLikeArray,
              // positionLike: _orginData.positionLike
              //   ? _orginData.positionLike.split('-')
              //   : [],
              positionLike: this.positionLikeArray,
              workNature: _orginData.workNature,
              workArea: _orginData.workArea,
              salaryMin: _orginData.salaryScope
                ? Number(_orginData.salaryScope.split('-')[0])
                : 0,
              salaryMax: _orginData.salaryScope
                ? _orginData.salaryScope.split('-').length === 2
                  ? Number(_orginData.salaryScope.split('-')[1])
                  : 0
                : 0
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
            // this.educationExperienceForm = JSON.parse(
            //   JSON.stringify(this.resume.eduExp[index])
            // );
            if (type === '1') {
              this.educationExperienceForm = JSON.parse(
                JSON.stringify(this.eduExp1[index])
              );
            } else {
              this.educationExperienceForm = JSON.parse(
                JSON.stringify(this.eduExp2[index])
              );
            }
            break;
          case 'dialog6':
            this.dialog6 = true;
            this.selfEvaluationForm.evaluate = this.resume.evaluate;
            break;
        }
        //标记成"编辑"状态
        this.editStatus = true;
        this.editItemIdex = index;
      }
    },
    deleteCard(dialog, index, itemId) {
      if (dialog) {
        switch (dialog) {
          case 'dialog2':
            this.$confirm('确认删除此项工作经历？')
              .then(async () => {
                let deleteResult = await deleteSomeResume('labor/' + itemId);
                if (deleteResult.status == 200) {
                  this.$delete(this.resume.laborExp, index);
                } else {
                  this.$message({ type: 'error', message: '删除失败' });
                }
              })
              .catch(() => {
                //this.$message({ type: 'error', message: '系统异常，删除失败' });
              });
            break;
          case 'dialog3':
            this.$confirm('确认删除此项教育经历？')
              .then(async () => {
                let deleteResult = await deleteSomeResume('edu/' + itemId);
                if (deleteResult.status == 200) {
                  this.$delete(this.resume.eduExp, index);
                } else {
                  this.$message({ type: 'error', message: '删除失败' });
                }
              })
              .catch(() => {
                //this.$message({ type: 'error', message: '系统异常，删除失败' });
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
        evaluate: this.selfEvaluationForm.evaluate
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
        this.loadPsnlResume();
        this.dialog6 = false;
      } else {
        this.$message({
          type: 'success',
          message: '个人描述保存失败'
        });
      }
    },
    doPositionLike(formName) {
      let that = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this.$refs[formName].model;
          params.positionLike = params.positionLike.join('-');
          params.industryLike = params.industryLike.join('-');
          params.pid = this.$store.getters['person/pid'];
          let saveResult = await savePositionLike(params).catch(() => {
            that.$message({
              type: 'error',
              message: '系统异常，保存失败'
            });
          });
          if (saveResult.status === 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            this.resume.workNature = this.jobIntentionForm.workNature;
            this.resume.workArea = this.jobIntentionForm.workArea;
            this.resume.salaryMax = this.jobIntentionForm.salaryMax;
            this.resume.salaryMin = this.jobIntentionForm.salaryMin;
            this.resume.salaryScope =
              this.jobIntentionForm.salaryMin +
              '-' +
              this.jobIntentionForm.salaryMax;
            // this.resume.positionLike = this.jobIntentionForm.positionLike
            //   ? this.jobIntentionForm.positionLike.join('-')
            //   : '';
            this.resume.industryLike = this.jobIntentionForm.industryLike;
            this.jobIntentionForm.industryLike = this.industryLikeArray;
            this.resume.positionLike = this.jobIntentionForm.positionLike;
            this.jobIntentionForm.positionLike = this.positionLikeArray;
            this.dialog1 = false;
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            });
          }
        }
      });
    },
    addLanguageSkills() {
      if (this.psnlLanguageTags && this.psnlLanguageTags.length >= 5) {
        this.$alert('外语能力最多只能添加5条');
      } else {
        this.dialog4 = true;
      }
    },
    minSalaryChange() {
      if (!this.jobIntentionForm.salaryMin) {
        return;
      }
      // if (isNaN(Number(this.jobIntentionForm.salaryMin))) {
      //   this.$alert('请输入数字');
      //   this.jobIntentionForm.salaryMin = '';
      // } else
      if (
        this.jobIntentionForm.salaryMax &&
        this.jobIntentionForm.salaryMin > this.jobIntentionForm.salaryMax
      ) {
        this.$alert('薪酬下限不得低于薪酬上限');
        this.jobIntentionForm.salaryMin = '';
      } else if (
        this.jobIntentionForm.salaryMax &&
        this.jobIntentionForm.salaryMin * 3 < this.jobIntentionForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobIntentionForm.salaryMax = '';
      }
    },
    maxSalaryChange() {
      if (!this.jobIntentionForm.salaryMax) {
        return;
      }
      // if (isNaN(Number(this.jobIntentionForm.salaryMax))) {
      //   this.$alert('请输入数字');
      //   this.jobIntentionForm.salaryMax = '';
      // } else
      if (
        this.jobIntentionForm.salaryMin &&
        this.jobIntentionForm.salaryMin > this.jobIntentionForm.salaryMax
      ) {
        this.$alert('薪酬上限不得高于薪酬下限');
        this.jobIntentionForm.salaryMin = '';
      } else if (
        this.jobIntentionForm.salaryMin &&
        this.jobIntentionForm.salaryMin * 3 < this.jobIntentionForm.salaryMax
      ) {
        this.$alert('薪酬上限不得超过薪酬下限的三倍');
        this.jobIntentionForm.salaryMax = '';
      }
    },
    openPop() {
      this.workYear = this.resume.workYear;
    },
    hidePop() {
      if (this.workYear == this.resume.workYear) {
        return;
      }
      //保存工作年限
      saveWorkYear({
        pid: this.$store.getters['person/pid'],
        workYear: this.workYear
      }).then(saveRes => {
        if (saveRes && saveRes.status === 200) {
          this.resume.workYear = this.workYear;
          this.$message({ type: 'success', message: '工作年限修改成功' });
        } else if (saveRes) {
          this.$message({ type: 'error', message: '工作年限修改失败' });
        }
      });
    },
    /**
     * 显示学信网教育经历数据
     */
    openEduPop() {
      // 查询教育经历信息
      getEduExpFromChsi({
        pid: this.$store.getters['person/pid']
      }).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          // this.$message({ type: 'success', message: '查询成功' });
          this.eduTableData = queryRes.result.data || [];
        } else if (queryRes) {
          this.eduTableData = [];
          this.$message({ type: 'error', message: '查询教育经历失败' });
        }
      });
    },
    hideEduPop() {},
    /**
     * 显示技能鉴定证书数据
     */
    openSkillPop() {
      // 查询技能证书信息
      getCertInfo({
        pid: this.$store.getters['person/pid']
      }).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          // this.$message({ type: 'success', message: '查询成功' });
          this.skillTableData = queryRes.result.data || [];
        } else if (queryRes) {
          this.skillTableData = [];
          this.$message({ type: 'error', message: '查询技能证书失败' });
        }
      });
    },
    hideSkillPop() {},
    /**
     *添加教育经历从学信网(可以批量)
     */
    addEduFromChsi() {
      if (this.multipleSelection && this.multipleSelection.length) {
        console.log(this.multipleSelection);
        let params = this.multipleSelection.map(i => {
          let obj = { ...i };
          obj.pid = this.pid;
          obj.sourceOuter = '1';
          return obj;
        });
        saveEduExp({ eduExpList: params }).then(queryRes => {
          if (queryRes && queryRes.status === 200) {
            this.$message({ type: 'success', message: '保存成功' });
            //回显数据
            //this.resume.eduExp.push(...params);
            this.loadPsnlResume();
            // 删掉已经选过的数据
            this.eduTableData = this.eduTableData.filter(
              obj => !this.multipleSelection.some(i => obj.eduId === i.eduId)
            );
          } else if (queryRes) {
            this.$message({ type: 'error', message: '保存失败' });
          }
        });
      } else {
        this.$message({ type: 'warning', message: '请选择数据' });
      }
    },
    /**
     *添加技能证书从鉴定网(可以批量)
     */
    addSkillFromJd() {
      if (this.multipleSelection2 && this.multipleSelection2.length) {
        console.log(this.multipleSelection2);
        let params = this.multipleSelection2.map(i => {
          let obj = { ...i };
          obj.pid = this.pid;
          obj.sourceOuter = '1';
          return obj;
        });
        saveSkillCert({ certList: params }).then(queryRes => {
          if (queryRes && queryRes.status === 200) {
            this.$message({ type: 'success', message: '保存成功' });
            //回显数据
            //this.resume.psnlSkillcert.push(...params);
            this.loadPsnlResume();
            //删掉已经选过的数据
            this.skillTableData = this.skillTableData.filter(
              obj => !this.multipleSelection2.some(i => obj.certId === i.certId)
            );
          } else if (queryRes) {
            this.$message({ type: 'error', message: '保存失败' });
          }
        });
      } else {
        this.$message({ type: 'warning', message: '请选择数据' });
      }
    },
    markHighEdu(highEdu) {
      //TODO 需要增加手动修改最高学历的接口
      this.resume.eduLevel = highEdu;
    }
  },
  created() {
    var arr = Object.keys(this.$props.resumeData);
    if (arr.length === 0) {
      //初始化加载个人简历基本信息
      this.loadPsnlResume();
    } else {
      //使用传入的简历信息
      this.$set(this, 'resume', { ...this.$props.resumeData });
    }
  },
  watch: {
    /**
     *  将教育经历分组显示
     */
    'resume.eduExp': function(val) {
      this.eduExp1 = [];
      this.eduExp2 = [];
      //排序
      let orderVal = this._.orderBy(
        val,
        ['collegesName', 'majorName'],
        ['asc', 'desc']
      );
      if (orderVal && orderVal.length) {
        // 拆分需要显示的教育经历
        if (orderVal.length === 1) {
          // 只有一条时，默认显示一行一条
          this.eduExp1 = [...orderVal];
          this.eduExp2 = [];
        } else {
          //将学信网，和手动添加的教育经历；（学校名和专业名称相同的视为一对）
          this.eduExp1 = [];
          this.eduExp2 = [];
          let orginArray = [...orderVal];
          orderVal.forEach((element, index) => {
            let diff = true;
            for (let i = 0; i < orginArray.length; i++) {
              let obj2 = orginArray[i];
              if (index === i && i !== orginArray.length - 1) {
                continue;
              }
              if (index === i && i === orginArray.length - 1) {
                this.eduExp1.push(element);
                break;
              } else if (
                element.collegesName === obj2.collegesName &&
                element.majorName === obj2.majorName
              ) {
                this.eduExp2.push(element);
                diff = false;
                break;
              }
              if (diff && i === orginArray.length - 1) {
                this.eduExp1.push(element);
              }
            }
          });
        }
      }
    },
    /**
     *录入教育经历时，学历变化(职高、技校、中专、高中、初中及以下不能录入专业)
     */
    'educationExperienceForm.eduLevel': function(val) {
      // let _eduLevel = this.educationExperienceForm.eduLevel;
      if (
        val === '00' ||
        val === '01' ||
        val === '02' ||
        val === '03' ||
        val === '04' ||
        val === '05'
      ) {
        this.rules.educationExperienceRules.majorName = [];
        this.majorNameDisabled = true;
        this.educationExperienceForm.majorName = '';
      } else {
        this.rules.educationExperienceRules.majorName = [
          { required: true, message: '请输入专业', trigger: 'blur' },
          { max: 400, message: '长度不可超过400个字符', trigger: 'blur' }
        ];
        this.majorNameDisabled = false;
      }
    }
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
    padding: 20px 20px 40px 25px;
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
      .type-label {
        font-size: 12px;
        color: #fc6f3d;
        height: 20px;
        width: 60px;
        display: block;
        /* background-color: #fc6f3d; */
        transform: rotate(-45deg);
        text-align: center;
        left: -20px;
        top: 0px;
        position: absolute;
      }
    }
  }
  .hidden {
    visibility: hidden;
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
  ::v-deep textarea {
    min-height: 150px !important;
  }
  .vertical-divider {
    float: right;
    height: 26px;
  }
}
#selectEudBtn {
  margin-top: 10px;
  float: right;
}
#selectSkillBtn {
  margin-top: 10px;
  float: right;
}
::v-deep .el-dialog__body {
  .pup-btn {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
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
</style>
