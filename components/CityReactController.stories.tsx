import type { Meta, StoryObj } from '@storybook/react';
import CityController from './CityReactController';

const meta: Meta<typeof CityController> = {
  component: CityController,
  title: 'City/City Controller - as per React docs',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CityController>;

export const WholeQuiz: Story = {
  name: 'Whole Quiz (from start to finish)',
};
