import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, TextField, Container, Typography, FormControl, InputLabel, Select, MenuItem, Modal, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { regions, provinces, cities, barangays } from "select-philippines-address";

const Dashboard1 = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [person, setPerson] = useState({
    profile_picture: "",
    campus: "",
    academicProgram: "",
    classifiedAs: "",
    program: "",
    program2: "",
    program3: "",
    yearLevel: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    extension: "",
    nickname: "",
    height: "",
    weight: "",
    lrnNumber: "",
    gender: "",
    pwdType: "",
    pwdId: "",
    birthOfDate: "",
    age: "",
    birthPlace: "",
    languageDialectSpoken: "",
    citizenship: "",
    religion: "",
    civilStatus: "",
    tribeEthnicGroup: "",
    cellphoneNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    facebookAccount: "",
    presentStreet: "",
    presentBarangay: "",
    presentZipCode: "",
    presentRegion: "",
    presentProvince: "",
    presentMunicipality: "",
    presentDswdHouseholdNumber: "",
    permanentStreet: "",
    permanentBarangay: "",
    permanentZipCode: "",
    permanentRegion: "",
    permanentProvince: "",
    permanentMunicipality: "",
    permanentDswdHouseholdNumber: "",
  });
  const [groupedPrograms, setGroupedPrograms] = useState({});
  const [loading, setLoading] = useState(false);
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

  const steps = [
    { label: "Personal Information", icon: <PersonIcon />, path: "/dashboard1" },
    { label: "Family Background", icon: <FamilyRestroomIcon />, path: "/dashboard2" },
    { label: "Educational Attainment", icon: <SchoolIcon />, path: "/dashboard3" },
    { label: "Health Medical Records", icon: <HealthAndSafetyIcon />, path: "/dashboard4" },
    { label: "Other Information", icon: <InfoIcon />, path: "/dashboard5" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));

  const handleStepClick = (index) => {
    setActiveStep(index);
    const newClickedSteps = [...clickedSteps];
    newClickedSteps[index] = true;
    setClickedSteps(newClickedSteps);
  };

  // dot not alter
  const fetchPersonData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/person/${id}`);
      setPerson(res.data);
      setLoading(true); // you might want to set this to false initially, see note below
    } catch (error) {
      setMessage("Error fetching person data.");
      setLoading(true); // same here
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

  const [uploadedImage, setUploadedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.includes(file.type)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreview(null);
      alert("Invalid file type. Please select a JPEG or PNG file.");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploadedImage(preview); // ✅ Set image to show in outer box
    alert("Upload successful!");
    handleClose();
  };
  const [isLrnNA, setIsLrnNA] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleLrnCheck = (event) => {
    const checked = event.target.checked;
    setIsLrnNA(checked);
    if (checked) {
      setPerson((prev) => ({ ...prev, lrnNumber: "" })); // Clear LRN in person state
    }
  };

  // For PWD type dropdown, directly update person state:
  const handlePwdChange = (event) => {
    const value = event.target.value;
    setPerson((prev) => ({ ...prev, pwdType: value }));
  };

  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const autoSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/person/${userID}`, person);
      console.log("Auto-saved.");
    } catch (err) {
      console.error("Auto-save failed.");
    }
  };

  useEffect(() => {
    regions().then(setRegionList);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const region = regionList.find((r) => r.region_name === selectedRegion);
      if (region) provinces(region.region_code).then(setProvinceList);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinceList.find((p) => p.province_name === selectedProvince);
      if (province) cities(province.province_code).then(setCityList);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      const city = cityList.find((c) => c.city_name === selectedCity);
      if (city) barangays(city.city_code).then(setBarangayList);
    }
  }, [selectedCity]);

  useEffect(() => {
    regions().then((data) => {
      setRegionList(data);
    });
  }, []);

  useEffect(() => {
    const region = regionList.find((r) => r.region_name === person.presentRegion);
    if (region) {
      provinces(region.region_code).then((provList) => {
        setProvinceList(provList);
      });
    } else {
      setProvinceList([]);
    }
  }, [person.presentRegion, regionList]);

  useEffect(() => {
    const province = provinceList.find((p) => p.province_name === person.presentProvince);
    if (province) {
      cities(province.province_code).then((cityList) => {
        setCityList(cityList);
      });
    } else {
      setCityList([]);
    }
  }, [person.presentProvince, provinceList]);

  useEffect(() => {
    const city = cityList.find((c) => c.city_name === person.presentMunicipality);
    if (city) {
      barangays(city.city_code).then((brgyList) => {
        setBarangayList(brgyList);
      });
    } else {
      setBarangayList([]);
    }
  }, [person.presentMunicipality, cityList]);

  const [permanentProvinceList, setPermanentProvinceList] = useState([]);
  const [permanentCityList, setPermanentCityList] = useState([]);
  const [permanentBarangayList, setPermanentBarangayList] = useState([]);
  const [permanentRegion, setPermanentRegion] = useState("");
  const [permanentProvince, setPermanentProvince] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentBarangay, setPermanentBarangay] = useState("");

  useEffect(() => {
    const region = regionList.find((r) => r.region_name === person.permanentRegion);
    if (region) {
      provinces(region.region_code).then(setPermanentProvinceList);
    } else {
      setPermanentProvinceList([]);
    }
  }, [person.permanentRegion, regionList]);

  useEffect(() => {
    const province = permanentProvinceList.find((p) => p.province_name === person.permanentProvince);
    if (province) {
      cities(province.province_code).then(setPermanentCityList);
    } else {
      setPermanentCityList([]);
    }
  }, [person.permanentProvince, permanentProvinceList]);

  useEffect(() => {
    const city = permanentCityList.find((c) => c.city_name === person.permanentMunicipality);
    if (city) {
      barangays(city.city_code).then(setPermanentBarangayList);
    } else {
      setPermanentBarangayList([]);
    }
  }, [person.permanentMunicipality, permanentCityList]);

  const [curriculumOptions, setCurriculumOptions] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applied_program");
        setCurriculumOptions(response.data); // array of { curriculum_id: "..." }
      } catch (error) {
        console.error("Error fetching curriculum options:", error);
      }
    };

    fetchCurriculums();
  }, []);

  // dot not alter
  return (
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>
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
            <Link to="/personal_data_form" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>
              Personal Data Form
            </Link>
            <Link to="/ecat_application_form" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>
              ECAT Application Form
            </Link>
            <Link to="/admission_form_process" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>
              Admission Form Process
            </Link>
            <Link to="/admission_services" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>
              Application/Student Satisfactory Survey
            </Link>
            <Link to="/office_of_the_registrar" style={{ fontSize: "12px", marginBottom: "8px", color: "#6D2323", textDecoration: "none", fontFamily: "Arial", textAlign: "Left" }}>
              Application For EARIST College Admission
            </Link>
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
              <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 1: Personal Information</Typography>
            </Box>
          </Container>

          <Container maxWidth="100%" sx={{ backgroundColor: "white", border: "2px solid black", padding: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Personal Information:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <div className="flex items-center mb-4 gap-4">
              <label className="w-40 font-medium">Campus:</label>
              <FormControl fullWidth size="small">
                <InputLabel id="campus-label">Campus (Manila/Cavite)</InputLabel>
                <Select labelId="campus-label" id="campus-select" name="campus" value={person.campus || ""} label="Campus (Manila/Cavite)" onChange={handleChange}>
                  <MenuItem value="MANILA">MANILA</MenuItem>
                  <MenuItem value="CAVITE">CAVITE</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex items-center mb-4 gap-4">
              <label className="w-40 font-medium">Academic Program:</label>
              <FormControl fullWidth size="small" required>
                <InputLabel id="academic-program-label">Academic Program</InputLabel>
                <Select labelId="academic-program-label" id="academic-program-select" name="academicProgram" value={person.academicProgram || ""} label="Academic Program" onChange={handleChange}>
                  <MenuItem value="Techvoc">Techvoc</MenuItem>
                  <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex items-center mb-4 gap-4">
              <label className="w-40 font-medium">Classified As:</label>
              <FormControl fullWidth size="small" required>
                <InputLabel id="classified-as-label">Classified As</InputLabel>
                <Select labelId="classified-as-label" id="classified-as-select" name="classifiedAs" value={person.classifiedAs || ""} label="Classified As" onChange={handleChange}>
                  <MenuItem value="Freshman (First Year)">Freshman (First Year)</MenuItem>
                  <MenuItem value="Transferee">Transferee</MenuItem>
                  <MenuItem value="Returnee">Returnee</MenuItem>
                  <MenuItem value="Shiftee">Shiftee</MenuItem>
                  <MenuItem value="Foreign Student">Foreign Student</MenuItem>
                </Select>
              </FormControl>
            </div>

            <br />

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Course Program:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box display="flex" width="100%" gap={2}>
              {/* Left Side: TextFields with label beside each input */}
              <Box display="flex" flexDirection="column" sx={{ width: "75%" }}>
                {/* Program */}
                {/* Program 22222*/}
                <Box display="flex" flexDirection="column" sx={{ width: "75%" }}>
                  {/* Program 1 */}
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <label className="w-40 font-medium">Program:</label>
                    <FormControl fullWidth size="small">
                      <InputLabel>Program</InputLabel>
                      <Select name="program" value={person.program} onChange={handleChange} label="Program">
                        {curriculumOptions.map((item, index) => (
                          <MenuItem key={index} value={item.curriculum_id}>
                            {item.program_description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Program 2 */}
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <label className="w-40 font-medium">Program 2:</label>
                    <FormControl fullWidth size="small">
                      <InputLabel>Program 2</InputLabel>
                      <Select name="program2" value={person.program2} onChange={handleChange} label="Program 2">
                        {curriculumOptions.map((item, index) => (
                          <MenuItem key={index} value={item.curriculum_id}>
                            {item.program_description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Program 3 */}
                  <Box display="flex" alignItems="center" gap={2}>
                    <label className="w-40 font-medium">Program 3:</label>
                    <FormControl fullWidth size="small">
                      <InputLabel>Program 3</InputLabel>
                      <Select name="program3" value={person.program3} onChange={handleChange} label="Program 3">
                        {curriculumOptions.map((item, index) => (
                          <MenuItem key={index} value={item.curriculum_id}>
                            {item.program_description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>

              {/* Right Side: Image Box */}
              <Box
                sx={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginLeft: "35px",
                  marginBottom: "20px",
                  border: "1px solid black",
                  width: "5.08cm",
                  height: "5.08cm",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </Box>
            </Box>
            <div className="flex items-center mb-4 gap-4">
              <label className="w-40 font-medium">Year Level:</label>
              <FormControl fullWidth size="small" required>
                <InputLabel id="year-level-label">Year Level</InputLabel>
                <Select labelId="year-level-label" id="year-level-select" name="yearLevel" value={person.yearLevel || ""} label="Year Level" onChange={handleChange}>
                  <MenuItem value="First Year">First Year</MenuItem>
                  <MenuItem value="Second Year">Second Year</MenuItem>
                  <MenuItem value="Third Year">Third Year</MenuItem>
                  <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                  <MenuItem value="Fifth Year">Fifth Year</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Person Details:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box display="flex" gap={2} mb={2}>
              <Box flex="1 1 20%">
                <Typography mb={1} fontWeight="medium">
                  Last Name
                </Typography>
                <TextField fullWidth size="small" name="last_name" value={person.last_name} onChange={handleChange} />
              </Box>
              <Box flex="1 1 20%">
                <Typography mb={1} fontWeight="medium">
                  First Name
                </Typography>
                <TextField fullWidth size="small" name="first_name" value={person.first_name} onChange={handleChange} />
              </Box>
              <Box flex="1 1 20%">
                <Typography mb={1} fontWeight="medium">
                  Middle Name
                </Typography>
                <TextField fullWidth size="small" name="middle_name" value={person.middle_name} onChange={handleChange} />
              </Box>
              <Box flex="1 1 20%">
                <Typography mb={1} fontWeight="medium">
                  Extension
                </Typography>
                <FormControl fullWidth size="small" required>
                  <Select name="extension" value={person.extension || ""} onChange={handleChange} displayEmpty>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Jr.">Jr.</MenuItem>
                    <MenuItem value="Sr.">Sr.</MenuItem>
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="II">II</MenuItem>
                    <MenuItem value="III">III</MenuItem>
                    <MenuItem value="IV">IV</MenuItem>
                    <MenuItem value="V">V</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box flex="1 1 20%">
                <Typography mb={1} fontWeight="medium">
                  Nickname
                </Typography>
                <TextField fullWidth size="small" name="nickname" value={person.nickname} onChange={handleChange} />
              </Box>
            </Box>
            <Box display="flex" gap={4} mb={2}>
              <Box display="flex" alignItems="center" flex="0 0 15%" gap={1}>
                <Typography fontWeight="medium" minWidth="60px">
                  Height:
                </Typography>
                <TextField size="small" name="height" value={person.height} onChange={handleChange} fullWidth />
              </Box>

              <Box display="flex" alignItems="center" flex="0 0 15%" gap={1}>
                <Typography fontWeight="medium" minWidth="60px">
                  Weight:
                </Typography>
                <TextField size="small" name="weight" value={person.weight} onChange={handleChange} fullWidth />
              </Box>
            </Box>
            <Box display="flex" gap={2} mb={2} alignItems="center">
              {/* LRN Number */}
              <Typography fontWeight="medium" minWidth="60px">
                Learning Reference Number:
              </Typography>
              <FormControl size="small" required sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <TextField
                  id="lrnNumber"
                  name="lrnNumber"
                  label="LRN Number"
                  value={person.lrnNumber || ""}
                  onChange={handleChange}
                  disabled={isLrnNA}
                  size="small"
                  sx={{ height: 40 }}
                  InputProps={{
                    sx: {
                      height: 40,
                      padding: 0,
                      "& input": {
                        height: "40px",
                        padding: "10px 14px", // vertical and horizontal padding
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                      },
                    },
                  }}
                />

                <FormControlLabel control={<Checkbox checked={isLrnNA} onChange={handleLrnCheck} inputProps={{ "aria-label": "N/A Checkbox" }} sx={{ marginTop: 0 }} />} label="N/A" sx={{ ml: 1 }} />
              </FormControl>

              {/* Gender */}
              <Typography fontWeight="medium" minWidth="60px">
                Gender:
              </Typography>
              <TextField
                select
                size="small"
                required
                label="Gender"
                name="gender"
                value={person.gender || ""}
                onChange={handleChange}
                sx={{ width: 150, height: 40 }}
                SelectProps={{ sx: { height: 40, paddingTop: 0.5, paddingBottom: 0.5 } }}
                InputProps={{ sx: { height: 40 } }}
                inputProps={{ style: { height: 40, padding: "10.5px 14px" } }}
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
              </TextField>

              {/* PWD Checkbox */}
              <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} inputProps={{ "aria-label": "PWD Checkbox" }} sx={{ marginTop: 0 }} />} label="PWD" />

              {/* PWD Type */}
              <TextField
                select
                size="small"
                label="PWD Type"
                name="pwdType"
                value={person.pwdType || ""}
                onChange={handleChange}
                disabled={!isChecked}
                sx={{ width: 200, height: 40 }}
                SelectProps={{ sx: { height: 40, paddingTop: 0.5, paddingBottom: 0.5 } }}
                InputProps={{ sx: { height: 40 } }}
                inputProps={{ style: { height: 40, padding: "10.5px 14px" } }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Blindness">Blindness</MenuItem>
                <MenuItem value="Low-vision">Low-vision</MenuItem>
                <MenuItem value="Leprosy Cured persons">Leprosy Cured persons</MenuItem>
                <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
                <MenuItem value="Locomotor Disability">Locomotor Disability</MenuItem>
                <MenuItem value="Dwarfism">Dwarfism</MenuItem>
                <MenuItem value="Intellectual Disability">Intellectual Disability</MenuItem>
                <MenuItem value="Mental Illness">Mental Illness</MenuItem>
                <MenuItem value="Autism Spectrum Disorder">Autism Spectrum Disorder</MenuItem>
                <MenuItem value="Cerebral Palsy">Cerebral Palsy</MenuItem>
                <MenuItem value="Muscular Dystrophy">Muscular Dystrophy</MenuItem>
                <MenuItem value="Chronic Neurological conditions">Chronic Neurological conditions</MenuItem>
                <MenuItem value="Specific Learning Disabilities">Specific Learning Disabilities</MenuItem>
                <MenuItem value="Multiple Sclerosis">Multiple Sclerosis</MenuItem>
                <MenuItem value="Speech and Language disability">Speech and Language disability</MenuItem>
                <MenuItem value="Thalassemia">Thalassemia</MenuItem>
                <MenuItem value="Hemophilia">Hemophilia</MenuItem>
                <MenuItem value="Sickle cell disease">Sickle cell disease</MenuItem>
                <MenuItem value="Multiple Disabilities including">Multiple Disabilities including</MenuItem>
              </TextField>

              {/* PWD ID */}
              <TextField size="small" label="PWD ID" name="pwdId" value={person.pwdId || ""} onChange={handleChange} disabled={!isChecked} sx={{ width: 200, height: 40 }} InputProps={{ sx: { height: 40 } }} inputProps={{ style: { height: 40, padding: "10.5px 14px" } }} />
            </Box>

            {/* Row 1: Birth Place + Citizenship */}
            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Birth of Date
                </Typography>
                <TextField fullWidth size="small" type="date" name="birthOfDate" value={person.birthOfDate} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Age
                </Typography>
                <TextField fullWidth size="small" name="age" value={person.age} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Birth Place
                </Typography>
                <TextField fullWidth size="small" name="birthPlace" value={person.birthPlace} onChange={handleChange} />
              </Box>
            </Box>

            {/* Row 2: Religion + Civil Status */}
            <Box display="flex" gap={2}>
              <Box flex={1} mb={2}>
                <Typography mb={1} fontWeight="medium">
                  Language/Dialect Spoken
                </Typography>
                <TextField fullWidth size="small" name="languageDialectSpoken" value={person.languageDialectSpoken || ""} onChange={handleChange} />
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Citizenship
                </Typography>
                <FormControl fullWidth size="small" required>
                  <Select name="citizenship" value={person.citizenship || ""} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>
                      Select Citizenship
                    </MenuItem>
                    <MenuItem value="AFGHAN">AFGHAN</MenuItem>
                    <MenuItem value="ALBANIAN">ALBANIAN</MenuItem>
                    <MenuItem value="ARAB">ARAB</MenuItem>
                    <MenuItem value="ARGENTINIAN">ARGENTINIAN</MenuItem>
                    <MenuItem value="AUSTRALIAN">AUSTRALIAN</MenuItem>
                    <MenuItem value="AUSTRIAN">AUSTRIAN</MenuItem>
                    <MenuItem value="BELGIAN">BELGIAN</MenuItem>
                    <MenuItem value="BANGLADESHI">BANGLADESHI</MenuItem>
                    <MenuItem value="BAHAMIAN">BAHAMIAN</MenuItem>
                    <MenuItem value="BHUTANESE">BHUTANESE</MenuItem>
                    <MenuItem value="BERMUDAN">BERMUDAN</MenuItem>
                    <MenuItem value="BOLIVIAN">BOLIVIAN</MenuItem>
                    <MenuItem value="BRAZILIAN">BRAZILIAN</MenuItem>
                    <MenuItem value="BRUNEI">BRUNEI</MenuItem>
                    <MenuItem value="BOTSWANIAN">BOTSWANIAN</MenuItem>
                    <MenuItem value="CANADIAN">CANADIAN</MenuItem>
                    <MenuItem value="CHILE">CHILE</MenuItem>
                    <MenuItem value="CHINESE">CHINESE</MenuItem>
                    <MenuItem value="COLOMBIAN">COLOMBIAN</MenuItem>
                    <MenuItem value="COSTA RICAN">COSTA RICAN</MenuItem>
                    <MenuItem value="CUBAN">CUBAN</MenuItem>
                    <MenuItem value="CYPRIOT">CYPRIOT</MenuItem>
                    <MenuItem value="CZECH">CZECH</MenuItem>
                    <MenuItem value="DANISH">DANISH</MenuItem>
                    <MenuItem value="DOMINICAN">DOMINICAN</MenuItem>
                    <MenuItem value="ALGERIAN">ALGERIAN</MenuItem>
                    <MenuItem value="EGYPTIAN">EGYPTIAN</MenuItem>
                    <MenuItem value="SPANISH">SPANISH</MenuItem>
                    <MenuItem value="ESTONIAN">ESTONIAN</MenuItem>
                    <MenuItem value="ETHIOPIAN">ETHIOPIAN</MenuItem>
                    <MenuItem value="FIJI">FIJI</MenuItem>
                    <MenuItem value="FILIPINO">FILIPINO</MenuItem>
                    <MenuItem value="FINISH">FINISH</MenuItem>
                    <MenuItem value="FRENCH">FRENCH</MenuItem>
                    <MenuItem value="BRITISH">BRITISH</MenuItem>
                    <MenuItem value="GERMAN">GERMAN</MenuItem>
                    <MenuItem value="GHANAIAN">GHANAIAN</MenuItem>
                    <MenuItem value="GREEK">GREEK</MenuItem>
                    <MenuItem value="GUAMANIAN">GUAMANIAN</MenuItem>
                    <MenuItem value="GUATEMALAN">GUATEMALAN</MenuItem>
                    <MenuItem value="HONG KONG">HONG KONG</MenuItem>
                    <MenuItem value="CROATIAN">CROATIAN</MenuItem>
                    <MenuItem value="HAITIAN">HAITIAN</MenuItem>
                    <MenuItem value="HUNGARIAN">HUNGARIAN</MenuItem>
                    <MenuItem value="INDONESIAN">INDONESIAN</MenuItem>
                    <MenuItem value="INDIAN">INDIAN</MenuItem>
                    <MenuItem value="IRANIAN">IRANIAN</MenuItem>
                    <MenuItem value="IRAQI">IRAQI</MenuItem>
                    <MenuItem value="IRISH">IRISH</MenuItem>
                    <MenuItem value="ICELANDER">ICELANDER</MenuItem>
                    <MenuItem value="ISRAELI">ISRAELI</MenuItem>
                    <MenuItem value="ITALIAN">ITALIAN</MenuItem>
                    <MenuItem value="JAMAICAN">JAMAICAN</MenuItem>
                    <MenuItem value="JORDANIAN">JORDANIAN</MenuItem>
                    <MenuItem value="JAPANESE">JAPANESE</MenuItem>
                    <MenuItem value="CAMBODIAN">CAMBODIAN</MenuItem>
                    <MenuItem value="KOREAN">KOREAN</MenuItem>
                    <MenuItem value="KUWAITI">KUWAITI</MenuItem>
                    <MenuItem value="KENYAN">KENYAN</MenuItem>
                    <MenuItem value="LAOTIAN">LAOTIAN</MenuItem>
                    <MenuItem value="LEBANESE">LEBANESE</MenuItem>
                    <MenuItem value="LIBYAN">LIBYAN</MenuItem>
                    <MenuItem value="LUXEMBURGER">LUXEMBURGER</MenuItem>
                    <MenuItem value="MALAYSIAN">MALAYSIAN</MenuItem>
                    <MenuItem value="MOROCCAN">MOROCCAN</MenuItem>
                    <MenuItem value="MEXICAN">MEXICAN</MenuItem>
                    <MenuItem value="BURMESE">BURMESE</MenuItem>
                    <MenuItem value="MYANMAR">MYANMAR</MenuItem>
                    <MenuItem value="NIGERIAN">NIGERIAN</MenuItem>
                    <MenuItem value="NOT INDICATED">NOT INDICATED</MenuItem>
                    <MenuItem value="DUTCH">DUTCH</MenuItem>
                    <MenuItem value="NORWEGIAN">NORWEGIAN</MenuItem>
                    <MenuItem value="NEPALI">NEPALI</MenuItem>
                    <MenuItem value="NEW ZEALANDER">NEW ZEALANDER</MenuItem>
                    <MenuItem value="OMANI">OMANI</MenuItem>
                    <MenuItem value="PAKISTANI">PAKISTANI</MenuItem>
                    <MenuItem value="PANAMANIAN">PANAMANIAN</MenuItem>
                    <MenuItem value="PERUVIAN">PERUVIAN</MenuItem>
                    <MenuItem value="PAPUAN">PAPUAN</MenuItem>
                    <MenuItem value="POLISH">POLISH</MenuItem>
                    <MenuItem value="PUERTO RICAN">PUERTO RICAN</MenuItem>
                    <MenuItem value="PORTUGUESE">PORTUGUESE</MenuItem>
                    <MenuItem value="PARAGUAYAN">PARAGUAYAN</MenuItem>
                    <MenuItem value="PALESTINIAN">PALESTINIAN</MenuItem>
                    <MenuItem value="QATARI">QATARI</MenuItem>
                    <MenuItem value="ROMANIAN">ROMANIAN</MenuItem>
                    <MenuItem value="RUSSIAN">RUSSIAN</MenuItem>
                    <MenuItem value="RWANDAN">RWANDAN</MenuItem>
                    <MenuItem value="SAUDI ARABIAN">SAUDI ARABIAN</MenuItem>
                    <MenuItem value="SUDANESE">SUDANESE</MenuItem>
                    <MenuItem value="SINGAPOREAN">SINGAPOREAN</MenuItem>
                    <MenuItem value="SRI LANKAN">SRI LANKAN</MenuItem>
                    <MenuItem value="EL SALVADORIAN">EL SALVADORIAN</MenuItem>
                    <MenuItem value="SOMALIAN">SOMALIAN</MenuItem>
                    <MenuItem value="SLOVAK">SLOVAK</MenuItem>
                    <MenuItem value="SWEDISH">SWEDISH</MenuItem>
                    <MenuItem value="SWISS">SWISS</MenuItem>
                    <MenuItem value="SYRIAN">SYRIAN</MenuItem>
                    <MenuItem value="THAI">THAI</MenuItem>
                    <MenuItem value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</MenuItem>
                    <MenuItem value="TUNISIAN">TUNISIAN</MenuItem>
                    <MenuItem value="TURKISH">TURKISH</MenuItem>
                    <MenuItem value="TAIWANESE">TAIWANESE</MenuItem>
                    <MenuItem value="UKRAINIAN">UKRAINIAN</MenuItem>
                    <MenuItem value="URUGUYAN">URUGUYAN</MenuItem>
                    <MenuItem value="UNITED STATES">UNITED STATES</MenuItem>
                    <MenuItem value="VENEZUELAN">VENEZUELAN</MenuItem>
                    <MenuItem value="VIRGIN ISLANDS">VIRGIN ISLANDS</MenuItem>
                    <MenuItem value="VIETNAMESE">VIETNAMESE</MenuItem>
                    <MenuItem value="YEMENI">YEMENI</MenuItem>
                    <MenuItem value="YUGOSLAVIAN">YUGOSLAVIAN</MenuItem>
                    <MenuItem value="SOUTH AFRICAN">SOUTH AFRICAN</MenuItem>
                    <MenuItem value="ZAIREAN">ZAIREAN</MenuItem>
                    <MenuItem value="ZIMBABWEAN">ZIMBABWEAN</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Religion
                </Typography>
                <FormControl fullWidth size="small" required>
                  <Select name="religion" value={person.religion || ""} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>
                      Select Religion
                    </MenuItem>
                    <MenuItem value="Jehovah's Witness">Jehovah's Witness</MenuItem>
                    <MenuItem value="Buddist">Buddist</MenuItem>
                    <MenuItem value="Catholic">Catholic</MenuItem>
                    <MenuItem value="Dating Daan">Dating Daan</MenuItem>
                    <MenuItem value="Pagano">Pagano</MenuItem>
                    <MenuItem value="Atheist">Atheist</MenuItem>
                    <MenuItem value="Born Again">Born Again</MenuItem>
                    <MenuItem value="Adventis">Adventis</MenuItem>
                    <MenuItem value="Baptist">Baptist</MenuItem>
                    <MenuItem value="Mormons">Mormons</MenuItem>
                    <MenuItem value="Free Methodist">Free Methodist</MenuItem>
                    <MenuItem value="Christian">Christian</MenuItem>
                    <MenuItem value="Protestant">Protestant</MenuItem>
                    <MenuItem value="Aglipay">Aglipay</MenuItem>
                    <MenuItem value="Islam">Islam</MenuItem>
                    <MenuItem value="LDS">LDS</MenuItem>
                    <MenuItem value="Seventh Day Adventist">Seventh Day Adventist</MenuItem>
                    <MenuItem value="Iglesia Ni Cristo">Iglesia Ni Cristo</MenuItem>
                    <MenuItem value="UCCP">UCCP</MenuItem>
                    <MenuItem value="PMCC">PMCC</MenuItem>
                    <MenuItem value="Baha'i Faith">Baha'i Faith</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Civil Status, Tribe/Ethnic Group, Other Ethnic Group - 3 in one row */}
            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Civil Status
                </Typography>
                <FormControl fullWidth size="small" required>
                  <Select name="civilStatus" value={person.civilStatus || "-civil status-"} onChange={handleChange}>
                    <MenuItem value="-civil status-" disabled>
                      - civil status -
                    </MenuItem>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Legally Seperated">Legally Seperated</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                    <MenuItem value="Solo Parent">Solo Parent</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Tribe/Ethnic Group
                </Typography>
                <FormControl fullWidth size="small" required>
                  <Select name="tribeEthnicGroup" value={person.tribeEthnicGroup || ""} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>
                      Select Tribe/Ethnic Group
                    </MenuItem>
                    <MenuItem value="Agta">Agta</MenuItem>
                    <MenuItem value="Agutaynen">Agutaynen</MenuItem>
                    <MenuItem value="Aklanon">Aklanon</MenuItem>
                    <MenuItem value="Alangan">Alangan</MenuItem>
                    <MenuItem value="Alta">Alta</MenuItem>
                    <MenuItem value="Amersian">Amersian</MenuItem>
                    <MenuItem value="Ati">Ati</MenuItem>
                    <MenuItem value="Atta">Atta</MenuItem>
                    <MenuItem value="Ayta">Ayta</MenuItem>
                    <MenuItem value="B'laan">B'laan</MenuItem>
                    <MenuItem value="Badjao">Badjao</MenuItem>
                    <MenuItem value="Bagobo">Bagobo</MenuItem>
                    <MenuItem value="Balangao">Balangao</MenuItem>
                    <MenuItem value="Balangingi">Balangingi</MenuItem>
                    <MenuItem value="Bangon">Bangon</MenuItem>
                    <MenuItem value="Bantoanon">Bantoanon</MenuItem>
                    <MenuItem value="Banwaon">Banwaon</MenuItem>
                    <MenuItem value="Batak">Batak</MenuItem>
                    <MenuItem value="Bicolano">Bicolano</MenuItem>
                    <MenuItem value="Binukid">Binukid</MenuItem>
                    <MenuItem value="Bohalano">Bohalano</MenuItem>
                    <MenuItem value="Bolinao">Bolinao</MenuItem>
                    <MenuItem value="Bontoc">Bontoc</MenuItem>
                    <MenuItem value="Buhid">Buhid</MenuItem>
                    <MenuItem value="Butuanon">Butuanon</MenuItem>
                    <MenuItem value="Cagyanen">Cagyanen</MenuItem>
                    <MenuItem value="Caray-a">Caray-a</MenuItem>
                    <MenuItem value="Cebuano">Cebuano</MenuItem>
                    <MenuItem value="Cuyunon">Cuyunon</MenuItem>
                    <MenuItem value="Dasen">Dasen</MenuItem>
                    <MenuItem value="Ilocano">Ilocano</MenuItem>
                    <MenuItem value="Ilonggo">Ilonggo</MenuItem>
                    <MenuItem value="Jamah Mapun">Jamah Mapun</MenuItem>
                    <MenuItem value="Malay">Malay</MenuItem>
                    <MenuItem value="Mangyan">Mangyan</MenuItem>
                    <MenuItem value="Maranao">Maranao</MenuItem>
                    <MenuItem value="Molbogs">Molbogs</MenuItem>
                    <MenuItem value="Palawano">Palawano</MenuItem>
                    <MenuItem value="Panimusan">Panimusan</MenuItem>
                    <MenuItem value="Tagbanua">Tagbanua</MenuItem>
                    <MenuItem value="Tao't">Tao't</MenuItem>
                    <MenuItem value="Bato">Bato</MenuItem>
                    <MenuItem value="Tausug">Tausug</MenuItem>
                    <MenuItem value="Waray">Waray</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Other Ethnic Group
                </Typography>
                <TextField fullWidth size="small" name="otherEthnicGroup" value={person.otherEthnicGroup} onChange={handleChange} />
              </Box>
            </Box>

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Contact Information:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            {/* Contact Information Fields - In Rows with 50% Width Each */}
            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Cellphone Number
                </Typography>
                <TextField fullWidth size="small" name="cellphoneNumber" value={person.cellphoneNumber} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Email Address
                </Typography>
                <TextField fullWidth size="small" name="emailAddress" value={person.emailAddress} onChange={handleChange} />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Telephone Number
                </Typography>
                <TextField fullWidth size="small" name="telephoneNumber" value={person.telephoneNumber} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Facebook Account
                </Typography>
                <TextField fullWidth size="small" name="facebookAccount" value={person.facebookAccount} onChange={handleChange} />
              </Box>
            </Box>

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Present Address:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />
            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Street
                </Typography>
                <TextField fullWidth size="small" name="presentStreet" value={person.presentStreet} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Zip Code
                </Typography>
                <TextField fullWidth size="small" name="presentZipCode" value={person.presentZipCode} onChange={handleChange} />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Region
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="presentRegion"
                    value={person.presentRegion}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedRegion(e.target.value);
                      setSelectedProvince("");
                      setSelectedCity("");
                      setSelectedBarangay("");
                      setProvinceList([]);
                      setCityList([]);
                      setBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.presentRegion}
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    {regionList.map((region) => (
                      <MenuItem key={region.region_code} value={region.region_name}>
                        {region.region_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Province
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="presentProvince"
                    value={person.presentProvince}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedProvince(e.target.value);
                      setSelectedCity("");
                      setSelectedBarangay("");
                      setCityList([]);
                      setBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.presentProvince}
                  >
                    <MenuItem value="">Select Province</MenuItem>
                    {provinceList.map((province) => (
                      <MenuItem key={province.province_code} value={province.province_name}>
                        {province.province_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Municipality
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="presentMunicipality"
                    value={person.presentMunicipality}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedCity(e.target.value);
                      setSelectedBarangay("");
                      setBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.presentMunicipality}
                  >
                    <MenuItem value="">Select Municipality</MenuItem>
                    {cityList.map((city) => (
                      <MenuItem key={city.city_code} value={city.city_name}>
                        {city.city_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Present Barangay
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="presentBarangay"
                    value={person.presentBarangay}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedBarangay(e.target.value);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.presentBarangay}
                  >
                    <MenuItem value="">Select Barangay</MenuItem>
                    {barangayList.map((brgy) => (
                      <MenuItem key={brgy.brgy_code} value={brgy.brgy_name}>
                        {brgy.brgy_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Present DSWD Household Number - 100% Width */}
            <Box mb={2}>
              <Typography mb={1} fontWeight="medium">
                Present DSWD Household Number
              </Typography>
              <TextField fullWidth size="small" name="presentDswdHouseholdNumber" value={person.presentDswdHouseholdNumber} onChange={handleChange} />
            </Box>

            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Permanent Address:</Typography>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Street
                </Typography>
                <TextField fullWidth size="small" name="permanentStreet" value={person.permanentStreet} onChange={handleChange} />
              </Box>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Zip Code
                </Typography>
                <TextField fullWidth size="small" name="permanentZipCode" value={person.permanentZipCode} onChange={handleChange} />
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Region
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="permanentRegion"
                    value={person.permanentRegion}
                    onChange={(e) => {
                      handleChange(e);
                      setPermanentRegion(e.target.value);
                      setPermanentProvinceList([]);
                      setPermanentCityList([]);
                      setPermanentBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    {regionList.map((region) => (
                      <MenuItem key={region.region_code} value={region.region_name}>
                        {region.region_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Province
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="permanentProvince"
                    value={person.permanentProvince}
                    onChange={(e) => {
                      handleChange(e);
                      setPermanentProvince(e.target.value);
                      setPermanentCityList([]);
                      setPermanentBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.permanentRegion}
                  >
                    <MenuItem value="">Select Province</MenuItem>
                    {permanentProvinceList.map((province) => (
                      <MenuItem key={province.province_code} value={province.province_name}>
                        {province.province_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Municipality
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="permanentMunicipality"
                    value={person.permanentMunicipality}
                    onChange={(e) => {
                      handleChange(e);
                      setPermanentCity(e.target.value);
                      setPermanentBarangayList([]);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.permanentProvince}
                  >
                    <MenuItem value="">Select Municipality</MenuItem>
                    {permanentCityList.map((city) => (
                      <MenuItem key={city.city_code} value={city.city_name}>
                        {city.city_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box flex={1}>
                <Typography mb={1} fontWeight="medium">
                  Permanent Barangay
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="permanentBarangay"
                    value={person.permanentBarangay}
                    onChange={(e) => {
                      handleChange(e);
                      setPermanentBarangay(e.target.value);
                      autoSave();
                    }}
                    displayEmpty
                    disabled={!person.permanentMunicipality}
                  >
                    <MenuItem value="">Select Barangay</MenuItem>
                    {permanentBarangayList.map((brgy) => (
                      <MenuItem key={brgy.brgy_code} value={brgy.brgy_name}>
                        {brgy.brgy_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box mb={2}>
              <Typography mb={1} fontWeight="medium">
                Permanent DSWD Household Number
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={person.permanentDswdHouseholdNumber || ""}
                InputProps={{
                  readOnly: true, // Optional: make it read-only if you're not using onChange
                }}
              />
            </Box>

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  // subtle blur for modern look
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 600,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "90vh",
                    overflowY: "auto",
                  }}
                >
                  {/* Close (X) Button in top-right */}
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#fff",
                      bgcolor: "#6D2323",
                      "&:hover": {
                        bgcolor: "#5a1f1f",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  {/* Header */}
                  <Box
                    sx={{
                      bgcolor: "#6D2323",
                      color: "white",
                      py: 2,
                      px: 3,
                      borderRadius: 2,
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Upload Your Photo
                    </Typography>
                  </Box>

                  {/* Preview Image */}
                  {preview && (
                    <Box sx={{ display: "flex", justifyContent: "center", my: 2, position: "relative" }}>
                      <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                          width: "192px",
                          height: "192px",
                          objectFit: "cover",
                          border: "2px solid #6D2323",
                          borderRadius: 2,
                        }}
                      />
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(null);
                        }}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: "calc(50% - 96px)",
                          minWidth: 0,
                          width: 28,
                          height: 28,
                          fontSize: "18px",
                          p: 0,
                          color: "#fff",
                          bgcolor: "#d32f2f",
                          borderRadius: "50%",
                          "&:hover": { bgcolor: "#b71c1c" },
                        }}
                      >
                        ×
                      </Button>
                    </Box>
                  )}

                  {/* Guidelines Section */}
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      p: 2,
                      borderRadius: 2,
                      mb: 3,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold" mb={1}>
                      Guidelines:
                    </Typography>
                    <Box sx={{ ml: 2, fontSize: "15px" }}>
                      - Size: 2" x 2"
                      <br />
                      - Color: Must be in color
                      <br />
                      - Background: White
                      <br />
                      - Face: Centered, direct camera
                      <br />
                      - File types: JPEG, JPG, PNG
                      <br />- Attire: Formal
                    </Box>

                    <Typography variant="body1" fontWeight="bold" mt={2}>
                      How to Change the Photo?
                    </Typography>
                    <Box sx={{ ml: 2, fontSize: "15px" }}>
                      - Click the X Button
                      <br />
                      - Choose a new file
                      <br />- Click the Upload button
                    </Box>
                  </Box>

                  {/* File Input */}
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#6D2323",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    Select Your Image:
                  </Typography>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onClick={(e) => (e.target.value = null)}
                    onChange={handleFileChange}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "16px",
                    }}
                  />

                  {/* Upload Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleUpload}
                    sx={{
                      backgroundColor: "#6D2323",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#5a1f1f",
                      },
                    }}
                  >
                    Upload
                  </Button>
                </Box>
              </Box>
            </Modal>

            <Box display="flex" justifyContent="right" mt={4}>
              {/* Previous Page Button */}
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  backgroundColor: "#6D2323", // Set background color to match the next button
                  color: "#fff", // Set text color to white
                  marginRight: "5px", // Add margin between buttons
                  "&:hover": {
                    backgroundColor: "#5a1f1f", // Adjust hover color to match
                  },
                  display: "flex", // Ensure icon and text are aligned
                  alignItems: "center", // Center the content vertically
                }}
              >
                <PhotoCameraIcon sx={{ marginRight: "8px" }} /> {/* Photo Icon */}
                Upload Photo <br /> Student Picture
              </Button>

              {/* Next Step Button */}
              <Button
                variant="contained"
                component={Link}
                onClick={handleUpdate}
                to="/dashboard2"
                endIcon={
                  <ArrowForwardIcon
                    sx={{
                      color: "#fff",
                      transition: "color 0.3s",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#6D2323",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#E8C999",
                    color: "#000",
                    "& .MuiSvgIcon-root": {
                      color: "#000",
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

export default Dashboard1;
