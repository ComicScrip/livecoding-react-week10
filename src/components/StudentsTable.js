import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sortBy } from 'lodash';

const LinkTd = ({ to, children }) => <td><Link to={to}>{children}</Link></td>;

const StudentsTableRow = ({ firstName, lastName, p1bisPresented, githubUserName }) => {
  const studentDetailsPageLink = '/students/' + githubUserName;
  return (
    <tr key={githubUserName}>
      <LinkTd to={studentDetailsPageLink}>{firstName}</LinkTd>
      <LinkTd to={studentDetailsPageLink}>{lastName.toUpperCase()}</LinkTd>
      <td>{p1bisPresented ? 'Oui' : 'Pas encore'}</td>
    </tr>
  );
};

const SortButton = ({ fieldToSortBy, sortOrder, activeSort, onClick }) => {
  const fieldToSortByWithOrder = fieldToSortBy + ' ' + sortOrder;
  return (
    <span
      className={'sort-button' + (activeSort === fieldToSortByWithOrder ? ' active' : '')}
      onClick={() => { onClick(fieldToSortByWithOrder); }}
    >
      <i className={'fas fa-arrow-' + (sortOrder === 'DESC' ? 'up' : 'down')} />
    </span>
  );
};

function StudentsTable ({students}) {
  const [activeSort, setActiveSort] = useState('');
  const sortStudents = fieldToSortByWithOrder => {
    setActiveSort(activeSort === fieldToSortByWithOrder ? '' : fieldToSortByWithOrder);
  };
  const handleSortButtonClicked = fieldToSortByWithOrder => sortStudents(fieldToSortByWithOrder)
  const [fieldToSortBy, sortOrder] = activeSort.split(' ');

  let sortedStudents = students;
  if (fieldToSortBy) {
    sortedStudents = sortBy(students, fieldToSortBy);
    if (sortOrder === 'DESC') {
      sortedStudents = sortedStudents.reverse();
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Prénom
            <span className='col-sort-buttons-container'>
              <SortButton fieldToSortBy='firstName' sortOrder='ASC' onClick={handleSortButtonClicked} activeSort={activeSort} />
              <SortButton fieldToSortBy='firstName' sortOrder='DESC' onClick={handleSortButtonClicked} activeSort={activeSort} />
            </span>
          </td>
          <td>Nom
            <span className='col-sort-buttons-container'>
              <SortButton fieldToSortBy='lastName' sortOrder='ASC' onClick={handleSortButtonClicked} activeSort={activeSort} />
              <SortButton fieldToSortBy='lastName' sortOrder='DESC' onClick={handleSortButtonClicked} activeSort={activeSort} />
            </span>
          </td>
          <td>P1bis présenté</td>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map(StudentsTableRow)}
      </tbody>
    </table>
  );
}

export default React.memo(StudentsTable, (prev, next) => prev.students === next.students);
