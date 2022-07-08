import cl from './Information.module.css'

const Information = () => {
	return (
		<article className={cl.container}>
			<h1 className={cl.title}>About Team Task Manager ⤵️</h1>
			<div className={cl.information}>
				<p>
					<b>Creator</b> - Ilya Kruchinin (<b>🖥 GitHub</b>:{' '}
					<a href="https://github.com/kr4chinin">github.com/kr4chinin</a>)
				</p>
				<br />
				<p>
					Data is stored in the local storage. First <b>10 users</b> and{' '}
					<b>20 tasks</b> for each of them are fetched from{' '}
					<a href="https://jsonplaceholder.typicode.com/">json.placeholder</a>.
				</p>
				<br />
				<p>
					This app allows you to coordinate command work. You can create
					accounts for your team members and give them various tasks. On the
					main screen (where user list is located) you will see how many tasks
					each user has and how many tasks he had yet completed. Number of
					completed tasks has <b>three color variations:</b>
				</p>
				<br />
				<ul>
					<li>
						<span className={cl.red}>Red</span> - user completed less then{' '}
						<b>50%</b> of tasks
					</li>
					<li>
						<span className={cl.yellow}>Yellow</span> - user completed{' '}
						<b>50%-80% </b>of tasks
					</li>
					<li>
						<span className={cl.green}>Green</span> - user completed more than{' '}
						<b>80%</b> of tasks
					</li>
				</ul>
				<br />
				<h4>1️⃣ How to create a new user?</h4>
				<br />
				<p>
					Press <i>"Add user"</i> button on the main screen, generate profile
					picture by clicking the <i>blue box</i> and enter user <b>name</b> and{' '}
					<b>email</b>. Then press <i>"Save"</i> to add a user or{' '}
					<i>"Cancel"</i> to discard the changes and empty the fields.
				</p>
				<br />
				<h4>2️⃣ How to give user a task?</h4>
				<br />
				<p>
					Click on <b>user</b> you want to give a task to and you will see that
					modal window has opened. Press <i>"Open tasks" </i>button and you will
					see that task page has been opened. Here you can add tasks for a user
					by pressing <i>"Add task"</i> button.
				</p>
				<br />
				<h4>3️⃣ Tasks functionality</h4>
				<br />
				<p>
					You can show that task is <b>completed</b> by pressing ✔️ or you can{' '}
					<b>delete</b> a task with ❌ button. You can also <b>edit</b> task by
					changing its title in the modal window which will be opened when you
					click on a task box.
				</p>
				<br />
				<h4>4️⃣ Easier search with filters and selectors</h4>
				<br />
				<p>
					There are <b>two options</b> to sort tasks and users:{' '}
				</p>
				<br />
				<ul>
					<li>
						<b>Search bar</b> - enter a string and you will see that tasks/users
						which don't have this string in the title/name will disappear from
						the page. Moreover, entered string will be{' '}
						<span className={cl.highlighted}>highlighted</span> in remaining
						tasks/users title/name.
					</li>
					<li>
						<b>Selector with sorting options</b> - select an <b>option</b> (e.g.{' '}
						<i>title</i>, <i>completed</i>, <i>name</i> etc.) and elements on
						the page will be sorted in an <b>alphanumeric</b> way.
					</li>
				</ul>
			</div>
		</article>
	)
}

export default Information
