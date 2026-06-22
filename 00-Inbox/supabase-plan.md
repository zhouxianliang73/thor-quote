# THOR 报价系统 · Supabase 后端实现方案

## 第一步：建表 SQL

在 Supabase SQL Editor 中运行以下 SQL：

```sql
-- 用户表（扩展 Supabase Auth）
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  role TEXT DEFAULT 'L1' CHECK (role IN ('L1','L2','L3','L4')),
  store TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 项目表
CREATE TABLE projects (
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

-- 行项目明细（可选，目前数据存 items JSONB 字段）
CREATE TABLE project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  section TEXT,
  data JSONB
);

-- 索引
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_store ON projects(store);
```

## 第二步：API 函数（前端 JavaScript 模块）

创建 `D:\CAB-sites\thor-quote\api.js`，封装所有后端调用。

## 第三步：前端集成

在 index.html 中引用 api.js，替换 localStorage 调用为 API 调用。

## 表关系

```
auth.users ──→ user_profiles (1:1)
auth.users ──→ projects (1:N, created_by)
projects ──→ project_items (1:N)
```
