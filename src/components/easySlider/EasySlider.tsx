import React, { useEffect } from 'react'
import styles from "./easySlider.module.scss";

const EasySlider = () => {
  useEffect(() => {
    const btnLeft = document.querySelector<HTMLElement>(`.${styles.left}`);
    const btnRight = document.querySelector<HTMLElement>(`.${styles.right}`);

    const sliderInner = document.querySelector(`.${styles.slider_inner}`) as HTMLElement;
    const sliderLenght = document.querySelectorAll(`.${styles.slider_block}`).length;

    btnLeft?.addEventListener('click', (e) => {
      const percent = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / parseInt(window.getComputedStyle(sliderInner).width) + 1);

      if (percent <= 0)
        sliderInner.style.transform = `translate(${100 * percent}%, 0)`;
    })
    btnRight?.addEventListener('click', (e) => {
      const percent = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / parseInt(window.getComputedStyle(sliderInner).width) - 1);

      if (percent > sliderLenght * -1)
        sliderInner.style.transform = `translate(${100 * percent}%, 0)`;
    })
  }, [])
  return (
    <section>
      <div className="wrapper">
        <div className={styles.grid}>
          <div className={`${styles.btn} ${styles.left}`}>&lt;</div>
          <div className={styles.slider}>
            <div className={styles.slider_inner}>
              <div className={styles.slider_block}>1</div>
              <div className={styles.slider_block}>2</div>
              <div className={styles.slider_block}>3</div>
              <div className={styles.slider_block}>4</div>
              <div className={styles.slider_block}>5</div>
            </div>
          </div>
          <div className={`${styles.btn} ${styles.right}`}>&gt;</div>
        </div>
        <ul>
          <li className='junior'>Можно перемещатся по кнопкам</li>
          <li className='middle none'>Можно взаимодействовать с ссылками внутри слайдера</li>
          <li className='senior none'>Можно перемешать слайдер мышкой</li>
          <li className='senior none'>Можно перемешать слайдер пальцем</li>
        </ul>
      </div>
    </section>
  )
}

export default EasySlider