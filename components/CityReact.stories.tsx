import type { Meta, StoryObj } from '@storybook/react';
import { CityReact, uiStates } from './CityReact';

const meta: Meta<typeof CityReact> = {
  title: 'City/City - as per React docs',
  component: CityReact,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CityReact>;
/**
 * An answer has not yet been submitted. The user won't be able
 * to submit their answer until they enter a value into the
 * city box
 */
export const UnsubmittedNoInput: Story = {
  name: 'Unsubmitted - No Input',

  args: {
    uiState: uiStates.unsubmitted_noinput,
  },

  render: () => <CityReact uiState={uiStates.unsubmitted_noinput} />,
};

/**An answer hasn't yet been sumitted. However,
 * the user can submit the answer as city textbox is not empty.
 */
export const UnsubmittedSomeInput: Story = {
  name: 'Unsubmitted - Some Input',

  args: {
    city: 'Istanb',
    uiState: uiStates.unsubmitted_someinput,
  },
};

/**An answer has been submitted. We're waiting for
 * the server's response
 *
 */
export const Loading: Story = {
  args: {
    city: 'Istanb',
    uiState: uiStates.loading,
  },
};

/**
 * Wrong answer was submitted. There is still
 * some text in the City textbox (this could
 * potentially be the same as what was previously
 * submitted).
 * The user can submit again.
 */
export const WrongAnswerSomeInput: Story = {
  name: 'Wrong Answer - Some Input',
  args: {
    city: 'Istanb',
    uiState: uiStates.wrongAnswer_someinput,
  },
};

/**
 * Wrong answer was submitted. Since then,
 * the user has delted any text in the City text box
 * so an aswer cannot yet be submitted.
 */
export const WrongAnswerNoInput: Story = {
  name: 'Wrong Answer - No Input',
  args: {
    city: undefined,
    uiState: uiStates.wrongAnswer_someinput,
  },
};
