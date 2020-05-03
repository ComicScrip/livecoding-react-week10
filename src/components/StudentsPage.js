import React, {useEffect} from 'react'
import StudentsTable from './StudentsTable';
import { withStudents } from '../data/students';
import LoadingIndicator from './LoadingIndicator';
import ErrorBox from './ErrorBox';
import StudentForm from './StudentForm'

function StudentsPage ({ loadingStudents, studentList, fetchStudentsError, fetchStudentList, createStudent, submittingStudent, submitStudentError }) {
  useEffect(fetchStudentList, []);

  return (
    <div>
      <h2>Liste des étudiants</h2>
      {loadingStudents ? <LoadingIndicator />
        : (fetchStudentsError ? <ErrorBox message={fetchStudentsError} /> : <StudentsTable students={studentList} />)}
      <StudentForm onSubmit={createStudent} submittingStudent={submittingStudent} submitStudentError={submitStudentError} />
    </div>
  );
}

export default withStudents(StudentsPage);
