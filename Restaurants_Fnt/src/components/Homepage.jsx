import React from 'react'
import Menu from '../assets/images/Menu'
import Notification from '../assets/images/Notification'
import Wishlist from '../assets/images/Wishlist'
import Search from '../assets/images/Search'

const Homepage = () => {
	return (
		<div>
			<header className='header'>
				<section className='header-main'>
					<Menu classes='header-main-icons' />
					<h1 className='header-main-title'>ThePhantomBistro</h1>
					<div className='header-main-icons-gp'>
						<Wishlist classes='header-main-icons' />
						<Notification classes='header-main-icons' />
					</div>
				</section>

				<section className='header-search_bar'>
					<label
						htmlFor='searchBar'
						className='header-search_bar-label'
					>
						<input
							type='search'
							name='searchbar'
							placeholder='search....'
							className='header-search_bar-label-sspace'
						/>
						<button>
							<Search classes='header-main-icons header-search_bar-label-icon' />
						</button>
					</label>
				</section>
			</header>

			<main>
				<div className='meals-categories'>
					<div>
						<label htmlFor='categories'>categories</label>
						<a href='#'>view all</a>
					</div>
					<section className='categories'></section>
				</div>
			</main>
		</div>
	)
}

export default Homepage
