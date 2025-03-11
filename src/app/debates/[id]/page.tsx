'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DebateHeader from './components/DebateHeader';
import ArgumentSection from './components/ArgumentSection';
import NewArgumentForm from './components/NewArgumentForm';
import type { Debate, Argument } from '@/lib/types/debate';

// Mock data for initial state
const initialDebate: Debate = {
  id: '1',
  title: 'Should artificial intelligence be regulated by governments?',
  description: 'Join the discussion on the implications of AI regulation and its impact on innovation and safety.',
  createdBy: 'user1',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  status: 'open',
  proArguments: [],
  conArguments: [],
  tags: ['technology', 'politics', 'ethics'],
  participants: ['user1', 'user2', 'user3'],
  rules: {
    maxArgumentsPerUser: 3,
    requireEvidence: true
  }
};

export default function DebatePage({ params }: { params: { id: string } }) {
  const [debate, setDebate] = useState<Debate>(initialDebate);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArguments = async () => {
    try {
      const response = await fetch(`/api/debates/${params.id}/arguments`);
      if (!response.ok) {
        throw new Error('Failed to fetch arguments');
      }
      const fetchedArgs = await response.json();
      
      // Update debate with fetched arguments
      setDebate(prevDebate => ({
        ...prevDebate,
        proArguments: fetchedArgs.filter((arg: Argument) => arg.type === 'pro'),
        conArguments: fetchedArgs.filter((arg: Argument) => arg.type === 'con')
      }));
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load arguments');
      setIsLoading(false);
    }
  };

  // Fetch arguments on mount and after new submissions
  useEffect(() => {
    fetchArguments();
  }, [params.id]);

  const handleArgumentSubmitted = () => {
    // Refetch arguments after a new submission
    fetchArguments();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Debates
        </Link>

        <DebateHeader debate={debate} />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Pro Arguments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-green-700">Supporting Arguments</h2>
            {isLoading ? (
              <div className="text-center p-8">Loading arguments...</div>
            ) : (
              <>
                <ArgumentSection 
                  arguments={debate.proArguments}
                  type="pro"
                  debateId={params.id}
                />
                <div className="mt-6">
                  <NewArgumentForm 
                    debateId={params.id} 
                    type="pro" 
                    onArgumentSubmitted={handleArgumentSubmitted}
                  />
                </div>
              </>
            )}
          </section>

          {/* Con Arguments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-red-700">Opposing Arguments</h2>
            {isLoading ? (
              <div className="text-center p-8">Loading arguments...</div>
            ) : (
              <>
                <ArgumentSection 
                  arguments={debate.conArguments}
                  type="con"
                  debateId={params.id}
                />
                <div className="mt-6">
                  <NewArgumentForm 
                    debateId={params.id} 
                    type="con"
                    onArgumentSubmitted={handleArgumentSubmitted}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
} 