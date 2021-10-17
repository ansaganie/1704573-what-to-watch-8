import React, { useEffect, useState } from 'react';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import { FilmProps } from '../../types/film-props';

function FilmTabs(props: FilmProps): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);
  const { film } = props;

  useEffect(() => setTabIndex(0), [props.film]);

  const onSelect = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      selectedTabClassName={'film-nav__item--active'}
      selectedIndex={tabIndex}
      onSelect={onSelect}
    >
      <nav className="film-card__nav">
        <TabList className="film-nav__list">
          <Tab className=" film-nav__item">
            <span className="film-nav__link">Overview</span>
          </Tab>
          <Tab className="film-nav__item">
            <span className="film-nav__link">Details</span>
          </Tab>
          <Tab className="film-nav__item">
            <span className="film-nav__link">Reviews</span>
          </Tab>
        </TabList>
      </nav>
      <TabPanel>
        <Overview film={film}/>
      </TabPanel>
      <TabPanel>
        <Details film={film}/>
      </TabPanel>
      <TabPanel>
        <Reviews filmId={film.id}/>
      </TabPanel>
    </Tabs>
  );
}

export default FilmTabs;
