import { useForm } from 'react-hook-form'
import { AdminsFormResolver } from '@cookup/utils'
import { IAdminsFormResolver } from 'types/FormResolvers'

export const useAdmins = () => {
  const methods = useForm<IAdminsFormResolver>({
    resolver: AdminsFormResolver,
  })

  let isValid = methods.formState.isValid

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return { methods, onSubmit, isValid }
}

export default useAdmins
