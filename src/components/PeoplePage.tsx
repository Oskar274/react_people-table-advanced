import { useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTableFix } from './PeopleTableFix';

export const PeoplePage = () => {
  type Filters = {
    name?: string;
    sex?: string;
    centuries?: number[];
  };
  const [filters, setFilters] = useState<Filters>({});

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters sendFilters={newFilters => setFilters(newFilters)} />
          </div>

          <div className="column">
            <div className="box table-container">
              <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              <p>There are no people matching the current search criteria</p>

              <PeopleTableFix
                name={filters.name}
                sex={filters.sex}
                century={filters.centuries}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
