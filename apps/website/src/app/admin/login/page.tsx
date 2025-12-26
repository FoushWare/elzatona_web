"use client";

import { useAdminAuth } from "@elzatona/contexts";
import {
  AdminLoginPageTemplate,
  AdminLoginFormMolecule,
} from "@elzatona/components";

export default function AdminLoginPage() {
  const { isLoading } = useAdminAuth();

  return (
    <AdminLoginPageTemplate isLoading={isLoading}>
      <AdminLoginFormMolecule />
    </AdminLoginPageTemplate>
  );
}
