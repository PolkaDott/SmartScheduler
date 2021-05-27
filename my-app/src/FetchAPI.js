export default class FetchAPI {
  domain = 'http://188.225.83.42:7070/'
  headers = {
    
  }

  saveToken(data) {
    sessionStorage.setItem('tokenData', data);
  }

  getTokenData(login, password) {
    var formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    var requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: formData,
      redirect: 'follow'
    };
    return fetch(this.domain+'auth/login/', requestOptions)
    .then((res) => {
        if (res.ok) {
          res.json().then(data=>{
            this.saveToken(JSON.stringify(data));
            return res.status;
          });
        }
        return res.status;
    })
    .catch(res => 0)
  }

  refreshToken(token) {
    var formData = new FormData();
    formData.append("refresh", token);
    var requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: formData,
      redirect: 'follow'
    };
    return fetch(this.domain+'auth/login/refresh/', requestOptions)
    .then((res) => {
      if (res.ok) {
        res.json().then(data=>{
          this.saveToken(JSON.stringify(data));
          return res.status;
        });
      }
      return res.status;
    })
    .catch(res => 0)
  }

  async fetchWithAuth(url, options) {
      
    const loginUrl = '/login';
    let tokenData = null;

    if (sessionStorage.tokenData) {
        tokenData = JSON.parse(sessionStorage.tokenData);
    } else {
      return window.location.replace(loginUrl);
    }

    /*if (!options.headers) { 
        options.headers = headers;
    }*/
    
    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) {
            try {
                const newToken = await this.refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
                this.saveToken(newToken);
            } catch (Exception) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
              return  window.location.replace(loginUrl);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }

    return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
  }
}