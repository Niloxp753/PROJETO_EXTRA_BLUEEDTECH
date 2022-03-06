console.clear();
const prompt = require(`prompt-sync`)();
do {
   
   let rodadas = 0;
   let quantJog = 0;
   var Jogador = [];
   var j = 0
   var p = 0
   //FUNÇÃO PARA PULAR LINHA E SEGUIR COM A DEPURAÇÃO
   function continuar() {
      console.log();
      console.clear(prompt('\033[35mAPERTE ENTER PARA CONTINUAR..\033[0m'));
   };

   //FUNÇÃO PARA RANDOMIZAR O VALOR DO DADO AO SER LANÇADO
   function ValorDadoRandom(minimo, maximo) {
      min = Math.ceil(minimo);
      max = Math.floor(maximo);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   //FUNÇÃO PARA CRIAR UM JOGADOR/OBJETO COM BASE NA QUANTIDADE DE JOGADORES E ARMAZENÁ-LO NA ARRAY
   function CriarJogador() {
      for (let i = 0; i < quantJog; i++) {
         do {
            console.clear();
            console.log('INFORME O \033[32mNOME\033[0m DO ' + (i + 1) + 'º JOGADOR:');
            Jogador[i] = {
               Nome: (prompt().toUpperCase()),
               Resultado: 0,
               Vitoria: 0,
            };
         } while (!isNaN(Jogador[i].Nome));

         continuar();
         console.log('JOGADOR ' + '\033[32m' + Jogador[i].Nome + ' \033[0mCRIADO COM SUCESSO');
         continuar();
      }
   }

   //FUNÇÃO PARA INICIAR A PARTIDA/LANÇAMENTO DO DADO
   function LancarDado() {

      for (p = 0; p < quantJog; p++) {
         console.clear();
         console.log('\033[36m' + (j + 1) + 'ª RODADA:\033[0m ' + '\033[32m' + Jogador[p].Nome + ' \033[0mAPERTE \033[35mENTER\033[0m PARA LANÇAR O DADO..\033[0m ');
         prompt();
         Jogador[p].Resultado = ValorDadoRandom(1, 6);
         console.log('\033[32m' + Jogador[p].Nome + ' \033[0mO RESULTADO DO SEU DADO FOI ' + '\033[33m' + Jogador[p].Resultado + '\033[0m');
         console.log();
         console.table(Jogador);
         continuar();
      }
      VencedorRodada();

      if (Jogador[quantJog - 1].Resultado == Jogador[quantJog - 2].Resultado) {
         EmpateRodada();
         console.clear();
         console.log('OS JOGADORES ' + '\033[32m' + Jogador[quantJog - 1].Nome + ' \033[0mE ' + '\033[32m' + Jogador[quantJog - 2].Nome + ' \033[31mEMPATARAM NA ' + (j + 1) + 'ª RODADA\033[0m');
         continuar();
      }

   }

   //FUNÇÃO PARA DEFINIR O VENCEDOR DA RODADA E SOMAR PONTO DE VITÓRIA COM BASE NO RESULTADO DO DADO
   function VencedorRodada() {
      Jogador.sort(function (a, b) {

         return a.Resultado - b.Resultado;
      });

      Jogador[quantJog - 1].Vitoria += 1;

      if (Jogador[quantJog - 1].Resultado > Jogador[quantJog - 2].Resultado) {
         console.log('O VENCEDOR DA ' + (j + 1) + 'ª RODADA FOI ' + '\033[32m' + Jogador[quantJog - 1].Nome + '\033[0m');
         continuar();
      }

   }

   //FUNÇÃO PARA DEFINIR O EMPATE DA RODADA E TIRAR O PONTO DE VITÓRIA COM BASE NO RESULTADO DO DADO
   function EmpateRodada() {
      Jogador.sort(function (a, b) {

         return a.Resultado == b.Resultado;

      });

      return Jogador[quantJog - 1].Vitoria -= 1;
   }

   //FUNÇÃO PARA DEFINIR O VENCEDOR FINAL PELA QUANTIDADE DE VITÓRIAS
   function VencedorFinal() {
      Jogador.sort(function (a, b) {

         return a.Vitoria - b.Vitoria;

      });

   }

   //FUNÇÃO PARA DEFINIR O EMPATE FINAL PELA IGUALDADE DE VITÓRIAS
   function EmpateFinal() {
      Jogador.sort(function (a, b) {

         return a.Vitoria == b.Vitoria

      });
   }


   //AQUI SE INICIA O JOGO

   do {
      console.clear();
      console.log('\nINFORME A \033[36mQUANTIDADE\033[0m DE JOGADORES QUE LANÇARÁ O DADO EM CADA RODADA: ');
      quantJog = (+prompt());
   } while (isNaN(quantJog) || quantJog == '');

   continuar();

   do {
      console.clear();
      console.log('\nINFORME A \033[36mQUANTIDADE\033[0m DE RODADAS QUE DESEJA JOGAR O DADO: ');
      rodadas = (+prompt());
   } while (isNaN(rodadas) || rodadas == '');

   continuar();

   CriarJogador();
   for (var j = 0; j < rodadas; j++) {

      LancarDado();

   }

   VencedorFinal();

   console.log('\n\033[36mRESULTADO FINAL:\033[0m O VENCEDOR FINAL FOI ' + '\033[32m' + Jogador[quantJog - 1].Nome + '\n\033[0m');

   if (Jogador[quantJog - 1].Vitoria == Jogador[quantJog - 2].Vitoria) {
      EmpateFinal()
      console.clear()
      console.log(
         '\n\033[36mRESULTADO FINAL:\033[0m OS JOGADORES ' + '\033[32m' + Jogador[quantJog - 1].Nome + ' \033[0mE ' + '\033[32m' + Jogador[quantJog - 2].Nome + ' \033[31mEMPATARAM\033[0m\n');
   }

   console.table(Jogador);
   console.log();
   console.log('\n\033[0mOBRIGADO POR JOGAR, APERTE \033[32mENTER\033[0m PARA JOGAR NOVAMENTEOU ENCERRE O JOGO INSERINDO \033[31mQUALQUER MENSAGEM + ENTER...\033[0m\n');
   playAgain = prompt('');
   if (playAgain == '') {
      playAgain = true;

   } else {
      playAgain = false;
   }

} while (playAgain);
