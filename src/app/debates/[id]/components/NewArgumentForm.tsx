'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

type NewArgumentFormProps = {
  debateId: string;
  type: 'pro' | 'con';
};

export default function NewArgumentForm({ debateId, type }: NewArgumentFormProps) {
  const [argument, setArgument] = useState('');
  const [evidence, setEvidence] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const addEvidenceField = () => {
    setEvidence([...evidence, '']);
  };

  const removeEvidenceField = (index: number) => {
    setEvidence(evidence.filter((_, i) => i !== index));
  };

  const updateEvidence = (index: number, value: string) => {
    const newEvidence = [...evidence];
    newEvidence[index] = value;
    setEvidence(newEvidence);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setDebugInfo(null);
    setIsSubmitting(true);

    try {
      // Validate input
      if (!argument.trim()) {
        throw new Error('Please enter your argument');
      }

      // Filter out empty evidence
      const validEvidence = evidence.filter(e => e.trim());
      if (validEvidence.length === 0) {
        throw new Error('Please provide at least one piece of evidence');
      }

      // Debug information
      const apiUrl = `/api/debates/${debateId}/arguments`;
      setDebugInfo(`Sending request to: ${apiUrl}`);
      console.log(`Submitting to ${apiUrl}`, {
        content: argument,
        evidence: validEvidence,
        type
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          content: argument,
          evidence: validEvidence,
          type,
        }),
      });

      // Debug response
      setDebugInfo(prev => `${prev}\nResponse status: ${response.status}`);
      console.log('Response status:', response.status);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        setDebugInfo(prev => `${prev}\nNon-JSON response: ${text.substring(0, 100)}...`);
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit argument');
      }

      // Clear form on success
      setArgument('');
      setEvidence(['']);
      
      // Show success message
      setSuccessMessage('Argument submitted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds

    } catch (err) {
      console.error('Error submitting argument:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {debugInfo && (
        <div className="p-3 text-xs font-mono text-gray-700 bg-gray-100 border border-gray-200 rounded-lg whitespace-pre-wrap">
          <strong>Debug Info:</strong>
          <br />
          {debugInfo}
        </div>
      )}

      <div>
        <label 
          htmlFor="argument" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Argument
        </label>
        <textarea
          id="argument"
          value={argument}
          onChange={(e) => setArgument(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Present your ${type === 'pro' ? 'supporting' : 'opposing'} argument...`}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Evidence
          </label>
          <button
            type="button"
            onClick={addEvidenceField}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Evidence
          </button>
        </div>
        
        <div className="space-y-3">
          {evidence.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateEvidence(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a source, reference, or evidence to support your argument..."
                required
              />
              {evidence.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEvidenceField(index)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
          type === 'pro'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : `Submit ${type === 'pro' ? 'Supporting' : 'Opposing'} Argument`}
      </button>
    </form>
  );
} 