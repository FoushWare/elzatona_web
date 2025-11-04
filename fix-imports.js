const fs = require('fs');

// Read the current file
const filePath = 'src/app/admin/content/questions/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the individual UI component imports with a single import
const oldImports = `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { AdvancedSearch } from '@/shared/components/common/AdvancedSearch';`;

const newImports = `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Textarea,
  Checkbox,
} from '@/shared/components';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AdvancedSearch } from '@/shared/components/common/AdvancedSearch';`;

// Replace the imports
content = content.replace(oldImports, newImports);

// Write the fixed content back
fs.writeFileSync(filePath, content);

console.log('✅ Fixed imports in admin questions page');
