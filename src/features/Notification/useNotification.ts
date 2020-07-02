import { useEffect, useState } from 'react'
import { NotificationContentInput } from 'expo-notifications'
import * as Notifications from 'expo-notifications'

import { useNotificationOptions } from 'src/features/Notification/useNotificationOptions'
import { usePushToken } from 'src/features/Notification/usePushToken'

export const useNotification = () => {
  useNotificationOptions()
  const pushToken = usePushToken()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (pushToken && messages.length) {
      messages.forEach((message) => {
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: pushToken,
            ...message,
          }),
        }).catch(console.error)
      })
      setMessages([])
    }
  }, [pushToken, messages])

  const sendNotification = (message: NotificationContentInput): void => {
    setMessages([...messages, message])
  }

  return {
    sendNotification,
    scheduleNotification: Notifications.scheduleNotificationAsync,
    notificationClickedListener:
      Notifications.addNotificationResponseReceivedListener,
  }
}
