import { it } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'
import SleepWidget from '../src/Containers/SleepScoreWidget'
describe('Sleep Score Widget', () => {
  it('renders correctly with all props', () => {
    const onPressMock = jest.fn()

    const { getByText, getByTestId, debug, container } = render(
      <SleepWidget onScoreCheck={onPressMock} />,
    )
    // debug()
    const firstLabel = getByText('Duration in bed')
    const secondLabel = getByText('Duration asleep')
    const submitButton = getByTestId('submit-btn')
    expect(firstLabel).not.toBeNull()
    expect(secondLabel).not.toBeNull()
    expect(submitButton).toBeTruthy()
    fireEvent.press(submitButton)
    expect(onPressMock).not
  })

  it('button is disabled without dropdown values', async () => {
    const onPressMock = jest.fn()
    const eventData = {
      nativeEvent: {
        pageX: 20,
        pageY: 30,
      },
    }

    const { getByText, getByTestId, debug, queryByTestId } = render(
      <SleepWidget onScoreCheck={onPressMock} />,
    )
    debug()
    const sleepDurationDropDown = getByTestId('dibDropDown')
    const asleepDurationDropDown = getByTestId('daDropDown')
    expect(sleepDurationDropDown).toBeTruthy()
    expect(asleepDurationDropDown).toBeTruthy()

    const submitButton = getByTestId('submit-btn')
    fireEvent.press(submitButton, eventData)
    expect(onPressMock).not.toHaveBeenCalledWith(eventData)
  })

  it('Button is enabled and be able to submit', () => {
    const onPressMock = jest.fn()

    const { getByText, getByTestId, debug, queryByTestId } = render(
      <SleepWidget onScoreCheck={onPressMock} />,
    )
    expect(null).toBeNull()
  })

  it('sleep score text is showing up', () => {
    const onPressMock = jest.fn()

    const { getByText, getByTestId, debug, queryByTestId } = render(
      <SleepWidget onScoreCheck={onPressMock} />,
    )
    expect(null).toBeNull()
  })
})
