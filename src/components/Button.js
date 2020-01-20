import React from "react";
import {action } from "@storybook/addon-actions/dist/preview";

import "components/Button.scss";

export const actionsData = {
   onClick:  action('onClick'),
};

export default function Button(props) {
   return <button>{props.children}</button>
}
//    props:{
//       danger,
//       confirm,
//       disabled
//    },
//    onClick
//    }) {
//    return (
//       <button className={`
//          ${danger && ".button--danger"}
//          ${confirm && ".button--confirm"}
//          ${disabled && ".button--disabled"}
//          `} onClick={() => onClick()}> 
//          {props.children}
//       </button>
//    );
// }
