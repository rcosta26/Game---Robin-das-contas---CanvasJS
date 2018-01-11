window.onload = function () {
	var canvas = document.getElementById('myCanvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");



		// iniciar as imagens




		//imagem do arco
		var nImgs = 0;
		var bow = new Image();
		bow.src = '../resources/bow2.png';
		bow.addEventListener('load', function () {
			nImgs++
			//ctx.drawImage(bow, bowx, bowy, 200, 200); 
			tryAnimate();
		});
		// imagem do arqueiro
		var archer = new Image();
		archer.src = '../resources/arqueiro.png';
		archer.addEventListener('load', function () {
			nImgs++
			tryAnimate()
			//ctx.drawImage(archer, arqx, arqy, 150, 150);
		});

		function tryAnimate() {
			//animar	
			if (nImgs == 2)
				window.setInterval(desenho, 10);
		}

		//Variaveis de posiçao
		var contadorSetas = 0;
		var perder = 0;
		var ganhar = 0;
		var deg = Math.PI / 180
		var upkey = false;
		var arqx = 50;
		var arqy = 620
		var bowx = arqx + 15;
		var bowy = arqy;
		var vidas = 3;
		var pontuacao ="";
		var conta = ["18 x 14","20 x 16","15 x 3","16 x 12","8 x 14","74 : 37","560 : 40","169 : 13","420 : 12","969 : 3","27 x 5","58 x 12","124 x 4","69 x 5","37 x 13","998 : 2","208 : 8","980 : 4","328 : 41","759 : 3"];
		var resultado = ["252","320","45","192","112","2","14","13","35","323","135","696","496","345","481","499","26","245","8","253"];
		var check;
		var rightkey = false;
        var leftkey = false;
		var clicar = false;
		var deltaXboneco = 8;
		var posicaoarraycerto = Math.floor((Math.random() * 20));
		var mostrarconta = conta[posicaoarraycerto];


		
		// mostar na pagina html as variaveis vida pontuacao e conta
		document.getElementById("contas").innerHTML = mostrarconta;
		document.getElementById("pontuacao").innerHTML = pontuacao;
		document.getElementById("vidas").innerHTML = vidas;

		// seta

		var setapontax = arqx + 70;
		var setapontay = arqy - 20;
		var setacaudax = setapontax - 2;
		var setacauday = setapontay;
		var deltaY = 5;

		//interação rato(movimento seta)

		function ratocoor(e) {
			ratox = e.pageX - canvas.offsetLeft;
			ratoy = e.pageY - canvas.offsetTop;

        }
        window.addEventListener('click', ratocoor);


		//interação setas(movimento boneco)
		function ArrowPressed(evt) {
			if (evt.keyCode == 39) {
				rightkey = true;
			}
			if (evt.keyCode == 37) {
				leftkey = true;
			}
			if (evt.keyCode == 38) {
				upkey = true;
			}

		}
		function ArrowReleased(evt) {
			if (evt.keyCode == 39) {
				rightkey = false;
			}
			if (evt.keyCode == 37) {
				leftkey = false;
			}

		}


		window.addEventListener('keydown', ArrowPressed);
		window.addEventListener('keyup', ArrowReleased);

		//balões

		//balao certo se nos outros nao tiver opçao
		function Balaocerto(x, dX, raio, cor, y, certo) {

			//dar a posição do array aleatoriamente

			this.x = x;	//posição horizontal da balao
			this.dX = dX;	//valor delta para alterar posição horizontal da balao
			this.cor = cor;	//cor da balao
			this.raio = raio;	//raio da balao
			this.y = y; //posição vertical das bolas
			this.text = certo;
			this.desenhaBalao = function () {

				ctx.beginPath();
				ctx.fillStyle = this.cor;
				ctx.strokeStyle = this.cor;
				ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, true);
				ctx.fill();

				ctx.font = 'bold 20px Verdana';
				ctx.textAlign = 'center';
				ctx.textBaseline = "middle";
				ctx.fillStyle = 'black';
				ctx.fillText(this.text, this.x, this.y);


			}

			this.atualizaBalao = function () {
				this.x = this.x + dX;

				if (this.x >= canvas.width - this.raio || this.x <= this.raio)
					dX = - dX;

			}


		}

		//definição do objeto Balao, com dois métodos: desenhaBalao e atualizaBalao
		function Balao(x, dX, raio, cor, y) {

			var random = Math.floor((Math.random() * 20)); //dar a posição do array aleatoriamente

			this.x = x;	//posição horizontal da balao
			this.dX = dX;	//valor delta para alterar posição horizontal da balao
			this.cor = cor;	//cor da balao
			this.raio = raio;	//raio da balao
			this.y = y; //posição vertical das bolas
			this.text = resultado[random];



			this.desenhaBalao = function () {

				ctx.beginPath();
				ctx.fillStyle = this.cor;
				ctx.strokeStyle = this.cor;
				ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, true);
				ctx.fill();

				ctx.font = 'bold 20px Verdana';
				ctx.textAlign = 'center';
				ctx.textBaseline = "middle";
				ctx.fillStyle = 'black';
				ctx.fillText(this.text, this.x, this.y);


			}

			this.atualizaBalao = function () {
				this.x = this.x + dX;

				if (this.x >= canvas.width - this.raio || this.x <= this.raio)
					dX = - dX;

			}
		}

		//inicializar
		var balao1 = new Balao(41, 2, 40, "red", 100);
		var balao2 = new Balao(191, 2, 41, "blue", 100);
		var balao3 = new Balao(341, 2, 42, 'green', 100);
		var balao4 = new Balao(491, 2, 43, "yellow", 100);
		var balao5 = new Balao(641, 2, 44, "purple", 100);
		var balao6 = new Balao(120, 2, 30, "orange", 300);
		var balao7 = new Balao(270, 2, 31, "#ff0066", 300);
		var balao8 = new Balao(420, 2, 32, "#00ff00", 300);
		var balao9 = new Balao(570, 2, 33, "#00ccff", 300);
		var balao10 = new Balao(720, 2, 34, "#99cc00", 300);

		var certo;
		if (balao1.text != resultado[posicaoarraycerto] &&
			balao2.text != resultado[posicaoarraycerto] &&
			balao3.text != resultado[posicaoarraycerto] &&
			balao4.text != resultado[posicaoarraycerto] &&
			balao5.text != resultado[posicaoarraycerto] &&
			balao6.text != resultado[posicaoarraycerto] &&
			balao7.text != resultado[posicaoarraycerto] &&
			balao8.text != resultado[posicaoarraycerto] &&
			balao9.text != resultado[posicaoarraycerto] &&
			balao10.text != resultado[posicaoarraycerto]) {

			certo = resultado[posicaoarraycerto];
		}
		else {
			certo = resultado[Math.floor((Math.random() * 20))];
		}

		var balaocerto = new Balaocerto(791, 2, 45, 'gray', 100, certo);

			function GameOver() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var text = "VOCÊ PERDEU!"
			ctx.fillText(text, canvas.width / 2 - text.length / 2, canvas.height / 2);

		}

		function obstaculos(x,y,raio){
                

				this.x=x;
				this.y=y;
				this.raio=raio;
                ctx.fillStyle = "black";
                
				ctx.beginPath();
                ctx.arc(x,y,raio,0,2*Math.PI,false);
				ctx.fill();

				ctx.font = 'bold 45px Verdana';
				ctx.textAlign = 'center';
				ctx.textBaseline = "middle";
				ctx.fillStyle = 'white';
				ctx.fillText("X", x, y);

               
            }

		function desenho() {
			//apagar
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//desenhar
			balao1.desenhaBalao();
			balao2.desenhaBalao();
			balao3.desenhaBalao();
			balao4.desenhaBalao();
			balao5.desenhaBalao();
			balao6.desenhaBalao();
			balao7.desenhaBalao();
			balao8.desenhaBalao();
			balao9.desenhaBalao();
			balao10.desenhaBalao();
			balaocerto.desenhaBalao();
				
				var obstaculo1 = new obstaculos(250,190,35);
                var obstaculo2 = new obstaculos(700,190,35);
                var obstaculo3 = new obstaculos(475,400,35);
               


		
			ctx.fillStyle = "saddlebrown";
			ctx.fillRect(setacaudax, setacauday, 5, 60);
			ctx.beginPath();
			ctx.fillStyle = "gray";
			ctx.arc(setapontax, setapontay, 5, 0, Math.PI * 2, false);
			ctx.fill();

			ctx.drawImage(bow, bowx, bowy, 200, 200);
			ctx.drawImage(archer, arqx, arqy, 150, 150);


			//atualizar

			document.getElementById("contas").innerHTML = mostrarconta;
			document.getElementById("pontuacao").innerHTML = pontuacao;
			document.getElementById("vidas").innerHTML = vidas;

			if (rightkey == true && arqx < canvas.width - 160) {
				arqx = arqx + deltaXboneco;
				bowx = bowx + deltaXboneco;
				setapontax = setapontax + deltaXboneco;
				setacaudax = setacaudax + deltaXboneco;
			}
			if (leftkey == true && arqx > 0) {
				arqx = arqx - deltaXboneco;
				bowx = bowx - deltaXboneco;
				setapontax = setapontax - deltaXboneco;
				setacaudax = setacaudax - deltaXboneco;
			}
				if (upkey == true) {
				window.removeEventListener('keydown', ArrowPressed);
				window.removeEventListener('keyup', ArrowReleased);
				rightkey=false;
				leftkey=false;
				setapontay = setapontay - deltaY;
				setacauday = setacauday - deltaY;
			}
			// seta a bater em no topo dá "reset" a seta"
				if (setapontay==10 && pontuacao==""){
				contadorSetas++;
				upkey=false;
				setapontay=arqy -20;
				setacauday = setapontay;
				
				window.addEventListener('keydown', ArrowPressed);
				window.addEventListener('keyup', ArrowReleased);
				vidas = 3-contadorSetas;
			}


		
			//colisões com baloes

			var dx1 = setapontax - balao1.x;
			var dy1 = setapontay - balao1.y;
			var D1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

			if (D1 < balao1.raio + 5) {

				if (balao1.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			}
			var dx2 = setapontax - balao2.x;
			var dy2 = setapontay - balao2.y;
			var D2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

			if (D2 < balao2.raio + 5) {
				if (balao2.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
		
			}

			var dx3 = setapontax - balao3.x;
			var dy3 = setapontay - balao3.y;
			var D3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

			if (D3 < balao3.raio + 5) {

				if (balao3.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			}

			var dx4 = setapontax - balao4.x;
			var dy4 = setapontay - balao4.y;
			var D4 = Math.sqrt(dx4 * dx4 + dy4 * dy4);

			if (D4 < balao4.raio + 5) {

				if (balao4.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				
			}
		
			var dx5 = setapontax - balao5.x;
			var dy5 = setapontay - balao5.y;
			var D5 = Math.sqrt(dx5 * dx5 + dy5 * dy5);

			if (D5 < balao5.raio + 5) {

				if (balao5.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				
			}

			var dx6 = setapontax - balaocerto.x;
			var dy6 = setapontay - balaocerto.y;
			var D6 = Math.sqrt(dx6 * dx6 + dy6 * dy6);

			if (D6 < balaocerto.raio + 5) {

				if (balaocerto.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			
			}


			var dx7 = setapontax - balao6.x;
			var dy7 = setapontay - balao6.y;
			var D7 = Math.sqrt(dx7 * dx7 + dy7 * dy7);

			if (D7 < balao6.raio + 5) {

				if (balao6.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			
			
				
			}
			var dx8 = setapontax - balao7.x;
			var dy8 = setapontay - balao7.y;
			var D8 = Math.sqrt(dx8 * dx8 + dy8 * dy8);

			if (D8 < balao7.raio + 5) {

				if (balao7.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			
		
			}

			var dx9 = setapontax - balao8.x;
			var dy9 = setapontay - balao8.y;
			var D9 = Math.sqrt(dx9 * dx9 + dy9 * dy9);

			if (D9 < balao8.raio + 5) {

				if (balao8.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			
			}

			var dx10 = setapontax - balao9.x;
			var dy10 = setapontay - balao9.y;
			var D10 = Math.sqrt(dx10 * dx10 + dy10 * dy10);

			if (D10 < balao9.raio + 5) {

				if (balao9.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			}
		
			var dx11 = setapontax - balao10.x;
			var dy11 = setapontay - balao10.y;
			var D11 = Math.sqrt(dx11 * dx11 + dy11 * dy11);

			if (D11 < balao10.raio + 5) {

				if (balao10.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
			}


				// colisoes com obstaculos

			var dxo1 = setapontax - obstaculo1.x;
			var dyo1 = setapontay - obstaculo1.y;
			var Do1 = Math.sqrt(dxo1 * dxo1 + dyo1 * dyo1);

			if (Do1 < obstaculo1.raio + 5) {

				perder++;

				upkey=false;
				setapontay=arqy -20;
				setacauday = setapontay;
				
				window.addEventListener('keydown', ArrowPressed);
				window.addEventListener('keyup', ArrowReleased);


				}

			var dxo2 = setapontax - obstaculo2.x;
			var dyo2 = setapontay - obstaculo2.y;
			var Do2 = Math.sqrt(dxo2 * dxo2 + dyo2 * dyo2);

			if (Do2 < obstaculo2.raio + 5) {

				perder++;

				upkey=false;
				setapontay=arqy -20;
				setacauday = setapontay;
				
				window.addEventListener('keydown', ArrowPressed);
				window.addEventListener('keyup', ArrowReleased);


				}

			var dxo3 = setapontax - obstaculo3.x;
			var dyo3 = setapontay - obstaculo3.y;
			var Do3 = Math.sqrt(dxo3 * dxo3 + dyo3 * dyo3);

			if (Do3 < obstaculo3.raio + 5) {

				perder++;

				upkey=false;
				setapontay=arqy -20;
				setacauday = setapontay;
				
				window.addEventListener('keydown', ArrowPressed);
				window.addEventListener('keyup', ArrowReleased);


				}
				
			if (ganhar == 1) {
				pontuacao = "Acertaste :D";
				setTimeout(function () {
					window.open("dificil.html", "_self")
				}, 2500);

			}
			if (perder == 1) {
				vidas = vidas - 1;
				perder=0;

			}

			if (vidas == 0) {
				window.open("GameOver.html", "_self")
			}






			balao1.atualizaBalao();
			balao2.atualizaBalao();
			balao3.atualizaBalao();
			balao4.atualizaBalao();
			balao5.atualizaBalao();
			balao6.atualizaBalao();
			balao7.atualizaBalao();
			balao8.atualizaBalao();
			balao9.atualizaBalao();
			balao10.atualizaBalao();
			balaocerto.atualizaBalao();
		}





	}
}
