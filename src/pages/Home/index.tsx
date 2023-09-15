import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
//import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { createContext, useState} from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
//import { ThemeContext } from "../../contexts/ThemeContext"; // importa a ThemeContext


interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date //com base na data saberemos quanto tempo se passou
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void

}



export const CyclesContext = createContext({} as CyclesContextType) 

const newCycleFormValidationSchema = zod.object({ 
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 60 minutos').
    max(40, 'O ciclo precisa ter de no máximo 60 minutos')
})



type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> 

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]) //sempre iniciar o estado com o mesmo tipo de informacao que sera usado na aplicacao
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //para saber o id do ciclo ativo
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    //const [task, setTask] = useState('') //monitora o estado do input, cada digitacao e armazenado no estado da aplicacao

    //const { handleThemeChange, selectedTheme } = useContext(ThemeContext) 


    const newCycleForm = useForm<NewCycleFormData>({ //exibe as variaveis disponiveis na interface
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }, 
        })

    const {handleSubmit, watch, reset} = newCycleForm

    
    
            
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)



    function markCurrentCycleAsFinished(){
        setCycles((state) => 
                state.map(cycle => {
                    if(cycle.id ===activeCycleId){
                        return{ ...cycle, finishedDate: new Date()  }
                    } else{
                        return cycle
                    }
                })
                )

    }
    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    
    function handleCreateNewCycle(data: NewCycleFormData) { //funcao que cria um novo ciclo
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
        reset();

    }

    function handleInterruptCycle(){ //funcao que interrompe um ciclo
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

    const task = watch('task') //variavel task que ta monitorando o estado de task
    const isSubmitDisabled = !task //variável auxiliar para monitorar o estado de task vazio
    console.log(cycles)

    


    return (
        
        <HomeContainer>

            {/* <select name="selectedTheme" value={selectedTheme} onChange = {handleThemeChange}>
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
            </select> */}
            
        
        <form onSubmit={handleSubmit(handleCreateNewCycle)}> {/*aqui seria adicionado o handleSubmit*/}
        <CyclesContext.Provider value={{  activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
        <FormProvider {...newCycleForm}>
        <NewCycleForm />
        </FormProvider>
        <Countdown/>
        </CyclesContext.Provider>

        { activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle} type="button">{/* desabiltia o countdown somente quando nao estiver nada escrito no setTask */}
        <HandPalm size={24}/> 
        Interromper
        </StopCountdownButton>
        ) : (
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">{/* desabiltia o countdown somente quando nao estiver nada escrito no setTask */}
        <Play size={24}/> 
        Começar
        </StartCountdownButton>) }
        </form>
        
        
            
        </HomeContainer>
            )
    }