"use client";

import React, { useState } from "react";
import { Button } from "@elzatona/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@elzatona/components";
import { Badge } from "@elzatona/components";
import { Progress } from "@elzatona/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
Input,
  Label,
  Alert,
  AlertDescription,
} from "@elzatona/components";
import {
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Settings,
} from "lucide-react";
import {
  useBulkOperations,
  useBulkOperationStats,
  useBulkDelete,
  useBulkEdit,
  useBulkActivate,
  useBulkDeactivate,
  useCancelBulkOperation,
} from "@elzatona/hooks";

interface BulkOperationsProps {
  targetType: "questions" | "categories" | "topics" | "cards" | "plans";
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  onOperationComplete?: () => void;
}

export const BulkOperations: React.FC<BulkOperationsProps> = ({
  targetType,
  selectedItems,
  onSelectionChange,
  onOperationComplete,
}) => {
  const [operationType, setOperationType] = useState<
    "delete" | "edit" | "activate" | "deactivate"
  >("delete");
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [isOperationModalOpen, setIsOperationModalOpen] = useState(false);

  // Hooks
  const { data: operations, isLoading: operationsLoading } =
    useBulkOperations(10);
  const { data: stats, isLoading: statsLoading } = useBulkOperationStats();
  const bulkDelete = useBulkDelete();
  const bulkEdit = useBulkEdit();
  const bulkActivate = useBulkActivate();
  const bulkDeactivate = useBulkDeactivate();
  const cancelOperation = useCancelBulkOperation();

  const handleBulkOperation = async () => {
    if (selectedItems.length === 0) {
      alert("Please select items to perform bulk operation");
      return;
    }

    try {
      let result;
      switch (operationType) {
        case "delete":
          result = await bulkDelete.mutateAsync({
            type: targetType,
            ids: selectedItems,
          });
          break;
        case "edit":
          result = await bulkEdit.mutateAsync({
            type: targetType,
            ids: selectedItems,
            updates: editData,
          });
          break;
        case "activate":
          result = await bulkActivate.mutateAsync({
            type: targetType,
            ids: selectedItems,
          });
          break;
        case "deactivate":
          result = await bulkDeactivate.mutateAsync({
            type: targetType,
            ids: selectedItems,
          });
          break;
      }

      if (result?.success) {
        onSelectionChange([]);
        setIsOperationModalOpen(false);
        onOperationComplete?.();
      }
    } catch (error) {
      console.error("Bulk operation failed:", error);
    }
  };

  const handleCancelOperation = async (operationId: string) => {
    try {
      await cancelOperation.mutateAsync(operationId);
    } catch (error) {
      console.error("Failed to cancel operation:", error);
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case "delete":
        return <Trash2 className="h-4 w-4" />;
      case "edit":
        return <Edit className="h-4 w-4" />;
      case "activate":
        return <CheckCircle className="h-4 w-4" />;
      case "deactivate":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "running":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    return `${Math.round(ms / 60000)}m`;
  };

  return (
    <div className="space-y-6">
      {/* Bulk Operations Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Bulk Operations
          </CardTitle>
          <CardDescription>
            Perform operations on {selectedItems.length} selected {targetType}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-4">
              <Select
                value={operationType}
                onValueChange={(value: any) => setOperationType(value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="activate">Activate</SelectItem>
                  <SelectItem value="deactivate">Deactivate</SelectItem>
                </SelectContent>
              </Select>

              {operationType === "edit" && (
                <div className="flex-1 space-y-2">
                  <Label htmlFor="edit-field">Field to update</Label>
                  <Input
                    id="edit-field"
                    placeholder="Field name (e.g., isActive, difficulty)"
                    value={editData["field"] || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, field: e.target.value })
                    }
                  />
                  <Label htmlFor="edit-value">New value</Label>
                  <Input
                    id="edit-value"
                    placeholder="New value"
                    value={editData["value"] || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, value: e.target.value })
                    }
                  />
                </div>
              )}

              <Button
                onClick={handleBulkOperation}
                disabled={
                  bulkDelete.isPending ||
                  bulkEdit.isPending ||
                  bulkActivate.isPending ||
                  bulkDeactivate.isPending
                }
                className="flex items-center gap-2"
              >
                {(bulkDelete.isPending ||
                  bulkEdit.isPending ||
                  bulkActivate.isPending ||
                  bulkDeactivate.isPending) && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {getOperationIcon(operationType)}
                Execute {operationType}
              </Button>
            </div>
          )}

          {selectedItems.length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Select items from the list above to perform bulk operations.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Operations Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats?.stats?.totalOperations || 0}
                </div>
                <div className="text-sm text-gray-600">Total Operations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats?.stats?.completedOperations || 0}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats?.stats?.failedOperations || 0}
                </div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats?.stats?.runningOperations || 0}
                </div>
                <div className="text-sm text-gray-600">Running</div>
              </div>
            </div>
            {(stats?.stats?.averageProcessingTime || 0) > 0 && (
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  Average Processing Time:{" "}
                  {formatDuration(stats?.stats?.averageProcessingTime || 0)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Operations</CardTitle>
          <CardDescription>
            Track the progress of recent bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {operationsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading operations...</span>
            </div>
          ) : operations &&
            operations.operations &&
            operations.operations.length > 0 ? (
            <div className="space-y-4">
              {operations.operations.map((operation: any) => (
                <div key={operation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getOperationIcon(operation.type)}
                      <span className="font-medium">
                        {operation.type} {operation.totalItems}{" "}
                        {operation.targetType}
                      </span>
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(operation.createdAt)}
                    </div>
                  </div>

                  {operation.status === "running" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Progress: {operation.processedItems} /{" "}
                          {operation.totalItems}
                        </span>
                        <span>{operation.progress}%</span>
                      </div>
                      <Progress value={operation.progress} className="h-2" />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelOperation(operation.id)}
                          disabled={cancelOperation.isPending}
                        >
                          {cancelOperation.isPending && (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          )}
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {operation.status === "completed" && (
                    <div className="text-sm text-green-600">
                      ✅ Completed successfully
                    </div>
                  )}

                  {operation.status === "failed" && (
                    <div className="space-y-2">
                      <div className="text-sm text-red-600">
                        ❌ Operation failed
                      </div>
                      {operation.errors && operation.errors.length > 0 && (
                        <div className="text-xs text-red-500">
                          Errors: {operation.errors.join(", ")}
                        </div>
                      )}
                    </div>
                  )}

                  {operation.completedAt && (
                    <div className="text-xs text-gray-500 mt-2">
                      Completed: {formatDate(operation.completedAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No bulk operations found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
