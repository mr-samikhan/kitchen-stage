import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { CustomDialog, Form, Layout } from '@cookup/components'
import { CreateAdForm, ReviewAd, useAds } from '@cookup/modules'

export const CreateAdContainer = () => {
  const navigate = useNavigate()

  const {
    mutate,
    isLoading,
    methods,
    onSubmit,
    onMultiSelect,
    adValues,
    setAdValues,
    step,
    setStep,
    onModalClick,
  } = useAds()

  const RenderAdSteps = () => {
    switch (step) {
      case 0:
        return (
          <CreateAdForm
            methods={methods}
            adValues={adValues}
            onMultiSelect={onMultiSelect}
          />
        )
      case 1:
        return (
          <ReviewAd
            data={{
              ...adValues.data,
              gender: adValues.gender,
              ageRange: adValues.ageRange,
            }}
          />
        )

      default:
        throw new Error('No Screen Found')
    }
  }

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Layout
            showButton1
            showButton2
            isNavigation
            button2Type="submit"
            button1Type="submit"
            button2Text="Save Draft"
            button2Variant="outlined"
            navigationTitle="Create Ad"
            onButton2Click={() =>
              setAdValues((prev) => ({ ...prev, isSaveDraft: true }))
            }
            onButton1Click={() =>
              step === 0 ? '' : onModalClick('publishModal', true)
            }
            button1Text={step === 0 ? 'Review Ad' : 'Publish Ad'}
            onGoBack={() => (step === 1 ? setStep(0) : navigate(-1))}
          >
            <Container maxWidth="xl">
              <Grid container pt={3}>
                {RenderAdSteps()}
              </Grid>
            </Container>
          </Layout>
        </Form>
      </FormProvider>
      {adValues.publishModal && (
        <CustomDialog
          isOkButton
          isCancleButton
          title="save Ad"
          fontFamily="Poppins"
          cancelButtonText="No"
          textVariant="subtitle2"
          isOpen={adValues.publishModal}
          icon="/assets/icons/publish_icon.svg"
          okButtonText={isLoading ? 'Loading...' : 'Yes, save ad'}
          onConfirm={() =>
            mutate({
              ...adValues.data,
              ageRange: adValues.ageRange,
              gender: adValues.gender,
            })
          }
          // onConfirm={() => onModalClick('successModal', true)}
          onClose={() => onModalClick('publishModal', false)}
          text="Are you sure you want to publish this ad? Action is not reversable."
        />
      )}
      {adValues.draftModal && (
        <CustomDialog
          isOkButton
          isCancleButton
          fontFamily="Poppins"
          cancelButtonText="No"
          textVariant="subtitle2"
          okButtonText="Yes, save ad"
          isOpen={adValues.draftModal}
          title="You have unsaved changes"
          icon="/assets/icons/wine_warn.svg"
          onClose={() => onModalClick('draftModal', false)}
          text="You have unsaved changes. Would you like to save your ad?"
          onConfirm={() =>
            mutate({
              ...adValues.data,
              ageRange: adValues.ageRange,
              gender: adValues.gender,
            })
          }
        />
      )}
      {adValues.successModal && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          isOpen={adValues.successModal}
          okButtonStyle={{ width: 225 }}
          icon="/assets/icons/success_circle.svg"
          onClose={() => onModalClick('successModal', false)}
          onConfirm={() => {
            onModalClick('successModal', false)
            onModalClick('publishModal', false)
            onModalClick('draftModal', false)
          }}
          title={
            adValues.draftModal
              ? 'Successfully Saved Ad'
              : 'Published Successfully'
          }
        />
      )}
    </React.Fragment>
  )
}

export default CreateAdContainer
