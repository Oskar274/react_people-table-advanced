import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';

type Props = {
  name?: string;
  sex?: string;
  century?: number[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTableFix = (props: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .finally(() => setLoading(false));
  }, []);

  function renderPeople(
    peoplelist: Person[],
    query: string,
    sex = '',
    centuries: number[] = [],
  ) {
    let result = peoplelist;

    if (query) {
      result = result.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
      if (sex === 'none') {
        result = peoplelist;
      }
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    return result;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <Loader />
        ) : (
          renderPeople(
            people,
            props.name ?? '',
            props.sex ?? '',
            props.century ?? [],
          ).map(person => (
            <tr data-cy="person" key={person.slug}>
              <td>
                <a
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  href={`#/people/${person.slug}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <a
                    className="has-text-danger"
                    href={`#/people/${person.mother.slug}`}
                  >
                    {person.mother.name}
                  </a>
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>

              <td>
                {person.father ? (
                  <a href={`#/people/${person.father.slug}`}>
                    {person.father.name}
                  </a>
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
