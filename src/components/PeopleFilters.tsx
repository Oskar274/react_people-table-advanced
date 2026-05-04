/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { useState } from 'react';

type PeopleFilterProps = {
  sendFilters: (newFilters: {
    name?: string;
    sex?: string;
    centuries?: number[];
  }) => void;
};

export const PeopleFilters = (props: PeopleFilterProps) => {
  const [sex, setSex] = useState('');
  const [name, setName] = useState('');
  const [centuries, setCenturies] = useState<number[]>([]);

  const handleResetFilters = () => {
    setSex('');
    setName('');
    setCenturies([]);
    props.sendFilters({ name: '', sex: '', centuries: [] });
  };

  const handleCenturyClick = (centuriesList: number[], century: number) => {
    let newCenturies: number[];

    if (century === 0) {
      newCenturies = [];
    } else if (centuriesList.includes(century)) {
      newCenturies = centuriesList.filter(c => c !== century);
    } else {
      newCenturies = [...centuriesList, century];
    }

    setCenturies(newCenturies);
    props.sendFilters({ name, sex, centuries: newCenturies });
  };

  const handleSexChange = (newSex: string) => {
    setSex(newSex);
    props.sendFilters({ name, sex: newSex, centuries });
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    props.sendFilters({ name: newName, sex, centuries });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className="is-active"
          href="#/people"
          onClick={() => handleSexChange('none')}
        >
          All
        </a>
        <a
          className=""
          href="#/people?sex=m"
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className=""
          href="#/people?sex=f"
          onClick={() => handleSexChange('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={name || ''}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(16),
              })}
              href="#/people?centuries=16"
              onClick={() => handleCenturyClick(centuries || [], 16)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(17),
              })}
              href="#/people?centuries=17"
              onClick={() => handleCenturyClick(centuries || [], 17)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(18),
              })}
              href="#/people?centuries=18"
              onClick={() => handleCenturyClick(centuries || [], 18)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(19),
              })}
              href="#/people?centuries=19"
              onClick={() => handleCenturyClick(centuries || [], 19)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(20),
              })}
              href="#/people?centuries=20"
              onClick={() => handleCenturyClick(centuries || [], 20)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={() => handleCenturyClick(centuries || [], 0)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
