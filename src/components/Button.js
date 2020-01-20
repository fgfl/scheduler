import React from "react";
import {action } from "@storybook/addon-actions/dist/preview";

import "components/Button.scss";

export const actionsData = {
   onClick:  action('button-clicked'),
};

export default function Button(props) {
   let buttonClass = 'button';

   if (props.confirm) {
      buttonClass += ' button--confirm';
   }
   
   if (props.danger) {
      buttonClass += ' button--danger';
   }

   return (
      <button
         className={`${buttonClass}`}
         disabled = {props.disabled}
         {...actionsData}
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
