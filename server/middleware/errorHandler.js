export function toPublicError(error) {
  const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;

  if (statusCode === 429) {
    return {
      statusCode,
      payload: {
        error: 'Ban gui qua nhieu request. Hay doi mot chut roi thu lai.',
      },
    };
  }

  if (statusCode === 400 || statusCode === 413) {
    return {
      statusCode,
      payload: {
        error: error.message,
      },
    };
  }

  if (statusCode === 503) {
    return {
      statusCode,
      payload: {
        error: error.message,
      },
    };
  }

  return {
    statusCode: statusCode >= 500 ? 502 : statusCode,
    payload: {
      error: 'Khong the xu ly request AI luc nay.',
    },
  };
}
