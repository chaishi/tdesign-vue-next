/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs Input VueNext(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Input, InputGroup } from '..';
import { getInputGroupDefaultMount } from './mount';
import { simulateInputChange } from '@test/utils';

describe('Input Component', () => {
  const alignClassNameList = [{ 't-align-left': false }, 't-align-center', 't-align-right'];
  ['left', 'center', 'right'].forEach((item, index) => {
    it(`props.align is equal to ${item}`, () => {
      const wrapper = mount(<Input align={item}></Input>).find('.t-input');
      if (typeof alignClassNameList[index] === 'string') {
        expect(wrapper.classes(alignClassNameList[index])).toBeTruthy();
      } else if (typeof alignClassNameList[index] === 'object') {
        const classNameKey = Object.keys(alignClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.allowInputOverMax works fine', async () => {
    const wrapper = mount(<Input value="Hello" maxlength={5} allowInputOverMax={true}></Input>);
    const inputDom = wrapper.find('input').element;
    simulateInputChange(inputDom, 'Hello TDesign');
    await wrapper.vm.$nextTick();
    const attrDom = wrapper.find('input');
    expect(attrDom.element.value).toBe('Hello');
  });

  it('props.autocomplete works fine', () => {
    const wrapper = mount(<Input autocomplete="https://tdesign.tencent.com/"></Input>).find('input');
    expect(wrapper.attributes('autocomplete')).toBe('https://tdesign.tencent.com/');
  });

  it(`props.autofocus is equal to false`, () => {
    const wrapper = mount(<Input autofocus={false}></Input>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeUndefined();
  });
  it(`props.autofocus is equal to true`, () => {
    const wrapper = mount(<Input autofocus={true}></Input>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('autofocus')).toBeDefined();
  });

  it('props.clearable: clear icon should exist on input mouseenter', async () => {
    const wrapper = mount(<Input value="Default Keyword" clearable={true}></Input>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });
  it('props.clearable: click clear icon could clear input value to be empty', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = mount(
      <Input value="Default Keyword" clearable={true} onClear={onClearFn1} onChange={onChangeFn1}></Input>,
    );
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    wrapper.find('.t-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled(1);
    expect(onClearFn1.mock.calls[0][0].e.stopPropagation).toBeTruthy();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled(1);
    expect(onChangeFn1.mock.calls[0][0]).toBe('');
    expect(onChangeFn1.mock.calls[0][1].e.stopPropagation).toBeTruthy();
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<Input></Input>).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Input disabled={true}></Input>).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount(<Input disabled={false}></Input>).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.format: focus and blur states have different value', async () => {
    const wrapper = mount(<Input format={(val) => `${val} 元`} value="100"></Input>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const attrDom = wrapper.find('input');
    expect(attrDom.element.value).toBe('100');
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    const attrDom1 = wrapper.find('input');
    expect(attrDom1.element.value).toBe('100 元');
  });

  it(`props.inputClass is equal to name1 name2`, () => {
    const wrapper = mount(<Input inputClass="name1 name2"></Input>);
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('name1')).toBeTruthy();
    expect(domWrapper.classes('name2')).toBeTruthy();
  });
  it(`props.inputClass is equal to ['name1', 'name2']`, () => {
    const wrapper = mount(<Input inputClass={['name1', 'name2']}></Input>);
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('name1')).toBeTruthy();
    expect(domWrapper.classes('name2')).toBeTruthy();
  });
  it(`props.inputClass is equal to { name1: true, name2: false }`, () => {
    const wrapper = mount(<Input inputClass={{ name1: true, name2: false }}></Input>);
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('name1')).toBeTruthy();
    expect(domWrapper.classes('name2')).toBeFalsy();
  });

  it('props.label works fine', () => {
    const wrapper = mount(<Input label={() => <span class="custom-node">TNode</span>}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__prefix').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.label works fine', () => {
    const wrapper = mount(<Input v-slots={{ label: () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__prefix').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.maxcharacter: length of value is over than maxcharacter', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Input value="你好 TDesign" maxcharacter={4} onChange={onChangeFn}></Input>);
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('你好');
    expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
  });

  it('props.maxlength: length of value is over than maxlength', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Input value="Hello TDesign" maxlength={5} onChange={onChangeFn}></Input>);
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
    expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
  });

  it('props.name works fine', () => {
    const wrapper = mount(<Input name="input-name"></Input>).find('input');
    expect(wrapper.attributes('name')).toBe('input-name');
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount(<Input placeholder="this is input placeholder"></Input>).find('input');
    expect(wrapper.attributes('placeholder')).toBe('this is input placeholder');
  });

  it('props.prefixIcon works fine', () => {
    const wrapper = mount(<Input prefixIcon={() => <span class="custom-node">TNode</span>}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
  });

  it('slots.prefixIcon works fine', () => {
    const wrapper = mount(<Input v-slots={{ prefixIcon: () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
  });
  it('slots.prefix-icon works fine', () => {
    const wrapper = mount(<Input v-slots={{ 'prefix-icon': () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
  });

  it('props.readonly works fine', () => {
    // readonly default value is false
    const wrapper1 = mount(<Input></Input>).find('.t-input');
    expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
    // readonly = true
    const wrapper2 = mount(<Input readonly={true}></Input>).find('.t-input');
    expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
    // readonly = false
    const wrapper3 = mount(<Input readonly={false}></Input>).find('.t-input');
    expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
  });

  it('props.showClearIconOnEmpty works fine', async () => {
    const wrapper = mount(<Input showClearIconOnEmpty={true}></Input>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });

  it('props.showLimitNumber works fine. `{".t-input__limit-number":{"text":"2/5"}}` should exist', () => {
    const wrapper = mount(<Input showLimitNumber={true} maxlength={5} value="TD"></Input>);
    expect(wrapper.find('.t-input__limit-number').text()).toBe('2/5');
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<Input size={item}></Input>).find('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = mount(<Input status={item}></Input>).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount(<Input suffix={() => <span class="custom-node">TNode</span>}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__suffix').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount(<Input v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__suffix').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.suffixIcon works fine', () => {
    const wrapper = mount(<Input suffixIcon={() => <span class="custom-node">TNode</span>}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.suffixIcon works fine', () => {
    const wrapper = mount(<Input v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('slots.suffix-icon works fine', () => {
    const wrapper = mount(<Input v-slots={{ 'suffix-icon': () => <span class="custom-node">TNode</span> }}></Input>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount(<Input tips="this is a tip"></Input>);
    expect(wrapper.findAll('.t-input__tips').length).toBe(1);
  });

  const attributeValues = ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'];
  ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'].forEach((item, index) => {
    it(`props.type is equal to ${item}`, () => {
      const wrapper = mount(<Input type={item}></Input>).find('input');
      expect(wrapper.attributes('type')).toBe(attributeValues[index]);
    });
  });

  it('props.type is equal password', () => {
    const wrapper = mount(<Input type="password"></Input>);
    expect(wrapper.findAll('.t-icon-browse-off').length).toBe(1);
  });

  it('props.type: password could be visible by click browse icon', async () => {
    const wrapper = mount(<Input type="password"></Input>);
    wrapper.find('.t-icon-browse-off').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-icon-browse').exists()).toBeTruthy();
    const attrDom = wrapper.find('input');
    expect(attrDom.attributes('type')).toBe('text');
    wrapper.find('.t-icon-browse').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
    const attrDom1 = wrapper.find('input');
    expect(attrDom1.attributes('type')).toBe('password');
  });

  it('events.blur works fine', async () => {
    const onFocusFn = vi.fn();
    const onBlurFn1 = vi.fn();
    const wrapper = mount(<Input value="initial-input-value" onFocus={onFocusFn} onBlur={onBlurFn1}></Input>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0]).toBe('initial-input-value');
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(onBlurFn1).toHaveBeenCalled(1);
    expect(onBlurFn1.mock.calls[0][0]).toBe('initial-input-value');
    expect(onBlurFn1.mock.calls[0][1].e.type).toBe('blur');
  });

  it('events.change: empty value could trigger change event', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Input onChange={onChangeFn}></Input>);
    const inputDom = wrapper.find('input').element;
    simulateInputChange(inputDom, 'initial value');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('initial value');
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
  });
  it('events.change: controlled value test', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Input value="TDesign" onChange={onChangeFn}></Input>);
    const inputDom = wrapper.find('input').element;
    simulateInputChange(inputDom, 'Hello TDesign');
    await wrapper.vm.$nextTick();
    const attrDom = wrapper.find('input');
    expect(attrDom.element.value).toBe('TDesign');
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('Hello TDesign');
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
  });
  it('events.change: uncontrolled value test', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Input defaultValue="Hello" onChange={onChangeFn}></Input>);
    const inputDom = wrapper.find('input').element;
    simulateInputChange(inputDom, 'Hello TDesign');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled(1);
    expect(onChangeFn.mock.calls[0][0]).toBe('Hello TDesign');
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
  });

  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount(<Input onClick={fn}></Input>);
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled(1);
    expect(fn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.compositionend works fine', async () => {
    const onCompositionendFn = vi.fn();
    const wrapper = mount(<Input value="输入结束" onCompositionend={onCompositionendFn}></Input>);
    wrapper.find('input').trigger('compositionend');
    await wrapper.vm.$nextTick();
    expect(onCompositionendFn).toHaveBeenCalled(1);
    expect(onCompositionendFn.mock.calls[0][0]).toBe('输入结束');
    expect(onCompositionendFn.mock.calls[0][1].e.type).toBe('compositionend');
  });

  it('events.compositionstart works fine', async () => {
    const onCompositionstartFn = vi.fn();
    const wrapper = mount(<Input value="输入开始" onCompositionstart={onCompositionstartFn}></Input>);
    wrapper.find('input').trigger('compositionstart');
    await wrapper.vm.$nextTick();
    expect(onCompositionstartFn).toHaveBeenCalled(1);
    expect(onCompositionstartFn.mock.calls[0][0]).toBe('输入开始');
    expect(onCompositionstartFn.mock.calls[0][1].e.type).toBe('compositionstart');
  });

  it('events.enter works fine', async () => {
    const onEnterFn1 = vi.fn();
    const wrapper = mount(<Input value="text" onEnter={onEnterFn1}></Input>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('keydown.enter');
    await wrapper.vm.$nextTick();
    expect(onEnterFn1).toHaveBeenCalled(1);
    expect(onEnterFn1.mock.calls[0][0]).toBe('text');
    expect(onEnterFn1.mock.calls[0][1].e.type).toBe('keydown');
  });

  it('events.focus works fine', async () => {
    const onFocusFn = vi.fn();
    const wrapper = mount(<Input onFocus={onFocusFn}></Input>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0]).toBe(undefined);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
  });

  it('events.keydown works fine', async () => {
    const onKeydownFn = vi.fn();
    const wrapper = mount(<Input value="text" onKeydown={onKeydownFn}></Input>);
    wrapper.find('input').trigger('keydown');
    await wrapper.vm.$nextTick();
    expect(onKeydownFn).toHaveBeenCalled(1);
    expect(onKeydownFn.mock.calls[0][0]).toBe('text');
    expect(onKeydownFn.mock.calls[0][1].e.type).toBe('keydown');
  });

  it('events.keypress works fine', async () => {
    const onKeydownFn = vi.fn();
    const wrapper = mount(<Input value="text" onKeydown={onKeydownFn}></Input>);
    wrapper.find('input').trigger('keydown');
    await wrapper.vm.$nextTick();
    expect(onKeydownFn).toHaveBeenCalled(1);
    expect(onKeydownFn.mock.calls[0][0]).toBe('text');
    expect(onKeydownFn.mock.calls[0][1].e.type).toBe('keydown');
  });

  it('events.keyup works fine', async () => {
    const onKeyupFn = vi.fn();
    const wrapper = mount(<Input value="text" onKeyup={onKeyupFn}></Input>);
    wrapper.find('input').trigger('keyup');
    await wrapper.vm.$nextTick();
    expect(onKeyupFn).toHaveBeenCalled(1);
    expect(onKeyupFn.mock.calls[0][0]).toBe('text');
    expect(onKeyupFn.mock.calls[0][1].e.type).toBe('keyup');
  });

  it('events.mouseenter works fine', async () => {
    const onMouseenterFn = vi.fn();
    const wrapper = mount(<Input onMouseenter={onMouseenterFn}></Input>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(onMouseenterFn).toHaveBeenCalled(1);
    expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
  });

  it('events.mouseleave works fine', async () => {
    const onMouseleaveFn = vi.fn();
    const wrapper = mount(<Input onMouseleave={onMouseleaveFn}></Input>);
    wrapper.find('.t-input').trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(onMouseleaveFn).toHaveBeenCalled(1);
    expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
  });

  it('events.paste works fine', async () => {
    const onPasteFn = vi.fn();
    const wrapper = mount(<Input onPaste={onPasteFn}></Input>);
    wrapper.find('input').trigger('paste');
    await wrapper.vm.$nextTick();
    expect(onPasteFn).toHaveBeenCalled(1);
    expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
  });

  it('events.validate works fine', async () => {
    const onValidateFn = vi.fn();
    const wrapper = mount(<Input value="Hello World" maxlength={5} onValidate={onValidateFn}></Input>);
    await wrapper.vm.$nextTick();
    expect(onValidateFn).toHaveBeenCalled(1);
    expect(onValidateFn.mock.calls[0][0].error).toBe('exceed-maximum');
  });

  it('events.wheel works fine', async () => {
    const onWheelFn = vi.fn();
    const wrapper = mount(<Input onWheel={onWheelFn}></Input>);
    wrapper.find('input').trigger('wheel');
    await wrapper.vm.$nextTick();
    expect(onWheelFn).toHaveBeenCalled(1);
    expect(onWheelFn.mock.calls[0][0].e.type).toBe('wheel');
  });
});

describe('InputGroup Component', () => {
  it('props.separate works fine', () => {
    // separate default value is
    const wrapper1 = getInputGroupDefaultMount(InputGroup);
    expect(wrapper1.classes('t-input-group--separate')).toBeFalsy();
    // separate = true
    const wrapper2 = getInputGroupDefaultMount(InputGroup, { separate: true });
    expect(wrapper2.classes('t-input-group--separate')).toBeTruthy();
    // separate = false
    const wrapper3 = getInputGroupDefaultMount(InputGroup, { separate: false });
    expect(wrapper3.classes('t-input-group--separate')).toBeFalsy();
  });
});
