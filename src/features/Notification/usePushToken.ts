import { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const usePushToken = (): string => {
  const [pushToken, setPushToken] = useState<string>()

  const registerPushToken = async (): Promise<string> => {
    let token

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        )
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      const { data } = await Notifications.getExpoPushTokenAsync()
      token = data
    }
    return token
  }

  useEffect(() => {
    registerPushToken().then(setPushToken).catch(console.error)
  }, [])

  return pushToken
}
