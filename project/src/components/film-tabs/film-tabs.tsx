import React from 'react';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
import { Film } from '../../types/film';

type FilmTabsProps = {
  film: Film,
}

function FilmTabs(props: FilmTabsProps): JSX.Element {
  const { film } = props;

  return (
    <Tabs>
      <nav className="film-card__nav">
        <TabList className="film-nav__list">
          <Tab
            className="film-nav__link film-nav__item"
            selectedClassName={'film-nav__item--active'}
          >
            Overview
          </Tab>
          <Tab
            className="film-nav__link film-nav__item"
            selectedClassName={'film-nav__item--active'}
          >
            Details
          </Tab>
          <Tab
            className="film-nav__link film-nav__item"
            selectedClassName={'film-nav__item--active'}
          >
            Reviews
          </Tab>
        </TabList>
      </nav>
      <TabPanel>
        <div className="film-rating">
          <div className="film-rating__score">{film.rating}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">Very good</span>
            <span className="film-rating__count">{film.scoresCount} ratings</span>
          </p>
        </div>
        <div className="film-card__text">

          {film.description.map((desc) => <p key={desc.slice(0, 6)}>{desc}</p>)}

          <p className="film-card__director"><strong>Director: {film.director}</strong></p>
          <p className="film-card__starring">
            <strong>
              Starring: {film.starring?.join(', ')} and other
            </strong>
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">Wes Anderson</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                Bill Murray, <br/>
                Edward Norton, <br/>
                Jude Law, <br/>
                Willem Dafoe, <br/>
                Saoirse Ronan, <br/>
                Tony Revoloru, <br/>
                Tilda Swinton, <br/>
                Tom Wilkinson, <br/>
                Owen Wilkinson, <br/>
                Adrien Brody, <br/>
                Ralph Fiennes, <br/>
                Jeff Goldblum
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">1h 39m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">Comedy</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">2014</span>
            </p>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed films in years.
                </p>

                <footer className="review__details">
                  <cite className="review__author">Kate Muir</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,9</div>
            </div>
          </div>
          <div className="film-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                <footer className="review__details">
                  <cite className="review__author">Matthew Lickona</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,2</div>
            </div>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
}

export default FilmTabs;
