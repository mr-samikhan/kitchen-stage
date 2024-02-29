import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const usePosts = ({ singleItem, posts }: any) => {
  const queryClient = useQueryClient()

  const [userValues, setUserValues] = React.useState<any>({
    likesData: null,
    isLikesModal: false,
    isCommentsModal: false,
    isSuccessModal: false,
  })

  //get user likes and comments
  const { mutate: getUserLikesAndComments, data: userLikesCommentsData } =
    useMutation<any, any, any>(Api.recipe.getUserRecipeLikesAndComments, {
      onSuccess: () => {},
      onError: (error) => console.log(error),
    })

  //select like data
  const onSelectLike: any = async (item: {
    id: string
    userId: string
    comment: string
  }) => {
    // deleteUserLikesAndComments({
    //   recipeId: item.id,
    //   userId: item.userId,
    //   comment: item.comment,
    // })
    setUserValues((prev: any) => ({
      ...prev,
      likesData: item,
      isSuccessModal: true,
    }))
  }

  //select recipe data
  const onSelectRecipe = async (item: { id: string }) => {
    getUserLikesAndComments({
      singleRecipe: singleItem,
      recipeId: singleItem.id,
    })
  }

  return {
    onSelectLike,
    userValues,
    setUserValues,
    onSelectRecipe,
    userLikesCommentsData,
  }
}

export default usePosts
