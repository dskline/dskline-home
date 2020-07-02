const LIGHTS_OFF_COMMAND = JSON.stringify(
  Object.fromEntries([
    ['device_iden', process.env.EXPO_PUSHBULLET_DEVICE],
    ['type', 'note'],
    ['body', 'sleep'],
  ])
)

export const turnLightsOff = (): void => {
  fetch('https://api.pushbullet.com/v2/pushes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'Access-Token': process.env.EXPO_PUSHBULLET_TOKEN,
    },
    body: LIGHTS_OFF_COMMAND,
  })
    .then(() => console.log('Sent lights off command'))
    .catch(console.error)
}
