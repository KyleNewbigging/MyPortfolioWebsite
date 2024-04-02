import React, { useState, useEffect } from "react";

interface AgeDisplayProps {
  birthDate: string;
}

const AgeDisplay: React.FC<AgeDisplayProps> = ({ birthDate }) => {
  const [yearsOld, setYearsOld] = useState<string>("");

  // Helper function to calculate age
  const calculateAge = (birthdate: string): string => {
    const birthday = new Date(birthdate).getTime();
    const ageInMilliseconds = new Date().getTime() - birthday;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Approximate age accounting for leap years
    return ageInYears.toFixed(9); // Return age with 9 decimal points
  };

  useEffect(() => {
    // Initial calculation
    setYearsOld(calculateAge(birthDate));

    // Set up an interval to update the age
    const intervalId = setInterval(() => {
      setYearsOld(calculateAge(birthDate));
    }, 50); // Update every 100ms for a continuously updating effect

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [birthDate]);

  return <div>I&apos;m a {yearsOld} year-old developer</div>;
};

export default AgeDisplay;