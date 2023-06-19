//STRAIGHT OFF THE BAT, from the first draft
//given here:
//https://react.dev/learn/reacting-to-input-with-state#step-1-identify-your-components-different-visual-states
//of a proper React comoponent that implements
//two of the states, I can see that one great
//advantage of passing UI state of the component
//via a prop would be that in Storybook, designers,
//developers and testers would be able to play around
//with a component to see how it looks in each state
//
//INDEED VERY SOUND ADVICE GIVEN that you should
//be able to visually test a comopnent in each of its
//states and that is _almost_ what I have done
//in writin setUIState; all I needed to do was
//to call setUIState with different values while
//developing and seeing how the result looked
//in a browser (open under `npm run dev`) for each
//state. The natural way to do it would be to set
//a uiState prop on the component as they say
//(just after the first code snippet) at the link.
//
//INSTEAD I just coded it all and ran (manual) end to
//end tests on the component instead. This shows
//to me the beauty of Storybook: not only is it
//documenting your components thoroughly for all
//converned, you can not only test a component
//in end to end scenarios as I did manually (although it
//might not be typical in component-unit-testing with RTL,
//end-to-end testing of individual components in
//mini scenarios is certainly something you wold
//like to do manually during development and then again
//in a pull request), you can also see each individual
//state of a complex component in isolation as
//I DID NOT DO BUT SHOULD HAVE DURING DEVELOPMENT.
//
//REASON WHY USING A PROP FOR UISTATE IS MOST NATURAL
//isn't just that it allows us to easy control
//the state during manual testing and/or in Storybook.
//More fundamentally, code to update visual state of a
//component must be written before render (and not
//in useEffect, as I learnt in previous non-idiomatic
//iteration of this component) i.e. in function
//component's function body, NOT in event handlers
//or hooks that run after render has happened.
//Therefore where could the component keep descriptor
//of its current or next UI state? In props or
//(React) state (or context? although I don't know
//what that is). Of the two, using a prop is simpler
//and makes the component stateless
//(AT LEAST TO BEGIN WITH).

import styles from './CityReact.module.scss';
import { clsx } from 'clsx';
import { useState, useId } from 'react';

export enum uiStates {
  unsubmitted_noinput = 'noinput',
  unsubmitted_someinput = 'someinput',
  loading = 'loading',
  wrongAnswer_noinput = 'wrongAnswer_noinput',
  wrongAnswer_someinput = 'wrongAnswer_someinput',
  rightAnswer = 'rightAnswer',
}

interface CityReactProps {
  /**
   * The state of the component
   */
  uiState: uiStates;

  /**
   * City that the user has entered as answer to the quiz question
   */
  city?: string;

  /**
   * This event is raised when the user clicks Submit button to
   * submit their answer
   * @param city - The city that the user has typed. This is the
   * user's response to the quiz question.
   * @returns
   */
  onSubmit?: (city: string) => void;

  /**
   * This event is raised when value of city is changed by the user
   * @param city - New value for city enterd by the user
   * @returns
   */
  onCityChange?: (city: string) => void;
}

/**
 * This is the City component implements as suggested
 * React documentation
 */
export const CityReact = ({
  uiState,
  city = '',
  onSubmit,
  onCityChange,
}: CityReactProps) => {
  const [cityTextBoxVal, setCityTextBoxVal] = useState(city);
  const cityId = useId();
  return (
    <>
      <section
        className={clsx(uiState === uiStates.rightAnswer && styles.invisible)}
      >
        <h1>City quiz</h1>
        <label htmlFor={cityId}>
          Which city is located between two continents?
        </label>
        <div>
          <textarea
            id={cityId}
            onChange={(e) => {
              setCityTextBoxVal(e.currentTarget.value);
              if (onCityChange) {
                onCityChange(e.currentTarget.value);
              }
            }}
            cols={20}
            rows={2}
            disabled={uiState === uiStates.loading}
          >
            {cityTextBoxVal}
          </textarea>
        </div>
        <button
          onClick={(e) => {
            if (onSubmit) {
              onSubmit(cityTextBoxVal);
            }
          }}
          disabled={
            ![
              uiStates.unsubmitted_someinput,
              uiStates.wrongAnswer_someinput,
            ].includes(uiState)
          }
        >
          Submit
        </button>
        <p
          className={clsx(
            uiState !== uiStates.wrongAnswer_noinput &&
              uiState !== uiStates.wrongAnswer_someinput &&
              styles.invisible,
            styles.panelQuiz__wrongAnswer
          )}
        >
          Good guess but a wrong answer. Try again!
        </p>
        <p className={clsx(uiState !== uiStates.loading && styles.invisible)}>
          Loading...
        </p>
      </section>
      <section
        className={clsx(uiState !== uiStates.rightAnswer && styles.invisible)}
      >
        <h1>That&nbsp;s right!</h1>
      </section>
    </>
  );
};
