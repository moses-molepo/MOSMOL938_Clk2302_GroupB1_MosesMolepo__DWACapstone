import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { useNavigate } from 'react-router-dom'


const  supabaseUrl = 'https://rdfqlgygagqscdhvwuco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZnFsZ3lnYWdxc2NkaHZ3dWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODU0MjgsImV4cCI6MjAxNjA2MTQyOH0.XiWOps8ZL9ExxOU5EE4y3Le-YxUR6_NxO6kYKmzlCvs'; // Replace with your actual Supabase API key

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/podcasts'); // Use navigate to redirect after login
  };
  return (
    <div>
      <h2>Login Page</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        onSuccess={handleLogin} // Call handleSuccess on successful login
      />
    </div>
  );
};

export default LoginPage