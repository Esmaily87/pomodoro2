import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm(){

   

    const {activeCycle} = useContext(CyclesContext) // 1. cria contexto entre a home e o new cycleform
    const { register } = useFormContext()
    

   

return(
    <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
            id="task" 
            //name= "task" //o register já poem um nome
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle} // será passado via context
            {...register('task')} //spread operator na frente de um objeto disponibiliza todos as propriedades disponiveis do objeto
            //onChange={(e) => setTask(e.target.value)} //ao inves de capturar o que o usuario digita seria substituido por  {...register('task')} acima
            //value={task} //valor do estado, digitacao do usuario
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"/>
                <option value="Projeto 2"/>
                <option value="Projeto 3"/>
                <option value="Projeto 4"/>

            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00" 
            step={5} 
            min={0} 
            max={60}
            disabled={!!activeCycle}

            {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
)
}