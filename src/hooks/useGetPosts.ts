import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

interface IGetPosts {
  enabled?: boolean
}

export const useGetPosts = (props: IGetPosts) => {
  const { enabled = true } = props || {}

  const { isLoading: postsLoading, data: posts } = useQuery<any>(
    ['getPosts'],
    Api.recipe.getRecipes,
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  )

  return {
    posts,
    postsLoading,
  }
}
export default useGetPosts
