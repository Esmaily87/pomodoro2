import { HandPalm, Play } from "phosphor-react";
import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton 
} from "./styles";
//import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from './components/Countdown';
import { CyclesContext } from "../../contexts/CyclesContext";
//import { ThemeContext } from "../../contexts/ThemeContext"; // importa a ThemeContext








//export const CyclesContext = createContext({} as CyclesContextType) //1. exportar o contexto e importar o context

const newCycleFormValidationSchema = zod.object({ 
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 60 minutos').
    max(40, 'O ciclo precisa ter de no máximo 60 minutos')
})



type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> 

export function Home(){

    const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
    
    
    //const [task, setTask] = useState('') //monitora o estado do input, cada digitacao e armazenado no estado da aplicacao

    //const { handleThemeChange, selectedTheme } = useContext(ThemeContext) 


    const newCycleForm = useForm<NewCycleFormData>({ //exibe as variaveis disponiveis na interface
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }, 
        })

    const {handleSubmit, watch, /*reset*/ } = newCycleForm

   
    
   

    
    
    
    

    const task = watch('task') //variavel task que ta monitorando o estado de task
    const isSubmitDisabled = !task //variável auxiliar para monitorar o estado de task vazio
    //console.log(cycles)

    


    return (
        
        <HomeContainer>

            {/* <select name="selectedTheme" value={selectedTheme} onChange = {handleThemeChange}>
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
            </select> */}
            
        
        <form onSubmit={handleSubmit(createNewCycle)}> {/*aqui seria adicionado o handleSubmit*/}
        
        <FormProvider {...newCycleForm}>
        <NewCycleForm />
        </FormProvider>
        <Countdown/>
        {/*componente que permite o contexto conforme declarado na linha 33*/}

        { activeCycle ? (
        <StopCountdownButton onClick={interruptCurrentCycle} type="button">{/* desabiltia o countdown somente quando nao estiver nada escrito no setTask */}
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