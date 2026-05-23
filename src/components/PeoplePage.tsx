import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTableFix } from './PeopleTableFix';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? '';
  const centuries = searchParams.getAll('centuries').map(Number);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTableFix name={name} sex={sex} century={centuries} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
