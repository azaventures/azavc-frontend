// User Types
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum StakeLevel {
  AZA100 = 'AZA100',
  AZA500 = 'AZA500',
  AZA1000 = 'AZA1000',
  AZA5000 = 'AZA5000',
  AZAWHALE = 'AZAWHALE',
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  stake_level: StakeLevel | null;
  nft_token_id?: string;
  is_mfa_enabled?: boolean;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Wallet Types
export interface Wallet {
  id: number;
  user_id: number;
  blockchain_id: number;
  address: string;
  name: string;
  is_primary: boolean;
  balance?: string;
  created_at: string;
  updated_at: string;
  blockchain?: Blockchain;
}

// Blockchain Types
export interface Blockchain {
  id: number;
  name: string;
  chain_id: number;
  currency: string;
  rpc_url: string;
  explorer_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Deal Types
export enum DealStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  CLOSED = 'closed',
  FUNDED = 'funded',
  DISTRIBUTED = 'distributed',
}

export interface Deal {
  id: number;
  name: string;
  description: string;
  target_amount: string;
  raised_amount: string;
  token_price: string;
  min_allocation: string;
  max_allocation: string;
  start_date: string;
  end_date: string;
  status: DealStatus;
  website?: string;
  whitepaper_url?: string;
  logo_url?: string;
  blockchain_id: number;
  created_at: string;
  updated_at: string;
  blockchain?: Blockchain;
  allocations?: Allocation[];
  fees?: Fee[];
}

// Allocation Types
export enum AllocationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  VESTING = 'vesting',
  DISTRIBUTED = 'distributed',
  CANCELLED = 'cancelled',
}

export interface Allocation {
  id: number;
  user_id: number;
  deal_id: number;
  amount: string;
  token_amount: string;
  status: AllocationStatus;
  transaction_hash?: string;
  vesting_start?: string;
  vesting_end?: string;
  vesting_schedule?: string;
  created_at: string;
  updated_at: string;
  deal?: Deal;
  user?: User;
}

// OTC Order Types
export enum OtcOrderType {
  BUY = 'buy',
  SELL = 'sell',
}

export enum OtcOrderStatus {
  OPEN = 'open',
  FULFILLED = 'fulfilled',
  CANCELLED = 'cancelled',
}

export interface OtcOrder {
  id: number;
  user_id: number;
  allocation_id: number;
  type: OtcOrderType;
  status: OtcOrderStatus;
  amount: string;
  price: string;
  total_price: string;
  expiry_date: string;
  transaction_hash?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  allocation?: Allocation;
}

// Fee Types
export enum FeeType {
  MANAGEMENT = 'management',
  PERFORMANCE = 'performance',
  PLATFORM = 'platform',
}

export interface Fee {
  id: number;
  deal_id: number;
  type: FeeType;
  percentage: string;
  created_at: string;
  updated_at: string;
  deal?: Deal;
}

// Fund Types
export enum FundStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  DISTRIBUTED = 'distributed',
}

export interface Fund {
  id: number;
  name: string;
  description: string;
  target_amount: string;
  raised_amount: string;
  status: FundStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  allocations?: Allocation[];
}

// Stake Types
export interface Stake {
  id: number;
  user_id: number;
  amount: string;
  level: StakeLevel;
  start_date: string;
  end_date: string;
  is_active: boolean;
  transaction_hash?: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Calendar Event Types
export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time?: string;
  type: 'deal' | 'distribution' | 'vesting' | 'other';
  related_id?: number;
  created_at: string;
  updated_at: string;
}

// Portfolio Types
export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  roi: number;
  allocations: Allocation[];
  upcomingVesting: any[];
}