import { Clock, Users, Tag } from 'lucide-react';
import type { Debate } from '@/lib/types/debate';

type DebateHeaderProps = {
  debate: Debate;
};

export default function DebateHeader({ debate }: DebateHeaderProps) {
  return (
    <header className="border-b pb-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        {debate.title}
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        {debate.description}
      </p>
      
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <time dateTime={debate.createdAt.toISOString()}>
            Started {getTimeSince(debate.createdAt)} ago
          </time>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {debate.participants.length} participants
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {debate.tags.map((tag) => (
          <span 
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {debate.rules && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Debate Rules</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maximum {debate.rules.maxArgumentsPerUser} arguments per user</li>
            {debate.rules.timeLimit && (
              <li>• Time limit: {debate.rules.timeLimit} minutes</li>
            )}
            {debate.rules.requireEvidence && (
              <li>• Evidence required for all arguments</li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

function getTimeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'}`;
    }
  }

  return 'just now';
} 