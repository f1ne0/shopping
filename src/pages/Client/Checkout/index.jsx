import React, { useState } from "react";
import styles from "./Checkout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import MapCheckout from "../../../Components/MapComponent";
import { ChevronLeft, Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../store/slices/checkoutSlice";
// import {uuidv4} from "uuid"
function Checkout() {
  const [isObtaining, setIsObtaining] = useState(true);
  // const { v4: uuidv4 } = require("uuid");
  // const uniqueId = uuidv4();
  const [errors, setErrors] = useState({ address: ["", "", "", ""] }); // Для хранения ошибок

  const [fullname, setFullname] = useState({ name: "", surname: "" });
  const [address, setAddress] = useState(["", "", "", ""]);
  const [tel, setTel] = useState("");
  const [payment, setPayment] = useState([
    { click: true },
    { payme: false },
    { delivery: false },
    { bnpl: false },
  ]);

  const baskets = useSelector((state) => state.basket.baskets);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sumProduct = baskets.reduce(
    (acc, item) => acc + item.count * item.price * 3141,
    0
  );


  // console.log(uniqueId);
  
  function validateFields() {
    const newErrors = {};

    const newAddress = ["", "", "", ""];
    // Проверка имени и фамилии
    if (!fullname.name.trim())
      newErrors.name = "Имя обязательно для заполнения";
    if (!fullname.surname.trim())
      newErrors.surname = "Фамилия обязательна для заполнения";

    // Проверка телефона
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(tel))
      newErrors.tel = "Введите номер телефона в формате +998XXXXXXXXX";

    // Проверка адреса, если выбрана доставка
    if (!address[0]) {
      newAddress[0] = true;
    }
    if (!address[1]) {
      newAddress[1] = true;
    }
    if (!address[2]) {
      newAddress[2] = true;
    }
    if (!address[3]) {
      newAddress[3] = true;
    }

    setErrors({ ...newErrors, address: newAddress });

    return (
      Object.values(newErrors).length === 0 && !newAddress.find((item) => item)
    ); // true, если ошибок нет
  }

  function createOrder() {
    if (!localStorage.getItem("user")) {
      navigate("/auth");
      return;
    }

    if (!validateFields()) return; // Если есть ошибки, прервать выполнение
    if (localStorage.getItem("user")) {
      dispatch(
        addOrder({
          tel,
          payment,
          address,
          fullname,
          products: baskets,
          amount: sumProduct,
          status: [
            { pending: true }, //заказ ожидает обработки
            { processing: false }, //в процессе подготовки
            { shipped: false }, //уже в пути
            { delivered: false },
            { cancelled: false },
          ],
        })
      );
      alert("успешно");
      navigate("/");
    } else {
      alert("вы не зарегистрированы!!");
    }
  }

  const handleChangeAddres = (e, index) => {
    const newAddres = [...address];
    newAddres[index] = e.target.value;
    setAddress(newAddres);
  };
  const handleChangePayment = (method, index) => {
    const newPayment = [
      { click: false },
      { payme: false },
      { delivery: false },
      { bnpl: false },
    ];
    newPayment[index] = { [method]: true };
    setPayment(newPayment);
  };

  return (
    <div className={styles.checkout}>
      <nav className={styles.backBtns}>
        <span onClick={() => navigate("/")}>Главная</span>
        <span onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          Назад
        </span>
      </nav>

      <div className="container">
        <div className={styles.checkout_inner}>
          <h2>Оформить покупку</h2>
          <div>
            <div className={styles.checkout_left}>
              <form className={styles.user_data}>
                <h2>
                  <span className={styles.count_method}>
                    <p>1</p>
                  </span>
                  Ваши данные
                </h2>

                <div className={styles.user_field}>
                  <label htmlFor="tel">Телефон*</label>
                  <input
                    value={tel}
                    style={errors.tel ? { border: "1px solid #c4435d" } : {}}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                    type="tel"
                    id="tel"
                    placeholder="+998"
                    required
                  />
                </div>
                <nav className={styles.user_fullname}>
                  <div className={styles.user_field}>
                    <label htmlFor="name">Имя*</label>
                    <input
                      style={errors.name ? { border: "1px solid #c4435d" } : {}}
                      value={fullname.name}
                      onChange={(e) =>
                        setFullname((val) => ({
                          ...val,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      id="name"
                      placeholder="Введите имя"
                      required
                    />
                  </div>
                  <div className={styles.user_field}>
                    <label htmlFor="surname">Фамилия*</label>
                    <input
                      style={
                        errors.surname ? { border: "1px solid #c4435d" } : {}
                      }
                      value={fullname.surname}
                      onChange={(e) =>
                        setFullname((val) => ({
                          ...val,
                          surname: e.target.value,
                        }))
                      }
                      type="text"
                      id="surname"
                      placeholder="Введите фамилию"
                      required
                    />
                  </div>
                </nav>
              </form>
              <div className={styles.obtaining_product}>
                <h2>
                  <span className={styles.count_method}>
                    <p>2</p>
                  </span>
                  Способ получения
                </h2>
                <div>
                  <input
                    type="radio"
                    name="delivery"
                    id={styles.v1}
                    defaultChecked={true}
                  />
                  <input type="radio" name="delivery" id={styles.v2} />
                  <nav>
                    <label
                      htmlFor={styles.v1}
                      onClick={() => setIsObtaining(true)}
                    >
                      доставка
                    </label>
                    <label
                      htmlFor={styles.v2}
                      onClick={() => setIsObtaining(false)}
                    >
                      самовывоз
                    </label>
                  </nav>

                  <div className={styles.address_shop}>
                    <h3>Укажите адрес доставки</h3>
                    <nav>
                      <input
                        style={
                          errors.address[0]
                            ? { border: "1px solid #c4435d" }
                            : {}
                        }
                        value={address[0] && address[0]}
                        onChange={(e) => handleChangeAddres(e, 0)}
                        type="text"
                        placeholder="регион/область"
                      />
                      <input
                        style={
                          errors.address[1]
                            ? { border: "1px solid #c4435d" }
                            : {}
                        }
                        value={address[1] && address[1]}
                        onChange={(e) => handleChangeAddres(e, 1)}
                        type="text"
                        placeholder="город/район"
                      />
                    </nav>
                    <nav>
                      <input
                        style={
                          errors.address[2]
                            ? { border: "1px solid #c4435d" }
                            : {}
                        }
                        value={address[2] && address[2]}
                        onChange={(e) => handleChangeAddres(e, 2)}
                        type="text"
                        placeholder="адресс"
                      />
                      <input
                        style={
                          errors.address[3]
                            ? { border: "1px solid #c4435d" }
                            : {}
                        }
                        value={address[3] && address[3]}
                        onChange={(e) => handleChangeAddres(e, 3)}
                        type="text"
                        placeholder="этаж/дом"
                      />
                    </nav>
                  </div>
                  <div className={styles.shop_map}>
                    <MapCheckout />
                  </div>
                </div>
              </div>
              <div className={styles.payment_method}>
                <h2>
                  <span className={styles.count_method}>
                    <p>3</p>
                  </span>
                  Выберите способ оплаты
                </h2>
                <input
                  type="radio"
                  name="payment"
                  id={styles.click}
                  defaultChecked={true}
                  onChange={() => handleChangePayment("click", 0)}
                />
                <input
                  type="radio"
                  name="payment"
                  id={styles.payme}
                  onChange={() => handleChangePayment("payme", 1)}
                />
                <input
                  type="radio"
                  name="payment"
                  id={styles.receipt}
                  onChange={() => handleChangePayment("delivery", 2)}
                />
                <input
                  type="radio"
                  name="payment"
                  id={styles.installments}
                  onChange={() => handleChangePayment("bnpl", 3)}
                />

                <nav>
                  <label htmlFor={styles.click}>
                    <div>
                      <picture>
                        <img
                          src="https://mini-io-api.texnomart.uz/order/order/payment-method/10/13b426d0-14c6-47cc-b9c7-5b106a0cade5.png"
                          alt="img"
                        />
                      </picture>
                      <p>Click</p>
                    </div>
                  </label>
                  <label htmlFor={styles.payme}>
                    <div>
                      <picture>
                        <img
                          src="https://mini-io-api.texnomart.uz/order/order/payment-method/1/58798746-001b-47a7-af6c-2d3f85a20abb.png"
                          alt="img"
                        />
                      </picture>
                      <p>Payme</p>
                    </div>
                  </label>
                  <label htmlFor={styles.receipt}>
                    <div>
                      <picture>
                        <img
                          src="https://texnomart.uz/_nuxt/img/pick_up.f2e8b7b.svg"
                          alt="img"
                        />
                      </picture>
                      <p>При получении</p>
                    </div>
                  </label>
                  <label htmlFor={styles.installments}>
                    <div>
                      <picture>
                        <img
                          src="https://texnomart.uz/_nuxt/img/installment_small.b4857b1.svg"
                          alt="img"
                        />
                      </picture>
                      <p>В рассрочку</p>
                    </div>
                  </label>
                </nav>

                <div className={styles.receipt_box}>
                  <p>Можно оплатить при получении наличными или картой</p>
                </div>
                <div className={styles.m_12_24}></div>
              </div>
              <button onClick={createOrder} className={styles.purchase_btn}>
                Оформить покупку
              </button>
              <p>
                Подтверждая заказ, я принимаю условия Пользовательского
                соглашения
              </p>
            </div>
            <div className={styles.checkout_right}>
              <div className={styles.about_product}>
                <nav>
                  <h3>Товары в заказе</h3>
                  <span>Изменить</span>
                </nav>
                <ul>
                  {baskets.map((item, i) => {
                    if (i < 5) {
                      return (
                        <li key={item.id}>
                          <div>
                            <img src={item.images[0]} alt="img" />
                            <div>{item.title}</div>
                          </div>
                          {(item.price * 3141).toLocaleString("ru-RU")}
                          {" сум"}
                          <span>{item.count} штук</span>
                        </li>
                      );
                    }
                    return;
                  })}
                  <div>{baskets.length > 5 && <p>......</p>}</div>
                </ul>
              </div>
              <div className={styles.your_order}>
                <h3>Ваш заказ</h3>
                <div>
                  <p>{baskets.length} товара на сумму</p>
                  <p>
                    {Math.floor(sumProduct * 0.9).toLocaleString("ru-RU")} сум
                  </p>
                </div>
                <div>
                  <p>Итого </p>
                  <p>
                    {Math.floor(sumProduct * 0.9).toLocaleString("ru-RU")} сум
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
