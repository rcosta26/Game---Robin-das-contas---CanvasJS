window.onload = function () {
	var canvas = document.getElementById('myCanvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		
			var text = "Robin das Contas";
			ctx.fillStyle = "rgb(255, 217, 102)";
			ctx.font = 'italic 65px Coventry';
			ctx.textAlign = 'center';
			ctx.fillText(text,canvas.width/2,150);


			var rectx=350;
			var recty=50;
			
 
			//botoes modo jogo espacamento de botoes=30
			ctx.fillStyle="rgb(128, 85, 0)";
			ctx.fillRect(canvas.width/2-rectx/2,250,rectx,recty);
		
			ctx.fillRect(canvas.width/2-rectx/2,330,rectx,recty);
			ctx.fillRect(canvas.width/2-rectx/2,410,rectx,recty);
			//botao instrucoes
			ctx.fillStyle="rgb(64,128,0)";
			ctx.fillRect(canvas.width/2+75,490,100,recty);

		



    }
}