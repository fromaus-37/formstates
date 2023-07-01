/* eslint-disable no-unused-vars */
const txtCity = document.querySelector('#txtCity');
const btnSubmit = document.querySelector('#btnSubmit');
const txtWrongAnswer = document.querySelector('#txtWrongAnswer');
const txtLoading = document.querySelector('#txtLoading');

const panelQuiz = document.querySelector('#panelQuiz');
const panelResult = document.querySelector('#panelResult');

const states = {
  noError: 'noError',
  loading: 'loading',
  wrongAnswer: 'wrongAnswer',
  rightAnswer: 'rightAnswer',
};

const submittableStates = {
  submittable: 'submittable',
  notSubmittable: 'notSubmittable',
};

function setSubmittableState(state) {
  switch (state) {
    case submittableStates.submittable:
      btnSubmit.disabled = false;
      break;
    case submittableStates.notSubmittable:
      btnSubmit.disabled = true;
      break;
    default:
      throw new Error(`Submittable state ${state} not understood`);
  }
}

function setState(state) {
  switch (state) {
    case states.noError:
      txtWrongAnswer.classList.add('invisible');
      txtLoading.classList.add('invisible');
      txtCity.disabled = false;
      panelQuiz.classList.remove('invisible');
      panelResult.classList.add('invisible');
      break;
    case states.loading:
      txtWrongAnswer.classList.add('invisible');
      txtLoading.classList.remove('invisible');
      txtCity.disabled = true;
      panelQuiz.classList.remove('invisible');
      panelResult.classList.add('invisible');
      resultTimeout = window.setTimeout(showResult, 5000);
      break;
    case states.wrongAnswer:
      txtWrongAnswer.classList.remove('invisible');
      txtLoading.classList.add('invisible');
      txtCity.disabled = false;
      panelQuiz.classList.remove('invisible');
      panelResult.classList.add('invisible');
      break;
    case states.rightAnswer:
      panelQuiz.classList.add('invisible'); //now we don't care
      //    about state of other controls in this panel
      panelResult.classList.remove('invisible');
      break;
    default:
      throw new Error(`UI state ${state} not understood`);
  }
}

function showResult() {
  window.clearTimeout(resultTimeout);
  if (txtCity.value.trim().toLowerCase() === 'istanbul') {
    setState(states.rightAnswer);
  } else {
    setState(states.wrongAnswer);
    setSubmittableState(submittableStates.submittable);
  }
}

let resultTimeout;
function handleSubmitClick(e) {
  setState(states.loading);
  setSubmittableState(submittableStates.notSubmittable);
}

function handleCityChange(e) {
  txtCity.value.trim();
  if (txtCity.value.trim()) {
    setSubmittableState(submittableStates.submittable);
  } else {
    setSubmittableState(submittableStates.notSubmittable);
  }
}

txtCity.addEventListener('input', handleCityChange);
btnSubmit.addEventListener('click', handleSubmitClick);
