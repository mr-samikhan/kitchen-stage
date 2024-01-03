import React from 'react'
import { Layout } from '@cookup/components'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { CreateAdForm } from '@cookup/modules'

export const CreateAdContainer = () => {
  const navigate = useNavigate()
  return (
    <Layout
      isDeleteBtn
      isNavigation
      isSuspendBtn="Review Ad"
      navigationTitle="Create Ad"
      deleteBtnText="Save Draft"
      onGoBack={() => navigate(-1)}
      onDelete={() => alert('save draft')}
      onSuspendClick={() => alert('review')}
    >
      <Container maxWidth="xl">
        <Grid container pt={3}>
          <CreateAdForm />
        </Grid>
      </Container>
    </Layout>
  )
}

export default CreateAdContainer
