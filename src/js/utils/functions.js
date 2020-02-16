// Проверка, залогинялся ли пользователь

function isLoggedIn() {
  const name = localStorage.getItem('name');
  if (!name === 'Авторизоваться') {
    console.log("no");
    // return false;
  }
  // return true;
  console.log("yes");

}

module.exports = { isLoggedIn };
