import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const usePosts = () => {
  const queryClient = useQueryClient()

  const [userValues, setUserValues] = React.useState<any>({
    likesData: null,
    isLikesModal: false,
    isCommentsModal: false,
    isSuccessModal: false,
  })

  const [singleItem, setSingleItem] = React.useState<any>(null)
  const [filterPosts, setFilterPosts] = React.useState(null)

  //get user likes and comments
  const { mutate: getUserLikesAndComments, data: userLikesCommentsData } =
    useMutation<any, any, any>(Api.recipe.getUserRecipeLikesAndComments, {
      onSuccess: () => {},
      onError: (error) => console.log(error),
    })

  //delete user likes and comments
  const { mutate: deleteUserLikesAndComments } = useMutation<any, any, any>(
    userValues.isLikesModal
      ? Api.recipe.removeLikedById
      : Api.recipe.removeCommentById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getPosts')
        getUserLikesAndComments({
          singleRecipe: singleItem,
          recipeId: singleItem?.id,
        })
      },
      onError: (error) => console.log(error),
    }
  )

  //select like data
  const onSelectLike: any = async (item: {
    id: string
    userId: string
    comment: string
  }) => {
    deleteUserLikesAndComments({
      recipeId: item.id,
      userId: item.userId,
      comment: item.comment,
    })
    setUserValues((prev: any) => ({
      ...prev,
      likesData: item,
      isSuccessModal: true,
    }))
  }

  useEffect(() => {
    if (singleItem) {
      getUserLikesAndComments({
        singleRecipe: singleItem,
        recipeId: singleItem?.id,
      })
    }
  }, [singleItem])

  //select recipe data
  const onSelectRecipe = async (item: { id: string }) => {
    getUserLikesAndComments({
      singleRecipe: singleItem,
      recipeId: singleItem?.id,
    })
  }

  const onSearchPosts = (searchValue: string, data_: any[]) => {
    const items = [...data_]
    const data: any = items.filter((post: any) =>
      post.description.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilterPosts(data)
  }

  const onFilterPosts = () => {
    console.log('posts filter')
  }

  //delete like
  const onDeleteLike = () => {
    setUserValues((prev: any) => ({
      ...prev,
      isCommentsModal: false,
      isLikesModal: false,
      isSuccessModal: false,
    }))
  }

  return {
    userValues,
    singleItem,
    filterPosts,
    onDeleteLike,
    onSelectLike,
    setUserValues,
    onFilterPosts,
    onSearchPosts,
    setSingleItem,
    onSelectRecipe,
    setFilterPosts,
    userLikesCommentsData,
  }
}

export default usePosts
