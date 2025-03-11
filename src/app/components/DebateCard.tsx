import Link from 'next/link';
import type { Debate } from '@/lib/types/debate';
import { Users, MessageSquare, Clock } from 'lucide-react';

type DebateCardProps = {
  debate: Debate;
};

export default function DebateCard({ debate }: DebateCardProps) {
  const totalArguments = debate.proArguments.length + debate.conArguments.length;
  const timeSince = getTimeSince(debate.createdAt);

  return (
    <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link href={`/debates/${debate.id}`} className="block">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          {debate.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {debate.description}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-4 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {debate.participants.length} participants
          </span>
          <span className="mr-4 flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            {totalArguments} arguments
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Started {timeSince}
          </span>
        </div>
      </Link>
    </article>
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
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
} 