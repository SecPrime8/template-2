import { ThumbsUp, ThumbsDown, Flag, AlertTriangle } from 'lucide-react';
import type { Argument } from '@/lib/types/debate';

type ArgumentSectionProps = {
  arguments: Argument[];
  type: 'pro' | 'con';
  debateId: string;
};

export default function ArgumentSection({ arguments: args, type, debateId }: ArgumentSectionProps) {
  if (args.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">No arguments yet. Be the first to contribute!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {args.map((argument) => (
        <ArgumentCard 
          key={argument.id} 
          argument={argument}
          type={type}
        />
      ))}
    </div>
  );
}

function ArgumentCard({ argument, type }: { argument: Argument; type: 'pro' | 'con' }) {
  const totalVotes = argument.votes.reduce((acc, vote) => acc + vote.value, 0);
  const hasEvidence = argument.evidence.length > 0;
  const hasFallacyFlags = argument.fallacyFlags.length > 0;

  return (
    <article className={`p-6 rounded-lg border ${
      type === 'pro' ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-900 mb-2">{argument.content}</p>
          
          {/* Evidence Section */}
          {hasEvidence && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Evidence:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {argument.evidence.map((evidence, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{evidence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Voting and Actions */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-500 hover:text-green-600">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span>{totalVotes}</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-red-600">
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {hasFallacyFlags && (
            <div className="flex items-center text-amber-600" title="Fallacy flags">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>{argument.fallacyFlags.length}</span>
            </div>
          )}
          <button 
            className="flex items-center text-gray-500 hover:text-amber-600"
            title="Flag logical fallacy"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fallacy Flags */}
      {hasFallacyFlags && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded">
          <h4 className="text-sm font-medium text-amber-800 mb-2">
            Logical Fallacies Identified:
          </h4>
          <ul className="text-sm text-amber-700 space-y-2">
            {argument.fallacyFlags.map((flag, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">{flag.fallacyId}</p>
                  <p className="text-amber-600 mt-1">{flag.explanation}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
} 