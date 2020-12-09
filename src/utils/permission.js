/**
 * 存储到是 角色对应的路由权限名称
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
    {
      name: 'ProductEdit',
    },
  ],
};
/**
 *
 * @param {String} role
 * @param {Array} routes
 */
export default function getMenuRoute(role, routes) {
  // 返回一个根据 role过滤的数组
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // 过滤后的路由 resultRoutes
  const resultRoutes = routes.filter((r) => {
    const obj = r; // 保存引用
    if (allowRoutesName.indexOf(r.name) !== -1) {
      // 找到该路由
      const { children } = obj;
      // 路由children过滤
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
