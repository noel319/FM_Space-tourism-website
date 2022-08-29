import { type MouseEventHandler, useEffect, useState } from 'react'
import cn from 'classnames'
import utilsStyles from '@/styles/utils.module.css'
import styles from './Destination.module.css'
import Background from '@/components/background'
import DestinationCard from '@/components/destinationCard'
import type { NextPageWithMeta } from '../_app'
import { capitalize } from '@/utils/capitalize'
import useActiveTabMark from '@/hooks/useActiveTabMark'
import useSpacetourismData from '@/hooks/useSpaceTourismData'

type Destiny = 'moon' | 'mars' | 'europa' | 'titan'

type DestinationStates = {
  currentDestiny: Destiny
}

const destinies = ['moon', 'mars', 'europa', 'titan']

const Destination: NextPageWithMeta = () => {
  const [currentDestiny, setCurrentDestiny] =
    useState<DestinationStates['currentDestiny']>('moon')

  const { ActiveBar, updatePosition } = useActiveTabMark('horizontal')

  const {
    dataRef: destinyDataRef,
    dataIndexRef: destinyDataIndexRef,
    getData: getDestinyData,
  } = useSpacetourismData({ type: 'destinations' })

  const handleClickTab: MouseEventHandler<HTMLLIElement> = ({
    currentTarget,
  }) => {
    const tabName = currentTarget.dataset.tabName
    if (!tabName) return

    if (confirmDestinyType(tabName)) {
      const newIndex = destinyDataRef.current.findIndex(
        ({ name }) => name === capitalize(tabName)
      )

      destinyDataIndexRef.current = newIndex !== -1 ? newIndex : 0
      setCurrentDestiny(tabName)
    }
  }

  useEffect(() => {
    updatePosition(currentDestiny, 'horizontal')
  }, [currentDestiny])

  return (
    <>
      <Background
        src={{
          desktop: 'assets/destination/background-destination-desktop.jpg',
          tablet: 'assets/destination/background-destination-tablet.jpg',
          mobile: 'assets/destination/background-destination-mobile.jpg',
        }}
      />
      <div className={cn(styles.container, utilsStyles.pageContainer)}>
        <header
          className={cn(
            utilsStyles.heading5,
            utilsStyles.uppercase,
            utilsStyles.pageHeaderContainer
          )}
        >
          <span className={utilsStyles.pageHeaderIndex}>01</span>Pick your
          destination
        </header>
        <nav className={cn(styles.nav, utilsStyles.uppercase)}>
          <ul>
            <li
              className={currentDestiny === 'moon' ? styles.active : undefined}
              data-tab-name='moon'
              onClick={handleClickTab}
            >
              Moon
            </li>
            <li
              className={currentDestiny === 'mars' ? styles.active : undefined}
              data-tab-name='mars'
              onClick={handleClickTab}
            >
              Mars
            </li>
            <li
              className={
                currentDestiny === 'europa' ? styles.active : undefined
              }
              data-tab-name='europa'
              onClick={handleClickTab}
            >
              Europa
            </li>
            <li
              className={currentDestiny === 'titan' ? styles.active : undefined}
              data-tab-name='titan'
              onClick={handleClickTab}
            >
              Titan
            </li>
            {ActiveBar}
          </ul>
        </nav>
        <DestinationCard
          destinyName={getDestinyData('name')}
          description={getDestinyData('description')}
          avgDistance={getDestinyData('distance')}
          avgTime={getDestinyData('travel')}
          imageAlt={getDestinyData('name')}
          imageSrc={{
            default: getDestinyData('images', 'png'),
            sources: [
              {
                srcSet: getDestinyData('images', 'png'),
                type: 'image/png',
              },
              {
                srcSet: getDestinyData('images', 'webp'),
                type: 'image/webp',
              },
            ],
          }}
        />
      </div>
    </>
  )
}

Destination.title = 'Destination'
Destination.pageName = 'destination'

function confirmDestinyType(destiny: string): destiny is Destiny {
  return destinies.includes(destiny)
}

export default Destination
