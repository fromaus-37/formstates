import type { Meta, StoryObj } from '@storybook/react';
import CityDeterminised, { testIds } from './city_determinised';
import {
  userEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/testing-library';

import { expect, jest } from '@storybook/jest';

import sinon from 'sinon';

const meta: Meta<typeof CityDeterminised> = {
  title: 'City/City Determinised (unidiomatic)',
  component: CityDeterminised,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CityDeterminised>;

const msWaitForLoadingInAssert = 6000;
const msWaitForLoading = 5050;

const createPOM = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);

  return {
    act: {
      enterCity: (city: string) => {
        userEvent.type(canvas.getByRole('textbox'), city);
      },

      submitAnswer: () => {
        userEvent.click(canvas.getByRole('button'));
      },
    },

    assert: {
      rightAnswerVisible_eventually: async () => {
        //Using await canvas.findByText for fun here
        //and this makes us mark the function passed to
        //waitFor as async also.
        //The more appropriate choice would have been
        //to use getByText that would
        await waitFor(
          async () =>
            expect(
              await canvas.findByTestId(testIds.rightAnswer)
            ).toBeVisible(),
          { timeout: msWaitForLoadingInAssert }
        );
      },

      rightAnswerInvisible: () => {
        expect(canvas.getByTestId(testIds.rightAnswer)).not.toBeVisible();
      },

      buttonsInvisible: () => {
        expect(canvas.queryAllByRole('button')).toHaveLength(0);
      },

      submitVisibleAndDisabled: () => {
        const submitButton = canvas.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeVisible();
        expect(submitButton).not.toBeEnabled();
      },

      submitVisibleAndEnabled: () => {
        const submitButton = canvas.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeVisible();
        expect(submitButton).toBeEnabled();
      },

      textboxesInvisible: async () => {
        await expect(canvas.queryAllByRole('textbox')).toHaveLength(0);
      },

      cityVisibleAndDisabled: () => {
        const cityTextbox = canvas.getByRole('textbox');
        expect(cityTextbox).toBeVisible();
        expect(cityTextbox).not.toBeEnabled();
      },

      cityVisibleAndEnabled: () => {
        const cityTextbox = canvas.getByRole('textbox');
        expect(cityTextbox).toBeVisible();
        expect(cityTextbox).toBeEnabled();
      },

      wrongAnswerInvisible: () => {
        expect(canvas.getByTestId(testIds.wrongAnswer)).not.toBeVisible();
      },

      wrongAnswerVisible_eventually: async () => {
        await waitFor(
          async () =>
            expect(
              await canvas.findByTestId(testIds.wrongAnswer)
            ).toBeVisible(),
          { timeout: msWaitForLoadingInAssert }
        );
      },

      loadingInvisible: () => {
        expect(canvas.getByTestId(testIds.loading)).not.toBeVisible();
      },

      loadingVisible: () => {
        expect(canvas.getByTestId(testIds.loading)).toBeVisible();
      },
    },
  };

  //at this time we synchronously assert
  //that no inputs or any other
  //messages are visible
};

export const WrongAnswer: Story = {
  play: async ({ canvasElement }) => {
    const clock = sinon.useFakeTimers();

    const pom = createPOM(canvasElement);
    pom.act.enterCity('haha');
    pom.act.submitAnswer();

    //assert while loading
    const wrongAnswerWillBeVisible = pom.assert.wrongAnswerVisible_eventually();

    pom.assert.submitVisibleAndDisabled();
    pom.assert.cityVisibleAndDisabled();
    pom.assert.loadingVisible();
    pom.assert.wrongAnswerInvisible();
    pom.assert.rightAnswerInvisible();

    clock.tick(msWaitForLoading);
    await wrongAnswerWillBeVisible;

    pom.assert.loadingInvisible();
    pom.assert.cityVisibleAndEnabled();
    pom.assert.submitVisibleAndEnabled();
    pom.assert.rightAnswerInvisible();

    clock.restore();
  },
};

/**
 * Try changing text in City text box
 * including deleting it completely,
 * and submiting both right and wrong
 * answers
 */
export const RightAnswer: Story = {
  //TODO: Understand and document:
  // * within
  // * waitFor and waitForElementToBeRemoved
  // * findBy (an async method alongside the two
  // wait methods; all three async methods are
  // given here: https://testing-library.com/docs/dom-testing-library/api-async/)
  // *
  play: async ({ canvasElement }) => {
    const clock = sinon.useFakeTimers();

    const pom = createPOM(canvasElement);

    pom.act.enterCity('ISTANbul');
    pom.act.submitAnswer();

    //Using await canvas.findByText for fun here
    //and this makes us mark the function passed to
    //waitFor as async also.
    //The more appropriate choice would have been
    //to use getByText that would
    const rightAnswerWillBeVisible = pom.assert.rightAnswerVisible_eventually();

    pom.assert.submitVisibleAndDisabled();
    pom.assert.cityVisibleAndDisabled();
    pom.assert.wrongAnswerInvisible();
    pom.assert.loadingVisible();

    clock.tick(msWaitForLoading);
    await rightAnswerWillBeVisible;
    //at this time we synchronously assert
    //that no inputs or any other
    //messages are visible
    pom.assert.buttonsInvisible();
    pom.assert.textboxesInvisible();
    pom.assert.wrongAnswerInvisible();
    pom.assert.loadingInvisible();

    clock.restore();
  },
};
