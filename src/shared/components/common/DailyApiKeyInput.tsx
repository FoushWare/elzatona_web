'use client';

import { useState } from 'react';
import { Info, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface DailyApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidate?: (isValid: boolean) => void;
  className?: string;
}

export default function DailyApiKeyInput({
  value,
  onChange,
  onValidate,
  className = '',
}: DailyApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'valid' | 'invalid'
  >('idle');

  const validateApiKey = async (apiKey: string) => {
    if (!apiKey.trim()) {
      setValidationStatus('idle');
      onValidate?.(false);
      return;
    }

    setIsValidating(true);
    setValidationStatus('idle');

    try {
      // Test the API key by making a simple request to Daily.co
      const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setValidationStatus('valid');
        onValidate?.(true);
      } else {
        setValidationStatus('invalid');
        onValidate?.(false);
      }
    } catch (error) {
      console.error('Error validating Daily.co API key:', error);
      setValidationStatus('invalid');
      onValidate?.(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyChange = (newValue: string) => {
    onChange(newValue);
    // Debounce validation
    const timeoutId = setTimeout(() => {
      validateApiKey(newValue);
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

  const getValidationIcon = () => {
    if (isValidating) {
      return (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      );
    }

    switch (validationStatus) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'invalid':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getValidationMessage = () => {
    switch (validationStatus) {
      case 'valid':
        return 'API key is valid ✅';
      case 'invalid':
        return 'Invalid API key ❌';
      default:
        return '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <label
          htmlFor="dailyApiKey"
          className="block text-sm font-medium text-gray-700"
        >
          Daily.co API Key *
        </label>
        <div className="relative group">
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            How to get your Daily.co API key
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          id="dailyApiKey"
          value={value}
          onChange={e => handleKeyChange(e.target.value)}
          placeholder="Enter your Daily.co API key (starts with 'sk_')"
          className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            validationStatus === 'valid'
              ? 'border-green-300 bg-green-50'
              : validationStatus === 'invalid'
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
          }`}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {getValidationIcon()}
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {getValidationMessage() && (
        <p
          className={`text-xs ${
            validationStatus === 'valid' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {getValidationMessage()}
        </p>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          How to get your Daily.co API key:
        </h4>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>
            Go to{' '}
            <a
              href="https://dashboard.daily.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              dashboard.daily.co
            </a>
          </li>
          <li>Sign up for a free account (no credit card required)</li>
          <li>
            Navigate to &quot;Developers&quot; → &quot;API Keys&quot; in the
            sidebar
          </li>
          <li>Click &quot;Create API Key&quot;</li>
          <li>Copy the generated key (starts with &apos;sk_&apos;)</li>
          <li>Paste it in the field above</li>
        </ol>
        <div className="mt-2 text-xs text-blue-700">
          <strong>Free tier includes:</strong> 2,000 minutes/month, up to 100
          participants per room
        </div>
      </div>
    </div>
  );
}
