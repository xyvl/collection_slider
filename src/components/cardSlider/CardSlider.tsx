import React, { useEffect } from 'react'
import styles from "./cardSlider.module.scss";

const CardSlider = () => {

    useEffect(() => {
        const slider = document.querySelector(`.${styles.slide}`) as HTMLElement;
        const sliderInner = document.querySelector(`.${styles.slider_inner}`) as HTMLElement;
        const sliderBlock = document.querySelectorAll<HTMLElement>(`.${styles.slider_block}`);

        let startX: number;
        let x: number;
        let active: boolean = false;

        const press = (clientX: number) => {
            active = true
            const momentLeft = parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) : 0;
            startX = clientX - momentLeft;
            sliderInner.style.transition = 'none';
        }
        const letOff = () => {
            if (!active) return;
            active = false;
            sliderInner.style.pointerEvents = 'auto'
            sliderInner.style.transition = 'all .2s';

            const gap = parseInt(window.getComputedStyle(sliderInner).gap);
            const widthSliderBlock = sliderBlock[0].clientWidth + gap;
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) : 0;

            sliderInner.style.transform = `translate(${Math.round(leftAtTheMoment / widthSliderBlock) * widthSliderBlock}px, 0)`;
        }
        const move = (clientX: number, e: MouseEvent | TouchEvent) => {
            if (!active) return;
            e.preventDefault();

            sliderInner.style.pointerEvents = 'none'
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) : 0;
            const gap = parseInt(window.getComputedStyle(sliderInner).gap);
            x = clientX + leftAtTheMoment;

            if (x - startX - leftAtTheMoment < ((sliderBlock.length - 1) * gap + sliderBlock.length * sliderBlock[0].clientWidth) * -1 + sliderInner.clientWidth) {
                sliderInner.style.transform = `translate(${((sliderBlock.length - 1) * gap + sliderBlock.length * sliderBlock[0].clientWidth) * -1 + sliderInner.clientWidth}px, 0)`;
                startX = x - leftAtTheMoment * 2;
                return;
            }
            if (x - startX - leftAtTheMoment > 0) {
                startX = clientX;
                sliderInner.style.transform = `translate(${0}px, 0)`;
                return;
            }
            sliderInner.style.transform = `translate(${x - startX - leftAtTheMoment}px, 0)`;
        }

        slider.addEventListener('mousedown', (e) => {
            press(e.clientX);
        })
        window.addEventListener('mouseup', () => {
            letOff();
        })
        slider.addEventListener('mousemove', (e) => {
            move(e.clientX, e);
        })

        slider.addEventListener('touchstart', (e) => {
            press(e.changedTouches[0].clientX);
        })
        window.addEventListener('touchend', () => {
            letOff();
        })
        slider.addEventListener('touchmove', (e) => {
            move(e.changedTouches[0].clientX, e);
        })

        const btnLeft = document.querySelector<HTMLElement>(`.${styles.left}`);
        const btnRight = document.querySelector<HTMLElement>(`.${styles.right}`);

        btnLeft?.addEventListener('click', () => {
            const gap = parseInt(window.getComputedStyle(sliderInner).gap);
            const widthSliderBlock = sliderBlock[0].clientWidth + gap;
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) : 0;
            const leftEnd = Math.round(leftAtTheMoment / widthSliderBlock + 1) * widthSliderBlock;

            sliderInner.style.transition = 'all .2s'
            if(leftEnd <= 0)
            sliderInner.style.transform = `translate(${leftEnd}px, 0)`
        })
        btnRight?.addEventListener('click', () => {
            const gap = parseInt(window.getComputedStyle(sliderInner).gap);
            const widthSliderBlock = sliderBlock[0].clientWidth + gap;
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) : 0;
            const leftEnd = Math.round(leftAtTheMoment / widthSliderBlock - 1) * widthSliderBlock;

            sliderInner.style.transition = 'all .2s'
            if(((sliderBlock.length - 1) * gap + sliderBlock.length * sliderBlock[0].clientWidth) * -1 + sliderInner.clientWidth <= leftEnd -10 || ((sliderBlock.length - 1) * gap + sliderBlock.length * sliderBlock[0].clientWidth) * -1 + sliderInner.clientWidth <= leftEnd +10)
            sliderInner.style.transform = `translate(${leftEnd}px, 0)`
        })
    }, [])



    return (
        <section>
            <div className="wrapper">
                <div className={styles.grid}>
                    <div className={`${styles.btn} ${styles.left}`}>&lt;</div>
                    <div className={styles.slide}>
                        <div className={styles.slider_inner}>
                            <a href='/' className={styles.slider_block}>1</a>
                            <a href='/' className={styles.slider_block}>2</a>
                            <a href='/' className={styles.slider_block}>3</a>
                            <a href='/' className={styles.slider_block}>4</a>
                            <a href='/' className={styles.slider_block}>5</a>
                            <a href='/' className={styles.slider_block}>6</a>
                            <a href='/' className={styles.slider_block}>7</a>
                            <a href='/' className={styles.slider_block}>8</a>
                        </div>
                    </div>
                    <div className={`${styles.btn} ${styles.right}`}>&gt;</div>
                </div>
                <ul>
                    <li className='junior'>Можно перемещатся по кнопкам</li>
                    <li className='middle'>Можно взаимодействовать с ссылками внутри слайдера</li>
                    <li className='senior'>Можно перемешать слайдер мышкой</li>
                    <li className='senior'>Можно перемешать слайдер пальцем</li>
                </ul>
            </div>
        </section>
    )
}

export default CardSlider