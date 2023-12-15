import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AdminsFormResolver } from '@cookup/utils'
import { IAdminsFormResolver } from 'types/FormResolvers'
import { CLOSE_ADMIN_MODAL, OPEN_ADMIN_SUCCESS } from '@cookup/redux'

export const useAdmins = () => {
  const dispatch = useDispatch()

  const methods = useForm<IAdminsFormResolver>({
    resolver: AdminsFormResolver,
  })

  let isValid = methods.formState.isValid

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(CLOSE_ADMIN_MODAL())
    dispatch(OPEN_ADMIN_SUCCESS())
  }
  return { methods, onSubmit, isValid }
}

export default useAdmins
