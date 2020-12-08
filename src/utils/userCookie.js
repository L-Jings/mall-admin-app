import Cookies from 'js-cookie';

/**
 *
 * @param {Obj} info 用户信息
 */
export function setCookie(info) {
  const arr = Object.entries(info); // 将对象转化成数组[ [ key,value ],... ]
  for (let i = 0; i < arr.length; i += 1) { // 循环遍历，设置key value值
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 * 获取用户信息
 */
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

/**
 * 移除cookie
 */
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
