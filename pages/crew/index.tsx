import { type MouseEventHandler, useState } from 'react'
import cn from 'classnames'
import styles from './Crew.module.css'
import utilsStyles from '@/styles/utils.module.css'
import type { NextPageWithMeta } from '../_app'
import Background from '@/components/background'
import CrewCard from '@/components/crewCard'
import useSpacetourismData from '@/hooks/useSpaceTourismData'

type Crewmate =
  | 'Douglas Hurley'
  | 'Mark Shuttleworth'
  | 'Victor Glover'
  | 'Anousheh Ansari'

type CrewStates = {
  currentCrewmate: Crewmate
}

const crewmates = [
  'Douglas Hurley',
  'Mark Shuttleworth',
  'Victor Glover',
  'Anousheh Ansari',
]

const Crew: NextPageWithMeta = () => {
  const [currentCrewmate, setCurrentCrewmate] =
    useState<CrewStates['currentCrewmate']>('Douglas Hurley')

  const {
    dataRef: crewDataRef,
    dataIndexRef: crewDataIndexRef,
    getData: getCrewData,
  } = useSpacetourismData({ type: 'crew' })

  const handleClickTab: MouseEventHandler<HTMLLIElement> = ({
    currentTarget,
  }) => {
    const tabName = currentTarget.dataset.tabName
    if (!tabName) return

    if (confirmCrewmateType(tabName)) {
      const newIndex = crewDataRef.current.findIndex(
        ({ name }) => name === tabName
      )

      crewDataIndexRef.current = newIndex !== -1 ? newIndex : 0
      setCurrentCrewmate(tabName)
    }
  }

  return (
    <>
      <Background
        src={{
          desktop: '/assets/crew/background-crew-desktop.jpg',
          tablet: '/assets/crew/background-crew-tablet.jpg',
          mobile: '/assets/crew/background-crew-mobile.jpg',
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
          <span className={utilsStyles.pageHeaderIndex}>02</span>Meet your crew
        </header>
        <nav className={styles.nav}>
          <ul>
            <li
              className={
                currentCrewmate === 'Douglas Hurley' ? styles.active : undefined
              }
              data-tab-name='Douglas Hurley'
              onClick={handleClickTab}
            />
            <li
              className={
                currentCrewmate === 'Mark Shuttleworth'
                  ? styles.active
                  : undefined
              }
              data-tab-name='Mark Shuttleworth'
              onClick={handleClickTab}
            />
            <li
              className={
                currentCrewmate === 'Victor Glover' ? styles.active : undefined
              }
              data-tab-name='Victor Glover'
              onClick={handleClickTab}
            />
            <li
              className={
                currentCrewmate === 'Anousheh Ansari'
                  ? styles.active
                  : undefined
              }
              data-tab-name='Anousheh Ansari'
              onClick={handleClickTab}
            />
          </ul>
        </nav>
        <CrewCard
          imageSrc={{
            default: getCrewData('images', 'png'),
            sources: [
              {
                srcSet: getCrewData('images', 'png'),
              },
              {
                srcSet: getCrewData('images', 'webp'),
              },
            ],
          }}
          crewmateName={currentCrewmate}
          crewmateRole={getCrewData('role')}
          bio={getCrewData('bio')}
        />
      </div>
    </>
  )
}

Crew.title = 'Crew'
Crew.pageName = 'crew'

function confirmCrewmateType(crewmate: string): crewmate is Crewmate {
  return crewmates.includes(crewmate)
}

export default Crew
