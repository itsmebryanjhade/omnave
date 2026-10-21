import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  EMAIL_OTP_LENGTH,
  isCompleteEmailOtp,
  normalizeEmailOtp,
} from '../lib/auth/emailOtp.ts';

const source = await readFile(new URL('../components/AuthModal.tsx', import.meta.url), 'utf8');

test('a completed OTP waits for an explicit form submission', () => {
  assert.doesNotMatch(
    source,
    /useEffect\(\(\) => \{[\s\S]*?otpToken\.length === EMAIL_OTP_LENGTH[\s\S]*?handleAuthSubmit/,
  );
});

test('OTP verification has a synchronous single-flight guard', () => {
  assert.match(source, /verificationInFlightRef\.current/);
  assert.match(
    source,
    /if \(authStep === 'verify' && verificationInFlightRef\.current\) return/,
  );
});

test('email verification accepts the eight-digit OTP sent by Supabase', () => {
  assert.equal(EMAIL_OTP_LENGTH, 8);
  assert.equal(normalizeEmailOtp('12 34-5678'), '12345678');
  assert.equal(isCompleteEmailOtp('12345678'), true);
  assert.equal(isCompleteEmailOtp('123456'), false);
});
