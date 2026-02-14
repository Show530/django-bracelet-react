import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text: {
      body: string;
      subheading: string;
      heading: string;
      hero: string;
      label: string;
      value: string;
    };
  }
}