import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography } from "@mui/material";
import EaristLogo from "../assets/EaristLogo.png";
import { jwtDecode } from "jwt-decode";
import ForwardIcon from '@mui/icons-material/Forward';

const AdmissionFormProcess = () => {
  const getPersonIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.person_id; // Ensure your token includes this
    }
    return null;
  };

  const divToPrintRef = useRef();

  const printDiv = () => {
    const divToPrint = divToPrintRef.current;
    if (divToPrint) {
      const newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write(`
      <html>
        <head>
          <title>Print</title>
       <style>
  @page {
    size: A4;
    margin: 0;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 210mm;
    height: 297mm;
    font-family: Arial, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

.print-container {
  width: 100%;
  height: auto;
  padding: 10px ;
}

  .student-table {
    margin-top: 0 !important;
  }

  button {
    display: none;
  }

    .student-table {
    margin-top: -20px !important;
  }




  svg.MuiSvgIcon-root {
    width: 24px !important;
    height: 24px !important;
  }
</style>

        </head>
        <body onload="window.print(); setTimeout(() => window.close(), 100);">
          <div class="print-container">
            ${divToPrint.innerHTML}
          </div>
        </body>
      </html>
    `);
      newWin.document.close();
    } else {
      console.error("divToPrintRef is not set.");
    }
  };



  return (
    <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 1, backgroundColor: 'transparent' }}>
      <Container>
        <div ref={divToPrintRef}>
          <br />
          <Container>
            <div style={{
              width: "8in", // matches table width assuming 8in for 40 columns
              maxWidth: "100%",
              margin: "0 auto", // center the content
              fontFamily: "Times New Roman",
              boxSizing: "border-box",

              padding: "10px 0", // reduced horizontal padding
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "20px"
            }}>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
              }}>

                {/* Logo */}
                <div style={{ flexShrink: 0, marginRight: "20px" }}>
                  <img
                    src={EaristLogo}
                    alt="Earist Logo"
                    style={{ width: "120px", height: "120px", objectFit: "contain", marginLeft: "10px", marginTop: "-25px" }}
                  />
                </div>




                <div style={{
                  flexGrow: 1,
                  textAlign: "center",

                  fontFamily: "times new Roman",
                  lineHeight: 1.4,
                  paddingTop: 0,
                  paddingBottom: 0
                }}>
                  <div style={{ marginLeft: "-155px", fontFamily: "times new Roman", fontsize: "12px", }}>Republic of the Philippines</div>
                  <div style={{ marginLeft: "-155px", fontFamily: "times new Roman", fontsize: "20px", }}><b>EULOGIO "AMANG" RODRIGUEZ </b></div>
                  <div style={{ marginLeft: "-155px", fontFamily: "times new Roman", fontsize: "20px", }}><b>INSTITUTE OF SCIENCE AND TECHNOLOGY</b></div>
                  <div style={{ marginLeft: "-155px", fontSize: "12px" }}>Nagtahan, Sampaloc, Manila 1008</div>
                  <br />

                  <div style={{
                    fontSize: "18px",
                    fontFamily: "Times new roman",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    marginTop: "0",
                    marginLeft: "-145px",
                    textAlign: "center",
                  }}>
                    OFFICE OF THE REGISTRAR<br />
                    APPLICATION FOR EARIST COLLEGE ADMISSION
                  </div>


                </div>
              </div>
            </div>
          </Container>


          <table
            className="student-table"
            style={{
              borderCollapse: "collapse",
              fontFamily: "Arial, Helvetica, sans-serif",
              width: "8in",
              margin: "0 auto",
              textAlign: "center",
              tableLayout: "fixed",
            }}
          >

            <tbody>

              <tr>

                <td
                  colSpan={23}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "30px", textAlign: "left" }}>
                    Application Information: <span>(Pls. PRINT)</span>
                  </span>{" "}

                </td>
                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",

                  }}
                >
                  Search App. No.
                </td>
                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"
                  }}
                >

                </td>
              </tr>
              <tr>
                <td colspan="40" style={{ height: "20px" }}>

                </td>
              </tr>
              <tr>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "center",
                    border: "1px solid black",
                    height: "30px"

                  }}
                >
                  Academic Year & Term
                </td>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>SY 2022</span>
                    <span>SY 204-</span>
                    <span>( ) 1st ( ) 2nd</span>
                    <span>O.R. No.</span>
                  </div>
                </td>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",
                    border: "1px solid black"

                  }}
                >

                </td>
              </tr>
              <tr>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "center",
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                    height: "30px"

                  }}
                >
                  Application Type:
                </td>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",
                    fontWeight: "bold",
                    textAlign: "left", // overall alignment
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>( ) Freshman</span>
                    <span>( ) Returnee</span>
                    <span>Trans. No.</span>
                  </div>
                </td>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",
                    border: "1px solid black"

                  }}
                >

                </td>

              </tr>
              <tr>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "center",
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                  }}
                >

                </td>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>( ) Transferee</span>
                    <span>( ) Old</span>
                    <span>Application Date</span>
                  </div>
                </td>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",
                    border: "1px solid black"


                  }}
                >

                </td>

              </tr>
              <tr>
                <td colspan="40" style={{ height: "20px" }}>

                </td>
              </tr>

              <tr>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold",



                  }}
                >
                  Course Applied:
                </td>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "30px"

                  }}
                >

                </td>
                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",
                    border: "1px solid black"


                  }}
                >

                </td>

              </tr>
              <tr>

                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold",


                  }}
                >
                  Major Study:
                </td>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "30px"

                  }}
                >

                </td>
                <td
                  colSpan={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "right",
                    border: "1px solid black"


                  }}
                >

                </td>

              </tr>

              <tr>

                <td
                  colSpan={40}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "30px", textAlign: "left" }}>
                    Personal Infromation: <span>(Pls. PRINT)</span>
                  </span>{" "}

                </td>
              </tr>



              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Last Name:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold"



                  }}
                >
                  Present Address:
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Street:

                </td>

              </tr>

              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Given Name:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Brgy:
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Town/City:

                </td>

              </tr>
              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Middle Name:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Province:
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Zip Code:

                </td>

              </tr>
              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Gender:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    fontWeight: "bold",


                  }}
                >
                  Permanent Address
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Street:

                </td>

              </tr>
              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Civil Status:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Brgy:

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Town/City:

                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Date of Birth
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Province:
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Zip Code:

                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Place of Birth:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Family Background
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",



                  }}
                >


                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Nationality
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Father's Name
                </td>


              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Religion
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Occupation
                </td>


              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black"


                  }}
                >
                  Tel. No./CP No. :
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Mother's Name
                </td>


              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Email :
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",

                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Occupation
                </td>


              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Testing Date/Time :
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Address
                </td>


              </tr>


              <tr>

                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",



                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "30px", textAlign: "left" }}>
                    Education Background
                  </span>{" "}

                </td>
                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",



                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"


                  }}
                >
                  Contact No.
                </td>


              </tr>


              <tr>

                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",



                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "30px", textAlign: "left" }}>
                    Elementary School
                  </span>{" "}

                </td>
                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",

                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",

                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    fontWeight: "bold",

                  }}
                >
                  Voc'l. School

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",


                  }}
                >


                </td>

              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Name of School
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Name of School
                </td>



              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Address
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Address
                </td>


              </tr>


              <tr>
                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Inclusive Dates
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",

                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Inclusive Dates
                </td>


              </tr>


              <tr>

                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    fontWeight: "bold",



                  }}
                >
                  Secondary School
                </td>
                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold",


                  }}
                >
                  Graduate Studies

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",



                  }}
                >


                </td>

              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Name of School
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Name of School
                </td>


              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Address
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Address
                </td>


              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Inclusive Dates
                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Degree / Courses
                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderTop: "1px solid black",
                    borderLeft: "1px solid black",

                    borderRight: "1px solid black",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"


                  }}
                >
                

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={18}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Inclusive Dates
                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "center",
                    border: "1px solid black"



                  }}
                >
                  F 138 GWA %
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >
          
                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",


                  }}
                >


                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid black",


                    height: "10px"

                  }}
                >
               

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRight: "1px solid  black",

                    height: "10px"
                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "1px solid black",


                  }}
                >
                  Documents Presented:
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",



                  }}
                >
                  ( ) Original

                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "15px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    fontWeight: "bold",



                  }}
                >
                  College:
                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",



                    height: "10px"

                  }}
                >


                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",

                  }}
                >
                  ( ) f138 Report Card
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderRight: "1px solid black",


                  }}
                >
                  ( ) ACR

                </td>

              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Name of School:

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    borderLeft: "1px solid black",


                  }}
                >
                  ( ) F137 H.S. Transcript
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    borderRight: "1px solid black",


                  }}
                >
                  ( ) Study Permit

                </td>

              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Address

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",

                  }}
                >
                  ( ) Good Moral Character Form
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderRight: "1px solid black",

                  }}
                >
                  ( ) ALS Certificate

                </td>

              </tr>



              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Degree/Course

                </td>

                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",

                  }}
                >
                  ( ) Transcript of Records
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",

                    borderRight: "1px solid black",
                  }}
                >
                  ( ) PEPT Certificate

                </td>

              </tr>


              <tr>

                <td
                  colSpan={20}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    border: "1px solid black"



                  }}
                >
                  Inclusive Dates


                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",

                  }}
                >
                  ( ) Copy of Grades
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderRight: "1px solid black",

                  }}
                >
                  ( ) NSO Birth Certificate

                </td>

              </tr>


              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",




                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",

                  }}
                >
                  ( ) Transfer Credential/Hon. Dismissal
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderRight: "1px solid black",

                  }}
                >
                  ( ) Promissory Note


                </td>

              </tr>

              <tr>

                <td
                  colSpan={7}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",




                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"


                  }}
                >

                </td>
                <td
                  colSpan={2}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    fontWeight: "bold",
                    textAlign: "center",


                    height: "10px"

                  }}
                >

                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderBottom: "1px solid black",

                  }}
                >
                  ( ) Letter of Recommendation
                </td>
                <td
                  colSpan={9}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "12px",
                    paddingTop: "5px",  // you can reduce this if needed
                    marginTop: 0,
                    textAlign: "left",
                    borderBottom: "1px solid black",
                    borderRight: "1px solid black",


                  }}
                >
                  ( ) Other _____________


                </td>

              </tr>


































































            </tbody>

          </table>

        </div>
      </Container>
      <button
        onClick={printDiv}
        style={{
          marginBottom: "1rem",
          padding: "10px 20px",
          border: "2px solid black",
          backgroundColor: "#f0f0f0",
          color: "black",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#d3d3d3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        Print Table
      </button>
    </Box>
  );
};

export default AdmissionFormProcess;