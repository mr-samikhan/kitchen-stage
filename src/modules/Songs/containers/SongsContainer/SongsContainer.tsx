import { Divider, Grid } from '@mui/material'
import { COLORS } from '@cookup/constant'
import { Layout } from '@cookup/components'
import {
  Hero,
  useSongs,
  AddEditSongs,
  MuiCustomTable,
  CustomAudioPlayer,
} from '@cookup/modules'
import { useGetMusic } from '@cookup/hooks'

const SongsContainer = () => {
  const {
    onEdit,
    methods,
    onSubmit,
    onDelete,
    isLoading,
    songValues,
    onRowClick,
    setSongValues,
    onOpenAddModal,
  } = useSongs()

  const { showModal, showPlayer, selectedIndex, singleItem, addModal } =
    songValues || {}

  const { musics, musicLoading } = useGetMusic({})

  return (
    <Layout bgcolor={COLORS.background}>
      <Grid container pr={{ md: 12, xs: 2 }}>
        <Hero onAdd={onOpenAddModal} />
        <Grid item md={singleItem && showPlayer ? 8 : 12} xs={12}>
          <MuiCustomTable
            data={musics}
            onEdit={onEdit}
            onDelete={onDelete}
            showModal={showModal}
            onRowClick={onRowClick}
            isLoading={musicLoading}
            selectedIndex={selectedIndex}
            setSelectedIndex={(index) =>
              setSongValues((prev: any) => ({ ...prev, selectedIndex: index }))
            }
            onIconClick={() =>
              setSongValues((prev: any) => ({
                ...prev,
                showModal: !prev.showModal,
              }))
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
          isLoading={isLoading}
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
