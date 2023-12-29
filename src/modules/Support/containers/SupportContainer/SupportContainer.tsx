import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSupport } from '../../hooks/hooks'
import { FormProvider } from 'react-hook-form'
import { SUPPORT_TABS } from '@cookup/constant'
import { SortModalUI, SuspendModalUI } from '@cookup/modules'
import { TabsUI } from '../../components/components'
import { useDispatch, useSelector } from 'react-redux'
import {
  CustomDialog,
  CustomSortModal,
  Form,
  Layout,
  MuiCustomTab,
} from '@cookup/components'
import {
  SET_TAB_VALUE,
  SET_TOOL_TIP,
  SET_CONFIRM_SUSPENSION,
} from '@cookup/redux'

export const SupportContainer = () => {
  const { methods, onSevenDaysSuspend, onSubmit } = useSupport()
  const dispatch = useDispatch()

  const { isFilterModal, isSortModal } = useSelector(
    (state: any) => state.header
  )
  const { tabValue } = useSelector((state: any) => state.user)

  const { isToolTip, isToolTipModal, isConfirmSuspension } = useSelector(
    (state: any) => state.support
  )

  useEffect(() => {
    dispatch(SET_TAB_VALUE('reports'))
  }, [])

  return (
    <Layout
      isTitle
      isSort
      isFilter
      isFooter
      isExportCSV
      isPaginationIcons={tabValue !== 'suspended-users'}
    >
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <MuiCustomTab
            width="180px"
            labels={SUPPORT_TABS}
            className="support-tabs"
          />
        </Grid>
        <Grid item md={12} mt={2} my={5}>
          <TabsUI tabValue={tabValue} />
        </Grid>
      </Grid>

      {isToolTipModal && isToolTip === 'Suspended User' && (
        <CustomDialog
          isOpen={isToolTipModal}
          title="Suspend User"
          icon="/assets/icons/suspend-icon.svg"
          onClose={() =>
            dispatch(
              SET_TOOL_TIP({
                isToolTipModal: false,
                isToolTip: null,
              })
            )
          }
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <SuspendModalUI
                methods={methods}
                onSevenDaysSuspend={onSevenDaysSuspend}
              />
            </Form>
          </FormProvider>
        </CustomDialog>
      )}

      {isConfirmSuspension && (
        <CustomDialog
          isOkButton
          isCancleButton
          title="Suspend User"
          cancelButtonText="No"
          isOpen={isConfirmSuspension}
          okButtonText="Yes, I Confirm"
          icon="/assets/icons/suspend-icon.svg"
          text="Are you sure you want to suspend the user “Emma Gosling”?"
          onClose={() => {
            dispatch(
              SET_TOOL_TIP({
                isToolTip: null,
                isToolTipModal: false,
              })
            )
            dispatch(SET_CONFIRM_SUSPENSION(false))
          }}
          onConfirm={() => {
            dispatch(
              SET_TOOL_TIP({
                isToolTip: null,
                isToolTipModal: false,
              })
            )
            dispatch(SET_CONFIRM_SUSPENSION(false))
          }}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}

      {isToolTipModal && isToolTip === 'Resolved Report' && (
        <CustomDialog
          isOkButton
          isCancleButton
          textPosition="center"
          cancelButtonText="No"
          title="Resolved Report"
          isOpen={isToolTipModal}
          okButtonText="Yes, I Confirm"
          icon="/assets/icons/success.svg"
          text="Are you sure you want to resolve this report?"
          onConfirm={() => {
            dispatch(
              SET_TOOL_TIP({
                isToolTip: null,
                isToolTipModal: false,
              })
            )
            dispatch(SET_CONFIRM_SUSPENSION(false))
          }}
          onClose={() => {
            dispatch(
              SET_TOOL_TIP({
                isToolTip: null,
                isToolTipModal: false,
              })
            )
            dispatch(SET_CONFIRM_SUSPENSION(false))
          }}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}

      {isSortModal && (
        <CustomSortModal top={40} padding="12px 0px 12px 0px" title="Sort">
          <SortModalUI isSortUI />
        </CustomSortModal>
      )}
      {isFilterModal && (
        <CustomSortModal
          top={40}
          title="Filter"
          padding="12px 0px 12px 0px"
          width={{ md: 380, xs: 300 }}
        >
          <SortModalUI isFilterUI isAccountTypes />
        </CustomSortModal>
      )}
    </Layout>
  )
}

export default SupportContainer
