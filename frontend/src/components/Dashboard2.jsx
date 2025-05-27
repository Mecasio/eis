import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorIcon from '@mui/icons-material/Error';


const Dashboard2 = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [person, setPerson] = useState({
    solo_parent: "", father_deceased: "", father_family_name: "", father_given_name: "", father_middle_name: "",
    father_ext: "", father_nickname: "", father_education_level: "", father_last_school: "", father_course: "", father_year_graduated: "", father_school_address: "", father_contact: "", father_occupation: "", father_employer: "",
    father_income: "", father_email: "", mother_deceased: "", mother_family_name: "", mother_given_name: "", mother_middle_name: "", mother_nickname: "", mother_education_level: "", mother_last_school: "", mother_course: "",
    mother_year_graduated: "", mother_school_address: "", mother_contact: "", mother_occupation: "", mother_employer: "", mother_income: "", mother_email: "", guardian: "", guardian_family_name: "", guardian_given_name: "",
    guardian_middle_name: "", guardian_ext: "", guardian_nickname: "", guardian_address: "", guardian_contact: "", guardian_email: "", annual_income: "",
  });

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

  const steps = [
    { label: "Personal Information", icon: <PersonIcon />, path: "/dashboard1" },
    { label: "Family Background", icon: <FamilyRestroomIcon />, path: "/dashboard2" },
    { label: "Educational Attainment", icon: <SchoolIcon />, path: "/dashboard3" },
    { label: "Health Medical Records", icon: <HealthAndSafetyIcon />, path: "/dashboard4" },
    { label: "Other Information", icon: <InfoIcon />, path: "/dashboard5" },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const [isFatherDeceased, setIsFatherDeceased] = useState(false);
  const [isMotherDeceased, setIsMotherDeceased] = useState(false);
  const [isSoloParent, setIsSoloParent] = useState(false);
  const [parentType, setParentType] = useState("");

  // When Solo Parent checkbox is toggled
  const handleSoloParentChange = (e) => {
    const checked = e.target.checked;

    setPerson((prev) => ({
      ...prev,
      solo_parent: checked,
      parent_type: checked ? prev.parent_type : "", // Reset if unchecked
    }));

    // Also update local state if needed
    setIsSoloParent(checked);
  };


  const handleParentTypeChange = (event) => {
    const selected = event.target.value;

    setPerson((prev) => ({
      ...prev,
      parent_type: selected,
    }));

    setParentType(selected);

    if (selected === "Mother") {
      setIsFatherDeceased(true);
      setIsMotherDeceased(false);
    } else if (selected === "Father") {
      setIsMotherDeceased(true);
      setIsFatherDeceased(false);
    }
  };

  const [fatherEduNotApplicable, setFatherEduNotApplicable] = useState(false);
  const [motherEduNotApplicable, setMotherEduNotApplicable] = useState(false);





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
              <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 2: Family Background</Typography>
            </Box>
          </Container>


          <Container maxWidth="100%" sx={{ backgroundColor: "white", border: "2px solid black", padding: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Family Background:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />




            <Box display="flex" gap={3} width="100%" alignItems="center">
              {/* Solo Parent Checkbox */}
              <Box marginTop="10px" display="flex" alignItems="center" gap={1}>
                <Checkbox
                  name="solo_parent"
                  checked={person.solo_parent === 1 || person.solo_parent === true}
                  value={person.solo_parent}
                  onChange={handleSoloParentChange}
                  inputProps={{ "aria-label": "Solo Parent checkbox" }}
                  sx={{ width: 25, height: 25 }}
                />
                <label style={{ fontFamily: "Arial", }}>Solo Parent</label>
              </Box>

              {/* Conditional Mother/Father Dropdown */}
              {(person.solo_parent === 1 || person.solo_parent === true) && (
                <Box marginTop="10px" display="flex" alignItems="center">
                  <FormControl fullWidth size="small" style={{ width: "200px", marginRight: "16px" }}>
                    <InputLabel id="parent-type-label">Mother/Father</InputLabel>
                    <Select
                      labelId="parent-type-label"
                      name="parent_type"
                      value={person.parent_type || ""}
                      label="Mother/Father"
                      onChange={handleParentTypeChange}
                    >
                      <MenuItem value="Mother">Mother</MenuItem>
                      <MenuItem value="Father">Father</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Box>
            <br />



            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Father's Name</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box sx={{ mb: 2 }}>
              {/* Father Deceased Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFatherDeceased}
                    onChange={(e) => setIsFatherDeceased(e.target.checked)}
                  />
                }
                label="Father Deceased"
              />
              <br />

              {/* Show Father's Info ONLY if not deceased */}
              {!isFatherDeceased && (
                <>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Father Family Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_family_name"
                        value={person.father_family_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Father Given Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_given_name"
                        value={person.father_given_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Father Middle Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_middle_name"
                        value={person.father_middle_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Father Extension</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_ext"
                        value={person.father_ext}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Father Nickname</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_nickname"
                        value={person.father_nickname}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Typography sx={{ fontSize: '20px', color: '#6D2323', fontWeight: 'bold', mt: 3 }}>
                    Father's Educational Background
                  </Typography>
                  <hr style={{ border: '1px solid #ccc', width: '100%' }} />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fatherEduNotApplicable}
                        onChange={(e) => {
                          setFatherEduNotApplicable(e.target.checked);
                          if (e.target.checked) {
                            // Clear all father education fields for all students
                            const cleared = students.map((s) => ({
                              ...s,
                              father_education_level: "",
                              father_last_school: "",
                              father_course: "",
                              father_year_graduated: "",
                              father_school_address: "",
                            }));
                            setStudents(cleared);
                          }
                        }}
                      />
                    }
                    label="Father's education not applicable"
                  />

                  {/* Father Educational Details (conditionally rendered) */}
                  {!fatherEduNotApplicable && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Father Education Level</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="father_education_level"
                          value={person.father_education_level}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Father Last School</Typography>

                        <TextField
                          fullWidth
                          size="small"
                          name="father_last_school"
                          value={person.father_last_school}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Father Course</Typography>

                        <TextField
                          fullWidth
                          size="small"
                          name="father_course"
                          value={person.father_course}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Father Year Graduated</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="father_year_graduated"
                          value={person.father_year_graduated}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Father School Address</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="father_school_address"
                          value={person.father_school_address}
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                  )}


                  <Typography sx={{ fontSize: '20px', color: '#6D2323', fontWeight: 'bold', mt: 3 }}>
                    Father's Contact Information
                  </Typography>
                  <hr style={{ border: '1px solid #ccc', width: '100%' }} />
                  <br />

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Father Contact</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_contact"
                        value={person.father_contact}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Father Occupation</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_occupation"
                        value={person.father_occupation}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Father Employer</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_employer"
                        value={person.father_employer}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Father Income</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="father_income"
                        value={person.father_income}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" mb={1}>Father Email</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="father_email"
                      value={person.father_email}
                      onChange={handleChange}
                    />
                  </Box>
                </>
              )}
            </Box>


            <Box sx={{ mb: 2 }}>
              {/* Mother Deceased Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMotherDeceased}
                    onChange={(e) => setIsMotherDeceased(e.target.checked)}
                  />
                }
                label="Mother Deceased"
              />
              <br />

              {/* Show Mother's Info ONLY if not deceased */}
              {!isMotherDeceased && (
                <>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Mother Family Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_family_name"
                        value={person.mother_family_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Mother Given Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_given_name"
                        value={person.mother_given_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Mother Middle Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_middle_name"
                        value={person.mother_middle_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Mother Extension</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_ext"
                        value={person.mother_ext}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={1}>Mother Nickname</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_nickname"
                        value={person.mother_nickname}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Typography sx={{ fontSize: '20px', color: '#6D2323', fontWeight: 'bold', mt: 3 }}>
                    Mother's Educational Background
                  </Typography>
                  <hr style={{ border: '1px solid #ccc', width: '100%' }} />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={motherEduNotApplicable}
                        onChange={(e) => {
                          setMotherEduNotApplicable(e.target.checked);
                          if (e.target.checked) {
                            // Clear all mother education fields for all students
                            const cleared = students.map((s) => ({
                              ...s,
                              mother_education_level: "",
                              mother_last_school: "",
                              mother_course: "",
                              mother_year_graduated: "",
                              mother_school_address: "",
                            }));
                            setStudents(cleared);
                          }
                        }}
                      />
                    }
                    label="Mother's education not applicable"
                  />

                  {/* Mother Educational Details (conditionally rendered) */}
                  {!motherEduNotApplicable && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Mother Education Level</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="mother_education_level"
                          value={person.mother_education_level}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Mother Last School</Typography>

                        <TextField
                          fullWidth
                          size="small"
                          name="mother_last_school"
                          value={person.mother_last_school}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Mother Course</Typography>

                        <TextField
                          fullWidth
                          size="small"
                          name="mother_course"
                          value={person.mother_course}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Mother Year Graduated</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="mother_year_graduated"
                          value={person.mother_year_graduated}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Mother School Address</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="mother_school_address"
                          value={person.mother_school_address}
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                  )}



                  <Typography sx={{ fontSize: '20px', color: '#6D2323', fontWeight: 'bold', mt: 3 }}>
                    Mother's Contact Information
                  </Typography>
                  <hr style={{ border: '1px solid #ccc', width: '100%' }} />
                  <br />

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Mother Contact</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_contact"
                        value={person.mother_contact}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Mother Occupation</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_occupation"
                        value={person.mother_occupation}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Mother Employer</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_employer"
                        value={person.mother_employer}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" mb={0.5}>Mother Income</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="mother_income"
                        value={person.mother_income}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" mb={1}>Mother Email</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="mother_email"
                      value={person.mother_email}
                      onChange={handleChange}
                    />
                  </Box>
                </>
              )}
            </Box>


            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Guardian's Name</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box display="flex" alignItems="center" gap={2} mt={1} style={{ width: '100%' }}>
              <Typography variant="subtitle2" sx={{ minWidth: 80 }}>
                Guardian:
              </Typography>

              <FormControl size="small" required sx={{ width: '20%' }}>
                <InputLabel id="guardian-label">Guardian</InputLabel>
                <Select
                  labelId="guardian-label"
                  id="guardian-select"
                  value={person.guardian}
                  onChange={handleChange}
                  name="guardian"
                  label="Guardian"
                // value and onChange go here
                >
                  <MenuItem value="Father">Father</MenuItem>
                  <MenuItem value="Mother">Mother</MenuItem>
                  <MenuItem value="Brother/Sister">Brother/Sister</MenuItem>
                  <MenuItem value="Uncle">Uncle</MenuItem>
                  <MenuItem value="StepFather">Stepfather</MenuItem>
                  <MenuItem value="StepMother">Stepmother</MenuItem>
                  <MenuItem value="Cousin">Cousin</MenuItem>
                  <MenuItem value="Father in Law">Father-in-law</MenuItem>
                  <MenuItem value="Mother in Law">Mother-in-law</MenuItem>
                  <MenuItem value="Sister in Law">Sister-in-law</MenuItem>
                  <MenuItem value="Spouse">Spouse</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Box>


            <br />

            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1 }}>

                <Typography variant="subtitle2" mb={1}>Guardian Family Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_family_name"
                  value={person.guardian_family_name}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Given Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_given_name"
                  value={person.guardian_given_name}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Middle Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_middle_name"
                  value={person.guardian_middle_name}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Name Extension</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_ext"
                  value={person.guardian_ext}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Nickname</Typography>

                <TextField
                  fullWidth
                  size="small"
                  name="guardian_nickname"
                  value={person.guardian_nickname}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Guardian's Contact Information</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <div className="mb-4">
              <label className="block mb-1 font-small">Guardian Address</label>
              <input type="text" name="guardian_Address" value={person.guardian_address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Contact</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_contact"
                  value={person.guardian_contact}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" mb={1}>Guardian Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="guardian_email"
                  value={person.guardian_email}
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Family (Annual Income)</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" mb={1}>
                Annual Income
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                name="annual_income"
                value={person.annual_income}
                onChange={handleChange}
              >
                <MenuItem value="80,000 and below">80,000 and below</MenuItem>
                <MenuItem value="80,000 to 135,000">80,000 above but not more than 135,000</MenuItem>
                <MenuItem value="135,000 to 250,000">135,000 above but not more than 250,000</MenuItem>
                <MenuItem value="250,000 to 500,000">250,000 above but not more than 500,000</MenuItem>
                <MenuItem value="500,000 to 1,000,000">500,000 above but not more than 1,000,000</MenuItem>
                <MenuItem value="1,000,000 and above">1,000,000 and above</MenuItem>
              </TextField>
            </Box>




            <Box display="flex" justifyContent="space-between" mt={4}>
              {/* Previous Page Button */}
              <Button
                variant="contained"
                component={Link}
                to="/dashboard1"
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
                to="/dashboard3"
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


export default Dashboard2;
