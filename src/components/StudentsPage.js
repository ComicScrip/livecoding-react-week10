import React from 'react';
import StudentsTable from './StudentsTable';
import { withStudents } from '../data/students';
import LoadingIndicator from './LoadingIndicator';
import ErrorBox from './ErrorBox';

function StudentsPage ({ loadingStudents, studentList, fetchStudentsError }) {
  return (
    <div>
      <h2>Liste des étudiants</h2>
      {loadingStudents ? <LoadingIndicator />
        : (fetchStudentsError ? <ErrorBox message={fetchStudentsError} /> : <StudentsTable students={studentList} />)}
    </div>
  );
}

export default withStudents(StudentsPage);
