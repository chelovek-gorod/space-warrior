import canvas from './canvas.js';

// Константы для работы с радианами
const _2PI = Math.PI * 2;
const _RAD = Math.PI / 180;

// Очистка массива от неиспользуемых игровых объектов
// (у объектов массива arr[i] должно быть поле: arr[i].isExist)
// (Удаляем arr[i], если: arr[i].isExist === false)
export function getExistsObjectsFromArr(arr) {
    const filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isExist) filteredArr.push(arr[i]);
    }
    return filteredArr;
}

// функция поворота объекта object к объекту target, со скоростью turnSpeed
// (у объекта object должны быть поля: object.centerX; object.centerY; object.direction)
// (у объекта target должны быть поля: target.centerX; target.centerY; object.direction)
// (turnAngle - угол, на который необходимо повернуть object к target)
export function turnTo( object, target, turnAngle ) {
    let pointDirection = Math.atan2(target.centerY - object.centerY, target.centerX - object.centerX);
    let deflection = pointDirection - (object.direction % _2PI);
    if (!deflection) return;

    if (deflection < -Math.PI) deflection += _2PI;
    if (deflection >  Math.PI) deflection -= _2PI;

    if (Math.abs(deflection) <= turnAngle) {
        object.direction = pointDirection;
        console.log('deflection 0');
        return;
    }

    object.direction += (deflection <  0) ? -turnAngle : turnAngle;
}

// функция перемещения объекта object согласно его напрвления direction со скоростью speed
// (у объекта object должны быть поля: object.centerX; object.centerY; object.direction)
export function moveAccordingDirection( object, speed ) {
    object.centerX += Math.cos(object.direction) * speed;
    object.centerY += Math.sin(object.direction) * speed;
}

// функция определения расстояния в пикселях между объектами object и target
// (у объекта object должны быть поля: object.centerX; object.centerY)
// (у объекта target должны быть поля: target.centerX; target.centerY)
export function getDistance(object, target) {
    let dx = target.centerX - object.centerX;
    let dy = target.centerY - object.centerY;
    return Math.sqrt( dx**2 + dy**2 );
}

// функция перемещения объека object к объекту target со скоростью speed
// (у объекта object должны быть поля: object.centerX; object.centerY)
// (у объекта target должны быть поля: target.centerX; target.centerY)
// (speed - число пикселей, на которое нужно переместить object к target)
export function moveTo( object, target, speed ) {
    if (object.centerX !== target.centerX || object.centerY !== target.centerY) {
        let distance = getDistance(object, target)
        
        if (distance <= speed) {
            object.centerX = target.centerX;
            object.centerY = target.centerY;
        } else {
            let moveRate = speed / distance;
            object.centerX += moveRate * (target.centerX - object.centerX);
            object.centerY += moveRate * (target.centerY - object.centerY);
        }
    }
}

// ЭЛЕКТРИЧЕСКИЙ РАЗРЯД
// (у объекта object должны быть поля: object.x; object.y)
// (у объекта target должны быть поля: target.x; target.y)
// (color - цвет линии и света от электрического разряда)
export function drawLightning(object, target, color=null) {
    const colorsArr = ["#ffe0ff", "#e0ffff", "#ffffe0"];
    const lineColor = color ? color : colorsArr[Math.floor(Math.random() * colorsArr.length)];

    let distance = getDistance(object, target);
    let stepsCount = Math.ceil((distance / 4) + Math.random() * (distance / 8));
    let offsetRate = 6;

    const detDistance4Points = (x1, y1, x2, y2) => {
        let dy = x1 - x2, dx = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    let xx = object.centerX
    let yy = object.centerY

    canvas.context.save();
    canvas.context.lineWidth = 1;
    canvas.context.strokeStyle = lineColor;
    canvas.context.shadowBlur  = 5;
    canvas.context.shadowColor = lineColor;
    canvas.context.globalCompositeOperation = 'lighter';
    canvas.context.beginPath();
    canvas.context.moveTo(xx, yy);
    for (let i = stepsCount; i > 1; i--) {
        let pathLength = detDistance4Points(xx, yy, target.centerX, target.centerY);
        let offset = Math.sin(pathLength / distance * Math.PI) * offsetRate;
        xx += (target.centerX - xx) / i + Math.random() * offset * 2 - offset;
        yy += (target.centerY - yy) / i + Math.random() * offset * 2 - offset;
        canvas.context.lineTo(xx, yy);
    }
    canvas.context.stroke();
    canvas.context.restore();
}