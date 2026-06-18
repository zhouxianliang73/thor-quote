// THOR 报价系统 · API 模块
// 当前：真实 Supabase 后端（回退：localStorage）

const SUPABASE_URL = 'https://zrbppdioryykolejfwhe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0d7x8szkVak0dj_Epswm3w_XGCbNd_C';

// 动态加载 Supabase 客户端
(function loadSupabase() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.onload = function() {
    window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window._sbReady = true;
    // 触发等待队列
    if (window._sbQueue) {
      window._sbQueue.forEach(function(fn) { fn(); });
      window._sbQueue = [];
    }
  };
  document.head.appendChild(script);
})();

function sbReady() {
  return new Promise(function(resolve) {
    if (window._sbReady) { resolve(window._supabase); return; }
    if (!window._sbQueue) window._sbQueue = [];
    window._sbQueue.push(function() { resolve(window._supabase); });
  });
}

const API = {
  // 项目列表
  async listProjects() {
    try {
      // Fallback: 如果 Supabase 不可用，用 localStorage
      if (!window._sbReady) {
        var data = JSON.parse(localStorage.getItem('thorP') || '[]');
        return { ok: true, data: data };
      }
      var sb = await sbReady();
      var { data, error } = await sb.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      // 转换为兼容格式
      var list = (data || []).map(function(p) {
        return { id: p.id, n: p.project_no || p.customer_name, d: p.items || {}, status: p.status };
      });
      return { ok: true, data: list };
    } catch (e) {
      // fallback
      var data = JSON.parse(localStorage.getItem('thorP') || '[]');
      return { ok: true, data: data };
    }
  },

  // 保存项目
  async saveProject(project) {
    try {
      if (!window._sbReady) {
        var list = JSON.parse(localStorage.getItem('thorP') || '[]');
        var idx = list.findIndex(function(p) { return p.id === project.id; });
        if (idx >= 0) list[idx] = project;
        else list.push(project);
        localStorage.setItem('thorP', JSON.stringify(list));
        return { ok: true, data: project };
      }
      var sb = await sbReady();
      var record = {
        project_no: project.n,
        customer_name: (project.d && project.d.customer && project.d.customer.name) || '',
        items: project.d || {},
        status: 'draft'
      };
      if (project.id && project.id.startsWith('THOR-')) {
        var { error } = await sb.from('projects').insert(record);
        if (error) throw error;
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 删除项目（仅本地）
  async deleteProject(id) {
    try {
      if (!window._sbReady) {
        var list = JSON.parse(localStorage.getItem('thorP') || '[]');
        list = list.filter(function(p) { return p.id !== id; });
        localStorage.setItem('thorP', JSON.stringify(list));
        return { ok: true };
      }
      // 真实 Supabase 删除（后续实现）
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 获取当前用户
  async getCurrentUser() {
    try {
      if (!window._sbReady) {
        var u = localStorage.getItem('thorUser');
        return { ok: true, data: u ? JSON.parse(u) : null };
      }
      var sb = await sbReady();
      var { data: { user } } = await sb.auth.getUser();
      if (!user) return { ok: true, data: null };
      var { data: profile } = await sb.from('user_profiles').select('*').eq('id', user.id).single();
      return { ok: true, data: { id: user.id, name: profile?.name || user.email, role: profile?.role || 'L1' } };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 登录
  async login(username, password) {
    try {
      if (!window._sbReady) {
        localStorage.setItem('thorUser', JSON.stringify({
          id: 'local-' + Date.now(), name: username, role: 'L1', loginAt: new Date().toISOString()
        }));
        return { ok: true, data: { name: username, role: 'L1' } };
      }
      var sb = await sbReady();
      var { data, error } = await sb.auth.signInWithPassword({ email: username, password: password });
      if (error) throw error;
      return { ok: true, data: { id: data.user.id, name: data.user.email, role: 'L1' } };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 登出
  async logout() {
    localStorage.removeItem('thorUser');
    if (window._sbReady) {
      var sb = await sbReady();
      await sb.auth.signOut();
    }
  }
};

window.API = API;
