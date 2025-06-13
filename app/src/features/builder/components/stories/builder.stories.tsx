import type { Meta, StoryObj } from "@storybook/react-vite";
import { Builder as BuilderComp } from "../builder";

const meta = {
  title: "Builder",
  component: BuilderComp,
} satisfies Meta<typeof BuilderComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuilderOptions: Story = {};
