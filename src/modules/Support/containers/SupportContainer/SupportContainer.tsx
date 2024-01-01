import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSupport } from '../../hooks/hooks'
import { FormProvider } from 'react-hook-form'
import { SUPPORT_TABS } from '@cookup/constant'
import { useDispatch, useSelector } from 'react-redux'
import { SortModalUI, SuspendModalUI } from '@cookup/modules'
import { MessageModal, TabsUI } from '../../components/components'
import {
  Form,
  Layout,
  CustomDialog,
  MuiCustomTab,
  ExportCSVModal,
  CustomSortModal,
} from '@cookup/components'
import {
  SET_TOOL_TIP,
  SET_TAB_VALUE,
  SET_EXPORT_MODAL,
  SET_EXPORT_SUCCESS,
  SET_CONFIRM_SUSPENSION,
  SET_SINGLE_SUPPORT_DATA,
} from '@cookup/redux'

export const SupportContainer = () => {
  const { methods, onSevenDaysSuspend, onSubmit } = useSupport()

  const dispatch = useDispatch()

  const { isFilterModal, isSortModal } = useSelector(
    (state: any) => state.header
  )
  const { tabValue } = useSelector((state: any) => state.user)

  const {
    isToolTip,
    isViewMessage,
    isExportModal,
    isToolTipModal,
    isExportSuccess,
    isConfirmSuspension,
  } = useSelector((state: any) => state.support)

  useEffect(() => {
    dispatch(SET_TAB_VALUE('reports'))
  }, [])

  return (
    <Layout
      isTitle
      isSort
      isFilter
      isFooter
      isExportCSV={() => dispatch(SET_EXPORT_MODAL(true))}
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

      {isExportModal && (
        <ExportCSVModal
          isOpen={isExportModal}
          onClose={() => dispatch(SET_EXPORT_MODAL(false))}
          onExport={() => dispatch(SET_EXPORT_SUCCESS(true))}
        />
      )}

      {isExportSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          textPosition="center"
          isOpen={isExportSuccess}
          title="Export Support Tickets"
          icon="/assets/icons/user_circle.svg"
          text="Successfuly exported Support Tickets"
          okButtonStyle={{
            width: 225,
          }}
          onConfirm={() => {
            dispatch(SET_EXPORT_MODAL(false))
            dispatch(SET_EXPORT_SUCCESS(false))
          }}
        />
      )}

      {isViewMessage && (
        <CustomDialog
          isOpen={isViewMessage}
          onClose={() =>
            dispatch(
              SET_SINGLE_SUPPORT_DATA({ user: null, isViewMessage: false })
            )
          }
          sx={{
            p: 2,
            width: { xs: '320px', md: '415px' },
          }}
        >
          <MessageModal
            isSender
            onReply={() =>
              dispatch(
                SET_SINGLE_SUPPORT_DATA({ user: null, isViewMessage: false })
              )
            }
            onCancel={() =>
              dispatch(
                SET_SINGLE_SUPPORT_DATA({ user: null, isViewMessage: false })
              )
            }
          />
        </CustomDialog>
      )}
    </Layout>
  )
}

export default SupportContainer
