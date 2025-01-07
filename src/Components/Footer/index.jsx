import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

import uzcard from "../../assets/paymentMethod/uzcard.webp";
import humo from "../../assets/paymentMethod/humo.webp";
import clickImg from "../../assets/paymentMethod/clickImg.webp";
import payme from "../../assets/paymentMethod/payme.webp";
import visa from "../../assets/paymentMethod/visa.webp";
import mastercard from "../../assets/paymentMethod/mastercard.webp";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footer_inner}>
          <div className={styles.footer_top}>
            <div>
              <Link to={"/"}>
                <h1>LOGO</h1>
              </Link>
              <div className={styles.question}>
                <p>Возникли вопросы? Готовы помочь:</p>
                <span>+998 71 203 33 33</span>
                <p>График работы:</p>
                <span>Ежедневно : 09:00 - 21:00</span>
              </div>
            </div>

            <div>
              <p>Способы оплаты</p>
              <nav>
                <span>
                  <img width="23" height="30" src={uzcard} alt="uzcard" />
                </span>
                <span>
                  <img width="80" height="20" src={humo} alt="humo" />
                </span>
                <span>
                  <img width="72" height="19" src={clickImg} alt="click" />
                </span>
                <span>
                  <img width="59" height="23" src={payme} alt="payme" />
                </span>
                <span>
                  <img width="62" height="20" src={visa} alt="visa" />
                </span>
                <span>
                  <img
                    width="48"
                    height="34"
                    src={mastercard}
                    alt="mastercard"
                  />
                </span>
              </nav>
            </div>

            <div>
              <p>Информация</p>
              <ul>
                <li>
                  <Link>О нас</Link>
                </li>
                <li>
                  <Link>Гарантия</Link>
                </li>
                <li>
                  <Link>Акция</Link>
                </li>
                <li>
                  <Link>Наши магазины</Link>
                </li>
              </ul>
            </div>

            <div>
              <p>Услуги</p>
              <ul>
                <li>
                  <Link>Услуги</Link>
                </li>
                <li>
                  <Link>Способы оплаты</Link>
                </li>
                <li>
                  <Link>Всё о рассрочке</Link>
                </li>
                <li>
                  <Link>Партнёрство</Link>
                </li>
                <li>
                  <Link>Возврат товара</Link>
                </li>
              </ul>
            </div>

            <div>
              <p>Для покупателей</p>
              <ul>
                <li>
                  <Link>Доставка</Link>
                </li>
                <li>
                  <Link>Связаться с нами!</Link>
                </li>
                <li>
                  <Link>Сервисный центр</Link>
                </li>
                <li>
                  <Link>Оставить отзыв</Link>
                </li>
                <li>
                  <Link>Вакансии</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
