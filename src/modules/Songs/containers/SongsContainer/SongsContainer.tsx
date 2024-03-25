import React from 'react'
import { Grid } from '@mui/material'
import { COLORS, SONGS_DATA } from '@cookup/constant'
import { Layout } from '@cookup/components'
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
            selectedIndex={selectedIndex}
            setSelectedIndex={(index) => setSelectedIndex(index)}
            data={SONGS_DATA}
            showModal={showModal}
            onIconClick={handleModal}
            onRowClick={onRowClick}
          />
        </Grid>
        {showPlayer && (
          <Grid item md={12}>
            <CustomAudioPlayer />
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}

export default SongsContainer
