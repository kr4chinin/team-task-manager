import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import Modal from '../modal-template/Modal'
import './WelcomeModal.css'
import { Link } from 'react-router-dom'

interface WelcomeModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

const WelcomeModal: FC<WelcomeModalProps> = ({ isOpen, setIsOpen }) => {
	function handleStopPropagation(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}

	function handleClose() {
		setIsOpen(false)
	}

	return createPortal(
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div
				className={
					isOpen ? 'welcome-modal__content active' : 'welcome-modal__content'
				}
				onClick={handleStopPropagation}
			>
				<div className="welcome__decoration-bar" />
				<div className="welcome__text-container">
					<h1 className="welcome__title">
						Welcome to the Team Task Manager app!
					</h1>
					<p className="welcome__text">
						📚 Read about <b>basic functionality</b> in <i>README</i> file on my{' '}
						<a href="https://github.com/kr4chinin/team-task-manager">GitHub</a>{' '}
						or check the <Link to="/info">Information page</Link>. Hope you will
						enjoy using this application!
					</p>
					<p className="welcome__text">
						💻 <b>Tech stack: </b>Typescript, React, CSS, CSSTransitionGroup
					</p>
				</div>
				<div className="welcome__close-btn-container">
					<p className="welcome__close-btn" onClick={handleClose}>
						❌
					</p>
				</div>
			</div>
		</Modal>,
		document.getElementById('welcome-portal')!
	)
}

export default WelcomeModal
