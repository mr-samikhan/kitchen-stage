import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

const useGetUser = (id: string) => {
  const { isLoading: userLoading, data: user } = useQuery<any>(
    ['getUser', id],
    () => Api.user.getUser(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  return {
    user,
    userLoading,
  }
}

export default useGetUser
