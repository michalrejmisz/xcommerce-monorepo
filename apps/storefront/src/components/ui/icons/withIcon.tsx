import React from "react";

const withIcon =
  (Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) =>
  (props: React.SVGProps<SVGSVGElement>) => (
    <Component
      {...props}
      style={{ width: "100%", height: "100%", ...props.style }}
    />
  );

export default withIcon;
