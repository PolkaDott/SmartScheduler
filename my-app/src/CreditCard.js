import React, {Component} from "react";

class CreditCard extends Component {
  render() {
    return (
      <div className="container">
      <div className="row">
       <div className="col-3"></div>
       <div className="creditCardForm col-6">
       <div className="heading">
       <h1>Input parent's <b>credit</b> card to get access our amazing service!</h1>
       </div>
       <div className="payment">
       <form>
       <div className="form-group owner">
       <label htmlFor="owner">Owner</label>
       <input type="text" className="form-control" id="owner"/>
       </div>
       <div className="form-group CVV">
       <label htmlFor="cvv">CVV</label>
       <input type="text" className="form-control" id="cvv"/>
       </div>
       <div className="form-group" id="card-number-field">
       <label htmlFor="cardNumber">Card Number</label>
       <input type="text" className="form-control" id="cardNumber"/>
       </div>
       <div className="form-group" id="expiration-date">
       <label>Expiration Date</label>
       <select>
       <option value="01">January</option>
       <option value="02">February </option>
       <option value="03">March</option>
       <option value="04">April</option>
       <option value="05">May</option>
       <option value="06">June</option>
       <option value="07">July</option>
       <option value="08">August</option>
       <option value="09">September</option>
       <option value="10">October</option>
       <option value="11">November</option>
       <option value="12">December</option>
       </select>
       <select>
       <option value="16"> 2016</option>
       <option value="17"> 2017</option>
       <option value="18"> 2018</option>
       <option value="19"> 2019</option>
       <option value="20"> 2020</option>
       <option value="21"> 2021</option>
       </select>
       </div>
       <div className="form-group" id="credit_cards">
       <img src="https://bootstraptema.ru/snippets/form/2017/visa.jpg" id="visa"/>
       <img src="https://bootstraptema.ru/snippets/form/2017/mastercard.jpg" id="mastercard"/>
       <img src="https://bootstraptema.ru/snippets/form/2017/amex.jpg" id="amex"/>
       </div>
       <div className="form-group" id="pay-now">
       <button type="submit" className="btn btn-default" id="confirm-purchase">Confirm</button>
       </div>
       </form>
       </div>
       </div>

       <div className="col-3"></div>
      </div>
      </div>
    );
  }
}

export default CreditCard;
