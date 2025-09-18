// Core CRM Types and Models

export type UserRole = 'super_admin' | 'company_admin' | 'manager' | 'sales_rep' | 'user';

export type CustomFieldType = 
  | 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'datetime' 
  | 'email' | 'phone' | 'url' | 'currency' | 'select' | 'multiselect' 
  | 'json' | 'file' | 'lookup';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
export type DealStage = 'prospect' | 'qualification' | 'proposal' | 'negotiation' | 'closing' | 'won' | 'lost';
export type ActivityType = 'call' | 'email' | 'meeting' | 'task' | 'note' | 'demo';

// Base Entity
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  created_by: string;
  updated_by: string;
}

// Multi-tenant Company
export interface Company extends BaseEntity {
  name: string;
  domain: string;
  logo?: string;
  settings: CompanySettings;
  subscription_tier: 'starter' | 'professional' | 'enterprise';
}

export interface CompanySettings {
  currency: string;
  timezone: string;
  date_format: string;
  fiscal_year_start: string;
  lead_scoring_enabled: boolean;
  workflow_automation_enabled: boolean;
  custom_branding: {
    primary_color: string;
    logo_url?: string;
    favicon_url?: string;
  };
}

// User Management
export interface User extends BaseEntity {
  company_id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  role: UserRole;
  is_active: boolean;
  last_login?: Date;
  permissions: string[];
  department?: string;
  manager_id?: string;
}

// Custom Fields System
export interface CustomField extends BaseEntity {
  company_id: string;
  entity_type: 'lead' | 'contact' | 'account' | 'deal' | 'custom_object';
  name: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
  default_value?: any;
  options?: string[]; // for select/multiselect
  validation_rules?: {
    min?: number;
    max?: number;
    regex?: string;
    unique?: boolean;
  };
  visibility_rules?: {
    roles: UserRole[];
    conditions?: any; // JSONLogic conditions
  };
  order: number;
}

// Core CRM Entities
export interface Lead extends BaseEntity {
  company_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  status: LeadStatus;
  source: string;
  score?: number;
  value?: number;
  owner_id: string;
  assigned_to?: string;
  last_contacted?: Date;
  converted_to_deal_id?: string;
  custom_fields: Record<string, any>;
  tags: string[];
}

export interface Contact extends BaseEntity {
  company_id: string;
  account_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  title?: string;
  department?: string;
  is_primary: boolean;
  social_profiles?: {
    linkedin?: string;
    twitter?: string;
  };
  custom_fields: Record<string, any>;
}

export interface Account extends BaseEntity {
  company_id: string;
  name: string;
  type: 'prospect' | 'customer' | 'partner' | 'vendor';
  industry?: string;
  website?: string;
  phone?: string;
  annual_revenue?: number;
  employee_count?: number;
  owner_id: string;
  parent_account_id?: string;
  billing_address?: Address;
  shipping_address?: Address;
  custom_fields: Record<string, any>;
}

export interface Deal extends BaseEntity {
  company_id: string;
  name: string;
  account_id?: string;
  contact_id?: string;
  pipeline_id: string;
  stage_id: string;
  value: number;
  currency: string;
  probability: number;
  expected_close_date?: Date;
  actual_close_date?: Date;
  owner_id: string;
  source?: string;
  competitors?: string[];
  next_step?: string;
  description?: string;
  custom_fields: Record<string, any>;
}

// Pipeline Management
export interface Pipeline extends BaseEntity {
  company_id: string;
  name: string;
  description?: string;
  is_default: boolean;
  stages: PipelineStage[];
}

export interface PipelineStage extends BaseEntity {
  company_id: string;
  pipeline_id: string;
  name: string;
  probability: number;
  order: number;
  is_closed_won: boolean;
  is_closed_lost: boolean;
  color: string;
}

// Activity Tracking
export interface Activity extends BaseEntity {
  company_id: string;
  type: ActivityType;
  subject: string;
  description?: string;
  due_date?: Date;
  completed_date?: Date;
  is_completed: boolean;
  owner_id: string;
  related_to_type: 'lead' | 'contact' | 'account' | 'deal';
  related_to_id: string;
  attendees?: string[]; // user IDs
}

// Workflow System
export interface WorkflowTemplate extends BaseEntity {
  company_id: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  conditions?: any; // JSONLogic conditions
  actions: WorkflowAction[];
  is_active: boolean;
}

export interface WorkflowTrigger {
  event: string; // e.g., "lead.created", "deal.stage_changed"
  entity_type: string;
  filters?: Record<string, any>;
}

export interface WorkflowAction {
  type: 'update_field' | 'create_task' | 'send_email' | 'move_stage' | 'notify' | 'call_webhook';
  config: Record<string, any>;
  delay?: number; // minutes
}

export interface WorkflowExecution extends BaseEntity {
  company_id: string;
  workflow_id: string;
  trigger_data: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  executed_actions: string[];
  error_message?: string;
  idempotency_key: string;
}

// Reporting & Analytics
export interface Dashboard extends BaseEntity {
  company_id: string;
  name: string;
  description?: string;
  layout: DashboardLayout;
  is_default: boolean;
  owner_id: string;
  shared_with: string[]; // user IDs
}

export interface DashboardLayout {
  widgets: DashboardWidget[];
  columns: number;
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'funnel' | 'pipeline';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: WidgetConfig;
  permissions: {
    view_roles: UserRole[];
    edit_roles: UserRole[];
  };
}

export interface WidgetConfig {
  data_source: string;
  query?: string;
  chart_type?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  metrics: string[];
  dimensions?: string[];
  filters?: Record<string, any>;
  refresh_interval?: number; // minutes
}

// Utility Types
export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface AuditLog extends BaseEntity {
  company_id: string;
  user_id: string;
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'view';
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: any;
}