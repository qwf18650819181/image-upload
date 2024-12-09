import { LazyStore } from "@tauri-apps/plugin-store";

class MenuStore {
  constructor(filename = 'menu.dat') {
    this.store = new LazyStore(filename);
    console.error("menu file create:", filename);
  }

  async save(menuList) {
    try {
      await this.store.set('menu', menuList);
      await this.store.save();
    } catch (error) {
      console.error("Error writing to store:", error);
    }

  }

  async load() {
    try {
      return await this.store.get('menu');  // 如果没有找到 'menu'，返回空数组
    } catch (error) {
      return null;  // 在出现错误时返回空数组
    }
  }
}

export default MenuStore;
