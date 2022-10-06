import Toastify from 'toastify-js';
import { useConfirm } from './provider/Confirm.js';
import axios from 'axios';
import queryString from 'query-string';

const PREFIX = 'http://192.168.1.6:3000/api/v1';
//const PREFIX = "https://api-dev.clevertech.edu.vn/api/v1";
const SCHOOLS_URL = PREFIX + '/schools';
const CLASSES_URL = PREFIX + '/classes';
const CLASS_GROUPS_URL = PREFIX + '/class_groups';
const SUBJECTS_URL = PREFIX + '/subjects';
const SUBJECT_GROUPS_URL = PREFIX + '/subject_groups';
const LABS_URL = PREFIX + '/labs';
const ADMINS_URL = PREFIX + '/admins';
const TEACHERS_URL = PREFIX + '/teachers';
const PUPILS_URL = PREFIX + '/students';
const LOGIN_URL = PREFIX + '/login';
const USERS_URL = PREFIX + '/users';
const UPLOAD_URL = PREFIX + '/upload';

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const doGet = async (route, headers, params) => {
  try {
    return (
      await axios({
        method: 'GET',
        url: route,
        params,
        paramsSerializer(_params) {
          return queryString.stringify(_params, {
            skipNull: true,
            skipEmptyString: true,
          });
        },
        headers: {
          ...defaultHeaders,
          ...headers,
          Authorization: window.localStorage.getItem('token'),
        },
      })
    ).data.data;
  } catch (e) {
    throw e;
  }
};

const doGetOne = async (route, headers) => {
  try {
    return (
      await axios({
        method: 'GET',
        url: route,
        headers: {
          ...defaultHeaders,
          ...headers,
          Authorization: window.localStorage.getItem('token'),
        },
      })
    ).data.data;
  } catch (e) {
    throw e;
  }
};

const doDelete = async (route, headers) => {
  try {
    return (
      await axios({
        method: 'DELETE',
        url: route,
        headers: {
          ...defaultHeaders,
          ...headers,
          Authorization: window.localStorage.getItem('token'),
        },
      })
    ).data;
  } catch (e) {
    throw e;
  }
};
const doPost = async (route, headers, payload) => {
  try {
    return (
      await axios({
        method: 'POST',
        url: route,
        headers: {
          ...defaultHeaders,
          ...headers,
          Authorization: window.localStorage.getItem('token'),
        },
        data: payload,
      })
    ).data;
  } catch (e) {
    throw e;
  }
};

const doPut = async (route, headers, payload) => {
  try {
    return (
      await axios({
        method: 'PUT',
        url: route,
        headers: {
          ...defaultHeaders,
          ...headers,
          Authorization: window.localStorage.getItem('token'),
        },
        data: payload,
      })
    ).data;
  } catch (e) {
    throw e;
  }
};
function showMessage(msg, severity, duration) {
  let t = Toastify({
    text: msg,
    duration: duration || 5000,
    close: false,
    gravity: 'bottom',
    position: 'left',
    stopOnFocus: true,
    className: severity || 'info',
    onClick: function() {
      t.hideToast();
    },
  });
  t.showToast();
}

export const apiShowMessage = showMessage;

export const apiGetSchools = async () => {
  try {
    const results = await doGet(SCHOOLS_URL, null);
    showMessage('Get Schools succeeded', 'success', 1000);
    return results;
  } catch (e) {
    showMessage(`Get schools error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const apiDeleteSchool = async idSchool => {
  try {
    const results = await doDelete(`${SCHOOLS_URL}/${idSchool}`, null);
    return results;
  } catch (e) {
    showMessage(
      `Delete school error: ${e.response.data || e.message}`,
      'error'
    );
  }
  return false;
};
export const useConfirmDeleteSchool = () => {
  const confirm = useConfirm();
  return async idSchool => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteSchool(idSchool);
    } catch (e) {
      return false;
    }
  };
};
export const apiNewSchool = async school => {
  try {
    const result = await doPost(SCHOOLS_URL, null, school);
    showMessage('Success create new school', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new school: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditSchool = async (idSchool, school) => {
  try {
    const result = await doPut(`${SCHOOLS_URL}/${idSchool}`, null, school);
    showMessage('Success edit school ' + idSchool, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit school: ${e.response.data || e.message}`, 'error');
  }
};

export const apiGetClassGroups = async () => {
  try {
    const results = await doGet(CLASS_GROUPS_URL, null);
    return results;
  } catch (e) {
    showMessage(
      `Error getting class groups: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiGetClasses = async params => {
  try {
    const results = await doGet(CLASSES_URL, null, params);
    // showMessage("Success in get classes for school " + idSchool, 'success', 1000);
    return results;
  } catch (e) {
    showMessage(
      `Error getting classes of school ${params.school_id}: ${e.response.data ||
        e.message}`,
      'error'
    );
  }
};

export const apiNewClass = async klass => {
  try {
    const result = await doPost(CLASSES_URL, null, klass);
    showMessage('Success create new class', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new class: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditClass = async (idClass, klass) => {
  try {
    const result = await doPut(`${CLASSES_URL}/${idClass}`, null, klass);
    showMessage('Success edit class ' + idClass, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit class: ${e.response.data || e.message}`, 'error');
  }
};
export const apiDeleteClass = async idClass => {
  try {
    const results = await doDelete(`${CLASSES_URL}/${idClass}`, null);
    return results;
  } catch (e) {
    showMessage(`Delete class error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const useConfirmDeleteClass = () => {
  const confirm = useConfirm();
  return async idClass => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteClass(idClass);
    } catch (e) {
      return false;
    }
  };
};

// ADMIN APIS
export const apiGetAdmins = async params => {
  try {
    const results = await doGet(ADMINS_URL, null, params);
    showMessage('Get Admins succeeded', 'success', 1000);
    return results;
  } catch (e) {
    showMessage(`Get schools error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const apiDeleteAdmin = async idAdmin => {
  try {
    const results = await doDelete(`${ADMINS_URL}/${idAdmin}`, null);
    return results;
  } catch (e) {
    showMessage(
      `Delete school error: ${e.response.data || e.message}`,
      'error'
    );
  }
  return false;
};
export const useConfirmDeleteAdmin = () => {
  const confirm = useConfirm();
  return async idAdmin => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteAdmin(idAdmin);
    } catch (e) {
      return false;
    }
  };
};
export const apiNewAdmin = async school => {
  try {
    const result = await doPost(ADMINS_URL, null, school);
    showMessage('Success create new school', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new school: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditAdmin = async (idAdmin, school) => {
  try {
    const result = await doPut(`${ADMINS_URL}/${idAdmin}`, null, school);
    showMessage('Success edit school ' + idAdmin, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit school: ${e.response.data || e.message}`, 'error');
  }
};

// TEACHERS API
export const apiGetTeachers = async params => {
  try {
    const results = await doGet(TEACHERS_URL, null, params);
    showMessage('Get Teachers succeeded', 'success', 1000);
    return results;
  } catch (e) {
    showMessage(`Get schools error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const apiDeleteTeacher = async idTeacher => {
  try {
    const results = await doDelete(`${TEACHERS_URL}/${idTeacher}`, null);
    return results;
  } catch (e) {
    showMessage(
      `Delete school error: ${e.response.data || e.message}`,
      'error'
    );
  }
  return false;
};
export const useConfirmDeleteTeacher = () => {
  const confirm = useConfirm();
  return async idTeacher => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteTeacher(idTeacher);
    } catch (e) {
      return false;
    }
  };
};
export const apiNewTeacher = async school => {
  try {
    const result = await doPost(TEACHERS_URL, null, school);
    showMessage('Success create new school', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new school: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditTeacher = async (idTeacher, school) => {
  try {
    const result = await doPut(`${TEACHERS_URL}/${idTeacher}`, null, school);
    showMessage('Success edit school ' + idTeacher, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit school: ${e.response.data || e.message}`, 'error');
  }
};

// PUPILS API
export const apiGetPupils = async params => {
  try {
    const results = await doGet(PUPILS_URL, null, params);
    showMessage('Get Pupils succeeded', 'success', 1000);
    return results;
  } catch (e) {
    showMessage(`Get pupils error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const apiDeletePupil = async idPupil => {
  try {
    const results = await doDelete(`${PUPILS_URL}/${idPupil}`, null);
    return results;
  } catch (e) {
    showMessage(`Delete pupil error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const useConfirmDeletePupil = () => {
  const confirm = useConfirm();
  return async idPupil => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeletePupil(idPupil);
    } catch (e) {
      return false;
    }
  };
};
export const apiNewPupil = async pupil => {
  try {
    const result = await doPost(PUPILS_URL, null, pupil);
    showMessage('Success create new pupil', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new pupil: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditPupil = async (idPupil, pupil) => {
  try {
    const result = await doPut(`${PUPILS_URL}/${idPupil}`, null, pupil);
    showMessage('Success edit pupil ' + idPupil, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit pupil: ${e.response.data || e.message}`, 'error');
  }
};

// SUBJECTS API
export const apiGetSubjectGroups = async params => {
  try {
    const results = await doGet(SUBJECT_GROUPS_URL, null, params);
    return results;
  } catch (e) {
    showMessage(
      `Error getting subject groups: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiGetSubjects = async params => {
  try {
    const results = await doGet(SUBJECTS_URL, null, params);
    // showMessage("Success in get subjects for school " + idSchool, 'success', 1000);
    return results;
  } catch (e) {
    showMessage(
      `Error getting subjects of school ${params.school_id}: ${e.response
        .data || e.message}`,
      'error'
    );
  }
};

export const apiNewSubject = async subject => {
  try {
    const result = await doPost(SUBJECTS_URL, null, subject);
    showMessage('Success create new subject', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new subject: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditSubject = async (idSubject, subject) => {
  try {
    const result = await doPut(`${SUBJECTS_URL}/${idSubject}`, null, subject);
    showMessage('Success edit subject ' + idSubject, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit subject: ${e.response.data || e.message}`, 'error');
  }
};
export const apiDeleteSubject = async idSubject => {
  try {
    const results = await doDelete(`${SUBJECTS_URL}/${idSubject}`, null);
    return results;
  } catch (e) {
    showMessage(
      `Delete subject error: ${e.response.data || e.message}`,
      'error'
    );
  }
  return false;
};
export const useConfirmDeleteSubject = () => {
  const confirm = useConfirm();
  return async idSubject => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteSubject(idSubject);
    } catch (e) {
      return false;
    }
  };
};
// LABS API
export const apiGetLabs = async params => {
  try {
    const results = await doGet(LABS_URL, null, params);
    showMessage('Success in get labs', 'success', 1000);
    return results;
  } catch (e) {
    showMessage(`Error getting labs: ${e.response.data || e.message}`, 'error');
  }
};

export const apiNewLab = async lab => {
  try {
    const result = await doPost(LABS_URL, null, lab);
    showMessage('Success create new lab', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error creating new lab: ${e.response.data || e.message}`,
      'error'
    );
  }
};
export const apiEditLab = async (idLab, lab) => {
  try {
    const result = await doPut(`${LABS_URL}/${idLab}`, null, lab);
    showMessage('Success edit lab ' + idLab, 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error edit lab: ${e.response.data || e.message}`, 'error');
  }
};
export const apiDeleteLab = async idLab => {
  try {
    const results = await doDelete(`${LABS_URL}/${idLab}`, null);
    return results;
  } catch (e) {
    showMessage(`Delete lab error: ${e.response.data || e.message}`, 'error');
  }
  return false;
};
export const useConfirmDeleteLab = () => {
  const confirm = useConfirm();
  return async idLab => {
    try {
      await confirm({ description: 'Are you sure?' });
      return apiDeleteLab(idLab);
    } catch (e) {
      return false;
    }
  };
};
export const apiLogin = async (username, password) => {
  try {
    const result = await doPost(LOGIN_URL, null, { username, password });
    showMessage('Success login', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(`Error login: ${e.response.data || e.message}`, 'error');
  }
  return false;
};

export const apiGetUserInfo = async () => {
  try {
    const result = await doGetOne(`${USERS_URL}/my-info`, null);
    showMessage('Success in get user info', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error getting user info: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiUpdateUser = async payload => {
  try {
    const result = await doPut(`${USERS_URL}/${payload.id}`, null, payload);
    showMessage('Success in update user', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error updating user: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiResetPassword = async payload => {
  try {
    const result = await doPost(`${USERS_URL}/reset-password`, null, payload);
    showMessage('Success in update user', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error updating user: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const uploadImage = async file => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const result = await doPost(`${UPLOAD_URL}/image`, null, formData);
    showMessage('Success in upload image', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error uploading image: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiUploadLab = async (file, data) => {
  const formData = new FormData();
  formData.append('file', file);
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  try {
    const result = await doPost(`${LABS_URL}/upload`, null, formData);
    showMessage('Success in upload image', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error uploading lab asset: ${e.response.data || e.message}`,
      'error'
    );
  }
};

export const apiImportXlsx = async (file, data, type) => {
  const formData = new FormData();
  formData.append('file', file);
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  let url;
  if (type === 'student') {
    url = `${PUPILS_URL}/import`;
  } else if (type === 'teacher') {
    url = `${TEACHERS_URL}/import`;
  } else {
    return false;
  }
  try {
    const result = await doPost(url, null, formData);
    showMessage('Success in import students', 'success', 1000);
    return result;
  } catch (e) {
    showMessage(
      `Error importing students: ${e.response.data || e.message}`,
      'error'
    );
  }
};

// const doDownload = async (route, headers, payload) => {
//   try {
//     return (
//       await axios({
//         method: 'POST',
//         url: route,
//         headers: {
//           ...defaultHeaders,
//           ...headers,
//           Authorization: window.localStorage.getItem('token'),
//         },
//         data: payload,
//         responseType: 'blob',
//       })
//     ).data;
//   } catch (e) {
//     throw e;
//   }
// };

// export const apiExportXlsx = async (type, payload) => {
//   let url;
//   if (type === 'student') {
//     url = `${PUPILS_URL}/export`;
//   } else if (type === 'teacher') {
//     url = `${TEACHERS_URL}/export`;
//   } else {
//     return false;
//   }
//   try {
//     const result = await doDownload(url, null, payload);
//     if (result) {
//       let url = window.URL.createObjectURL(result);
//       let link = document.createElement('a');
//       link.href = url;
//       link.download = `${type}.xlsx`;
//       link.click();
//       showMessage('Success in export students', 'success', 1000);
//     }
//     return result;
//   } catch (e) {
//     showMessage(
//       `Error exporting students: ${e.response?.data || e.message}`,
//       'error'
//     );
//   }
// };
