import { toRefs, Ref, ref, computed } from 'vue';
import get from 'lodash/get';
import { BaseTableProps } from '../interface';
import { on, off } from '../../utils/dom';
import { ARROW_DOWN_REG, ARROW_UP_REG, SPACE_REG } from '../../_common/js/common';
import { RowEventContext, TableRowData } from '../type';

export function useHoverKeyboardEvent(props: BaseTableProps, tableRef: Ref<HTMLDivElement>) {
  const { hover, data } = toRefs(props);
  const hoverRow = ref<string | number>();
  const currentHoverRowIndex = ref(-1);

  // 单行高亮场景，不需要键盘悬浮效果
  const needKeyboardRowHover = computed(() => !(hover.value && props.activeRowType === 'single'));

  const onHoverRow = (ctx: RowEventContext<TableRowData>) => {
    const rowValue = get(ctx.row, props.rowKey);
    if (hoverRow.value === rowValue) {
      hoverRow.value = undefined;
    } else {
      hoverRow.value = rowValue;
    }
    currentHoverRowIndex.value = ctx.index;
  };

  const clearHoverRow = () => {
    hoverRow.value = undefined;
    currentHoverRowIndex.value = -1;
  };

  const keyboardDownListener = (e: KeyboardEvent) => {
    if (!needKeyboardRowHover.value) return;
    const code = e.key?.trim() || e.code;
    if (ARROW_DOWN_REG.test(code)) {
      const index = Math.min(data.value.length - 1, currentHoverRowIndex.value + 1);
      onHoverRow({ row: data.value[index], index, e });
    } else if (ARROW_UP_REG.test(code)) {
      const index = Math.max(0, currentHoverRowIndex.value - 1);
      onHoverRow({ row: data.value[index], index, e });
    } else if (SPACE_REG.test(code) && props.activeRowType !== 'multiple') {
      const index = currentHoverRowIndex.value;
      onHoverRow({ row: data.value[index], index, e });
    }
  };

  const addRowHoverKeyboardListener = () => {
    on(tableRef.value, 'keydown', keyboardDownListener);
  };

  const removeRowHoverKeyboardListener = () => {
    off(tableRef.value, 'keydown', keyboardDownListener);
  };

  return {
    hoverRow,
    needKeyboardRowHover,
    clearHoverRow,
    addRowHoverKeyboardListener,
    removeRowHoverKeyboardListener,
  };
}

export default useHoverKeyboardEvent;
