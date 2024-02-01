import React from 'react'
import { CustomList } from '@cookup/components'
import { SUPPORT_REPORT_DATA, SUPPORT_REPORT_HEADER } from '@cookup/constant'

interface ReportsProps {
  data: any
  hiddenKeys?: string[]
}

export const Reports = (props: ReportsProps) => {
  const { data, hiddenKeys } = props || {}

  return (
    <React.Fragment>
      <CustomList
        isViewMessage
        isActionButton
        data={data}
        hiddenKeys={hiddenKeys}
        headerData={SUPPORT_REPORT_HEADER}
        icon="/assets/icons/three-dots.svg"
      />
    </React.Fragment>
  )
}

export default Reports
