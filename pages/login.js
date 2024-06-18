import { useState } from 'react';
import { useRouter } from 'next/router'; // Using Next.js router
import { PasswordInput, TextInput, Notification } from "@mantine/core";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  // Define your correct email and password combination
  const correctEmail = 'test@test.dk';
  const correctPassword = '1234';

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the input matches the correct email and password
    if (email === correctEmail && password === correctPassword) {
      // Set authentication status
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to the dashboard
      router.push('/user/dashboard');
    } else {
      // Show error notification
      setShowError(true);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <img src="/logo.png" className="h-16 w-48" alt="Logo"></img>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          {/* Notification for login error */}
          {showError && (
            <Notification
              title="Forkert bruger eller kodeord"
              color="red"
              onClose={() => setShowError(false)}
              shadow="md"
              className="mt-4"
            >
              Forkert bruger eller kodeord
            </Notification>
          )}
        </div>
      </div>
    </>
  );
}
