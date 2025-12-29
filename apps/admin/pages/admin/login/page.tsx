"use client";

import { useAdminAuth } from "@elzatona/contexts";
import {
  AdminLoginPageTemplate,
  AdminLoginFormMolecule,
} from "@elzatona/common-ui";

export default function AdminLoginPage() {
  const { isLoading } = useAdminAuth();

  return (
    <AdminLoginPageTemplate isLoading={isLoading}>
      <AdminLoginFormMolecule />
    </AdminLoginPageTemplate>
  );
}
