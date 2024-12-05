declare namespace JSX {
  interface IntrinsicElements {
    // Declaración para gecko-coin-price-marquee-widget
    "gecko-coin-price-marquee-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      locale?: string;
      outlined?: boolean;
      "coin-ids"?: string;
      "initial-currency"?: string;
      "dark-mode"?: boolean;
      "transparent-background"?: boolean;
    };

    "gecko-coin-list-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      locale?: string;
      outlined?: boolean;
      "coin-ids"?: string;
      "initial-currency"?: string;
      "dark-mode"?: boolean;
      "transparent-background"?: boolean;
    };

    "gecko-coin-market-ticker-list-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      locale?: string;
      outlined?: boolean;
      "initial-currency"?: string;
      "dark-mode"?: boolean; // Adapta al tema oscuro o claro
    };
  }
}
