
export const getRolePrefix = () => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'superadmin' ? 'superadmin' : 'admin';
    }
    return 'admin'; 
  };
  