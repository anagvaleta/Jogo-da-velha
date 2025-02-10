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
  [0,1,2],
  [3,4,5],
  [6,7,8],

  //verticas
  [0,3,6],
  [1,4,7],
  [2,5,8],

 //diagonais
  [2,4,6],
  [0,4,8],
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

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  }

  useEffect(()=> {
    checkWinner ();
  }, [gameData])

  const checkWinner = () => {
    console.log('checking winner')
    let winner = null;

    for (let values of winningCombinations) {

      if(gameData[values[0]]===1 && 
        gameData[values[1]]===1 && 
        gameData[values[2]]===1){
          winner = 'player 1';
      }
      if(gameData[values[0]]===2 && 
        gameData[values[1]]===2 && 
        gameData[values[2]]===2){
          winner = 'player 2';
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