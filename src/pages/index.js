import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutralLight flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-primary mb-4">GrowthClarity OS</h1>
      <p className="text-lg text-neutralDark mb-8">
        A Guided, AI-Powered Strategy & Brand System to Break Your SMB’s Growth Plateau.
      </p>
      <Link href="/signup">
        <a className="bg-secondary text-white py-3 px-6 rounded-2xl shadow hover:bg-secondary/90">
          Get Started (Free JTBD Diagnostic + Brand Quiz)
        </a>
      </Link>
    </div>
  );
}
