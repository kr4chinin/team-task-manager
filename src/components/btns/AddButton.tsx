import { FC } from 'react';
import cl from './styles/AddButton.module.css'

interface AddButtonProps {
    title: string;
}

const AddButton: FC<AddButtonProps> = ({title}) => {
    return (
        <button className={cl['add-btn']}>
            {title}
        </button>
    )
}

export default AddButton