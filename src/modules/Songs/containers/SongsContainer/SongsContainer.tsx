import { Grid } from '@mui/material'
import { Layout } from '@cookup/components'
import { COLORS, SONGS_DATA } from '@cookup/constant'
import {
  Hero,
  useSongs,
  AddEditSongs,
  MuiCustomTable,
  CustomAudioPlayer,
} from '@cookup/modules'

const SongsContainer = () => {
  const {
    onEdit,
    methods,
    onSubmit,
    onDelete,
    songValues,
    onRowClick,
    setSongValues,
  } = useSongs()
  const { showModal, showPlayer, selectedIndex, singleItem, addModal } =
    songValues || {}

  return (
    <Layout bgcolor={COLORS.background}>
      <Grid container pr={{ md: 12, xs: 2 }}>
        <Hero
          onAdd={() =>
            setSongValues((prev: any) => ({
              ...prev,
              addModal: true,
            }))
          }
        />
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
              src={singleItem?.file?.url}
            />
          </Grid>
        )}
      </Grid>

      {addModal && (
        <AddEditSongs
          methods={methods}
          onSubmit={onSubmit}
          open={addModal}
          onClose={() =>
            setSongValues((prev: any) => ({ ...prev, addModal: false }))
          }
        />
      )}
    </Layout>
  )
}

export default SongsContainer
