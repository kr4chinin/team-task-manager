import { ITask, IUser } from "../interfaces"

export const generateUserId = (users: IUser[], showMaxWarning: (isWarning: boolean) => void) => {

    let counter = 0
    for (let i = 11; i < 500; i++) {
        for (let v of users) {
            if (i === v.id) {
                counter = 0
                break
            }
            counter = i
        }
        if (counter) break
    }

    if (counter === 500) {
        showMaxWarning(true)
    }

    return counter
}

export const generateTaskId = (tasks: ITask[]) => {

    let counter = 0
    for (let i = 0; i < 5000; i++) {
        for (let v of tasks) {
            if (i === v.id) {
                counter = 0
                break
            }
            counter = i
        }
        if (counter) break
    }

    return counter
}