import { HandPalm, Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
//import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns"

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
    startDate: Date //com base na data saberemos quanto tempo se passou
    interruptDate?: Date
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]) //sempre iniciar o estado com o mesmo tipo de informacao que sera usado na aplicacao
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //para saber o id do ciclo ativo
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    //const [task, setTask] = useState('') //monitora o estado do input, cada digitacao e armazenado no estado da aplicacao
    const {register, handleSubmit, watch, reset /*formState*/} = useForm<NewCycleFormData>({ //exibe as variaveis disponiveis na interface
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }, //validacao
        
        }) //desestruturaçao 
            //register recebe o nome de um input e retorna algunas metodos que sao os metodos que 
            //usamos para trabalhar com input no JS
            //Watch monitora o estado
            
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    useEffect(() => {
            let interval: number

            if(activeCycle){
               interval = setInterval(()=>{
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate),
                    )
                }, 1000 )
            }

            return() =>{ //funcao que remove o ciclo anteriormente criado
                clearInterval(interval)
                
            }
            
        }, [activeCycle])
    
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

        setCycles(
            cycles.map(cycle=> {
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

    
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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


    console.log(activeCycle)

    const task = watch('task') //variavel task que ta monitorando o estado de task
    const isSubmitDisabled = !task //variável auxiliar para monitorar o estado de task vazio
    console.log(cycles)


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
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}

            {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
       

        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>

        
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