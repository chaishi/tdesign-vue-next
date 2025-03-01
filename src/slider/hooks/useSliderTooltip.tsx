import { TooltipProps } from '@src/tooltip';
import { ref, computed, ComputedRef, Ref } from 'vue';
import { TdSliderProps } from '../type';
import { formatLabel } from '../util/common';

const initialProps: TooltipProps & { overlayClassName: string } = {
  visible: false,
  trigger: 'hover',
  showArrow: true,
  overlayInnerStyle: undefined,
  overlayClassName: undefined,
  attach: 'body',
  theme: 'default',
};

export interface TooltipConfig {
  tooltipProps: boolean | TooltipProps;
  vertical: boolean;
  value: number;
  label: TdSliderProps['label'];
}

/**
 * 聚合管理滑块tooltip内容hook
 * @param tooltipProps tooltip属性配置
 * @param vertical 是否垂直展示
 * @returns
 */
export const useSliderTooltip = (tooltipConfig: Ref<TooltipConfig>) => {
  const tooltipRef = ref();
  const showTooltip = computed({
    get() {
      return !tooltipConfig.value.tooltipProps === false;
    },
    set(val) {
      return val;
    },
  });
  const normalizeProps = ref<TooltipProps & { overlayClassName: string }>({ ...initialProps });
  /** 开关显示tooltip */
  const toggleTooltip = (toState: boolean) => {
    if (!showTooltip.value) return;
    normalizeProps.value.visible = toState;
  };

  /** 合并最终tooltip属性，以外部同名属性覆盖初始化属性 */
  const validProps = computed(() => {
    const { vertical, tooltipProps, label, value } = tooltipConfig.value;
    const placement = vertical ? 'right' : 'top';
    const content = formatLabel(label, value);
    if (tooltipProps instanceof Object) {
      if (!tooltipProps?.placement) {
        normalizeProps.value.placement = placement;
      }
      return { ...normalizeProps.value, ...tooltipProps, content };
    }
    return { ...normalizeProps.value, placement, content };
  });

  return {
    tooltipRef,
    tooltipProps: validProps as ComputedRef<TdSliderProps['tooltipProps']>,
    toggleTooltip,
    showTooltip,
  };
};
