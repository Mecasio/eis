import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography, Table, TableBody, TextareaAutosize, FormGroup, FormControlLabel, Checkbox, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from '@mui/icons-material/Error';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Dashboard4 = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [person, setPerson] = useState({
    cough: "", colds: "", fever: "", asthma: "", fainting: "",
    heartDisease: "", tuberculosis: "", frequentHeadaches: "", hernia: "", chronicCough: "", headNeckInjury: "", hiv: "", highBloodPressure: "", diabetesMellitus: "", allergies: "",
    cancer: "", smoking: "", alcoholDrinking: "", hospitalized: "", hospitalizationDetails: "", medications: "", hadCovid: "", covidDate: "", vaccine1Brand: "", vaccine1Date: "",
    vaccine2Brand: "", vaccine2Date: "", booster1Brand: "", booster1Date: "", booster2Brand: "", booster2Date: "", chestXray: "", cbc: "", urinalysis: "", otherworkups: "",
    symptomsToday: "", remarks: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  // dot not alter
  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("person_id");

    if (storedUser && storedRole && storedID) {
      setUser(storedUser);
      setUserRole(storedRole);
      setUserID(storedID);

      if (storedRole !== "applicant") {
        window.location.href = "/login";
      } else {
        fetchPersonData(storedID);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);
  // dot not alter
  const fetchPersonData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/person/${id}`);
      setPerson(res.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error fetching person data.");
      setLoading(false);
    }
  };
  // dot not alter
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPerson((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  // dot not alter
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/person/${userID}`, person);
      setMessage("Information updated successfully.");
    } catch (error) {
      setMessage("Failed to update information.");
    }
  };

  const steps = [
    { label: "Personal Information", icon: <PersonIcon />, path: "/dashboard1" },
    { label: "Family Background", icon: <FamilyRestroomIcon />, path: "/dashboard2" },
    { label: "Educational Attainment", icon: <SchoolIcon />, path: "/dashboard3" },
    { label: "Health Medical Records", icon: <HealthAndSafetyIcon />, path: "/dashboard4" },
    { label: "Other Information", icon: <InfoIcon />, path: "/dashboard5" },
  ];

  const [activeStep, setActiveStep] = useState(3);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));



  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  const inputStyle = {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px",
    boxSizing: "border-box",
    backgroundColor: "white",
    color: "black",
  };

  // dot not alter
  return (
    <Box sx={{ height: "calc(100vh - 140px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>
      <br />


      <Container>
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Left: Instructions (75%) */}
          <Box sx={{ width: "75%", padding: "10px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: "#fffaf5",
                border: "1px solid #6D2323",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#6D2323",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  minWidth: "36px",
                }}
              >
                <ErrorIcon sx={{ color: "white", fontSize: "20px" }} />
              </Box>

              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#3e3e3e",
                  lineHeight: 1.6,
                }}
              >
                <strong>1.</strong> Kindly type <strong>'NA'</strong> in boxes where there are no possible answers to the information being requested.
                <br />
                <strong>2.</strong> To use the letter <strong>'Ñ'</strong>, press <kbd>ALT</kbd> + <kbd>165</kbd>; for <strong>'ñ'</strong>, press <kbd>ALT</kbd> + <kbd>164</kbd>.
              </Typography>
            </Box>

          </Box>

          {/* Right: Links (25%) */}
          <Box sx={{ width: "25%", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Link to="/personal_data_form" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>Personal Data Form</Link>
            <Link to="/ecat_application_form" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>ECAT Application Form</Link>
            <Link to="/admission_form_process" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>Admission Form Process</Link>
            <Link to="/admission_services" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>Application/Student Satisfactory Survey</Link>
            <Link to="/office_of_the_registrar" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>Application For EARIST College Admission</Link>
          </Box>
        </Box>

        <Container>
          <h1 style={{ fontSize: "50px", fontWeight: "bold", textAlign: "center", color: "maroon", marginTop: "25px" }}>APPLICANT FORM</h1>
          <div style={{ textAlign: "center" }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
        </Container>
        <br />

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", px: 4 }}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Wrap the step with Link for routing */}
              <Link to={step.path} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Icon */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: activeStep === index ? "#6D2323" : "#E8C999",
                      color: activeStep === index ? "#fff" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </Box>

                  {/* Step Label */}
                  <Typography
                    sx={{
                      mt: 1,
                      color: activeStep === index ? "#6D2323" : "#000",
                      fontWeight: activeStep === index ? "bold" : "normal",
                      fontSize: 14,
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>
              </Link>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    height: "2px",
                    backgroundColor: "#6D2323",
                    flex: 1,
                    alignSelf: "center",
                    mx: 2,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <br />

        <form>
          <Container
            maxWidth="100%"
            sx={{
              backgroundColor: "#6D2323",
              border: "2px solid black",
              maxHeight: "500px",
              overflowY: "auto",
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
              padding: "4px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 4: Health and Medical Records</Typography>
            </Box>
          </Container>

          <Container maxWidth="100%" sx={{ backgroundColor: "white", border: "2px solid black", padding: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Health and Mecidal Record:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />


            {/* This should be a checkbox instead of a text input */}
            <p style={{ fontWeight: "600" }}>
              I. Do you have any of the following symptoms today?
              <FormGroup row sx={{ ml: 2 }}>
                {["cough", "colds", "fever"].map((symptom) => (
                  <FormControlLabel
                    key={symptom}
                    control={
                      <Checkbox
                        checked={person[symptom] === 1 || person[symptom] === true}
                        onChange={(e) => handleChange(e, symptom)}
                      />
                    }
                    label={symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                    sx={{ ml: 5 }}
                  />
                ))}
              </FormGroup>
            </p>
            <br />

            <p style={{ fontWeight: "600" }}>
              II. MEDICAL HISTORY: Have you suffered from, or been told you had, any of the following conditions:
            </p>

            <table
              style={{
                width: "100%",
                border: "1px solid black",
                borderCollapse: "collapse",
                fontFamily: "Arial, Helvetica, sans-serif",
                tableLayout: "fixed",
              }}
            >
              <tbody>
                {/* Headers */}
                <tr>
                  <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                  <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>

                  <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                  <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>

                  <td colSpan={15} style={{ border: "1px solid black", height: "0.25in" }}></td>
                  <td colSpan={12} style={{ border: "1px solid black", textAlign: "center" }}>Yes or No</td>
                </tr>

                {/* Rows (in groups of 3) */}
                {[
                  { label: "Asthma", key: "asthma" },
                  { label: "Fainting Spells and seizures", key: "faintingSpells" },
                  { label: "Heart Disease", key: "heartDisease" },
                  { label: "Tuberculosis", key: "tuberculosis" },
                  { label: "Frequent Headaches", key: "frequentHeadaches" },
                  { label: "Hernia", key: "hernia" },
                  { label: "Chronic cough", key: "chronicCough" },
                  { label: "Head or neck injury", key: "headNeckInjury" },
                  { label: "H.I.V", key: "hiv" },
                  { label: "High blood pressure", key: "highBloodPressure" },
                  { label: "Diabetes Mellitus", key: "diabetesMellitus" },
                  { label: "Allergies", key: "allergies" },
                  { label: "Cancer", key: "cancer" },
                  { label: "Smoking of cigarette/day", key: "smokingCigarette" },
                  { label: "Alcohol Drinking", key: "alcoholDrinking" },
                ]
                  .reduce((rows, item, idx, arr) => {
                    if (idx % 3 === 0) rows.push(arr.slice(idx, idx + 3));
                    return rows;
                  }, [])
                  .map((rowGroup, rowIndex) => (
                    <tr key={rowIndex}>
                      {rowGroup.map(({ label, key }) => (
                        <React.Fragment key={key}>
                          <td colSpan={15} style={{ border: "1px solid black", padding: "4px" }}>{label}</td>
                          <td colSpan={12} style={{ border: "1px solid black", padding: "4px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={person[key] === 1}
                                    onChange={(e) => handleMedicalHistoryChange(e, key, 1)}
                                  />
                                }
                                label="Yes"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={person[key] === 0}
                                    onChange={(e) => handleMedicalHistoryChange(e, key, 0)}
                                  />
                                }
                                label="No"
                              />
                            </div>
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <Box mt={1} flexDirection="column" display="flex" alignItems="flex-start">
              <Box mt={1} flexDirection="column" display="flex" alignItems="flex-start">
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <Typography sx={{ marginRight: '16px' }}>
                    Do you have any previous history of hospitalization or operation?
                  </Typography>
                  <Box display="flex" gap="16px">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={person.hospitalized === 1}
                          onChange={() =>
                            handleChange({
                              target: { name: 'hospitalized', value: 1 },
                            })
                          }
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={person.hospitalized === 0}
                          onChange={() =>
                            handleChange({
                              target: { name: 'hospitalized', value: 0 },
                            })
                          }
                        />
                      }
                      label="No"
                    />
                  </Box>
                </Box>
              </Box>



            </Box>
            <Box width="100%" maxWidth={500} display="flex" alignItems="center">
              <Typography component="label" sx={{ mr: 1, whiteSpace: 'nowrap' }}>
                IF YES, PLEASE SPECIFY:
              </Typography>
              <TextField
                fullWidth
                name="specificCondition"
                placeholder=""
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={person.hospitalizationDetails || ""}
              />
            </Box>

            <br />




            <p style={{ fontWeight: "600" }}>III. MEDICATION:</p>
            <Box mb={2}>
              <TextField
                fullWidth
                multiline
                minRows={3}  // about 75px height

                name="medications"
                variant="outlined"
                size="small"
                value={person.medications || ""}
                onChange={handleChange}
                sx={{ height: 75, '& .MuiInputBase-root': { height: '100%' } }}  // enforce height
              />
            </Box>

            {/* IV. COVID PROFILE */}
            <div>
              <p style={{ fontWeight: "600" }}>IV. COVID PROFILE:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        height: "90px",
                        fontSize: "100%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} flexWrap="nowrap">
                        <span>A. Do you have history of COVID-19?</span>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="covidHistoryYes"
                              checked={person.hadCovid === 1}
                              onChange={(e) =>
                                setPerson({
                                  ...person,
                                  hadCovid: e.target.checked ? 1 : 0,
                                })
                              }
                            />
                          }
                          label="YES"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="covidHistoryNo"
                              checked={person.hadCovid === 0}
                              onChange={(e) =>
                                setPerson({
                                  ...person,
                                  hadCovid: e.target.checked ? 0 : 1,
                                })
                              }
                            />
                          }
                          label="NO"
                        />

                        <span>IF YES, WHEN:</span>
                        <input
                          type="date"
                          value={person.covidDate || ""}
                          onChange={(e) =>
                            setPerson({
                              ...person,
                              covidDate: e.target.value,
                            })
                          }
                          style={{
                            width: "200px",
                            height: "50px",
                            fontSize: "16px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    </td>
                  </tr>

                  {/* B. COVID Vaccinations */}
                  <tr>
                    <td
                      style={{
                        fontSize: "100%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                        B. COVID Vaccinations:
                      </div>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          tableLayout: "fixed",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", width: "20%" }}></th>
                            <th style={{ textAlign: "center" }}>1st Dose</th>
                            <th style={{ textAlign: "center" }}>2nd Dose</th>
                            <th style={{ textAlign: "center" }}>Booster 1</th>
                            <th style={{ textAlign: "center" }}>Booster 2</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td style={{ padding: "4px 0" }}>Brand</td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="vaccine1Brand"
                                value={person.vaccine1Brand || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, vaccine1Brand: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="vaccine2Brand"
                                value={person.vaccine2Brand || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, vaccine2Brand: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="booster1Brand"
                                value={person.booster1Brand || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, booster1Brand: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="text"
                                name="booster2Brand"
                                value={person.booster2Brand || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, booster2Brand: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td style={{ padding: "4px 0" }}>Date</td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="vaccine1Date"
                                value={person.vaccine1Date || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, vaccine1Date: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="vaccine2Date"
                                value={person.vaccine2Date || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, vaccine2Date: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="booster1Date"
                                value={person.booster1Date || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, booster1Date: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>

                            <td style={{ padding: "4px" }}>
                              <input
                                type="date"
                                name="booster2Date"
                                value={person.booster2Date || ""}
                                onChange={(e) =>
                                  setPerson({ ...person, booster2Date: e.target.value })
                                }
                                style={inputStyle}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            {/* V. Please Indicate Result of the Following (Form Style, Table Layout) */}
            <div>
              <p className="font-semibold mb-2">V. Please Indicate Result of the Following:</p>
              <table className="w-full border border-black border-collapse table-fixed">
                <tbody>
                  {/* Chest X-ray */}
                  <tr>
                    <td className="border border-black p-2 w-1/3 font-medium">Chest X-ray:</td>
                    <td className="border border-black p-2 w-2/3">
                      <input
                        type="text"
                        name="chestXray"
                        value={person.chestXray || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </td>
                  </tr>

                  {/* CBC */}
                  <tr>
                    <td className="border border-black p-2 font-medium">CBC:</td>
                    <td className="border border-black p-2">
                      <input
                        type="text"
                        name="cbc"
                        value={person.cbc || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </td>
                  </tr>

                  {/* Urinalysis */}
                  <tr>
                    <td className="border border-black p-2 font-medium">Urinalysis:</td>
                    <td className="border border-black p-2">
                      <input
                        type="text"
                        name="urinalysis"
                        value={person.urinalysis || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </td>
                  </tr>

                  {/* Other Workups */}
                  <tr>
                    <td className="border border-black p-2 font-medium">Other Workups:</td>
                    <td className="border border-black p-2">
                      <input
                        type="text"
                        name="otherworkups"
                        value={person.otherworkups || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </td>
                  </tr>

                  {/* Symptoms Today */}

                </tbody>
              </table>
            </div>


            <div style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                VII. Remarks:
              </Typography>
              <Table
                sx={{
                  width: "100%",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid black", p: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Do you have any of the following symptoms today?
                      </Typography>

                      {/* Checkbox group for symptomsToday */}
                      <Box display="flex" gap="16px" alignItems="center">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={person.symptomsToday === 1}
                              onChange={() =>
                                handleChange({
                                  target: { name: "symptomsToday", value: 1 },
                                })
                              }
                              name="symptomsToday"
                            />
                          }
                          label="Physically Fit"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={person.symptomsToday === 0}
                              onChange={() =>
                                handleChange({
                                  target: { name: "symptomsToday", value: 0 },
                                })
                              }
                              name="symptomsToday"
                            />
                          }
                          label="For Compliance"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>


            {/* VII. Remarks Section */}
            <div style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                VII. Remarks:
              </Typography>
              <Table sx={{ width: "100%", border: "1px solid black", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid black", p: 1 }}>
                      <TextareaAutosize
                        onChange={handleChange}
                        value={person.remarks || ""}
                        minRows={2}
                        style={{

                          width: "100%",

                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                          resize: "none",
                        }}
                        defaultValue=""
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>





            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
              {/* Previous Page Button */}
              <Button
                variant="contained"
                component={Link}
                to="/dashboard3"
                startIcon={
                  <ArrowBackIcon
                    sx={{
                      color: '#000',
                      transition: 'color 0.3s',
                    }}
                  />
                }
                sx={{
                  backgroundColor: '#E8C999',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#6D2323',
                    color: '#fff',
                    '& .MuiSvgIcon-root': {
                      color: '#fff',
                    },
                  },
                }}
              >
                Previous Step
              </Button>

              {/* Next Step Button */}
              <Button
                variant="contained"
                component={Link}
                to="/dashboard5"
                onClick={handleUpdate}
                endIcon={
                  <ArrowForwardIcon
                    sx={{
                      color: '#fff',
                      transition: 'color 0.3s',
                    }}
                  />
                }
                sx={{
                  backgroundColor: '#6D2323',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#E8C999',
                    color: '#000',
                    '& .MuiSvgIcon-root': {
                      color: '#000',
                    },
                  },
                }}
              >
                Next Step
              </Button>

            </Box>

            {message && <p className="mt-4 text-center text-green-600">{message}</p>}


          </Container>
        </form>
      </Container>
    </Box>
  );
};


export default Dashboard4;
