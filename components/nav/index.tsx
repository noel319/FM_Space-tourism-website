import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import styles from './nav.module.css'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import useActiveTabMark from '@/hooks/useActiveTabMark'
import { capitalize } from '@/utils/capitalize'

type Tab = 'home' | 'destination' | 'crew' | 'technology'

const tabNames = ['Home', 'Destination', 'Crew', 'Technology']
let currentTab: Tab

function Nav({ tab }: { tab: Tab }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  currentTab = tab

  function handleOpenIconClick() {
    setIsMenuOpen(!isMenuOpen)
  }

  const { ActiveBar, updatePosition } = useActiveTabMark('horizontal')

  useResizeObserver((contentRect) => {
    const isMobileScreen = (contentRect.width ?? contentRect.inlineSize) < 300

    if (isMobileScreen) {
      updatePosition(currentTab, 'vertical')
      setIsMenuOpen(false)
    } else {
      updatePosition(currentTab, 'horizontal')
    }
  }, containerRef)

  useEffect(() => {
    const isVertical = window.innerWidth < 768
    updatePosition(currentTab, isVertical ? 'vertical' : 'horizontal')
  }, [tab, updatePosition])

  return (
    <>
      <div
        className={cn(styles.container, { [styles.open]: isMenuOpen })}
        ref={containerRef}
      >
        <nav className={styles.nav}>
          <ul>
            {tabNames.map((name, index) => {
              const tabName = name.toLowerCase()

              return (
                <li
                  className={tab === tabName ? 'active' : undefined}
                  data-tab-name={tabName}
                  key={index}
                >
                  <Link href={tabName === 'home' ? '/' : `/${tabName}`}>
                    <a className={styles.link}>
                      <span className={styles.index}>0{index}</span>
                      {name}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        {ActiveBar}
      </div>
      <div
        className={cn(styles.openIcon, {
          [styles['openIcon--cross']]: isMenuOpen,
        })}
        onClick={handleOpenIconClick}
      >
        <span />
      </div>
    </>
  )
}

function confirmTabType(name?: string): name is Tab {
  if (typeof name === 'undefined') return false
  if (tabNames.includes(capitalize(name))) return true

  return false
}

export default Nav
export { type Tab, confirmTabType }
