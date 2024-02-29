import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPosts } from '@cookup/hooks'
import { useNavigate } from 'react-router-dom'
import { ADS_ARRAY, COLORS } from '@cookup/constant'
import {
  LikesModal,
  SortModalUI,
  ViewAdDetails,
  usePosts,
  useUser,
} from '@cookup/modules'
import { Avatar, Box, Container, Grid, IconButton } from '@mui/material'
import {
  CustomDialog,
  CustomLoader,
  CustomSortModal,
  Layout,
  TableFooter,
} from '@cookup/components'

type TAdCard = {
  user: string
  img: string
}

export const PostsContainer = () => {
  const navigate = useNavigate()

  const { posts, postsLoading } = useGetPosts({ enabled: true })

  console.log(posts, '>>>>posts')

  const { isSortModal, isFilterModal } = useSelector(
    (state: any) => state.header
  )

  const [adsSteps, setAdsSteps] = React.useState(0)
  const [singleItem, setSingleItem] = React.useState<TAdCard | null>(null)
  console.log(singleItem, '>>>>singleItem')

  const {
    userValues,
    setUserValues,
    onSelectLike,
    onSelectRecipe,
    userLikesCommentsData,
  } = usePosts({
    singleItem,
    posts,
  })

  const { searchValue } = useSelector((state: any) => state.header)
  // console.log(searchValue, '>>>>searchValue')

  if (postsLoading) return <CustomLoader />

  let likeORCommentModal = userValues.isLikesModal || userValues.isCommentsModal

  const renderSteps = () => {
    switch (adsSteps) {
      case 0:
        return (
          <Grid container pl={5}>
            <Grid
              item
              md={11}
              gap={4}
              display="flex"
              flexWrap="wrap"
              position="relative"
              justifyContent={{ xs: 'center', md: 'start' }}
            >
              {posts?.map((item: TAdCard, index: number) => (
                <Box
                  mt={1}
                  key={index}
                  position={'relative'}
                  width={{ xs: '150px', md: '200px' }}
                  height={{ xs: '150px', md: '200px' }}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAdsSteps(1)
                    setSingleItem(item)
                  }}
                >
                  <Box
                    top={-5}
                    width="40px"
                    height="40px"
                    bgcolor="white"
                    position="absolute"
                    borderRadius="100%"
                  >
                    <Avatar
                      src={item.user.userImage}
                      sx={{
                        border: '4px solid white',
                      }}
                    />
                  </Box>
                  <img alt="" width="100%" height="100%" src={item.img} />
                </Box>
              ))}
              <Grid item md={11} display="flex" justifyContent="center" my={2}>
                <TableFooter
                  isPaginationIcons
                  onNextPage={() => console.log('nextPage')}
                  onPreviousPage={() => console.log('prePage')}
                />
              </Grid>
            </Grid>
          </Grid>
        )

      case 1:
        return (
          <Grid container>
            <Grid item md={12} pl={8} container>
              <Grid item md={12} px={2}>
                <Box width="100%" mt={5}>
                  <Box width={50} height={50}>
                    <Avatar src="/assets/icons/user1.svg" />
                  </Box>
                </Box>
              </Grid>
              <ViewAdDetails
                recipe={singleItem}
                setUserValues={setUserValues}
                onVideoClick={() => alert('you clicked on video icon')}
              />
            </Grid>
          </Grid>
        )

      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <Layout
      isNavigation
      bgcolor={COLORS.background}
      isSearchInput={adsSteps === 0}
      isSort={adsSteps === 0}
      navigationTitle={
        singleItem === null ? 'Manage Posts' : 'The Appetizers Bar'
      }
      navTitleColor={singleItem === null ? 'secondary.light' : 'primary.main'}
      onGoBack={() => {
        singleItem === null ? navigate(-1) : setAdsSteps(0)
        setSingleItem(null)
      }}
    >
      <Container maxWidth="xl">
        {renderSteps()}

        {isSortModal && <CustomSortModal />}
      </Container>

      {likeORCommentModal && (
        <LikesModal
          onDelete={onSelectLike}
          userName={singleItem?.user?.firstName}
          open={likeORCommentModal}
          isCommentsUI={!userValues.isLikesModal}
          title={userValues.isLikesModal ? 'Likes' : 'Comments'}
          data={
            userValues.isLikesModal
              ? userLikesCommentsData.userLikes
              : userLikesCommentsData.userComments
          }
          length={
            userValues.isLikesModal
              ? userLikesCommentsData.userLikes?.length
              : userLikesCommentsData.userComments?.length
          }
          onClose={() =>
            setUserValues({
              ...userValues,
              isLikesModal: false,
              isCommentsModal: false,
            })
          }
        />
      )}
      {userValues.isSuccessModal && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          isOpen={userValues.isSuccessModal}
          title={userValues.isLikesModal ? 'Like Deleted' : 'Comment Deleted'}
          icon={
            userValues.isLikesModal
              ? '/assets/icons/likes.svg'
              : '/assets/icons/comment.svg'
          }
          // onConfirm={() => {
          //   console.log('Like Deleted!')
          //   onDeleteLike()
          // }}
          okButtonStyle={{
            width: '220px',
          }}
          text={`“${userValues.likesData.userName}” likes has been removed from the system successfully.`}
        />
      )}
    </Layout>
  )
}

export default PostsContainer
