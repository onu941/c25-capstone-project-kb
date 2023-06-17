// function oldCode() {
//   return (
//     {props.canEdit ? (
//         <div className="w-fit">
//           {props.isGoodForEditing ? (
//             <button onClick={props.handleSaveClick} type="submit">
//               {" "}
//               <CheckIcon className="h-9 w-9 pt-1 text-slate-300" />
//             </button>
//           ) : (
//             <button
//               onClick={props.handleEditClick}
//               type="button"
//               className="transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 active:translate-y-0"
//             >
//               <PencilSquareIcon className="h-9 w-9 pt-1 text-slate-300" />
//             </button>
//           )}
//         </div>
//       ) : null}
//       {props.canDelete ? (
//         <div className="w-fit">
//           {props.canDelete ? (
//             <button onClick={props.onDelete}>
//               <TrashIcon className="h-9 w-9 text-slate-300 pt-1" />
//             </button>
//           ) : null}
//         </div>
//       ) : null}
//   );
// }
