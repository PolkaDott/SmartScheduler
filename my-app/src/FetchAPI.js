export default class FetchAPI {
  static domain = 'http://188.225.83.42:7070/'
  static headers = {

  }

  static saveToken(refresh, access) {
    if (!refresh && !access)
      throw new Error('FetchAPI.saveToken called without any arguments');
    if (refresh)
      localStorage.setItem('refreshToken', refresh);
    if (access)
      localStorage.setItem('accessToken', access);
  }

  static getRefresh(){
    return localStorage.getItem('refreshToken');
  }

  static getAccess(){
    return localStorage.getItem('accessToken');
  }

  static clearToken(){
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }

  static getTokenData(login, password) {
    if (!login || !password)
      throw new Error("called FetchAPI.getTokenData without arguments");
    var formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    var requestOptions = {
      method: 'POST',
      headers: FetchAPI.headers,
      body: formData,
      redirect: 'follow'
    };
    return fetch(FetchAPI.domain+'auth/login/', requestOptions)
    .then((res) => {
        if (res.ok) {
          res.json().then(data=>{
            FetchAPI.saveToken(data.refresh, data.access);
            return res.status;
          });
        }
        return res.status;
    })
    .catch(res => 0)
  }

  static register(username, password, email){
    if (!username || !password || !email)
      throw new Error("called FetchAPI.register without arguments");
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password2", password);
    formData.append("email", email);
    formData.append("first_name", 'Андрей');
    formData.append("last_name", "Сиренко");
    formData.append("picture_url", "https://c.pxhere.com/photos/5b/3e/chinese_water_dragon_head_chinese_water_dragon_china_asian_animal-505192.jpg!d");

    var requestOptions = {
      method: 'POST',
      headers: FetchAPI.headers,
      body: formData,
      redirect: 'follow'
    };
    return fetch(FetchAPI.domain+'auth/register/', requestOptions)
    .then((res) => {
        if (res.ok) 
          return FetchAPI.getTokenData(username, password)
        else if (res.status === 400){
          return res.text()
          .then((res) => {
            if (res.includes('username'))
              return 14;
            else if (res.includes('valid email'))
              return 15;
            else if (res.includes('email'))
              return 16;
            else if (res.includes('too short'))
              return 17;
            else if (res.includes('too common'))
              return 18;
            else return res.status;
          })
        }
    })
    .catch(res => 0)
  }

  static refreshToken() {
    var refresh = FetchAPI.getRefresh();
    if (!refresh)
      throw new Error("Error in FetchAPI.refreshToken: localStorage has no refresh token");
    var formData = new FormData();
    formData.append("refresh", refresh);
    var requestOptions = {
      method: 'POST',
      headers: FetchAPI.headers,
      body: formData,
      redirect: 'follow'
    };
    return fetch(FetchAPI.domain+'auth/login/refresh/', requestOptions)
    .then((res) => {
      if (res.ok) {
        res.json().then(data=>{
          FetchAPI.saveToken(null, data.access);
          return res.status;
        });
      }
      return res.status;
    })
    .catch(res => 0)
  }

  static async fetchWithAuth(url, options) {
    if (!url || !options)
      throw new Error("called FetchAPI.fetchWithAuth without arguments");
      
    //let access = FetchAPI.getAccess();
    let refresh = FetchAPI.getRefresh();

    if(!refresh) {
      return window.location.replace('/login');
    }

    /*if (!options.headers) { 
        options.headers = headers;
    }*/
    throw new Error('метод пока не готов использоваться');
   /* 
    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) {
            try {
                const newToken = await FetchAPI.refreshToken(tokenData.refresh_token); // если истек, то обновляем токен с помощью refresh_token
                FetchAPI.saveToken(newToken);
            } catch (Exception) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
              return  window.location.replace(loginUrl);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }
    return fetch(url, options);
*/
  }
}