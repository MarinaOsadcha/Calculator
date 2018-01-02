//обработчик onclick на <div class=form id=calculator>	
var userValue = [];       //массив для вводимых чисел
var operandPrevious = 0;  //предыдущий оператор
var countClicks = 0;	  //подсчет кликов для операторов
var dot = 0;			  //переменная для точки числа
var temp = 0;
var result = 0;
	
var prevTarget = 0;

function toCalculate(event) {
	var tempValue = document.getElementById('tempValue');  //окно, куда выводятся данные вводимых чисел
	var numerals = document.getElementById('calculator');
	
	var target = event.target;
	
    //проверка на число по атрибуту data-numerals	
	if (target.hasAttribute('data-numerals')) { 
		
		if (userValue.length <= 7) {  //max кол-во чисел выводимых на экран 8
					
			if (userValue[0] == 0 && target.innerHTML !== ' . ') {  //eсли 1е число вводят 0, то 2е переносим на место первого, кроме точки
				if (userValue.length !== 2) {
					userValue[0] = + target.innerHTML;
					$('.main').html(userValue);
				} else { 
					userValue.push(+ target.innerHTML);
					$('.main').html(userValue);
				}
			           
			} else {
				if (target.innerHTML == ' . ') {
					if (dot == 0) {
					userValue.push('.');
					} else {
						userValue = userValue;
					}
					dot = dot + 1;
				} else {
					userValue.push(+target.innerHTML); //добавляем контент в переменную + чтобы строку сделать числом
				}
				$('.main').html(userValue);  //выводим на экран калькулятора число
			}
		
		} else {					 // звук если вводят больше 8ми чисел
			var audio = new Audio(); // Создаём новый элемент Audio
			audio.src = 'ding.mp3';  // Указываем путь к звуку "клика"
			audio.autoplay = true;   // Автоматически запускаем
		}
	
		temp = +userValue.join('');  //переводим массив в число     
		temp = +temp.toFixed(2);     //округляем до 2х чисел после запятой
		console.log(userValue); 
		console.log(temp);
	};
	
	//проверка на оператор по атрибуту data-operator
	if (target.hasAttribute('data-operator')) {
		dot = 0;
		countClicks = countClicks + 1;
		var operandCurrent = target.innerHTML;  //находим контент этого элемента
		var operandLength = $('.operand').html()    //если строка operand станет слишком большой, очистить и добавить только result
	
		if (countClicks <= 1 || !prevTarget.hasAttribute('data-operator')) {             //if больше 1го раза нажимается кнопка с оператором, он переписывается, а не добавляется
			$('.operand').append(temp + operandCurrent);
		} else {
			var str = $('.operand').html();
			str = str.slice(0, -3);
			$('.operand').html(str + operandCurrent);
		}
	
	if (operandPrevious == 0) {    //после 1го операнда число только одно ему присваиваем значение result
		result = temp;
		
	} else {
	  
	    if (operandPrevious == ' + ') {
		  result = result + temp;
		  result = +result.toFixed(2);
		  $('.main').html(result);
		}
	    if (operandPrevious == ' - ') {
		  result = result - temp;
		  result = +result.toFixed(2);
		  $('.main').html(result);
	    }
	    if (operandPrevious == ' × ') {
		  result = result * temp;
		  $('.main').html(result);
	    }
	    if (operandPrevious == ' ÷ ')  {
			if (temp == 0){
				var audio = new Audio(); // Создаём новый элемент Audio
				audio.src = 'ding.mp3';  // Указываем путь к звуку "клика"
				audio.autoplay = true;   // Автоматически запускаем
			} else {
				result = result / temp;
				result = +result.toFixed(2);  //округление до 2х знаков после запятой, возвращает строку, поэтому +
				$('.main').html(result);
			}		  
	    }
	}
		if (operandCurrent == ' = ' || operandLength.length > 20) {
			$('.main').html(+result.toFixed(2));
			$('.operand').empty();
			temp = +result.toFixed(2);
			operandPrevious = 0;
			countClicks = 0;
		
		} else {
			operandPrevious = operandCurrent;
			temp = 0;
			userValue = [];
		}
	};
	
	//для кнопки с - обнуление, 
	if (target.hasAttribute('data-overWriteC')) {
		$('.main').html(0);            //0 на экране калькулятора  
		$('.operand').empty();
		temp = 0;
		userValue = [];
		result = 0;
		dot = 0;
		console.log(temp);
	};
	
	 //для кнопки се - обнуление последнего числа
	if (target.hasAttribute('data-overWriteCe')) {
		$('.main').html(0);            //0 на экране калькулятора  
		temp = 0;
		dot = 0;
		userValue = [];	
	};
	
	//для кнопки процент, переводим темр переменную в проценты
	if (target.hasAttribute('data-percent')) {
		if (result !== 0) {
			temp = (result*temp)/100;
			console.log(temp);
			console.log(result);
		} else {
			temp = temp;
		} 
	};
	
	prevTarget = event.target; 
};

calculator.onclick  = toCalculate;

$(document).ready(function () {
  $('.main').html(0);            //0 на экране калькулятора
});