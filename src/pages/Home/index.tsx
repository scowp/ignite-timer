import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmoutInput, Separator, StartCountdownButton, TaskInput } from "./style";

export default function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput list="task-suggestions" type="text" id="task" placeholder="Dê um nome para o seu projeto"/>
                    <datalist id="task-suggestions">
                        <option value="Projeto1"></option>
                        <option value="Projeto2"></option>
                        <option value="Projeto3"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmoutInput  min={5} max={60} step={5} type="number" id="minutesAmount" placeholder="00" />
                    <span>minutos.</span>
                </FormContainer>


                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled type="submit"><Play size={24}/>Começar</StartCountdownButton>
            </form>
        </HomeContainer>
    )
}