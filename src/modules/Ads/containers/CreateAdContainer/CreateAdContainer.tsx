import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { Form, Layout } from '@cookup/components'
import { CreateAdForm, ReviewAd, useAds } from '@cookup/modules'

export const CreateAdContainer = () => {
  const navigate = useNavigate()

  const { methods, onSubmit, onMultiSelect, adValues, setAdValues } = useAds()

  const [step, setStep] = useState(0)

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
            button2Text="Save Draft"
            button2Variant="outlined"
            navigationTitle="Create Ad"
            onButton1Click={() => setStep(1)}
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
    </React.Fragment>
  )
}

export default CreateAdContainer
