import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EaristLogo from "../assets/EaristLogo.png";
import { jwtDecode } from "jwt-decode";

const PersonalDataForm = () => {
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

  const [personID, setPersonID] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/person_table")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);



  const [shortDate, setShortDate] = useState("");
  const [longDate, setLongDate] = useState("");

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

      const formattedLong = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
      setLongDate(formattedLong);
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
              width: 110%;
              height: 100%;
              box-sizing: border-box;
              transform: scale(0.90);
              transform-origin: top left;
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

          <Container>

            <br />
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              padding: "10px 20px",
              width: "100%",
              boxSizing: "border-box"
            }}>
              {/* Wrapper to contain logo and text side by side without stretching */}
              <div style={{
                display: "flex",
                alignItems: "center"
              }}>
                {/* Logo */}
                <div style={{ flexShrink: 0, marginRight: "20px" }}>
                  <img
                    src={EaristLogo}
                    alt="Earist Logo"
                    style={{ width: "120px", height: "120px", objectFit: "contain" }}
                  />
                </div>

                {/* Header Text Block */}
                <div>
                  {/* Top Line: Republic */}
                  <div style={{
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "left",
                    marginBottom: "5px"
                  }}>
                    Republic of the Philippines
                  </div>

                  {/* Institute Name */}
                  <div style={{
                    textAlign: "center",
                    fontSize: "19px",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: "Arial, sans-serif",
                    marginBottom: "5px"
                  }}>
                    Eulogio "Amang" Rodriguez Institute of Science and Technology
                  </div>

                  {/* Horizontal Line */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
                    <hr style={{ width: "100%", maxWidth: "700px", border: "1px solid #000", margin: 0 }} />
                  </div>

                  {/* Office Name */}
                  <div style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif"
                  }}>
                    OFFICE OF STUDENT AFFAIRS AND SERVICES
                  </div>
                </div>
              </div>
            </div>


          </Container>
          <br />



          <form>

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

                {/* Title: PERSONAL DATA FORM */}
                <tr>
                  <td colSpan={40} style={{ textAlign: "center", padding: "10px" }}>
                    <span
                      style={{
                        fontSize: "25px",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Times new Roman",
                      }}
                    >
                      PERSONAL DATA FORM
                    </span>
                  </td>
                </tr>

                {/* Spacer */}


                {/* Section Title: I. PERSONAL INFORMATION */}


                <tr>
                  {/* Left side: Print Legibly with MUI checkboxes */}
                  <td colSpan={25} style={{ fontSize: "12px", fontFamily: "Arial", padding: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                        Print Legibly. Mark appropriate boxes.
                      </span>

                      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                          type="checkbox"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <span style={{ fontSize: "12px", fontFamily: "Arial" }}>With</span>
                      </label>

                      <div style={{ fontWeight: "bold", fontSize: "20px" }}>✓</div>
                    </div>
                  </td>




                  {/* Right side: Date input and label */}
                  <td colSpan={15} style={{ fontSize: "12px", fontFamily: "Arial", padding: "5px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <input
                        type="text"
                        value={shortDate}
                        readOnly
                        style={{
                          width: "75%",
                          textAlign: "center",
                          border: "none",
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          background: "none",
                          fontSize: "12px",
                          marginBottom: "2px",
                        }}
                      />
                      <div style={{ fontWeight: "bold", textAlign: "center" }}>
                        Date of Registration
                      </div>
                    </div>
                  </td>
                </tr>

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
                        textAlign: "left",
                        display: "block",
                        fontStyle: 'italic'
                      }}>
                        {"\u00A0\u00A0"}I. PERSONAL INFORMATION
                      </b>

                    </b>
                  </td>
                </tr>
                {/* SURNAME */}
                <tr>
                  <td colSpan={6} style={{ border: "1px solid black", textAlign: "center", padding: "8px", fontWeight: "bold", fontSize: "12px" }}>
                    SURNAME
                  </td>
                  <td colSpan={34} style={{ border: "1px solid black", padding: "8px" }}>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                      }}
                    />
                  </td>
                </tr>

                {/* FIRST NAME */}
                <tr>
                  <td colSpan={6} style={{ border: "1px solid black", textAlign: "center", padding: "8px", fontWeight: "bold", fontSize: "12px" }}>
                    FIRST NAME
                  </td>
                  <td colSpan={34} style={{ border: "1px solid black", padding: "8px" }}>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                      }}
                    />
                  </td>
                </tr>

                {/* MIDDLE NAME */}
                <tr>
                  {/* MIDDLE NAME */}
                  <td colSpan={6} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",

                  }}>
                    MIDDLE NAME
                  </td>

                  <td colSpan={19} style={{
                    border: "1px solid black",
                    padding: "8px",

                  }}>
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* NAME EXTENSION */}
                  <td colSpan={15} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    NAME EXTENSION (e.g. Jr., Sr.)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>


                {/* COURSE */}
                <tr>
                  {/* COURSE (COMPLETE NAME) */}
                  <td colSpan={30} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    COURSE (COMPLETE NAME)
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

                  {/* YEAR LEVEL */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    YEAR LEVEL (1,2,3,4,5)
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


                <tr>
                  {/* DATE OF BIRTH */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    DATE OF BIRTH (e.g. June 15, 2019)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* PLACE OF BIRTH */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    PLACE OF BIRTH
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* ETHNICITY */}
                  <td colSpan={14} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    ETHNICITY (e.g. Tagbanua, Palaw’an)<br />
                    Pangkat etniko / Kinaanibang pangkat
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>
                {/* STUDENT ID NUMBER */}
                <tr>
                  {/* STUDENT ID NUMBER */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    STUDENT ID NUMBER
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* LEARNER’S REFERENCE NUMBER */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    LEARNER’S REFERENCE NUMBER
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* DISABILITY */}
                  <td colSpan={14} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    DISABILITY
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  {/* SEX */}
                  <td
                    colSpan={20}
                    style={{
                      border: "1px solid black",
                      textAlign: "left",
                      padding: "8px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      verticalAlign: "top",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    SEX
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "40px",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "5px",
                      }}
                    >
                      <label style={{ fontSize: "12px", fontFamily: "Arial", display: "flex", alignItems: "center", gap: "5px" }}>
                        <input type="checkbox" style={{ width: "13px", height: "13px" }} />
                        Male
                      </label>
                      <label style={{ fontSize: "12px", fontFamily: "Arial", display: "flex", alignItems: "center", gap: "5px" }}>
                        <input type="checkbox" style={{ width: "13px", height: "13px" }} />
                        Female
                      </label>
                    </div>
                  </td>


                  {/* E-MAIL ADDRESS */}
                  <td colSpan={20} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top",
                    fontFamily: "Arial, sans-serif"
                  }}>
                    E-MAIL ADDRESS
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


                <tr>
                  <td
                    colSpan={18}
                    style={{
                      border: "1px solid black",
                      verticalAlign: "top",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "8px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    CIVIL STATUS
                    <div
                      style={{
                        marginTop: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {/* First 5 statuses - 2 per line */}
                      {["Single", "Married", "Widowed", "Separated", "Annulled"].map((status, index) => (
                        <label
                          key={status}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "50%", // Two per line
                            marginBottom: "6px",
                            fontSize: "12px",
                            fontFamily: "Arial",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ width: "13px", height: "13px", marginRight: "5px" }}
                          />
                          {status}
                        </label>
                      ))}

                      {/* Others, specify */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          fontSize: "12px",
                          fontFamily: "Arial",
                          marginTop: "5px",
                        }}
                      >
                        <label style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                          <input type="checkbox" style={{ width: "13px", height: "13px", marginRight: "5px" }} />
                          Others, specify:
                        </label>
                        <span
                          style={{
                            borderBottom: "1px solid black",
                            width: "150px",
                            display: "inline-block",
                          }}
                        ></span>
                      </div>
                    </div>
                  </td>


                  {/* PERMANENT / HOME ADDRESS */}
                  <td
                    colSpan={16}
                    style={{
                      border: "1px solid black",
                      verticalAlign: "top",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "8px",
                      fontFamily: "Arial, sans-serif",
                      textAlign: "left",
                    }}
                  >
                    PERMANENT / HOME ADDRESS
                    <input
                      type="text"
                      style={{

                        marginTop: "5px",
                        border: "none",

                        fontSize: "12px",
                        fontFamily: "Arial",
                        outline: "none",
                        padding: "2px 4px",
                      }}
                    />

                    {/* Divider line */}
                    <div
                      style={{
                        marginTop: "10px",
                        borderTop: "1px solid black",
                        paddingTop: "8px",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      HOUSEHOLD
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          marginTop: "5px",
                          border: "none",

                          fontSize: "12px",
                          fontFamily: "Arial",
                          outline: "none",
                          padding: "2px 4px",
                        }}
                      />

                    </div>
                  </td>


                  {/* ZIP CODE */}
                  <td colSpan={6} style={{
                    border: "1px solid black",
                    verticalAlign: "top",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "8px",
                    fontFamily: "Arial, sans-serif"
                  }}>
                    ZIP CODE

                  </td>
                </tr>


                <tr>
                  {/* CITIZENSHIP */}
                  <td colSpan={8} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    CITIZENSHIP
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* HEIGHT (m) */}
                  <td colSpan={6} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    HEIGHT (m)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* WEIGHT (kg) */}
                  <td colSpan={6} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    WEIGHT (kg)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* BLOOD TYPE */}
                  <td colSpan={6} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    BLOOD TYPE
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={14} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    PERMANENT CONTACT NUMBER
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>
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
                        textAlign: "left",
                        display: "block",
                        fontStyle: 'italic'
                      }}>
                        {"\u00A0\u00A0"}II. FAMILY BACKGROUND
                      </b>

                    </b>
                  </td>
                </tr>

                <tr>
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    FATHER'S NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    SURNAME / FAMILY NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    GIVEN NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    MIDDLE NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>










                <tr>
                  {/* MOTHER'S SURNAME (Not yet married) */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    MOTHER`S NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    SURNAME (Not yet married)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>

                  {/* MIDDLE NAME (Not yet married) */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    GIVEN NAME
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                  {/* MIDDLE NAME (Not yet married) */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    MIDDLE NAME (Not yet married)
                    <input
                      type="text"
                      style={{
                        marginTop: "5px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif"
                      }}
                    />
                  </td>
                </tr>







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
                        textAlign: "left",
                        display: "block",
                        fontStyle: 'italic'
                      }}>
                        {"\u00A0\u00A0"}FAMILY PER CAPITA INCOME
                      </b>

                    </b>
                  </td>
                </tr>

                {/* STUDENT ID NUMBER */}
                <tr>
                  {/* STUDENT ID NUMBER */}
                  <td colSpan={20} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    NAME OF FAMILY MEMBER

                  </td>

                  {/* LEARNER’S REFERENCE NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    OCCUPATION

                  </td>

                  {/* DISABILITY */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    verticalAlign: "top"
                  }}>
                    MONTHLY INCOME

                  </td>
                </tr>

                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    Father

                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>

                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    Mother

                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>



                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    Siblings

                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>



                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    1.

                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>



                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    2.

                  </td>


                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>



                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    3.

                  </td>

                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>



                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    4.

                  </td>


                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>


                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    5.

                  </td>


                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>


                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    6.

                  </td>


                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>
                </tr>


                <tr style={{ height: "5px" }}> {/* Set the height for the entire row */}
                  {/* FATHER'S SURNAME / FAMILY NAME */}
                  <td colSpan={7} style={{
                    border: "1px solid black",
                    textAlign: "right",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    7.

                  </td>


                  {/* GIVEN NAME */}
                  <td colSpan={13} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* MIDDLE NAME */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>


                  </td>

                  {/* PERMANENT CONTACT NUMBER */}
                  <td colSpan={10} style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "2px",  // Reduced padding to fit in 10px height
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    Total:


                  </td>
                </tr>




              </tbody>
            </table>


          </form>
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

export default PersonalDataForm;