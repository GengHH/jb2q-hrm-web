<!--
 * @Author: your name
 * @Date: 2021-03-09 14:14:04
 * @LastEditTime: 2021-04-12 19:42:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\resume.vue
-->
<template>
  <div id="indexBody">
    <div class="title-style">
      基本信息
    </div>
    <div class="box">
      <div>
        <span style="font-size:22px">{{ form.xm }}</span>
        <span style="padding:0 35px">{{ form.age }}岁</span>
        <span>{{ form.sex }}</span
        ><!--  el-icon-male -->
        <span style="margin-left:40px;color:#4766a4">就业服务难度系数</span>
        <span style="color:#fc7a43;font-size:20px">5.0</span>
      </div>
      <div style="margin-top:15px">
        <span><i class="el-icon-time"></i> 2018年毕业</span>
        <el-divider direction="vertical"></el-divider>
        <span>本科学历</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ form.contactPhone }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ form.livingAddress }}</span>
      </div>
    </div>
    <div class="title-style">
      求职意向
    </div>
    <div class="box">
      <div>
        <span>{{ setDicOptions(form.positionLike, 'positionType') }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ form.salaryScope }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ setDicOptions(form.industryLike, 'type') }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ setDicOptions(form.workArea, 'qx') }}</span>
      </div>
    </div>
    <div class="title-style">
      工作经历
    </div>
    <div class="box" v-for="(v, k) in form.laborExp" :key="k + 'd'">
      <div>
        <span class="h2SizeColor">{{ v.corpName }}</span>
        <span class="sizeColor marginLeft"
          >{{ formatTime(v.entryDate) }}-{{ formatTime(v.quitDate) }}</span
        >
      </div>
      <div class="marginTop">
        <span>社保事业部</span>
        <span class="marginLeft">{{ v.positionName }}</span>
      </div>
      <div class="marginTop">
        <span style="color:#fd9273">工作内容</span>
      </div>
      <div class="marginTop">
        {{ v.workDescribe }}
      </div>
    </div>
    <div class="title-style">
      教育经历
    </div>
    <div class="box" v-for="(v, k) in form.eduExp" :key="k + 'c'">
      <div style="padding:25px 0">
        <div>
          <span class="h2SizeColor">{{ v.collegesName }}</span>
          <span class="sizeColor marginLeft"
            >{{ formatTime(v.admissionDate) }}-{{
              formatTime(v.graduateDate)
            }}</span
          >
        </div>
        <div class="marginTop">
          <span>{{ v.majorName }}</span>
          <span class="marginLeft">{{ setDicOptions(v.eduLevel, 'edu') }}</span>
        </div>
      </div>
    </div>
    <div class="title-style">
      外语能力
    </div>
    <div class="box">
      <el-tag
        type="warning"
        style="margin-right:10px"
        v-for="(v, k) in form.psnlLanguage"
        :key="k + 'b'"
      >
        {{
          setDicOptions(v.languageType, 'languageType') +
            setDicOptions(v.languageLevel, 'level')
        }}
      </el-tag>
    </div>
    <div class="title-style">
      技能证书
    </div>
    <div class="box">
      <el-tag
        type="warning"
        style="margin-right:10px"
        v-for="(v, k) in form.psnlSkillcert"
        :key="k + 'a'"
      >
        {{ v.certLevel + ' - ' + v.certName }}
      </el-tag>
    </div>
    <div class="title-style">
      自我评价
    </div>
    <div class="box">
      <div>
        {{ form.evaluate }}
      </div>
    </div>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
export default {
  name: 'resume',
  components: {},
  props: ['form'],
  data() {
    return {
      dicOptions: {
        //语言等级
        level: trim(this.$store.getters['dictionary/recruit_language_level']),
        //语言
        languageType: trim(
          this.$store.getters['dictionary/recruit_language_type']
        ),
        //区县
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx']),
        //行业分类
        type: trim(this.$store.getters['dictionary/recruit_industry_type']),
        //学历
        edu: trim(this.$store.getters['dictionary/recruit_edu']),
        //学历
        positionType: trim(
          this.$store.getters['dictionary/recruit_position_s_type']
        )
      }
    };
  },
  computed: {},
  methods: {
    formatTime(val) {
      if (val.length >= 8) {
        return (
          val.substring(0, 4) +
          '年' +
          val.substring(4, 6) +
          '月' +
          val.substring(6, 8) +
          '日'
        );
      } else {
        return val;
      }
    },
    setDicOptions(val, str) {
      if (val) {
        let data = this.dicOptions[str];
        for (let i = 0; i < data.length; i++) {
          if (val == data[i].value) {
            return data[i].label;
          }
        }
        return '';
      }
      return '';
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#indexBody {
  .box {
    padding: 15px 20px;
  }
  .marginTop {
    margin-top: 10px;
  }
  .marginLeft {
    margin-left: 60px;
  }
  .h2SizeColor {
    font-size: 18px;
    color: #151515;
  }
  .sizeColor {
    color: #a3a3a3;
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
}
</style>
