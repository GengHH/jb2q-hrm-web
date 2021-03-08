<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-03-05 18:26:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <el-form
    ref="value"
    :inline="formConfig.inline"
    :model="value"
    :labelPosition="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size="formConfig.size"
  >
    <template v-for="(v, k) in formConfig.formItemList">
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
        ></el-input>
      </el-form-item>
      <!-- 选择 -->
      <el-form-item
        v-if="v.type == 'select'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-select v-model="value[v.key]" :placeholder="v.placeholder">
          <el-option
            v-for="(item, key) in v.options"
            :key="key"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间 双时间 -->
      <el-form-item
        v-if="v.type == 'date'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-col :span="11">
          <el-form-item :prop="v.start">
            <el-date-picker
              type="date"
              v-model="value[v.start]"
              :placeholder="v.placeholder"
              style="max-width: 150px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col style="text-align: center;" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :prop="v.end">
            <el-date-picker
              type="date"
              v-model="value[v.end]"
              :placeholder="v.placeholder"
              style="max-width: 150px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 时间 单时间 -->
      <el-form-item
        v-if="v.type == 'date2'"
        :key="k"
        :label="v.label"
        :prop="v.key"
        :rules="v.rules"
      >
        <el-date-picker
          type="date"
          v-model="value[v.key]"
          :placeholder="v.placeholder"
          style="width:100%"
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
        <el-checkbox-group v-model="v.data">
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
        <el-radio-group v-model="value[v.key]">
          <el-radio
            v-for="(item, key) in v.options"
            :key="key"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
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
          v-model="value[v.key]"
          :placeholder="v.placeholder"
        ></el-input>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 't_Form',
  data() {
    return {
      value: {},
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '60px',
        formItemList: [
          {
            type: 'input',
            label: '姓名',
            placeholder: '请输入姓名',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'name'
          },
          {
            type: 'textarea',
            label: '姓名2',
            placeholder: '请输入姓名2',
            //rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            rules: [],
            key: 'textarea'
          },
          {
            type: 'radio',
            label: '类型',
            rules: [],
            key: 'radio',
            options: [
              {
                value: '1',
                label: '男',
                disabled: false
              },
              {
                value: '0',
                label: '女',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            label: '类型',
            rules: [],
            key: 'aaa',
            options: [
              {
                value: '1',
                label: '男',
                disabled: false
              },
              {
                value: '0',
                label: '女',
                disabled: false
              }
            ]
          },
          {
            type: 'date',
            label: '时间',
            rules: [],
            placeholder: '请输入时间',
            start: 'bbb',
            end: 'ccc'
          },
          {
            type: 'date2',
            label: '时间2',
            placeholder: '请输入时间2',
            rules: [],
            key: 'date2'
          },
          {
            type: 'switch',
            label: 'switch',
            placeholder: '请输入switch',
            rules: [],
            key: 'switch'
          },
          {
            type: 'checkbox',
            label: '类型',
            rules: [],
            key: 'checkbox',
            data: [],
            options: [
              {
                value: '1',
                label: '男',
                disabled: false
              },
              {
                value: '0',
                label: '女',
                disabled: false
              }
            ]
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    abc(e) {
      console.log(e);
    },
    onSubmit() {
      this.$refs.value.validate(valid => {
        if (valid) {
          this.setCheck(this.formConfig.formItemList);
          console.log(this.value);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    setCheck(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type == 'checkbox') {
          this.value[arr[i].key] = arr[i].data;
        }
      }
    },
    resetForm(formName) {
      this.$refs.value.resetFields();
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
