'use client';

export default function ImportTestPage() {
  // Test imports directly in the component
  let testResults = [];

  try {
    const { useLearningPlanTemplates } = require('@elzatona/shared/hooks');
    testResults.push('✅ useLearningPlanTemplates imported successfully');
  } catch (error) {
    testResults.push(`❌ useLearningPlanTemplates failed: ${error.message}`);
  }

  try {
    const { notify } = require('@elzatona/shared/ui');
    testResults.push('✅ notify imported successfully');
  } catch (error) {
    testResults.push(`❌ notify failed: ${error.message}`);
  }

  try {
    const { useConfirmation } = require('@elzatona/shared/ui');
    testResults.push('✅ useConfirmation imported successfully');
  } catch (error) {
    testResults.push(`❌ useConfirmation failed: ${error.message}`);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Import Test Page</h1>
      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
