export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  badges: string[];
  score: number;
  maxScore: number;
  caption: string;
}

export const educationData: EducationItem[] = [
  {
    id: "ruet",
    period: "2022 – 2026",
    degree: "BSc in Electrical and Electronic Engineering",
    institution: "Rajshahi University of Engineering and Technology (RUET)",
    badges: ["Engineering", "EEE", "RUET"],
    score: 3.68,
    maxScore: 4.0,
    caption: "CGPA / 4.00",
  },
  {
    id: "rajshahi-college",
    period: "2018 – 2021",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Rajshahi College, Rajshahi",
    badges: ["College", "Rajshahi", "Perfect GPA"],
    score: 5.0,
    maxScore: 5.0,
    caption: "GPA / 5.00",
  },
  {
    id: "dhangora-high-school",
    period: "2018",
    degree: "Secondary School Certificate (SSC)",
    institution: "Dhangora High School, Raigonj, Sirajgonj",
    badges: ["School", "Sirajgonj", "Perfect GPA"],
    score: 5.0,
    maxScore: 5.0,
    caption: "GPA / 5.00",
  },
];
