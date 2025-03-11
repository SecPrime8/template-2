import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewDebate() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto p-6 md:p-12">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Debates
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">Start a New Debate</h1>

        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Debate Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Should artificial intelligence be regulated by governments?"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide context and background for the debate topic..."
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., technology, politics, ethics (comma separated)"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Debate Rules</h3>
            
            <div>
              <label htmlFor="maxArguments" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Arguments per User
              </label>
              <input
                type="number"
                id="maxArguments"
                name="maxArguments"
                min="1"
                max="10"
                defaultValue="3"
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                Time Limit (minutes, optional)
              </label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                min="5"
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="No limit"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireEvidence"
                name="requireEvidence"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="requireEvidence" className="ml-2 block text-sm text-gray-700">
                Require evidence for arguments
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Debate
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 