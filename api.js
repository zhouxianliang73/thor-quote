// THOR 报价系统 · API 模块
// 当前：localStorage 模拟后端
// 后续：替换为 Supabase 真实 API

const API = {
  // 项目列表
  async listProjects() {
    try {
      const data = JSON.parse(localStorage.getItem('thorP') || '[]');
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 保存项目
  async saveProject(project) {
    try {
      const list = JSON.parse(localStorage.getItem('thorP') || '[]');
      const idx = list.findIndex(p => p.id === project.id);
      if (idx >= 0) list[idx] = project;
      else list.push(project);
      localStorage.setItem('thorP', JSON.stringify(list));
      return { ok: true, data: project };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 删除项目
  async deleteProject(id) {
    try {
      let list = JSON.parse(localStorage.getItem('thorP') || '[]');
      list = list.filter(p => p.id !== id);
      localStorage.setItem('thorP', JSON.stringify(list));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // 用户登录
  async login(username, password) {
    // 模拟登录：任何账号密码都返回 L1 角色
    return {
      ok: true,
      data: {
        id: 'local-' + Date.now(),
        name: username || '本地用户',
        role: 'L1',
        token: 'mock-token'
      }
    };
  },

  // 切换真实 Supabase 时只需修改此文件，前端代码不用动
};

// 暴露到全局
window.API = API;

