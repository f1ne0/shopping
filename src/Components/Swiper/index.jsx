import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, Autoplay,EffectFade } from "swiper/modules";

import { Link } from "react-router-dom";
import styles from "./SwiperProduct.module.scss";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const api = "https://api.escuelajs.co/api/v1/categories";

function SwiperProduct({ contentProduct }) {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios(api).then((res) => setCategories(res.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.swiper_box}>
      <div className={styles.swiper_box_inner}>
        <Swiper
          modules={[Navigation, Autoplay,EffectFade]}
          spaceBetween={24}
          slidesPerView={1}
          // loop={true}
          // pagination={{ clickable: true }}
          // effect={"fade"}
          navigation={{
            nextEl: `.${styles.btn_next}`,
            prevEl: `.${styles.btn_prev}`,
          }}
          autoplay={{
            delay: 5000,
          }}
          className={styles.swiper_wrapper}
        >
          {categories.length < 1
            ? ""
            : categories.map((item) => (
                <SwiperSlide key={item.id} className={styles.swiper_slide}>
                  <Link to={"/"}>
                    <picture>
                      <img
                        src="https://cdn.mediapark.uz/imgs/492647c7-699f-4a26-a53b-d190c98cf6fb_Web-RU-(47).webp"
                        alt="img"
                      />
                    </picture>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>

        <button className={styles.btn_prev}>
          <ChevronLeft />
        </button>
        <button className={styles.btn_next}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default SwiperProduct;
