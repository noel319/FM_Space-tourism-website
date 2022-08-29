import { useState, type MouseEventHandler } from 'react'
import cn from 'classnames'
import styles from './Technology.module.css'
import utilsStyles from '@/styles/utils.module.css'
import { NextPageWithMeta } from '../_app'
import Background from '@/components/background'
import TechnologyCard from '@/components/technologyCard'
import useSpacetourismData from '@/hooks/useSpaceTourismData'

type TechnologyNames = 'Launch vehicle' | 'Spaceport' | 'Space capsule'

type TechnologyStates = {
  currentTechnology: TechnologyNames
}

const technologys = ['Launch vehicle', 'Spaceport', 'Space capsule']

const Technology: NextPageWithMeta = () => {
  const [currentTechnology, setCurrentTechnology] =
    useState<TechnologyStates['currentTechnology']>('Launch vehicle')

  const {
    dataRef: technologyDataRef,
    dataIndexRef: technologyDataIndexRef,
    getData: getTechnologyData,
  } = useSpacetourismData({ type: 'technology' })

  const handleClickTab: MouseEventHandler<HTMLLIElement> = ({
    currentTarget,
  }) => {
    const tabName = currentTarget.dataset.tabName
    if (!tabName) return

    if (confirmTechnologyType(tabName)) {
      const newIndex = technologyDataRef.current.findIndex(
        ({ name }) => name === tabName
      )

      technologyDataIndexRef.current = newIndex !== -1 ? newIndex : 0
      setCurrentTechnology(tabName)
    }
  }

  return (
    <>
      <Background
        src={{
          desktop: 'assets/technology/background-technology-desktop.jpg',
          tablet: 'assets/technology/background-technology-tablet.jpg',
          mobile: 'assets/technology/background-technology-mobile.jpg',
        }}
      />
      <div className={cn(styles.container, utilsStyles.pageContainer)}>
        <header
          className={cn(
            utilsStyles.pageHeaderContainer,
            utilsStyles.heading5,
            utilsStyles.uppercase
          )}
        >
          <span className={utilsStyles.pageHeaderIndex}>03</span>
          Space launch 101
        </header>
        <nav className={styles.nav}>
          <ul>
            <li
              className={
                currentTechnology === 'Launch vehicle'
                  ? styles.active
                  : undefined
              }
              onClick={handleClickTab}
              data-tab-name='Launch vehicle'
            >
              1
            </li>
            <li
              className={
                currentTechnology === 'Spaceport' ? styles.active : undefined
              }
              onClick={handleClickTab}
              data-tab-name='Spaceport'
            >
              2
            </li>
            <li
              className={
                currentTechnology === 'Space capsule'
                  ? styles.active
                  : undefined
              }
              onClick={handleClickTab}
              data-tab-name='Space capsule'
            >
              3
            </li>
          </ul>
        </nav>
        <TechnologyCard
          imageSrc={{
            default: getTechnologyData('images', 'portrait'),
            sources: [
              {
                srcSet: getTechnologyData('images', 'portrait'),
                media: '(min-width: 1440px)',
              },
              {
                srcSet: getTechnologyData('images', 'landscape'),
                media: '(max-width: 1439px)',
              },
            ],
          }}
          imageAlt='Ilustration of stars in circled movement'
          name={currentTechnology}
          description={getTechnologyData('description')}
        />
      </div>
    </>
  )
}

Technology.title = 'Technology'
Technology.pageName = 'technology'

function confirmTechnologyType(name: string): name is TechnologyNames {
  return technologys.includes(name)
}

export default Technology
