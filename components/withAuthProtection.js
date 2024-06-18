import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuthProtection(WrappedComponent) {
    return (props) => {
      const router = useRouter();
  
      useEffect(() => {
        const isAuthenticated = localStorage.getItem('isLoggedIn'); // Example check
        if (!isAuthenticated) {
          router.push('/login');
        }
      }, []);
  
      return <WrappedComponent {...props} />;
    };
  }
  