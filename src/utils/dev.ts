declare const __DEV__: boolean;

export function logInDev(...logString: any) {
  if (__DEV__) {
    console.log('[deep work]: ', ...logString);
  }
}