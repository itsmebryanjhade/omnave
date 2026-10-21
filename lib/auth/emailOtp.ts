export const EMAIL_OTP_LENGTH = 8;

export function normalizeEmailOtp(value: string): string {
  return value.replace(/\D/g, '').slice(0, EMAIL_OTP_LENGTH);
}

export function isCompleteEmailOtp(value: string): boolean {
  return value.length === EMAIL_OTP_LENGTH && /^\d+$/.test(value);
}
