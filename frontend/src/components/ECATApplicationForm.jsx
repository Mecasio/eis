import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Container, } from "@mui/material";
import EaristLogo from "../assets/EaristLogo.png";
import { jwtDecode } from "jwt-decode";

const ECATApplicationForm = () => {
  const getPersonIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.person_id; // Ensure your token includes this
    }
    return null;
  };

  const [data, setData] = useState([]);
  const personIDFromToken = getPersonIdFromToken();




  const [shortDate, setShortDate] = useState("");


  useEffect(() => {
    const updateDates = () => {
      const now = new Date();

      // Format 1: MM/DD/YYYY
      const formattedShort = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}/${now.getFullYear()}`;
      setShortDate(formattedShort);

      // Format 2: MM DD, YYYY hh:mm:ss AM/PM
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";


    };

    updateDates(); // Set initial values
    const interval = setInterval(updateDates, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
        margin: 10mm 10mm 10mm 10mm; /* reasonable print margins */
      }

      html, body {
        margin: 0;
        margin-top: -115px;
        padding: 0;
        font-family: Arial, sans-serif;
        width: auto;
        height: auto;
        overflow: visible;
      }

      .print-container {
        width: 100%;
        box-sizing: border-box;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      button {
        display: none;
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
    <div ref={divToPrintRef}>
      <div>
        <style>
          {`
          @media print {
            button {
              display: none;
            }
          }
        `}
        </style>


      </div>
      <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 1, backgroundColor: 'transparent' }}>

        <Container>

          <Container>
            <br />



          </Container>
          <br />



          <form>

            <table
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



                {/* Title: PERSONAL DATA FORM */}

                <tr>
                  <td colSpan={40} style={{ border: "2px solid black", padding: 0 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr>
                          {/* LEFT - Logo */}
                          <td colSpan={9} style={{ textAlign: "center" }}>
                            <img
                              src={EaristLogo}
                              alt="Earist Logo"
                              style={{
                                width: "120px",
                                height: "120px",
                                display: "block",
                                marginTop: "-7px",
                              }}
                            />
                          </td>

                          {/* CENTER - School Info */}
                          <td colSpan={15} style={{ textAlign: "center", fontFamily: "Arial", fontSize: "10px", lineHeight: "1.5", }}>
                            <div style={{ fontSize: "12px", letterSpacing: "1px" }}>Republic of the Philippines</div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px" }}><b>Eulogio "Amang" Rodriguez</b></div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px" }}><b>Institute of Science and Technology</b></div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px" }}>Nagtahan, Sampaloc, Manila 1008</div>
                            <div style={{fontSize: "10px"}}><b>STUDENT ADMISSION REGISTRATION AND RECORDS MANAGEMENT SERVICES</b></div>
                           
                            <div style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" }}>
                              ECAT APPLICATION FORM
                            </div>
                          </td>

                          {/* RIGHT - Document Metadata Table */}
                          <td colSpan={15} style={{ padding: 0 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", textAlign: "Left", fontSize: "11px" }}>
                              <tbody>
                                {[
                                  "Document No.",
                                  "Revision No.",
                                  "Process Type:",
                                  "Effective Date:",
                                ].map((label, index) => (
                                  <tr key={index}>
                                    <td style={{ border: "2px solid black", padding: "4px", fontWeight: "bold" }}>{label}</td>
                                    <td style={{ border: "2px solid black", padding: "4px" }}>
                                      <input
                                        type="text"
                                        style={{
                                          width: "100%",
                                          border: "none",
                                          outline: "none",
                                          fontSize: "12px",
                                          textAlign: "left",
                                          background: "none",
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ))}

                                {/* Page Number */}
                                <tr>
                                  <td colSpan={2} style={{ border: "2px solid black", textAlign: "center", padding: "4px", fontWeight: "bold" }}>
                                    Page 1 of 1
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={40} style={{
                    height: "20px",            // Adjust height as needed

                    padding: 0,
                    border: "none"
                  }}></td>
                </tr>


                <tr>
                  <td colSpan={40} style={{ padding: 0, border: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "Arial, sans-serif",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        {/* First row: Applicant Instructions + Course Applied For */}
                        <tr>
                          <td
                            colSpan={24}
                            rowSpan={3}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "justify",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            TO THE APPLICANT<br />
                            Read carefully the ECAT Guidelines and Requirements before accomplishing this form.
                            <br />
                            Please write LEGIBLY and CORRECTLY in PRINT LETTERS without erasures.
                            <br />
                            ONLY APPLICATION FORMS ACCOMPLISHED CORRECTLY AND COMPLETELY WILL BE PROCESSED.
                          </td>
                          <td colSpan={1}></td>
                          <td
                            colSpan={15}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            COURSE APPLIED FOR (Preferred Course):
                          </td>
                        </tr>

                        {/* Second row: Course & Major */}
                        <tr>
                          <td colSpan={1}></td>
                          <td
                            colSpan={15}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            Course & Major:
                          </td>
                        </tr>


                      </tbody>
                    </table>
                  </td>
                </tr>

                <br />
                <tr>
                  {/* Entry Status Section */}
                  <td colSpan={20} style={{
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    verticalAlign: "top"
                  }}>
                    <div style={{ marginBottom: "5px" }}>ENTRY STATUS</div><br />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      ( ) Currently Enrolled as Grade 12 Student <br />
                      ( )  Senior High School Graduate <br />
                      ( ) ALS Passer (equivalent to Senior High)
                    </div>
                  </td>

                  {/* Date Section */}
                  <td colSpan={20} style={{
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    verticalAlign: "top"
                  }}>
                    <br />
                    <br />
                    <div>
                      Date of Graduation:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "66.7%",
                          marginLeft: "10px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      Year Graduated:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "70.6%",
                          marginLeft: "15px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      ( ) Transferee from:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "67%",
                          marginLeft: "10px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <br />

                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}PERSONAL INFORMATION (Please print your name as written in your NSO/PSA Birth Certificate)
                      </b>

                    </b>
                  </td>
                </tr>
                <br />

                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "15px", paddingTop: "5px" }}>
                    <span style={{ fontWeight: "bold", marginRight: "30px" }}>Name:</span>{" "}
                    <span style={{ display: "inline-block", borderBottom: "1px solid black", width: "85%", paddingLeft: "10px" }}>
                      {/* Full name goes here */}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "14px", paddingTop: "2px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "87%", marginLeft: "45px" }}>
                      <span>Last Name</span>
                      <span>Given Name</span>
                      <span>Middle Name</span>
                      <span>Middle Initial</span>
                      <span>Ext. Name</span>
                    </div>
                  </td>
                </tr>
                <br />

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Gender */}
                  <td colSpan={13}>
                    <b>Gender:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "120px",
                        marginLeft: "40px"
                      }}
                    >
                      {/* M */}
                    </span>
                  </td>

                  {/* Civil Status */}
                  <td colSpan={14}>
                    <b>Civil Status:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px"
                      }}
                    >
                      {/* Single */}
                    </span>
                  </td>

                  {/* Date of Birth */}
                  <td colSpan={13}>
                    <b>Date of Birth:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "100px",
                        marginLeft: "25px"
                      }}
                    >
                      {/* June 26, 2003 */}
                    </span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Gender */}
                  <td colSpan={13}>
                    <b>Place of Birth:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "120px",
                        marginLeft: "10px"
                      }}
                    >
                      {/* M */}
                    </span>
                  </td>

                  {/* Civil Status */}
                  <td colSpan={14}>
                    <b>Nationality:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px"
                      }}
                    >
                      {/* Single */}
                    </span>
                  </td>

                  {/* Date of Birth */}
                  <td colSpan={13}>
                    <b>Religion:</b>{" "}
                    <span
                      style={{
                        
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "100px",
                        marginLeft: "60px"
                      }}
                    >
                      {/* June 26, 2003 */}
                    </span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Cel / Tel No. */}
                  <td colSpan={20}>
                    <b>Cel / Tel No.:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "280px", // Adjust width as needed
                        marginLeft: "10px"
                      }}
                    >
                      {/* /0283738018 */}
                    </span>
                  </td>

                  {/* Email Address */}
                  <td colSpan={20}>
                    <b>Email Address:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "240px", // Adjust width as needed
                        marginLeft: "10px"
                      }}
                    >
                      {/* markmontano522@gmail.com */}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "15px", paddingTop: "5px" }}>
                    <span style={{ fontWeight: "bold", marginRight: "30px" }}>Permanent Address:</span>{" "}
                    <span style={{ display: "inline-block", borderBottom: "1px solid black", width: "75%", paddingLeft: "10px" }}>
                      {/* Full name goes here */}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "14px", paddingTop: "2px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "85%", marginLeft: "45px" }}>
                      <span>No.</span>
                      <span>Street</span>
                      <span>Barangay</span>
                      <span>City</span>
                      <span>Province</span>
                      <span>Zipcode</span>
                    </div>
                  </td>
                </tr>
                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b style={{ marginRight: "50px" }}>Residence:</b>{" "}
                    <span style={{ marginRight: "20px" }}>( ) With Parents</span>
                    <span style={{ marginRight: "20px" }}>( ) With Relatives</span>
                    <span style={{ marginRight: "20px" }}>( ) With Guardian</span>
                    <span>( ) Boarding</span>
                  </td>
                </tr>
                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Are you a member of any indigenous group?</b>{" "}
                    ( ) YES{" "}
                    ( ) NO{" "}
                    If YES, please specify{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "235px", // Adjust width as needed
                        marginLeft: "10px"
                      }}
                    ></span>
                  </td>
                </tr>
                <br />

                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}FAMILY BACKGROUND
                      </b>

                    </b>
                  </td>
                </tr>
                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Father's Name:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "350px", marginLeft: "10px", marginRight: "15px" }}></span>{" "}
                    ( ) Living ( ) Deceased
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Contact No:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "145px", marginLeft: "10px" }}></span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Mother's Name:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "350px", marginLeft: "10px", marginRight: "15px" }}></span>{" "}
                    ( ) Living ( ) Deceased
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Contact No:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "145px", marginLeft: "10px" }}></span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Guardian's Name:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "200px", marginLeft: "10px" }}></span>{" "}
                    <b>Relationship to the Applicant:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "220px", marginLeft: "10px" }}></span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "150px", marginLeft: "10px" }}></span>{" "}
                    <b>Contact No:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "145px", marginLeft: "10px" }}></span>
                  </td>
                </tr>
                <br />








                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}EDUCATIONAL BACKGROUND
                      </b>

                    </b>
                  </td>
                </tr>
                <br />
                {/* Line 1 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Last school attended or where you are currently completing Secondary Level Education:</b>
                  </td>
                </tr>

                {/* Line 2 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Name of School:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "653px" }}></span>
                  </td>
                </tr>

                {/* Line 3 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={20}>
                    <b>Complete Address:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "225px" }}></span>
                  </td>
                  <td colSpan={20}>
                    <b>Learner's Reference No.:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "215px" }}></span>
                  </td>
                </tr>

                {/* Line 4 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Do you have any PHYSICAL DISABILITY OR CONDITION that requires special attention or</b>
                  </td>
                </tr>

                {/* Line 5 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>would make it difficult for you to take a regular test?</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(  ) NO&nbsp;&nbsp;( ) YES (specify):{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "235px" }}></span>
                  </td>
                </tr>


                <br />


                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        border: "2px solid black",
                        fontStyle: 'italic'
                      }}>
                        {"\u00A0\u00A0"}ATTESTATION
                      </b>

                    </b>
                  </td>
                </tr>

                <table
                  style={{
                    border: "2px solid black",
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
                        colSpan={40}
                        style={{
                          height: "0.2in",
                          fontSize: "12px",
                          textAlign: "justify",
                          color: "black",
                          fontFamily: "arial",
                          borderRight: "2px solid black",

                          padding: "8px", // added padding for readability
                          lineHeight: "1.5",
                        }}
                      >
                        <strong>
                          I certify that the information given above is true, complete, and accurate to the best of my knowledge and belief.
                          <br />
                          I promise to abide by the rules and regulations of Eulogio "Amang" Rodriguez Institute of Science and Technology
                          regarding the ECAT and my possible admission.
                          <br />
                          <br />
                          I am aware that any false or misleading information and/or statement may result in the refusal or disqualification
                          of my admission to the Institution.
                        </strong>
                      </td>
                    </tr>

                    <tr>
                      {/* Applicant Signature Section */}
                      <td colSpan={20} style={{

                        textAlign: "center",
                        padding: "8px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        verticalAlign: "top"

                      }}>
                        <input
                          type="text"
                          value={"__________________________________________________"}
                          style={{
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12px',
                            textDecoration: "underline",
                            width: "98%",
                            border: "none",
                            outline: "none",
                            background: "none"
                          }}
                          readOnly
                        />
                        <br />
                        Applicant Date<br />
                        <span style={{ fontWeight: "normal" }}>(signature over printed name)</span>
                      </td>

                      {/* Date Section */}
                      <td colSpan={20} style={{

                        textAlign: "center",
                        padding: "8px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        verticalAlign: "top",
                        borderRight: "2px solid black",
                      }}>
                        <input
                          type="text"
                          value={"_________________________________"}
                          style={{
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12px',
                            textDecoration: "underline",
                            width: "98%",
                            border: "none",
                            outline: "none",
                            background: "none"
                          }}
                          readOnly
                        />
                        <br />
                        Date
                        <input
                          type="text"
                          style={{
                            marginTop: "5px",
                            width: "100%",
                            border: "none",
                            outline: "none",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <tr>
                  <td colSpan={40} style={{ padding: 0, border: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "Arial, sans-serif",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        {/* Main text cell and right-side top row */}
                        <tr>
                          <td
                            colSpan={30}
                            rowSpan={3}
                            style={{
                              border: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "12px",
                              verticalAlign: "top",
                            }}
                          >
                            This document is a sole property of Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST, Manila).
                            Any disclosure, unauthorized reproduction or use is strictly prohibited except with permission from EARIST Manila.
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              borderLeft: "2px solid black",
                              borderTop: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 1 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              borderRight: "2px solid black",
                              borderTop: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 1 right side */}
                          </td>
                        </tr>

                        {/* Second row on right side */}
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 2 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 2 right side */}
                          </td>
                        </tr>

                        {/* Third row on right side */}
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 3 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 3 right side */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>



              </tbody>
            </table>


          </form>
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

        </Container>

      </Box >
    </div>
  );
};

export default ECATApplicationForm;