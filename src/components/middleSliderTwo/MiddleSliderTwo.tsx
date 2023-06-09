import React, { useEffect } from 'react'
import styles from './middleSliderTwo.module.scss'
import bg1 from '../../img/ (1).jpg'
import bg2 from '../../img/ (2).jpg'
import bg3 from '../../img/ (3).jpg'
import bg4 from '../../img/ (4).jpg'
import bg5 from '../../img/ (5).jpg'
import bg6 from '../../img/ (6).jpg'
import bg7 from '../../img/ (7).jpg'
import bg8 from '../../img/ (8).jpg'

const MiddleSliderTwo = () => {
    useEffect(() => {
        const slider = document.querySelector(`.middle_two_slider`) as HTMLElement;
        const sliderInner = document.querySelector(`.middle_two_slider_inner`) as HTMLElement;
        const sliderBlock = document.querySelectorAll<HTMLElement>(`.middle_two_slider_block`);
        const sliderMini = document.querySelector(`.${styles.flex}`) as HTMLElement;
        const sliderWindow = document.querySelector(`.${styles.window}`) as HTMLElement;

        let startX: number;
        let active: boolean;
        let x: number;

        const press = (event: number) => {
            active = true;
            sliderInner.style.transition = 'none'
            sliderWindow.style.transition = 'none'
            const momentLeft = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            startX = event - momentLeft;
        }
        const letOff = () => {
            if (!active) return;
            active = false;

            sliderInner.style.pointerEvents = 'auto';
            const momentLeft = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth);
            const sliderMini = document.querySelector(`.${styles.flex}`) as HTMLElement;

            const sliderWindow = document.querySelector(`.${styles.window}`) as HTMLElement;
            const windowWidth = sliderMini.clientWidth / Math.round(sliderMini.clientWidth / sliderWindow.clientWidth);

            sliderInner.style.transition = 'all .2s'
            sliderWindow.style.transition = 'all .2s'
            sliderInner.style.transform = `translate(${momentLeft * sliderBlock[0].clientWidth}px, 0)`;
            sliderWindow.style.transform = `translate(${momentLeft * windowWidth * -1}px, 0)`;
        }
        const move = (event: number, e: MouseEvent | TouchEvent) => {
            if (!active) return;
            e.preventDefault()

            sliderInner.style.pointerEvents = 'none';
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            const sliderBlockWidth = sliderBlock[0].clientWidth;
            x = event + leftAtTheMoment;

            const coefficent = leftAtTheMoment / sliderBlockWidth;

            const sliderMini = document.querySelector(`.${styles.flex}`) as HTMLElement;
            const sliderWindow = document.querySelector(`.${styles.window}`) as HTMLElement;
            const windowWidth = sliderMini.clientWidth / Math.round(sliderMini.clientWidth / sliderWindow.clientWidth);

            if (event - startX > 0) {
                sliderInner.style.transform = `translate(${0}px, 0)`
                startX = event
                return;
            }

            if (x - startX - leftAtTheMoment < (sliderBlock.length - 1) * sliderBlock[0].clientWidth * -1) {
                sliderInner.style.transform = `translate(${(sliderBlock.length - 1) * sliderBlock[0].clientWidth * -1}px, 0)`;
                startX = x - leftAtTheMoment * 2;
                return;
            } else
                sliderInner.style.transform = `translate(${x - startX - leftAtTheMoment}px, 0)`

            console.log(coefficent)
            sliderWindow.style.transform = `translate(${coefficent * windowWidth * -1}px, 0)`;
        }

        slider.addEventListener('mousedown', (e) => {
            press(e.clientX)
        })
        window.addEventListener('mouseup', () => {
            letOff()
        })
        slider.addEventListener('mousemove', (e) => {
            move(e.clientX, e)
        })

        slider.addEventListener('touchstart', (e) => {
            press(e.changedTouches[0].clientX)
        })
        window.addEventListener('touchend', () => {
            letOff()
        })
        slider.addEventListener('touchmove', (e) => {
            move(e.changedTouches[0].clientX, e)
        })

        const btnLeft = document.querySelector(`.${styles.left}`) as HTMLElement;
        const btnRight = document.querySelector(`.${styles.right}`) as HTMLElement;

        btnLeft.addEventListener('click', e => {
            sliderInner.style.transition = 'all .2s'

            const sliderMini = document.querySelector(`.${styles.flex}`) as HTMLElement;
            const sliderWindow = document.querySelector(`.${styles.window}`) as HTMLElement;
            const windowWidth = sliderMini.clientWidth / Math.round(sliderMini.clientWidth / sliderWindow.clientWidth);

            let leftAtTheMoment = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth : 0);
            leftAtTheMoment += 1;
            if (leftAtTheMoment <= 0) {
                sliderInner.style.transform = `translate(${leftAtTheMoment * sliderBlock[0].clientWidth}px, 0)`;
                sliderWindow.style.transform = `translate(${leftAtTheMoment * windowWidth * -1}px, 0)`;
            }
        })

        btnRight.addEventListener('click', e => {
            sliderInner.style.transition = 'all .2s'

            const sliderMini = document.querySelector(`.${styles.flex}`) as HTMLElement;
            const sliderWindow = document.querySelector(`.${styles.window}`) as HTMLElement;
            const windowWidth = sliderMini.clientWidth / Math.round(sliderMini.clientWidth / sliderWindow.clientWidth);

            let leftAtTheMoment = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth : 0);
            leftAtTheMoment -= 1;
            if (leftAtTheMoment * -1 <= sliderBlock.length - 1) {
                sliderInner.style.transform = `translate(${leftAtTheMoment * sliderBlock[0].clientWidth}px, 0)`;
                sliderWindow.style.transform = `translate(${leftAtTheMoment * windowWidth * -1}px, 0)`;
            }
        })

        sliderMini.addEventListener('click', (e: any) => {
            const coefficent = Math.floor(e?.layerX / (sliderInner.clientWidth / sliderBlock.length));
            sliderInner.style.transform = `translate(${-coefficent * 100}%, 0)`;
            sliderWindow.style.transform = `translate(${coefficent * (sliderInner.clientWidth / sliderBlock.length)}px, 0)`;
            console.log(e?.layerX)
            console.log(sliderInner.clientWidth / sliderBlock.length)
        })
    }, [])
    return (
        <section>
            <div className="wrapper">
                <div className={styles.grid}>
                    <div className={`${styles.btn} ${styles.left}`}>&lt;</div>
                    <div className={`${styles.slider} middle_two_slider`}>
                        <div className={`${styles.slider_inner} middle_two_slider_inner`}>
                            <a href='/d' className={`${styles.slider_block} middle_two_slider_block`}>
                                <img src={bg1} alt="" />
                            </a>
                            <a href='/e' className={`${styles.slider_block} middle_two_slider_block`}>
                                <img src={bg2} alt="" />
                            </a>
                            <a href='/e' className={`${styles.slider_block} middle_two_slider_block`}>
                                <img src={bg3} alt="" />
                            </a>
                            <a href='/e' className={styles.slider_block}>
                                <img src={bg4} alt="" />
                            </a>
                            <a href='/e' className={styles.slider_block}>
                                <img src={bg5} alt="" />
                            </a>
                            <a href='/e' className={styles.slider_block}>
                                <img src={bg6} alt="" />
                            </a>
                            <a href='/e' className={styles.slider_block}>
                                <img src={bg7} alt="" />
                            </a>
                            <a href='/e' className={styles.slider_block}>
                                <img src={bg8} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.btn} ${styles.right}`}>&gt;</div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.window}></div>
                    <img src={bg1} alt="" draggable="false" />
                    <img src={bg2} alt="" draggable="false" />
                    <img src={bg3} alt="" draggable="false" />
                    <img src={bg4} alt="" draggable="false" />
                    <img src={bg5} alt="" draggable="false" />
                    <img src={bg6} alt="" draggable="false" />
                    <img src={bg7} alt="" draggable="false" />
                    <img src={bg8} alt="" draggable="false" />
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

export default MiddleSliderTwo
