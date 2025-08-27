import { Meta, StoryObj } from '@storybook/react';
import { VmFill16 } from '@xsky/eris-icons';
import React, { useEffect, useMemo } from 'react';
import { BuiltInFilterFn, Row } from '@tanstack/react-table';
import lodash from 'lodash';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  IconButton,
  RadioGroup,
  TableField,
  Switch,
  DataTableProps,
  Alert,
  CheckboxGroup,
  TableContextMenu,
  Menu,
} from '@xsky/eris-ui';

const meta: Meta<typeof DataTable> = {
  title: 'DATA DISPLAY/DataTable', // Change this to the correct name of your new component
  component: DataTable,
  tags: ['visual-test'],
  argTypes: {
    uniqueKey: {
      type: 'string',
      defaultValue: 'id',
      description: '唯一键',
    },
    fields: {
      control: {
        type: 'object',
      },
      defaultValue: [],
      description: '列配置',
    },
    data: {
      control: {
        type: 'object',
      },
      defaultValue: [],
      description: '数据',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '是否加载中',
    },
    showHeader: {
      control: {
        type: 'boolean',
      },
      type: 'boolean',
      defaultValue: true,
      description: '是否显示表头',
    },
    rowSelection: {
      control: {
        type: 'object',
      },
      defaultValue: {},
      description: '行选择',
    },
    enableRowFocus: {
      type: 'boolean',
      defaultValue: false,
      description: '是否启用行聚焦',
    },
    scroll: {
      control: {
        type: 'object',
      },
      defaultValue: undefined,
      description: '滚动配置',
    },
    filteredValue: {
      control: {
        type: 'object',
      },
      defaultValue: {},
      description: '筛选值',
    },
    columnResizable: {
      type: 'boolean',
      defaultValue: false,
      description: '是否启用列宽调整',
    },
    virtualized: {
      type: 'boolean',
      defaultValue: false,
      description: '是否启用虚拟行',
    },
    onFilterChange: {
      description: '筛选',
      action: 'onFilterChange',
      control: {
        type: 'object',
      },
    },
    onSortOrderChange: {
      description: '排序',
      action: 'onSortOrderChange',
      control: {
        type: 'object',
      },
    },
    onFocusTableRow: {
      description: '聚焦行',
      action: 'onFocusTableRow',
      control: {
        type: 'object',
      },
    },
    onClickTableCell: {
      description: '点击单元格',
      action: 'onClickTableCell',
      control: {
        type: 'object',
      },
    },
    onColumnSizingChange: {
      description: '列宽调整',
      action: 'onColumnSizingChange',
      control: {
        type: 'object',
      },
    },
    showEmpty: {
      type: 'boolean',
      defaultValue: true,
      description: '是否显示空状态',
    },
    EmptyDescription: {
      type: 'string',
      defaultValue: '暂无内容',
      description: '空状态描述',
    },
  },
};

type Story = StoryObj<typeof DataTable<any>> & {
  [key: string]: any;
};

interface Person {
  id: number;
  name: string;
  age: number;
  country: string;
  email?: string;
  info?: string;
}

export const Basic: Story = {
  data: [
    {
      id: 2,
      name: 'Bob',
      age: 30,
      country: 'Canada',
      info: 'info',
    },
    {
      id: 3,
      name: 'Charlie',
      age: 35,
      country: 'UK',
      info: 'info',
    },
    {
      id: 1,
      name: 'Alice',
      age: 25,
      country: 'USA',
      info: 'info',
    },
    {
      id: 4,
      name: 'David',
      age: 40,
      country: 'USA',
      info: 'info',
    },
  ],
  args: {
    // Provide default values for your props here
    fields: [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ],
    data: [
      {
        id: 2,
        name: 'Bob',
        age: 30,
        country: 'Canada',
        info: 'info',
      },
      {
        id: 3,
        name: 'Charlie',
        age: 35,
        country: 'UK',
        info: 'info',
      },
      {
        id: 1,
        name: 'Alice',
        age: 25,
        country: 'USA',
        info: 'info',
      },
      {
        id: 4,
        name: 'David',
        age: 40,
        country: 'USA',
        info: 'info',
      },
    ],
    // Add more default values for your props as needed
  },
};

function SelectStory(props: any) {
  const [defaultShow, setDefaultShow] = React.useState(false);
  const [type, setType] = React.useState<string>('checkbox');
  const [selection, setSelection] = React.useState({});

  const fields: TableField<Person>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (value: string) => {
        return (
          <span className="text-primary-normal flex items-center gap-0.5">
            {value}
            <IconButton>
              <VmFill16></VmFill16>
            </IconButton>
          </span>
        );
      },
    },
    {
      key: 'age',
      header: 'Age',
    },
    {
      key: 'country',
      header: 'Country',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Switch label="defaultShowSelect" checked={defaultShow} onChange={setDefaultShow} />
        <RadioGroup
          value={type}
          onChange={(value) => {
            setType(value);
          }}
          options={[
            {
              label: 'checkbox',
              value: 'checkbox',
            },
            {
              label: 'radio',
              value: 'radio',
            },
          ]}
        />
      </div>
      <Alert content={defaultShow ? '选择框始终显示' : '选择框默认隐藏，鼠标悬停或选中时显示'} />
      <DataTable
        fields={fields}
        data={Basic.data}
        rowSelection={{
          state: selection,
          onChange: setSelection,
          type: type,
          defaultShowSelect: defaultShow,
          getCheckboxProps: (record?: any) => {
            if (!record) {
              return {
                disabled: true,
                tooltip: '禁止全选',
              };
            }
            if (record.name === 'Bob') {
              return {
                disabled: true,
                tooltip: 'Bob is disabled',
              };
            }
          },
        }}
        {...props}
      ></DataTable>
    </div>
  );
}

/**
 * 选择
 *
 * 可以通过 rowSelection 来设置选择
 */
export const Selection: Story = {
  render: (props) => <SelectStory {...props}></SelectStory>,
};

/**
 * 隐藏表头
 */
export const HideHeader: Story = {
  args: {
    fields: [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ],
    data: Basic.data,
    showHeader: false,
  },
};

/**
 * 启用行聚焦，可以通过 onFocusTableRow 来获取聚焦行，通常用于点击一行是弹出当前资源的信息
 */
export const EnableFocusRow: Story = {
  args: {
    fields: [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ],
    data: Basic.data,
    enableRowFocus: true,
  },
};

function ControlledFocusRowStory(props: DataTableProps<any>) {
  const [focusRow, setFocusRow] = React.useState<number>(0);
  const [selectState, setSelectState] = React.useState({});

  const fields: TableField<Person>[] = useMemo(() => {
    return [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <Button size="sm" onClick={() => setFocusRow(focusRow <= 0 ? 0 : focusRow - 1)}>
          prev
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setFocusRow(focusRow >= Basic.data.length - 1 ? Basic.data.length - 1 : focusRow + 1);
          }}
        >
          next
        </Button>
      </div>
      <DataTable
        {...props}
        fields={fields}
        data={Basic.data}
        rowSelection={{
          type: 'checkbox',
          state: selectState,
          onChange: setSelectState,
        }}
        enableRowFocus
        currentFocusedRow={focusRow}
        onFocusTableRow={(rowData: any, index: number) => {
          setSelectState((prev) => ({
            ...prev,
            [Basic.data[index].id]: true,
          }));
          setFocusRow(index);
        }}
      />
    </div>
  );
}

export const ControlledFocusRow: Story = {
  render: (props) => <ControlledFocusRowStory {...props}></ControlledFocusRowStory>,
};

function SortingStory(props: any) {
  const fields: TableField<Person>[] = useMemo(() => {
    const fields: TableField<Person>[] = [
      {
        key: 'name',
        header: 'Name',
        sorter: (a: Row<Person>, b: Row<Person>) => {
          return a.original.name.localeCompare(b.original.name);
        },
      },
      {
        key: 'age',
        header: 'Age',
        sorter: 'basic',
        defaultSortOrder: 'asc', // 非受控模式：使用 defaultSortOrder
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];

    return fields;
  }, []);

  return <DataTable {...props} fields={fields} data={Basic.data} />;
}

function ManualSortingStory(props: any) {
  const [sorting, setSorting] = React.useState<NonNullable<DataTableProps<Person>['sorting']>>([]);
  const [sortedData, setSortedData] = React.useState<Person[]>(Basic.data);

  const fields = React.useMemo(
    () => [
      {
        key: 'name',
        header: 'Name',
        sorter: true,
      },
      {
        key: 'age',
        header: 'Age',
        sorter: true,
      },
      {
        key: 'country',
        header: 'Country',
        sorter: true,
      },
    ],
    [],
  );

  useEffect(() => {
    // 根据排序状态来获取数据
    if (!sorting.length) return setSortedData(Basic.data);
    const sortedData = [
      ...lodash.orderBy<Person>(Basic.data, [sorting[0].id], sorting[0].desc ? 'desc' : 'asc'),
    ];
    setSortedData(sortedData);
  }, [sorting]);

  const handleSort = (key: string) => {
    const sort = key ? [{ id: key, desc: true }] : [];
    setSorting(sort);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Button onClick={() => handleSort('name')}>Sort by Name descending</Button>
        <Button onClick={() => handleSort('age')}>Sort by Age descending</Button>
        <Button onClick={() => handleSort('country')}>Sort by Country descending</Button>
        <Button onClick={() => handleSort('')}>Clear sorting</Button>
      </div>
      <DataTable
        {...props}
        fields={fields}
        data={sortedData}
        sorting={sorting}
        onSortOrderChange={setSorting}
      ></DataTable>
    </div>
  );
}

/**
 * 排序
 */
export const Sorting: Story = {
  render: (props) => <SortingStory {...props}></SortingStory>,
};

/**
 * 手动排序，通常用于服务端
 */
export const ManualSorting: Story = {
  render: (props) => {
    return <ManualSortingStory {...props}></ManualSortingStory>;
  },
};

function FilterStory(props: any) {
  const [filterType, setFilterType] = React.useState<'single' | 'multiple'>('single');
  const [filterFn, setFilterFn] = React.useState<BuiltInFilterFn>('equals');

  const fields: TableField<Person>[] = useMemo(() => {
    const fields: TableField<Person>[] = [
      {
        key: 'name',
        header: 'Name',
        sorter: 'text',
        filterType: filterType,
        onFilter: filterFn,
        filters: [
          {
            label: '测试',
            value: 'Alice',
          },
          {
            label: 'Bob name is very loooooooooooooooooong',
            value: 'Bob',
          },
          {
            label: 'Charlie',
            value: 'Charlie',
          },
          {
            label: 'David',
            value: 'David',
          },
          {
            label: 'Alice1',
            value: 'Alice1',
          },
          {
            label: 'Bob1',
            value: 'Bob1',
          },
        ],
      },
      {
        key: 'age',
        sorter: 'basic',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];
    return fields;
  }, [filterFn, filterType]);

  const filterFnKeys = [
    'includesString',
    'includesStringSensitive',
    'equalsString',
    'arrIncludes',
    'arrIncludesAll',
    'arrIncludesSome',
    'equals',
    'weakEquals',
    'inNumberRange',
  ];

  return (
    <div className="flex flex-col gap-1">
      <span className=" text-title">是否多选</span>
      <RadioGroup
        value={filterType}
        onChange={(value) => {
          setFilterType(value as 'single' | 'multiple');
        }}
        options={[
          {
            label: 'single',
            value: 'single',
          },
          {
            label: 'multiple',
            value: 'multiple',
          },
        ]}
      />
      <span className="text-title">筛选规则</span>
      <RadioGroup
        className="flex flex-wrap"
        value={filterFn}
        onChange={(value) => {
          setFilterFn(value as BuiltInFilterFn);
        }}
        options={filterFnKeys.map((key) => ({
          label: key,
          value: key,
        }))}
      />
      <DataTable {...props} fields={fields} data={Basic.data}></DataTable>
    </div>
  );
}

/**
 * 内置筛选
 */
export const Filter: Story = {
  render: (props) => <FilterStory {...props}></FilterStory>,
};

function ManualFilterStory(props: any) {
  const [filter, setFilter] = React.useState<NonNullable<DataTableProps<Person>['columnFilters']>>(
    [],
  );
  const [filteredData, setFilteredData] = React.useState<Person[]>(Basic.data);

  const fields: TableField<Person>[] = useMemo(() => {
    const fields: TableField<Person>[] = [
      {
        key: 'name',
        header: 'Name',
        sorter: 'text',
        filters: [
          {
            label: '测试',
            value: 'Alice',
          },
          {
            label: 'Bob',
            value: 'Bob',
          },
          {
            label: 'Charlie',
            value: 'Charlie',
          },
          {
            label: 'David',
            value: 'David',
          },
          {
            label: 'Alice1',
            value: 'Alice1',
          },
          {
            label: 'Bob1',
            value: 'Bob1',
          },
        ],
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];
    return fields;
  }, []);

  useEffect(() => {
    // 根据筛选状态来获取数据
    if (!filter.length) return setFilteredData(Basic.data);
    const filteredData = Basic.data.filter((row: Person) => {
      const nameFilter = filter.find((f) => f.id === 'name');
      if (nameFilter) {
        return row.name === nameFilter.value;
      }
      return true;
    });
    setFilteredData(filteredData);
  }, [filter]);

  return (
    <DataTable
      {...props}
      fields={fields}
      data={filteredData}
      onFilterChange={setFilter}
    ></DataTable>
  );
}

/**
 * 手动筛选，通常用于服务端
 */
export const ManualFilter: Story = {
  render: (props) => {
    return <ManualFilterStory {...props}></ManualFilterStory>;
  },
};

function ControlledFilterStory() {
  const [columnFilters, setColumnFilters] = React.useState<
    NonNullable<DataTableProps<Person>['columnFilters']>
  >([]);
  const [filteredData, setFilteredData] = React.useState<Person[]>(Basic.data);

  const fields: TableField<Person>[] = useMemo(() => {
    return [
      {
        key: 'name',
        header: 'Name',
        filters: [
          {
            label: 'Alice',
            value: 'Alice',
          },
          {
            label: 'Bob',
            value: 'Bob',
          },
          {
            label: 'Charlie',
            value: 'Charlie',
          },
          {
            label: 'David',
            value: 'David',
          },
        ],
        filterType: 'multiple',
        onFilter: 'arrIncludes',
      },
      {
        key: 'age',
        header: 'Age',
        sorter: 'basic',
      },
      {
        key: 'country',
        header: 'Country',
        filters: [
          {
            label: 'USA',
            value: 'USA',
          },
          {
            label: 'Canada',
            value: 'Canada',
          },
          {
            label: 'UK',
            value: 'UK',
          },
        ],
        filterType: 'single',
        onFilter: 'equals',
      },
    ];
  }, []);

  // 模拟外部数据过滤逻辑
  useEffect(() => {
    let filtered = [...Basic.data];

    columnFilters.forEach((filter) => {
      if (filter.id === 'name' && filter.value) {
        const filterValues = Array.isArray(filter.value) ? filter.value : [filter.value];
        filtered = filtered.filter((item) => filterValues.includes(item.name));
      }

      if (filter.id === 'country' && filter.value) {
        filtered = filtered.filter((item) => item.country === filter.value);
      }
    });

    setFilteredData(filtered);
  }, [columnFilters]);

  const clearFilters = () => {
    setColumnFilters([]);
  };

  const setNameFilter = () => {
    setColumnFilters([{ id: 'name', value: ['Alice', 'Bob'] }]);
  };

  const setCountryFilter = () => {
    setColumnFilters([{ id: 'country', value: 'USA' }]);
  };

  const setMultipleFilters = () => {
    setColumnFilters([
      { id: 'name', value: ['Alice', 'Charlie'] },
      { id: 'country', value: 'USA' },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={clearFilters}>清除所有过滤</Button>
        <Button onClick={setNameFilter}>过滤姓名 (Alice, Bob)</Button>
        <Button onClick={setCountryFilter}>过滤国家 (USA)</Button>
        <Button onClick={setMultipleFilters}>组合过滤</Button>
      </div>

      <Alert
        content={`当前过滤条件: ${columnFilters.length === 0 ? '无' : columnFilters.map((f) => `${f.id}: ${Array.isArray(f.value) ? f.value.join(', ') : f.value}`).join(' | ')}`}
      />

      <Alert content={`显示 ${filteredData.length} / ${Basic.data.length} 条数据`} />

      <DataTable
        fields={fields}
        data={filteredData}
        columnFilters={columnFilters}
        onFilterChange={setColumnFilters}
      />
    </div>
  );
}

/**
 * 受控过滤
 *
 * 外部完全控制过滤状态，支持：
 * - 通过 columnFilters 属性外部设置过滤条件
 * - 通过 onFilterChange 监听过滤变化
 * - 外部按钮控制过滤状态
 * - 组合多个过滤条件
 * - 一键清除所有过滤
 */
export const ControlledFilter: Story = {
  name: 'Controlled filter',
  render: () => <ControlledFilterStory />,
};

/**
 * 固定表头
 */
export const StickyHeader: Story = {
  render: (props) => {
    return (
      <div className="h-[800px]">
        <DataTable
          {...props}
          virtualized
          fields={[
            {
              key: 'name',
              header: 'Name',
              width: 100,
            },
            {
              key: 'age',
              header: 'Age',
              width: 100,
            },
            {
              key: 'country',
              header: 'Country',
            },
          ]}
          data={Array.from({ length: 1000 }).map((_, idx) => ({
            id: idx,
            name: 'name' + idx,
            age: idx,
            country: 'country' + idx,
          }))}
          scroll={{
            y: '100%',
          }}
          // columnResizable
        ></DataTable>
      </div>
    );
  },
};

function StickyRowStory(props: any) {
  const [selection, setSelection] = React.useState({});

  return (
    <div>
      <DataTable
        {...props}
        rowSelection={{
          state: selection,
          onChange: setSelection,
        }}
        virtualized
        columnResizable
        fields={[
          {
            key: 'info',
            header: 'info',
            fixedDir: 'left',
            width: 200,
            children: [
              {
                key: 'id',
                header: 'ID',
                fixedDir: 'left',
                width: 100,
              },
              {
                key: 'name',
                header: 'Name',
                fixedDir: 'left',
                width: 100,
              },
            ],
          },
          {
            key: 'age',
            header: 'Age',
          },
          {
            key: 'country',
            header: 'Country',
            ellipsis: true,
            width: 500,
          },
          {
            key: 'country0',
            header: 'Country0',
            ellipsis: true,
            maxWidth: 0.18,
          },
          {
            key: 'countryInfo0',
            header: 'CountryInfo0',
            align: 'center',
            children: [
              {
                key: 'country00',
                header: 'Country00',
                ellipsis: true,
                maxWidth: 0.18,
              },
              {
                key: 'country000',
                header: 'Country000',
                ellipsis: true,
                maxWidth: 0.18,
              },
            ],
          },
          {
            key: 'countryInfo',
            header: 'CountryInfo',
            ellipsis: true,
            fixedDir: 'right',
            width: 300,
            children: [
              {
                key: 'country1',
                header: 'Country1',
                fixedDir: 'right',
                width: 150,
              },
              {
                key: 'country2',
                header: 'Country2',
                fixedDir: 'right',
                width: 150,
              },
            ],
          },
        ]}
        data={Array.from({ length: 100 }).map((_, idx) => ({
          id: idx,
          name: 'name' + idx,
          age: idx,
          country:
            'this is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong' + idx,
          country0:
            'this is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong' + idx,
          country00:
            'this is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong' + idx,
          country000:
            'this is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong' + idx,
          country1: 'country' + idx,
          country2: 'country' + idx,
        }))}
        scroll={{
          y: '300px',
          x: 'max-content',
        }}
        onColumnSizingChange={console.log}
      ></DataTable>
    </div>
  );
}

export const StickyRow: Story = {
  tags: ['skip-test'],
  render: (props) => {
    return <StickyRowStory {...props}></StickyRowStory>;
  },
};

function ColumnResizingStory(props: any) {
  const [selection, setSelection] = React.useState({});

  return (
    <DataTable
      {...props}
      onColumnSizingChange={console.log}
      rowSelection={{
        state: selection,
        onChange: setSelection,
      }}
      fields={[
        {
          key: 'id',
          header: 'ID',
          fixedDir: 'left',
          width: 100,
          sorter: (a: Row<Person>, b: Row<Person>) => {
            return a.original.name.localeCompare(b.original.name);
          },
          filters: [
            {
              label: '测试',
              value: 'Alice',
            },
          ],
        },
        {
          key: 'name',
          header: 'Name',
          fixedDir: 'left',
          width: 100,
          ellipsis: true,
        },
        {
          key: 'age',
          header: 'Age',
          align: 'right',
          width: 200,
        },
        {
          key: 'country',
          header: 'Country',
          align: 'left',
          width: 200,
        },
        {
          key: 'country1',
          header: 'Country1',
          fixedDir: 'right',
          width: 150,
        },
        {
          key: 'country2',
          header: 'Country2',
          fixedDir: 'right',
          width: 150,
        },
      ]}
      data={Array.from({ length: 100 }).map((_, idx) => ({
        id: idx,
        name: 'namexxxxxxxxxxxxxxxxxxx' + idx,
        age: idx,
        country: 'South Lake Tahoe, California, United States of America, 96150 ' + idx,
        country1: 'country' + idx,
        country2: 'country' + idx,
      }))}
      scroll={{
        y: '500px',
        x: 'max-content',
      }}
      columnResizable
      estimateSize={91}
    ></DataTable>
  );
}

export const ColumnResizing: Story = {
  render: (props) => <ColumnResizingStory {...props}></ColumnResizingStory>,
};

function TableLoadingStory(props: any) {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <Switch label="loading" onChange={setLoading} checked={loading} />
      <DataTable
        {...props}
        fields={[
          {
            key: 'id',
            header: 'ID',
            fixedDir: 'left',
            width: 100,
          },
          {
            key: 'name',
            header: 'Name',
            fixedDir: 'left',
            width: 100,
          },
          {
            key: 'age',
            header: 'Age',
            width: 200,
          },
          {
            key: 'country',
            header: 'Country',
            width: 200,
          },
        ]}
        data={Array.from({ length: 10 }).map((_, idx) => ({
          id: idx,
          name: 'name' + idx,
          age: idx,
          country: 'country12asdfasdf123123' + idx,
          country1: 'country' + idx,
          country2: 'country' + idx,
        }))}
        loading={loading}
      ></DataTable>
    </>
  );
}
export const TableLoading: Story = {
  tags: ['skip-test'],
  render: (props) => {
    return <TableLoadingStory {...props}></TableLoadingStory>;
  },
};

function WithContextMenuComponent(props: any) {
  const [selection, setSelection] = React.useState<Record<string, boolean>>({});

  const contextMenuItems: Menu[] = [
    {
      key: 'edit',
      label: '编辑',
      onClick: () => {
        console.log('编辑被点击');
      },
    },
    {
      key: 'duplicate',
      label: '复制',
      children: [
        {
          key: 'duplicate-1',
          label: '复制1',
          onClick: () => {
            console.log('复制1被点击');
          },
        },
        {
          key: 'duplicate-2',
          label: '复制2',
          onClick: () => {
            console.log('复制2被点击');
          },
        },
      ],
    },
    {
      type: 'divider',
      key: 'divider-1',
    },
    {
      key: 'delete',
      label: '删除',
      onClick: () => {
        console.log('删除被点击');
      },
    },
  ];

  const contextMenu: TableContextMenu<Person> = {
    nameKey: 'name',
    items: contextMenuItems,
    onSelect: (row: Person) => {
      console.log('选中行:', row);
    },
    onClose: (reason: string) => {
      console.log('菜单关闭:', reason);
    },
  };

  return (
    <DataTable
      {...props}
      uniqueKey="id"
      fields={[
        {
          key: 'id',
          header: 'ID',
          fixedDir: 'left',
          width: 100,
        },
        {
          key: 'name',
          header: 'Name',
          fixedDir: 'left',
          width: 100,
        },
        {
          key: 'age',
          header: 'Age',
          width: 200,
        },
        {
          key: 'email',
          header: 'Email',
          width: 200,
          render: (value) => {
            return <a href="#">{value}</a>;
          },
        },
        {
          key: 'country',
          header: 'Country',
          width: 200,
        },
      ]}
      data={Array.from({ length: 10 }).map((_, idx) => ({
        id: idx,
        name: 'name' + idx,
        age: idx,
        email: `email${idx}@example.com`,
        country: 'country' + idx,
      }))}
      rowSelection={{
        state: selection,
        onChange: setSelection,
      }}
      contextMenu={contextMenu}
      showHeader={true}
    />
  );
}

/**
 * 右键菜单
 */
export const WithContextMenu: Story = {
  render: (props) => <WithContextMenuComponent {...props} />,
};

/**
 * 我们可以使用只带样式的 Table 在业务中构建更复杂的 Table
 */
export const RawTable: Story = {
  render: () => {
    const headers = ['Name', 'Age', 'Country'];
    const rows = [
      ['Alice', 25, 'USA'],
      ['Bob', 30, 'Canada'],
      ['Charlie', 35, 'UK'],
    ];

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={idx}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  },
};

/**
 * 大数据
 */

export const LargeData: Story = {
  tags: ['skip-test'],
  args: {
    virtualized: true,
    columnResizable: true,
  },
  render: (props) => {
    // 二十列字段
    const fields: TableField<any>[] = Array.from({ length: 20 }).map((_, idx) => ({
      key: 'field' + idx,
      header: 'Field' + idx,
      width: 150,
      fixedDir: idx === 0 ? 'left' : undefined,
      ellipsis: true,
    }));
    return (
      <div className="flex flex-col gap-2">
        <DataTable
          {...props}
          scroll={{
            y: '500px',
            x: 'max-content',
          }}
          fields={fields}
          onColumnSizingChange={console.log}
          data={Array.from({ length: 1000 }).map((_, idx) => ({
            id: idx,
            ...fields.reduce(
              (acc, field) => {
                acc[field.key] = field.key + idx;
                return acc;
              },
              {} as Record<string, string>,
            ),
          }))}
        ></DataTable>
      </div>
    );
  },
};

// 表头分组
export const ColumnHeaderGroup: Story = {
  render: () => {
    const fields: TableField<any>[] = [
      {
        key: 'info',
        header: 'Info',
        children: [
          {
            key: 'name',
            header: 'Name',
          },
          {
            key: 'age',
            header: 'Age',
          },
        ],
      },
      {
        key: 'country',
        header: 'Country',
      },
      {
        key: 'info',
        header: 'Info',
      },
    ];
    return (
      <DataTable
        fields={fields}
        data={Array.from({ length: 100 }).map((_, idx) => ({
          id: idx,
          name: 'name' + idx,
          age: idx,
          country: 'country' + idx,
          info: 'info' + idx,
        }))}
        scroll={{
          y: '300px',
        }}
      ></DataTable>
    );
  },
};

// 列行合并
export const ColumnSpan: Story = {
  render: () => {
    const fields: TableField<any>[] = [
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'age',
        header: 'Age',
        onCell: (record, index) => {
          if (index === 0) {
            return {
              colSpan: 2,
            };
          }
        },
      },
      {
        key: 'age1',
        header: 'Age1',
        onCell: (record, index) => {
          if (index === 0) {
            return {
              colSpan: 0,
            };
          }
        },
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];

    const data = Array.from({ length: 100 }).map((_, idx) => ({
      id: idx,
      name: 'name' + idx,
      age: idx,
      age1: idx + 1,
      country: 'country' + idx,
    }));
    return (
      <div>
        <Alert content="当某列的 colSpan 为 0 时，该列将不会显示"></Alert>
        <DataTable fields={fields} data={data}></DataTable>
      </div>
    );
  },
};

function ScrollEndStory() {
  const fields: TableField<any>[] = [
    {
      key: 'id',
      header: 'ID',
      fixedDir: 'left',
      width: 100,
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'age',
      header: 'Age',
    },
    {
      key: 'country',
      header: 'Country',
    },
  ];

  const [data, setData] = React.useState(
    Array.from({ length: 100 }).map((_, idx) => ({
      id: idx,
      name: 'name' + idx,
      age: idx,
      country: 'country' + idx,
    })),
  );

  console.log(data);

  return (
    <DataTable
      fields={fields}
      scroll={{
        y: '300px',
      }}
      data={data}
      onScrollEnd={() => {
        console.log('滚动到底部');
        setData(
          data.concat(
            Array.from({ length: 100 }).map((_, idx) => ({
              id: idx + data.length,
              name: 'name' + idx + data.length,
              age: idx,
              country: 'country' + idx,
            })),
          ),
        );
      }}
      virtualized
    ></DataTable>
  );
}
export const ScrollEnd: Story = {
  render: () => {
    return <ScrollEndStory />;
  },
};

function EmptyStateStory() {
  const [emptyType, setEmptyType] = React.useState<'default' | 'description' | 'custom' | 'hidden'>(
    'default',
  );

  const fields: TableField<any>[] = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'age',
      header: 'Age',
    },
    {
      key: 'country',
      header: 'Country',
    },
  ];

  const customEmptyContent = (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 text-6xl">📊</div>
      <div className="mb-2 font-medium text-title">还没有数据</div>
      <div className="mb-4 text-sm text-subtitle">请添加一些数据来开始使用表格</div>
      <Button onClick={() => console.log('添加数据')}>添加数据</Button>
    </div>
  );

  const getTableProps = () => {
    switch (emptyType) {
      case 'default':
        return {
          fields,
          data: [],
        };
      case 'description':
        return {
          fields,
          data: [],
          EmptyDescription: '自定义空状态描述文本',
        };
      case 'custom':
        return {
          fields,
          data: [],
          customEmpty: customEmptyContent,
        };
      case 'hidden':
        return {
          fields,
          data: [],
          showEmpty: false,
        };
      default:
        return {
          fields,
          data: [],
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant={emptyType === 'default' ? 'solid' : 'outline'}
          onClick={() => setEmptyType('default')}
        >
          默认空状态
        </Button>
        <Button
          variant={emptyType === 'description' ? 'solid' : 'outline'}
          onClick={() => setEmptyType('description')}
        >
          自定义描述
        </Button>
        <Button
          variant={emptyType === 'custom' ? 'solid' : 'outline'}
          onClick={() => setEmptyType('custom')}
        >
          自定义内容
        </Button>
        <Button
          variant={emptyType === 'hidden' ? 'solid' : 'outline'}
          onClick={() => setEmptyType('hidden')}
        >
          隐藏空状态
        </Button>
      </div>
      <DataTable {...getTableProps()} />
    </div>
  );
}

/**
 * 空状态配置
 *
 * 支持多种空状态配置方式：
 * - 默认空状态：使用内置的空状态组件
 * - 自定义描述：通过 EmptyDescription 设置自定义描述文本
 * - 自定义内容：通过 customEmpty 属性完全自定义空状态内容
 * - 隐藏空状态：通过 showEmpty=false 隐藏空状态显示
 */
export const EmptyState: Story = {
  render: () => <EmptyStateStory />,
};

EmptyState.parameters = {
  docs: {
    description: {
      story: '表格的各种空状态配置方式，包括默认空状态、自定义描述、自定义内容和隐藏空状态。',
    },
  },
};

export default meta;

// 动态修改表头数据

function DynamicHeaderStory() {
  const allFields = useMemo(() => {
    return [
      {
        key: 'name',
        header: 'Name',
        sorter: true,
      },
      {
        key: 'age',
        header: 'Age',
      },
      {
        key: 'country',
        header: 'Country',
      },
    ];
  }, []);

  const [fields, setFields] = React.useState<TableField<any>[]>(allFields);

  const [data, setData] = React.useState<any[]>([
    {
      id: 1,
      name: 'name1',
      age: 1,
      country: 'country1',
    },
    {
      id: 2,
      name: 'name2',
      age: 2,
      country: 'country2',
    },
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <CheckboxGroup
          value={fields.map((field) => field.key)}
          options={allFields.map((field) => ({
            label: field.header?.toString() as string,
            value: field.key,
          }))}
          onChange={(value) => {
            setFields(allFields.filter((field) => value.includes(field.key)));
          }}
        ></CheckboxGroup>
        <DataTable fields={fields} data={data}></DataTable>
      </div>
    </>
  );
}

export const DynamicHeader: Story = {
  name: '动态修改表头',
  render: () => {
    return <DynamicHeaderStory />;
  },
};

const nestedData = [
  {
    id: 1,
    spec: {
      name: 'name1',
      age: 1,
    },
    status: {
      up: true,
    },
    nested: {
      other: {
        name: 'nested1',
      },
    },
  },
  {
    id: 2,
    spec: {
      name: 'name2',
      age: 2,
    },
    nested: {
      other: {
        name: 'nested2',
      },
    },
    status: {
      up: false,
    },
  },
];

function NestedDataStory() {
  const fields: TableField<any>[] = [
    {
      key: 'id',
      header: 'ID',
      sorter: 'basic',
      fixedDir: 'left',
      width: 100,
    },
    {
      key: 'spec.name',
      header: 'Name',
      sorter: 'basic',
      filters: [
        {
          label: 'name1',
          value: 'name1',
        },
        {
          label: 'name2',
          value: 'name2',
        },
      ],
      filterType: 'single',
      onFilter: 'equals',
    },
    {
      key: 'spec.age',
      header: 'Age',
      sorter: 'basic',
    },
    {
      key: 'status.up',
      header: 'Status',
      render: (value: boolean) => {
        return value ? (
          <div className="text-success-normal">Up</div>
        ) : (
          <div className="text-danger-normal">Down</div>
        );
      },
      filters: [
        {
          label: '在线',
          value: true,
        },
        {
          label: '离线',
          value: false,
        },
      ],
      filterType: 'single',
      onFilter: 'equals',
    },
    {
      key: 'nestedName',
      header: 'Nested',
      accessorFn: (row: any) => {
        return row.nested?.other?.name;
      },
      sorter: 'basic',
      filters: [
        {
          label: 'nested1',
          value: 'nested1',
        },
        {
          label: 'nested2',
          value: 'nested2',
        },
      ],
      filterType: 'single',
      onFilter: 'equals',
    },
  ];

  const [sorting, setSorting] = React.useState<NonNullable<DataTableProps<any>['sorting']>>([]);
  const [filter, setFilter] = React.useState<NonNullable<DataTableProps<any>['columnFilters']>>([]);

  return (
    <div className="flex flex-col gap-2">
      <Alert content="支持按名称、年龄、状态和嵌套名称进行排序和筛选"></Alert>
      <DataTable
        fields={fields}
        data={nestedData}
        onSortOrderChange={setSorting}
        onFilterChange={setFilter}
      ></DataTable>
    </div>
  );
}

export const NestedData: Story = {
  render: () => <NestedDataStory />,
};

// 二级表格数据
const parentData = [
  {
    id: 1,
    name: '项目A',
    status: 'active',
    createTime: '2024-01-01',
  },
  {
    id: 2,
    name: '项目B',
    status: 'inactive',
    createTime: '2024-01-02',
  },
  {
    id: 3,
    name: '项目C',
    status: 'active',
    createTime: '2024-01-03',
  },
];

function SubTableStory() {
  const [selection, setSelection] = React.useState<Record<string, boolean>>({});

  const fields: TableField<any>[] = [
    {
      key: 'id',
      header: '项目ID',
      fixedDir: 'left',
      width: 100,
    },
    {
      key: 'name',
      header: '项目名称',
      fixedDir: 'left',
      width: 200,
    },
    {
      key: 'status',
      header: '状态',
      render: (value: string) => (
        <span className={value === 'active' ? 'text-success-normal' : 'text-danger-normal'}>
          {value === 'active' ? '活跃' : '非活跃'}
        </span>
      ),
    },
    {
      key: 'createTime',
      header: '创建时间',
      width: 200,
    },
  ];

  const expandable = {
    expandedRowRender: (parentRow: any) => {
      return (
        <DataTable
          fields={fields}
          data={Array.from({ length: parentRow.id === 1 ? 3 : 1000 }).map((_, idx) => ({
            id: idx,
            ...fields.reduce(
              (acc, field) => {
                acc[field.key] = field.key + idx;
                return acc;
              },
              {} as Record<string, string>,
            ),
          }))}
          isSubTable={true}
          showHeader={false}
          virtualized
          scroll={{
            y: '450px',
          }}
        />
      );
    },
    getRowExpandIconShow: (parentRow: any) => {
      return parentRow.id !== 3;
    },
  };

  return (
    <DataTable
      fields={fields}
      data={parentData}
      rowSelection={{
        state: selection,
        onChange: setSelection,
      }}
      expandable={expandable}
    />
  );
}

/**
 * 支持展开行显示子表格，常用于展示层级数据关系。
 * 可以通过 getRowExpandIconShow 控制哪些行可以展开。
 */
export const SubTable: Story = {
  name: '二级表格',
  render: () => <SubTableStory />,
};

function CustomSortTooltipStory() {
  const [sorting, setSorting] = React.useState<NonNullable<DataTableProps<Person>['sorting']>>([]);

  const fields: TableField<Person>[] = React.useMemo(
    () => [
      {
        key: 'name',
        header: '姓名',
        sorter: true,
        sortType: 'custom',
        customSortTooltips: {
          none: '点击按姓名升序排列 (A→Z)',
          asc: '点击按姓名降序排列 (Z→A)',
          desc: '点击清除姓名排序',
        },
      },
      {
        key: 'age',
        header: '年龄',
        sorter: true,
        // 演示：即使是默认排序，也可以自定义 tooltip
        customSortTooltips: {
          none: '点击按年龄从小到大排序 👶→👴',
          asc: '点击按年龄从大到小排序 👴→👶',
          desc: '点击清除年龄排序',
        },
      },
      {
        key: 'country',
        header: '国家',
        sorter: true,
        sortType: 'custom',
        customSortTooltips: {
          none: '🌍 点击按国家升序',
          asc: '🌍 点击按国家降序',
          desc: '🌍 点击清除国家排序',
        },
      },
    ],
    [],
  );

  const sortedData = React.useMemo(() => {
    if (!sorting.length) return Basic.data;
    return [
      ...lodash.orderBy<Person>(Basic.data, [sorting[0].id], sorting[0].desc ? 'desc' : 'asc'),
    ];
  }, [sorting]);

  return (
    <div className="flex flex-col gap-4">
      <Alert content="将鼠标悬停在列标题上查看自定义的排序 tooltip 文案" />
      <DataTable
        fields={fields}
        data={sortedData}
        sorting={sorting}
        onSortOrderChange={setSorting}
      />
    </div>
  );
}
/**
 * 自定义排序 Tooltip
 *
 */
export const CustomSortTooltip: Story = {
  name: 'Custom sort tooltip',
  render: () => <CustomSortTooltipStory />,
};
