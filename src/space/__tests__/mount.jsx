import { mount } from '@vue/test-utils';
import { Button } from '../../button';

export function getSpaceDefaultMount(Space, props, events) {
  return mount({
    render() {
      return (
        <Space {...props} {...events} v-slots={props['v-slots']}>
          <Button>Text</Button>
          <Button>Text</Button>
          <Button>Text</Button>
        </Space>
      );
    },
  });
}
