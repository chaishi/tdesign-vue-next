/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs Radio VueNext(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Radio, RadioGroup } from '..';
import { getRadioGroupKidsMount, getRadioGroupDefaultMount } from './mount';

describe('Radio Component', () => {
  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio checked={true} allowUncheck={true} onChange={onChangeFn}></Radio>);
    wrapper.findComponent(Radio).trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(false);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.checked works fine', () => {
    // checked default value is false
    const wrapper1 = mount(<Radio></Radio>);
    expect(wrapper1.classes('t-is-checked')).toBeFalsy();
    // checked = true
    const wrapper2 = mount(<Radio checked={true}></Radio>);
    expect(wrapper2.classes('t-is-checked')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // checked = false
    const wrapper3 = mount(<Radio checked={false}></Radio>);
    expect(wrapper3.classes('t-is-checked')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it(`props.checked is equal to true`, () => {
    const wrapper = mount(<Radio checked={true}></Radio>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.checked).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Radio default={() => <span class="custom-node">TNode</span>}></Radio>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Radio v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Radio>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled works fine', () => {
    // disabled default value is undefined
    const wrapper1 = mount(<Radio>Text</Radio>);
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Radio disabled={true}>Text</Radio>);
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // disabled = false
    const wrapper3 = mount(<Radio disabled={false}>Text</Radio>);
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.disabled works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(
      <Radio disabled={true} onChange={onChangeFn}>
        Text
      </Radio>,
    );
    wrapper.findComponent(Radio).trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it('props.name works fine', () => {
    const wrapper = mount(<Radio name={'radio-gender-name'}></Radio>).find('input');
    expect(wrapper.attributes('name')).toBe('radio-gender-name');
  });

  it('Events.change: checked default value is false, click radio and trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio onChange={onChangeFn}></Radio>);
    wrapper.find('.t-radio__label').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(true);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: checked value is true, without allowUncheck, click radio and trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = mount(<Radio checked={true} onChange={onChangeFn}></Radio>);
    wrapper.find('.t-radio__label').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(true);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
});

describe('RadioGroup Component', () => {
  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { value: 1, allowUncheck: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.allowUncheck works fine', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount(RadioGroup, { value: 1, allowUncheck: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.disabled is equal true', () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { disabled: true });
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled is equal true', () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup, { disabled: true });
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Props.disabled: disabled radio can not trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { disabled: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it('Props.disabled: disabled radio can not trigger change', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount(RadioGroup, { disabled: true }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).not.toHaveBeenCalled();
  });

  it(`props.name is equal to 'custom-radio-name'`, () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { name: 'custom-radio-name' });
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('name')).toBe('custom-radio-name');
    expect(wrapper.element).toMatchSnapshot();
  });

  it(`props.name is equal to 'custom-radio-name'`, () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup, { name: 'custom-radio-name' });
    const domWrapper = wrapper.find('input');
    expect(domWrapper.attributes('name')).toBe('custom-radio-name');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.options works fine. `{".t-radio":4}` should exist', () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup);
    expect(wrapper.findAll('.t-radio').length).toBe(4);
  });

  it('props.options works fine. `".custom-node"` should exist', () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.options works fine. `{".t-radio.t-is-disabled":1}` should exist', () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup);
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(1);
  });

  it('props.options works fine. `{".t-radio":4}` should exist', () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup);
    expect(wrapper.findAll('.t-radio').length).toBe(4);
  });

  it('props.options works fine. `".custom-node"` should exist', () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.options works fine. `{".t-radio.t-is-disabled":1}` should exist', () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup);
    expect(wrapper.findAll('.t-radio.t-is-disabled').length).toBe(1);
  });

  it(`props.value is equal to '2'`, () => {
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { value: '2' });
    const domWrapper = wrapper.find('.t-radio.t-is-checked input');
    expect(domWrapper.element.value).toBe('2');
  });

  it(`props.value is equal to '2'`, () => {
    const wrapper = getRadioGroupKidsMount(RadioGroup, { value: '2' });
    const domWrapper = wrapper.find('.t-radio.t-is-checked input');
    expect(domWrapper.element.value).toBe('2');
  });

  const variantClassNameList = ['t-radio-group__outline', 't-radio-group--primary-filled', 't-radio-group--filled'];
  ['outline', 'primary-filled', 'default-filled'].forEach((item, index) => {
    it(`props.variant is equal to ${item}`, () => {
      const wrapper = mount(<RadioGroup variant={item}></RadioGroup>);
      if (typeof variantClassNameList[index] === 'string') {
        expect(wrapper.classes(variantClassNameList[index])).toBeTruthy();
      } else if (typeof variantClassNameList[index] === 'object') {
        const classNameKey = Object.keys(variantClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('Events.change: default value is 2, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount(RadioGroup, { value: 2 }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: default value is empty, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupDefaultMount(RadioGroup, {}, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });

  it('Events.change: default value is 2, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount(RadioGroup, { value: 2 }, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
  it('Events.change: default value is empty, trigger change after click', async () => {
    const onChangeFn = vi.fn();
    const wrapper = getRadioGroupKidsMount(RadioGroup, {}, { onChange: onChangeFn });
    wrapper.find('.t-radio').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onChangeFn).toHaveBeenCalled();
    expect(onChangeFn.mock.calls[0][0]).toBe(1);
    expect(onChangeFn.mock.calls[0][1].e.type).toBe('click');
  });
});
