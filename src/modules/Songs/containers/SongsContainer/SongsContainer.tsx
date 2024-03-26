import React from 'react'
import { Grid } from '@mui/material'
import { Layout } from '@cookup/components'
import { COLORS, SONGS_DATA } from '@cookup/constant'
import {
  Hero,
  useSongs,
  MuiCustomTable,
  CustomAudioPlayer,
} from '@cookup/modules'

const SongsContainer = () => {
  const { songValues, setSongValues, onRowClick, onEdit, onDelete } = useSongs()
  const { showModal, showPlayer, selectedIndex, singleItem } = songValues || {}

  return (
    <Layout bgcolor={COLORS.background}>
      <Grid container pr={{ md: 12, xs: 2 }}>
        <Hero onAdd={() => console.log('show modal')} />
        <Grid item md={singleItem && showPlayer ? 8 : 12} xs={12}>
          <MuiCustomTable
            onDelete={onDelete}
            onEdit={onEdit}
            data={SONGS_DATA}
            showModal={showModal}
            onRowClick={onRowClick}
            onIconClick={() =>
              setSongValues((prev: any) => ({
                ...prev,
                showModal: !prev.showModal,
              }))
            }
            selectedIndex={selectedIndex}
            setSelectedIndex={(index) =>
              setSongValues((prev: any) => ({ ...prev, selectedIndex: index }))
            }
          />
        </Grid>
        {singleItem !== null && showPlayer && (
          <Grid item md={4} xs={12} mt={4} px={2}>
            <CustomAudioPlayer
              artist={singleItem.artist}
              title={singleItem.title}
              src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
            />
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}

export default SongsContainer
