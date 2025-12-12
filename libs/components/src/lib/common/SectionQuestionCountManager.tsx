"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { Card, CardContent, CardHeader, CardTitle } from "@elzatona/components";

interface SectionQuestionCount {
  id: string;
  sectionId: string;
  sectionName: string;
  category: string;
  question_count: number;
  maxQuestions: number;
  weight: number;
  order: number;
}
import { Button } from "@elzatona/components";
import { Input } from "@elzatona/components";
import { Label } from "@elzatona/components";
import { Badge } from "@elzatona/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  _DialogTrigger as _DialogTrigger,
} from "@elzatona/components";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Target,
  BookOpen,
  _Settings as _Settings,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface SectionQuestionCount {
  id: string;
  sectionId: string;
  sectionName: string;
  category: string;
  question_count: number;
  maxQuestions: number;
  weight: number;
  order: number;
}

interface PlanSectionConfig {
  plan_id: string;
  planName: string;
  sections: SectionQuestionCount[];
  totalQuestions: number;
  dailyQuestions: number;
}

interface SectionQuestionCountManagerProps {
  planId: string;
  planName: string;
  onSave: (config: PlanSectionConfig) => void;
  onClose: () => void;
}

export const SectionQuestionCountManager: React.FC<
  SectionQuestionCountManagerProps
> = ({ planId, planName, onSave, onClose }) => {
  const [sections, setSections] = useState<SectionQuestionCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSection, setEditingSection] =
    useState<SectionQuestionCount | null>(null);

  // Load existing plan configuration
  useEffect(() => {
    loadPlanConfiguration();
  }, [planId]);

  const loadPlanConfiguration = async () => {
    try {
      setLoading(true);

      // First, get the plan details
      const planResponse = await fetch(`/api/guided-learning/plans/${planId}`);
      const planData = await planResponse.json();

      if (planData.success && planData.plan) {
        const plan = planData.plan;

        // Convert plan sections to our format
        const sectionConfigs: SectionQuestionCount[] = plan.sections.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (section: any, index: number) => ({
            id: `section-${section.id}`,
            sectionId: section.id,
            sectionName: section.name,
            category: section.category || "general",
            question_count: section.questions?.length || 0,
            maxQuestions: section.maxQuestions || 15,
            weight: section.weight || Math.floor(100 / plan.sections.length),
            order: section.order || index + 1,
          }),
        );

        setSections(sectionConfigs);
      } else {
        // If no plan found, create default sections
        setSections([]);
      }
    } catch (error) {
      console.error("Error loading plan configuration:", error);
      toast.error("Failed to load plan configuration");
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    const newSection: SectionQuestionCount = {
      id: `section-${Date.now()}`,
      sectionId: "",
      sectionName: "",
      category: "general",
      question_count: 0,
      maxQuestions: 15,
      weight: 10,
      order: sections.length + 1,
    };
    setEditingSection(newSection);
    setShowAddDialog(true);
  };

  const editSection = (section: SectionQuestionCount) => {
    setEditingSection(section);
    setShowAddDialog(true);
  };

  const saveSection = (sectionData: Partial<SectionQuestionCount>) => {
    if (!editingSection) return;

    const updatedSection = { ...editingSection, ...sectionData };

    setSections((prev) => {
      if (
        editingSection.id.startsWith("section-") &&
        !editingSection.sectionId
      ) {
        // New section
        return [...prev, updatedSection];
      } else {
        // Update existing section
        return prev.map((s) =>
          s.id === editingSection.id ? updatedSection : s,
        );
      }
    });

    setShowAddDialog(false);
    setEditingSection(null);
    toast.success("Section saved successfully");
  };

  const deleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
    toast.success("Section deleted");
  };

  const updateSectionField = (
    sectionId: string,
    field: keyof SectionQuestionCount,
    value: any,
  ) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, [field]: value } : s)),
    );
  };

  const calculateTotalQuestions = () => {
    return sections.reduce(
      (total, section) => total + section.question_count,
      0,
    );
  };

  const calculateDailyQuestions = (duration: number) => {
    return Math.ceil(calculateTotalQuestions() / duration);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const config: PlanSectionConfig = {
        plan_id: planId,
        planName,
        sections,
        totalQuestions: calculateTotalQuestions(),
        dailyQuestions: calculateDailyQuestions(1), // Default to 1 day for calculation
      };

      // Save to API
      const response = await fetch(
        `/api/guided-learning/plans/${planId}/sections`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        },
      );

      if (response.ok) {
        onSave(config);
        toast.success("Plan configuration saved successfully");
      } else {
        throw new Error("Failed to save configuration");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      html: "bg-orange-100 text-orange-800",
      css: "bg-blue-100 text-blue-800",
      javascript: "bg-yellow-100 text-yellow-800",
      typescript: "bg-blue-100 text-blue-800",
      react: "bg-cyan-100 text-cyan-800",
      vue: "bg-green-100 text-green-800",
      angular: "bg-red-100 text-red-800",
      general: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["general"];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading plan configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Section Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure question counts for each section in &quot;{planName}&quot;
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={loadPlanConfiguration} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Configuration
          </Button>
          <Button onClick={onClose} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Plan Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {sections.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Sections
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {calculateTotalQuestions()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {calculateDailyQuestions(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Daily Questions
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {sections.reduce((sum, s) => sum + s.maxQuestions, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Max Questions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sections Configuration
          </h3>
          <Button
            onClick={addSection}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>

        {sections.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No sections configured
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add sections to start configuring question counts
              </p>
              <Button onClick={addSection}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Section
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <Card
                key={section.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {section.sectionName}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Button
                        onClick={() => editSection(section)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteSection(section.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(section.category)}>
                    {section.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-600">
                        Current Questions
                      </Label>
                      <Input
                        type="number"
                        value={section.question_count}
                        onChange={(e) =>
                          updateSectionField(
                            section.id,
                            "question_count",
                            Number.parseInt(e.target.value, 10) || 0,
                          )
                        }
                        min="0"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">
                        Max Questions
                      </Label>
                      <Input
                        type="number"
                        value={section.maxQuestions}
                        onChange={(e) =>
                          updateSectionField(
                            section.id,
                            "maxQuestions",
                            Number.parseInt(e.target.value, 10) || 15,
                          )
                        }
                        min="1"
                        max="100"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Weight (%)</Label>
                    <Input
                      type="number"
                      value={section.weight}
                      onChange={(e) =>
                        updateSectionField(
                          section.id,
                          "weight",
                          Number.parseInt(e.target.value, 10) || 0,
                        )
                      }
                      min="0"
                      max="100"
                      className="text-sm"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Order: {section.order}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Section Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSection?.id.startsWith("section-") &&
              !editingSection?.sectionId
                ? "Add Section"
                : "Edit Section"}
            </DialogTitle>
          </DialogHeader>
          {editingSection && (
            <SectionForm
              section={editingSection}
              onSave={saveSection}
              onCancel={() => {
                setShowAddDialog(false);
                setEditingSection(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Section Form Component
interface SectionFormProps {
  section: SectionQuestionCount;
  onSave: (data: Partial<SectionQuestionCount>) => void;
  onCancel: () => void;
}

const SectionForm: React.FC<SectionFormProps> = ({
  section,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] =
    useState<Partial<SectionQuestionCount>>(section);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sectionName">Section Name</Label>
        <Input
          id="sectionName"
          value={formData.sectionName || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sectionName: e.target.value }))
          }
          placeholder="e.g., JavaScript Fundamentals"
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category || "general"}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="questionCount">Current Questions</Label>
          <Input
            id="questionCount"
            type="number"
            value={formData.question_count || 0}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                question_count: Number.parseInt(e.target.value, 10) || 0,
              }))
            }
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="maxQuestions">Max Questions</Label>
          <Input
            id="maxQuestions"
            type="number"
            value={formData.maxQuestions || 15}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                maxQuestions: Number.parseInt(e.target.value, 10) || 15,
              }))
            }
            min="1"
            max="100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="weight">Weight (%)</Label>
        <Input
          id="weight"
          type="number"
          value={formData.weight || 0}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              weight: Number.parseInt(e.target.value, 10) || 0,
            }))
          }
          min="0"
          max="100"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </div>
    </div>
  );
};
