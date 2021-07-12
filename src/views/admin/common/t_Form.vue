<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-07-09 10:30:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <el-form
    ref="value"
    :inline="formConfig.inline"
    :model="value"
    :disabled="formConfig.disabled"
    :labelPosition="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size="formConfig.size"
    :style="formConfig.style"
  >
    <template v-for="(v, k) in formConfig.formItemList">
      <!-- 树 -->
      <el-form-item
        :style="v.isQueryStyle ? { position: 'relative' } : ''"
        v-if="v.type == 'tree'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <div
          v-if="v.isQueryStyle"
          :style="{ width: v.style.width || '210px' }"
        ></div>
        <el-tree
          :style="v.style"
          :data="v.data"
          show-checkbox
          :node-key="v.id"
          :ref="v.key"
          highlight-current
          :props="v.defaultProps"
          @check="
            (a, b) => {
              setTabs(a, b, v);
            }
          "
        >
        </el-tree>

        <div :style="{ width: v.style.width || '210px' }" v-if="v.tags">
          <el-tag
            class="setTag"
            size="mini"
            v-for="(tag, key) in v.tags"
            :key="key"
          >
            {{ tag.labelName }}
          </el-tag>
        </div>
      </el-form-item>
      <!-- 最大值和最小值 -->
      <el-form-item
        v-if="v.type == 'max'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-input-number
          v-model="value['max' + v.key]"
          :placeholder="v.maxplaceholder"
          :style="v.style"
          :maxlength="v.maxlength"
          :minlength="v.minlength"
          :disabled="v.disabled"
          controls-position="right"
        ></el-input-number>
        -
        <el-input-number
          v-model="value['min' + v.key]"
          :placeholder="v.minplaceholder"
          :style="v.style"
          :maxlength="v.maxlength"
          :minlength="v.minlength"
          :disabled="v.disabled"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <!-- 输入框 -->
      <el-form-item
        v-if="v.type == 'input'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-input
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          :style="v.style"
          :maxlength="v.maxlength"
          :minlength="v.minlength"
          :disabled="v.disabled"
        ></el-input>
      </el-form-item>
      <!-- 数字输入框 -->
      <el-form-item
        v-if="v.type == 'number'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-input-number
          :max="v.max"
          :min="v.min"
          :controls="v.controls"
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          :style="v.style"
          :maxlength="v.maxlength"
          :minlength="v.minlength"
          :disabled="v.disabled"
        ></el-input-number>
      </el-form-item>

      <!-- 选择 -->
      <el-form-item
        v-if="v.type == 'select'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <template v-if="v.change">
          <el-select
            :multiple="v.multiple"
            :value="v.value"
            :style="v.style"
            v-model="value[v.key]"
            :disabled="v.disabled"
            :placeholder="v.placeholder"
            @change="v.change"
          >
            <el-option
              v-for="(item, key) in v.options"
              :key="key"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </template>
        <template v-else>
          <el-select
            :multiple="v.multiple"
            :value="v.value"
            :style="v.style"
            v-model="value[v.key]"
            :disabled="v.disabled"
            :placeholder="v.placeholder"
          >
            <el-option
              v-for="(item, key) in v.options"
              :key="key"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
      <!-- 日期和时间 -->
      <el-form-item
        v-if="v.type == 'datetimerange'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          :style="v.style"
          v-model="value[v.key]"
          :value-format="v.format"
          :value="v.value"
          type="datetimerange"
          :picker-options="v.pickerOptions"
          range-separator=""
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 时间 日 双时间 -->

      <el-form-item
        v-if="v.type == 'daterange'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          :style="v.style"
          v-model="value[v.key]"
          :value-format="v.format"
          :value="v.value"
          type="daterange"
          range-separator=""
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 时间 月 双时间 -->
      <el-form-item
        v-if="v.type == 'monthrange'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          :style="v.style"
          :value="v.value"
          v-model="value[v.key]"
          :value-format="v.format"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </el-form-item>

      <!-- 时间 单日期 -->
      <el-form-item
        v-if="v.type == 'date'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          type="date"
          :value-format="v.format"
          :value="v.value"
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          :style="v.style"
        ></el-date-picker>
      </el-form-item>
      <!-- 时间 单时间 -->
      <el-form-item
        v-if="v.type == 'datetime'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          type="datetime"
          :value-format="v.format"
          :value="v.value"
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          :style="v.style"
          :picker-options="v.pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <!-- 开关按钮 -->
      <el-form-item
        v-if="v.type == 'switch'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-switch
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          :style="v.style"
        ></el-switch>
      </el-form-item>
      <!-- 多选择 -->
      <el-form-item
        v-if="v.type == 'checkbox'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-checkbox-group :style="v.style" v-model="v.data">
          <el-checkbox
            v-for="(item, key) in v.options"
            :key="key"
            :label="item.value"
            :disabled="item.disabled"
            name="type"
            >{{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        v-if="v.type == 'radio'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <template v-if="v.change">
          <el-radio-group
            :style="v.style"
            :value="v.value"
            :disabled="v.disabled"
            v-model="value[v.key]"
            @change="v.change"
          >
            <el-radio
              v-for="(item, key) in v.options"
              :key="key"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>
        <template v-else>
          <el-radio-group
            :style="v.style"
            :value="v.value"
            :disabled="v.disabled"
            v-model="value[v.key]"
          >
            <el-radio
              v-for="(item, key) in v.options"
              :key="key"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <!-- 大文本框 -->
      <el-form-item
        v-if="v.type == 'textarea'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-input
          type="textarea"
          :autosize="v.autosize"
          :style="v.style"
          v-model="value[v.key]"
          :value="v.value"
          :disabled="v.disabled"
          :placeholder="v.placeholder"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="v.type == 'time'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-time-select
          :style="v.style"
          :value="v.value"
          v-model="value[v.key]"
          :picker-options="v.options"
          :placeholder="v.placeholder"
        >
        </el-time-select>
      </el-form-item>
    </template>
    <el-row v-if="!formConfig.isBtn">
      <el-col :span="24" style="text-align:right">
        <el-form-item>
          <template v-if="formConfig.operation">
            <el-button type="primary" @click="onSubmit">
              <template v-if="formConfig.operation.icon">
                <i :class="formConfig.operation.icon"></i>
              </template>
              {{ formConfig.operation.title }}
            </el-button>
          </template>
          <template v-else>
            <el-button
              :icon="
                formConfig.saveBtn ? formConfig.saveBtn.icon : 'el-icon-search'
              "
              type="primary"
              @click="onSubmit"
            >
              {{ formConfig.saveBtn ? formConfig.saveBtn.title : '查询' }}
            </el-button>
            <el-button
              :icon="formConfig.resetBtn ? formConfig.resetBtn.icon : ''"
              @click="resetForm()"
            >
              {{ formConfig.resetBtn ? formConfig.resetBtn.title : '重置' }}
            </el-button>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 't_form',
  props: ['formConfig'],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      value: {}
      // 数据类型示例
      // formConfig: {
      //   inline: true,
      //   size: 'small',
      //   labelPosition: 'right',
      //   labelWidth: '60px',
      //  operation:{
      //     title:'保存',
      //   }
      // saveBtn:{
      //   title:'保存',
      //   icon:''
      // },

      // resetBtn:{
      //   title:'重置',
      //   icon:''
      // },
      //   formItemList: [
      //     {
      //       type: 'input',
      //       label: '姓名',
      //       placeholder: '请输入姓名',
      //       //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      //       rules: [],
      //       key: 'name'
      //     },
      //     {
      //       type: 'textarea',
      //       label: '姓名2',
      //       placeholder: '请输入姓名2',
      //       //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      //       rules: [],
      //       key: 'textarea'
      //     },
      //     {
      //       type: 'radio',
      //       label: '类型',
      //       rules: [],
      //       key: 'radio',
      //       options: [
      //         {
      //           value: '1',
      //           label: '男',
      //           disabled: false
      //         },
      //         {
      //           value: '0',
      //           label: '女',
      //           disabled: false
      //         }
      //       ]
      //     },
      //     {
      //       type: 'select',
      //       label: '类型',
      //       rules: [],
      //       key: 'aaa',
      //       options: [
      //         {
      //           value: '1',
      //           label: '男',
      //           disabled: false
      //         },
      //         {
      //           value: '0',
      //           label: '女',
      //           disabled: false
      //         }
      //       ]
      //     },
      //     {
      //       type: 'daterange',
      //       label: '时间',
      //       rules: [],
      //       key: 'daterange'
      //     },
      //     {
      //       type: 'date',
      //       label: '时间2',
      //       placeholder: '请输入时间2',
      //       rules: [],
      //       key: 'date'
      //     },
      //     {
      //       type: 'switch',
      //       label: 'switch',
      //       placeholder: '请输入switch',
      //       rules: [],
      //       key: 'switch'
      //     },
      //     {
      //       type: 'checkbox',
      //       label: '类型',
      //       rules: [],
      //       key: 'checkbox',
      //       data: [],
      //       options: [
      //         {
      //           value: '1',
      //           label: '男',
      //           disabled: false
      //         },
      //         {
      //           value: '0',
      //           label: '女',
      //           disabled: false
      //         }
      //       ]
      //     }
      //   ]
      // }
    };
  },
  computed: {},
  methods: {
    setTabs(a, b, v) {
      v.tags = [];
      for (let i = 0; i < b.checkedNodes.length; i++) {
        if (b.checkedNodes[i].labelReal == '1') {
          v.tags.push({
            labelId: b.checkedNodes[i].labelId,
            labelName: b.checkedNodes[i].labelName
          });
        }
      }
      this.value[v.key] = v.tags;
    },
    onSubmit() {
      this.$refs.value.validate(valid => {
        if (valid) {
          this.setCheck(this.formConfig.formItemList);
          this.$emit('onsubmit', this.value);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getTree(ref) {
      return this.$refs[ref][0].getCheckedKeys();
    },
    resetTree(ref) {
      this.$refs[ref][0].setCheckedKeys([]);
    },
    setCheck(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type == 'checkbox') {
          this.value[arr[i].key] = arr[i].data;
        }
        if (arr[i].type == 'tree') {
          this.value[arr[i].key] = this.getTree(arr[i].key);
        }
      }
    },
    resetForm() {
      let option = this.formConfig.formItemList;
      let d = [];
      for (let i = 0; i < option.length; i++) {
        if (option[i].type == 'checkbox') {
          option[i].data = [];
        }
        if (option[i].type == 'tree') {
          this.resetTree(option[i].key);
        }

        if (option[i].disabled) {
          d.push(option[i].key);
        }
      }
      for (let i in this.value) {
        if (typeof this.value[i] == 'object') {
          if (this.isRepetition(d, i)) {
            continue;
          }
          this.value[i] = [];
        } else {
          if (this.isRepetition(d, i)) {
            continue;
          }
          this.value[i] = '';
        }
      }
      //this.$refs.value.resetFields();
    },
    isRepetition(arr, str) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
          return true;
        }
      }
      return false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.setTag {
  margin: 4px;
}
</style>
