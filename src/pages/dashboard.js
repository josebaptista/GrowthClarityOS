import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/ProgressBar';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.session();
    if (!currentSession) {
      router.push('/signup');
    } else {
      setSession(currentSession);
    }
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      listener.unsubscribe();
    };
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-neutralLight">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <ProgressBar currentStep={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <Link href="/jtbd">
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">JTBD Diagnostic</h3>
                <p className="text-neutralDark">Start your growth opportunity analysis</p>
              </a>
            </Link>
            <Link href="/archetype">
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">Brand Archetype Quiz</h3>
                <p className="text-neutralDark">Discover your unique brand voice</p>
              </a>
            </Link>
            <Link href="/strategy">
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">Strategic Choices</h3>
                <p className="text-neutralDark">Define how you will win</p>
              </a>
            </Link>
            <Link href="/marketing">
              <a className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-2">Marketing Blueprint</h3>
                <p className="text-neutralDark">Build your high-ROI marketing plan</p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
