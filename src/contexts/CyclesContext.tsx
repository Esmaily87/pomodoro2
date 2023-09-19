import { ReactNode, createContext, useState } from "react";

interface CreateCycleData{
    task: string,
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date //com base na data saberemos quanto tempo se passou
    interruptDate?: Date
    finishedDate?: Date
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
  const [cycles, setCycles] = useState<Cycle[]>([]) //sempre iniciar o estado com o mesmo tipo de informacao que sera usado na aplicacao
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //para saber o id do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
}

  function markCurrentCycleAsFinished(){
    setCycles((state) => // const [cycles, setCycles] = useState<Cycle[]>([])
            state.map(cycle => {
                if(cycle.id ===activeCycleId){
                    return{ ...cycle, finishedDate: new Date()  }
                } else{
                    return cycle
                }
            })
            )

}

function createNewCycle(data: CreateCycleData) { //funcao que cria um novo ciclo
    const id = String(new Date().getTime());

const newCycle: Cycle = { //deve ter id, task e minutesAmount
    id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
}

setCycles((state) => [...state, newCycle]) // sempre que uma mudança de estado depender do valor anterior usar arrow function
                                            //o spread operator ira buscar os ciclos já criados e adicionar o newcycle ao final
setActiveCycleId(id)
setAmountSecondsPassed(0)

console.log(data)
//reset();

}

function interruptCurrentCycle(){ //funcao que interrompe um ciclo
setActiveCycleId(null);

setCycles(state =>
    state.map(cycle=> {
    if(cycle.id ===activeCycleId){
        return{ ...cycle, interruptedDate: new Date()  }
    } else{
        return cycle
    }
}),
)
setActiveCycleId(null)
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