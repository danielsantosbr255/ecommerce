"use client";

import { useEffect, useState, useCallback } from "react";
import { permissionService } from "@/services/permissions";
import { Permission } from "@/types";

export function useRoleForm() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const fetchOptions = useCallback(async () => {
    setLoadingOptions(true);
    setOptionsError(null);
    try {
      const permissionsFromApi = await permissionService.getAll();
      if (permissionsFromApi) {
        setPermissions(permissionsFromApi);
      }
    } catch (err) {
      console.error("Erro ao buscar opções:", err);
      setOptionsError("Falha ao carregar permissões.");
    } finally {
      setLoadingOptions(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return { permissions, loadingOptions, optionsError };
}
