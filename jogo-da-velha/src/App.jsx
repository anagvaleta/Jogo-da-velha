import { useEffect, useState } from "react";
import './styles.css';
/*
  DESAFIO TÉCNICO - JOGO DA VELHA - por fernandev

  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.

  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/

const winningCombinations = [
  //horizontais
  {indexes:[0,1,2], orientation: 'horizontal'},
  {indexes:[3,4,5], orientation: 'horizontal'},
  {indexes:[6,7,8], orientation: 'horizontal'},

  //verticas
  {indexes:[0,3,6], orientation: 'vertical'},
  {indexes:[1,4,7], orientation: 'vertical'},
  {indexes:[2,5,8], orientation: 'vertical'},

 //diagonais
  {indexes:[2,4,6], orientation: 'diagonal-1'},
  {indexes:[0,4,8], orientation: 'diagonal-2'},
];


function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]); 
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState(null);
  //gameData -> variavel de estado, 
  //setGameData -> função que atualiza o estado

  const handleClick = (clickedIndex) => {
    console.log(clickedIndex);

    //previne o usuario de clicar em um valor que já está diferente de zero
    if (gameData[clickedIndex] !==0) {
      return;
    }
    if (winningCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  }

  useEffect(()=> {
    checkWinner ();
    checkGameEnded();
  }, [gameData]);

  useEffect(() => {
    if(winningCombo){
      alert('Parabéns, você ganhou!');
    }
  }, [winningCombo]);

  const checkGameEnded = () => {
    if(gameData.every((item) => item !==0)) {
      alert('Fim de jogo')
    };
  }

  const checkWinner = () => {
    console.log('checking winner')
    let winner = null;

    for (let combination of winningCombinations) {
      const {indexes} = combination;
      if(gameData[indexes[0]]===1 && 
        gameData[indexes[1]]===1 && 
        gameData[indexes[2]]===1){
          winner = 'player 1';
      }
      if(gameData[indexes[0]]===2 && 
        gameData[indexes[1]]===2 && 
        gameData[indexes[2]]===2){
          winner = 'player 2';
      }
      if(winner){
        setWinningCombo(combination);
        break;
      }
    }

    console.log ({winner});
  };

  //value recebe o valor de cada elemento que está sendo iterado, ou seja, passando pelo loop
  //index recebe o valor da posição do elemento
  return (
    <>
    <div className="board-game"> 
      {gameData.map ((value, index) =>
        (<span onClick={() => {handleClick(index)}}
        key={index}
        className={winningCombo?.indexes.includes(index) ? winningCombo.orientation: null}
        >
          {value === 1 && '❌'}
          {value === 2 && '⭕'}
          </span>
    ))}
    </div>
    </>
  );
}

export default App;