import Link from "next/link";
import { PlusCircle, TrendingUp, Clock, Users } from 'lucide-react';
import DebateCard from './components/DebateCard';
import type { Debate } from '@/lib/types/debate';

// Mock data for initial development
const mockDebates: Debate[] = [
  {
    id: '1',
    title: 'Should artificial intelligence be regulated by governments?',
    description: 'Join the discussion on the implications of AI regulation and its impact on innovation and safety.',
    createdBy: 'user1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'open',
    proArguments: [],
    conArguments: [],
    tags: ['technology', 'politics', 'ethics'],
    participants: ['user1', 'user2', 'user3'],
    rules: {
      maxArgumentsPerUser: 3,
      requireEvidence: true
    }
  },
  {
    id: '2',
    title: 'Is remote work the future of employment?',
    description: 'Explore the pros and cons of remote work and its impact on productivity, culture, and work-life balance.',
    createdBy: 'user2',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: 'open',
    proArguments: [],
    conArguments: [],
    tags: ['work', 'society', 'technology'],
    participants: ['user2', 'user4'],
    rules: {
      maxArgumentsPerUser: 5,
      requireEvidence: true
    }
  },
  {
    id: '3',
    title: 'Should cryptocurrency be more strictly regulated?',
    description: 'Discuss the balance between innovation in digital currencies and the need for financial stability and consumer protection.',
    createdBy: 'user3',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    status: 'open',
    proArguments: [],
    conArguments: [],
    tags: ['finance', 'technology', 'regulation'],
    participants: ['user3', 'user5', 'user6', 'user7'],
    rules: {
      maxArgumentsPerUser: 3,
      timeLimit: 7200, // 5 days
      requireEvidence: true
    }
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6 md:p-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Parle</h1>
          <p className="text-xl text-gray-600 mb-8">
            Engage in structured debates, challenge arguments with logic, and earn points for intellectual honesty.
          </p>
          <Link 
            href="/debates/new"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Start a New Debate
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 md:px-12">
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular
          </button>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700">
            <Clock className="w-4 h-4 mr-2" />
            Recent
          </button>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700">
            <Users className="w-4 h-4 mr-2" />
            Active
          </button>
        </div>

        {/* Debates List */}
        <div className="grid gap-6">
          {mockDebates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>
      </div>
    </main>
  );
}
