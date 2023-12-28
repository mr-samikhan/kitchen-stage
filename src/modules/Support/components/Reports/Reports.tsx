import React from 'react'
import { CustomList } from '@cookup/components'
import { SUPPORT_REPORT_DATA, SUPPORT_REPORT_HEADER } from '@cookup/constant'

export const Reports = () => {
  return (
    <React.Fragment>
      <CustomList
        isActionButton
        data={SUPPORT_REPORT_DATA}
        headerData={SUPPORT_REPORT_HEADER}
        onNavigation={() => alert('hello')}
        icon="/assets/icons/three-dots.svg"
      />
    </React.Fragment>
  )
}

export default Reports
