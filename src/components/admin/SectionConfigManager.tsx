'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, Settings, AlertCircle } from 'lucide-react';

interface SectionConfig {
  id: string;
  defaultQuestionLimit: number;
  autoAssignEnabled: boolean;
  maxSectionsPerPath: number;
  allowOverflow: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SectionConfigManagerProps {
  onConfigUpdate?: (config: SectionConfig) => void;
}

export default function SectionConfigManager({
  onConfigUpdate,
}: SectionConfigManagerProps) {
  const [config, setConfig] = useState<SectionConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/section-config');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setConfig(data.data);
        } else {
          // Create default config if none exists
          setConfig({
            id: 'default',
            defaultQuestionLimit: 15,
            autoAssignEnabled: true,
            maxSectionsPerPath: 10,
            allowOverflow: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } else {
        throw new Error('Failed to load configuration');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load configuration'
      );
      // Set default config on error
      setConfig({
        id: 'default',
        defaultQuestionLimit: 15,
        autoAssignEnabled: true,
        maxSectionsPerPath: 10,
        allowOverflow: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/section-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...config,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccess('Configuration saved successfully!');
          onConfigUpdate?.(config);
          setTimeout(() => setSuccess(null), 3000);
        } else {
          throw new Error(data.error || 'Failed to save configuration');
        }
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save configuration'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfig = (field: keyof SectionConfig, value: any) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading configuration...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!config) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Failed to load configuration</p>
            <Button onClick={loadConfig} className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Section Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription className="text-green-600">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="defaultQuestionLimit">
                Default Question Limit
              </Label>
              <Input
                id="defaultQuestionLimit"
                type="number"
                min="1"
                max="100"
                value={config.defaultQuestionLimit}
                onChange={e =>
                  updateConfig(
                    'defaultQuestionLimit',
                    parseInt(e.target.value) || 15
                  )
                }
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Number of questions per section by default
              </p>
            </div>

            <div>
              <Label htmlFor="maxSectionsPerPath">Max Sections Per Path</Label>
              <Input
                id="maxSectionsPerPath"
                type="number"
                min="1"
                max="50"
                value={config.maxSectionsPerPath}
                onChange={e =>
                  updateConfig(
                    'maxSectionsPerPath',
                    parseInt(e.target.value) || 10
                  )
                }
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Maximum number of sections allowed per learning path
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoAssignEnabled">Auto-Assign Questions</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically assign questions to sections when created
                </p>
              </div>
              <Switch
                id="autoAssignEnabled"
                checked={config.autoAssignEnabled}
                onCheckedChange={checked =>
                  updateConfig('autoAssignEnabled', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowOverflow">Allow Section Overflow</Label>
                <p className="text-sm text-muted-foreground">
                  Allow sections to exceed the question limit
                </p>
              </div>
              <Switch
                id="allowOverflow"
                checked={config.allowOverflow}
                onCheckedChange={checked =>
                  updateConfig('allowOverflow', checked)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
