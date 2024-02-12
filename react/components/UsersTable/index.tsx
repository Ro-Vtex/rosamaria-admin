import React, { Fragment, useState } from 'react';
import { Table, IconArrowUp, IconArrowDown, IconShoppingCart, Input } from 'vtex.styleguide';
import faker from 'faker';
import { withRuntimeContext } from 'vtex.render-runtime';

const EXAMPLE_LENGTH = 100;
const MOCKED_DATA = [...Array(EXAMPLE_LENGTH)].map(() => ({
  name: faker.name.findName(),
  streetAddress: faker.address.streetAddress(),
  cityStateZipAddress: `${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
  email: faker.internet.email().toLowerCase(),
}));

const UsersTable = ({ runtime }: any) => {
  const [items] = useState(MOCKED_DATA);
  const [tableDensity, setTableDensity] = useState('low');
  const [searchValue, setSearchValue] = useState(null);
  const [filterStatements, setFilterStatements] = useState([]);

  const getSchema = () => {
    let fontSize = 'f5';

    switch (tableDensity) {
      case 'medium':
        fontSize = 'f6';
        break;
      case 'high':
        fontSize = 'f7';
        break;
      default:
        fontSize = 'f5';
        break;
    }

    return {
      properties: {
        name: { title: 'Name' },
        streetAddress: {
          title: 'Street Address',
          cellRenderer: ({ cellData }: any) => <span className="ws-normal">{cellData}</span>,
        },
        cityStateZipAddress: {
          title: 'City, State Zip',
          cellRenderer: ({ cellData }: any) => (
            <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          ),
        },
        email: {
          title: 'Email',
          cellRenderer: ({ cellData }: any) => (
            <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          ),
        },
      },
    };
  };

  const simpleInputObject = ({ values, onChangeObjectCallback }: any) => (
    <Input
      value={values || ''}
      onChange={(e: any) => onChangeObjectCallback(e.target.value)}
    />
  );

  const simpleInputVerbsAndLabel = () => ({
    renderFilterLabel: (st: any) => {
      if (!st || !st.object) {
        return 'Any';
      }
      return `${st.verb === '=' ? 'is' : st.verb === '!=' ? 'is not' : 'contains'
        } ${st.object}`;
    },
    verbs: [
      { label: 'is', value: '=', object: { renderFn: simpleInputObject, extraParams: {} } },
      { label: 'is not', value: '!=', object: { renderFn: simpleInputObject, extraParams: {} } },
      { label: 'contains', value: 'contains', object: { renderFn: simpleInputObject, extraParams: {} } },
    ],
  });

  return (
    <div>
      <Table
        fullWidth
        updateTableKey={tableDensity}
        items={items}
        schema={getSchema()}
        density="low"
        onRowClick={({ rowData }: any) => runtime.navigate({ page: 'admin.app.example-detail', params: { id: rowData.id } })}
        toolbar={{
          density: {
            buttonLabel: 'Line density',
            lowOptionLabel: 'Low',
            mediumOptionLabel: 'Medium',
            highOptionLabel: 'High',
            handleCallback: (density: string) => setTableDensity(density),
          },
          inputSearch: {
            value: searchValue,
            placeholder: 'Search stuff...',
            onChange: (value: any) => setSearchValue(value),
            onClear: () => setSearchValue(null),
            onSubmit: () => { },
          },
          download: { label: 'Export', handleCallback: () => alert('Callback()') },
          upload: { label: 'Import', handleCallback: () => alert('Callback()') },
          fields: { label: 'Toggle visible fields', showAllLabel: 'Show All', hideAllLabel: 'Hide All' },
          extraActions: {
            label: 'More options',
            actions: [
              { label: 'An action', handleCallback: () => alert('An action') },
              { label: 'Another action', handleCallback: () => alert('Another action') },
              { label: 'A third action', handleCallback: () => alert('A third action') },
            ],
          },
          newLine: { label: 'New', handleCallback: () => alert('handle new line callback') },
        }}
        filters={{
          alwaysVisibleFilters: ['name', 'email'],
          statements: filterStatements,
          onChangeStatements: (newStatements: any) => setFilterStatements(newStatements),
          clearAllFiltersButtonLabel: 'Clear Filters',
          collapseLeft: true,
          options: {
            name: { label: 'Name', ...simpleInputVerbsAndLabel() },
            email: { label: 'Email', ...simpleInputVerbsAndLabel() },
            streetAddress: { label: 'Street Address', ...simpleInputVerbsAndLabel() },
            cityStateZipAddress: { label: 'City State Zip', ...simpleInputVerbsAndLabel() },
          },
        }}
        totalizers={[
          { label: 'Sales', value: '420.763', icon: <IconShoppingCart size={14} /> },
          { label: 'Cash in', value: 'R$ 890.239,05', iconBackgroundColor: '#eafce3', icon: <IconArrowUp color="#79B03A" size={14} /> },
          { label: 'Cash out', value: '- R$ 13.485,26', icon: <IconArrowDown size={14} /> },
        ]}
        bulkActions={{
          texts: {
            secondaryActionsLabel: 'Actions',
            rowsSelected: (qty: any) => <Fragment>Selected rows: {qty}</Fragment>,
            selectAll: 'Select all',
            allRowsSelected: (qty: any) => <Fragment>All rows selected: {qty}</Fragment>,
          },
          totalItems: 100,
          main: { label: 'Send email', handleCallback: (_params: any) => alert('TODO: SHOW EMAIL FORM') },
          others: [{ label: 'Delete', handleCallback: (params: any) => console.warn(params) }],
        }}
      />
    </div>
  );
};

export default withRuntimeContext(UsersTable);
