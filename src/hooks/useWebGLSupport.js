const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
};

export const useWebGLSupport = () => {
  const isSupported = checkWebGLSupport();
  const isChecking = false;

  return { isSupported, isChecking };
};
