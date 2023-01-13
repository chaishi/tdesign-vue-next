import { ref, onMounted, computed, watch, nextTick, toRefs, inject, onBeforeMount } from 'vue';
import { InputValue, TdInputProps } from './type';
import { FormItemInjectionKey } from '../form/const';
import useVModel from '../hooks/useVModel';
import { useFormDisabled } from '../form/hooks';
import useLengthLimit from './useLengthLimit';

export interface ExtendsTdInputProps extends TdInputProps {
  showInput: boolean;
  keepWrapperWidth: boolean;
  allowTriggerBlur: boolean;
}

export default function useInput(props: ExtendsTdInputProps, expose: (exposed: Record<string, any>) => void) {
  const { value, modelValue } = toRefs(props);
  const inputValue = ref<InputValue>();
  const clearIconRef = ref(null);
  const innerClickElement = ref();
  const disabled = useFormDisabled();
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const isHover = ref(false);
  const focused = ref(false);
  const renderType = ref(props.type);
  const inputRef = ref<HTMLInputElement>(null);

  const limitParams = computed(() => ({
    value: innerValue.value === undefined ? undefined : String(innerValue.value),
    status: props.status,
    maxlength: props.maxlength,
    maxcharacter: props.maxcharacter,
    allowInputOverMax: props.allowInputOverMax,
    onValidate: props.onValidate,
  }));
  const { limitNumber, getValueByLimit, tStatus } = useLengthLimit(limitParams);

  const showClear = computed(() => {
    return (
      ((innerValue.value && !disabled.value && props.clearable && !props.readonly) || props.showClearIconOnEmpty) &&
      isHover.value
    );
  });

  const focus = () => inputRef.value?.focus();
  const blur = () => inputRef.value?.blur();

  const emitFocus = (e: FocusEvent) => {
    inputValue.value = innerValue.value;
    if (props.disabled || props.readonly) return;
    focused.value = true;
    props.onFocus?.(innerValue.value, { e });
  };

  const emitClear = ({ e }: { e: MouseEvent }) => {
    setInnerValue('', { e, trigger: 'clear' });
    props.onClear?.({ e });
  };

  const onClearIconMousedown = (e: MouseEvent) => {
    innerClickElement.value = e.target;
  };

  const emitPassword = () => {
    const toggleType = renderType.value === 'password' ? 'text' : 'password';
    renderType.value = toggleType;
  };

  const setInputElValue = (v: InputValue = '') => {
    const inputEl = inputRef.value as HTMLInputElement;
    if (!inputEl) return;
    const sV = String(v);
    if (!inputEl.value) {
      return;
    }
    if (inputEl.value !== sV) {
      inputEl.value = sV;
    }
  };
  const inputValueChangeHandle = (e: InputEvent | CompositionEvent) => {
    const { target } = e;
    let val = (target as HTMLInputElement).value;
    // over length: allow delete; not add
    if (props.type !== 'number' && val.length > innerValue.value?.length) {
      val = getValueByLimit(val);
    }
    setInnerValue(val, { e } as { e: InputEvent; trigger: 'input' });
    // 受控
    nextTick(() => {
      setInputElValue(innerValue.value);
    });
  };

  const handleInput = (e: InputEvent) => {
    const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
    if (e.isComposing || checkInputType) return;
    inputValueChangeHandle(e);
  };

  const isClearIcon = () => {
    let tmp = innerClickElement.value;
    if (!tmp || !tmp.tagName || !clearIconRef.value?.$el || !['path', 'svg'].includes(tmp.tagName)) return false;
    while (tmp) {
      if (clearIconRef.value?.$el === tmp) {
        return true;
      }
      tmp = tmp.parentNode;
    }
    return false;
  };

  const formItem = inject(FormItemInjectionKey, undefined);
  const formatAndEmitBlur = (e: FocusEvent) => {
    if (props.format) {
      inputValue.value = props.format(innerValue.value);
    }
    focused.value = false;
    // 点击清空按钮的时候，不应该触发 onBlur 事件。这个规则在表格单元格编辑中有很重要的应用
    if (!isClearIcon() && props.allowTriggerBlur) {
      props.onBlur?.(innerValue.value, { e });
      formItem?.handleBlur();
    }
  };

  const onHandleCompositionend = (e: CompositionEvent) => {
    inputValueChangeHandle(e);
    props.onCompositionend?.(innerValue.value, { e });
  };
  const onHandleCompositionstart = (e: CompositionEvent) => {
    props.onCompositionstart?.(innerValue.value, { e });
  };

  const onRootClick = (e: MouseEvent) => {
    inputRef.value?.focus();
    props.onClick?.({ e });
  };

  watch(
    () => props.autofocus,
    (value) => {
      if (value === true) {
        nextTick(() => {
          inputRef.value?.focus();
        });
      }
    },
    { immediate: true },
  );

  watch(
    innerValue,
    (val) => {
      const newVal = getValueByLimit(val);
      const { format } = props;
      if (format) {
        const r = format(newVal);
        if (inputValue.value !== r) {
          inputValue.value = r;
        }
      } else {
        inputValue.value = newVal;
      }
      // limit props value
      if (newVal !== val) {
        setInnerValue(newVal, { trigger: 'initial' });
      }
    },
    { immediate: true },
  );

  watch(
    () => props.type,
    (v) => {
      renderType.value = v;
    },
    { immediate: true },
  );

  expose({
    inputRef,
    focus,
    blur,
  });

  return {
    isHover,
    focused,
    renderType,
    showClear,
    inputRef,
    clearIconRef,
    inputValue,
    limitNumber,
    tStatus,
    emitFocus,
    formatAndEmitBlur,
    onHandleCompositionend,
    onHandleCompositionstart,
    onRootClick,
    emitPassword,
    handleInput,
    emitClear,
    onClearIconMousedown,
    innerValue,
  };
}
