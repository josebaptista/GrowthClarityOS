import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { calculateOpportunityScore } from '../lib/utils';
import { useRouter } from 'next/router';

const outcomes = [
  'Test demand for new service offering',
  'Identify high-value customer segments',
  'Optimize pricing and packaging',
  'Streamline marketing campaign execution',
  'Improve brand messaging clarity',
  'Generate qualified leads consistently',
  'Analyze competitive landscape quickly',
  'Build a repeatable growth framework',
  'Evaluate new channel opportunities',
  'Measure ROI on marketing spend',
];

export default function JTBD() {
  const [responses, setResponses] = useState(
    outcomes.reduce((acc, out) => {
      acc[out] = { importance: 5, satisfaction: 5 };
      return acc;
    }, {})
  );
  const [topResults, setTopResults] = useState([]);
  const router = useRouter();

  const handleSliderChange = (outcome, field, value) => {
    setResponses((prev) => ({
      ...prev,
      [outcome]: {
        ...prev[outcome],
        [field]: parseInt(value),
      },
    }));
  };

  const calculateScores = async () => {
    const user = supabase.auth.user();
    if (!user) {
      router.push('/signup');
      return;
    }
    for (const outcome of outcomes) {
      const { importance, satisfaction } = responses[outcome];
      await supabase.from('jtbd_responses').insert([
        {
          user_id: user.id,
          outcome_id: outcomes.indexOf(outcome) + 1,
          importance,
          satisfaction,
        },
      ]);
    }
    const scored = outcomes.map((outcome) => {
      const { importance, satisfaction } = responses[outcome];
      const score = calculateOpportunityScore(importance, satisfaction);
      return { outcome, importance, satisfaction, score };
    });
    const sorted = scored.sort((a, b) => b.score - a.score);
    const topThree = sorted.slice(0, 3);
    for (const res of topThree) {
      await supabase.from('jtbd_results').insert([
        {
          user_id: user.id,
          outcome_id: outcomes.indexOf(res.outcome) + 1,
          score: res.score,
        },
      ]);
    }
    setTopResults(topThree);
  };

  return (
    <div className="min-h-screen bg-neutralLight p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Step 1: JTBD Diagnostic & Opportunity Score</h2>
      <p className="text-neutralDark mb-6">Rate each outcome’s importance and how satisfied you are with current solutions.</p>
      <div className="space-y-6">
        {outcomes.map((outcome) => (
          <div key={outcome} className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-lg font-medium text-primary mb-2">{outcome}</h3>
            <label className="block mb-1 text-neutralDark">Importance: {responses[outcome].importance}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={responses[outcome].importance}
              onChange={(e) => handleSliderChange(outcome, 'importance', e.target.value)}
              className="w-full mb-4"
            />
            <label className="block mb-1 text-neutralDark">Satisfaction: {responses[outcome].satisfaction}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={responses[outcome].satisfaction}
              onChange={(e) => handleSliderChange(outcome, 'satisfaction', e.target.value)}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={calculateScores}
        className="mt-8 bg-secondary text-white py-2 px-6 rounded-2xl shadow hover:bg-secondary/90"
      >
        Calculate My Scores
      </button>

      {topResults.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-primary mb-4">Your Top 3 Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topResults.map((res, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow">
                <h4 className="text-lg font-medium text-primary mb-2">{res.outcome}</h4>
                <p className="text-neutralDark">
                  Importance: {res.importance}, Satisfaction: {res.satisfaction}
                </p>
                <p className="text-neutralDark">Opportunity Score: {res.score}</p>
                <p className="mt-2 text-neutralGray italic">“AI Tip: Consider running a small pilot to validate this outcome.”</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/archetype')}
            className="mt-8 bg-secondary text-white py-2 px-6 rounded-2xl shadow hover:bg-secondary/90"
          >
            Proceed to Brand Archetype →
          </button>
        </div>
      )}
    </div>
