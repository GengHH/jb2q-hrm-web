<!--
 * @Author: GengHH
 * @Date: 2021-01-13 13:46:07
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-08 17:52:32
 * @Description: 二次封装el-button成实现float label 的input
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseLabelSelect.vue
-->

<template>
  <div class="lable-input-block" ref="select">
    <el-select
      v-support
      v-bind="attrs"
      filterable
      :value="value"
      v-on="eventList"
    >
      <el-option
        v-for="item in optionData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span class="float-label hidden"
      ><i v-if="required" class="required-symbol">*</i>{{ label }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'pl-select',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    optionData: {
      type: Array,
      default: () => []
    },
    value: {
      value: String,
      default: ''
    }
  },
  data() {
    return {
      //inputValue: ''
    };
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
        blur: this.handleBlur
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
      let that = this;
      if (this.value) {
        if (this.$refs['input']) {
          $(this.$refs['select'])
            .children('.float-label')
            .removeClass('hidden')
            .animate({ top: '-8px' }, 300);
        } else {
          setTimeout(function() {
            $(that.$refs['select'])
              .children('.float-label')
              .removeClass('hidden')
              .animate({ top: '-8px' }, 300);
          }, 500);
        }
        $(this.$refs['select'])
          .children('.el-input')
          .children('.ie-placeholder')
          .css({ display: 'none' });
      }
    },
    handleFocus(event) {
      let $label = $(event.target)
        .parent('div')
        .siblings('.float-label');
      if ($label && $label.hasClass('hidden')) {
        $label.removeClass('hidden').animate({ top: '-8px' }, 300);
      }
      // this.$emit('input', () => {
      //   $label.addClass('hidden');
      // });
    },
    handleBlur(event) {
      if (!this.value) {
        let $label = $(event.target)
          .parent('div')
          .siblings('.float-label');
        if ($label && !$label.hasClass('hidden')) {
          $label.animate({ top: '0px' }, 300).addClass('hidden');
        }
      }
    }
    // handleChange() {
    //   if (!this.value) {
    //     let $label = $(event.target)
    //       .parent('div')
    //       .siblings('.float-label');
    //     if ($label && !$label.hasClass('hidden')) {
    //       $label.animate({ top: '0px' }, 300).addClass('hidden');
    //     }
    //   }
    // }
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
.el-select {
  width: 100%;
}
.required-symbol {
  color: red;
  margin: 0px 3px 0;
  /* display: inline-block; */
  top: 3px;
  position: relative;
}
</style>
