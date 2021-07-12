<!--
 * @Author: your name
 * @Date: 2021-03-10 10:56:11
 * @LastEditTime: 2021-06-28 11:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\common\t_table.vue
-->
<template>
  <div class="table">
    <el-table
      id="iTable"
      :class="tableClass"
      :data="list"
      :stripe="options.stripe"
      border
      :highlight-current-row="options.highlightCurrentRow"
      :lazy="options.lazy"
      :height="options.height || '500px'"
      :load="loadGetData"
      ref="mutipleTable"
      style="width:100%;"
      :width="options.width"
      @row-click="clickRow"
      @row-dblclick="dblclickRow"
      @row-contextmenu="contextmenu"
      @header-click="headClick"
      @header-contextmenu="headcontextmenu"
      @select="select"
      @select-all="selectAll"
      @current-change="rowChange"
      @selection-change="handleSelectionChange"
    >
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <!--复选框（START）-->
        <el-table-column
          :key="index"
          v-if="column.type == 'selection'"
          type="selection"
          :width="column.width ? column.width : 60"
          :align="column.align ? column.align : 'center'"
        >
        </el-table-column>
        <!--复选框（END）-->

        <!--序号（START）-->
        <el-table-column
          :key="index"
          v-else-if="column.type == 'index'"
          type="index"
          :label="column.title ? column.title : '序号'"
          :width="column.width ? column.width : 80"
          :align="column.align ? column.align : 'center'"
        >
        </el-table-column>
        <!--序号（END）-->

        <!-- slot 添加自定义配置项 -->
        <slot v-else-if="column.slot" :name="column.slot" :tit="index"></slot>

        <!-- 默认渲染列-渲染每一列的汉字 -->
        <el-table-column
          v-else
          :key="index"
          :prop="column.prop"
          :label="column.title"
          :align="column.align"
          :width="column.width"
          :sortable="column.sortable"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <!--正常渲染-->
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <!--render函数-->
            <template v-else>
              <expandDom
                :column="column"
                :row="scope.row"
                :render="column.render"
                :index="index"
              ></expandDom>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
    </el-table>
  </div>
</template>

<script>
import { niceScroll } from '@/utils';
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }, // 数据列表
    columns: {
      type: Array,
      default: () => []
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    options: {
      type: Object,
      default: function() {
        return {
          //height: '350px', //默认高度-为了表头固定
          stripe: false, // 是否为斑马纹 table
          highlightCurrentRow: false, // 是否要高亮当前行
          border: false, //是否有纵向边框
          lazy: false, //是否需要懒加载
          loading: false //是否需要等待效果
        };
      }
    }, // table 表格的控制参数
    tableClass: {
      type: String,
      default: 'hxTable'
    }
  },
  components: {
    /**
     * render函数渲染组件
     * */
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  data() {
    return {
      multipleSelection: [] // 多行选中
    };
  },
  updated() {
    if (this.resizeScroll) {
      //setTimeout(this.resizeScroll()(), 100);
    }
  },
  mounted() {
    //niceScroll('.el-table__body-wrapper');
  },
  watch: {},
  computed: {},
  methods: {
    resizeScroll() {
      return this._.throttle(() => {
        $('.el-table__body-wrapper')
          ?.getNiceScroll()
          ?.resize();
      }, 300);
    },
    /**
     * 列表懒加载，必须先开启懒加载
     * */
    loadGetData(row, treeNode, resolve) {
      //懒加载事件数据
      let data = {
        row: row,
        treeNode: treeNode,
        resolve: resolve
      };
      this.$emit('loadGetData', data);
    },
    /**
     * 多行选中
     * */
    handleSelectionChange(val) {
      // 多行选中
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', val);
    },
    /**
     * 单击行事件
     * */
    clickRow(row, column, event) {
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('clickRow', data);
    },
    /**
     * 双击行事件
     * */
    dblclickRow(row, column, event) {
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('dblclickRow', data);
    },
    /**
     * 右键行事件-没去掉页面默认的
     * */
    contextmenu(row, column, event) {
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('contextmenu', data);
    },
    /**
     * 头部列点击事件
     * */
    headClick(column, event) {
      let data = {
        column: column,
        event: event
      };
      this.$emit('headClick', data);
    },
    /**
     * 头部列右键点击事件
     * */
    headcontextmenu(column, event) {
      let data = {
        column: column,
        event: event
      };
      this.$emit('headcontextmenu', data);
    },
    /**
     * 当前行发生改变时的事件
     * */
    rowChange(currentRow, oldCurrentRow) {
      let data = {
        currentRow: currentRow,
        oldCurrentRow: oldCurrentRow
      };
      this.$emit('rowChange', data);
    },
    /**
     * 用户手动勾选复选框触发
     * */
    select(sel, row) {
      let data = {
        sel: sel,
        row: row
      };
      this.$emit('select', data);
    },
    /**
     * 用户点击全选触发
     * */
    selectAll(sel) {
      let data = {
        sel: sel
      };
      this.$emit('selectAll', data);
    }
  }
};
</script>
<style lang="scss" scoped>
#iTable {
  overflow: auto;
}
</style>
