import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import './styles.global.css'
import ProductDropzone from './components/ProductsDropzone'

const AdminExampleDropzone: FC<Props> = (params: any) => {
  console.log(params)
  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id="admin-example.dropzone" />} />
      }
    >
      <PageBlock variation="full">
        <ProductDropzone />
      </PageBlock>
    </Layout>
  )
}

interface Props {
  params: any
}

export default AdminExampleDropzone;
