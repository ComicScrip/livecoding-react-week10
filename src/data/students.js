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

  static async create(attributes) {
    return axios.post('http://localhost:3000/students', attributes)
      .then(res => res.data)
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
    const [submittingStudent, setSubmittingStudent] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [fetchStudentsError, setFetchStudentsError] = useState(null);
    const [submitStudentError, setSubmitStudentError] = useState(null);
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

    const createStudent = (attributes) => {
      setSubmittingStudent(true);
      setSubmitStudentError(false);
      return Student.create(attributes).then(student => {
        setStudentList([...studentList, student].map(s => new Student(s)));
        setSubmitStudentError(null);
      }).catch(({response}) => {
        console.error(response)
        if (response.data && response.data.error) {
          setSubmitStudentError("Erreur : " + response.data.error)
        } else {
          setSubmitStudentError("Un problème est survenu lors de l'enregistrement de l'étudiant")
        }
      }).finally(() => setSubmittingStudent(false))
    }

    useEffect(fetchStudentList, []);

    return (
      <WrappedComponent {...{
        ...{
          loadingStudents,
          studentList,
          fetchStudentsError,
          submittingStudent,
          submitStudentError,
          createStudent
        },
        ...props
      }} />
    );
  };
};

export default Student;
