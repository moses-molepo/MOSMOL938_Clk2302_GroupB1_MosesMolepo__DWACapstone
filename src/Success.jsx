import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import  {useEffect, useState} from 'react';
import PodcastContainer from './PodcastContainer.jsx';
import { Container } from '@mui/material';



const  supabaseUrl = 'https://rdfqlgygagqscdhvwuco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZnFsZ3lnYWdxc2NkaHZ3dWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODU0MjgsImV4cCI6MjAxNjA2MTQyOH0.XiWOps8ZL9ExxOU5EE4y3Le-YxUR6_NxO6kYKmzlCvs'; // Replace with your actual Supabase API key

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

function Test() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        async function getData (){
           await supabase.auth.getUser().then((value)=>{
               if(value.data?.user){
                  
                   setUser(value.data.user)
               }
           })
        }
   
        getData()
      },[])
   

    async function signOutUser() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                navigate('/');
                console.log('signed out')
            }
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }

    return (
    
    <>
             <Container>
        
            <h1>Welcome, {user.email || 'Guest'}!</h1>
            <button onClick={signOutUser}>Sign Out</button>
            
            <PodcastContainer/>

            </Container>
    </>
        
    );
}



export default Test
