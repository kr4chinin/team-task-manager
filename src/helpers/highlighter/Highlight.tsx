import { FC } from 'react'
import './Highlight.css'

type HighlightProps = {
	filter: string
	str: string
}

const Highlight: FC<HighlightProps> = ({ filter, str }) => {
	if (!filter) return <>str</>

	const regexp = new RegExp(filter, 'ig')
	const matchValue = str.match(regexp)

	if (matchValue) {
		return (
			<>
				{str.split(regexp).map((s: string, index: number, array: string[]) => {
					if (index < array.length - 1) {
						const overlap = matchValue.shift()
						return (
							<span key={index}>
								{s}
								<span className="highlight">{overlap}</span>
							</span>
						)
					}
					return s
				})}
			</>
		)
	}
	return <>str</>
}

export default Highlight
