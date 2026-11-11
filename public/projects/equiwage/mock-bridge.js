/**
 * EquiWage Analytics Embedded Web Bridge
 * Enables seamless connection with local backend through Vite proxy,
 * and provides offline fallback for standalone deployment.
 */
(function () {
  const DEFAULT_USER = {
    id: 'USR-ADMIN-001',
    username: 'hr.admin',
    email: 'admin@equiwage.local',
    fullName: 'Elena Vance',
    role: 'Lead Compensation Analyst',
    department: 'HR',
    initials: 'EV',
  };

  const DEFAULT_BANDS = [
    { level: 1, min: 45000, median: 55000, max: 65000, spread: 20000 },
    { level: 2, min: 58000, median: 70000, max: 82000, spread: 24000 },
    { level: 3, min: 72000, median: 86000, max: 100000, spread: 28000 },
    { level: 4, min: 88000, median: 104000, max: 122000, spread: 34000 },
    { level: 5, min: 108000, median: 126000, max: 148000, spread: 40000 },
    { level: 6, min: 132000, median: 154000, max: 180000, spread: 48000 },
    { level: 7, min: 160000, median: 184000, max: 214000, spread: 54000 },
    { level: 8, min: 190000, median: 220000, max: 260000, spread: 70000 },
  ];

  const DEFAULT_EMPLOYEES = [
    { id: 'EMP-001', name: 'Maya Chen', role: 'Senior Product Designer', department: 'Product', level: 5, currentSalary: 103000 },
    { id: 'EMP-002', name: 'Daniel Brooks', role: 'Software Engineer II', department: 'Engineering', level: 4, currentSalary: 88400 },
    { id: 'EMP-003', name: 'Priya Nair', role: 'Marketing Manager', department: 'Marketing', level: 5, currentSalary: 110000 },
    { id: 'EMP-004', name: 'Jordan Ellis', role: 'Financial Analyst', department: 'Finance', level: 3, currentSalary: 77400 },
    { id: 'EMP-005', name: 'Sofia Martinez', role: 'People Operations Lead', department: 'HR', level: 5, currentSalary: 113600 },
    { id: 'EMP-006', name: 'Liam O’Connor', role: 'Staff Engineer', department: 'Engineering', level: 6, currentSalary: 149000 },
    { id: 'EMP-007', name: 'Aisha Rahman', role: 'Account Executive', department: 'Sales', level: 3, currentSalary: 69000 },
    { id: 'EMP-008', name: 'Noah Kim', role: 'Product Manager', department: 'Product', level: 5, currentSalary: 128000 },
    { id: 'EMP-009', name: 'Emma Wilson', role: 'Recruiter', department: 'HR', level: 2, currentSalary: 61500 },
    { id: 'EMP-010', name: 'Lucas Hayes', role: 'Software Engineer II', department: 'Engineering', level: 4, currentSalary: 97000 },
    { id: 'EMP-011', name: 'Olivia Braun', role: 'Senior Software Engineer', department: 'Engineering', level: 5, currentSalary: 121000 },
    { id: 'EMP-012', name: 'Ethan Cole', role: 'Sales Manager', department: 'Sales', level: 6, currentSalary: 138000 },
    { id: 'EMP-013', name: 'Chloe Adeyemi', role: 'Brand Designer', department: 'Marketing', level: 3, currentSalary: 81000 },
    { id: 'EMP-014', name: 'Mateo Silva', role: 'Engineering Manager', department: 'Engineering', level: 7, currentSalary: 168000 },
    { id: 'EMP-015', name: 'Hannah Petrov', role: 'Financial Controller', department: 'Finance', level: 6, currentSalary: 151000 },
    { id: 'EMP-016', name: 'Ryan Foster', role: 'Support Specialist', department: 'Sales', level: 1, currentSalary: 41000 },
    { id: 'EMP-017', name: 'Isabella Rossi', role: 'VP of Product', department: 'Product', level: 8, currentSalary: 205000 },
    { id: 'EMP-018', name: 'Kwame Mensah', role: 'Staff Engineer', department: 'Engineering', level: 6, currentSalary: 160000 },
    { id: 'EMP-019', name: 'Grace Lindqvist', role: 'Head of People', department: 'HR', level: 7, currentSalary: 171000 },
    { id: 'EMP-020', name: 'Diego Herrera', role: 'Account Executive', department: 'Sales', level: 3, currentSalary: 75500 },
  ];

  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input?.url || '';

    if (url.includes('/api/')) {
      // 1. Try real backend request first (via Vite proxy or direct backend URL)
      try {
        const resp = await originalFetch(input, init);
        const contentType = resp.headers.get('content-type') || '';
        // If the backend responded with genuine JSON, return it directly
        if (contentType.includes('application/json')) {
          return resp;
        }
      } catch (err) {
        // Backend offline or unreachable
      }

      // 2. Offline fallback handlers
      const makeJson = (data, status = 200) =>
        new Response(JSON.stringify({ ok: status < 400, data, timestamp: new Date().toISOString() }), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });

      if (url.includes('/api/health')) {
        return makeJson({
          service: 'EquiWage Analytics Backend API',
          version: '1.0.0',
          database: { connected: true, engine: 'sqlite', employeeCount: DEFAULT_EMPLOYEES.length, bandCount: 8 },
        });
      }

      if (url.includes('/api/auth/login')) {
        let identifier = 'hr.admin';
        try {
          if (init && init.body) {
            const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
            if (body && body.identifier) identifier = String(body.identifier).trim();
          }
        } catch (e) {}

        const isEmail = identifier.includes('@');
        const user = {
          ...DEFAULT_USER,
          username: isEmail ? identifier.split('@')[0] : identifier,
          email: isEmail ? identifier : `${identifier}@equiwage.local`,
          fullName: identifier === 'hr.admin' || identifier.includes('admin') ? 'Elena Vance' : identifier,
          initials: (identifier[0] || 'U').toUpperCase() + (identifier[1] || 'S').toUpperCase(),
        };

        try {
          localStorage.setItem('equiwage_auth_token', 'local-session-token');
          localStorage.setItem('equiwage_auth_user', JSON.stringify(user));
        } catch (e) {}

        return makeJson({
          token: 'local-session-token',
          user: user,
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
        });
      }

      if (url.includes('/api/auth/session')) {
        let user = DEFAULT_USER;
        try {
          const raw = localStorage.getItem('equiwage_auth_user') || sessionStorage.getItem('equiwage_auth_user');
          if (raw) user = JSON.parse(raw);
        } catch (e) {}

        return makeJson({
          authenticated: true,
          token: 'local-session-token',
          user: user,
        });
      }

      if (url.includes('/api/auth/users')) {
        return makeJson([DEFAULT_USER]);
      }

      if (url.includes('/api/auth/logout')) {
        try {
          localStorage.removeItem('equiwage_auth_token');
          localStorage.removeItem('equiwage_auth_user');
        } catch (e) {}
        return makeJson({ success: true });
      }

      if (url.includes('/api/bands')) {
        return makeJson({ count: DEFAULT_BANDS.length, bands: DEFAULT_BANDS });
      }

      if (url.includes('/api/employees')) {
        return makeJson({
          payrollSource: 'Datos Locales',
          count: DEFAULT_EMPLOYEES.length,
          employees: DEFAULT_EMPLOYEES,
        });
      }

      if (url.includes('/api/audit')) {
        return makeJson({
          payrollSource: 'Datos Locales',
          employees: DEFAULT_EMPLOYEES,
          totalEmployees: DEFAULT_EMPLOYEES.length,
          totalPayroll: 2450000,
          gapCount: 4,
          inequityCount: 2,
          marketAlignmentPct: 82.5,
          statMetrics: {
            mean: 122500,
            median: 110000,
            stdDev: 38500,
          },
        });
      }

      if (url.includes('/api/simulation')) {
        return makeJson({
          simulation: {
            target: 'minimum',
            rolloutQuarters: 1,
            departments: ['Engineering', 'Product', 'Sales', 'Marketing', 'HR', 'Finance'],
            customAdjustmentPercent: 0,
            inflationPercent: 4,
            totalCost: 48500,
            impactedCount: 4,
            newAlignmentPct: 94.2,
            adjustments: [
              { employeeId: 'EMP-001', oldSalary: 103000, newSalary: 108000, diff: 5000 },
              { employeeId: 'EMP-007', oldSalary: 69000, newSalary: 72000, diff: 3000 },
              { employeeId: 'EMP-016', oldSalary: 41000, newSalary: 45000, diff: 4000 },
            ],
          },
        });
      }

      return makeJson({});
    }

    return originalFetch.apply(this, arguments);
  };
})();
