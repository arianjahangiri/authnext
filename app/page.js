'use client';

import React, { useEffect, useState } from 'react';

/**
 * Beautiful, minimal dashboard styled with Tailwind CSS.
 * - Reads "user" from localStorage (RandomUser profile expected)
 * - Displays avatar, full name, and email when logged in
 * - Shows a friendly empty state when no user is logged in
 * - Consistent glassmorphism look with the previous login page
 */
const DashboardPage = () => {
  // State to hold user data retrieved from localStorage
  const [user, setUser] = useState(null);

  // State to hold error message to display when user is not logged in
  const [error, setError] = useState('');

  // On component mount, try to get the user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // If parsing fails, clear invalid data
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handler for the login button click event
  // If no user data found, display an error message
  const handleLoginClick = () => {
    if (!user) {
      setError('You are not logged in.');
    } else {
      // If user exists, you can add further actions here (e.g., navigate)
    }
  };

  const fullName =
    user?.name
      ? [user.name.title, user.name.first, user.name.last].filter(Boolean).join(' ')
      : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <section className="rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/15 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/30">
                {/* User icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5Zm0 2c-5.33 0-8 2.686-8 5v1h16v-1c0-2.314-2.67-5-8-5Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-100">
                  {user ? 'Your Profile' : 'Dashboard'}
                </h1>
                <p className="text-sm text-slate-300">
                  {user
                    ? 'Welcome back! Your session is loaded from localStorage.'
                    : 'No active session found.'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            {user ? (
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <img
                  src={
                    user?.picture?.large ||
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
                  }
                  alt="User avatar"
                  className="h-28 w-28 rounded-xl object-cover ring-1 ring-white/15 shadow mb-4"
                />

                {/* Name */}
                <h2 className="text-2xl font-semibold text-slate-100">
                  {fullName || 'Anonymous'}
                </h2>

                {/* Email */}
                <p className="mt-1 text-slate-300">
                  {user?.email ? (
                    <a
                      href={`mailto:${user.email}`}
                      className="hover:underline"
                      rel="noopener"
                    >
                      {user.email}
                    </a>
                  ) : (
                    '—'
                  )}
                </p>

                {/* Action button */}
                <button
                  onClick={handleLoginClick}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-indigo-500 shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="text-center">
                {/* Empty state illustration */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800/70 ring-1 ring-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-slate-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5Zm0 2c-5.33 0-8 2.686-8 5v1h16v-1c0-2.314-2.67-5-8-5Z" />
                  </svg>
                </div>

                <p className="text-slate-200 text-lg">No user is currently logged in.</p>
                <p className="mt-1 text-slate-400 text-sm">
                  Use the login page to create a local session.
                </p>

                <button
                  onClick={handleLoginClick}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-indigo-500 shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Login
                </button>

                {/* Error message displayed when login fails */}
                {error && (
                  <p className="mt-4 rounded-lg border border-rose-700/50 bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;