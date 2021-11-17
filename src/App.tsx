import ApplicationNavigator from '@/Navigators/Application'
import { persistor, store } from '@/Store'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './Translations'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
)

export default App
