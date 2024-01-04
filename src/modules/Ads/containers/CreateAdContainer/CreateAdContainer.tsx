import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { Form, Layout } from '@cookup/components'
import { CreateAdForm, useAds } from '@cookup/modules'

export const CreateAdContainer = () => {
  const navigate = useNavigate()

  const { methods, onSubmit, onMultiSelect, adValues, setAdValues } = useAds()

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
          >
            <Container maxWidth="xl">
              <Grid container pt={3}>
                <CreateAdForm
                  methods={methods}
                  adValues={adValues}
                  onMultiSelect={onMultiSelect}
                />
              </Grid>
            </Container>
          </Layout>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default CreateAdContainer
