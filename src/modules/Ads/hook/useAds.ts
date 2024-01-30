import { useState } from 'react'
import { Api } from '@cookup/services'
import { useMutation } from 'react-query'
import { AdsFormResolver } from '@cookup/utils'
import { getErrorMessage } from '@cookup/constant'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

interface AdValues {
  data: any
  gender: any[]
  ageRange: any[]
  draftModal?: boolean
  isSaveDraft?: boolean
  publishModal?: boolean
  successModal?: boolean
}

interface UseAdsResult {
  mutate: any
  step: number
  isLoading: boolean
  adValues: AdValues
  selectedIndex: number | null
  methods: ReturnType<typeof useForm>
  onSubmit: SubmitHandler<FieldValues>
  onModalClick: (key: string, value: boolean) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  setAdValues: React.Dispatch<React.SetStateAction<AdValues>>
  onMultiSelect: (item: any, key: 'ageRange' | 'gender') => void
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const useAds = (): UseAdsResult => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [step, setStep] = useState(0)

  const [adValues, setAdValues] = useState<AdValues>({
    data: {},
    ageRange: [],
    gender: [],
    isSaveDraft: false,
    draftModal: false,
    publishModal: false,
    successModal: false,
  })

  const methods = useForm({
    resolver: AdsFormResolver,
    mode: 'onChange',
  })

  //mutation
  const { mutate, isLoading } = useMutation(
    adValues.isSaveDraft ? Api.ads.saveDrafts : Api.ads.addAds,
    {
      onSuccess: () => {
        onModalClick('successModal', true)
      },
      onError: (err) => {
        const errorMessage = getErrorMessage(err)
        alert(errorMessage || 'Something went wrong!')
      },
    }
  )

  const onModalClick = (key: string, value: boolean) =>
    setAdValues((prev) => ({
      ...prev,
      [key]: value,
    }))

  const onMultiSelect = (item: any, key: 'ageRange' | 'gender') => {
    const selectedIndex = adValues[key].indexOf(item)

    if (selectedIndex !== -1) {
      const updatedValues = adValues[key].filter((el: any) => el !== item)
      setAdValues((prev) => ({
        ...prev,
        [key]: updatedValues,
      }))
      methods.setValue(key, item)
    } else {
      const updatedValues = [...adValues[key], item]
      setAdValues((prev) => ({
        ...prev,
        [key]: updatedValues,
      }))
      methods.setValue(key, item)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    if (adValues.isSaveDraft) {
      onModalClick('draftModal', true)
    } else {
      setStep(1)
    }
    setAdValues((prev) => ({
      ...prev,
      data,
    }))
  }

  return {
    onModalClick,
    mutate,
    isLoading,
    step,
    setStep,
    methods,
    onSubmit,
    adValues,
    setAdValues,
    onMultiSelect,
    selectedIndex,
    setSelectedIndex,
  }
}

export default useAds
