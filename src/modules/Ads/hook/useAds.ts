import { useState } from 'react'
import { Api } from '@cookup/services'
import { useMutation, useQueryClient } from 'react-query'
import { AdsFormResolver } from '@cookup/utils'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useSelector } from 'react-redux'

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
  deleteAd?: any
  isLoading: boolean
  adValues: AdValues
  selectedIndex: number | null
  onDeleteAd: (item: any) => void
  methods: ReturnType<typeof useForm>
  onSubmit: SubmitHandler<FieldValues>
  onSelectSingleAd: (item: any) => void
  onModalClick: (key: string, value: boolean) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  setAdValues: React.Dispatch<React.SetStateAction<AdValues>>
  onMultiSelect: (item: any, key: 'ageRange' | 'gender') => void
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const useAds = (): UseAdsResult => {
  const queryClient = useQueryClient()

  const { tabValue } = useSelector((state: any) => state.user)

  const [step, setStep] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [adValues, setAdValues] = useState<AdValues>({
    data: {},
    gender: [],
    ageRange: [],
    draftModal: false,
    isSaveDraft: false,
    publishModal: false,
    successModal: false,
  })

  const methods = useForm({
    resolver: AdsFormResolver,
    mode: 'onChange',
  })

  //mutation
  const { mutate, isLoading } = useMutation(
    adValues.isSaveDraft || tabValue === 'drafts'
      ? Api.ads.saveDrafts
      : Api.ads.addAds,
    {
      onSuccess: () => {
        onModalClick('successModal', true)
        queryClient.invalidateQueries('getAds')
      },
      onError: (err) => {
        const errorMessage = getErrorMessage(err)
        alert(errorMessage || 'Something went wrong!')
      },
    }
  )

  //delete mutation
  const { mutate: deleteAd } = useMutation<any, any, any>(Api.ads.deleteAds, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAds')
    },
    onError: (err: any) => {
      alert(err || 'Something went wrong!')
    },
  })

  //duplicate mutation
  const { mutate: onDuplicate } = useMutation<any, any, any>(
    Api.ads.duplicateAds,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAds')
      },
      onError: (err: any) => {
        alert(err || 'Something went wrong!')
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

  //select single ad
  const onSelectSingleAd = (item: any) => {
    console.log(item)
    onDuplicate({
      data: { ...item, createdAt: new Date(), id: Math.random().toString() },
      collectionName:
        tabValue === 'drafts' ? COLLECTIONS.DRAFT_ADS : COLLECTIONS.AD,
    })
  }

  const onDeleteAd = (item: any) => {
    console.log(item)
    deleteAd({
      id: item.id,
      collectionName:
        tabValue === 'drafts' ? COLLECTIONS.DRAFT_ADS : COLLECTIONS.AD,
    })
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
    mutate,
    step,
    setStep,
    methods,
    deleteAd,
    onSubmit,
    adValues,
    isLoading,
    onDeleteAd,
    setAdValues,
    onModalClick,
    onMultiSelect,
    selectedIndex,
    setSelectedIndex,
    onSelectSingleAd,
  }
}

export default useAds
