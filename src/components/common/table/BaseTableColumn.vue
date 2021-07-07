<!--
 * @Author: GengHH
 * @Date: 2021-01-25 11:21:13
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-07 11:35:34
 * @Description: 自己封装的table列组件（替代el-table-column）
 * @FilePath: \jb2q-hrm-web\src\components\common\table\BaseTableColumn.vue
-->

<template>
  <el-table-column
    v-if="!col.unshow"
    v-bind="col.attrs"
    :prop="col.prop"
    :label="col.label"
    :class-name="getColumnClass(col)"
    :formatter="getFormatter(col)"
  >
    <!--此处注释勿删,换行部分场景会导致空白slot的bug-->
    <!--自定义列header-->
    <!-- <template
      v-if="col.headerSlot || col.tip || col.type === 'selection'"
      v-slot:header="scope"
    >
      <template v-if="col.tip">
        {{ col.label }}
        <el-tooltip
          class="item"
          effect="dark"
          :content="col.tip"
          placement="top"
        >
          <i class="el-icon-question" />
        </el-tooltip>
      </template>
      <template v-if="col.type === 'selection'">
        <el-checkbox
          :indeterminate="isIndeterminate"
          :checked="checkedItems.length"
          @change="handleCheckAllChange"
        ></el-checkbox>
      </template>
      <slot v-if="col.headerSlot" :name="col.headerSlot" v-bind="scope"></slot>
    </template> -->
    <!--自定义列 -->
    <template v-if="showSlot(col)" v-slot="scope">
      <slot :name="col.slotName" v-bind="scope"></slot>
      <!-- 显示标签 -->
      <template v-if="col.tagMap">
        <template
          v-if="
            scope.row[col.prop] === undefined ||
              scope.row[col.prop] == null ||
              scope.row[col.prop] === ''
          "
        >
          -
        </template>
        <el-tag v-else :type="getTagType(scope, col)">
          {{ getTagText(scope, col) }}
        </el-tag>
      </template>
      <template v-if="col.type === 'index'">
        <slot
          name="index"
          v-bind="{ ...scope, startIndex, virtualScroll }"
        ></slot>
      </template>
      <!-- 显示字典表 -->
      <template v-if="col.customerRenderText">
        {{ col.customerRenderText(scope) }}
      </template>
      <!-- 显示操作按钮 -->
      <template v-if="col.actions && col.actions.length">
        <template v-for="(item, index) in col.actions">
          <template v-if="!(item.hidden && item.hidden(scope, item))">
            <el-divider
              v-if="index > 0 && scope.row.actions.length > 1"
              :key="index"
              direction="vertical"
            ></el-divider>
            <!-- 显示confirm的按钮 -->
            <pl-button
              v-if="item.confirmType || item.confirm"
              type="button"
              class="tabla-col-btn"
              :key="index"
              v-bind="item.attrs"
              :confirm-type="item.confirmType || 'pop'"
              :confirm-config="item.confirmConfig && item.confirmConfig(scope)"
              :pop-config="item.popConfig && item.popConfig(scope)"
              fullscreen-loading
              :icon="item.icon"
              @confirm="done => item.confirm(scope, done, index)"
            >
              {{ item.text || item.actionText(scope) }}
            </pl-button>
            <!-- 显示带有badge的按钮 -->
            <pl-button
              v-else-if="item.needBadge"
              :key="index"
              class="tabla-col-btn"
              v-bind="item.attrs"
              :icon="item.icon"
              @click="item.onClick(scope)"
            >
              {{ item.text || item.actionText(scope) }}
              <el-badge
                v-if="
                  scope.row.notReadCount && Number(scope.row.notReadCount) > 0
                "
                :value="Number(scope.row.notReadCount)"
                :max="99"
                class="badge-item"
              >
              </el-badge>
            </pl-button>
            <!-- 显示普通的按钮 -->
            <pl-button
              v-else
              :key="index"
              class="tabla-col-btn"
              v-bind="item.attrs"
              :icon="item.icon"
              @click="item.onClick(scope)"
            >
              {{ item.text || item.actionText(scope) }}
            </pl-button>
          </template>
        </template>
      </template>
      <!-- 显示用户自定义的列 -->
      <VNodes v-if="col.customerRender" :vnodes="col.customerRender(scope)" />
      <!-- 显示多选框列 -->
      <template v-if="col.type === 'selection'">
        <el-checkbox
          v-model="scope.row.selected"
          @change="handleItemCheckedChange"
        />
      </template>
    </template>
    <!--此处注释误删,请勿换行,换行会出现空白slot-->
    <pl-table-column
      v-for="(item, index) in col.childColumns"
      :key="index"
      :col="item"
    >
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </pl-table-column>
  </el-table-column>
</template>

<script>
import { getRandomKey } from '@/utils';
import { formatDate } from 'element-ui/lib/utils/date-util';
import plButton from '@/components/common/BaseLoadingButton';
import NP from 'number-precision';
const Item2UIDMap = new WeakMap();
export default {
  name: 'pl-table-column',
  components: {
    plButton,
    VNodes: {
      functional: true,
      props: {
        vnodes: {
          type: [Function, Object]
        }
      },
      render: (h, ctx) => {
        return ctx.props.vnodes;
      }
    }
  },
  props: {
    col: {
      type: Object,
      default: () => ({})
    },
    startIndex: {
      type: Number,
      default: 0
    },
    virtualScroll: {
      type: Boolean,
      default: false
    },
    childColumns: {
      type: Array,
      default: null
    }
  },
  methods: {
    getRandomKey(item) {
      const persistedUID = Item2UIDMap.get(item);
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey());
        return getRandomKey();
      }
      return persistedUID;
    },
    showSlot(col) {
      return (
        col.slotName ||
        col.customerRender ||
        col.customerRenderText ||
        col.tagMap ||
        col.type === 'index' ||
        col.actions ||
        col.type === 'selection' ||
        (col.childColumns && col.childColumns.length)
      );
    },
    formatCell(row, column, cellValue, index, formatter, col) {
      if (col.dict) {
        return col.dict[cellValue];
      }
      const type = typeof formatter;
      if (type === 'function') {
        return formatter({
          row,
          column,
          cellValue,
          index
        });
      }
      if (type === 'string') {
        switch (formatter) {
          case 'date':
            return formatDate(cellValue, 'yyyy-MM-dd');
          case 'datetime':
            return formatDate(cellValue, 'yyyy-MM-dd HH:mm:ss');
          case 'time':
            return formatDate(cellValue, 'HH:mm:ss');
          case 'date-hm':
            return formatDate(cellValue, 'yyyy-MM-dd HH:mm');
          case 'money': // 金额三位分割
            return cellValue.toLocaleString();
          case 'point2': // 保留两位小数
            return NP.round(cellValue, 2).toFixed(2);
          case 'rmb': // 人民币分变成元
            return NP.round(NP.divide(cellValue, 100), 2);
          case 'yuan':
            return cellValue && `￥${cellValue}`;
          case 'percent': // 小数转百分比
            return NP.round(NP.times(cellValue, 100), 2);
          default:
            return cellValue;
        }
      }
      if (type === 'object') {
        if (formatter.type && formatter.type === 'date') {
          return formatDate(cellValue, formatter.content);
        }
      }
      return cellValue;
    },
    getColumnClass(col) {
      const map = {
        orderNumber: 'order-number-cell',
        carNumber: 'car-number-cell',
        negativeAmount: 'negative-amount',
        positiveAmount: 'positive-amount'
      };
      let classStr = '';
      if (col.attrs) {
        const colClass = col.attrs['class-name'] || col.attrs.className;
        if (colClass) {
          classStr += colClass;
        }
      }
      if (map[col.type]) {
        classStr += ` ${map[col.type] || ''}`;
      }
      if (col.actions && col.actions.length) {
        return 'handle-column';
      }
      return classStr;
    },
    getFormatter(col) {
      return col.formatter || col.dict
        ? (row, column, cellValue, index) =>
            this.formatCell(row, column, cellValue, index, col.formatter, col)
        : undefined;
    },
    getTagType(scope, col) {
      const value = scope.row[col.prop];
      return col.tagMap[value] ? col.tagMap[value].type : '';
    },
    getTagText(scope, col) {
      const value = scope.row[col.prop];
      return col.tagMap[value] ? col.tagMap[value].text : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.tabla-col-btn {
  padding: 8px 8px !important;
  font-size: 10px !important;
  height: 30px !important;
  ::v-deep span {
    margin-left: 0 !important;
  }
  ::v-deep button {
    padding: 8px 8px !important;
    font-size: 10px !important;
    span {
      margin-left: 0 !important;
    }
  }
  ::v-deep .el-badge__content {
    border-radius: 7px;
    font-size: 12px;
    height: 14px;
    line-height: 12px;
    padding: 0px 5px;
  }
}
span.tabla-col-btn {
  padding: 0px !important;
}
</style>
