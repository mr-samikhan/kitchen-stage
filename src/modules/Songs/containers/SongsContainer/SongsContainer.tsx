import React from 'react'
import { Grid } from '@mui/material'
import { Layout } from '@cookup/components'
import { COLORS, SONGS_DATA } from '@cookup/constant'
import { CustomAudioPlayer, Hero, MuiCustomTable } from '@cookup/modules'

const SongsContainer = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [showPlayer, setShowPlayer] = React.useState(true)
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const onRowClick = () => {
    setShowPlayer(!showPlayer)
  }
  return (
    <Layout bgcolor={COLORS.background}>
      <Grid container pr={{ md: 12, xs: 2 }}>
        <Hero />
        <Grid item md={12} xs={12}>
          <MuiCustomTable
            data={SONGS_DATA}
            showModal={showModal}
            onRowClick={onRowClick}
            onIconClick={handleModal}
            selectedIndex={selectedIndex}
            setSelectedIndex={(index) => setSelectedIndex(index)}
          />
        </Grid>
        {showPlayer && (
          <Grid item md={3}>
            <CustomAudioPlayer
              title="Hotel California"
              artist="Eagle"
              src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
            />
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}

export default SongsContainer
