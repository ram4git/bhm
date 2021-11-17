/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef
} from '@react-navigation/native'

type RootStackParamList = {
  Startup: undefined
  Home: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export const SleepDurationOptions = () => {
  const options = []
  for (let i: number = 0; i < 24; i++) {
    options.push({ key: `${i}h0m`, value: `${i * 60}`, label: `${i} hours` })
    options.push({
      key: `${i}h30m`,
      value: `${i * 60 + 30}`,
      label: `${i} hours 30 mins`,
    })
  }
  return options
}
