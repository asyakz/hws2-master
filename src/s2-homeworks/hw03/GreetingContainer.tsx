import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (name: string) => void, addUserCallback: any) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    if (name === undefined || name === '') {
        setError('Error! Name is empty')
    } else {
        setName(name)
        addUserCallback(name)
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    // если имя пустое - показать ошибку
    if (name === undefined || name === '') {
        setError('Error! Need write name!')
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: any) => {
    // если нажата кнопка Enter - добавить
    if (e.key === 'Enter') {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
} : GreetingContainerPropsType) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
        setName('')
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers: number = users.length // need to fix
    const lastUserName: string = users.length === 0 ? '' : users[users.length - 1].name // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
