import React from "react";
import {action } from "@storybook/addon-actions/dist/preview";
import classNames from "classnames";

import "components/Button.scss";

export const actionsData = {
   onClick:  action('button-clicked'),
};

export default function Button(props) {
   let buttonClass = classNames({
      'button': true,
      'button--confirm': props.confirm,
      'button--danger': props.danger,
   });

   return (
      <button
         className={`${buttonClass}`}
         disabled={props.disabled}
         onClick={props.onClick}
      >
         {props.children}
      </button>
   );
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
