'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Decoupled validation (simple, no dependencies)
function validateLogin(values) {
  const errors = {};
  if (!/^09\d{9}$/.test(values.phone || '')) {
    errors.phone = 'Phone must be 11 digits and start with 09';
  }
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // If user exists in localStorage, don't show login page; redirect to home
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;
      JSON.parse(raw); // will throw if malformed
      setRedirecting(true);
      router.replace('/'); // already logged in -> go to dashboard
    } catch {
      // Corrupted JSON -> clean it up so app won't crash later
      localStorage.removeItem('user');
    }
  }, [router]);

  const runValidation = (values) => {
    const errors = validateLogin(values);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login click
  const handleLogin = async () => {
    if (!runValidation({ phone })) return;

    try {
      setLoading(true);
      setErrorMessage('');

      // Fetch random user from API
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch user');

      const data = await res.json();

      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.results[0]));

      // Redirect to dashboard (home)
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Avoid flashing the login UI while redirecting
  if (redirecting) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/15 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/30 flex items-center justify-center">
                {/* Lock icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v7a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 7V7a3 3 0 1 0-6 0v2h6Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-100">Login</h2>
                <p className="text-sm text-slate-300">
                  Sign in with your Iranian mobile number
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Phone (Iran format)
            </label>
            <div
              className={[
                'flex items-center rounded-xl border bg-slate-900/40',
                'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent',
                fieldErrors.phone ? 'border-rose-600/60' : 'border-slate-700/70',
              ].join(' ')}
            >
              <span className="px-3 text-slate-400 select-none">+98</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                dir="ltr"
                maxLength={11}
                placeholder="09123456789"
                value={phone}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, '');
                  setPhone(v);
                  runValidation({ phone: v }); // dynamic validation on change
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full bg-transparent px-3 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Must be 11 digits and start with 09.
            </p>

            {fieldErrors.phone && (
              <p className="mt-3 rounded-lg border border-rose-700/50 bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
                {fieldErrors.phone}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white ring-1 ring-inset ring-indigo-500 shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm1 14.93V13h3.93A8.006 8.006 0 0 1 13 16.93ZM11 4.07V11H4.07A8.006 8.006 0 0 1 11 4.07Z" />
                  </svg>
                  Login
                </>
              )}
            </button>

            {errorMessage && (
              <p className="mt-4 rounded-lg border border-rose-700/50 bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
                {errorMessage}
              </p>
            )}

            <p className="mt-4 text-center text-xs text-slate-400">
              This is a demo. A random user profile will be stored locally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}