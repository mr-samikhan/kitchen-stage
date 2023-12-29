import React from 'react'
import { CustomList } from '@cookup/components'
import { SUPPORT_REPORT_DATA, SUPPORT_REPORT_HEADER } from '@cookup/constant'

export const Reports = () => {
  return (
    <React.Fragment>
      <CustomList
        isViewMessage
        isActionButton
        data={SUPPORT_REPORT_DATA}
        headerData={SUPPORT_REPORT_HEADER}
        icon="/assets/icons/three-dots.svg"
      />
    </React.Fragment>
  )
}

export default Reports
