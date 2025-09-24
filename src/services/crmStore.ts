// Enhanced In-Memory CRM Data Store with localStorage persistence

import { 
  Company, User, Lead, Contact, Account, Deal, Pipeline, PipelineStage, 
  Activity, CustomField, WorkflowTemplate, Dashboard, AuditLog, UserRole 
} from '@/types/crm';

// Additional types for enhanced SaaS features
export interface Task extends Activity {
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  assignee_id: string;
  notes: string;
}

export interface TeamMember {
  id: string;
  company_id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: 'company_admin' | 'sales_manager' | 'sales_rep' | 'user';
  department: string;
  title: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  is_active: boolean;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  permissions: {
    leads: boolean;
    deals: boolean;
    contacts: boolean;
    reports: boolean;
    settings: boolean;
  };
  achievements?: string[];
  quota?: number;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  status: 'connected' | 'available' | 'error';
  features: string[];
  config?: Record<string, any>;
}

export interface Subscription {
  id: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: Date;
  current_period_end: Date;
  price: number;
  features: string[];
  usage: {
    leads: number;
    users: number;
    storage: number;
  };
  limits: {
    leads: number;
    users: number;
    storage: number;
  };
}

// Enhanced storage keys
const STORAGE_KEYS = {
  COMPANIES: 'crm_companies',
  USERS: 'crm_users',
  LEADS: 'crm_leads',
  CONTACTS: 'crm_contacts',
  ACCOUNTS: 'crm_accounts',
  DEALS: 'crm_deals',
  PIPELINES: 'crm_pipelines',
  STAGES: 'crm_stages',
  ACTIVITIES: 'crm_activities',
  CUSTOM_FIELDS: 'crm_custom_fields',
  WORKFLOWS: 'crm_workflows',
  DASHBOARDS: 'crm_dashboards',
  AUDIT_LOGS: 'crm_audit_logs',
  CURRENT_USER: 'crm_current_user',
  CURRENT_COMPANY: 'crm_current_company',
  TASKS: 'crm_tasks',
  TEAM_MEMBERS: 'crm_team_members',
  INTEGRATIONS: 'crm_integrations',
  SUBSCRIPTIONS: 'crm_subscriptions',
  EMAIL_TEMPLATES: 'crm_email_templates',
  FILES: 'crm_files',
} as const;

// Utility functions
const generateId = () => crypto.randomUUID();
const now = () => new Date();

class CRMStore {
  private currentUser: User | null = null;
  private currentCompany: Company | null = null;

  constructor() {
    this.loadCurrentState();
    this.initializeData();
  }

  // Storage management
  private saveToStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private loadFromStorage<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private loadCurrentState(): void {
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    const companyData = localStorage.getItem(STORAGE_KEYS.CURRENT_COMPANY);
    
    if (userData) this.currentUser = JSON.parse(userData);
    if (companyData) this.currentCompany = JSON.parse(companyData);
  }

  // Initialize with sample data
  private initializeData(): void {
    if (this.getCompanies().length === 0) {
      this.seedInitialData();
    }
  }

  private seedInitialData(): void {
    // Create sample companies
    const company1: Company = {
      id: generateId(),
      name: 'Acme Corporation',
      domain: 'acme.com',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=logo',
      subscription_tier: 'professional',
      settings: {
        currency: 'USD',
        timezone: 'America/New_York',
        date_format: 'MM/DD/YYYY',
        fiscal_year_start: '01/01',
        lead_scoring_enabled: true,
        workflow_automation_enabled: true,
        custom_branding: {
          primary_color: '#9333ea',
        },
      },
      created_at: now(),
      updated_at: now(),
      created_by: 'system',
      updated_by: 'system',
    };

    const company2: Company = {
      id: generateId(),
      name: 'TechStart Inc',
      domain: 'techstart.io',
      subscription_tier: 'starter',
      settings: {
        currency: 'USD',
        timezone: 'America/Los_Angeles',
        date_format: 'DD/MM/YYYY',
        fiscal_year_start: '04/01',
        lead_scoring_enabled: false,
        workflow_automation_enabled: false,
        custom_branding: {
          primary_color: '#3b82f6',
        },
      },
      created_at: now(),
      updated_at: now(),
      created_by: 'system',
      updated_by: 'system',
    };

    this.saveToStorage(STORAGE_KEYS.COMPANIES, [company1, company2]);

    // Create sample users
    const users: User[] = [
      {
        id: generateId(),
        company_id: company1.id,
        email: 'admin@acme.com',
        first_name: 'John',
        last_name: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'company_admin',
        is_active: true,
        permissions: ['*'],
        department: 'Administration',
        created_at: now(),
        updated_at: now(),
        created_by: 'system',
        updated_by: 'system',
      },
      {
        id: generateId(),
        company_id: company1.id,
        email: 'sarah.sales@acme.com',
        first_name: 'Sarah',
        last_name: 'Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        role: 'manager',
        is_active: true,
        permissions: ['leads:*', 'deals:*', 'contacts:*', 'accounts:*'],
        department: 'Sales',
        created_at: now(),
        updated_at: now(),
        created_by: 'system',
        updated_by: 'system',
      },
      {
        id: generateId(),
        company_id: company1.id,
        email: 'mike.rep@acme.com',
        first_name: 'Mike',
        last_name: 'Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'sales_rep',
        is_active: true,
        permissions: ['leads:read', 'leads:update', 'deals:read', 'deals:update'],
        department: 'Sales',
        created_at: now(),
        updated_at: now(),
        created_by: 'system',
        updated_by: 'system',
      },
    ];

    this.saveToStorage(STORAGE_KEYS.USERS, users);

    // Set current user as the admin
    this.currentUser = users[0];
    this.currentCompany = company1;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    localStorage.setItem(STORAGE_KEYS.CURRENT_COMPANY, JSON.stringify(this.currentCompany));

    // Create sample pipeline
    const pipeline: Pipeline = {
      id: generateId(),
      company_id: company1.id,
      name: 'Sales Pipeline',
      description: 'Main sales process',
      is_default: true,
      stages: [],
      created_at: now(),
      updated_at: now(),
      created_by: users[0].id,
      updated_by: users[0].id,
    };

    const stages: PipelineStage[] = [
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Prospecting',
        probability: 10,
        order: 1,
        is_closed_won: false,
        is_closed_lost: false,
        color: '#6b7280',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Qualification',
        probability: 25,
        order: 2,
        is_closed_won: false,
        is_closed_lost: false,
        color: '#f59e0b',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Proposal',
        probability: 50,
        order: 3,
        is_closed_won: false,
        is_closed_lost: false,
        color: '#3b82f6',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Negotiation',
        probability: 75,
        order: 4,
        is_closed_won: false,
        is_closed_lost: false,
        color: '#8b5cf6',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Closed Won',
        probability: 100,
        order: 5,
        is_closed_won: true,
        is_closed_lost: false,
        color: '#10b981',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        pipeline_id: pipeline.id,
        name: 'Closed Lost',
        probability: 0,
        order: 6,
        is_closed_won: false,
        is_closed_lost: true,
        color: '#ef4444',
        created_at: now(),
        updated_at: now(),
        created_by: users[0].id,
        updated_by: users[0].id,
      },
    ];

    pipeline.stages = stages;
    this.saveToStorage(STORAGE_KEYS.PIPELINES, [pipeline]);
    this.saveToStorage(STORAGE_KEYS.STAGES, stages);

    // Create sample leads
    const leads: Lead[] = [
      {
        id: generateId(),
        company_id: company1.id,
        first_name: 'Emma',
        last_name: 'Davis',
        email: 'emma.davis@example.com',
        phone: '+1-555-0123',
        company: 'Future Tech Solutions',
        title: 'CTO',
        status: 'qualified',
        source: 'Website',
        score: 85,
        value: 75000,
        owner_id: users[1].id,
        custom_fields: {},
        tags: ['enterprise', 'tech'],
        created_at: now(),
        updated_at: now(),
        created_by: users[1].id,
        updated_by: users[1].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        first_name: 'Robert',
        last_name: 'Chen',
        email: 'robert.chen@startup.io',
        phone: '+1-555-0124',
        company: 'Startup Innovations',
        title: 'Founder',
        status: 'new',
        source: 'LinkedIn',
        score: 60,
        value: 25000,
        owner_id: users[2].id,
        custom_fields: {},
        tags: ['startup', 'saas'],
        created_at: now(),
        updated_at: now(),
        created_by: users[2].id,
        updated_by: users[2].id,
      },
    ];

    this.saveToStorage(STORAGE_KEYS.LEADS, leads);

    // Create sample deals
    const deals: Deal[] = [
      {
        id: generateId(),
        company_id: company1.id,
        name: 'Future Tech Enterprise License',
        pipeline_id: pipeline.id,
        stage_id: stages[2].id, // Proposal stage
        value: 75000,
        currency: 'USD',
        probability: 50,
        expected_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        owner_id: users[1].id,
        source: 'Website',
        description: 'Enterprise software license for Future Tech Solutions',
        custom_fields: {},
        created_at: now(),
        updated_at: now(),
        created_by: users[1].id,
        updated_by: users[1].id,
      },
      {
        id: generateId(),
        company_id: company1.id,
        name: 'Startup Innovations SaaS',
        pipeline_id: pipeline.id,
        stage_id: stages[0].id, // Prospecting stage
        value: 25000,
        currency: 'USD',
        probability: 10,
        expected_close_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        owner_id: users[2].id,
        source: 'LinkedIn',
        description: 'SaaS subscription for growing startup',
        custom_fields: {},
        created_at: now(),
        updated_at: now(),
        created_by: users[2].id,
        updated_by: users[2].id,
      },
    ];

    this.saveToStorage(STORAGE_KEYS.DEALS, deals);
  }

  // Authentication methods
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.loadCurrentState();
    }
    return this.currentUser;
  }

  getCurrentCompany(): Company | null {
    if (!this.currentCompany) {
      this.loadCurrentState();
    }
    return this.currentCompany;
  }

  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.is_active);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // In a real app, verify password hash
    const company = this.getCompanies().find(c => c.id === user.company_id);
    
    if (!company) {
      return { success: false, error: 'Company not found' };
    }

    this.currentUser = user;
    this.currentCompany = company;
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.CURRENT_COMPANY, JSON.stringify(company));

    return { success: true, user };
  }

  logout(): void {
    this.currentUser = null;
    this.currentCompany = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_COMPANY);
  }

  // Generic CRUD operations with tenant scoping
  private requireAuth(): { user: User; company: Company } {
    const user = this.getCurrentUser();
    const company = this.getCurrentCompany();
    
    if (!user || !company) {
      throw new Error('Authentication required');
    }

    return { user, company };
  }

  private filterByCompany<T extends { company_id: string }>(items: T[]): T[] {
    const { company } = this.requireAuth();
    return items.filter(item => item.company_id === company.id);
  }

  // Company operations
  getCompanies(): Company[] {
    return this.loadFromStorage<Company>(STORAGE_KEYS.COMPANIES);
  }

  // User operations
  getUsers(): User[] {
    return this.filterByCompany(this.loadFromStorage<User>(STORAGE_KEYS.USERS));
  }

  // Lead operations
  getLeads(): Lead[] {
    return this.filterByCompany(this.loadFromStorage<Lead>(STORAGE_KEYS.LEADS));
  }

  createLead(leadData: Omit<Lead, 'id' | 'company_id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>): Lead {
    const { user, company } = this.requireAuth();
    
    const lead: Lead = {
      id: generateId(),
      company_id: company.id,
      created_at: now(),
      updated_at: now(),
      created_by: user.id,
      updated_by: user.id,
      ...leadData,
    };

    const leads = this.loadFromStorage<Lead>(STORAGE_KEYS.LEADS);
    leads.push(lead);
    this.saveToStorage(STORAGE_KEYS.LEADS, leads);

    return lead;
  }

  addLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by' | 'owner_id' | 'custom_fields' | 'tags' | 'company_id'>): Lead {
    const { user } = this.requireAuth();
    
    return this.createLead({
      ...leadData,
      owner_id: user.id,
      custom_fields: {},
      tags: [],
    });
  }

  updateLead(id: string, updates: Partial<Lead>): Lead {
    const { user } = this.requireAuth();
    const leads = this.loadFromStorage<Lead>(STORAGE_KEYS.LEADS);
    const index = leads.findIndex(l => l.id === id);
    
    if (index === -1) {
      throw new Error('Lead not found');
    }

    leads[index] = {
      ...leads[index],
      ...updates,
      updated_at: now(),
      updated_by: user.id,
    };

    this.saveToStorage(STORAGE_KEYS.LEADS, leads);
    return leads[index];
  }

  // Deal operations
  getDeals(): Deal[] {
    return this.filterByCompany(this.loadFromStorage<Deal>(STORAGE_KEYS.DEALS));
  }

  createDeal(dealData: Omit<Deal, 'id' | 'company_id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>): Deal {
    const { user, company } = this.requireAuth();
    
    const deal: Deal = {
      id: generateId(),
      company_id: company.id,
      created_at: now(),
      updated_at: now(),
      created_by: user.id,
      updated_by: user.id,
      ...dealData,
    };

    const deals = this.loadFromStorage<Deal>(STORAGE_KEYS.DEALS);
    deals.push(deal);
    this.saveToStorage(STORAGE_KEYS.DEALS, deals);

    return deal;
  }

  updateDeal(id: string, updates: Partial<Deal>): Deal {
    const { user } = this.requireAuth();
    const deals = this.loadFromStorage<Deal>(STORAGE_KEYS.DEALS);
    const index = deals.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new Error('Deal not found');
    }

    deals[index] = {
      ...deals[index],
      ...updates,
      updated_at: now(),
      updated_by: user.id,
    };

    this.saveToStorage(STORAGE_KEYS.DEALS, deals);
    return deals[index];
  }

  // Pipeline operations
  getPipelines(): Pipeline[] {
    return this.filterByCompany(this.loadFromStorage<Pipeline>(STORAGE_KEYS.PIPELINES));
  }

  getPipelineStages(): PipelineStage[] {
    return this.filterByCompany(this.loadFromStorage<PipelineStage>(STORAGE_KEYS.STAGES));
  }

  // Contact operations
  getContacts(): Contact[] {
    return this.filterByCompany(this.loadFromStorage<Contact>(STORAGE_KEYS.CONTACTS));
  }

  // Account operations
  getAccounts(): Account[] {
    return this.filterByCompany(this.loadFromStorage<Account>(STORAGE_KEYS.ACCOUNTS));
  }

  // Analytics methods
  getDashboardMetrics() {
    const leads = this.getLeads();
    const deals = this.getDeals();
    const users = this.getUsers();

    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
    const totalDeals = deals.length;
    const totalDealValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = deals.filter(d => {
      const stages = this.getPipelineStages();
      const stage = stages.find(s => s.id === d.stage_id);
      return stage?.is_closed_won;
    });
    const wonDealValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

    return {
      totalLeads,
      qualifiedLeads,
      conversionRate: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
      totalDeals,
      totalDealValue,
      wonDeals: wonDeals.length,
      wonDealValue,
      averageDealSize: totalDeals > 0 ? totalDealValue / totalDeals : 0,
      salesReps: users.filter(u => u.role === 'sales_rep').length,
    };
  }

  // Enhanced Task Management
  getTasks(): Task[] {
    return this.filterByCompany(this.loadFromStorage<Task>(STORAGE_KEYS.TASKS));
  }

  createTask(taskData: Omit<Task, 'id' | 'company_id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>): Task {
    const { user, company } = this.requireAuth();
    
    const task: Task = {
      id: generateId(),
      company_id: company.id,
      type: 'task',
      created_at: now(),
      updated_at: now(),
      created_by: user.id,
      updated_by: user.id,
      priority: 'medium',
      completed: false,
      assignee_id: user.id,
      notes: '',
      ...taskData,
    };

    const tasks = this.loadFromStorage<Task>(STORAGE_KEYS.TASKS);
    tasks.push(task);
    this.saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return task;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const { user } = this.requireAuth();
    const tasks = this.loadFromStorage<Task>(STORAGE_KEYS.TASKS);
    const index = tasks.findIndex(t => t.id === id && t.company_id === this.currentCompany?.id);
    
    if (index === -1) return null;
    
    tasks[index] = { ...tasks[index], ...updates, updated_at: now(), updated_by: user.id };
    this.saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return tasks[index];
  }

  // Team Management
  getTeamMembers(): TeamMember[] {
    return this.filterByCompany(this.loadFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS));
  }

  createTeamMember(memberData: Omit<TeamMember, 'id' | 'company_id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>): TeamMember {
    const { user, company } = this.requireAuth();
    
    const member: TeamMember = {
      id: generateId(),
      company_id: company.id,
      created_at: now(),
      updated_at: now(),
      created_by: user.id,
      updated_by: user.id,
      is_active: true,
      permissions: {
        leads: true,
        deals: true,
        contacts: true,
        reports: false,
        settings: false,
      },
      ...memberData,
    };

    const members = this.loadFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
    members.push(member);
    this.saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, members);
    return member;
  }

  // Integration Management
  getIntegrations(): Integration[] {
    const baseIntegrations: Integration[] = [
      {
        id: '1',
        name: 'Slack',
        category: 'Communication',
        description: 'Get notifications and updates in Slack channels',
        icon: '💬',
        status: 'available',
        features: ['Notifications', 'Deal Updates', 'Team Collaboration'],
      },
      {
        id: '2',
        name: 'Google Workspace',
        category: 'Productivity',
        description: 'Sync with Gmail, Calendar, and Drive',
        icon: '📧',
        status: 'connected',
        features: ['Email Sync', 'Calendar Integration', 'File Storage'],
      },
      {
        id: '3',
        name: 'Stripe',
        category: 'Payments',
        description: 'Process payments and track revenue',
        icon: '💳',
        status: 'available',
        features: ['Payment Processing', 'Revenue Tracking', 'Invoicing'],
      },
    ];

    const userIntegrations = this.loadFromStorage<Integration>(STORAGE_KEYS.INTEGRATIONS);
    return [...baseIntegrations, ...userIntegrations];
  }

  // Subscription Management
  getSubscription(): Subscription {
    const subscriptions = this.loadFromStorage<Subscription>(STORAGE_KEYS.SUBSCRIPTIONS);
    const companySubscription = subscriptions.find(s => s.id === this.currentCompany?.id);
    
    if (companySubscription) return companySubscription;
    
    // Default subscription
    return {
      id: this.currentCompany?.id || 'default',
      plan: 'professional',
      status: 'active',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      price: 49,
      features: ['Unlimited Leads', 'Advanced Analytics', 'Email Automation', 'API Access'],
      usage: {
        leads: this.getLeads().length,
        users: this.getTeamMembers().length,
        storage: 2.1,
      },
      limits: {
        leads: 10000,
        users: 25,
        storage: 100,
      },
    };
  }
}

// Export singleton instance
export const crmStore = new CRMStore();