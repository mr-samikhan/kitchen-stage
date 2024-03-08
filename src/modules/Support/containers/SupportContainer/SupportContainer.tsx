import moment from 'moment'
import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useSupport } from '../../hooks/hooks'
import { useGetSupports } from '@cookup/hooks'
import { FormProvider } from 'react-hook-form'
import { COLORS, SUPPORT_TABS } from '@cookup/constant'
import { useDispatch, useSelector } from 'react-redux'
import { SortModalUI, SuspendModalUI } from '@cookup/modules'
import { MessageModal, TabsUI } from '../../components/components'
import {
  Form,
  Layout,
  MuiCustomTab,
  CustomDialog,
  CustomLoader,
  ExportCSVModal,
  CustomSortModal,
  CustomFilterButton,
  MuiCustomSearchInput,
} from '@cookup/components'
import {
  SET_TOOL_TIP,
  SET_TAB_VALUE,
  SET_EXPORT_MODAL,
  SET_FILTER_MODAL,
  SET_EXPORT_SUCCESS,
  SET_CONFIRM_SUSPENSION,
  SET_SINGLE_SUPPORT_DATA,
} from '@cookup/redux'

export const SupportContainer = () => {
  const {
    methods,
    onSubmit,
    filteredData,
    onTypeFilter,
    onSuspendUser,
    setFilteredData,
    onSevenDaysSuspend,
  } = useSupport()

  const dispatch = useDispatch()

  const { isFilterModal, isSortModal, searchValue } = useSelector(
    (state: any) => state.header
  )

  useEffect(() => {
    dispatch(SET_TAB_VALUE('reports'))
  }, [])

  const { tabValue, sortBy, filterBy, startDate, endDate } = useSelector(
    (state: any) => state.user
  )

  const { supportLoading, support_data, isFetching } = useGetSupports({
    value: tabValue,
  })

  const {
    isToolTip,
    isViewMessage,
    isExportModal,
    isToolTipModal,
    isExportSuccess,
    isConfirmSuspension,
    singleSupportData,
  } = useSelector((state: any) => state.support)

  // filter & search
  useEffect(() => {
    if (sortBy.type === 'today' && !startDate && !endDate) {
      onTypeFilter({ type: sortBy.type })
    } else if (sortBy.type === 'lastWeek' && !startDate && !endDate) {
      onTypeFilter({ type: sortBy.type })
    } else if (sortBy.type === 'lastMonth' && !startDate && !endDate) {
      onTypeFilter({ type: sortBy.type })
    } else if (startDate && endDate) {
      onTypeFilter({ type: 'custom', startDate, endDate })
    } else if (searchValue) {
      onTypeFilter({
        type: 'search',
        searchByKey: searchValue,
        data: support_data,
      })
    } else {
      setFilteredData(null)
    }
  }, [sortBy.type, startDate, endDate, searchValue])

  //sort
  const sortedData = Api.support.sortSupportData(
    support_data,
    sortBy.sortValue !== ''
      ? Api.support.getSortKeys(sortBy.sortValue) || ''
      : '',
    sortBy.sortType
  )

  if (supportLoading || isFetching) return <CustomLoader />

  return (
    <Layout
      isTitle
      bgcolor={COLORS.background}
      isPaginationIcons={tabValue !== 'suspended-users'}
      isExportCSV={() => dispatch(SET_EXPORT_MODAL(true))}
      isFooter={support_data && support_data?.length > 7 ? true : false}
    >
      <Grid container>
        <Grid item xs={12} md={6} display="flex" justifyContent="start">
          <MuiCustomTab
            width="180px"
            labels={SUPPORT_TABS}
            className="support-tabs"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Box width="40%">
            <MuiCustomSearchInput />
          </Box>
          <Box>
            <CustomFilterButton
              placeholder="Filter"
              icon="/assets/icons/filter_alt.svg"
              onClick={() => dispatch(SET_FILTER_MODAL(true))}
            />
          </Box>
        </Grid>
        <Grid item md={12} mt={2} my={5}>
          <TabsUI tabValue={tabValue} data={filteredData || sortedData} />
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
            methods.watch('days')
              ? onSuspendUser({
                  id: 'id',
                  data: {
                    suspensionDays: methods.watch('days'),
                    isSuspended: true,
                    suspensionDate: new Date(),
                    suspenseReason: methods.watch('reason'),
                    suspensionDuration: moment(
                      Date.now() + methods.watch('days') * 24 * 60 * 60 * 1000
                    ).format('MMMM DD, YYYY'),
                  },
                })
              : onSuspendUser({
                  id: 'id',
                  data: {
                    suspensionDays: 7,
                    isSuspended: true,
                    suspensionDate: new Date(),
                    suspensionDuration: moment(
                      Date.now() + 7 * 24 * 60 * 60 * 1000
                    ).format('MMMM DD, YYYY'),
                  },
                })
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
          onConfirm={() =>
            onSuspendUser({
              id: 'id',
              data: { isResolved: true },
            })
          }
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
        // top={40}
        // title="Filter"
        // padding="12px 0px 12px 0px"
        // width={{ md: 380, xs: 300 }}
        >
          {/* <SortModalUI isFilterUI isAccountTypes /> */}
        </CustomSortModal>
      )}

      {isExportModal && (
        <ExportCSVModal
          record={support_data}
          csvData={support_data}
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
            isAttachment
            isSender={false}
            reason={singleSupportData?.supportReason}
            onViewAttachment={() => alert('view attachment')}
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
