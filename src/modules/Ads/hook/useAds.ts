import { useState } from 'react'
import { AdsFormResolver } from '@cookup/utils'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

interface AdValues {
  ageRange: any[]
  gender: any[]
  draftModal?: boolean
  publishModal?: boolean
  successModal?: boolean
}

interface UseAdsResult {
  adValues: AdValues
  selectedIndex: number | null
  methods: ReturnType<typeof useForm>
  onSubmit: SubmitHandler<FieldValues>
  setAdValues: React.Dispatch<React.SetStateAction<AdValues>>
  onMultiSelect: (item: any, key: 'ageRange' | 'gender') => void
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const useAds = (): UseAdsResult => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [adValues, setAdValues] = useState<AdValues>({
    ageRange: [],
    gender: [],
    draftModal: false,
    publishModal: false,
    successModal: false,
  })

  const methods = useForm({
    resolver: AdsFormResolver,
    mode: 'onChange',
  })

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
  }

  return {
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
