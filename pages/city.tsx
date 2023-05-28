import styles from "./city.module.scss";
import { useRef, useEffect } from "react";
import { clsx } from "clsx";

const City = () => {
  const txtCity = useRef<HTMLTextAreaElement>(null);
  const btnSubmit = useRef<HTMLButtonElement>(null);
  const txtWrongAnswer = useRef<HTMLParagraphElement>(null);
  const txtLoading = useRef<HTMLParagraphElement>(null);
  const panelQuiz = useRef<HTMLDivElement>(null);
  const panelResult = useRef<HTMLDivElement>(null);

  enum uiStates {
    noError = "noError",
    loading = "loading",
    wrongAnswer = "wrongAnswer",
    rightAnswer = "rightAnswer",
  }

  enum submittableStates {
    submittable = "submittable",
    notSubmittable = "notSubmittable",
  }

  const setSubmittableState = (submittableState: submittableStates) => {
    //just a narrowing clause to
    //ensure for TS taht btnSubmit is not null

    switch (submittableState) {
      case submittableStates.submittable:
        btnSubmit.current!.disabled = false;
        break;
      case submittableStates.notSubmittable:
        btnSubmit.current!.disabled = true;
        break;
      default:
        throw new Error(`Submittable state ${submittableState} not understood`);
    }
  };

  const setUIState = (uiState: uiStates) => {
    switch (uiState) {
      case uiStates.noError:
        txtWrongAnswer.current!.classList.add(styles.invisible);
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        break;
      case uiStates.loading:
        txtWrongAnswer.current!.classList.add(styles.invisible);
        txtLoading.current!.classList.remove(styles.invisible);
        txtCity.current!.disabled = true;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        resultTimeout = window.setTimeout(showResult, 5000);
        break;
      case uiStates.wrongAnswer:
        txtWrongAnswer.current!.classList.remove(styles.invisible);
        txtLoading.current!.classList.add(styles.invisible);
        txtCity.current!.disabled = false;
        panelQuiz.current!.classList.remove(styles.invisible);
        panelResult.current!.classList.add(styles.invisible);
        break;
      case uiStates.rightAnswer:
        panelQuiz.current!.classList.add(styles.invisible); //now we don't care
        //    about state of other controls in this panel
        panelResult.current!.classList.remove(styles.invisible);
        break;
      default:
        throw new Error(`UI state ${uiState} not understood`);
    }
  };

  let resultTimeout: number | undefined;

  function showResult() {
    window.clearTimeout(resultTimeout);
    if (txtCity.current!.value.trim().toLowerCase() === "istanbul") {
      setUIState(uiStates.rightAnswer);
    } else {
      setUIState(uiStates.wrongAnswer);
      setSubmittableState(submittableStates.submittable);
    }
  }

  const handleCityChange = () => {
    txtCity.current!.value.trim();
    if (txtCity.current!.value.trim()) {
      setSubmittableState(submittableStates.submittable);
    } else {
      setSubmittableState(submittableStates.notSubmittable);
    }
  };

  const handleSubmitClick = () => {
    setUIState(uiStates.loading);
    setSubmittableState(submittableStates.notSubmittable);
  };

  //It is necessary to execute the
  //following onload event handler.
  //This is because if I put `disabled`
  //or `disabled={true}` on the btnSubmit
  //element, then it's event handler
  //is cut out (generated as an empty
  //function named `noop` in the JS bundle)
  //Presumably React expects that
  //if it were to be enabled again, which
  //is the only time it's event handler
  //could run, then this should need
  //a re-render (because any visual state
  //change should lead to a re-render)
  //but we're changing visual state using
  //refs in event handlers and do not
  //change any state using setState which
  //would have been the React/MVVM way
  //of doing it as from the new state
  //of text box (has some letters) we
  //could derive prop value
  //`disabled={false}` of the Submit button
  //ALSO, when I put something in onLoad
  //on a section (where it's available
  //even though it's a document-level event
  //also available as window.onload and
  //document.onload but the widow object
  //is of course not available here),
  //then again the event handler
  //function I specified was replaced with a
  //function named `noop` in the generated
  //code perhaps because we shouldn't be able
  //to insert any onload code as React uses
  //it to implement lifecycle managemenet.
  //THEREFORE, naturally, I used a hook which
  //allowed me to hook into the lifecycle
  //managed by React.
  useEffect(() => {
    btnSubmit.current!.disabled = true;
  });

  return (
    <>
      <section ref={panelQuiz}>
        <h1>City quiz</h1>
        <p>What city is located between two continents?</p>
        <div>
          <textarea
            ref={txtCity}
            onChange={handleCityChange}
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <button ref={btnSubmit} onClick={handleSubmitClick}>
          Submit
        </button>
        <p
          ref={txtWrongAnswer}
          className={clsx(styles.invisible, styles.panelQuiz__wrongAnswer)}
        >
          Good guess but a wrong answer. Try again!
        </p>
        <p ref={txtLoading} className={clsx(styles.invisible)}>
          Loading...
        </p>
      </section>
      <section ref={panelResult} className={clsx(styles.invisible)}>
        <h1>That&nbsp;s right!</h1>
      </section>
    </>
  );
};

export default City;
