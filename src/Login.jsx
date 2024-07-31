import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';


const  supabaseUrl = 'https://rdfqlgygagqscdhvwuco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZnFsZ3lnYWdxc2NkaHZ3dWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODU0MjgsImV4cCI6MjAxNjA2MTQyOH0.XiWOps8ZL9ExxOU5EE4y3Le-YxUR6_NxO6kYKmzlCvs'; // Replace with your actual Supabase API key

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAuthStateChange = useCallback(
    async (event) => {
      if (event == 'SIGNED_OUT') {
        navigate('/');
      } else if (event == 'SIGNED_IN') {
        navigate('/podcasts');
      }
    },
    [navigate]
  );

  useEffect(() => {
    // Set up the onAuthStateChange listener with the callback function
    supabase.auth.onAuthStateChange(handleAuthStateChange);

  

    // Cleanup when the component unmounts
    return () => {
      // Perform any necessary cleanup here
    };
  }, [handleAuthStateChange]);

  return (
    <div>


      <h2 className='topHeader'>
        Podgasm
      </h2>
      <Auth
    supabaseClient={supabase}
    
    appearance={{ theme: ThemeSupa }}
  />
    </div>
  );
};

export default LoginPage;
