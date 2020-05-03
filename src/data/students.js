import React, { useState, useEffect } from 'react';
import axios from 'axios';

class Student {
  constructor (props) {
    for (const key in props) {
      this[key] = props[key];
    }
  }

  static async loadAll () {
    return axios.get('http://localhost:3000/students')
      .then(res => res.data)
      .then(students => students.map(s => new Student(s)));
  }

  get githubUserName () {
    const accountUrlParts = this.githubAccountUrl.split('/');
    return accountUrlParts[accountUrlParts.length - 1];
  }

  get avatarUrl () {
    return `https://github.com/${this.githubUserName}.png`;
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const withStudents = WrappedComponent => {
  return (props) => {
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [fetchStudentsError, setFetchStudentsError] = useState(null);
    const fetchStudentList = () => {
      setLoadingStudents(true);
      setFetchStudentsError(null);
      Student.loadAll()
        .then(studentList => {
          setStudentList(studentList);
          setFetchStudentsError(null);
        }).catch(error => {
          console.error(error);
          setFetchStudentsError('Une erreur est survenue lors du chargement de la liste des élèves');
        }).finally(() => setLoadingStudents(false));
    };

    useEffect(fetchStudentList, []);

    return (
      <WrappedComponent {...{ ...{ loadingStudents, studentList, fetchStudentsError }, ...props }} />
    );
  };
};

export default Student;
