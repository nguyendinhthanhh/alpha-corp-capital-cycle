const knownProviderCodes = new Set([
  'provider_auth_failed',
  'provider_rate_limited',
  'provider_request_failed',
  'provider_timeout',
  'provider_empty_response',
  'provider_not_configured',
  'model_not_configured',
  'base_url_not_configured',
]);

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

  if (knownProviderCodes.has(error?.code)) {
    return {
      statusCode: statusCode >= 500 ? 502 : statusCode,
      payload: {
        error: error.message,
        code: error.code,
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

