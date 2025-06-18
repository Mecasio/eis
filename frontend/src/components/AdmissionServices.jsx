import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Button, Paper, TextField, Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import FreeTuitionImage from "../assets/FREETUITION.png";
import EaristLogo from "../assets/EaristLogo.png";
import React from "react";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const SearchStudentCOR = () => {

    const getPersonIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            console.log("Decoded Token: ", decoded);
            return decoded.person_id; // Make sure your token contains this field
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
              overflow: hidden;
            }

            .print-container {
              width: 115%;
              height: 100%;
              box-sizing: border-box;
              transform: scale(0.85);
              transform-origin: top left;
                     margin-left: 10px;
            }

            input[type="checkbox"] {
              width: 12px;
              height: 12px;
              transform: scale(1);
              margin: 2px;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            button {
              display: none;
            }

              /* FIX ICON SIZE ON PRINT */
        svg.MuiSvgIcon-root {
          width: 50px !important;
          height: 50xpx !important;
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
                <h1 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "Left", color: "maroon", marginTop: "25px" }}> ADMISSION SERVICES</h1>
                <hr style={{ border: "1px solid #ccc", width: "37%" }} />
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

            <Container className="mt-8">

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

                        <br />

                        <div className="section">

                            <Container>
                                <div style={{
                                    width: "8in", // matches table width assuming 8in for 40 columns
                                    maxWidth: "100%",
                                    margin: "0 auto", // center the content
                                    fontFamily: "Times New Roman",
                                    boxSizing: "border-box",
                                    padding: "10px 0", // reduced horizontal padding
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
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    objectFit: "contain",
                                                    marginLeft: "10px",
                                                    marginTop: "-25px"
                                                }}
                                            />
                                        </div>

                                        <div style={{
                                            flexGrow: 1,
                                            textAlign: "center",
                                            fontSize: "12px",
                                            fontFamily: "Arial",
                                            lineHeight: 1.4,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        }}>
                                            <div style={{
                                                marginLeft: "-145px",
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                letterSpacing: '1px',
                                                fontWeight: "normal"
                                            }}>
                                                Republic of the Philippines
                                            </div>

                                            <div style={{
                                                marginLeft: "-145px",
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                letterSpacing: '2px'
                                            }}>
                                                <b>EULOGIO "AMANG" RODRIGUEZ</b>
                                            </div>

                                            <div style={{
                                                marginLeft: "-145px",
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                letterSpacing: '2px'
                                            }}>
                                                <b>INSTITUTE OF SCIENCE AND TECHNOLOGY</b>
                                            </div>

                                            <div style={{
                                                marginLeft: "-145px",
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                letterSpacing: '1px',
                                                fontWeight: "normal"
                                            }}>
                                                Nagtahan, Sampaloc, Manila 1008
                                            </div>

                                            <br />

                                            <div style={{
                                                fontSize: "18px",
                                                fontFamily: "Arial",
                                                fontWeight: "bold",
                                                marginBottom: "5px",
                                                marginTop: "0",
                                                marginLeft: "-145px",
                                                textAlign: "center",
                                            }}>
                                                ADMISSION SERVICES
                                                <br />
                                                HELP US SERVE YOU BETTER!
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Container>


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
                                        <td colSpan="2" style={{ textAlign: "justify", fontSize: "11px" }}>
                                            This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices.
                                            Your feedback on your recently concluded transaction will help this office provide a better service.
                                            Personal information shared will be kept confidential and you always have the option to not answer this form.
                                        </td>
                                    </tr>
                                    <br />

                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            width: "8in",
                                            margin: "0 auto",
                                            textAlign: "left",
                                            tableLayout: "fixed",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ fontSize: "12px" }}>
                                                    Client Type:
                                                    <label style={{ marginLeft: "20px", marginRight: "10px" }}>
                                                        <input type="checkbox" name="clientType" /> Citizens
                                                    </label>
                                                    <label style={{ marginRight: "10px" }}>
                                                        <input type="checkbox" name="clientType" /> Business
                                                    </label>
                                                    <label>
                                                        <input type="checkbox" name="clientType" /> Government (Employee or Another Agency)
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            width: "8in",
                                            margin: "0 auto",
                                            textAlign: "left",
                                            tableLayout: "fixed",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <td colSpan="2">
                                                    <label style={{ marginRight: "10px" }}>Date:</label>
                                                    <input
                                                        type="text"
                                                        name="date"
                                                        style={{
                                                            border: "none",
                                                            borderBottom: "1px solid black",
                                                            outline: "none",
                                                            width: "150px",
                                                            marginRight: "10px"
                                                        }}
                                                    />

                                                    <label style={{ marginRight: "10px" }}>Sex:</label>
                                                    <label style={{ marginRight: "10px" }}>
                                                        <input type="checkbox" name="sex" value="Male" /> Male
                                                    </label>
                                                    <label style={{ marginRight: "20px" }}>
                                                        <input type="checkbox" name="sex" value="Female" /> Female
                                                    </label>

                                                    <label style={{ marginRight: "10px" }}>Age:</label>
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        style={{
                                                            border: "none",
                                                            borderBottom: "1px solid black",
                                                            outline: "none",
                                                            width: "60px",
                                                            marginRight: "20px"
                                                        }}
                                                    />

                                                    <label style={{ marginRight: "10px" }}>Region of Residence:</label>
                                                    <input
                                                        type="text"
                                                        name="region"
                                                        style={{
                                                            border: "none",
                                                            borderBottom: "1px solid black",
                                                            outline: "none",
                                                            width: "157px"
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            width: "8in",
                                            margin: "0 auto",
                                            textAlign: "left",
                                            tableLayout: "fixed",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ fontSize: "12px", fontFamily: "Arial", marginRight: "10px", }}>
                                                    Service Availed:
                                                    <label style={{ fontSize: "12px", marginLeft: "10px" }}>
                                                        <input type="checkbox" name="admission" /> Admission
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            width: "8in",
                                            margin: "0 auto",
                                            textAlign: "left",
                                            tableLayout: "fixed",
                                        }}
                                    >
                                        <tbody>
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: "center" }}>

                                                    <span style={{ fontWeight: "bold", fontSize: "12px", marginRight: "10px", }}>Others:</span>
                                                    <span
                                                        style={{
                                                            display: "inline-block",

                                                            borderBottom: "1px solid black",
                                                            width: "40%",
                                                            height: "20px",
                                                            verticalAlign: "bottom",
                                                            marginTop: "5px"
                                                        }}
                                                    >

                                                    </span>

                                                    <span
                                                        style={{
                                                            display: "inline-block",
                                                            marginLeft: "5px",
                                                            borderBottom: "1px solid black",
                                                            width: "100%",
                                                            height: "20px",
                                                            verticalAlign: "bottom",
                                                            marginTop: "5px"
                                                        }}
                                                    >

                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    <br />

                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            width: "8in",
                                            margin: "0 auto",
                                            textAlign: "left",
                                            tableLayout: "fixed",
                                        }}
                                    >
                                        <tbody>
                                            {/* INSTRUCTIONS */}
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: 'justify', fontSize: '12px' }}>
                                                    <strong>INSTRUCTIONS:</strong> Check mark (✓) your answer to the Citizen's Charter (CC) questions. The Citizen's Charter is an official document that reflects the service of a government agency/office including its requirements, fees, and processing times among others.
                                                </td>
                                            </tr>

                                            {/* CC1 QUESTION */}
                                            <tr>
                                                <td colSpan={2} style={{ marginTop: "10px", fontWeight: 'bold', fontSize: '12px', textAlign: 'justify' }}>
                                                    CC1 - Which of the following best describes your awareness of a CC?
                                                </td>
                                            </tr>

                                            {/* CC1 OPTIONS */}
                                            {[
                                                "1. I know what a CC is and I saw this office's CC.",
                                                "2. I know what a CC is but I did NOT see this office's CC.",
                                                "3. I learned of the CC only when I saw this office's CC.",
                                                "4. I do not know what a CC is and I did not see one in this office. (Answer 'N/A' on CC2 and CC3)"
                                            ].map((text, index) => (
                                                <tr key={`cc1-${index}`}>
                                                    <td colSpan={2}>
                                                        <label style={{ display: 'flex', alignItems: 'center', marginLeft: "20px", fontSize: "12px" }}>
                                                            <input type="checkbox" name="cc1" style={{ marginRight: '8px' }} />
                                                            {text}
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}

                                            {/* CC2 QUESTION */}
                                            <tr>
                                                <td colSpan={2} style={{ fontWeight: 'bold', fontSize: '12px', textAlign: 'justify' }}>
                                                    CC2 - If aware of CC (answered 1-3 in CC1), would you say that the CC of this office was...?
                                                </td>
                                            </tr>

                                            {/* CC2 OPTIONS */}
                                            {[
                                                ["1. Easy to see", "4. Not visible at all"],
                                                ["2. Somewhat easy to see", "5. N/A"],
                                                ["3. Difficult to see", ""]
                                            ].map((row, i) => (
                                                <tr key={`cc2-${i}`}>
                                                    {row.map((text, j) => (
                                                        <td key={j} style={{ width: '50%' }}>
                                                            {text && (
                                                                <label style={{ display: 'flex', alignItems: 'center', marginLeft: "20px", fontSize: "12px" }}>
                                                                    <input type="checkbox" name="cc2" style={{ marginRight: '8px' }} />
                                                                    {text}
                                                                </label>
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}

                                            {/* CC3 QUESTION */}
                                            <tr>
                                                <td colSpan={2} style={{ fontWeight: 'bold', fontSize: '12px', textAlign: 'justify' }}>
                                                    CC3 - If aware of CC (answered codes 1-3 in CC1), how much did the CC help you in your transaction?
                                                </td>
                                            </tr>

                                            {/* CC3 OPTIONS */}
                                            {[
                                                ["1. Helped very much", "3. Did not help"],
                                                ["2. Somewhat helped", "4. N/A"]
                                            ].map((row, i) => (
                                                <tr key={`cc3-${i}`}>
                                                    {row.map((text, j) => (
                                                        <td key={j} style={{ width: '50%' }}>
                                                            <label style={{ display: 'flex', alignItems: 'center', marginLeft: "20px", fontSize: "12px" }}>
                                                                <input type="checkbox" name="cc3" style={{ marginRight: '8px' }} />
                                                                {text}
                                                            </label>

                                                        </td>

                                                    ))}

                                                </tr>



                                            ))}

                                        </tbody>
                                    </table>
                                    <br />



                                </tbody>
                            </table>

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
                                    <tr>
                                        <td colSpan="40" style={{ textAlign: 'justify', fontSize: '12px' }}>
                                            <strong>INSTRUCTIONS:</strong> <span> For SQD 0–8, please put a check mark ( ✓ ) on the column that best corresponds to your answer.</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


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
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",
                                                fontWeight: "bold",
                                                fontSize: "12px",
                                            }}
                                        >


                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "14px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <MoodBadIcon style={{ fontSize: 48, color: "black", marginBottom: 4 }} /><span>Strongly Disagree</span>
                                                <br />
                                                <br />


                                            </div>
                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "14px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <SentimentVeryDissatisfiedIcon style={{ fontSize: 48, color: "black", marginBottom: 4 }} /><span>Disagree</span>
                                                <br />
                                                <br />
                                                <br />


                                            </div>
                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "14px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <SentimentSatisfiedIcon style={{ fontSize: 48, color: "black", marginBottom: 4 }} /><span>Neither Agree nor Disagree</span>

                                            </div>
                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "14px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <SentimentSatisfiedAltIcon style={{ fontSize: 48, color: "black", marginBottom: 4 }} />
                                                <span>Agree</span>
                                                <br />
                                                <br />

                                                <br />
                                            </div>
                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "14px",
                                                verticalAlign: "middle",
                                            }}
                                        >

                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <SentimentVerySatisfiedIcon style={{ fontSize: 48, color: "black", marginBottom: 4 }} />
                                                <span>Strongly Agree</span>
                                                <br />
                                                <br />

                                            </div>
                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "center",
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "12px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <div style={{ fontSize: "30px", fontWeight: "bold" }}>N/A</div>
                                                <br />
                                                <span>Not Applicable</span>



                                                <br />
                                                <br />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "12px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD0. I am satisfied with the service that I availed.


                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD1. I spent a reasonable amount of time for my transaction

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                            }}
                                        >
                                            SQD2. The office followed the transaction's requirements and steps based on the information provided.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD3. The steps (including payment) I needed to do for my transaction were easy and simple.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "11px",
                                            }}
                                        >
                                            SQD4. I easily found information about my transaction from the office or its website.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD5. I paid reasonable amount of fees for my transaction. (if service was free, mark the 'N/A' column)

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD6. I feel the office was fair to everyone, or "walang palakasan", during my transaction.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD7. I was treated courteously by the staff, and (if asked for help) the staff was helpful.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={16}
                                            style={{
                                                border: "1px solid black",
                                                textAlign: "left",
                                                padding: "8px",

                                                fontSize: "11px",
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >
                                            SQD8. I got what I needed from the government office, or  (if denied) denial of request was sufficiently explained to me.

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "8px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>

                                        <td
                                            colSpan={4}
                                            style={{
                                                border: "1px solid black",
                                                padding: "12px",
                                                textAlign: "Center",
                                            }}
                                        >

                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={40} style={{ textAlign: "left", fontFamily: "Times New Roman", fontSize: "12px", paddingTop: "5px" }}>
                                            <span style={{ fontWeight: "bold", marginRight: "10px", paddingBottom: "20px" }}>Suggestion on how we can further improve our services (optional):</span>{" "}

                                            <br />
                                            <span style={{ marginTop: "20px", display: "inline-block", borderBottom: "1px solid black", width: "100%", paddingLeft: "10px" }}>
                                                {/* Full name goes here */}
                                            </span>
                                        </td>
                                    </tr>


                                    <tr>
                                        <td colSpan={40} style={{ textAlign: "left", fontFamily: "Times New Roman", fontSize: "12px", paddingTop: "5px" }}>
                                            <span style={{ fontWeight: "bold", marginRight: "10px" }}>Email Address: (optional)</span>{" "}

                                            <span style={{ marginTop: "15px", display: "inline-block", borderBottom: "1px solid black", width: "50%", paddingLeft: "10px" }}>
                                                {/* Full name goes here */}
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            <br />
                            <div style={{ fontSize: "20px", fontFamily: "Arial", textAlign: "Center" }}>THANK YOU!</div>



                        </div>
                    </div>

                </div>



            </Container>
        </Box>
    );
};

export default SearchStudentCOR;
