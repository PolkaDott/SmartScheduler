import React, {Component} from "react";

class LogOut extends Component {
  render() {
    return (
      <div>
        <p>
          <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Ссылка с href
          </a>
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Кнопка с data-target
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            Некоторый заполнитель для компонента сворачивания. Эта панель по умолчанию скрыта, но открывается, когда пользователь активирует соответствующий триггер.
          </div>
        </div>
      </div>
    );
  }
}

export default LogOut;
