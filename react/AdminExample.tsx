import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'



import './styles.global.css'
import UsersTable from './components/UsersTable'

const AdminExample: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.admin" />}
        />
      }
    >
      <PageBlock variation="full">
        <UsersTable />
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
