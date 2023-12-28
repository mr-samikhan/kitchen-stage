import { CustomList } from '@cookup/components'
import React from 'react'

export const Reports = () => {
  let ARRAY = [
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
    {
      requester: 'Requester',
      supportReason: 'Support Reason',
      requestedDate: 'Request Date',
      reportedUserName: 'tipsydude(1)',
      viewMessage: 'View Message',
    },
  ]
  return (
    <React.Fragment>
      <CustomList
        isActionButton
        headerData={[
          'REQUESTER',
          'SUPPORT REASON',
          'REQUESTED DATE',
          'REPORTED USERNAME',
        ]}
        data={ARRAY}
        onNavigation={() => alert('hello')}
        icon="/assets/icons/three-dots.svg"
      />
    </React.Fragment>
  )
}

export default Reports
