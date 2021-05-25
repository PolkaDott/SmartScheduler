const domain = 'http://188.225.83.42:7070/'
var headers = {
  'Accept' : 'application/json',
  'Content-Type' : 'application/json',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
};

function saveToken(token) {
  sessionStorage.setItem('tokenData', JSON.stringify(token));
}

function getTokenData(login, password) {
  var formData = new FormData();
  formData.append("username", login);
  formData.append("password", password);
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    redirect: 'follow'
  };
  return fetch(domain+'auth/login/', requestOptions)
  .then(res => console.log('res : ' + res.status)
  /*.then((res) => {
      if (res.status === 201) {
          const tokenData = res.json();
          saveToken(JSON.stringify(tokenData));
          return Promise.resolve(); 
      }
      return Promise.reject();
  });*/
}

function refreshToken(token) {
  var formData = new FormData();
  formData.append("refresh", token);
  var requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    headers: headers,
    body: formData,
    redirect: 'follow'
  };
  return fetch(domain+'auth/login/refresh/', requestOptions)
      .then((res) => {
          if (res.status === 201) {
              const tokenData = res.json();
              saveToken(JSON.stringify(tokenData));
              return Promise.resolve();
          }
          return Promise.reject();
      });
}

async function fetchWithAuth(url, options) {
    
  const loginUrl = '/login';
  let tokenData = null;

  if (sessionStorage.tokenData) {
      tokenData = JSON.parse(sessionStorage.tokenData);
  } else {
     return window.location.replace(loginUrl);
  }

  if (!options.headers) { 
      options.headers = headers;
  }
  
  if (tokenData) {
      if (Date.now() >= tokenData.expires_on * 1000) {
          try {
              const newToken = await refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
              saveToken(newToken);
          } catch () { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
             return  window.location.replace(loginUrl);
          }
      }

      options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
  }

  return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
}

export default fetchWithAuth;