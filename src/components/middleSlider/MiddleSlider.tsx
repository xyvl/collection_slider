import React, { useEffect } from 'react'
import styles from "./middleSlider.module.scss";

const MiddleSlider = () => {
    useEffect(() => {
        const slider = document.querySelector(`.${styles.sliderr}`) as HTMLElement;
        console.log(slider)
        const sliderInner = document.querySelector(`.${styles.slider_inner}`) as HTMLElement;
        const sliderBlock = document.querySelectorAll<HTMLElement>(`.${styles.slider_block}`);

        let startX: number;
        let active: boolean;
        let x: number;

        const press = (event: number) => {
            active = true;
            sliderInner.style.transition = 'none'
            const momentLeft = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            startX = event - momentLeft;
        }
        const letOff = () => {
            if (!active) return;
            active = false;

            sliderInner.style.pointerEvents = 'auto';
            const momentLeft = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth);
            sliderInner.style.transition = 'all .2s'
            sliderInner.style.transform = `translate(${momentLeft * sliderBlock[0].clientWidth}px, 0)`;
        }
        const move = (event: number, e: MouseEvent | TouchEvent) => {
            if (!active) return;
            e.preventDefault()

            sliderInner.style.pointerEvents = 'none';
            const leftAtTheMoment = parseInt((window.getComputedStyle(sliderInner).transform).slice(18));
            x = event + leftAtTheMoment;

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
            let leftAtTheMoment = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth : 0);
            leftAtTheMoment += 1
            if(leftAtTheMoment <= 0)
            sliderInner.style.transform = `translate(${leftAtTheMoment * sliderBlock[0].clientWidth}px, 0)`
        })

        btnRight.addEventListener('click', e => {
            sliderInner.style.transition = 'all .2s'
            let leftAtTheMoment = Math.round(parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) ? parseInt((window.getComputedStyle(sliderInner).transform).slice(18)) / sliderBlock[0].clientWidth : 0);
            leftAtTheMoment -= 1
            if(leftAtTheMoment * -1 <= sliderBlock.length - 1)
            sliderInner.style.transform = `translate(${leftAtTheMoment * sliderBlock[0].clientWidth}px, 0)`
        })

    }, [])


    return (
        <section>
            <div className="wrapper">
                <div className={styles.grid}>
                    <div className={`${styles.btn} ${styles.left}`}>&lt;</div>
                    <div className={styles.sliderr}>
                        <div className={styles.slider_inner}>
                            <a href='/d' className={styles.slider_block}>1</a>
                            <a href='/e' className={styles.slider_block}>2</a>
                            <a href='/e' className={styles.slider_block}>3</a>
                            <a href='/e' className={styles.slider_block}>4</a>
                            <a href='/e' className={styles.slider_block}>5</a>
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

export default MiddleSlider