import { ReactNode, createContext, useState, useReducer} from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, intrerruptCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/actions";
//import { act } from "react-dom/test-utils";

interface CreateCycleData{
    task: string,
    minutesAmount: number
}



interface CyclesContextType{ //todas os valores da interface devem ser declarados no value do CycleContext.provider
    cycles: Cycle[]
    activeCycle: Cycle | undefined; //o activeCycle é necessário nos dois componentes NewCycleForm e CountDown
    activeCycleId: string | null;
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void //toda a funçao é passada e sem retorno e enviada pelo contexto CycleContext.provider
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
 
}

export const CyclesContext = createContext({} as CyclesContextType)

type CyclesContextProviderProps = {
    children: ReactNode
}



export function CycleContextProvider({
    children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
    cycles: [],
    activeCycleId: null
    },
    
    )//sempre iniciar o estado com o mesmo tipo de informacao que sera usado na aplicacao

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const{ cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
}

  function markCurrentCycleAsFinished(){

    dispatch(markCurrentCycleAsFinishedAction()) 
    

}

function createNewCycle(data: CreateCycleData) { //funcao que cria um novo ciclo
    const id = String(new Date().getTime());

const newCycle: Cycle = { //deve ter id, task e minutesAmount
    id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
}


    dispatch(addNewCycleAction(newCycle))                                            

setAmountSecondsPassed(0)

console.log(data)
//reset();

}

function interruptCurrentCycle(){ //funcao que interrompe um ciclo
    dispatch(intrerruptCycleAction())
}
/*console.log(formState.errors)*/
console.log(activeCycle)

    return(
        <CyclesContext.Provider value={{
            cycles,  
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
            }}>
                {children}
        </CyclesContext.Provider>
    )
}