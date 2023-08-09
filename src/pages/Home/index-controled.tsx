import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useState } from "react";

export function Home(){
    const [task, setTask] = useState('') //monitora o estado do input, cada digitacao e armazenado no estado da aplicacao
   
    return (
        <HomeContainer>
        <form action="">
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
            id="task" 
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            onChange={(e) => setTask(e.target.value)} //pega o evento de mudanca e salva no state do setTask
            value={task} //valor do estado, digitacao do usuario
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"/>
                <option value="Projeto 2"/>
                <option value="Projeto 3"/>
                <option value="Projeto 4"/>

            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60}
             />

            <span>minutos.</span>
        </FormContainer>
       

        <CountDownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={!task} type="submit">{/* desabiltia o countdown somente quando nao estiver nada escrito no setTask */}
            <Play size={24}/> 
        </StartCountDownButton>
        </form>
            
        </HomeContainer>
            )
    }