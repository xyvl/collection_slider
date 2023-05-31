import React, { useEffect } from 'react'
import styles from './seniorSlider.module.scss'

const SeniorSlider = () => {

    useEffect(() => {
        const slider = document.querySelector<HTMLElement>(`.${styles.slider}`);
        const sliderInner = document.querySelector(`.${styles.slider_inner}`) as HTMLElement;
        const sliderObject = document.querySelectorAll<HTMLElement>(`.${styles.slider_objec}`);
        const btnLeft = document.querySelector<HTMLElement>(`.${styles.leftt}`);
        const btnRight = document.querySelector<HTMLElement>(`.${styles.right}`);

        let padding = parseInt(window.getComputedStyle(sliderObject[0]).padding);

        for (let i = 0; i < sliderObject.length; i++) {
            sliderObject[i].style.padding = `${padding}px`
        }
        sliderObject[1].style.padding = '0px';
        let startX: number;
        let x: number;
        let active: boolean = false;

        //ФУНКЦИИ ДЛЯ СЛАЙДЕРА
        const press = (clientX: number) => {
            active = true;
            const momentLeft = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            startX = clientX - momentLeft;
            for (let i = 0; i < sliderObject.length; i++) {
                sliderObject[i].style.transition = 'none'
            }
            sliderInner.style.transition = 'none'
        }
        const letOff = () => {
            if (!active) return;

            active = false;
            sliderInner.style.pointerEvents = 'auto';
            sliderInner.style.transition = 'all .2s'
            for (let i = 0; i < sliderObject.length; i++) {
                sliderObject[i].style.transition = 'all .2s'
            }
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            const coefficient = Math.round(Math.abs(leftAtTheMoment / sliderObject[7].clientWidth));

            sliderInner.style.transform = `translate(${coefficient * sliderObject[7].clientWidth * -1}px, 0)`;
            sliderObject[coefficient].style.padding = `${padding}px`;
            sliderObject[coefficient + 1].style.padding = `${0}px`;
            sliderObject[coefficient + 2].style.padding = `${padding}px`;
            if (sliderObject[coefficient + 3])
                sliderObject[coefficient + 3].style.padding = `${padding}px`;
        }
        const move = (clientX: number, e: MouseEvent | TouchEvent) => {
            if (!active) return;
            e.preventDefault();

            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            x = clientX + leftAtTheMoment;
            const finallLeft = x - startX - leftAtTheMoment;
            const numberLeftMoment = Math.abs(Math.ceil(finallLeft / sliderObject[0].clientWidth));
            const coefficient = Math.abs(finallLeft / sliderObject[7].clientWidth) - Math.trunc(Math.abs(finallLeft / sliderObject[7].clientWidth));
            const maxLeft = (sliderObject.length - (sliderInner.clientWidth / sliderObject[0].clientWidth)) * sliderObject[0].clientWidth * -1;

            if (finallLeft > 0) {
                sliderInner.style.transform = `translate(${0}px, 0)`;
                startX = clientX;
                return;
            }
            if (finallLeft < maxLeft) {
                sliderInner.style.transform = `translate(${maxLeft}px, 0)`;
                startX = x - leftAtTheMoment * 2;
                return;
            }
            sliderObject[numberLeftMoment].style.padding = `${(coefficient * padding) + padding}px`;
            sliderObject[numberLeftMoment + 1].style.padding = `${coefficient * padding}px`;
            sliderObject[numberLeftMoment + 2].style.padding = `${padding - coefficient * padding}px`;
            if (sliderObject[numberLeftMoment + 3])
                sliderObject[numberLeftMoment + 3].style.padding = `${padding + (1 - coefficient) * padding}px`;

            sliderInner.style.pointerEvents = 'none';
            sliderInner.style.transform = `translate(${finallLeft}px, 0)`;
        }
        //MOUSE
        slider?.addEventListener('mousedown', (e) => {
            press(e.clientX)
        })
        window.addEventListener('mouseup', () => {
            letOff()
        })
        slider?.addEventListener('mousemove', (e) => {
            move(e.clientX, e)
        })
        //TOUCH
        slider?.addEventListener('touchstart', (e) => {
            press(e.changedTouches[0].clientX)
        })
        window.addEventListener('touchend', () => {
            letOff()
        })
        slider?.addEventListener('touchmove', (e) => {
            move(e.changedTouches[0].clientX, e)
        })
        //CLICK
        btnLeft?.addEventListener('click', () => {
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            const coefficient = Math.round(Math.abs(leftAtTheMoment / sliderObject[7].clientWidth)) - 1;
            if (coefficient < 0) {
                return;
            }
            clickFunction(coefficient);
            
        })
        btnRight?.addEventListener('click', () => {
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            const coefficient = Math.round(Math.abs(leftAtTheMoment / sliderObject[7].clientWidth)) + 1;

            if (coefficient > sliderObject.length - sliderInner.clientWidth / sliderObject[0].clientWidth) {
                return;
            }
            clickFunction(coefficient);
        })

        //ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
        const clickFunction = (coefficient:number) => {
            sliderInner.style.transition = 'all .2s'
            for (let i = 0; i < sliderObject.length; i++) {
                sliderObject[i].style.transition = 'all .2s'
            }

            sliderInner.style.transform = `translate(${coefficient * sliderObject[7].clientWidth * -1}px, 0)`;
            sliderObject[coefficient].style.padding = `${padding}px`;
            sliderObject[coefficient + 1].style.padding = `${0}px`;
            sliderObject[coefficient + 2].style.padding = `${padding}px`;
            if (sliderObject[coefficient + 3])
                sliderObject[coefficient + 3].style.padding = `${padding}px`;
        }

    }, [])





    return (
        <section>
            <div className="wrapper">
                <div className={styles.grid}>
                    <div className={`${styles.btn} ${styles.left}`}>&lt;</div>
                    <div className={styles.slider}>
                        <div className={styles.slider_inner}>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>1</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>2</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>3</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>4</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>5</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>6</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>7</a></div>
                            <div className={styles.slider_objec}><a href='/' className={styles.slider_block}>8</a></div>
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

export default SeniorSlider