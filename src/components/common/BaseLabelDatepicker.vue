<!--
 * @Author: GengHH
 * @Date: 2021-01-13 13:46:07
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-12 16:28:03
 * @Description: 二次封装el-button成实现float label 的input
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseLabelDatepicker.vue
-->

<template>
  <div class="lable-input-block" ref="datePicker">
    <!-- <el-datePicker v-support v-bind="attrs" :value="value" v-on="eventList">
      <el-option
        v-for="item in optionData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-datePicker> -->
    <el-date-picker
      v-support
      v-bind="attrs"
      :value="value"
      v-on="eventList"
      :clearable="clearable"
      type="date"
    >
    </el-date-picker>
    <span class="float-label hidden">{{ label }} </span>
  </div>
</template>
<script>
export default {
  name: 'pl-data-picker',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.init();
      }
    }
  },
  computed: {
    attrs() {
      return {
        placeholder: this.$attrs.placeholder || `请选择${this.label}`,
        //...this.$PlElement?.inputConfig,
        ...this.$attrs
      };
    },
    eventList() {
      return {
        ...this.events,
        ...this.$listeners,
        //change: this.handleChange,
        focus: this.handleFocus,
        blur: this.handleBlur,
        change: this.handleChange
      };
    }
  },
  mounted() {
    // if (this.value) {
    //   this.handleFocus();
    // }
  },
  methods: {
    init() {
      if (this.value) {
        $(this.$refs['datePicker'])
          .children('.float-label')
          .removeClass('hidden')
          .animate({ top: '-8px' }, 300);

        $(this.$refs['datePicker'])
          .children('.el-input')
          .children('.ie-placeholder')
          .css({ display: 'none' });
      }
    },
    handleFocus(event) {
      let $target = $(event.$el);
      let $label = $target.siblings('.float-label');
      if ($label && $label.hasClass('hidden')) {
        $label.removeClass('hidden').animate({ top: '-8px' }, 300);
      }
    },
    handleBlur(event) {
      if (!this.value) {
        let $target = $(event.$el);
        let $label = $target.siblings('.float-label');
        if ($label && !$label.hasClass('hidden')) {
          $label.animate({ top: '0px' }, 300).addClass('hidden');
        }
      }
    },
    handleChange(event) {
      if (!this.value) {
        let $target = $(event.$el);
        let $label = $target.siblings('.float-label');
        if ($label && !$label.hasClass('hidden')) {
          $label.animate({ top: '0px' }, 300).addClass('hidden');
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
.lable-input-block {
  position: relative;
}
.float-label {
  margin-left: 10px;
  padding: 0 5px;
  position: absolute;
  top: 13px;
  left: 0;
  color: #acacac;
  background-color: #fff;
  font-size: 14px;
  line-height: 14px;
}
.el-date-editor {
  width: 100%;
}
</style>
