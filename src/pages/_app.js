import '../styles/globals.css';
import { supabase } from '../lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
