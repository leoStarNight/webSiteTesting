import * as Data from '../data.json'

class GlobalData {
     // Здесь массив где будет содержаться элементы кружков которые
    // будут обработаны в функции Timelapse
    timelapseData = Data;

    // Здесь считывается часть самого круга-карусели в радианах
    // К примеру 1/6 (Шестиугольник)
    partOfCircle = Math.PI*2 / this.timelapseData.Slides.length;

    // Переменные в радианах, ниже в градусах, которые будет содержать начальные данные о вращательном положении
    // элемента Timelapse
    currentRadian = 0;
    currentDegree = 0;
    // Переменная содержащая определенный для выбора индекс исходя из всех кружков
    chosenIndex = 1;

    chosenSlide = 0;
}

const gData = new GlobalData();

export default gData;