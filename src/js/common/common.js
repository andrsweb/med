'use strict'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { MOBILE_BREAKPOINT } from './global'

document.addEventListener('DOMContentLoaded', () => {
    initUI()
    getYear()
})

const initUI = () => {
    const header = document.querySelector('.header')
    const burgerButton = header?.querySelector('.burger-button')
    const accessibilityButton = document.querySelector('.toggle-accessibility')

    if (header && burgerButton) {
        setupBurgerMenu(header, burgerButton)
        setupSubmenuToggles(header)
        setupResizeHandler(header)
    }

    if (accessibilityButton) {
        setupAccessibilityToggle(accessibilityButton, document.body)
    }
}

const setupBurgerMenu = (header, burgerButton) => {
    const nav = header.querySelector('.header-nav')
    const closeButton = header?.querySelector('.close-menu')

    if (!nav) return

    const options = { reserveScrollBarGap: true }

    const openMenu = () => {
        header.classList.add('menu-opened')
        disableBodyScroll(nav, options)
    }

    const closeMenu = () => {
        header.classList.remove('menu-opened')
        enableBodyScroll(nav)
    }

    const toggleMenu = () => {
        header.classList.contains('menu-opened') ? closeMenu() : openMenu()
    }

    burgerButton.addEventListener('click', toggleMenu)

    nav.addEventListener('click', e => {
        if (e.target === nav) {
            closeMenu()
        }
    })

    closeButton?.addEventListener('click', () => {
        closeMenu()
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            closeMenu()
        }
    })
}

const setupAccessibilityToggle = (button, body) => {
    const STORAGE_KEY = 'accessibility-mode'
    const TEXT_NORMAL = 'Версия для слабовидящих'
    const TEXT_ACCESSIBLE = 'Обычная версия'

    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState === 'true') {
        body.classList.add('accessibility-on')
        button.textContent = TEXT_ACCESSIBLE
    } else {
        button.textContent = TEXT_NORMAL
    }

    button.addEventListener('click', () => {
        const isEnabled = body.classList.toggle('accessibility-on')

        localStorage.setItem(STORAGE_KEY, isEnabled ? 'true' : 'false')

        button.textContent = isEnabled ? TEXT_ACCESSIBLE : TEXT_NORMAL
    })
}

const setupSubmenuToggles = (header) => {
    const submenuLinks = header.querySelectorAll('a[aria-haspopup="true"]')

    submenuLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()

            const parentItem = link.parentElement

            const siblings = Array.from(parentItem.parentElement.children).filter(
                el => el !== parentItem && el.classList.contains('opened')
            )
            siblings.forEach(sib => {
                sib.classList.remove('opened')
                const sibLink = sib.querySelector('a[aria-haspopup="true"]')
                if (sibLink) sibLink.setAttribute('aria-expanded', 'false')
            })

            const isOpened = parentItem.classList.toggle('opened')
            link.setAttribute('aria-expanded', isOpened ? 'true' : 'false')
        })
    })

    document.addEventListener('click', e => {
        if (!header.contains(e.target)) {
            const openedItems = header.querySelectorAll('.opened')
            openedItems.forEach(item => {
                item.classList.remove('opened')
                const link = item.querySelector('a[aria-haspopup="true"]')
                if (link) link.setAttribute('aria-expanded', 'false')
            })
        }
    })
}

const setupResizeHandler = (header) => {
    let wasDesktop = window.innerWidth >= MOBILE_BREAKPOINT

    window.addEventListener('resize', () => {
        const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT

        if (isDesktop && !wasDesktop) {
            const openedItems = header.querySelectorAll('.menu-item.opened')
            openedItems.forEach(item => {
                item.classList.remove('opened')
                const link = item.querySelector('a[aria-haspopup="true"]')
                if (link) {
                    link.setAttribute('aria-expanded', 'false')
                }
            })
        }

        wasDesktop = isDesktop
    })
}

const getYear = () => {
    const yearEl = document.getElementById('year')
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString()
    }
}