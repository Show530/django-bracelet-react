import styled from "styled-components";
import { useState, useEffect } from 'react';
import type {Bracelet} from "../../interfaces/Bracelet.ts";
import axios from "axios";
import Loading from "../Loading.tsx";
// import AdminBracelets from "./Displays/AdminBracelets.tsx";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 2px darkred inset;
`;


const AllBraceletsTable=styled.table`
    justify-content: space-evenly;
    border: 2px aqua;
    justify-self: center;
`;

const SingleBraceletTr = styled.tr`

`;

const StyledTd = styled.td`
    margin: 2% 3%;
`;
//
// const SingleBraceletDiv=styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     max-width: 35%;
//     padding: 1%;
//     margin: 1%;
//     //font: calc(20px + 5vw) Georgia, Garamond, serif;
//     //Copperplate, fantasy
//     text-align: center;
//     border: 1px inset green;
//     color: #544B6C;
//     //overflow-wrap: break-word;
// `;
//
// const StyledItem = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     // keeps label close to value
//     gap: 0.2rem;
// `;
//
// const StyledLabel = styled.h3 `
//     //font-size: 1.5rem;
//     font: clamp(12px, calc(18px + 1vw), 32px) Georgia, Garamond, serif;
//     color: #666;
//     text-transform: lowercase;
//     letter-spacing: 0.03em;
// `;
//
// const StyledVal = styled.h3 `
//     //font-size: 3rem;
//     font: clamp(14px, calc(24px + 2vw), 40px) Georgia, Garamond, serif;
//     font-weight: 500;
//     color: #111;
//
//     // handling url overflow
//     word-break: break-word;
//     overflow-wrap: anywhere;
// `;

const AddBraceletDiv = styled.div`
    display: flex;
    justify-items: center;
`;

const StyledButton = styled.button`
    //background-color: lightblue;
    margin: auto;
    //font: clamp(14px, calc(24px + 2vw), 40px) Georgia, Garamond, serif;
`;


export default function AdminGallery() {
    const[data, setData] = useState<Bracelet[]>([]);

    // useEffect hook for error stuff and re-loading
    useEffect(() => {
        axios.get("/api/bracelets/").then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [data.length]);

    if(!data.length) {
        return <Loading />;
    }

    return (
        <ParentDiv>
            <AddBraceletDiv>
                <StyledButton>Add a Bracelet</StyledButton>
            </AddBraceletDiv>
            <AllBraceletsTable>
                <thead>
                    <tr>
                        {/*<th>Add a bracelet</th>*/}
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((bracelet: Bracelet) =>
                        <SingleBraceletTr key={bracelet.id} >
                            {/*<span>Name:</span>*/}
                            <StyledTd>{bracelet.name}</StyledTd>
                            <StyledTd>
                                <button>Edit</button>
                            </StyledTd>
                            {/*<td>*/}
                            {/*    <button>Delete</button>*/}
                            {/*</td>*/}
                        </SingleBraceletTr>
                    )}
                </tbody>
            </AllBraceletsTable>
        </ParentDiv>
    );
}


//
// const todoItems = [/* same array as before */];
//
// export default function App() {
//   const [viewCompleted, setViewCompleted] = useState(false);
//   const [todoList, setTodoList] = useState(todoItems);
//
//   const newItems = todoList.filter(
//     (item) => item.completed === viewCompleted
//   );
//
//   return (
//     <main className="container">
//
//             <ul className="list-group list-group-flush border-top-0">
//               {newItems.map((item) => (
//                 <li
//                   key={item.id}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <span
//                     className={`todo-title mr-2 ${
//                       viewCompleted ? "completed-todo" : ""
//                     }`}
//                     title={item.description}
//                   >
//                     {item.title}
//                   </span>
//                   <span>
//                     <button className="btn btn-secondary mr-2">Edit</button>
//                     <button className="btn btn-danger">Delete</button>
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


//
// list of items is todoList
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       todoList: todoItems,
//     };
//   }
//
//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({ viewCompleted: true });
//     }
//
//     return this.setState({ viewCompleted: false });
//   };
//
//   renderTabList = () => {
//     return (
//       <div className="nav nav-tabs">
//         <span
//           className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
//           onClick={() => this.displayCompleted(true)}
//         >
//           Complete
//         </span>
//         <span
//           className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
//           onClick={() => this.displayCompleted(false)}
//         >
//           Incomplete
//         </span>
//       </div>
//     );
//   };
//
//   renderItems = () => {
//     const { viewCompleted } = this.state;
//     const newItems = this.state.todoList.filter(
//       (item) => item.completed == viewCompleted
//     );
//
//     return newItems.map((item) => (
//       <li
//         key={item.id}
//         className="list-group-item d-flex justify-content-between align-items-center"
//       >
//         <span
//           className={`todo-title mr-2 ${
//             this.state.viewCompleted ? "completed-todo" : ""
//           }`}
//           title={item.description}
//         >
//           {item.title}
//         </span>
//         <span>
//           <button
//             className="btn btn-secondary mr-2"
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   };
//
//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary"
//                 >
//                   Add task
//                 </button>
//               </div>
//               {this.renderTabList()}
//               <ul className="list-group list-group-flush border-top-0">
//                 {this.renderItems()}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }
// }
//
// export default App;