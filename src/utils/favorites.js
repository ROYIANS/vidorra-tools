// 收藏管理工具
const FAVORITES_KEY = 'vidorra-tools-favorites';

// 获取所有收藏
export const getFavorites = () => {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
        console.error('Failed to get favorites:', e);
        return [];
    }
};

// 检查是否已收藏
export const isFavorite = (toolId) => {
    const favorites = getFavorites();
    return favorites.includes(toolId);
};

// 添加收藏
export const addFavorite = (toolId) => {
    const favorites = getFavorites();
    if (!favorites.includes(toolId)) {
        favorites.push(toolId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true;
    }
    return false;
};

// 移除收藏
export const removeFavorite = (toolId) => {
    const favorites = getFavorites();
    const newFavorites = favorites.filter(id => id !== toolId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return true;
};

// 切换收藏状态
export const toggleFavorite = (toolId) => {
    if (isFavorite(toolId)) {
        removeFavorite(toolId);
        return false;
    } else {
        addFavorite(toolId);
        return true;
    }
};
