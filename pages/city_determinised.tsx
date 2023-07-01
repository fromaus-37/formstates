/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styles from './city.module.scss';
import { useRef, useEffect, useId } from 'react';
import { clsx } from 'clsx';

//in previous react version (with an NFA, basically two
//sets of states such taht the UI eould be in exactly
//one state from each of the two sets)

enum uiStates {
  noinput = 'noinput',
  someinput = 'someinput',
  loading = 'loading',
  wrongAnswer_noinput = 'wrongAnswer_noinput',
  wrongAnswer_someinput = 'wrongAnswer_someinput',
  rightAnswer = 'rightAnswer',
}

export const testIds = {
  loading: 'loading',
  rightAnswer: 'rightAnswer',
  wrongAnswer: 'wrongAnswer',
};

/**
 * This is the React version of the plain JS
 * Quiz component. However it is not idiomatic
 * as per the guidance in React documentation.
 * Instead, I have mainly translated the plain
 * JS+HTML logic into React by using refs
 * (which I definitely do not recommend doing
 * in production code).
 *
 * Also, I use a DFA instead of the NFA
 * that the plain JS+HTML version used.
 * @returns
 */
const CityDeterminised = () => {
  const txtCity = useRef<HTMLTextAreaElement>(null);
  const btnSubmit = useRef<HTMLButtonElement>(null);
  const txtWrongAnswer = useRef<HTMLParagraphElement>(null);
  const txtLoading = useRef<HTMLParagraphElement>(null);
  const panelQuiz = useRef<HTMLDivElement>(null);
  const panelResult = useRef<HTMLDivElement>(null);

  //set the initial state (set at time of first and only render
  //of this component)
  const refCurrentUIState = useRef<uiStates>(uiStates.noinput);

  const setUIState = () => {
    switch (refCurrentUIState.current) {
      case uiStates.noinput:
        btnSubmit.current!.disabled = true; //
        txtWrongAnswer.current!.classList.add(styles.invisible); //
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false; //
        panelQuiz.current!.classList.remove(styles.invisible); //
        panelResult.current!.classList.add(styles.invisible); //
        break;
      case uiStates.someinput:
        btnSubmit.current!.disabled = false;
        txtWrongAnswer.current!.classList.add(styles.invisible);
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        break;
      case uiStates.loading:
        btnSubmit.current!.disabled = true;
        txtWrongAnswer.current!.classList.add(styles.invisible);
        txtLoading.current!.classList.remove(styles.invisible);
        txtCity.current!.disabled = true;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        resultTimeout = window.setTimeout(showResult, 5000);
        break;
      case uiStates.wrongAnswer_noinput:
        btnSubmit.current!.disabled = true;
        txtWrongAnswer.current!.classList.remove(styles.invisible);
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        break;
      case uiStates.wrongAnswer_someinput:
        btnSubmit.current!.disabled = false;
        txtWrongAnswer.current!.classList.remove(styles.invisible);
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        break;
      case uiStates.rightAnswer:
        panelQuiz.current!.classList.add(styles.invisible); //now we don't care
        //    about state of other controls in this panel
        // as it's the final state
        panelResult.current!.classList.remove(styles.invisible);
        break;
    }
  };

  let resultTimeout: number | undefined;

  function showResult() {
    window.clearTimeout(resultTimeout);
    if (txtCity.current!.value.trim().toLowerCase() === 'istanbul') {
      refCurrentUIState.current = uiStates.rightAnswer;
      setUIState();
    } else {
      refCurrentUIState.current = uiStates.wrongAnswer_someinput;
      setUIState();
    }
  }

  const handleCityChange = () => {
    txtCity.current!.value.trim();
    if (txtCity.current!.value.trim()) {
      //we are in someinput state but
      //there are two so we have to choose which one
      //However, based on the DFA I drew, we could
      //only get to each of these from exactly one other
      //unique state which would be the current state
      if (refCurrentUIState.current === uiStates.noinput) {
        refCurrentUIState.current = uiStates.someinput;
        setUIState();
      } else {
        if (refCurrentUIState.current === uiStates.wrongAnswer_noinput) {
          refCurrentUIState.current = uiStates.wrongAnswer_someinput;
          setUIState();
        }
      }
      //else it was already in a someinput state, so we won't
      //render the state again. this is an advantage of remembering
      //the state in a single variable.
      //However, the NFA implementations were simpler
    } else {
      //we are in a noinput state but
      //there are two so we have to choose which one
      //However, based on the DFA I drew, we could
      //only get to each of these from exactly one other
      //unique state which would be the current state
      if (refCurrentUIState.current === uiStates.someinput) {
        refCurrentUIState.current = uiStates.noinput;
        setUIState();
      } else {
        if (refCurrentUIState.current === uiStates.wrongAnswer_someinput) {
          refCurrentUIState.current = uiStates.wrongAnswer_noinput;
          setUIState();
        } else {
          //else: this cannot arise! so we throw exception as a guard
          throw new Error(
            "Do not understand how there's no input in city at a time when state machine was in a state other than wrongAnswer_noInput or noInput."
          );
          //NOTE: Seeing this error above brings to my notice a few things:
          //1. We have sprinkled state transitions in event handler, including
          //throwing errors on source states that are impossible (as done above)
          //or on destination states that are unknown (as done in setUISate).
          //there is potentially a third category of errors we haven't had
          //to tackel here: target conditions which are impossible. We haven't
          //had to do this because we are assuming that if any of the event handler
          //decides to transition to a state, then its decision is correct.
          //
          //INSTEAD OF SPRINKING STATE TRANSITIONS, INCLUDING ERRORS,
          //across event handlers, we should centralise the graph and annotate
          //each transition with an input event (from an enum maybe?). Based on
          //the current state that such a centralised SateMachine  object keeps
          //track of, and on the input event fed into it (via a "Input" method maybe?)
          //the StateMachine itself decides which state to transition to next,
          //and if the event is unexpected for the current state, then throws an
          //error.
          //NOT OTHER TYPE OF ERROR other than input being invalid for current state
          //needs to be catered and all transition/input errors arr thus centralised
          //in StateMachine.
          //
          //Then all event handlers would need to do is to pass the correct input
          //that the StateMachine understands, to the StateMachine using its
          //Input method
          //
          //2. Notice how we set lots of visual state even when it's not needed, just
          //to guarantee that every item is in the correct visual state for the
          //state machine state we are entering. We could have compared each UI control's
          //current state with the intended one but that would have been too much work.
          //But this is a really small state machine. When you have more controls
          //and/or a more complicated state machihne, this would be a lot more
          //complicated.
          //
          //SO THIS SHOWS US THE BEAUTY OF REACT's RE-RENDER LOGIC: it only updates
          //controls that need to be updated (I think, but am not sure, that it
          //compares currrent props and state the current component uses and only
          //re-renders it if it uses any info that has changed.).
          //
          //THIS WOULD BE BULLET PROOF AS LONG AS we don't subvert React's expectations
          //by fiddling with visual state post-render using refs as we have done here.
          //
          //THIS IS THE REASON WHY React documentation insists that useEffect
          //is for CONNECTING TO EXTERNAL SYSTEMS ONLY and NOT FOR MANIPULATING
          //VISUAL STATE.
          //
          //3. The setUIState method basically provides the entry logic for each
          //state.
          //
          //Instead of sprinkling transitions across event handlers
          //as we have now, or centralising all transitions (and error handling)
          //in a StateMachine object, if we create a State object for every state
          //and let it handle input event so that it manages its own transition
          //out to a next state or throw an error, and let it also define
          //it's own entry logic, then we have David Harel's State Chart. The only
          //thing missing would be provision for an Exit event also.
          //WE WOULD THEN JUST NEED A GLOBAL INPUT FUNCTION which maintains the
          //object for the current state, and forwards the input it receives to it.
        }
      }
    }
  };

  const handleSubmitClick = () => {
    refCurrentUIState.current = uiStates.loading;
    setUIState();
  };

  //as in NFA React version, this is necessary
  //because we are manipulating UI controls
  //using ref and not by setting state to cause
  //re-render.
  //HOWEVER, unlike NFA version, here we
  //will just initial state as we now
  //maintain a current state variable that has already
  //been set to an initial state (for first and only render)
  useEffect(() => {
    setUIState();
  });

  const answerId = useId();

  return (
    <>
      <section ref={panelQuiz}>
        <h1>City quiz</h1>
        <label htmlFor={answerId}>
          Whichevers city is located between two continents?
        </label>
        <div>
          <textarea
            ref={txtCity}
            onChange={handleCityChange}
            cols={30}
            rows={20}
            name=''
            id={answerId}
          ></textarea>
        </div>
        <button ref={btnSubmit} onClick={handleSubmitClick}>
          Submit
        </button>
        <p
          data-testid={testIds.wrongAnswer}
          ref={txtWrongAnswer}
          className={clsx(styles.invisible, styles.panelQuiz__wrongAnswer)}
        >
          Good guess but a wrong answer. Try again!
        </p>
        <p
          data-testid={testIds.loading}
          ref={txtLoading}
          className={clsx(styles.invisible)}
        >
          Loading...
        </p>
      </section>
      <section ref={panelResult} className={clsx(styles.invisible)}>
        <h1 data-testid={testIds.rightAnswer}>That&apos;s right!</h1>
      </section>
    </>
  );
};

export default CityDeterminised;
