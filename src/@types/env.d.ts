type ProcessEnv = {
  env: {
    EXPO_PUSHBULLET_TOKEN: string,
    EXPO_PUSHBULLET_DEVICE: string
  }
};

declare const process: ProcessEnv
