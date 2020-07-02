import { useEffect } from 'react'

import { useNotification } from 'src/features/Notification/useNotification'
import { turnLightsOff } from 'src/features/NotificationLightsOff/lightsOffService'

export const useLightsOffNotification = (): void => {
  const {
    scheduleNotification,
    notificationClickedListener,
  } = useNotification()

  useEffect(() => {
    const notificationText = 'Click to turn off the lights'

    scheduleNotification({
      content: {
        title: 'Bed time!',
        body: notificationText,
      },
      trigger: {
        repeats: true,
        hour: 22,
        minute: 0,
      },
    })
      .then(() =>
        console.log('Scheduled "lights off" notification has been registered')
      )
      .catch(console.error)

    const subscription = notificationClickedListener((response) => {
      if (response.notification.request.content.body === notificationText) {
        turnLightsOff()
      }
    })

    return (): void => subscription.remove()
  })
}
