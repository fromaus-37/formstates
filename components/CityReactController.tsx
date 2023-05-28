import { useState } from 'react';
import { CityReact, uiStates } from './CityReact';

/**
 * This is the Quiz component, implemented
 * as per the idiomatic example in React docs
 * @returns
 */
const CityReactController = () => {
  const [currentUIState, setCurrentUIState] = useState(
    uiStates.unsubmitted_noinput
  );
  function handleSubmit(city: string): void {
    setCurrentUIState(uiStates.loading);

    // if (city.trim().toLowerCase() === 'istanbul') {
    //   setCurrentUIState(uiStates.rightAnswer);
    // } else {
    //   setCurrentUIState(uiStates.wrongAnswer_someinput);
    // }
  }

  function handleCityChange(city: string): void {
    if (city) {
      //if city is non-empty, then
      //the reason we need to change state
      //right now is if it is currently
      //a noInput state
      if (currentUIState === uiStates.unsubmitted_noinput) {
        setCurrentUIState(uiStates.unsubmitted_someinput);
      } else if (currentUIState === uiStates.wrongAnswer_noinput) {
        setCurrentUIState(uiStates.wrongAnswer_someinput);
      } else {
        throw new Error('impossible state transition.');
      }
    } else {
      //the only way state would change
      //is if it is currently a someInput state
      if (currentUIState === uiStates.unsubmitted_someinput) {
        setCurrentUIState(uiStates.unsubmitted_noinput);
      } else if (currentUIState === uiStates.wrongAnswer_someinput) {
        setCurrentUIState(uiStates.wrongAnswer_noinput);
      } else {
        throw new Error('impossible state transition.');
      }
    }
  }

  return (
    <CityReact
      uiState={currentUIState}
      onSubmit={handleSubmit}
      onCityChange={handleCityChange}
    />
  );
};

export default CityReactController;
