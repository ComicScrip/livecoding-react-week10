import React from 'react';
import { withStudents } from '../data/students';
import LoadingIndicator from './LoadingIndicator';
import ErrorBox from './ErrorBox';

function StudentDetailsPage ({ match: { params: { githubAccountName } }, studentList, loadingStudents, fetchStudentsError }) {
  if (loadingStudents) return <LoadingIndicator />;
  if (fetchStudentsError) return <ErrorBox message={fetchStudentsError} />;

  const student = studentList.find(s => s.githubUserName === githubAccountName);
  if (!student) return <p>Aucun élève avec le compte GH "{githubAccountName}"...</p>;
  const { firstName, lastName, avatarUrl, fullName, githubAccountUrl, p1bisRepoUrl, p1bisPresented } = student;

  return (
    <div>
      <h2>Détails sur un élève</h2>

      <div className='student-card'>
        <a href={githubAccountUrl} target='_blank' rel='noopener noreferrer'>
          <img className='avatar' alt={fullName} src={avatarUrl} />
        </a>
        <br />
        <p>{firstName}</p>
        <p>{lastName.toUpperCase()}</p>
        <a className='p1-repo-link' href={p1bisRepoUrl}>P1bis Repo {p1bisPresented ? '✔' : ''}</a>
      </div>
    </div>
  );
}

export default withStudents(StudentDetailsPage);
