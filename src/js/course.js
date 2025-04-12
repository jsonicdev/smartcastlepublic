function initBurgerMenu() {
	const iconMenu = document.querySelector('.menu__icon')
	const hideImg = document.querySelector('.main-section2__carousel-img')
	const menuBody = document.querySelector('.menu__body')
	if (iconMenu) {
		iconMenu.addEventListener('click', () => {
			document.body.classList.toggle('_lock')
			iconMenu.classList.toggle('_active')
			menuBody.classList.toggle('_active')
			hideImg.classList.toggle('img-hide')
		})
	}

	const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick)
		})

		function onMenuLinkClick(e) {
			const menuLink = e.target
			if (
				menuLink.dataset.goto &&
				document.querySelector(menuLink.dataset.goto)
			) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto)
				const gotoBlockValue =
					gotoBlock.getBoundingClientRect().top +
					pageXOffset -
					document.querySelector('header').offsetHeight

				if (iconMenu.classList.contains('_active')) {
					document.body.classList.remove('_lock')
					iconMenu.classList.remove('_active')
					menuBody.classList.remove('_active')
					hideImg.classList.remove('img-hide')
				}
				window.scrollTo({
					top: gotoBlockValue,
					behavior: 'smooth',
				})
				e.preventDefault()
			}
		}
	}
}
const scrollBtn = document.getElementById('scrollToTopBtn')

window.addEventListener('scroll', () => {
	scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none'
})

scrollBtn.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
})

fetch('header.html')
	.then(res => res.text())
	.then(data => {
		document.getElementById('header-placeholder').innerHTML = data
		initBurgerMenu()
	})
	.catch(err => console.error('Ошибка загрузки header:', err))

fetch('footer.html')
	.then(res => res.text())
	.then(data => {
		document.getElementById('footer-placeholder').innerHTML = data
	})
	.catch(err => console.error('Ошибка загрузки footer:', err))
