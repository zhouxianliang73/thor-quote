-- THOR 报价系统 · 数据库表
-- 在 Supabase SQL Editor 中执行此 SQL

-- 用户扩展表
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT '',
  role TEXT DEFAULT 'L1' CHECK (role IN ('L1','L2','L3','L4')),
  store TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 项目表
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_no TEXT UNIQUE,
  customer_name TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  customer_address TEXT DEFAULT '',
  store TEXT DEFAULT '',
  salesperson TEXT DEFAULT '',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','quoted','confirmed','ordered')),
  total_amount DECIMAL(10,2) DEFAULT 0,
  items JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 行级别安全（RLS）
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS 策略：用户只能看自己的项目；L2以上看全部
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = created_by);

-- 索引
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
