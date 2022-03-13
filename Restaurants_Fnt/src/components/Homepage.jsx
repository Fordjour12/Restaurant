import React from 'react'
import { Link } from 'react-router-dom'
// swiper js
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination } from 'swiper'
// swiper js end
import Menu from '../assets/images/Menu'
import Notification from '../assets/images/Notification'
import Wishlist from '../assets/images/Wishlist'
import Search from '../assets/images/Search'
import hero from '../assets/images/food.jpg'
import { categories } from '../data/categories'
import { foods } from '../data/foods'

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

			<main className='main'>
				<section className='heroSection'>
					<div className='round'>
						<img
							src={hero}
							alt='hero-img'
							className='heroSection-img'
						/>
					</div>
				</section>

				<section className='meals-categories'>
					<div className='meals-categories-header'>
						<label
							htmlFor='categories'
							className='meals-categories-header-title'
						>
							categories
						</label>
						<Link to='#' className='meals-categories-header-link'>
							view all
						</Link>
					</div>
					<div className='meals-categories-info'>
						<ul className='meals-categories-info-foods'>
							{categories.map((category, idx) => {
								const { img, name } = category

								return (
									<li
										key={idx}
										className='meals-categories-info-foods-list'
									>
										<img
											src={img}
											className='meals-categories-info-foods-img'
											alt={name}
										/>
										<p>{name}</p>
									</li>
								)
							})}
						</ul>
					</div>
				</section>

				<section className='popular'>
					<div className='popular-food'>
						<label htmlFor='foods' className='popular-food-title'>
							Popular Foods
						</label>

						<ul className='popular-food-lists'>
							<Swiper
								loop={true}
								pagination={{ clickable: true }}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								modules={[Pagination, Autoplay]}
								className='mySwiper'
							>
								{foods.map((food, idx) => {
									const { img, name, price } = food
									return (
										<>
											<SwiperSlide>
												<li
													key={idx}
													className='popular-food-lists-list'
												>
													<img
														src={img}
														className='popular-food-lists-list-img'
														alt={name}
													/>
													<p className='popular-food-lists-list-title'>
														{name}
													</p>
													<p className='popular-food-lists-list-price'>
														{price}
													</p>
												</li>
											</SwiperSlide>
										</>
									)
								})}
							</Swiper>
						</ul>
					</div>
					<div className='popular-drinks'>
						<label htmlFor='Drinks'>Popular Drinks</label>
						{/* <>
							<Swiper
								spaceBetween={30}
								centeredSlides={true}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								pagination={{
									clickable: true,
								}}
								navigation={true}
								modules={[Autoplay, Pagination, Navigation]}
								className='mySwiper'
							>
								<SwiperSlide>Slide 1</SwiperSlide>
								<SwiperSlide>Slide 2</SwiperSlide>
								<SwiperSlide>Slide 3</SwiperSlide>
								<SwiperSlide>Slide 4</SwiperSlide>
								<SwiperSlide>Slide 5</SwiperSlide>
								<SwiperSlide>Slide 6</SwiperSlide>
								<SwiperSlide>Slide 7</SwiperSlide>
								<SwiperSlide>Slide 8</SwiperSlide>
								<SwiperSlide>Slide 9</SwiperSlide>
							</Swiper>
						</> */}
					</div>
					<div className='popular-pizza'>
						<label htmlFor='Pizza'>Popular Pizza</label>
					</div>
					<div className='popular-meat'>
						<label htmlFor='Meat'>Popular Meat</label>
					</div>
					<div className='popular-soup'>
						<label htmlFor='Soup'>Popular Soups</label>
					</div>
				</section>
			</main>
			<footer></footer>
		</div>
	)
}

export default Homepage
