import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmoutInput, Separator, StartCountdownButton, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmout: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmout: number
}

export default function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmout: 0
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmout: data.minutesAmout
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)

        console.log(data)
        reset()
    }

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    console.log(activeCycle)

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        list="task-suggestions" 
                        type="text" 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value="Projeto1"></option>
                        <option value="Projeto2"></option>
                        <option value="Projeto3"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmoutInput  
                        min={5} 
                        max={60} 
                        step={5} 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00" 
                        {...register('minutesAmout', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>


                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit"><Play size={24}/>Começar</StartCountdownButton>
            </form>
        </HomeContainer>
    )
}