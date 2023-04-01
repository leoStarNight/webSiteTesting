import * as React from 'react'
import gData from '../Variables/Variables';
import '../Styles/Timelapse.css';
import { gsap } from 'gsap';
import { clickResponse } from './Calculations';

// Тип который будет содержать ниже заготовленные аргументы для использования в функции ниже
type CalculateArgs = {
    maxBullet: number;      // Максимальное число элементов в барабане Timelapse
    posBullet: number;      // Определенное положение по индексу
    chosenRadian: number;   // Выбраннный радиан для обработки положения
}

// Функция которая считывает различные вертикальные и горизонтальные позиции какого-либо элемента
const calculatePosition = (args: CalculateArgs) => {
    // Считывается переменная верт. позиции
    const verticalPos = (
        // Допустим мы возьмем для смещения число 50%, которое сдвинет элемент в центр,
        // ведь 50% - число центрального положения какого-либо кружка.
        // Дальше мы еще прибавляем 50 для добавочного смещения, чтобы кружок был либо
        // крайне высоким, либо крайне низким, что поспособствует этому умножение на синус 
        // полной окружности (2*3.14).
        // В этом выражении синуса после умножения, далее нам нужно определить положение 
        // круга относительно касательной окружности барабана - делим на максимальное количество шариков во 
        // вращающемся барабане (args.maxBullet), умножаем на определенную 
        // позицию элемента в барабане (args.posBullet - 1), чтобы он лежал по порядку относительно других
        // кругов (первый, второй, третий и т.д.).
        50 + 50 * Math.sin(      
            Math.PI * 2 / args.maxBullet * (args.posBullet - 1)
        )
    );
    // Считывается переменная гориз. позиции
    const horizontalPos = (
        // Данный алгоритм эквивалентен тому алгоритму выше, только находится вместо синуса - косинус,
        // чтобы найти гориз. положение
        50 + 50 * Math.cos(
            Math.PI * 2 / args.maxBullet * (args.posBullet - 1)
        )
    );
    // Возвращаем словарем позиции относительно вертикали и горизонтали.
    return {verticalPos, horizontalPos};
}

// Функция, возвращающая параметры стиля для определения положения создаваемого
// шарика посредством функции calculatePosition.
const circleStyle = (pos, max, chosenRad, padPoint) => {
    let readyPos = calculatePosition({maxBullet:max, chosenRadian:chosenRad, posBullet:pos});
    
    // Возвращает считанные параметры сдвига (margin) и поворота (rotate).
    return {
        // В параметре сдвига мы вычитаем
        margin: (readyPos.verticalPos) + "%" + (readyPos.horizontalPos) + "%",        
        rotate: gData.currentDegree + "deg"

    } as React.CSSProperties
}

type CircleParams = {
    index: number;
    backIndex: number;
    forwardIndex: number;
    max: number;
    currentRadian: number;
    padding: number;
}

const Circle = (args: CircleParams) => {
    const max = args.max;
    const bounds = {
        back: args.backIndex,
        forward: args.forwardIndex
    }

    const getBackIndex = () => {
        if (bounds.back == 0) {
            return max;
        }
        return bounds.back;
    }        

    const [index] = React.useState<number>(args.index);
    let spanRef = React.useRef(null);

    const onMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
        gsap.to((spanRef.current), {
            scale: 5
        })
    }
    const onMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
        gsap.to((spanRef.current), {
            scale: 1
        })
    }

    const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        clickResponse(index);
    }

    return (
        <>                   
            <div className='timelapse-bunch' onClick={onClick}
            style={circleStyle(args.index,args.max,args.currentRadian,args.padding)}>
                <span className='timelapse-item' onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} ref={el => spanRef.current = el}>
                    {args.index}
                </span>
            </div>
        </>
    )
}

export default Circle;