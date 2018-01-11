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
		var contadorSetas=0;
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
		var conta = ["9-8", "1+2", "7-3", "10-5", "6+2", "15-6", "2+8", "8+4", "25-12", "28-13", "5+11", "13+5", "3+17", "13+9", "30-7", "17+8", "15+11", "12+15", "5+23", "6+24"];
		var resultado = ["1", "3", "4", "5", "8", "9", "10", "12", "13", "15", "16", "18", "20", "22", "23", "25", "26", "27", "28", "30"];
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
		var balao1 = new Balao(45, 2, 40, "red", 100);
		var balao2 = new Balao(170, 2, 41, "blue", 100);
		var balao3 = new Balao(305, 2, 42, 'green', 100);
		var balao4 = new Balao(440, 2, 43, "yellow", 100);
		var balao5 = new Balao(575, 2, 44, "purple", 100);

		var certo;
		if (balao1.text != resultado[posicaoarraycerto] &&
			balao2.text != resultado[posicaoarraycerto] &&
			balao3.text != resultado[posicaoarraycerto] &&
			balao4.text != resultado[posicaoarraycerto]) {

			certo = resultado[posicaoarraycerto];
		}
		else {
			certo = resultado[Math.floor((Math.random() * 20))];
		}

		var balaocerto = new Balaocerto(705, 2, 45, 'gray', 100, certo);



		function GameOver() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var text = "VOCÊ PERDEU!"
			ctx.fillText(text, canvas.width / 2 - text.length / 2, canvas.height / 2);

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
			balaocerto.desenhaBalao();


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

			//colisões

			var dx1 = setapontax - balao1.x;
			var dy1 = setapontay - balao1.y;
			var D1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

			if (D1 < balao1.raio + 5) {

				if (balao1.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++;
					  
				}
			
				
			}
			var dx2 = setapontax - balao2.x;
			var dy2 = setapontay - balao2.y;
			var D2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

			if (D2 < balao2.raio + 5) {

				if (balao2.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++;
					  
				}
		
			}

			var dx3 = setapontax - balao3.x;
			var dy3 = setapontay - balao3.y;
			var D3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

			if (D3 < balao3.raio + 5) {

				if (balao3.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++;
					  
				}
			}

			var dx4 = setapontax - balao4.x;
			var dy4 = setapontay - balao4.y;
			var D4 = Math.sqrt(dx4 * dx4 + dy4 * dy4);

			if (D4 < balao4.raio + 5) {

				if (balao4.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++;
					  
				}
			}
		
			var dx5 = setapontax - balao5.x;
			var dy5 = setapontay - balao5.y;
			var D5 = Math.sqrt(dx5 * dx5 + dy5 * dy5);

			if (D5 < balao5.raio + 5) {

				if (balao5.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++;
					  
				}
			}

			var dx6 = setapontax - balaocerto.x;
			var dy6 = setapontay - balaocerto.y;
			var D6 = Math.sqrt(dx6 * dx6 + dy6 * dy6);

			if (D6 < balaocerto.raio + 5) {

				if (balaocerto.text == resultado[posicaoarraycerto]) {
					ganhar++;
					 
				}
				else {
					perder++
					  
				}
			}
			if(ganhar==1){
					pontuacao="Acertaste :D";
					setTimeout(function(){
						window.open("facil.html", "_self")
							}, 2500);
					
				}
				if(perder==1){
					vidas=vidas-1;
					
				}

			if(vidas ==0 ){
				window.open("GameOver.html", "_self")
			}	

			balao1.atualizaBalao();
			balao2.atualizaBalao();
			balao3.atualizaBalao();
			balao4.atualizaBalao();
			balao5.atualizaBalao();
			balaocerto.atualizaBalao();


		}


	}
}




