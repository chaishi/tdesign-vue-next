import { mount, vi } from '@vue/test-utils';
import { Table, PrimaryTable, EnhancedTable } from '..';

const data = new Array(5).fill(null).map((item, index) => ({
  id: index + 100,
  index: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'test',
}));

// 多种表格组件同时测试
const TABLES = [Table, PrimaryTable, EnhancedTable];

const SIMPLE_COLUMNS = [
  { title: 'Index', colKey: 'index' },
  { title: 'Instance', colKey: 'instance' },
];

const EXPAND_CELL = 'td.t-table__expandable-icon-cell';

/**
 * 可展开表格
 */
TABLES.forEach((TTable) => {
  describe(`Expandable ${TTable.name}`, () => {
    it('expandedRowKeys is empty', () => {
      const wrapper = mount(
        <TTable
          expandedRowKeys={[]}
          rowKey="index"
          data={data}
          columns={SIMPLE_COLUMNS}
          expandedRow={() => <div>expanded row</div>}
        ></TTable>,
      );
      expect(wrapper.find('.t-table__expandable-icon-cell').exists()).toBeTruthy();
      expect(wrapper.find('.t-table__expanded-row').exists()).toBeFalsy();
    });

    it('expandedRowKeys is equal [101]', () => {
      const expandedRowKeys = [101];
      const wrapper = mount({
        render() {
          return (
            <TTable
              expandedRowKeys={expandedRowKeys}
              rowKey="index"
              data={data}
              columns={SIMPLE_COLUMNS}
              expandedRow={() => <div>expanded row</div>}
            ></TTable>
          );
        },
      });

      // there is an expanded row as default
      const expandedRow = wrapper.find('.t-table__expanded-row');
      expect(expandedRow.exists()).toBeTruthy();

      const expandIcons = wrapper.findAll(EXPAND_CELL);
      expect(expandIcons[0].find('.t-table__row--collapsed').exists()).toBeTruthy();
      // 101 is expanded
      expect(expandIcons[1].find('.t-table__row--expanded').exists()).toBeTruthy();
      expect(expandIcons[1].find('.t-positive-rotate-90').exists()).toBeTruthy();
    });

    it('onExpandChange', async () => {
      const expandedRowKeys = [101];
      const fn = vi.fn();
      const wrapper = mount(
        <TTable
          expandedRowKeys={expandedRowKeys}
          rowKey="index"
          data={data}
          columns={SIMPLE_COLUMNS}
          onExpandChange={fn}
          expandedRow={() => <div>expanded row</div>}
        ></TTable>,
      );

      // trigger the first row expand
      wrapper.find('.t-table__expand-box').trigger('click');
      expect(fn).toHaveBeenCalled();
      // onExpandChange has two arguments
      expect(fn.mock.calls[0].length).toBe(2);
      // first argument is expandedRowKeys
      expect(fn.mock.calls[0][0]).toEqual([101, 100]);
      // second argument is currentRowData and expandedRowData
      expect(fn.mock.calls[0][1]).toEqual({
        currentRowData: data[0],
        expandedRowData: [data[0], data[1]],
      });

      // expand icon rotate 90deg
      const expandIcons = wrapper.findAll(EXPAND_CELL);
      wrapper.setProps({
        expandedRowKeys: fn.mock.calls[0][0],
      });
      await wrapper.vm.$nextTick();
      expect(expandIcons[0].find('.t-table__row--expanded').exists()).toBeTruthy();
      expect(expandIcons[0].find('.t-positive-rotate-90').exists()).toBeTruthy();

      // expect can not trigger expand on row click without `expandOnRowClick`
      const trList = wrapper.findAll('tr');
      trList[2].trigger('click');
      const icons = wrapper.findAll(EXPAND_CELL);
      expect(icons[2].find('.t-table__row--expanded').exists()).toBeFalsy();
    });

    it('expand on row click', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <TTable
          rowKey="index"
          data={data}
          columns={SIMPLE_COLUMNS}
          onExpandChange={fn}
          expandOnRowClick={true}
          expandedRow={() => <div>expanded row</div>}
        ></TTable>,
      );

      // click first row
      wrapper.find('tbody tr').trigger('click');
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0].length).toBe(2);
      expect(fn.mock.calls[0][0]).toEqual([100]);
      expect(fn.mock.calls[0][1]).toEqual({
        currentRowData: data[0],
        expandedRowData: [data[0]],
      });
      await wrapper.vm.$nextTick();
      const icons = wrapper.findAll(EXPAND_CELL);
      expect(icons[0].find('.t-table__row--expanded').exists()).toBeTruthy();
    });

    it('expandedRow supports slot', () => {
      const className = 'custom-expanded-row';
      const wrapper = mount(
        <TTable
          rowKey="index"
          data={data}
          columns={SIMPLE_COLUMNS}
          expandedRowKeys={[101]}
          v-slots={{
            expandedRow: () => <div class={className}>expanded row</div>,
          }}
        ></TTable>,
      );
      expect(wrapper.find('.t-table__expanded-row').exists()).toBeTruthy();
      expect(wrapper.find(`.${className}`).exists()).toBeTruthy();
    });

    it('can hide expand icon with `expandIcon=false`', () => {
      const wrapper = mount(
        <TTable
          rowKey="index"
          data={data}
          columns={SIMPLE_COLUMNS}
          expandedRowKeys={[101]}
          expandIcon={false}
          v-slots={{
            expandedRow: () => <div>expanded row</div>,
          }}
        ></TTable>,
      );
      expect(wrapper.find('.t-table__expandable-icon-cell').exists()).toBeFalsy();
      expect(wrapper.find('.t-table__expanded-row').exists()).toBeTruthy();
    });

    it.todo('expand icon can be anything');
  });
});
