import { Alert, Container, Spinner } from 'react-bootstrap'

import { FETCH_STATUS } from '../app/fetchConfig'
import Header from './Header'
import Main from './Main'
import RepoInfo from '../features/board/components/RepoInfo'
import { boardStateSelectors } from '../features/board/boardSlice'
import { useAppSelector } from '../app/hooks'

const Layout = () => {
	const repoInfo = useAppSelector(boardStateSelectors.repoInfo)
	const status = useAppSelector(boardStateSelectors.status)
	const error = useAppSelector(boardStateSelectors.error)

	const isBoard = status === FETCH_STATUS.IDLE || status === FETCH_STATUS.SUCCEEDED

	return (
		<>
			{status === FETCH_STATUS.LOADING && (
				<div className='position-absolute top-0 start-0 z-3 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center'>
					<Spinner animation='border' role='status' variant='primary'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			)}

			<Container className='p-3' fluid={'xxl'}>
				<Header />
				{isBoard && (
					<>
						<RepoInfo repoInfo={repoInfo} />
						<Main />
					</>
				)}
				{status === FETCH_STATUS.FAILED && <Alert variant='danger'>{error}</Alert>}
			</Container>
		</>
	)
}

export default Layout