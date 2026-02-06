import * as Sentry from "@sentry/react";

const getSentryDsn = () => import.meta.env.VITE_SENTRY_DSN;

const isMonitoringEnabled = () => import.meta.env.PROD && Boolean(getSentryDsn());

export const initMonitoring = () => {
  if (!isMonitoringEnabled()) return;

  Sentry.init({
    dsn: getSentryDsn(),
    environment: "production",
  });
};

export const captureError = (
  error: Error,
  context?: Record<string, unknown>
) => {
  if (isMonitoringEnabled()) {
    Sentry.captureException(error, { extra: context });
    return;
  }

  console.error(error, context);
};
