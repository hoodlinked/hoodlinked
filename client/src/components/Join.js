// import { Container } from '@chakra-ui/react';
// import React from 'react';
// import emailjs from '@emailjs/browser';
// import React, { useState, useRef } from 'react';

// const Join = () => {
//     const form = useRef();

//     const [done, setDone] = useState(false);
//     const [nameError, setNameError] = useState(false);
//     const [emailError, setEmailError] = useState(false);
//     const [messageError, setMessageError] = useState(false);
  
//     const sendEmail = (e) => {
//       e.preventDefault();
  
//       if (!form.current.checkValidity()) {
//         // If form is invalid, set the validation errors for each field
//         setNameError(form.current.user_name.validity.valueMissing);
//         setEmailError(form.current.user_email.validity.valueMissing || form.current.user_email.validity.typeMismatch);
//         setMessageError(form.current.message.validity.valueMissing);
//         return;
//       }
  
//       emailjs.sendForm('service_v5g9pzq', 'template_dtf59g6', form.current, '1gWbm3SKfr_vcTr1n')
//         .then((result) => {
//           console.log(result.text);
//           setDone(true);
//         }, (error) => {
//           console.log(error.text);
//         });
//     };
  
//     return (

//         <Container>
//             <Text>
//                 This sofa is perfect for modern tropical spaces, baroque inspired
//                 spaces, earthy toned spaces and for people who love a chic design with a
//                 sprinkle of vintage design.
//             </Text>
//             <Button onClick={handleClick} variant='solid' colorScheme='blue'>
//                 Email owner to join group
//             </Button>
//         </Container>

//     );

// }

// export default Join