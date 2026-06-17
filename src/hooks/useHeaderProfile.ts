'use client';

import { useEffect, useMemo } from 'react';
import UseEmployerProfileInfo from '@/Routes/Employer/hooks/GET/profile/Profileinfo.hook';
import UseProfileSuperAdmin from '@/Routes/Admin/hook/GET/Profileinfo.hook';
import {
  getAuthRole,
  getOrganizationName,
  setOrganizationName,
} from '@/Utils/Providers/auth';

type ProfileRecord = {
  first_name?: string;
  last_name?: string;
  organization_name?: string;
  image_url?: string;
};

function normalizeProfile(data: unknown): ProfileRecord | null {
  if (!data || typeof data !== 'object') return null;

  const record = data as Record<string, unknown>;
  if (record.user && typeof record.user === 'object') {
    return record.user as ProfileRecord;
  }

  return record as ProfileRecord;
}

export function useHeaderProfile() {
  const role = getAuthRole();
  const isSuperAdmin = role === 'superadmin';
  const isEmployer = role === 'admin';

  const employerQuery = UseEmployerProfileInfo({ enabled: isEmployer });
  const superAdminQuery = UseProfileSuperAdmin({ enabled: isSuperAdmin });

  const activeQuery = isSuperAdmin ? superAdminQuery : employerQuery;
  const profile = normalizeProfile(activeQuery.data);

  const organizationName = useMemo(() => {
    const fromApi = profile?.organization_name?.trim();
    if (fromApi) return fromApi;
    return getOrganizationName();
  }, [profile?.organization_name]);

  useEffect(() => {
    const fromApi = profile?.organization_name?.trim();
    if (fromApi) {
      setOrganizationName(fromApi);
    }
  }, [profile?.organization_name]);

  const firstName = profile?.first_name?.trim() ?? '';
  const imageUrl = profile?.image_url ?? '';

  return {
    role,
    organizationName,
    firstName,
    imageUrl,
    isLoading: activeQuery.isLoading && !organizationName,
  };
}
