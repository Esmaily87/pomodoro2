import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
//import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({ //schema de validacao de dados sendo possivel adicionar mais propriedades que serao add as interfaces
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 60 minutos').
    max(40, 'O ciclo precisa ter de no máximo 60 minutos')
})

// interface NewCycleFormData{
//    task: string
//    minutesAmount: number
//} 

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //typeof converte uma variavel JS para dentro do typescript referenciando

interface Cycle {
    id: string
    task: string
    minutesAmount: number


}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]) //sempre iniciar o estado com o mesmo tipo de informacao que sera usado na aplicacao
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //para saber o id do ciclo ativo
    //const [task, setTask] = useState('') //monitora o estado do input, cada digitacao e armazenado no estado da aplicacao
    const {register, handleSubmit, watch, reset /*formState*/} = useForm<NewCycleFormData>({ //exibe as variaveis disponiveis na interface
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        } //validacao
        
        }) //desestruturaçao 
            //register recebe o nome de um input e retorna algunas metodos que sao os metodos que 
            //usamos para trabalhar com input no JS
            //Watch monitora o estado
    function handleCreateNewCycle(data: NewCycleFormData) {
            const id = String(new Date().getTime());

        const newCycle: Cycle = { //deve ter id, task e minutesAmount
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles((state) => [...state, newCycle]) // sempre que uma mudança de estado depender do valor anterior usar arrow function
                                                    //o spread operator ira buscar os ciclos já criados e adicionar o newcycle ao final
        setActiveCycleId(id)

        console.log(data)
        reset();

    }
    /*console.log(formState.errors)*/

    const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)
    console.log(activeCycle)

    const task = watch('task') //variavel task que ta monitorando o estado de task
    const isSubmitDisabled = !task //variável auxiliar para monitorar o estado de task vazio


    return (
        <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}> {/*aqui seria adicionado o handleSubmit*/}
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
            id="task" 
            //name= "task" //o register já poem um nome
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
            min={5} 
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
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

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">{/* desabiltia o countdown somente quando nao estiver nada escrito no setTask */}
            <Play size={24}/> 
            Começar
        </StartCountDownButton>
        </form>
            
        </HomeContainer>
            )
    }