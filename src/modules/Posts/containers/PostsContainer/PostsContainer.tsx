import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '@cookup/constant'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetPosts, usePagination } from '@cookup/hooks'
import { ImageCard, LikesModal, PostDetails, usePosts } from '@cookup/modules'
import {
  Layout,
  CustomDialog,
  CustomLoader,
  CustomSortModal,
} from '@cookup/components'

export const PostsContainer = () => {
  const navigate = useNavigate()

  let { posts, postsLoading } = useGetPosts({
    enabled: true,
  })
  const { sortBy, startDate, endDate } = useSelector((state: any) => state.user)

  //pagination
  const { goToNextPage, currentItems, goToPreviousPage } = usePagination(
    posts && posts,
    15
  )

  const {
    userValues,
    singleItem,
    filterPosts,
    onSelectLike,
    onSearchPosts,
    setSingleItem,
    setUserValues,
    onDeleteLike,
    setFilterPosts,
    onFilterPosts,
    onFilterByDate,
    userLikesCommentsData,
  } = usePosts({
    startDate: '',
    endDate: '',
    sortBy,
  })

  const [adsSteps, setAdsSteps] = React.useState(0)

  const { isSortModal, searchValue } = useSelector((state: any) => state.header)

  useEffect(() => {
    if (startDate && endDate && !sortBy.type) {
      onFilterByDate({ startDate, endDate })
    } else if (sortBy.type) {
      onFilterPosts({ type: sortBy.type })
    }
  }, [startDate, endDate, sortBy.type])

  useEffect(() => {
    if (searchValue.length) {
      onSearchPosts(searchValue, currentItems)
    } else {
      setFilterPosts(null)
    }
  }, [searchValue])

  if (postsLoading) return <CustomLoader />

  let likeORCommentModal = userValues.isLikesModal || userValues.isCommentsModal

  let postsCheck: any[] = filterPosts || currentItems

  const renderSteps = () => {
    switch (adsSteps) {
      case 0:
        return (
          <ImageCard
            postsCheck={postsCheck}
            setAdsSteps={setAdsSteps}
            postsLoading={postsLoading}
            goToNextPage={goToNextPage}
            setSingleItem={setSingleItem}
            setFilterPosts={setFilterPosts}
            goToPreviousPage={goToPreviousPage}
          />
        )

      case 1:
        return (
          <PostDetails
            singleItem={singleItem}
            setUserValues={setUserValues}
            userLikesCommentsData={userLikesCommentsData}
          />
        )

      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <Layout
      isNavigation
      isSort={adsSteps === 0}
      bgcolor={COLORS.background}
      isSearchInput={adsSteps === 0}
      navigationTitle={
        singleItem === null ? 'Manage Posts' : singleItem?.user?.name || ''
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
          open={likeORCommentModal}
          userName={singleItem?.user?.firstName}
          isCommentsUI={!userValues.isLikesModal}
          title={userValues.isLikesModal ? 'Likes' : 'Comments'}
          data={
            userValues.isLikesModal
              ? userLikesCommentsData?.userLikes
              : userLikesCommentsData?.userComments
          }
          length={
            userValues.isLikesModal
              ? userLikesCommentsData?.userLikes?.length
              : userLikesCommentsData?.userComments?.length
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
          onConfirm={() => {
            console.log('Like Deleted!')
            onDeleteLike()
          }}
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
