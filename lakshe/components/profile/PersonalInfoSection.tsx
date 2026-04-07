"user client"
import React, {useState} from "react";
import SectionHeader from "./SectionHeader";
import PersonalInfoForm from "./PersonalInfoForm";
function PersonalInfoSection() {
  return (
    <div>
      <SectionHeader
        section="Personal Information"
        description="Add your persional information that will be used in your resume"
        buttonText = {null}
      />
      <PersonalInfoForm />
    </div>
  );
}

export default PersonalInfoSection;
