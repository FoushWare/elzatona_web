'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Progress } from '@/shared/components/ui/progress';
import {
  Trash2,
  Edit3,
  CheckSquare,
  Square,
  AlertTriangle,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useBulkDelete, useBulkEdit } from '@/hooks/useTanStackQuery';
import { useNotificationActions } from '@/hooks/useNotificationActions';

interface BulkOperationsProps {
  type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
  items: Array<{
    id: string;
    name?: string;
    title?: string;
    [key: string]: any;
  }>;
  onRefresh: () => void;
}

interface BulkEditFormData {
  [key: string]: any;
}

export const BulkOperations: React.FC<BulkOperationsProps> = ({
  type,
  items,
  onRefresh,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [bulkEditForm, setBulkEditForm] = useState<BulkEditFormData>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkDeleteMutation = useBulkDelete();
  const bulkEditMutation = useBulkEdit();
  const { showNotification } = useNotificationActions();

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    setIsProcessing(true);
    try {
      const result = await bulkDeleteMutation.mutateAsync({
        type,
        ids: selectedItems,
      });

      if (result.success) {
        showNotification({
          type: 'success',
          title: 'Bulk Delete Successful',
          message: result.message,
        });
        setSelectedItems([]);
        onRefresh();
      } else {
        showNotification({
          type: 'error',
          title: 'Bulk Delete Failed',
          message: result.message,
        });
      }
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Bulk Delete Error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsProcessing(false);
      setIsBulkDeleteOpen(false);
    }
  };

  const handleBulkEdit = async () => {
    if (selectedItems.length === 0 || Object.keys(bulkEditForm).length === 0)
      return;

    setIsProcessing(true);
    try {
      const result = await bulkEditMutation.mutateAsync({
        type,
        ids: selectedItems,
        updates: bulkEditForm,
      });

      if (result.success) {
        showNotification({
          type: 'success',
          title: 'Bulk Edit Successful',
          message: result.message,
        });
        setSelectedItems([]);
        setBulkEditForm({});
        onRefresh();
      } else {
        showNotification({
          type: 'error',
          title: 'Bulk Edit Failed',
          message: result.message,
        });
      }
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Bulk Edit Error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsProcessing(false);
      setIsBulkEditOpen(false);
    }
  };

  const getEditableFields = () => {
    const fieldConfigs: Record<
      string,
      Array<{ key: string; label: string; type: string; options?: string[] }>
    > = {
      cards: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: ['blue', 'green', 'purple', 'red', 'yellow', 'indigo'],
        },
        { key: 'icon', label: 'Icon', type: 'text' },
        { key: 'order', label: 'Order', type: 'number' },
      ],
      plans: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'duration', label: 'Duration', type: 'text' },
        {
          key: 'difficulty',
          label: 'Difficulty',
          type: 'select',
          options: ['beginner', 'intermediate', 'advanced'],
        },
        { key: 'order', label: 'Order', type: 'number' },
      ],
      categories: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: ['blue', 'green', 'purple', 'red', 'yellow', 'indigo'],
        },
        { key: 'order', label: 'Order', type: 'number' },
      ],
      topics: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        {
          key: 'difficulty',
          label: 'Difficulty',
          type: 'select',
          options: ['beginner', 'intermediate', 'advanced'],
        },
        { key: 'order', label: 'Order', type: 'number' },
      ],
      questions: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'content', label: 'Content', type: 'textarea' },
        {
          key: 'difficulty',
          label: 'Difficulty',
          type: 'select',
          options: ['beginner', 'intermediate', 'advanced'],
        },
        { key: 'category', label: 'Category', type: 'text' },
        { key: 'topic', label: 'Topic', type: 'text' },
      ],
    };

    return fieldConfigs[type] || [];
  };

  const renderFieldInput = (field: {
    key: string;
    label: string;
    type: string;
    options?: string[];
  }) => {
    const value = bulkEditForm[field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={e =>
              setBulkEditForm(prev => ({
                ...prev,
                [field.key]: e.target.value,
              }))
            }
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Select
            value={value}
            onValueChange={val =>
              setBulkEditForm(prev => ({ ...prev, [field.key]: val }))
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={e =>
              setBulkEditForm(prev => ({
                ...prev,
                [field.key]: parseInt(e.target.value) || 0,
              }))
            }
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      default:
        return (
          <Input
            value={value}
            onChange={e =>
              setBulkEditForm(prev => ({
                ...prev,
                [field.key]: e.target.value,
              }))
            }
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  if (items.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bulk Operations</span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{selectedItems.length} selected</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="flex items-center space-x-2"
            >
              {selectedItems.length === items.length ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span>Select All</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items List with Checkboxes */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                />
                <div className="flex-1">
                  <span className="font-medium">
                    {item.name || item.title || item.id}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bulk Action Buttons */}
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Dialog open={isBulkEditOpen} onOpenChange={setIsBulkEditOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                    disabled={isProcessing}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Bulk Edit ({selectedItems.length})</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Bulk Edit {type}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This will update {selectedItems.length} {type}. Leave
                        fields empty to keep current values.
                      </AlertDescription>
                    </Alert>
                    {getEditableFields().map(field => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key}>{field.label}</Label>
                        {renderFieldInput(field)}
                      </div>
                    ))}
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsBulkEditOpen(false)}
                        disabled={isProcessing}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleBulkEdit}
                        disabled={
                          isProcessing || Object.keys(bulkEditForm).length === 0
                        }
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Apply Changes'
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isBulkDeleteOpen}
                onOpenChange={setIsBulkDeleteOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center space-x-2"
                    disabled={isProcessing}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Bulk Delete ({selectedItems.length})</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm Bulk Delete</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Are you sure you want to delete {selectedItems.length}{' '}
                        {type}? This action cannot be undone.
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsBulkDeleteOpen(false)}
                        disabled={isProcessing}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleBulkDelete}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          'Delete All'
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
