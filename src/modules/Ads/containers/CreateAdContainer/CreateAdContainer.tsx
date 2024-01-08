import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { Form, Layout } from '@cookup/components'
import { CreateAdForm, ReviewAd, useAds } from '@cookup/modules'

export const CreateAdContainer = () => {
  const navigate = useNavigate()

  const { methods, onSubmit, onMultiSelect, adValues, setAdValues } = useAds()

  const [step, setStep] = useState(1)

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
        return <ReviewAd />

      default:
        break
    }
  }

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Layout
            isDeleteBtn
            isNavigation
            isSuspendBtn="Review Ad"
            navigationTitle="Create Ad"
            deleteBtnText="Save Draft"
            onGoBack={() => navigate(-1)}
            onSuspendClick={() => alert('review')}
            // isSuspendBtn={step === 0 ? 'Review Ad' : 'Publish Ad'}
          >
            <Container maxWidth="xl">
              <Grid container pt={3}>
                {RenderAdSteps()}
              </Grid>
            </Container>
          </Layout>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default CreateAdContainer
