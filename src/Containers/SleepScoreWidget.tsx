import React, { SyntheticEvent, useState } from 'react'
import {
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import tailwind from 'tailwind-rn'
import SleepImg from '../Assets/svgs/sleep.svg'
import { SleepDurationOptions } from '../Navigators/utils'

const timeOptions = SleepDurationOptions()

interface NetworkResp {
  error?: string
  errorMsg?: string
  sleepScore?: string
}
export default function SleepQualityWidget({
  onScoreCheck,
}: {
  onScoreCheck?: () => void
}) {
  const [durationInBed, setDurationInBed] = useState(0)
  const [durationAsleep, setDurationAsleep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sleepScore, setSleepScore] = useState(0)
  const [items] = useState(timeOptions)
  const [openDurationInBedDropDown, setOpenDurationInBedDropDown] =
    useState(false)
  const [openDurationAsleepDropDown, setOpenDurationAsleepDropDown] =
    useState(false)
  const [error, setError] = useState<NetworkResp | null>(null)

  const isSubmitButtonEnabled = durationInBed && durationAsleep && !isSubmitting
  const handleSubmit = (e: SyntheticEvent) => {
    onScoreCheck && onScoreCheck()
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    setSleepScore(0)
    setOpenDurationInBedDropDown(false)
    setOpenDurationAsleepDropDown(false)
    fetch('https://bh-lgkfbq243-bhinterview.vercel.app/api/score/sleep/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        score: (100 * durationAsleep) / (durationInBed || Number.MIN_VALUE),
      }),
    })
      .then(r => r.json())
      .then(r => {
        console.log('RESP=', r)
        return r
      })
      .then(d => {
        if (d.error) {
          setError(d)
        } else {
          setSleepScore(d.sleepScore)
        }
      })
      .catch((err: Error) =>
        setError({
          error: 'Error',
          errorMsg: `Unable to save sleep score, ${err.message}`,
        }),
      )
      .finally(() => {
        setIsSubmitting(false)
      })

    return false
  }

  const lableStyle = tailwind('font-semibold text-lg text-blue-600')
  const buttonStyle = tailwind(
    'px-12 py-2 my-6 rounded-lg bg-blue-700 text-white text-lg tracking-wider font-semibold text-center w-full',
  )

  const disabledButtonStyle = tailwind('bg-gray-400 opacity-60')
  const { width } = useWindowDimensions()
  console.log('@items', items)
  return (
    <SafeAreaView style={tailwind('bg-blue-200')}>
      <StatusBar hidden={true} />
      <View style={tailwind('px-4 py-8 h-full')}>
        <View>
          <SvgXml xml={SleepImg} width={width} height={160} />

          <View style={tailwind('py-4 relative')}>
            <Text style={lableStyle}>Duration in bed</Text>
            <View testID="dibDropDown">
              <DropDownPicker
                setOpen={() => {
                  setOpenDurationInBedDropDown(true)
                  setOpenDurationAsleepDropDown(false)
                }}
                open={openDurationInBedDropDown}
                setValue={setDurationInBed}
                items={items}
                value={durationInBed}
                dropDownDirection="TOP"
                containerStyle={tailwind('h-12 bg-blue-200')}
                textStyle={tailwind('text-blue-600 text-lg font-semibold')}
                style={tailwind('border-transparent')}
                placeholder="enter sleep duration in bed"
                placeholderStyle={tailwind('text-gray-600 opacity-60')}
                zIndex={2000}
                zIndexInverse={1000}
                onClose={() => setOpenDurationInBedDropDown(false)}
              />
            </View>
          </View>
          <View style={tailwind('py-4')}>
            <Text style={lableStyle}>Duration asleep</Text>
            <View testID="daDropDown">
              <DropDownPicker
                items={items}
                setOpen={() => {
                  setOpenDurationAsleepDropDown(true)
                  setOpenDurationInBedDropDown(false)
                }}
                value={durationAsleep}
                setValue={setDurationAsleep}
                open={openDurationAsleepDropDown}
                zIndex={1000}
                zIndexInverse={2000}
                containerStyle={tailwind('h-12 bg-blue-200')}
                textStyle={tailwind('text-blue-600 text-lg font-semibold')}
                dropDownContainerStyle={[
                  tailwind('bg-white opacity-100 border-blue-600'),
                ]}
                listItemContainerStyle={tailwind('opacity-100')}
                style={tailwind('border-transparent')}
                placeholder="enter sleep duration asleep"
                placeholderStyle={tailwind('text-gray-600 opacity-60')}
                onClose={() => setOpenDurationAsleepDropDown(false)}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              testID="submit-btn"
              style={[
                buttonStyle,
                isSubmitButtonEnabled ? {} : disabledButtonStyle,
              ]}
              disabled={!isSubmitButtonEnabled}
              onPress={handleSubmit}
            >
              <Text
                style={tailwind(
                  'text-white font-semibold text-center tracking-wider text-base',
                )}
              >
                {isSubmitting ? 'Loading' : 'Calculate'}
              </Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <View testID="sleep-score-error">
              <Text
                testID="error-msg"
                style={tailwind('text-center text-red-500 font-semibold')}
              >
                {error.errorMsg}
              </Text>
            </View>
          ) : null}
          {sleepScore ? (
            <View style={tailwind('py-8 text-center')} testID="sleep-score">
              <Text
                style={[
                  tailwind(
                    'font-extrabold text-6xl text-centerfont-black text-center text-blue-600',
                  ),
                  { fontSize: 92 },
                ]}
              >
                {sleepScore}
              </Text>
              <Text
                style={tailwind(
                  'text-center text-semibold text-blue-600 text-lg',
                )}
              >
                Your Sleep Score
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}
