
import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';



export function Countdown() {

    const {
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, //funcao passada via contexto pela home via CycleContext.provider
        amountSecondsPassed,
        setSecondsPassed
    
    } = useContext(CyclesContext)
   
   

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number
       
        if(activeCycle){
           interval = setInterval(()=>{
            const secondsDifference =  differenceInSeconds(new Date(), 
            activeCycle.startDate,);

            if(secondsDifference >= totalSeconds){
                markCurrentCycleAsFinished() //funcao passada via contexto da home CycleContext.provider e chamada aqui e tambem declarada como dependencia

                setSecondsPassed(totalSeconds)
                clearInterval(interval)
            } else {
                setSecondsPassed(secondsDifference)
            }
            }, 1000 )
        }

        return() =>{ //funcao que remove o ciclo anteriormente criado
            clearInterval(interval)
            
        }
        
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed]) //todas as funçoes usadas dentro de um usefet devem ser adicionadas como uma dependencia

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    
    const minutesAmount = Math.floor(currentSeconds / 60) //arredonda o valor dos minutos para baixo
    const secondsAmount = currentSeconds % 60 //operador de resto de divisao para encontrar a fracao de segundos nao cheios divididos por 60
    
    const minutes = String(minutesAmount).padStart(2, '0') //padstart preenche uma string com o numero de carateres
    const seconds = String(secondsAmount).padStart(2, '0') //padstart preenche uma string com o numero de carateres

    useEffect(()=> {
        if(activeCycle){
        document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle])



    

    return(
        <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
    </CountDownContainer>
    )
}