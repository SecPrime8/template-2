import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DebateHeader from './components/DebateHeader';
import ArgumentSection from './components/ArgumentSection';
import NewArgumentForm from './components/NewArgumentForm';
import type { Debate } from '@/lib/types/debate';

// Mock data for development - will be replaced with real data fetch
const mockDebate: Debate = {
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
  // Use the ID from params or mock data
  const debateId = params.id || mockDebate.id;
  
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

        <DebateHeader debate={mockDebate} />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Pro Arguments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-green-700">Supporting Arguments</h2>
            <ArgumentSection 
              arguments={mockDebate.proArguments}
              type="pro"
              debateId={debateId}
            />
            <div className="mt-6">
              <NewArgumentForm debateId={debateId} type="pro" />
            </div>
          </section>

          {/* Con Arguments Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-red-700">Opposing Arguments</h2>
            <ArgumentSection 
              arguments={mockDebate.conArguments}
              type="con"
              debateId={debateId}
            />
            <div className="mt-6">
              <NewArgumentForm debateId={debateId} type="con" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 